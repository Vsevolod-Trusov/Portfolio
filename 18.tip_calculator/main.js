function Main() {
  const generateBillButton = document.querySelector(".generate-bill");
  const billAmount = document.querySelector(".bill-amount");
  const discountPercentage = document.querySelector(".discount-percentage");
  const tipsPercentage = document.querySelector(".tip-percentage");
  const noOfCuctomers = document.querySelector(".no-of-customer");

  const totolTipPercentageValue = document.querySelector(".tip-value");
  const discountPercentageValue = document.querySelector(".discount-value");
  const totalNoOfCustomersValue = document.querySelector(
    ".no-of-customers-value"
  );
  const totalBillAmount = document.querySelector(".total-bill-amount");
  const totalAmountToPay = document.querySelector(".total-amount-to-pay");
  const eachCustomerToPay = document.querySelector(".each-customer-to-pay");

  function calculateBill() {
    const billAmountAfterDiscount =
      billAmount.value - (discountPercentage.value * billAmount.value) / 100;

    const getTippAmount =
      (billAmountAfterDiscount * tipsPercentage.value) / 100;

    const totalBill = billAmountAfterDiscount + getTippAmount;
    const eachCustomertoPayAmount = totalBill / noOfCuctomers.value;

    totalBillAmount.textContent = getTippAmount;
    totalAmountToPay.textContent = totalBill;
    totolTipPercentageValue.textContent = tipsPercentage.value;
    discountPercentageValue.textContent = discountPercentage.value;
    totalNoOfCustomersValue.textContent = noOfCuctomers.value;
    eachCustomerToPay.textContent = eachCustomertoPayAmount;
  }

  this.start = () => {
    generateBillButton.addEventListener("click", calculateBill);
  };
}

const main = new Main();

main.start();
