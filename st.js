// If the server is on a different domain than the client then this needs to be the full url
// http://localhost:3000/create-checkout-session
//document.querySelector(".submitbtn").addEventListener("click", async () => {
//  console.log("checkout")
window.onload = async () => {
try {
const response = await fetch("/create-checkout-session", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  // Send along all the information about the items
  body: JSON.stringify({
    items: [
      {
        id: 1,
        quantity: 2,
      },
      {
        id: 2,
        quantity: 1,
      },
    ], 
  }),
});
if(response.ok) {
  console.log("yes");
  const url = await response.json();
  console.log("Response from server:", url);
  window.location.href = url;
} else {
  console.error("Expected url property not found in response:", response);
}
} catch (error) {
 console.log(error.stack)
  console.log(error.message);
}
}
//});