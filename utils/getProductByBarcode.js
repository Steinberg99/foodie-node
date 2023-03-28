const fetch = require("node-fetch");

const getProductByBarcode = async (productId) => {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${productId}`);
    const productData = await response.json();

    return productData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getProductByBarcode;
