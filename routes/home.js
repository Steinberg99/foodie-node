const express = require("express");
const router = express.Router();
const fetchProductData = require("../utils/fetchProductData");

router.get("/", (req, res) => {
  const title = "Test";

  res.render("home", {
    title,
  });
});

router.post("/search", async (req, res) => {
  const data = fetchProductData(req.body.barcode);
  const product = data.product;

  res.render("product", {
    name: product.product_name,
    imageUrl: product.image_url,
  });
});

// Export the router
module.exports = router;
