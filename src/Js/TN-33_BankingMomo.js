const payments = "http://localhost:4002/payment";
const amount = parseInt(price); 
await payment(amount);
console.log(payment(amount));
async function payment(amount) {
  try {
    const response = await axios.post(payments, { amount });
    console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
}