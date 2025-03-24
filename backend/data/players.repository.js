const db = require("./db");

class Players {
  static createPlayerApplication(data, callback) {
    data.status = "pending";
    const fields = Object.keys(data).join(", ");
    const placeholders = Object.keys(data)
      .map(() => "?")
      .join(", ");
    const values = Object.values(data);

    const query = `
      INSERT INTO player_applications (${fields})
      VALUES (${placeholders})`;

    db.query(query, values, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static createTransferApplication(data, callback) {
    data.status = "pending";
    const fields = Object.keys(data).join(", ");
    const placeholders = Object.keys(data)
      .map(() => "?")
      .join(", ");
    const values = Object.values(data);

    const query = `
      INSERT INTO player_transfers (${fields})
      VALUES (${placeholders})`;

    db.query(query, values, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static getAllPlayerApplications(callback) {
    const query = `
      SELECT * FROM player_applications`;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static getAllPlayerTransfers(callback) {
    const query = `
      SELECT * FROM player_transfers`;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static getPlayerApplicationById(id, callback) {
    const query = `
      SELECT * FROM player_applications
      WHERE id = ?`;

    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      });
    });
  }

  static getPlayerTransferById(id, callback) {
    const query = `
      SELECT * FROM player_transfers
      WHERE id = ?`;

    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      });
    });
  }

  static approveApplication(id, approvedBy, callback) {
    const field = approvedBy === "club" ? "club_appr" : "league_appr";
    const query = `
      UPDATE player_applications
      SET ${field} = 1
      WHERE id = ?`;

    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static rejectApplication(id, rejectedBy, callback) {
    const field = rejectedBy === "club" ? "club_appr" : "league_appr";
    const query = `
      UPDATE player_applications
      SET ${field} = 0
      WHERE id = ?`;

    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static approveTransfer(id, approvedBy, callback) {
    const field =
      approvedBy === "from_club" ? "from_club_appr" : "to_club_appr";
    const query = `
      UPDATE player_transfers
      SET ${field} = 1
      WHERE id = ?`;

    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static rejectTransfer(id, rejectedBy, callback) {
    const field =
      rejectedBy === "from_club" ? "from_club_appr" : "to_club_appr";
    const query = `
      UPDATE player_transfers
      SET ${field} = 0
      WHERE id = ?`;

    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static updatePlayerClub(playerId, newClubId, callback) {
    const query = `
      UPDATE people
      SET club = ?
      WHERE id = ?`;

    db.query(query, [newClubId, playerId], (err, results) => {
      if (err) {
        // return callback(err, null);
      }
      // callback(null, results);
    });
  }
}

module.exports = Players;
