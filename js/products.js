document.addEventListener("DOMContentLoaded", () => {
  fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("products-body");
      data.products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.title}</td>
          <td>${product.brand}</td>
          <td><button class="btn btn-info btn-sm" onclick="showProductDetail(${product.id})">Ver</button></td>
        `;
        tbody.appendChild(row);
      });
    });
});

function showProductDetail(id) {
  fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
      document.getElementById("modal-title").textContent = product.title;
      document.getElementById("modal-body").innerHTML = `
        <p><strong>Descripción:</strong> ${product.description}</p>
        <p><strong>Precio:</strong> $${product.price}</p>
        <img src="${product.thumbnail}" class="img-fluid mt-2"/>
      `;
      new bootstrap.Modal(document.getElementById("detailModal")).show();
    });
}