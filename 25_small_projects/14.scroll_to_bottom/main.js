function main() {
  const DUMMY_URL = "https://dummyjson.com/users?limit=100";
  const usersList = document.querySelector(".users-list");
  const scrollToTopBtn = document.querySelector(".scroll-to-top");
  const scrollToButtonBtn = document.querySelector(".scroll-to-bottom");
  const loader = document.querySelector(".loader");

  fetchUsersList(DUMMY_URL, { users: usersList, loader });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  scrollToButtonBtn.addEventListener("click", () => {
    const topPoint = document.body.scrollHeight;

    window.scrollTo({
      top: topPoint,
      behavior: "smooth",
    });
  });
}

function showLoader({ users, loader }) {
  loader.classList.add("show-loader");
  users.classList.add("hide-users-list");
}

function removeLoader({ users, loader }) {
  loader.classList.remove("show-loader");
  users.classList.remove("hide-users-list");
}

async function fetchUsersList(link, { users, loader }) {
  showLoader({ users, loader });

  const response = await fetch(link, { method: "GET" });
  const { users: usersData } = await response.json();

  removeLoader({ users, loader });

  displayUsers(usersData, users);
}

function displayUsers(users, container) {
  container.innerHTML = users
    .map(({ firstName, age }) => {
      return `<li> 
    <p>
      ${firstName}
      ${age}
    </p>
    </li> `;
    })
    .join(" ");
}

main();
