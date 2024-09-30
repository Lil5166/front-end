document.addEventListener('DOMContentLoaded', () => {
    let users = [];
    let currentPage = 1;
    const usersPerPage = 9;

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://randomuser.me/api/?results=45');
            const data = await response.json();
            users = data.results;
            displayUsers();
            setupPagination();
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const displayUsers = () => {
        const userInfoDiv = document.getElementById('userInfo');
        userInfoDiv.innerHTML = '';
        const start = (currentPage - 1) * usersPerPage;
        const end = start + usersPerPage;
        const usersToDisplay = users.slice(start, end);

        usersToDisplay.forEach(user => {
            const userInfo = `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="${user.picture.large}" class="card-img-top" alt="User Picture">
            <div class="card-body">
              <h5 class="card-title">${user.name.first} ${user.name.last}</h5>
              <p class="card-text">Country: ${user.location.country}</p>
              <p class="card-text">Postcode: ${user.location.postcode}</p>
              <p class="card-text">Phone: ${user.phone}</p>
              <p class="card-text">Coordinates: Latitude ${user.location.coordinates.latitude}, Longitude ${user.location.coordinates.longitude}</p>
            </div>
          </div>
        </div>
      `;
            userInfoDiv.innerHTML += userInfo;
        });
    };

    const setupPagination = () => {
        const paginationDiv = document.getElementById('pagination');
        paginationDiv.innerHTML = '';
        const totalPages = Math.ceil(users.length / usersPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = 'page-item';
            const pageButton = document.createElement('button');
            pageButton.className = 'page-link';
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayUsers();
            });
            pageItem.appendChild(pageButton);
            paginationDiv.appendChild(pageItem);
        }
    };

    document.getElementById('loadUsersBtn').addEventListener('click', fetchUsers);
});