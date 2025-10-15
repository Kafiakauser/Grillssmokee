async function loadMenu() {
  const response = await fetch('/api/menu');
  const data = await response.json();

  const menuDiv = document.getElementById('menu');
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
    `;
    menuDiv.appendChild(card);
  });
}

loadMenu();
