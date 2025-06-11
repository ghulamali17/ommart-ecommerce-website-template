document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector(".product-container");
  const template = document.querySelector("#productTemplate");
  const paginationSection = document.querySelector(".pagination");

  const PRODUCTS_PER_PAGE = 8;
  let currentPage = 1;
  let products = [];

  // Fetch
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderProducts(currentPage);
      createPagination();
    })
    .catch((error) => {
      console.error("Error fetching the JSON file:", error);
    });

  // Render products 
  function renderProducts(page) {
    productContainer.innerHTML = "";
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const paginatedItems = products.slice(start, end);
    paginatedItems.forEach((product) => showProduct(product));
  }

  // Display one product
  function showProduct(product) {
    const productClone = document.importNode(template.content, true);
    productClone.querySelector(".productImg").src = product.image;
    productClone.querySelector(".product-name").textContent = product.productName;
    productClone.querySelector(".actual-price-text").textContent = product.actualPrice;
    productClone.querySelector(".discount-price-text").textContent = product.discountPrice;
    productClone.querySelector(".reviews").textContent = `(${product.reviews})`;

    productClone.querySelector(".pro-details-btn").addEventListener("click", () => {
      window.open(product.productUrl, "_blank");
    });

    productContainer.appendChild(productClone);
  }

  // Create pagination controls
  function createPagination() {
    paginationSection.innerHTML = "";
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement("a");
      pageLink.href = "#";
      pageLink.textContent = i;
      pageLink.classList.toggle("active", i === currentPage);
      pageLink.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = i;
        renderProducts(currentPage);
        updateActivePage();
      });
      paginationSection.appendChild(pageLink);
    }

    // Next button
    if (totalPages > 1) {
      const nextBtn = document.createElement("a");
      nextBtn.href = "#";
      nextBtn.innerHTML = '<i class="fa-solid fa-arrow-right-long"></i>';
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
          currentPage++;
          renderProducts(currentPage);
          updateActivePage();
        }
      });
      paginationSection.appendChild(nextBtn);
    }
  }

  function updateActivePage() {
    const links = paginationSection.querySelectorAll("a");
    links.forEach((link, index) => {
      if (parseInt(link.textContent) === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
});

// Cart interaction
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    addToCart(event);
  }
});
