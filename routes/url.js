const express = require("express");
const {
  handleGenerateShortURL,
  handleGetAnalytics,
  handleShortId,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId", handleShortId);

module.exports = router;
