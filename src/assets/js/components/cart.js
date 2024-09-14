// Cart management
let cart = [];

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemCount = document.getElementById('cart-item-count');
    const cartTotal = document.getElementById('cart-total');
    const cartDropdownItems = document.querySelector('.cart-dropdown-items');
    const cartCount = document.querySelector('.dropdown-cart .nav-link');

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    if (cartItemCount) cartItemCount.textContent = totalItems;
    if (cartTotal) cartTotal.textContent = '$' + totalPrice.toFixed(2);
    if (cartCount) cartCount.textContent = `Bag (${totalItems})`;

    if (cartDropdownItems) {
        cartDropdownItems.innerHTML = '';
        cart.forEach(item => {
            const itemElement = createCartItemElement(item);
            cartDropdownItems.appendChild(itemElement);
        });
    }
}

function createCartItemElement(item) {
    const itemElement = document.createElement('div');
    itemElement.classList.add('row', 'mx-0', 'py-4', 'g-0', 'border-bottom');
    itemElement.innerHTML = `
        <div class="col-2 position-relative">
            <picture class="d-block ">
                <img class="img-fluid" src="${item.img}" alt="Product">
            </picture>
        </div>
        <div class="col-9 offset-1">
            <div>
                <h6 class="justify-content-between d-flex align-items-start mb-2">
                    ${item.name}
                    <i class="ri-close-line ms-3" onclick="removeFromCart(${item.id})"></i>
                </h6>
                <span class="d-block text-muted fw-bolder text-uppercase fs-9">Qty: ${item.quantity}</span>
            </div>
            <p class="fw-bolder text-end text-muted m-0">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
    `;
    return itemElement;
}

// Initialize cart display and add event listeners when the page loads
document.addEventListener('DOMContentLoaded', function () {
    updateCartDisplay();

    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const productId = this.dataset.productId;
            const productName = this.dataset.productName;
            const productPrice = parseFloat(this.dataset.productPrice);
            const productImg = this.dataset.productImg;

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                img: productImg
            };

            addToCart(product);
        });
    });
});

// Optional: Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Optional: Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Call loadCart when the page loads to restore the previous cart state
document.addEventListener('DOMContentLoaded', loadCart);

// Call saveCart whenever the cart is updated
function updateCartDisplay() {
    // ... existing updateCartDisplay code ...
    saveCart();
}