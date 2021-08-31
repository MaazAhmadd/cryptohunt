const toUsd = (number) => {
  if (typeof number == "undefined") {
    return "";
  }
  if (number[0] == 0) {
    return `$${number}`;
  }
  number = Number(number);
  if (number < 1000) {
    return `$${number.toFixed(2)}`;
  }
  number = number.toFixed(10);
  if (number < 100000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  }
  number = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);

  number = number.slice(0, -3);
  return number;
};

export default toUsd;
