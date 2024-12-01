// show cards dynamicall
document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector(".product-container");
  const template = document.querySelector("#productTemplate");
  console.log(document.querySelector("#productTemplate"));
  console.log(document.querySelector(".product-container"));

  if (!template) {
    console.error("Template not found!");
    return;
  }

  // Fetch JSON file and display products
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        showProduct(product);
      });
    })
    .catch((error) => {
      console.error("Error fetching the JSON file:", error);
    });

  function showProduct(product) {
    const productClone = document.importNode(template.content, true);
    productClone.querySelector(".productImg").src = product.image;
    productClone.querySelector(".product-name").textContent =
      product.productName;
    productClone.querySelector(".actual-price-text").textContent =
      product.actualPrice;
    productClone.querySelector(".discount-price-text").textContent =
      product.discountPrice;
    productClone.querySelector(".reviews").textContent = `(${product.reviews})`;

    const seeMoreBtn = productClone.querySelector(".pro-details-btn");
    seeMoreBtn.addEventListener("click", () => {
      window.open(product.productUrl, "_blank");
    });

    productContainer.appendChild(productClone);
  }
});

// dynamically createing "Add to Cart" buttons
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    addToCart(event);
  }
});
