function displayProducts(items, containerItem) {
  items.forEach((item) => {
    containerItem.appendChild(item);
  });
}

function buildProducts(productsList) {
  const builtItems = productsList.map((item) => {
    const productItemWrapper = document.createElement("div");
    const productTitle = document.createElement("p");
    const productThumbnail = document.createElement("img");
    const productDescription = document.createElement("p");
    const productPrice = document.createElement("p");

    productTitle.textContent = item.title;
    productDescription.textContent = item.description;
    productThumbnail.src = item.thumbnail;
    productPrice.textContent = item.price;

    productItemWrapper.classList.add("product-item-wrapper");
    productTitle.classList.add("product-title");
    productThumbnail.classList.add("product-img");
    productPrice.classList.add("product-price");
    productDescription.classList.add("product-desc");

    productItemWrapper.appendChild(productThumbnail);
    productItemWrapper.appendChild(productTitle);
    productItemWrapper.appendChild(productPrice);
    productItemWrapper.appendChild(productDescription);

    return productItemWrapper;
  });

  return builtItems;
}

async function getData(currentPage) {
  const limit = 10;
  const API_URL = `https://dummyjson.com/products?limit=${limit}&skip=${
    currentPage === 0 ? 0 : currentPage * limit
  }`;
  return fetch(API_URL, {
    method: "GET",
  });
}

async function getProducts(currentPage, loadMoreBtn, containerItem) {
  const MAX_AMOUNT = 20;
  const response = await getData(currentPage);

  if (!response.ok) alert(response.text());

  const { products } = await response.json();
  const htmlItems = buildProducts(products);

  displayProducts(htmlItems, containerItem);

  if (containerItem.children.length === MAX_AMOUNT) {
    loadMoreBtn.setAttribute("disabled", true);
  }
}

async function main() {
  try {
    const loadMoreBtn = document.querySelector(".load-more");
    const thumbnails = document.querySelector(".thumbnails");
    let currentPage = 0;
    getProducts(currentPage, loadMoreBtn, thumbnails);

    loadMoreBtn.addEventListener("click", () => {
      getProducts(++currentPage, loadMoreBtn, thumbnails);
    });
  } catch (exception) {
    console.error(exception);
  }
}

main();
