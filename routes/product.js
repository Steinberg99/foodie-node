const express = require("express");
const router = express.Router();
const fetchProductData = require("../utils/fetchProductData");

router.get("/product/:productId", async (req, res) => {
  const data = await fetchProductData(req.params.productId);
  const product = data.product;

  res.render("product", {
    name: product.product_name,
    imageUrl: product.image_url,
  });
});

// Export the router
module.exports = router;
