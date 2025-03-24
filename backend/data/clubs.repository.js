const db = require("./db");

class Clubs {
  static createClubApplication(data, callback) {
    data.status = "pending";
    const fields = Object.keys(data).join(", ");
    const placeholders = Object.keys(data)
      .map(() => "?")
      .join(", ");
    const values = Object.values(data);

    const query = `
      INSERT INTO club_applications (${fields})
      VALUES (${placeholders})`;

    db.query(query, values, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static getAllClubApplications(callback) {
    const query = `
      SELECT * FROM club_applications`;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static getAllClubs(callback) {
    const query = `
      SELECT * FROM clubs`;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static createClub(data, callback) {
    const validFields = [
      "name",
      "primary_club_contact",
      "primary_position_in_the_club",
      "primary_phone_number",
      "primary_email",
      "secondary_club_contact",
      "secondary_position_in_club",
      "secondary_phone_number",
      "secondary_email",
      "ground_1",
      "ground_2",
      "ground_1_dressing_facilities",
      "ground_2_dressing_facilities",
      "ground_1_shower_toilet_facilities",
      "ground_2_shower_toilet_facilities",
      "ground_1_hot_tea_facilities",
      "ground_2_hot_tea_facilities",
      "ground_1_own_scoreboard",
      "ground_2_own_scoreboard",
      "ground_1_boundary_markers",
      "ground_2_boundary_markers",
      "ground_1_current_session",
      "ground_2_current_session",
      "current_ground_type",
      "is_public_liability_insurance",
      "is_bank_account",
      "is_member_club_cricket_conf",
      "is_member_mcb",
      "established",
      "recommended_by_1",
      "recommended_by_2",
      "logo",
      "club_type",
      "website",
      "chairman",
      "general_secretary",
      "treasurer",
      "welfare_officer",
      "registrar",
      "admin",
    ];

    const filteredData = Object.keys(data)
      .filter((key) => validFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    const fields = Object.keys(filteredData).join(", ");
    const placeholders = Object.keys(filteredData)
      .map(() => "?")
      .join(", ");
    const values = Object.values(filteredData);

    const query = `
      INSERT INTO clubs (${fields})
      VALUES (${placeholders})`;

    db.query(query, values, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static createOrUpdateClub(data, callback) {
    const validFields = [
      "id",
      "name",
      "primary_club_contact",
      "primary_position_in_the_club",
      "primary_phone_number",
      "primary_email",
      "secondary_club_contact",
      "secondary_position_in_club",
      "secondary_phone_number",
      "secondary_email",
      "ground_1",
      "ground_2",
      "ground_1_dressing_facilities",
      "ground_2_dressing_facilities",
      "ground_1_shower_toilet_facilities",
      "ground_2_shower_toilet_facilities",
      "ground_1_hot_tea_facilities",
      "ground_2_hot_tea_facilities",
      "ground_1_own_scoreboard",
      "ground_2_own_scoreboard",
      "ground_1_boundary_markers",
      "ground_2_boundary_markers",
      "ground_1_current_session",
      "ground_2_current_session",
      "current_ground_type",
      "ground_side_run_on_sunday",
      "is_public_liability_insurance",
      "is_bank_account",
      "is_member_club_cricket_conf",
      "is_member_mcb",
      "established",
      "recommended_by_1",
      "recommended_by_2",
      "logo",
      "club_type",
      "website",
      "social_links",
      "home_ground_id",
      "chairman",
      "general_secretary",
      "treasurer",
      "welfare_officer",
      "registrar",
      "admin",
    ];

    const filteredData = Object.keys(data)
      .filter((key) => validFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    if (filteredData.id) {
      // Update existing club
      const id = filteredData.id;
      delete filteredData.id;
      const fields = Object.keys(filteredData)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = Object.values(filteredData);

      const query = `
        UPDATE clubs
        SET ${fields}
        WHERE id = ?`;

      db.query(query, [...values, id], (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      });
    } else {
      // Add new club
      const fields = Object.keys(filteredData).join(", ");
      const placeholders = Object.keys(filteredData)
        .map(() => "?")
        .join(", ");
      const values = Object.values(filteredData);

      const query = `
        INSERT INTO clubs (${fields})
        VALUES (${placeholders})`;

      db.query(query, values, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      });
    }
  }

  static deleteClub(id, callback) {
    const query = `DELETE FROM clubs WHERE id = ?`;

    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static getClubById(id, callback) {
    const query = `
      SELECT *
      FROM clubs
      WHERE id = ?`;

    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  }

  static approveApplication(id, callback) {
    const getApplicationQuery = `SELECT * FROM club_applications WHERE id = ?`;
    db.query(getApplicationQuery, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      const application = results[0];
      if (!application) {
        return callback(new Error("Application not found"), null);
      }

      const createClubQuery = `
        INSERT INTO clubs (name, primary_club_contact, primary_position_in_the_club, primary_phone_number, primary_email, secondary_club_contact, secondary_position_in_club, secondary_phone_number, secondary_email, ground_1, ground_2, ground_1_dressing_facilities, ground_2_dressing_facilities, ground_1_shower_toilet_facilities, ground_2_shower_toilet_facilities, ground_1_hot_tea_facilities, ground_2_hot_tea_facilities, ground_1_own_scoreboard, ground_2_own_scoreboard, ground_1_boundary_markers, ground_2_boundary_markers, ground_1_current_session, ground_2_current_session, current_ground_type, is_public_liability_insurance, is_bank_account, is_member_club_cricket_conf, is_member_mcb, established, recommended_by_1, recommended_by_2, logo, club_type, website)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        application.name,
        application.primary_club_contact,
        application.primary_position_in_the_club,
        application.primary_phone_number,
        application.primary_email,
        application.secondary_club_contact,
        application.secondary_position_in_club,
        application.secondary_phone_number,
        application.secondary_email,
        application.ground_1,
        application.ground_2,
        application.ground_1_dressing_facilities,
        application.ground_2_dressing_facilities,
        application.ground_1_shower_toilet_facilities,
        application.ground_2_shower_toilet_facilities,
        application.ground_1_hot_tea_facilities,
        application.ground_2_hot_tea_facilities,
        application.ground_1_own_scoreboard,
        application.ground_2_own_scoreboard,
        application.ground_1_boundary_markers,
        application.ground_2_boundary_markers,
        application.ground_1_current_session,
        application.ground_2_current_session,
        application.current_ground_type,
        application.is_public_liability_insurance,
        application.is_bank_account,
        application.is_member_club_cricket_conf,
        application.is_member_mcb,
        application.established,
        application.recommended_by_1,
        application.recommended_by_2,
        application.logo,
        application.club_type,
        application.website,
      ];

      db.query(createClubQuery, values, (err, results) => {
        if (err) {
          return callback(err, null);
        }

        const updateApplicationQuery = `UPDATE club_applications SET status = 'accepted' WHERE id = ?`;
        db.query(updateApplicationQuery, [id], (err, results) => {
          if (err) {
            return callback(err, null);
          }
          callback(null, results);
        });
      });
    });
  }

  static rejectApplication(id, callback) {
    const query = `UPDATE club_applications SET status = 'rejected' WHERE id = ?`;
    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
}

module.exports = Clubs;
