// Responsive Navbar
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");
bar.addEventListener("click", () => {
  nav.classList.toggle("active");
});
close.addEventListener("click", () => {
  nav.classList.remove("active");
});

// Function to update product count in add to cart badge and product track
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartBadges = document.querySelectorAll(".cart-badge");
  const producttrack = document.querySelector(".cart-heading");
  if (producttrack) {
    producttrack.innerText =
      cart.length === 0
        ? "Cart is empty"
        : `${cart.length} ${cart.length === 1 ? "Item" : "Items"} in cart`;
  }
  cartBadges.forEach((badge) => {
    badge.textContent = cart.length;
  });
}

// Function to create a cart row
function createCartRow(item, index) {
  const newRow = document.createElement("tr");
  newRow.classList.add("cart-content");
  newRow.innerHTML = `
        <td><a href="#" class="remove-btn" data-index="${index}"><i class="fa-solid fa-circle-xmark"></i></a></td>
        <td><img src="${item.imgSrc}" alt="Product Image"></td>
        <td>${item.name}</td>
        <td>
            <select class="size-cart">
                <option ${
                  item.size === "Select Size" ? "selected" : ""
                }>Select Size</option>
                <option ${item.size === "XL" ? "selected" : ""}>XL</option>
                <option ${item.size === "XXL" ? "selected" : ""}>XXL</option>
                <option ${
                  item.size === "Small" ? "selected" : ""
                }>Small</option>
                <option ${
                  item.size === "Large" ? "selected" : ""
                }>Large</option>
            </select>
        </td>
        <td class="p-price">${item.price}$</td>
        <td><input type="number" value="${
          item.qty
        }" class="productQty" data-index="${index}"></td>
        <td class="sub-total">${calculateSubtotal(item.price, item.qty)}$</td>
    `;
  return newRow;
}

// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

function addToCart(event) {
  const button = event.target.closest(".add-to-cart-btn");
  const productCard = button.closest(".more-product-box");
  const productName = productCard.querySelector("h4").textContent;
  const productPrice = productCard
    .querySelector(".discount-price p")
    .textContent.replace("$", "");
  const productImgSrc = productCard.querySelector("img").src;

  const product = {
    name: productName,
    price: parseFloat(productPrice),
    imgSrc: productImgSrc,
    qty: 1,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product added to cart!");
  updateCartBadge();
}

// Cart Page Initialization and Functionality
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  const cartTableBody = document.querySelector(".cartTable tbody");

  if (!cartTableBody) {
    return;
  }
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartTableBody.innerHTML = "";
  cart.forEach((item, index) => {
    const newRow = createCartRow(item, index);
    cartTableBody.appendChild(newRow);
  });

  // Event Listener to handle removing items from the cart
  document.addEventListener("click", (event) => {
    if (event.target.closest(".remove-btn")) {
      const index = event.target.closest(".remove-btn").dataset.index;
      removeFromCart(index);
    }
  });

  // Event Listener to handle quantity input changes
  document.addEventListener("input", (event) => {
    if (event.target.classList.contains("productQty")) {
      updateSubTotal();
    }
  });

  updateSubTotal();
});

// Function to calculate the subtotal for the product
function calculateSubtotal(price, qty) {
  return (price * qty).toFixed(2);
}

// Calculate and update the subtotal of each item
function updateSubTotal() {
  const productQtyInputs = document.getElementsByClassName("productQty");
  const productPrices = document.getElementsByClassName("p-price");
  const subtotalElements = document.getElementsByClassName("sub-total");

  Array.from(productQtyInputs).forEach((qtyInput, index) => {
    const quantity = parseFloat(qtyInput.value) || 0;
    const price = parseFloat(
      productPrices[index].textContent.replace("$", "").trim()
    );
    const subtotal = calculateSubtotal(price, quantity);
    subtotalElements[index].textContent = `$${subtotal}`;
  });

  updateTotal();
}

// Calculate and update the total price for the cart page
function updateTotal() {
  const subTotalElements = document.getElementsByClassName("sub-total");
  let total = Array.from(subTotalElements).reduce((acc, el) => {
    const price = parseFloat(el.textContent.replace("$", "").trim());
    return acc + price;
  }, 0);
  document.querySelectorAll(".finalTotal").forEach((el) => {
    el.textContent = `$${total.toFixed(2)}`;
  });
}

// Remove item from the cart and update the table
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  const cartTableBody = document.querySelector(".cartTable tbody");
  if (cartTableBody) {
    cartTableBody.innerHTML = "";
    cart.forEach((item, idx) => {
      const newRow = createCartRow(item, idx);
      cartTableBody.appendChild(newRow);
    });
    updateTotal();
  }
  updateCartBadge();
}
