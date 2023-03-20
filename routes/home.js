const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const title = "Test";

  res.render("home", {
    title
  });
});

// Export the router
module.exports = router;
