const addressFormatter = (address) => {
  return address.slice(0, 5) + "..." + address.slice(-3);
};

export default addressFormatter;
