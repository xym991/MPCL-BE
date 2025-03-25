const express = require("express");
const router = express.Router();
const People = require("../data/people.repository");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret"; // Replace with your actual secret

router.get("/me", (req, res) => {
  console.log("req.cookies.token", req.cookies.token);
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    People.getPeopleByIds(
      [decoded.id],
      ["id", "fname", "lname", "email", "role", "club", "team"],
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(results[0]);
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});
router.post("/details", (req, res) => {
  const { ids, fields } = req.body;
  People.getPeopleByIds(ids, fields, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

/**
 * @swagger
 * /api/people/umpires:
 *   get:
 *     summary: Get all umpires
 *     responses:
 *       200:
 *         description: A list of umpires
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
 *                   phone:
 *                     type: string
 *                   league_position:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/umpires", (req, res) => {
  console.log("Getting all umpires");
  People.getAllUmpires((err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(200).json(results);
  });
});
/**
 * @swagger
 * /api/people/add:
 *   post:
 *     summary: Add or update a person
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Person added or updated successfully
 *       500:
 *         description: Server error
 */
router.post("/add", (req, res) => {
  const data = req.body;
  People.addOrUpdatePerson(data, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res
      .status(201)
      .json({ message: "Person added or updated successfully", results });
  });
});

/**
 * @swagger
 * /api/people:
 *   get:
 *     summary: Get all people
 *     parameters:
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields to include in the response
 *     responses:
 *       200:
 *         description: A list of people
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   club:
 *                     type: string
 *                   team:
 *                     type: string
 *                   league_position:
 *                     type: string
 *                   club_position:
 *                     type: string
 */
router.get("/", (req, res) => {
  const fields = req.query.fields ? req.query.fields.split(",") : [];
  People.getAllPeople(fields, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

/**
 * @swagger
 * /api/people/{id}:
 *   get:
 *     summary: Get a person by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The person ID
 *     responses:
 *       200:
 *         description: A person object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 fname:
 *                   type: string
 *                 lname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 club:
 *                   type: string
 *                 team:
 *                   type: string
 *                 league_position:
 *                   type: string
 *                 club_position:
 *                   type: string
 *                 image:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  People.getPersonById(id, (err, person) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(person);
  });
});

/**
 * @swagger
 * /api/people/{id}:
 *   delete:
 *     summary: Delete a person
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The person ID
 *     responses:
 *       200:
 *         description: Person deleted successfully
 *       500:
 *         description: Server error
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  People.deletePerson(id, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({ message: "Person deleted successfully", results });
  });
});

/**
 * @swagger
 * /api/people/details:
 *   post:
 *     summary: Get person details by array of IDs and fields
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *               fields:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: A list of person details
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
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/people/commitee-members:
 *   get:
 *     summary: Get all commitee members
 *     responses:
 *       200:
 *         description: A list of commitee members
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
 *                   phone:
 *                     type: string
 *                   role:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/commitee-members", (req, res) => {
  People.getCommiteeMembers((err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

/**
 * @swagger
 * /api/people/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 fname:
 *                   type: string
 *                 lname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await People.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare text passwords directly
    if (password !== user.password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true, // Prevents access via JavaScript
      secure: true, // Required for HTTPS
      sameSite: "None", // Allows cross-origin requests
      domain: ".onrender.com", // Allows subdomains if needed
      path: "/", // Ensure cookie is valid for all routes
    });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
