require("dotenv").config();
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const queryString = require("query-string");
const nodemailer = require("nodemailer");

async function sendEmail(message) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
      from: process.env.GOOGLE_USER,
    });

    const info = await transporter.sendMail(message);
    return info;
  } catch (error) {
    throw error;
  }
}

async function sendResetPassword({ toUser, pass }) {
  const message = {
    from: `"NienSalon" <${process.env.GOOGLE_USER}>`,
    to: toUser.email,
    subject: "PNV - Reset Password",
    html: `
    <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#F4F4F4">
      <!--[if gte mso 9]>
      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#f4f4f4"></v:fill>
      </v:background>
      <![endif]-->
      <div style="padding: 20px;">
          <h1 style="color: #333;">Niên Salon xin chào quý khách!</h1>
          <p style="font-size: 18px; line-height: 1.5;"></p>
          <p style="font-size: 18px; line-height: 1.5;"></p>
          <lable>Mật khẩu mới của quý khách là: </lable>
          <u>${pass}</u>
          <p style="font-size: 18px; line-height: 1.5;"></p>
          <br>
          <p style="font-size: 18px; line-height: 1.5;">Trân trọng,<br>Niên Salon Team</p>
      </div>
    </div>
      `,
  };

  try {
    const info = await sendEmail(message);
    return info;
  } catch (error) {
    throw error;
  }
}

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    "/blog/:resource/:id/show": "/:resource/:id",
  })
);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  } else if (req.method === "PATCH" || req.method === "PUT") {
    req.body.updatedAt = Date.now();
  }
  next();
});

router.render = (req, res) => {
  const headers = res.getHeaders();
  const totalCount = headers["x-total-count"];
  if (req.originalMethod === "GET" && totalCount) {
    const queryParams = queryString.parse(req._parsedOriginalUrl.query);
    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 10,
        _totalRows: Number.parseInt(totalCount),
      },
    };
    return res.jsonp(result);
  }
  res.jsonp(res.locals.data);
};

server.post("/reset", async (req, res) => {
  try {
    const { email, name } = req.body; //lấy từ client
    const crypto = require("crypto");
    const pass = crypto.randomBytes(8).toString("hex");
    const user = {
      name,
      email,
    };
    
    const info = await sendResetPassword({ toUser: user, pass: pass });
    
    const users = router.db.get("Account").value();
    const userToUpdate = users.find((item) => item.email === email);
    
    if (!userToUpdate) {
      return res.status(404).json({ error: "Item not found" });
    }
    
    userToUpdate.password = pass;
    
    router.db.get("Account").write();
    res.jsonp({ message: "Please check your email!", info });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.listen(3000, () => {
  console.log("JSON Server is running");
});

//.......................MomoBanking......................
server.post("/payment", async (req, res) => {

  const {amount,data} = req.body;
  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = partnerCode + new Date().getTime() + "id";
  var orderId = new Date().getTime();
  var orderInfo = "Thanh toán qua ví MoMo";
  const urlParams = new URLSearchParams();
        urlParams.set('customerName', data.customerName);
        urlParams.set('phone', data.phone);
        urlParams.set('nameHair', data.nameHair);
        urlParams.set('priceHair', data.priceHair);
        urlParams.set('address', data.address);
        urlParams.set('time', data.time);
        urlParams.set('date', data.date);
        urlParams.set('messages', data.messages);
  // console.log(urlParams);
  var redirectUrl = "http://127.0.0.1:5501/src/html/TN-38_DetailBooking.html"+'?'+urlParams.toString();
  var ipnUrl = "http://127.0.0.1:5501/src/html/TN-38_DetailBooking.html"+'?'+urlParams.toString();
  // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
  // var amount = "50000";
  // var requestType = "payWithATM";
  var requestType = "captureWallet";
  var extraData = ""; //pass empty value if your merchant does not have stores

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
 
  //signature
  const crypto = require("crypto");
  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });

  //Create the HTTPS objects
  const https = require("https");
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };
  
  //Send the request and get the response
  const reqq = https.request(options, (resMomo) => {
    // console.log(`Status: ${res.statusCode}`);
    // console.log(`Headers: ${JSON.stringify(res.headers)}`);
    resMomo.setEncoding("utf8");
    resMomo.on("data", (body) => {
      console.log(body);
      res.json({"payUrl":JSON.parse(body).payUrl,"statusCode":resMomo.statusCode});
      
      // console.log("Body: ");
      // console.log(body);
      // console.log("payUrl: ");
      // console.log(JSON.parse(body).payUrl);
      // console.log(resMomo.statusCode);

      
    });

    resMomo.on("end", () => {

      // console.log("No more data in response.");
    });
  });

  reqq.on("error", (e) => {
    // console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  reqq.write(requestBody);
  reqq.end();

});

server.use(router);
server.listen(4002, () => {
  console.log("JSON Server is running");
});

module.exports = server;

