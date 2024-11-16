function main() {
  const tabContainer = document.querySelector(".container");
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContant = document.querySelectorAll(".content");

  tabContainer.addEventListener("click", (event) => {
    const currentId = event.target.dataset.id;

    if (currentId) {
      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
      });
    }

    event.target.classList.add("active");

    tabContant.forEach((content) => {
      content.classList.remove("active");
    });

    const currentElement = document.getElementById(currentId);
    currentElement.classList.add("active");
  });
}

main();
