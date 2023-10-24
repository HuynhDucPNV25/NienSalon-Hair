require("dotenv").config();
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const queryString = require("query-string");
const nodemailer = require("nodemailer");

function sendEmail(message) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
      from:process.env.GOOGLE_USER
    });

    transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err);
      } else {
        res(info);
      }
    });
  });
}

function sendResetPassword({ toUser, pass }) {
  const message = {
    from:  `"NienSalon" <${process.env.GOOGLE_USER}>`,
    to: toUser.email,
    text: "Hello. This email is for your email verification.",
    subject: "PNV - Reset Password",
    html: `
    <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#F4F4F4"><!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
      <v:fill type="tile" color="#f4f4f4"></v:fill>
    </v:background>
  <![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F4F4F4">
          <tr class="gmail-fix" height="0" style="border-collapse:collapse">
              <td style="padding:0;Margin:0">
                  <table cellspacing="0" cellpadding="0" border="0" align="center" role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px">
                      <tr style="border-collapse:collapse">
                          <td cellpadding="0" cellspacing="0" border="0"
                              style="padding:0;Margin:0;line-height:1px;min-width:600px" height="0"><img
                                  src="https://fchouai.stripocdn.email/content/guids/CABINET_837dc1d79e3a5eca5eb1609bfe9fd374/images/41521605538834349.png"
                                  style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px"
                                  alt width="600" height="1"></td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr style="border-collapse:collapse">
              <td valign="top" style="padding:0;Margin:0">
                  <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                      <tr style="border-collapse:collapse">
                          <td align="center" style="padding:0;Margin:0">
                              <table class="es-content-body"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
                                  cellspacing="0" cellpadding="0" align="center" role="none">
                                  <tr style="border-collapse:collapse">
                                      <td align="left"
                                          style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px">
                                          <!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]-->

                              </table>
                              <!--[if mso]></td><td style="width:20px"></td><td style="width:278px" valign="top"><![endif]-->
                              <table class="es-right" cellspacing="0" cellpadding="0" align="right" role="none"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                  <tr style="border-collapse:collapse">
                                      <td align="left" style="padding:0;Margin:0;width:278px">
                                          <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                              <tr style="border-collapse:collapse">
                                                  <td align="right" class="es-infoblock es-m-txt-c"
                                                      style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC">
                                                      <p
                                                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">
                                                          <a href="#" class="view" target="_blank"
                                                              style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif">View
                                                              in browser</a>
                                                      </p>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table><!--[if mso]></td></tr></table><![endif]-->
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <table class="es-header" cellspacing="0" cellpadding="0" align="center" role="none"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#7C72DC;background-repeat:repeat;background-position:center top">
          <tr style="border-collapse:collapse">
              <td style="padding:0;Margin:0;background-color:#7c72dc" bgcolor="#7c72dc" align="center">
                  <table class="es-header-body" cellspacing="0" cellpadding="0" align="center" role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#7C72DC;width:600px">
                      <tr style="border-collapse:collapse">
                          <td align="left"
                              style="Margin:0;padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px">
                              <table width="100%" cellspacing="0" cellpadding="0" role="none"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr style="border-collapse:collapse">
                                      <td valign="top" align="center" style="padding:0;Margin:0;width:580px">
                                          <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                              <tr style="border-collapse:collapse">
                                                  <td align="center"
                                                      style="Margin:0;padding-left:10px;padding-right:10px;padding-top:25px;padding-bottom:25px;font-size:0">
                                                      <img src="https://fchouai.stripocdn.email/content/guids/CABINET_3df254a10a99df5e44cb27b842c2c69e/images/7331519201751184.png"
                                                          alt
                                                          style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                          width="40">
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
          <tr style="border-collapse:collapse">
              <td style="padding:0;Margin:0;background-color:#7c72dc" bgcolor="#7c72dc" align="center">
                  <table class="es-content-body"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
                      cellspacing="0" cellpadding="0" align="center" role="none">
                      <tr style="border-collapse:collapse">
                          <td align="left" style="padding:0;Margin:0">
                              <table width="100%" cellspacing="0" cellpadding="0" role="none"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr style="border-collapse:collapse">
                                      <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                          <table
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#ffffff;border-radius:4px"
                                              width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff"
                                              role="presentation">
                                              <tr style="border-collapse:collapse">
                                                  <td align="center"
                                                      style="Margin:0;padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:35px">
                                                      <h1
                                                          style="Margin:0;line-height:58px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:48px;font-style:normal;font-weight:normal;color:#111111">
                                                          Trouble signing in?</h1>
                                                  </td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                  <td bgcolor="#ffffff" align="center"
                                                      style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0">
                                                      <table width="100%" height="100%" cellspacing="0"
                                                          cellpadding="0" border="0" role="presentation"
                                                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                          <tr style="border-collapse:collapse">
                                                              <td
                                                                  style="padding:0;Margin:0;border-bottom:1px solid #ffffff;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px">
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
          <tr style="border-collapse:collapse">
              <td align="center" style="padding:0;Margin:0">
                  <table class="es-content-body"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px"
                      cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none">
                      <tr style="border-collapse:collapse">
                          <td align="left" style="padding:0;Margin:0">
                              <table width="100%" cellspacing="0" cellpadding="0" role="none"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr style="border-collapse:collapse">
                                      <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                          <table
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff"
                                              width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff"
                                              role="presentation">
                                              <tr style="border-collapse:collapse">
                                                  <td class="es-m-txt-l" bgcolor="#ffffff" align="left"
                                                      style="Margin:0;padding-bottom:15px;padding-top:20px;padding-left:30px;padding-right:30px">
                                                      <p
                                                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px">
                                                          Resetting your password is easy. Just press the button below
                                                          and follow the instructions. We'll have you up and running
                                                          in no time.</p>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr style="border-collapse:collapse">
                          <td align="left"
                              style="padding:0;Margin:0;padding-bottom:20px;padding-left:30px;padding-right:30px">
                              <table width="100%" cellspacing="0" cellpadding="0" role="none"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr style="border-collapse:collapse">
                                      <td valign="top" align="center" style="padding:0;Margin:0;width:540px">
                                          <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                              <tr style="border-collapse:collapse">
                                                  <td align="center"
                                                      style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px">
                                                      <span class="es-button-border msohide"
                                                          style="border-style:solid;border-color:#7C72DC;background:#7C72DC;border-width:1px;display:inline-block;border-radius:2px;width:auto;mso-hide:all"><p
                                                              href="#/" class="es-button" target="_blank"
                                                              style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;display:inline-block;background:#7C72DC;border-radius:2px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;padding:15px 25px 15px 25px;mso-padding-alt:0;mso-border-alt:10px solid #7C72DC">
                                                              ${pass}</p></span><!--<![endif]--></td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
          <tr style="border-collapse:collapse">
              <td align="center" style="padding:0;Margin:0">
                  <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"
                      role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                      <tr style="border-collapse:collapse">
                          <td align="left" style="padding:0;Margin:0">
                              <table width="100%" cellspacing="0" cellpadding="0" role="none"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr style="border-collapse:collapse">
                                      <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                          <table
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:4px;background-color:#111111"
                                              width="100%" cellspacing="0" cellpadding="0" bgcolor="#111111"
                                              role="presentation">
                                              <tr style="border-collapse:collapse">
                                                  <td class="es-m-txt-l" bgcolor="#111111" align="left"
                                                      style="padding:0;Margin:0;padding-left:30px;padding-right:30px;padding-top:35px">
                                                      <h2
                                                          style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#ffffff">
                                                          Want a more secure account?<br></h2>
                                                  </td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                  <td class="es-m-txt-l" align="left"
                                                      style="padding:0;Margin:0;padding-top:20px;padding-left:30px;padding-right:30px">
                                                      <p
                                                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px">
                                                          We support two-factor authentication to help keep your
                                                          information private.<br></p>
                                                  </td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                  <td esdev-links-color="#7c72dc" align="left"
                                                      style="Margin:0;padding-top:20px;padding-left:30px;padding-right:30px;padding-bottom:40px">
                                                      <a target="_blank" href="#/"
                                                          style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#7c72dc;font-size:18px">See
                                                          how easy it is to get started</a>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
          <tr style="border-collapse:collapse">
              <td align="center" style="padding:0;Margin:0">
                  <table class="es-content-body"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
                      cellspacing="0" cellpadding="0" align="center" role="none">
                      <tr style="border-collapse:collapse">
                          <td align="left" style="padding:0;Margin:0">
                              <table width="100%" cellspacing="0" cellpadding="0" role="none"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr style="border-collapse:collapse">
                                      <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                          <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                              <tr style="border-collapse:collapse">
                                                  <td align="center"
                                                      style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px;font-size:0">
                                                      <table width="100%" height="100%" cellspacing="0"
                                                          cellpadding="0" border="0" role="presentation"
                                                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                          <tr style="border-collapse:collapse">
                                                              <td
                                                                  style="padding:0;Margin:0;border-bottom:1px solid #f4f4f4;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px">
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
          <tr style="border-collapse:collapse">
              <td align="center" style="padding:0;Margin:0">
                  <table class="es-content-body"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#c6c2ed;width:600px"
                      cellspacing="0" cellpadding="0" bgcolor="#c6c2ed" align="center" role="none">
                      <tr style="border-collapse:collapse">
                          <td align="left" style="padding:0;Margin:0">
                              <table width="100%" cellspacing="0" cellpadding="0" role="none"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr style="border-collapse:collapse">
                                      <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                          <table
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:4px"
                                              width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                              <tr style="border-collapse:collapse">
                                                  <td align="center"
                                                      style="padding:0;Margin:0;padding-top:30px;padding-left:30px;padding-right:30px">
                                                      <h3
                                                          style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#111111">
                                                          Need more help?</h3>
                                                  </td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                  <td esdev-links-color="#7c72dc" align="center"
                                                      style="padding:0;Margin:0;padding-bottom:30px;padding-left:30px;padding-right:30px">
                                                      <a target="_blank" href="#/"
                                                          style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#7c72dc;font-size:18px">We’re
                                                          here, ready to talk</a>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
          <tr style="border-collapse:collapse">
              <td align="center" style="padding:0;Margin:0">
                  <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
                      <tr style="border-collapse:collapse">
                          <td align="left"
                              style="Margin:0;padding-top:30px;padding-bottom:30px;padding-left:30px;padding-right:30px">
                              <table width="100%" cellspacing="0" cellpadding="0" role="none"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr style="border-collapse:collapse">
                                      <td valign="top" align="center" style="padding:0;Margin:0;width:540px">
                                          <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                              <tr style="border-collapse:collapse">
                                                  <td align="left" style="padding:0;Margin:0">
                                                      <p
                                                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#666666;font-size:14px">
                                                          <strong><a target="_blank" href="#"
                                                                  style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#111111;font-size:14px">Dashboard</a>
                                                              - <a target="_blank" href="#"
                                                                  style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#111111;font-size:14px">Billing</a>
                                                              - <a target="_blank" href="#"
                                                                  style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#111111;font-size:14px">Help</a></strong>
                                                      </p>
                                                  </td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                  <td align="left" style="padding:0;Margin:0;padding-top:25px">
                                                      <p
                                                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#666666;font-size:14px">
                                                          You received this email because you just signed up for a new
                                                          account. If it looks weird, <strong><a class="view"
                                                                  target="_blank" href="#"
                                                                  style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#111111;font-size:14px">view
                                                                  it in your browser</a></strong>.</p>
                                                  </td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                  <td align="left" style="padding:0;Margin:0;padding-top:25px">
                                                      <p
                                                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#666666;font-size:14px">
                                                          If these emails get annoying, please feel free
                                                          to&nbsp;<strong><a target="_blank" class="unsubscribe"
                                                                  href=""
                                                                  style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#111111;font-size:14px">unsubscribe</a></strong>.
                                                      </p>
                                                  </td>
                                              </tr>
                                              <tr style="border-collapse:collapse">
                                                  <td align="left" style="padding:0;Margin:0;padding-top:25px">
                                                      <p
                                                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#666666;font-size:14px">
                                                          Ceej - 1234 Main Street - Anywhere, MA - 56789</p>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>

      </td>
      </tr>
      </table>
  </div>    
      `,
  };

  return sendEmail(message);
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
  const pass = "112233"; //tạo pass random
  const user = {
    name,
    email,
  };
  await sendResetPassword({ toUser: user, pass: pass });
  res.jsonp({ message: "Please check your email!" });
 } catch (error) {
  res.jsonp({error})
 }
});


server.post("/payment", async (req, res) => {

  // const {amout, info} = req.body

  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = partnerCode + new Date().getTime() + "id";
  var orderId = new Date().getTime();
  var orderInfo = "Thanh toán qua ví MoMo";
  var redirectUrl = "http://127.0.0.1:5500/src/html/TN-1_HomePage.html";
  var ipnUrl = "http://127.0.0.1:5500/src/html/TN-1_HomePage.html";
  // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
  var amount = "50000";
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
  const reqq = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    res.setEncoding("utf8");
    res.on("data", (body) => {
      console.log("Body: ");
      console.log(body);
      console.log("payUrl: ");
      console.log(JSON.parse(body).payUrl);
    });
    res.on("end", () => {
      console.log("No more data in response.");
    });
  });

  reqq.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
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

