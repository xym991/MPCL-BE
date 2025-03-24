const express = require("express");
const router = express.Router();
const clubsRouter = require("./clubs.router");
const playersRouter = require("./players.router");
const personRouter = require("./person.router");
const teamsRouter = require("./teams.router"); // Import the teams router

router.use("/clubs", clubsRouter);
router.use("/players", playersRouter);
router.use("/people", personRouter);
router.use("/teams", teamsRouter); // Use the teams router

module.exports = router;
