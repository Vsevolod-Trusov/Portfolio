function main() {
  const qrContainer = document.querySelector(".qr-container");
  const qrTexInput = document.querySelector(".qr-text");
  const generateQrCodeBtn = document.querySelector(".generate-qr-code");
  const errorMessage = document.querySelector(".error-message");

  generateQrCodeBtn.addEventListener("click", () => {
    const param = {
      input: qrTexInput,
      error: errorMessage,
      container: qrContainer,
    };
    validateInputField(param);
  });
}

function validateInputField({ input, error, container }) {
  console.log(input.value);

  if (input.value.trim().length > 0) {
    generateCode({ input, error, container });
  } else {
    error.textContent = "Enter text and use some URL to generate QR Code";
  }
}

function generateCode({ input, error, container }) {
  container.innerHTML = "";

  new QRCode(container, {
    text: input.value,
    height: 400,
    width: 400,
    colorLight: "#fff",
    colorDark: "#000",
  });

  input.value = "";
  error.textContent = "";
}

main();
