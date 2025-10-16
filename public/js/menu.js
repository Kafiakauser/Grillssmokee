document.addEventListener("DOMContentLoaded", async () => {
  const menuContainer = document.getElementById("menu-container");

  try {
    const response = await fetch("/api/menu");
    const menuItems = await response.json();

    menuContainer.innerHTML = menuItems
      .map(
        (item) => `
        <div class="menu-item">
          <img src="${item.image}" alt="${item.name}" />
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <p class="price">$${item.price}</p>
          <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        </div>
      `
      )
      .join("");

    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const selectedItem = menuItems.find((item) => item.id == id);
        addToCart(selectedItem);
      });
    });
  } catch (err) {
    menuContainer.innerHTML = "<p>Error loading menu. Please try again later.</p>";
  }
});

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item.name} added to cart!`);
}
