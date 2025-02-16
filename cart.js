let cart = [];

function addToCart(productId) {
const product = getProductById(productId);

const existingProduct = cart.find(item => item.id === product.id);

if (existingProduct) {
    existingProduct.quantity++;
} else {
    cart.push({ ...product, quantity: 1 });
}

updateCart();
}
// products
function getProductById(productId) {
const products = [
    { id: 1, name: 'Foundation', price: 39.00 },
    { id: 2, name: 'Mascara', price: 15.00 },
    { id: 3, name: 'Lipstick', price: 25.00 },
    { id: 4, name: 'Blush', price: 33.00 },
    { id: 5, name: 'Eyeshadow Palette', price: 56.00 },
    { id: 6, name: 'Eyeliner', price: 25.00 },
    { id: 7, name: 'Concealer', price: 30.00 },
    { id: 8, name: 'Setting Spray', price: 38.00 },
    { id: 9, name: 'Highlighter', price: 33.00 },
];
return products.find(product => product.id === productId);
}
function updateCart() {
const cartItemsContainer = document.getElementById('cart-items');
const totalElement = document.getElementById('cart-total').querySelector('h3');
cartItemsContainer.innerHTML = '';
let totalPrice = 0;

cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    
    cartItem.innerHTML = `
        <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
        <button class="increase" onclick="updateQuantity(${item.id}, 1)">+</button>
        <button class="decrease" onclick="updateQuantity(${item.id}, -1)">-</button>
        <button class="remove" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    
    cartItemsContainer.appendChild(cartItem);
    totalPrice += item.price * item.quantity;
});

totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}
// increase and decrease
function updateQuantity(productId, change) {
const product = cart.find(item => item.id === productId);
if (product) {
    product.quantity += change;

    if (product.quantity <= 0) {
    removeFromCart(productId);
    } else {
    updateCart();
    }
}
}
// remove
function removeFromCart(productId) {
cart = cart.filter(item => item.id !== productId);
updateCart();
}
// clear
document.getElementById('clear-cart').addEventListener('click', () => {
cart = [];
updateCart();
});
// checkout 
document.getElementById('checkout').addEventListener('click', () => {
if (cart.length === 0) {
    alert('Your cart is empty. Add some items before checking out!');
} else {
    alert('Checkout successful! Total: $' + calculateTotal().toFixed(2));
    cart = [];
    updateCart();
}
});
// total
function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
