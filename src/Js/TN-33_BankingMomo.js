const amount = parseInt(price); 
await payment(amount);
console.log(payment(amount));

const payments = "http://pnv-hair.onrender.com/payment";
async function payment(amount) {
  try {
    const response = await axios.post(payments, { amount });
    console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
}
