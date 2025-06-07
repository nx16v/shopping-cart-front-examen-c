let allUsers = []; 

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://dummyjson.com/users")
    .then(res => res.json())
    .then(data => {
      allUsers = data.users;
      renderUsers(allUsers);
    })
    .catch(error => {
      console.error("Error al cargar usuarios:", error);
      document.getElementById("info").innerHTML = '<h3 class="text-danger">No se pudo cargar la lista de usuarios</h3>';
    });
});

function renderUsers(users) {
  const tbody = document.getElementById("users-body");
  tbody.innerHTML = "";

  users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.firstName} ${user.lastName}</td>
      <td>${user.email}</td>
      <td><button class="btn btn-info btn-sm" onclick="showUserDetail(${user.id})">Ver</button></td>
    `;
    tbody.appendChild(row);
  });
}

function showUserDetail(id) {
  fetch(`https://dummyjson.com/users/${id}`)
    .then(res => res.json())
    .then(user => {
      document.getElementById("modal-title").textContent = user.firstName + " " + user.lastName;
      document.getElementById("modal-body").innerHTML = `
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Edad:</strong> ${user.age}</p>
        <p><strong>Teléfono:</strong> ${user.phone}</p>
        <p><strong>Dirección:</strong> ${user.address.address}</p>
      `;
      new bootstrap.Modal(document.getElementById("detailModal")).show();
    })
    .catch(error => {
      console.error("Error al obtener detalles:", error);
      document.getElementById("info").innerHTML = '<h3 class="text-danger">No se pudo obtener el detalle del usuario</h3>';
    });
}

function getUser(idUser) {
  const DUMMY_ENDPOINT = 'https://dummyjson.com/users/' + idUser;
  fetch(DUMMY_ENDPOINT, {
    method: 'GET',
    headers: { 'Content-type': 'application/json' }
  })
    .then(response => {
      return response.json().then(data => ({
        status: response.status,
        info: data
      }));
    })
    .then(result => {
      if (result.status === 200) {
        showModalUser(result.info);
      } else {
        document.getElementById('info').innerHTML = '<h3>No se encontró el usuario en la API</h3>';
      }
    })
    .catch(error => {
      console.error("Error en la consulta:", error);
      document.getElementById("info").innerHTML = '<h3 class="text-danger">Error al buscar el usuario</h3>';
    });
}

function showModalUser(user) {
  const existingModal = document.getElementById('showModalUser');
  if (existingModal) existingModal.remove();

  const modalUser = `
    <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card">
              <img src="${user.image}" class="card-img-top" alt="Avatar del usuario">
              <div class="card-body">
                <h5 class="card-title">Información del usuario</h5>
                <p class="card-text">Correo: ${user.email}</p>
                <p class="card-text">Nombre: ${user.firstName}</p>
                <p class="card-text">Apellido: ${user.lastName}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modalUser').innerHTML = modalUser;
  const modal = new bootstrap.Modal(document.getElementById('showModalUser'));
  modal.show();
}

function addUser() {
  const existingModal = document.getElementById('showModalUser');
  if (existingModal) existingModal.remove();

  const modalUser = `
    <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user-plus"></i> Agregar Usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <form id="formAddUser">
                  <div class="row">
                    <div class="col">
                      <input type="text" id="first_name" class="form-control" placeholder="Primer nombre" required>
                    </div>
                    <div class="col">
                      <input type="text" id="last_name" class="form-control" placeholder="Apellidos" required>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col">
                      <input type="email" id="email" class="form-control" placeholder="Correo" required>
                    </div>
                    <div class="col">
                      <input type="url" id="avatar" class="form-control" placeholder="Link del avatar" required>
                    </div>
                  </div>
                  <div class="row mt-3 text-center">
                    <div class="col">
                      <button type="button" class="btn btn-success" onclick="saveUser()">
                        <i class="fa-solid fa-floppy-disk"></i> Guardar
                      </button>
                    </div>
                  </div> 
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modalUser').innerHTML = modalUser;
  const modal = new bootstrap.Modal(document.getElementById('showModalUser'));
  modal.show();
}

function saveUser() {
  const form = document.getElementById('formAddUser');
  if (form.checkValidity()) {
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const image = document.getElementById('avatar').value;

    const user = { firstName, lastName, email, image };

    const DUMMY_ENDPOINT = 'https://dummyjson.com/users/add';
    fetch(DUMMY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json().then(data => ({
          status: response.status,
          info: data
        }));
      })
      .then(result => {
        const modalId = document.getElementById('showModalUser');
        const modal = bootstrap.Modal.getInstance(modalId);
        modal.hide();

        if (result.status === 200 || result.status === 201) {
          document.getElementById('info').innerHTML =
            '<h3 class="text-success">El usuario se guardó correctamente <i class="fa-solid fa-check"></i></h3>';

          allUsers.push(result.info);
          allUsers.sort((a, b) => a.firstName.localeCompare(b.firstName)); 
          renderUsers(allUsers);

          form.reset(); 
        } else {
          document.getElementById('info').innerHTML =
            `<h3 class="text-danger">Error: ${result.info.message || 'No se guardó el usuario'} <i class="fa-solid fa-x"></i></h3>`;
        }
      })
      .catch(error => {
        console.error("Error al guardar:", error);
        document.getElementById('info').innerHTML =
          '<h3 class="text-danger">Error de red al guardar el usuario</h3>';
      });
  } else {
    form.reportValidity();
  }
}

function filterUsers() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allUsers.filter(user =>
    user.firstName.toLowerCase().includes(query) ||
    user.lastName.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  );
  renderUsers(filtered);
}
