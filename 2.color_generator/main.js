function copyToClipboard(hexColorValue) {
  alert("Copied to clipboard");
  navigator.clipboard.writeText(hexColorValue);
}

function handleGenerateHexColor() {
  const hexBtn = document.querySelector(".hex-btn");
  const hexColorValue = document.querySelector(".hex-color-value");
  const hexColorContainer = document.querySelector(".hex-color-container");
  const hexCopyToClipboardBtn = document.querySelector(".hex-copy-clipboard");

  hexBtn.addEventListener("click", () => {
    const characterSet = "0123456789ABCDF";
    let hexColorOutput = "";

    for (let i = 0, characterLength = characterSet.length; i < 6; ++i) {
      hexColorOutput += characterSet.charAt(
        Math.floor(Math.random() * characterLength)
      );
    }

    hexColorValue.textContent = `#${hexColorOutput}`;
    hexColorContainer.style.backgroundColor = `${hexColorValue.textContent}`;
    hexBtn.style.color = `${hexColorValue.textContent}`;
  });

  hexCopyToClipboardBtn.addEventListener("click", () => {
    copyToClipboard(hexColorValue.textContent);
  });
}

function handleGenerateRgbColor() {
  const rgbBtn = document.querySelector(".rgb-btn");
  const getRedInputRange = document.querySelector("#red");
  const getGreenInputRange = document.querySelector("#green");
  const getBlueInputRange = document.querySelector("#blue");
  const rgbColorOutput = document.querySelector(".rgb-color-value");
  const rgbColorContainer = document.querySelector(".rgb-color-container");
  const rgbCopyToClipboardBtn = document.querySelector(".rgb-copy-clipboard");

  rgbBtn.addEventListener("click", () => {
    const extractRedValue = getRedInputRange.value;
    const extractGreenValue = getGreenInputRange.value;
    const extractBlueValue = getBlueInputRange.value;

    rgbColorOutput.textContent = `RGB(${extractRedValue},${extractGreenValue},${extractBlueValue})`;
    rgbColorContainer.style.backgroundColor = rgbColorOutput.textContent;
    rgbBtn.style.color = rgbColorOutput.textContent;
  });

  rgbCopyToClipboardBtn.addEventListener("click", () => {
    copyToClipboard(rgbColorOutput.textContent);
  });
}

function main() {
  handleGenerateHexColor();
  handleGenerateRgbColor();
}

main();
