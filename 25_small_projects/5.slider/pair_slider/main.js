const AMOUNT_OF_PER_PAGE = 2;
const TRANSFORM_POSITION = 100;
const dotListContainer = document.querySelector(".dots-container");
let modifiedData = [];

function displayImages(getImagesList) {
  const slider = document.querySelector(".slider");

  modifiedData = getImagesList
    .reduce((acc, cur, index) => {
      if ((index + 1) % AMOUNT_OF_PER_PAGE === 0) {
        acc[acc.length - 1].push(cur);
      } else {
        const item = [cur];
        acc.push(item);
      }

      return acc;
    }, [])
    .map((page) => {
      return page.map((item, index) => {
        if ((index + 1) % AMOUNT_OF_PER_PAGE === 0) {
          return `<div class='slide'>
            <img src='${item.download_url}' alt='${item.id}' height='150px' width='150px'/>
        </div></div>`;
        } else {
          return `
            <div class='pagination-slide'>
            <div class='slide'>
                <img src='${item.download_url}' alt='${item.id}' height='150px' width='150px'/>
            </div>
            `;
        }
      });
    });
  slider.innerHTML = modifiedData.map((item) => item.join(" ")).join(" ");

  dotListContainer.innerHTML = modifiedData
    .map((page, index) => {
      return `<span class='dot ${
        index === 0 ? "active" : ""
      }' data-slide='${index}'></span>`;
    })
    .join(" ");
}

async function main() {
  try {
    const response = await fetch("mock.json", {
      method: "GET",
    }).catch((exception) => {
      alert(exception.message);
    });
    const imageList = await response.json();

    if (imageList && imageList.length > 0) displayImages(imageList);

    const handleImageSlider = buildImageSlider();

    setTimeout(() => {
      handleImageSlider();
    }, 1000);
  } catch (error) {
    alert(error);
  }
}

main();

function buildImageSlider() {
  const slides = document.querySelectorAll(".pagination-slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentSlide = 0;

  console.log("slide", slides);

  return function () {
    function activeDot(slide) {
      document
        .querySelectorAll(".dot")
        .forEach((dotItem) => dotItem.classList.remove("active"));

      document
        .querySelector(`.dot[data-slide="${slide}"]`)
        .classList.add("active");
    }

    function changeCurrentSlide(currentSlide) {
      slides.forEach(
        (slideItem, index) =>
          (slideItem.style.transform = `translateX(${
            TRANSFORM_POSITION * (index - currentSlide)
          }%)`)
      );
    }

    changeCurrentSlide(currentSlide);

    nextBtn.addEventListener("click", () => {
      currentSlide++;

      if (currentSlide > slides.length - 1) {
        currentSlide = 0;
      }

      changeCurrentSlide(currentSlide);
      activeDot(currentSlide);
    });

    prevBtn.addEventListener("click", () => {
      currentSlide--;

      if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }

      changeCurrentSlide(currentSlide);
      activeDot(currentSlide);
    });

    dotListContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("dot")) {
        const currentSlide = event.target.dataset.slide;
        changeCurrentSlide(currentSlide);
        activeDot(currentSlide);
      }
    });
  };
}
