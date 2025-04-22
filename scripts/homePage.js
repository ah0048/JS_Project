let usernameDisplay = document.getElementById("usernameDisplay");
let signedUser = JSON.parse(localStorage.getItem("signedUser")) || {};
let logoutBtn = document.getElementById("logout-btn");
let allProducts = document.getElementById("allProducts");
let elecCategory = document.getElementById("Electronics");
let jewelsCategory = document.getElementById("Jewelery");
let menClothCategory = document.getElementById("Men-Clothing");
let womenClothCategory = document.getElementById("Women-Clothing");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("signedUser");
});
if (signedUser) {
  usernameDisplay.innerText = signedUser.username;
}

fetchAllProducs();

allProducts.addEventListener("click", () => {
  allProducts.classList.add("active");
  elecCategory.classList.remove("active");
  jewelsCategory.classList.remove("active");
  menClothCategory.classList.remove("active");
  womenClothCategory.classList.remove("active");
  fetchAllProducs();
});

elecCategory.addEventListener("click", () => {
  allProducts.classList.remove("active");
  elecCategory.classList.add("active");
  jewelsCategory.classList.remove("active");
  menClothCategory.classList.remove("active");
  womenClothCategory.classList.remove("active");
  fetchProductsCategory("electronics");
});

jewelsCategory.addEventListener("click", () => {
  allProducts.classList.remove("active");
  elecCategory.classList.remove("active");
  jewelsCategory.classList.add("active");
  menClothCategory.classList.remove("active");
  womenClothCategory.classList.remove("active");
  fetchProductsCategory("jewelery");
});

menClothCategory.addEventListener("click", () => {
  allProducts.classList.remove("active");
  elecCategory.classList.remove("active");
  jewelsCategory.classList.remove("active");
  menClothCategory.classList.add("active");
  womenClothCategory.classList.remove("active");
  fetchProductsCategory("men's clothing");
});

womenClothCategory.addEventListener("click", () => {
  allProducts.classList.remove("active");
  elecCategory.classList.remove("active");
  jewelsCategory.classList.remove("active");
  menClothCategory.classList.remove("active");
  womenClothCategory.classList.add("active");
  fetchProductsCategory("women's clothing");
});

function fetchAllProducs() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => {
      let productsGrid = document.getElementsByClassName("products-grid")[0];
      productsGrid.innerHTML = "";
      products.forEach((product) => {
        let productCard = document.createElement("div");
        productCard.innerHTML = `
            <div class="product-card">
              <div class="product-image">
                <img
                  src="${product.image}"
                  alt="Product"
                />
              </div>
              <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <div class="product-buttons">
                  <button class="btn view-details" onclick="viewDetails(${product.id})">View Details</button>
                  <button class="btn add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
              </div>
            </div>
          `;
        productsGrid.appendChild(productCard);
      });
    })
    .catch((err) => console.error("Failed to fetch products:", err));
}

function fetchProductsCategory(category) {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((products) => {
      let productsGrid = document.getElementsByClassName("products-grid")[0];
      productsGrid.innerHTML = "";
      products.forEach((product) => {
        let productCard = document.createElement("div");
        productCard.innerHTML = `
        <div class="product-card">
          <div class="product-image">
            <img
              src="${product.image}"
              alt="Product"
            />
          </div>
          <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price}</p>
            <div class="product-buttons">
              <button class="btn view-details" onclick="viewDetails(${product.id})">View Details</button>
              <button class="btn add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
          </div>
        </div>
      `;
        productsGrid.appendChild(productCard);
      });
    })
    .catch((err) => console.error("Failed to fetch products:", err));
}

function addToCart(productId) {
  console.log(productId);
}

function viewDetails(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      localStorage.setItem("currentProductToView", JSON.stringify(product));
    })
    .catch((err) => console.error("Failed to fetch the product:", err));
  window.location.href = "../templates/productPage.html";
}
