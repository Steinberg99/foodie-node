const express = require("express");
const router = express.Router();

router.get("/offline", async (req, res) => {
  res.render("offline");
});

// Export the router
module.exports = router;
