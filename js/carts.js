document.addEventListener("DOMContentLoaded", () => {
  fetch("https://dummyjson.com/carts")
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("carts-body");
      data.carts.forEach(cart => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${cart.id}</td>
          <td>${cart.userId}</td>
          <td>${cart.totalProducts}</td>
          <td><button class="btn btn-info btn-sm" onclick="showCartDetail(${cart.id})">Ver</button></td>
        `;
        tbody.appendChild(row);
      });
    });
});

function showCartDetail(id) {
  fetch(`https://dummyjson.com/carts/${id}`)
    .then(res => res.json())
    .then(cart => {
      let items = cart.products.map(p => `<li>${p.title} x${p.quantity} - $${p.price}</li>`).join("");
      document.getElementById("modal-title").textContent = `Carrito #${cart.id}`;
      document.getElementById("modal-body").innerHTML = `
        <ul>${items}</ul>
        <p><strong>Total:</strong> $${cart.total}</p>
      `;
      new bootstrap.Modal(document.getElementById("detailModal")).show();
    });
}
