function Main() {
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-btn");
  const loader = document.querySelector(".loading-text");
  const BASE_URL = "https://api.github.com/users/";
  const githubProfileDetails = document.querySelector(
    ".github-profile-details"
  );

  function showLoader() {
    loader.classList.add("show");
    githubProfileDetails.classList.add("hide");
  }

  function removeLoader() {
    loader.classList.remove("show");
    githubProfileDetails.classList.remove("hide");
  }

  async function fetchGithubProfileDetails() {
    showLoader();
    const response = await fetch(`${BASE_URL}${searchInput.value}`);
    const result = await response.json();

    console.log(result);

    if (result) {
      removeLoader();
      displaProfileDetails(result);
      searchInput.value = "";
    }
  }

  function displaProfileDetails(profile) {
    const { login, avatar_url, public_repos, followers, following } = profile;
    githubProfileDetails.innerHTML = `<p>${login}</p>
    <img src="${avatar_url}" alt=${login}> 
    <p class="repos">Repos: ${public_repos}</p>
    <p class="followers">Followers: ${followers}</p>
    <p class="following">Following: ${following}</p>
    `;
  }

  this.start = () => {
    searchButton.addEventListener("click", fetchGithubProfileDetails);
  };
}

const main = new Main();

main.start();
