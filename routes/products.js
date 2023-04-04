const express = require("express");
const router = express.Router();
const getProductsByNameAndPageNumber = require("../utils/getProductsByNameAndPageNumber");
const checkPreviousNextPage = require("../utils/checkPreviousNextPage");

router.get("/products/:productName/:pageNumber", async (req, res) => {
  const data = await getProductsByNameAndPageNumber(req.params.productName, req.params.pageNumber);
  const pagination = checkPreviousNextPage(data.count, 24, req.params.pageNumber);

  res.render("products", {
    count: data.count,
    pageNumber: parseInt(req.params.pageNumber),
    pagination,
    productName: req.params.productName,
    products: data.products,
  });
});

router.post("/products", (req, res) => {
  res.redirect(`/products/${req.body.product}/1`);
});

// Export the router
module.exports = router;
