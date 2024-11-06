// To change Product Images In Single Product Pages 
let mainImg = document.getElementById('main-img');
let smImg = document.getElementsByClassName('sm-img');

for (let i = 0; i < smImg.length; i++) {
    smImg[i].onclick = function () {
        mainImg.src = smImg[i].src;
    }
}

// Add to Cart Functionality for Single Product Page
const addToCartButton = document.getElementById('add-cart');
addToCartButton.addEventListener('click', function () {
    const productName = document.querySelector('.single-product-details h4').textContent;
    const productPrice = document.querySelector('.single-product-details h2').textContent.replace('$', '').trim();
    const productImgSrc = document.getElementById('main-img').src;
    const productQty = parseInt(document.querySelector('.single-product-details input[type="number"]').value);
    const productSize = document.querySelector('.single-product-details select.size').value;

    // Ensuring size is selected before adding the product to the cart
    if (productSize === "Select Size") {
        alert('Please select a size!');
        return;
    }

    const product = {
        name: productName,
        price: parseFloat(productPrice),
        imgSrc: productImgSrc,
        qty: productQty,
        size: productSize // Add the selected size to the product object
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Product added to cart!');
    updateCartBadge(); 
});

// Function to update the cart badge count
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }
}

// Update cart badge on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});
