const express = require("express");
const router = express.Router();

router.get("/barcode", async (req, res) => {
  res.render("barcode");
});

// Export the router
module.exports = router;
