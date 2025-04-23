let signedUser = JSON.parse(localStorage.getItem("signedUser")) || {};
let usernameDisplay = document.getElementById("usernameDisplay");

if (signedUser) {
  usernameDisplay.innerText = signedUser.username;
}
let currentProductToView = JSON.parse(
  localStorage.getItem("currentProductToView")
);

let productDetails = document.getElementsByClassName(
  "product-details-container"
)[0];

productDetails.innerHTML = "";

productDetails.innerHTML = `
        <div class="product-image-container">
          <img
            src="${currentProductToView.image}"
            alt="Product Image"
          />
        </div>
        <div class="product-info-container">
          <span class="product-category">${currentProductToView.category}</span>
          <h1 class="product-title">
            ${currentProductToView.title}
          </h1>
          <p class="product-price">$${currentProductToView.price}</p>
          <p class="product-description">
          ${currentProductToView.description}
          </p>

          <div class="product-meta">
            <div class="meta-item">
              <span class="meta-label">Availability:</span>
              <span class="meta-value in-stock">In Stock (${currentProductToView.rating["count"]})</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Product ID:</span>
              <span class="meta-value">${currentProductToView.id}</span>
            </div>
          </div>

          <div class="product-actions">
            <div class="quantity-container">
              <span class="quantity-label">Quantity:</span>
              <input
                type="number"
                id="product-qty"
                class="quantity-input"
                value="1"
                min="1"
                max="12"
              />
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${currentProductToView.id})">
              <i class="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>

`;

function addToCart(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      let users = JSON.parse(localStorage.getItem("userList"));
      let productQty = document.getElementById("product-qty").value;
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].username === signedUser.username &&
          users[i].email === signedUser.email
        ) {
          let isProductFound = false;

          users[i].cart = users[i].cart.map((item) => {
            if (item.productId === product.id) {
              isProductFound = true;
              return {
                ...item,
                quantity: Number(productQty),
              };
            }
            return item;
          });

          if (!isProductFound) {
            users[i].cart.push({
              productId: product.id,
              title: product.title,
              category: product.category,
              price: product.price,
              image: product.image,
              quantity: Number(productQty),
            });
          }

          console.log("found and updated");
          console.log(users[i]);
          break;
        }
      }

      localStorage.setItem("userList", JSON.stringify(users));
      alert(`${product.title} was added to your cart successfully!`);
      window.location.href = "../templates/cartPage.html";
    })
    .catch((err) => console.error("Failed to fetch the product:", err));
}
