const express = require("express");
const router = express.Router();
const Clubs = require("../data/clubs.repository");

/**
 * @swagger
 * /api/clubs/club-registration:
 *   post:
 *     summary: Register a new club
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_of_club:
 *                 type: string
 *               club_contact:
 *                 type: string
 *               position_in_the_club:
 *                 type: string
 *               main_home_phone_number:
 *                 type: string
 *               main_business_phone_number:
 *                 type: string
 *               main_mobile_phone_number:
 *                 type: string
 *               main_email:
 *                 type: string
 *               another_club_contact:
 *                 type: string
 *               another_position_in_the_club:
 *                 type: string
 *               another_address:
 *                 type: string
 *               another_home_phone_number:
 *                 type: string
 *               another_business_phone_number:
 *                 type: string
 *               another_mobile_phone_number:
 *                 type: string
 *               another_email:
 *                 type: string
 *               address_ground_1:
 *                 type: string
 *               address_ground_2:
 *                 type: string
 *               ground_1_dress_faci:
 *                 type: string
 *               ground_2_dress_faci:
 *                 type: string
 *               ground_1_shower_toilet_faci:
 *                 type: string
 *               ground_2_shower_toilet_faci:
 *                 type: string
 *               ground_1_hot_tea_faci:
 *                 type: string
 *               ground_2_hot_tea_faci:
 *                 type: string
 *               if_no_tea_faci_reason:
 *                 type: string
 *               ground_1_is_own_scoreboard:
 *                 type: boolean
 *               ground_2_is_own_scoreboard:
 *                 type: boolean
 *               ground_1_boundary_markers:
 *                 type: string
 *               ground_2_boundary_markers:
 *                 type: string
 *               ground_1_current_session:
 *                 type: string
 *               ground_2_current_session:
 *                 type: string
 *               if_no_ground_for_current_session:
 *                 type: string
 *               current_ground_type:
 *                 type: string
 *               ground_side_run_on_sunday:
 *                 type: string
 *               is_public_liability_insurances:
 *                 type: boolean
 *               is_bank_account:
 *                 type: boolean
 *               is_member_club_cricket_conf:
 *                 type: boolean
 *               is_member_mcb:
 *                 type: boolean
 *               when_club_established:
 *                 type: string
 *               club_is_any_league:
 *                 type: boolean
 *               if_club_in_league_spec:
 *                 type: string
 *               is_qualified_umpire:
 *                 type: boolean
 *               qualified_umpire_contact:
 *                 type: string
 *               joining_mpcl_league:
 *                 type: string
 *               comments:
 *                 type: string
 *               recommended_by_1:
 *                 type: string
 *               recommended_by_2:
 *                 type: string
 *               signature:
 *                 type: string
 *               position_in_club:
 *                 type: string
 *               terms:
 *                 type: string
 *     responses:
 *       201:
 *         description: Club registration successful
 *       500:
 *         description: Server error
 */
router.post("/club-registration", (req, res) => {
  const data = req.body;
  Clubs.createClubApplication(data, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ message: "Club registration successful", results });
  });
});

/**
 * @swagger
 * /api/clubs/applications:
 *   get:
 *     summary: Get all club applications
 *     responses:
 *       200:
 *         description: A list of club applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name_of_club:
 *                     type: string
 *                   main_email:
 *                     type: string
 *                   another_email:
 *                     type: string
 *                   main_mobile_phone_number:
 *                     type: string
 *                   another_mobile_phone_number:
 *                     type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/applications", (req, res) => {
  Clubs.getAllClubApplications((err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

/**
 * @swagger
 * /api/clubs:
 *   get:
 *     summary: Get all clubs
 *     responses:
 *       200:
 *         description: A list of clubs
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
 *                   primary_club_contact:
 *                     type: string
 *                   primary_position_in_the_club:
 *                     type: string
 *                   primary_email:
 *                     type: string
 *                   primary_phone_number:
 *                     type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", (req, res) => {
  Clubs.getAllClubs((err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

/**
 * @swagger
 * /api/clubs:
 *   post:
 *     summary: Create or update a club
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
 *               primary_club_contact:
 *                 type: string
 *               primary_position_in_the_club:
 *                 type: string
 *               primary_phone_number:
 *                 type: string
 *               primary_email:
 *                 type: string
 *               secondary_club_contact:
 *                 type: string
 *               secondary_position_in_club:
 *                 type: string
 *               secondary_phone_number:
 *                 type: string
 *               secondary_email:
 *                 type: string
 *               ground_1:
 *                 type: string
 *               ground_2:
 *                 type: string
 *               ground_1_dressing_facilities:
 *                 type: boolean
 *               ground_2_dressing_facilities:
 *                 type: boolean
 *               ground_1_shower_toilet_facilities:
 *                 type: boolean
 *               ground_2_shower_toilet_facilities:
 *                 type: boolean
 *               ground_1_hot_tea_facilities:
 *                 type: boolean
 *               ground_2_hot_tea_facilities:
 *                 type: boolean
 *               ground_1_own_scoreboard:
 *                 type: boolean
 *               ground_2_own_scoreboard:
 *                 type: boolean
 *               ground_1_boundary_markers:
 *                 type: boolean
 *               ground_2_boundary_markers:
 *                 type: boolean
 *               ground_1_current_session:
 *                 type: boolean
 *               ground_2_current_session:
 *                 type: boolean
 *               current_ground_type:
 *                 type: string
 *               ground_side_run_on_sunday:
 *                 type: string
 *               is_public_liability_insurance:
 *                 type: boolean
 *               is_bank_account:
 *                 type: boolean
 *               is_member_club_cricket_conf:
 *                 type: boolean
 *               is_member_mcb:
 *                 type: boolean
 *               established:
 *                 type: string
 *               recommended_by_1:
 *                 type: string
 *               recommended_by_2:
 *                 type: string
 *               logo:
 *                 type: string
 *               club_type:
 *                 type: string
 *               website:
 *                 type: string
 *               social_links:
 *                 type: string
 *               home_ground_id:
 *                 type: string
 *               chairman:
 *                 type: integer
 *               general_secretary:
 *                 type: integer
 *               treasurer:
 *                 type: integer
 *               welfare_officer:
 *                 type: integer
 *               registrar:
 *                 type: integer
 *               admin:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Club created or updated successfully
 *       500:
 *         description: Server error
 */
router.post("/", (req, res) => {
  const data = req.body;
  Clubs.createOrUpdateClub(data, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res
      .status(201)
      .json({ message: "Club created or updated successfully", results });
  });
});

/**
 * @swagger
 * /api/clubs/{id}:
 *   get:
 *     summary: Get a club by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The club ID
 *     responses:
 *       200:
 *         description: A club object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 primary_club_contact:
 *                   type: string
 *                 primary_position_in_the_club:
 *                   type: string
 *                 primary_phone_number:
 *                   type: string
 *                 primary_email:
 *                   type: string
 *                 secondary_club_contact:
 *                   type: string
 *                 secondary_position_in_club:
 *                   type: string
 *                 secondary_phone_number:
 *                   type: string
 *                 secondary_email:
 *                   type: string
 *                 ground_1:
 *                   type: string
 *                 ground_2:
 *                   type: string
 *                 ground_1_dressing_facilities:
 *                   type: boolean
 *                 ground_2_dressing_facilities:
 *                   type: boolean
 *                 ground_1_shower_toilet_facilities:
 *                   type: boolean
 *                 ground_2_shower_toilet_facilities:
 *                   type: boolean
 *                 ground_1_hot_tea_facilities:
 *                   type: boolean
 *                 ground_2_hot_tea_facilities:
 *                   type: boolean
 *                 ground_1_own_scoreboard:
 *                   type: boolean
 *                 ground_2_own_scoreboard:
 *                   type: boolean
 *                 ground_1_boundary_markers:
 *                   type: boolean
 *                 ground_2_boundary_markers:
 *                   type: boolean
 *                 ground_1_current_session:
 *                   type: boolean
 *                 ground_2_current_session:
 *                   type: boolean
 *                 current_ground_type:
 *                   type: string
 *                 ground_side_run_on_sunday:
 *                   type: string
 *                 is_public_liability_insurance:
 *                   type: boolean
 *                 is_bank_account:
 *                   type: boolean
 *                 is_member_club_cricket_conf:
 *                   type: boolean
 *                 is_member_mcb:
 *                   type: boolean
 *                 established:
 *                   type: string
 *                 recommended_by_1:
 *                   type: string
 *                 recommended_by_2:
 *                   type: string
 *                 logo:
 *                   type: string
 *                 club_type:
 *                   type: string
 *                 website:
 *                   type: string
 *                 social_links:
 *                   type: string
 *                 home_ground_id:
 *                   type: string
 *                 chairman:
 *                   type: integer
 *                 general_secretary:
 *                   type: integer
 *                 treasurer:
 *                   type: integer
 *                 welfare_officer:
 *                   type: integer
 *                 registrar:
 *                   type: integer
 *                 admin:
 *                   type: integer
 *       500:
 *         description: Server error
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Clubs.getClubById(id, (err, club) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(club);
  });
});

/**
 * @swagger
 * /api/clubs/{id}:
 *   delete:
 *     summary: Delete a club
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The club ID
 *     responses:
 *       200:
 *         description: Club deleted successfully
 *       500:
 *         description: Server error
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Clubs.deleteClub(id, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({ message: "Club deleted successfully", results });
  });
});

/**
 * @swagger
 * /api/clubs/approve:
 *   post:
 *     summary: Approve a club application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Club application approved successfully
 *       500:
 *         description: Server error
 */
router.post("/approve", (req, res) => {
  const { id } = req.body;
  Clubs.approveApplication(id, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res
      .status(200)
      .json({ message: "Club application approved successfully", results });
  });
});

/**
 * @swagger
 * /api/clubs/reject:
 *   post:
 *     summary: Reject a club application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Club application rejected successfully
 *       500:
 *         description: Server error
 */
router.post("/reject", (req, res) => {
  const { id } = req.body;
  Clubs.rejectApplication(id, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res
      .status(200)
      .json({ message: "Club application rejected successfully", results });
  });
});

module.exports = router;
