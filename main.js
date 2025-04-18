// Main JavaScript file that ties everything together

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle product card clicks (navigation to product page)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.product-card') && !e.target.classList.contains('add-to-cart')) {
            const productCard = e.target.closest('.product-card');
            const productId = productCard.querySelector('.add-to-cart').getAttribute('data-id');
            window.location.href = `product.html?id=${productId}`;
        }
    });

    // Add any other global event listeners or initialization code here
});

// Utility function to format currency
function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}