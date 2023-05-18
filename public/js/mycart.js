document.addEventListener("DOMContentLoaded", function() {
  // using the "cart" from localStorage, get the cart from localStorage (should contain the product name and product price) and create and append it into the FE cart
    // const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    // const cartItemsList = document.getElementById("cart-items");
    // const cartTotal = document.getElementById("cart-total");
    // const checkoutBtn = document.getElementById("checkout-btn");
    
    // Run an API request to fetch the user's products they added to their cart
    let cartTotalValue = 0;
    addToCartButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        const productName = this.previousElementSibling.textContent;
        const productPrice = parseFloat(this.getAttribute("data-price"));
        const cartItem = document.createElement("li");
        cartItem.textContent = `${productName} - $${productPrice}`;
        cartItemsList.appendChild(cartItem);
        cartTotalValue += productPrice;
        cartTotal.textContent = cartTotalValue.toFixed(2);
      });
    });
    checkoutBtn.addEventListener("click", function() {
      // Perform the checkout process
      alert("Checkout completed!");
      cartItemsList.innerHTML = "";
      cartTotalValue = 0;
      cartTotal.textContent = cartTotalValue.toFixed(2);
    });
  });