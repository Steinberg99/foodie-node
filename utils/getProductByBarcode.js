const fetch = require("node-fetch");

const getProductByBarcode = async (productId) => {
  try {
    const url = `https://world.openfoodfacts.org/api/v0/product/${productId}`;
    const response = await fetch(url);
    const data = await response.json();
    const productData = data.product;

    return productData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getProductByBarcode;
