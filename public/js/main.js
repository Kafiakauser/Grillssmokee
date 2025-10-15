// Fetch menu data from backend and display
const menuContainer = document.getElementById("menu-container");
const cartList = document.getElementById("cart-list");
const totalElement = document.getElementById("total");

let cart = [];
let total = 0;

// Load menu from backend API
fetch("/api/menu")
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("menu-item");
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
      `;
      menuContainer.appendChild(div);
    });
  })
  .catch(() => {
    menuContainer.innerHTML = "<p>Failed to load menu 😞</p>";
  });

// Add item to cart
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;

  const li = document.createElement("li");
  li.textContent = `${name} - ₹${price}`;
  cartList.appendChild(li);
  totalElement.textContent = `Total: ₹${total}`;
}
