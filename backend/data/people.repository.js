const db = require("./db");

class People {
  static addOrUpdatePerson(data, callback) {
    if (data.id) {
      // Update existing person
      const id = data.id;
      delete data.id;
      const fields = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = Object.values(data);

      const query = `
        UPDATE people
        SET ${fields}
        WHERE id = ?`;

      db.query(query, [...values, id], (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      });
    } else {
      // Add new person
      const fields = Object.keys(data).join(", ");
      const placeholders = Object.keys(data)
        .map(() => "?")
        .join(", ");
      const values = Object.values(data);

      const query = `
        INSERT INTO people (${fields})
        VALUES (${placeholders})`;

      db.query(query, values, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      });
    }
  }

  static getAllPeople(fields, callback) {
    const defaultFields =
      "id, fname, lname, email, phone, club, team, league_position, club_position, image";
    const selectedFields = fields.length ? fields.join(", ") : defaultFields;

    const query = `
      SELECT ${selectedFields}
      FROM people`;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static getPersonById(id) {
    const query = `
      SELECT id, fname, lname, email, phone, club, team, league_position, club_position, image
      FROM people
      WHERE id = ?`;

    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length === 0) {
          return resolve(null); // Resolve with null if no user is found
        }
        resolve(results[0]);
      });
    });
  }

  static getPeopleByIds(ids, fields, callback) {
    const defaultFields = ["id", "fname", "lname"];
    const selectedFields = fields.length ? fields : defaultFields;

    const query = `
      SELECT ${selectedFields.join(", ")}
      FROM people
      WHERE id IN (${ids.join(", ")})`;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static getAllUmpires(callback) {
    const query = `
      SELECT id, fname, lname, email, phone, league_position, image
      FROM people
      WHERE LOWER(league_position) LIKE '%umpire%'`;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static getCommiteeMembers(callback) {
    const query = `
      SELECT id, fname, lname, email, phone, role, image
      FROM people
      WHERE role IN ('league_official', 'league_registrar')`;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static deletePerson(id, callback) {
    const query = `DELETE FROM people WHERE id = ?`;

    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static updatePersonClubByRegistrationNumber(
    registrationNumber,
    newClubId,
    callback
  ) {
    const query = `
      UPDATE people
      SET club = ?
      WHERE id = ?`;

    db.query(query, [newClubId || null, registrationNumber], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static getUserByEmail(email) {
    const query = `
      SELECT id, fname, lname, email, password, role
      FROM people
      WHERE email = ?`;

    return new Promise((resolve, reject) => {
      db.query(query, [email], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      });
    });
  }
}

module.exports = People;
