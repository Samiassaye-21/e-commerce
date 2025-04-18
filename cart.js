// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    updateCart();
    alert(`${quantity} ${product.name}(s) added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update quantity of item in cart
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(newQuantity) || 1;
        updateCart();
    }
}

// Update cart in localStorage and UI
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Update cart page if we're on it
    if (document.getElementById('cart-items')) {
        displayCartItems();
        updateCartSummary();
    }
    
    // Update checkout summary if we're on checkout page
    if (document.getElementById('checkout-summary')) {
        displayCheckoutSummary();
    }
}

// Update cart count in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Display cart items on cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="decrement" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                    <button class="increment" data-id="${item.id}">+</button>
                </div>
                <div class="remove-item" data-id="${item.id}">Remove</div>
            </div>
            <div class="cart-item-subtotal">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Add event listeners
    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const item = cart.find(item => item.id === productId);
            if (item && item.quantity > 1) {
                item.quantity--;
                updateCart();
            }
        });
    });

    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity++;
                updateCart();
            }
        });
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.getAttribute('data-id');
            updateQuantity(productId, this.value);
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
}

// Update cart summary on cart page
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.00; // Flat rate shipping
    const tax = subtotal * 0.08; // Example tax rate
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
}

// Display checkout summary on checkout page
function displayCheckoutSummary() {
    const checkoutSummary = document.getElementById('checkout-summary');
    if (!checkoutSummary) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.00;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    let summaryHTML = `
        <div class="checkout-items">
            <h3>Items (${cart.reduce((total, item) => total + item.quantity, 0)})</h3>
    `;

    cart.forEach(item => {
        summaryHTML += `
            <div class="checkout-item">
                <div class="checkout-item-name">${item.name} × ${item.quantity}</div>
                <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `;
    });

    summaryHTML += `
        </div>
        <div class="checkout-totals">
            <div class="checkout-total-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="checkout-total-row">
                <span>Shipping:</span>
                <span>$${shipping.toFixed(2)}</span>
            </div>
            <div class="checkout-total-row">
                <span>Tax:</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="checkout-total-row total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        </div>
    `;

    checkoutSummary.innerHTML = summaryHTML;
}

// Place order (checkout process)
function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // In a real app, you would send this data to your server
    const order = {
        date: new Date().toISOString(),
        items: [...cart],
        shipping: {
            name: document.getElementById('full-name').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            zip: document.getElementById('zip').value,
            country: document.getElementById('country').value
        },
        payment: {
            name: document.getElementById('card-name').value,
            lastFour: document.getElementById('card-number').value.slice(-4)
        }
    };

    // Save order to localStorage (in a real app, you would save to a database)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear the cart
    cart = [];
    updateCart();

    // Show confirmation (in a real app, you would redirect to a confirmation page)
    alert('Order placed successfully! Thank you for your purchase.');
    window.location.href = 'index.html';
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});