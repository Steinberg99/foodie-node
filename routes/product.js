const express = require("express");
const router = express.Router();
const getProductByBarcode = require("../utils/getProductByBarcode");

router.get("/product/:productId", async (req, res) => {
  const data = await getProductByBarcode(req.params.productId);
  const product = data.product;

  res.render("product", {
    name: product.product_name,
  });

  // Error state
});

// Export the router
module.exports = router;
