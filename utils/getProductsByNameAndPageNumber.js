const fetch = require("node-fetch");

const getProductsByNameAndPageNumber = async (productName, pageNumber) => {
  try {
    const url = `https://nl.openfoodfacts.org/cgi/search.pl?search_terms=${productName}&page=${pageNumber}&json=true`;
    const response = await fetch(url);
    const data = await response.json();
    const productsData = {
      count: data.count,
      products: data.products,
    };

    return productsData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getProductsByNameAndPageNumber;
