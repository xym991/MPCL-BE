const express = require("express");
const router = express.Router();
const Players = require("../data/players.repository");
const People = require("../data/people.repository");
const Teams = require("../data/teams.repository");

/**
 * @swagger
 * /api/players/player-registration:
 *   post:
 *     summary: Register a new player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               address:
 *                 type: string
 *               club_id:
 *                 type: string
 *               signature:
 *                 type: string
 *               terms:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Player registration successful
 *       500:
 *         description: Server error
 */
router.post("/player-registration", (req, res) => {
  const data = req.body;
  Players.createPlayerApplication(data, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res
      .status(201)
      .json({ message: "Player registration successful", results });
  });
});

/**
 * @swagger
 * /api/players/player-transfer:
 *   post:
 *     summary: Transfer a player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               player_id:
 *                 type: string
 *               from_club_id:
 *                 type: string
 *               to_club_id:
 *                 type: string
 *               transfer_reason:
 *                 type: string
 *               signature:
 *                 type: string
 *               terms:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Player transfer successful
 *       500:
 *         description: Server error
 */
router.post("/player-transfer", (req, res) => {
  const data = req.body;
  Players.createTransferApplication(data, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ message: "Player transfer successful", results });
  });
});

/**
 * @swagger
 * /api/players/applications:
 *   get:
 *     summary: Get all player applications
 *     responses:
 *       200:
 *         description: A list of player applications
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
 *                   email:
 *                     type: string
 *                   phone_number:
 *                     type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/applications", (req, res) => {
  Players.getAllPlayerApplications((err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

/**
 * @swagger
 * /api/players/approve:
 *   post:
 *     summary: Approve a player application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               approvedBy:
 *                 type: string
 *                 enum: [ "club", "league" ]
 *     responses:
 *       200:
 *         description: Player application approved successfully
 *       500:
 *         description: Server error
 */
router.post("/approve", (req, res) => {
  const { id, approvedBy } = req.body;
  Players.approveApplication(id, approvedBy, async (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Check if both league_appr and club_appr are "1"
    const application = await Players.getPlayerApplicationById(id);
    if (application.league_appr === "1" && application.club_appr === "1") {
      const personData = {
        fname: application.fname,
        lname: application.lname,
        email: application.email,
        phone: application.phone_number,
        club: application.club,
        role: "player",
        // Add other fields as necessary
      };

      People.addOrUpdatePerson(personData, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({
          message: "Player application approved successfully",
          results,
        });
      });
    } else {
      res
        .status(200)
        .json({ message: "Player application approved successfully", results });
    }
  });
});

/**
 * @swagger
 * /api/players/reject:
 *   post:
 *     summary: Reject a player application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               rejectedBy:
 *                 type: string
 *                 enum: [ "club", "league" ]
 *     responses:
 *       200:
 *         description: Player application rejected successfully
 *       500:
 *         description: Server error
 */
router.post("/reject", (req, res) => {
  const { id, rejectedBy } = req.body;
  Players.rejectApplication(id, rejectedBy, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res
      .status(200)
      .json({ message: "Player application rejected successfully", results });
  });
});

/**
 * @swagger
 * /api/players/player-transfers:
 *   get:
 *     summary: Get all player transfers
 *     responses:
 *       200:
 *         description: A list of player transfers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   fname:
 *                     type: string
 *                   lname:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone_number:
 *                     type: string
 *                   from_club:
 *                     type: string
 *                   to_club:
 *                     type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/player-transfers", (req, res) => {
  Players.getAllPlayerTransfers((err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

/**
 * @swagger
 * /api/players/approve-transfer:
 *   post:
 *     summary: Approve a player transfer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               approvedBy:
 *                 type: string
 *                 enum: [ "from_club", "to_club" ]
 *     responses:
 *       200:
 *         description: Player transfer approved successfully
 *       500:
 *         description: Server error
 */
router.post("/approve-transfer", (req, res) => {
  const { id, approvedBy } = req.body;
  Players.approveTransfer(id, approvedBy, async (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Check if both from_club_appr and to_club_appr are "1"
    const transfer = await Players.getPlayerTransferById(id);
    if (transfer.from_club_appr === "1" && transfer.to_club_appr === "1") {
      const newClubId = transfer.new_club;
      const registrationNumber = transfer.registration_number;

      // Update the club in the people table
      People.updatePersonClubByRegistrationNumber(
        registrationNumber,
        newClubId,
        (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          // Update the club in the teams table
          Teams.updatePlayerClubByRegistrationNumber(
            registrationNumber,
            newClubId,
            (err) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.status(200).json({
                message: "Player transfer approved successfully",
                results,
              });
            }
          );
        }
      );
    } else {
      res
        .status(200)
        .json({ message: "Player transfer approved successfully", results });
    }
  });
});

/**
 * @swagger
 * /api/players/reject-transfer:
 *   post:
 *     summary: Reject a player transfer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               rejectedBy:
 *                 type: string
 *                 enum: [ "from_club", "to_club" ]
 *     responses:
 *       200:
 *         description: Player transfer rejected successfully
 *       500:
 *         description: Server error
 */
router.post("/reject-transfer", (req, res) => {
  const { id, rejectedBy } = req.body;
  Players.rejectTransfer(id, rejectedBy, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res
      .status(200)
      .json({ message: "Player transfer rejected successfully", results });
  });
});

router.post("/update-player-club", async (req, res) => {
  const { playerId, newClubId } = req.body;
  try {
    await Players.updatePlayerClub(playerId, newClubId);
    await Teams.removePlayerFromTeams(playerId, newClubId);
    res.status(200).json({ message: "Player club updated successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
