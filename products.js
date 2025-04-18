// Sample product data
const products = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 99.99,
        category: 'electronics',
        description: 'High-quality wireless headphones with noise cancellation.',
        image: 'https://bit.ly/4jdJOrc'
    },
    {
        id: '2',
        name: 'Smartphone',
        price: 699.99,
        category: 'electronics',
        description: 'Latest smartphone with high-resolution camera and long battery life.',
        image: 'https://bit.ly/4jdJOrc'
    },
    {
        id: '3',
        name: 'Laptop',
        price: 999.99,
        category: 'electronics',
        description: 'Powerful laptop for work and entertainment.',
        image: 'https://bit.ly/4jdJOrc'
    },
    {
        id: '4',
        name: 'T-Shirt',
        price: 19.99,
        category: 'clothing',
        description: 'Comfortable cotton t-shirt available in multiple colors.',
        image: 'https://bit.ly/4jdJOrc'
    },
    {
        id: '5',
        name: 'Jeans',
        price: 49.99,
        category: 'clothing',
        description: 'Classic fit jeans made from durable denim.',
        image: 'https://bit.ly/4jdJOrc'
    },
    {
        id: '6',
        name: 'Coffee Table',
        price: 149.99,
        category: 'home',
        description: 'Modern coffee table with glass top and wooden legs.',
        image: 'https://bit.ly/4jdJOrc'
    },
    {
        id: '7',
        name: 'Desk Lamp',
        price: 29.99,
        category: 'home',
        description: 'Adjustable desk lamp with LED lighting.',
        image: 'https://bit.ly/4jdJOrc'
    },
    {
        id: '8',
        name: 'Blender',
        price: 59.99,
        category: 'home',
        description: 'High-speed blender for smoothies and food preparation.',
        image: 'https://bit.ly/4jdJOrc'
    }
];

// Display products on the home page
function displayProducts(filterCategory = null) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    let productsToDisplay = products;
    if (filterCategory) {
        productsToDisplay = products.filter(product => product.category === filterCategory);
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description.substring(0, 60)}...</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Add event listeners to the "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

// Display product details on the product page
function displayProductDetails(productId) {
    const productDetail = document.getElementById('product-detail');
    if (!productDetail) return;

    const product = products.find(p => p.id === productId);
    if (!product) {
        productDetail.innerHTML = '<p>Product not found.</p>';
        return;
    }

    productDetail.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-info-detail">
            <h1 class="product-title">${product.name}</h1>
            <span class="product-category">${product.category}</span>
            <div class="product-price-detail">$${product.price.toFixed(2)}</div>
            <p class="product-description">${product.description}</p>
            <div class="quantity-selector">
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" value="1" min="1">
            </div>
            <div class="detail-actions">
                <button class="add-to-cart-detail" data-id="${product.id}">Add to Cart</button>
                <button class="buy-now" data-id="${product.id}">Buy Now</button>
            </div>
        </div>
    `;

    // Add event listeners
    document.querySelector('.add-to-cart-detail').addEventListener('click', function() {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCart(productId, quantity);
    });

    document.querySelector('.buy-now').addEventListener('click', function() {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCart(productId, quantity);
        window.location.href = 'cart.html';
    });
}
const product = [
    { name: "Product 1", price: "$199", imageUrl: "https://source.unsplash.com/500x500/?electronics" },
    { name: "Product 2", price: "$99", imageUrl: "https://source.unsplash.com/500x500/?clothing" },
    { name: "Product 3", price: "$149", imageUrl: "https://source.unsplash.com/500x500/?home" },
];

function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');
        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <a href="product.html?id=${product.id}" class="btn">View Details</a>
        `;
        productGrid.appendChild(productElement);
    });
}

document.addEventListener('DOMContentLoaded', displayProducts);


// Initialize products on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the home page
    if (document.getElementById('product-grid')) {
        displayProducts();
    }

    // Handle category filtering
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            displayProducts(category);
        });
    });
});