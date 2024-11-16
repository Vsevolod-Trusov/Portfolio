class Main {
  #progress;
  #prevBtn;
  #nextBtn;
  #iconsWrapper;

  #currentSelectedStep;

  constructor() {
    this.#progress = document.querySelector(".progress");
    this.#prevBtn = document.querySelector(".prev-btn");
    this.#nextBtn = document.querySelector(".next-btn");
    this.#iconsWrapper = document.querySelectorAll(".icon-wrapper");

    this.#currentSelectedStep = 1;
  }

  start() {
    this.#nextBtn.addEventListener("click", () => {
      if (this.#currentSelectedStep < this.#iconsWrapper.length) {
        this.#currentSelectedStep++;
      }

      this.handleUpdateStep();
    });

    this.#prevBtn.addEventListener("click", () => {
      if (this.#currentSelectedStep > 1) {
        this.#currentSelectedStep--;
      }

      this.handleUpdateStep();
    });
  }

  handleUpdateStep() {
    this.#iconsWrapper.forEach((item, index) => {
      if (index < this.#currentSelectedStep) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    this.#progress.style.width =
      ((this.#currentSelectedStep - 1) / (this.#iconsWrapper.length - 1)) *
        100 +
      "%";

    if (this.#currentSelectedStep === 1) {
      this.#prevBtn.disabled = true;
    } else if (this.#currentSelectedStep === this.#iconsWrapper.length) {
      this.#nextBtn.disabled = true;
    } else {
      this.#prevBtn.disabled = false;
      this.#nextBtn.disabled = false;
    }
  }
}

const main = new Main();

main.start();
