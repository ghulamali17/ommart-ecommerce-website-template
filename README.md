# Ommart Ecommerce Website Template 

## Project Description

This project is a simple eCommerce application that allows users to view various products, add them to a cart, and manage their cart items. The project features dynamic product display using JSON data, cart management with localStorage, and responsive design using CSS and media queries. It includes a product page for all items, individual product pages, and a cart page where users can update quantities or remove items.

## Features

- **Dynamic Product Display:** Products are fetched from a JSON file and displayed as product cards.
- **Add to Cart:** Users can add products to their cart from the product listing page or individual product pages.
- **Cart Management:** Users can view their cart, change product quantities, and remove items from the cart.
- **Responsive Design:** The application is fully responsive and optimized for mobile and desktop views.
- **Cart Badge Update:** The number of items in the cart is reflected in a cart badge that updates dynamically.
- **Size Selection:** Users can select different sizes for products from individual product pages, and this selection is saved in the cart.

## Technologies Used

- **HTML5**: Structuring web pages
- **CSS3**: Styling and layout (including responsive design)
- **JavaScript (ES6+)**: DOM manipulation, event handling, localStorage
- **JSON**: Product data storage
- **Bootstrap**: For basic styling and responsiveness

## Project Structure

```bash
.
├── index.html                 # Main Home page
├── cart.html                  # Cart page where users can view and manage their cart
├── shop.html                  # Shop page displaying all products dynamically
├── single-product/
│   ├── bandana.html           # Template for individual product pages
│   ├── Gym Tank.html          # Example single product page
├── scripts/
│   ├── main.js                # Main JavaScript for fetching products and handling cart functionality
│   ├── single-products.js     # JavaScript for handling product images and adding items from single product pages
│   ├── card.js                # JavaScript for dynamically displaying product cards using JSON data
├── images/                    # Folder for product images
├── shop.json                  # JSON file containing product data
├── styles/
│   ├── style.css              # CSS for general styles and layout
│   ├── Responsive.css         # CSS for responsive styles
```

## Instructions to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/ghulamali17/ommart-ecommerce-website-template
   cd ecommerce-project
   ```

2. Open the `index.html` file in your browser to view the product listing page.
3. Open the `single-product.html` page for a detailed product view.
4. Visit the `cart.html` page to manage your cart, update quantities, or remove items.

## How to Add New Products

1. Update the `shop.json` file by adding new product entries following the same format as the existing ones.
2. Update the product images in the `images/` folder and link them accordingly in the JSON data.
3. Modify `main.js` if necessary to accommodate new product attributes or functionality.

## Cart Functionality

- Products are stored in the browser’s `localStorage` to persist across page reloads.
- The cart badge will update automatically when products are added or removed.
- Users can change the quantity of products directly on the cart page, and the subtotal will update dynamically.
