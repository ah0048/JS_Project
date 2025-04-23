let signedUser = JSON.parse(localStorage.getItem("signedUser")) || {};
let users = JSON.parse(localStorage.getItem("userList")) || [];
let cartItems = document.getElementById("cart-items");
let cartSummery = document.getElementById("cart-summary");
let quantityInput = document.getElementById("quantity-input");
let usernameDisplay = document.getElementById("usernameDisplay");

if (signedUser) {
  usernameDisplay.innerText = signedUser.username;
}
updatedCart();
function updatedCart() {
  cartItems.innerHTML = "";
  cartSummery.innerHTML = "";
  let signedUser = JSON.parse(localStorage.getItem("signedUser")) || {};
  let users = JSON.parse(localStorage.getItem("userList")) || [];
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].username === signedUser.username &&
      users[i].email === signedUser.email
    ) {
      cartItems.innerHTML = "";
      cartSummery.innerHTML = "";
      let totatPrice = 0;
      users[i].cart.forEach((product) => {
        let cartItem = document.createElement("div");
        cartItem.innerHTML = `
            <div class="cart-item">
            <div class="item-image">
              <img
                src="${product.image}"
                alt="Product"
              />
            </div>
            <div class="item-details">
              <h3 class="item-title">${product.title}</h3>
              <p class="item-category">${product.category}</p>
            </div>
            <div class="item-price">$${product.price}</div>
            <div class="item-quantity">
              <input oninput="handleQuantityChange(this, ${
                product.productId
              })" type="number" min="1" value="${
          product.quantity
        }" class="quantity-input" />
            </div>
            <div class="item-total">$${product.price * product.quantity}</div>
            <div class="item-remove">
              <button onclick="removeProduct(${
                product.productId
              })" id="remove-product" class="remove-btn"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        `;
        totatPrice += product.price * product.quantity;
        cartItems.appendChild(cartItem);
      });
      if (totatPrice === 0) {
        cartSummery.innerHTML =
          "<p> You haven't added any products to your cart yet. </p>";
      } else {
        cartSummery.innerHTML = `
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>$${totatPrice.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Shipping:</span>
            <span>$10.00</span>
        </div>
        <div class="summary-row total">
            <span>Total:</span>
            <span>$${(totatPrice + 10).toFixed(2)}</span>
        </div>
        <button onclick="shipOrder()" class="buy-now-btn">Buy Now</button>
    `;
      }
    }
    break;
  }
}

function handleQuantityChange(inputElement, productId) {
  const value = inputElement.value;
  let signedUser = JSON.parse(localStorage.getItem("signedUser")) || {};
  let users = JSON.parse(localStorage.getItem("userList")) || [];
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].username === signedUser.username &&
      users[i].email === signedUser.email
    ) {
      users[i].cart = users[i].cart.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: Number(value),
          };
        }
        return item;
      });
      localStorage.setItem("userList", JSON.stringify(users));
    }
    break;
  }
  updatedCart();
}

function removeProduct(productId) {
  let signedUser = JSON.parse(localStorage.getItem("signedUser")) || {};
  let users = JSON.parse(localStorage.getItem("userList")) || [];
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].username === signedUser.username &&
      users[i].email === signedUser.email
    ) {
      let indexToDelete = users[i].cart.findIndex(
        (item) => item.productId === productId
      );

      if (indexToDelete !== -1) {
        users[i].cart.splice(indexToDelete, 1);
        localStorage.setItem("userList", JSON.stringify(users));
      }
    }
    break;
  }
  updatedCart();
}

function shipOrder() {
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].username === signedUser.username &&
      users[i].email === signedUser.email
    ) {
      users[i].cart = [];
      localStorage.setItem("userList", JSON.stringify(users));
      window.location.href = "../templates/shippingPage.html";
    }
    break;
  }
}
