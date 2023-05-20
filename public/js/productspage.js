// Assuming you have a button with the ID "add-to-cart-btn"
const addToCartButton = document.getElementById("add-to-cart-btn");

// Add an event listener to the button
addToCartButton.addEventListener("click", addToCart);

// Function to handle the "Add to Cart" functionality
function addToCart() {
  // Get the product details (name, price, etc.) from the product page
  const productName = document.getElementById("product-name").textContent;
  const productPrice = parseFloat(document.getElementById("product-price").textContent);

  // Create an object to store the product details
  const product = {
    name: productName,
    price: productPrice
  };

  console.log (product)
  // Add the product to the cart in localStorage
  addToLocalStorage(product);

  // Redirect to the cart page
  window.location.href = "/mycart"; 
}

// Function to add the product to the cart in localStorage
function addToLocalStorage(product) {
  // Check if there are existing cart items in localStorage
  let cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
  } else {
    cartItems = [];
  }

  // Add the product to the cart items
  cartItems.push(product);

  // Update the cart items in localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// If you have multiple cards, you can use a loop or querySelectorAll to get all the cards
var card = document.querySelector('.card');

card.addEventListener('mouseover', function() {
  this.querySelector('.card-img-top').classList.add('darken');
});

card.addEventListener('mouseout', function() {
  this.querySelector('.card-img-top').classList.remove('darken');
});
