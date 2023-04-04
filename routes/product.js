const express = require("express");
const router = express.Router();
const getProductByBarcode = require("../utils/getProductByBarcode");

router.get("/product/:productId", async (req, res) => {
  const product = await getProductByBarcode(req.params.productId);

  res.render("product", {
    product,
  });
});

router.post("/product", (req, res) => {
  res.redirect(`/product/${req.body.barcode}`);
});

// Export the router
module.exports = router;
