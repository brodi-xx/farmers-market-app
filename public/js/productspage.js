// Assuming you have a button with the ID "add-to-cart-btn"
const addToCartButton = document.getElementById("add-to-cart-btn");

// Add an event listener to the button
document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "add-to-cart-btn") {
    const productId = event.target.children[0].innerText;
    addToCart(productId);

  }
});

async function getUserId() {
  try {
    const response = await fetch('/api/session');
    const data = await response.json();
    return data.user_id;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function getProduct(cart_id, product_id) {
  try {
    const response = await fetch(`/api/cart-product?cart_id=${cart_id}&product_id=${product_id}`);
    const data = await response.json();
    console.log(data);
    if(data) {
      return data[0];
    }
    return null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Fetch user shopping cart from the server
async function getUserShoppingCart(userId) {
  console.log("user test");
  try {
    const response = await fetch(`/api/user-shopping-cart?` + new URLSearchParams({
      user_id: userId
    }), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const shoppingCart = await response.json();

    // If the user has no shopping cart, return null
    if (shoppingCart.length === 0) {
      return null;
    }

    // Otherwise, return the shopping cart
    return shoppingCart[0];  // Assuming the API returns an array
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Create user shopping cart on the server
async function createUserShoppingCart(userId) {
  try {
    const response = await fetch('/api/user-shopping-cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id: userId }) // replace this with the actual data you want to send
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const newShoppingCart = await response.json();

    return newShoppingCart;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Add product to the user's shopping cart
async function addProductToCart(cartId, productId, amount, cartProductId) {
  try {
    console.log(amount);
    let method = 'POST' 
    let path = '/api/cart-product/'
    if(amount > 1) {
      method = 'PUT'
      path += cartProductId
    };
    
    const response = await fetch( path, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cart_id: cartId, product_id: productId, amount: amount })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const cartProduct = await response.json();

    return cartProduct;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function addToCart(productId) {
  try {
    // Retrieve the user ID
    const userId = await getUserId();
    // if(!userId || userId == '') {
    //   return
    // };

    // 1. Check if the user already has a shopping cart
    let userShoppingCart = await getUserShoppingCart(userId);

    // If not, create one
    if (!userShoppingCart) {
      userShoppingCart = await createUserShoppingCart(userId);
    }
    let product = await getProduct(userShoppingCart.cart_id, productId);
    let amount = 1
    let cartProductId = null;
    console.log(product);
    if(product) {
      cartProductId = product.cart_product_id
      amount = product.amount + 1
    }
    // 2. Add product to the user's shopping cart
    await addProductToCart(userShoppingCart.cart_id, productId, amount, cartProductId);
  } catch (err) {
    console.error(err);
  }
}
