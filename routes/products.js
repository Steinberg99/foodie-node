const express = require("express");
const router = express.Router();
const getProductsByNameAndPageNumber = require("../utils/getProductsByNameAndPageNumber");

router.get("/products/:productName/:pageNumber", async (req, res) => {
  const data = await getProductsByNameAndPageNumber(req.params.productName, req.params.pageNumber);

  // TODO: Add pagination calculation

  // TODO: Add error handling

  res.render("products", {
    count: data.count,
    error: false,
    productName: req.params.productName,
    products: data.products,
  });
});

router.post("/products", (req, res) => {
  res.redirect(`/products/${req.body.product}/1`);
});

// Export the router
module.exports = router;
