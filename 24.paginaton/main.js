function Main() {
  const paginationListWrapper = document.querySelector(".pagination-list");
  const paginationNumbers = document.querySelector(".pagination-numbers");
  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");
  const paginationLimit = 10;
  let currentPage = 1;
  let extractAllListItems = [];
  let pageCount = 1;

  function createDummyData() {
    for (let i = 1; i <= 100; i++) {
      const li = document.createElement("li");
      li.textContent = `Card ${i}`;
      paginationListWrapper.appendChild(li);
    }
  }

  function createPageNumber(pageIndex) {
    const pageNumber = document.createElement("button");
    pageNumber.classList.add("pagination-number");
    pageNumber.textContent = pageIndex;
    pageNumber.setAttribute("page-index", pageIndex);
    paginationNumbers.appendChild(pageNumber);
  }

  function createPaginationNumbers() {
    for (let i = 1; i <= pageCount; i++) {
      createPageNumber(i);
    }
  }

  function handleDisableButton(currentButton) {
    currentButton.classList.add("disabled");
    currentButton.setAttribute("disabled", "true");
  }

  function handleEnableButton(currentButton) {
    currentButton.classList.remove("disabled");
    currentButton.removeAttribute("disabled");
  }

  function handleActiveCurrentPageNumber() {
    document.querySelectorAll(".pagination-number").forEach((button) => {
      button.classList.remove("active-state");
      const currentPageIndex = +button.getAttribute("page-index");

      if (currentPageIndex === currentPage) {
        button.classList.add("active-state");
      }
    });
  }

  function handlePaginationButtonStatus() {
    if (currentPage === 1) {
      handleDisableButton(prevButton);
    } else {
      handleEnableButton(prevButton);
    }

    if (pageCount === currentPage) {
      handleDisableButton(nextButton);
    } else {
      handleEnableButton(nextButton);
    }
  }

  function handleCurrentPage(currentPageNumber) {
    currentPage = currentPageNumber;

    handleActiveCurrentPageNumber();
    handlePaginationButtonStatus();

    const previousRange = (currentPageNumber - 1) * paginationLimit;
    const currentRange = currentPageNumber * paginationLimit;

    extractAllListItems.forEach((listItem, index) => {
      listItem.classList.add("hide-list-item");
      if (index >= previousRange && index < currentRange) {
        listItem.classList.remove("hide-list-item");
      }
    });
  }

  this.start = () => {
    createDummyData();

    extractAllListItems = document.querySelectorAll("li");
    pageCount = Math.ceil(extractAllListItems.length / paginationLimit);

    createPaginationNumbers();
    handleCurrentPage(1);

    prevButton.addEventListener("click", () => {
      handleCurrentPage(currentPage - 1);
    });

    nextButton.addEventListener("click", () => {
      handleCurrentPage(currentPage + 1);
    });

    document.querySelectorAll(".pagination-number").forEach((button) => {
      const currentPageIndex = +button.getAttribute("page-index");

      if (currentPageIndex) {
        button.addEventListener("click", () => {
          handleCurrentPage(currentPageIndex);
        });
      }
    });
  };
}

const main = new Main();

main.start();
