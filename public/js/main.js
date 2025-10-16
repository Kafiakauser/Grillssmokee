// main.js

// Load cart from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add an item to cart
function addToCart(itemName, itemPrice) {
  const existingItem = cart.find(item => item.name === itemName);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: itemName, price: itemPrice, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${itemName} added to cart!`);
  updateCartCount();
}

// Function to update cart count in navbar
function updateCartCount() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartButton = document.querySelector(".cart-count");
  if (cartButton) {
    cartButton.textContent = cartCount;
  }
}

// Function to display cart items on cart.html
function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");

  if (!cartContainer) return; // Exit if not on cart page

  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <span>₹${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
      `;
      cartContainer.appendChild(itemElement);
      total += item.price * item.quantity;
    });
  }

  totalContainer.textContent = `Total: ₹${total.toFixed(2)}`;
}

// Function to remove an item
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Function to clear cart
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  displayCart();
  updateCartCount();
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCart();
});
