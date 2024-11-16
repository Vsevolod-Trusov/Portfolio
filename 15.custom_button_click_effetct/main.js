function main() {
  const getAllButtons = document.querySelectorAll(".ripple-effect");

  getAllButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      let xCoordinateValue = event.clientX - event.target.offsetLeft;
      let yCoordinateValue = event.clientY - event.target.offsetTop;
      let rippleElement = document.createElement("span");
      rippleElement.style.left = `${xCoordinateValue}px`;
      rippleElement.style.top = `${yCoordinateValue}px`;

      btn.appendChild(rippleElement);
      window.setTimeout(() => {
        rippleElement.remove();
      }, 500);
    });
  });
}

main();
