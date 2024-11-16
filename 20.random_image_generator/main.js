function Main() {
  const loadMoreImagesButton = document.querySelector(".load-more-images");
  const imagesWrapper = document.querySelector(".images-wrapper");
  let count = 1;

  function fetchRandomImages(getCount) {
    for (let i = getCount; i <= getCount + 4; i++) {
      let imgElement = document.createElement("img");
      imgElement.src = `https://picsum.photos/300?random=${i}`;
      imagesWrapper.appendChild(imgElement);
    }
  }

  this.start = () => {
    fetchRandomImages(count);
    loadMoreImagesButton.addEventListener("click", () => {
      fetchRandomImages((count += 5));
    });
  };
}

const main = new Main();

main.start();
