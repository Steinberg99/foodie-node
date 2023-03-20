const fetch = require("node-fetch");

const fetchProductData = async (productId) => {
  try {
    const url = `https://world.openfoodfacts.org/api/v0/product/${productId}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = fetchProductData;
