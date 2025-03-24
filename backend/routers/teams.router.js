const express = require("express");
const router = express.Router();
const Teams = require("../data/teams.repository");

/**
 * @swagger
 * /api/teams:
 *   post:
 *     summary: Create or update a team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               club:
 *                 type: integer
 *               player1:
 *                 type: integer
 *               player2:
 *                 type: integer
 *               player3:
 *                 type: integer
 *               player4:
 *                 type: integer
 *               player5:
 *                 type: integer
 *               player6:
 *                 type: integer
 *               player7:
 *                 type: integer
 *               player8:
 *                 type: integer
 *               player9:
 *                 type: integer
 *               player10:
 *                 type: integer
 *               player11:
 *                 type: integer
 *               sub1:
 *                 type: integer
 *               sub2:
 *                 type: integer
 *               sub3:
 *                 type: integer
 *               sub4:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Team created or updated successfully
 *       500:
 *         description: Server error
 */
router.post("/", (req, res) => {
  const data = req.body;
  Teams.createOrUpdateTeam(data, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res
      .status(201)
      .json({ message: "Team created or updated successfully", results });
  });
});

/**
 * @swagger
 * /api/teams:
 *   get:
 *     summary: Get all teams
 *     responses:
 *       200:
 *         description: A list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   club:
 *                     type: integer
 *                   player1:
 *                     type: integer
 *                   player2:
 *                     type: integer
 *                   player3:
 *                     type: integer
 *                   player4:
 *                     type: integer
 *                   player5:
 *                     type: integer
 *                   player6:
 *                     type: integer
 *                   player7:
 *                     type: integer
 *                   player8:
 *                     type: integer
 *                   player9:
 *                     type: integer
 *                   player10:
 *                     type: integer
 *                   player11:
 *                     type: integer
 *                   sub1:
 *                     type: integer
 *                   sub2:
 *                     type: integer
 *                   sub3:
 *                     type: integer
 *                   sub4:
 *                     type: integer
 *       500:
 *         description: Server error
 */
router.get("/", (req, res) => {
  Teams.getAllTeams((err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

/**
 * @swagger
 * /api/teams/club/{id}:
 *   get:
 *     summary: Get teams by club ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The club ID
 *     responses:
 *       200:
 *         description: A list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   club:
 *                     type: integer
 *                   player1:
 *                     type: integer
 *                   player2:
 *                     type: integer
 *                   player3:
 *                     type: integer
 *                   player4:
 *                     type: integer
 *                   player5:
 *                     type: integer
 *                   player6:
 *                     type: integer
 *                   player7:
 *                     type: integer
 *                   player8:
 *                     type: integer
 *                   player9:
 *                     type: integer
 *                   player10:
 *                     type: integer
 *                   player11:
 *                     type: integer
 *                   sub1:
 *                     type: integer
 *                   sub2:
 *                     type: integer
 *                   sub3:
 *                     type: integer
 *                   sub4:
 *                     type: integer
 *       500:
 *         description: Server error
 */
router.get("/club/:id", (req, res) => {
  const { id } = req.params;
  Teams.getTeamsByClubId(id, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

/**
 * @swagger
 * /api/teams/{id}:
 *   get:
 *     summary: Get a team by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The team ID
 *     responses:
 *       200:
 *         description: A team object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 club:
 *                   type: integer
 *                 player1:
 *                   type: integer
 *                 player2:
 *                   type: integer
 *                 player3:
 *                   type: integer
 *                 player4:
 *                   type: integer
 *                 player5:
 *                   type: integer
 *                 player6:
 *                   type: integer
 *                 player7:
 *                   type: integer
 *                 player8:
 *                   type: integer
 *                 player9:
 *                   type: integer
 *                 player10:
 *                   type: integer
 *                 player11:
 *                   type: integer
 *                 sub1:
 *                   type: integer
 *                 sub2:
 *                   type: integer
 *                 sub3:
 *                   type: integer
 *                 sub4:
 *                   type: integer
 *       500:
 *         description: Server error
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Teams.getTeamById(id, (err, team) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(team);
  });
});

/**
 * @swagger
 * /api/teams/{id}:
 *   delete:
 *     summary: Delete a team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The team ID
 *     responses:
 *       200:
 *         description: Team deleted successfully
 *       500:
 *         description: Server error
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Teams.deleteTeam(id, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({ message: "Team deleted successfully", results });
  });
});

module.exports = router;
