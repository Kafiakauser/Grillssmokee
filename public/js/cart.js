// cart.js — Display and manage cart
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalDisplay.textContent = "Total: $0.00";
      return;
    }

    let total = 0;
    cartContainer.innerHTML = cart
      .map((item, index) => {
        total += item.price * item.quantity;
        return `
          <div class="cart-item">
            <span>${item.name}</span>
            <div class="quantity-controls">
              <button class="btn small-btn decrease" data-index="${index}">-</button>
              <span>${item.quantity}</span>
              <button class="btn small-btn increase" data-index="${index}">+</button>
            </div>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `;
      })
      .join("");

    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;

    document.querySelectorAll(".increase").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        cart[index].quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      })
    );

    document.querySelectorAll(".decrease").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      })
    );
  }

  renderCart();
});
