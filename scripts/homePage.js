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
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      let users = JSON.parse(localStorage.getItem("userList"));
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
                quantity: item.quantity + 1,
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
              quantity: 1,
            });
          }

          console.log("found and updated");
          console.log(users[i]);
          break;
        }
      }

      localStorage.setItem("userList", JSON.stringify(users));
      alert(`${product.title} was added to your cart successfully!`);
    })
    .catch((err) => console.error("Failed to fetch the product:", err));
}

function viewDetails(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      localStorage.setItem("currentProductToView", JSON.stringify(product));
      window.location.href = "../templates/productPage.html";
    })
    .catch((err) => console.error("Failed to fetch the product:", err));
}
