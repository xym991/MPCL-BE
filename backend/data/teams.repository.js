const db = require("./db");
const People = require("./people.repository");

class Teams {
  static createOrUpdateTeam(data, callback) {
    const validFields = [
      "id",
      "name",
      "club",
      "player1",
      "player2",
      "player3",
      "player4",
      "player5",
      "player6",
      "player7",
      "player8",
      "player9",
      "player10",
      "player11",
      "sub1",
      "sub2",
      "sub3",
      "sub4",
    ];

    const filteredData = Object.keys(data)
      .filter((key) => validFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    if (filteredData.id) {
      // Update existing team
      const id = filteredData.id;
      delete filteredData.id;
      const fields = Object.keys(filteredData)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = Object.values(filteredData);

      const query = `
        UPDATE teams
        SET ${fields}
        WHERE id = ?`;

      db.query(query, [...values, id], (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      });
    } else {
      // Add new team
      const fields = Object.keys(filteredData).join(", ");
      const placeholders = Object.keys(filteredData)
        .map(() => "?")
        .join(", ");
      const values = Object.values(filteredData);

      const query = `
        INSERT INTO teams (${fields})
        VALUES (${placeholders})`;

      db.query(query, values, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      });
    }
  }

  static getAllTeams(callback) {
    const query = `
      SELECT * FROM teams`;

    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static getTeamById(id, callback) {
    const query = `
      SELECT *
      FROM teams
      WHERE id = ?`;

    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  }

  static async getTeamsByClubId(clubId, callback) {
    const query = `
      SELECT *
      FROM teams
      WHERE club = ?`;

    try {
      const [teams] = await db.promise().query(query, [clubId]);

      const playerIds = teams
        .flatMap((team) => [
          team.player1,
          team.player2,
          team.player3,
          team.player4,
          team.player5,
          team.player6,
          team.player7,
          team.player8,
          team.player9,
          team.player10,
          team.player11,
          team.sub1,
          team.sub2,
          team.sub3,
          team.sub4,
        ])
        .filter(Boolean);

      People.getPeopleByIds(
        playerIds,
        ["id", "fname", "lname", "image", "phone", "email"],
        (err, players) => {
          if (err) {
            return callback(err, null);
          }

          const playerMap = players.reduce((acc, player) => {
            acc[player.id] = player;
            return acc;
          }, {});

          const teamsWithPlayers = teams.map((team) => ({
            ...team,
            players: [
              playerMap[team.player1],
              playerMap[team.player2],
              playerMap[team.player3],
              playerMap[team.player4],
              playerMap[team.player5],
              playerMap[team.player6],
              playerMap[team.player7],
              playerMap[team.player8],
              playerMap[team.player9],
              playerMap[team.player10],
              playerMap[team.player11],
              playerMap[team.sub1],
              playerMap[team.sub2],
              playerMap[team.sub3],
              playerMap[team.sub4],
            ].filter(Boolean),
          }));

          callback(null, teamsWithPlayers);
        }
      );
    } catch (err) {
      callback(err, null);
    }
  }

  static deleteTeam(id, callback) {
    const query = `DELETE FROM teams WHERE id = ?`;

    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static removePlayerFromTeams(playerId, newClubId, callback) {
    const query = `
      UPDATE teams
      SET player1 = NULLIF(player1, ?),
          player2 = NULLIF(player2, ?),
          player3 = NULLIF(player3, ?),
          player4 = NULLIF(player4, ?),
          player5 = NULLIF(player5, ?),
          player6 = NULLIF(player6, ?),
          player7 = NULLIF(player7, ?),
          player8 = NULLIF(player8, ?),
          player9 = NULLIF(player9, ?),
          player10 = NULLIF(player10, ?),
          player11 = NULLIF(player11, ?),
          sub1 = NULLIF(sub1, ?),
          sub2 = NULLIF(sub2, ?),
          sub3 = NULLIF(sub3, ?),
          sub4 = NULLIF(sub4, ?)
      WHERE club = ?`;

    db.query(
      query,
      [
        playerId,
        playerId,
        playerId,
        playerId,
        playerId,
        playerId,
        playerId,
        playerId,
        playerId,
        playerId,
        playerId,
        playerId,
        playerId,
        playerId,
        playerId,
        playerId,
        newClubId,
      ],
      (err, results) => {
        if (err) {
          return callback(err, null);
        }
      }
    );
  }

  static updatePlayerClubByRegistrationNumber(
    registrationNumber,
    newClubId,
    callback
  ) {
    const query = `
      UPDATE teams
      SET player1 = NULLIF(player1, ?),
          player2 = NULLIF(player2, ?),
          player3 = NULLIF(player3, ?),
          player4 = NULLIF(player4, ?),
          player5 = NULLIF(player5, ?),
          player6 = NULLIF(player6, ?),
          player7 = NULLIF(player7, ?),
          player8 = NULLIF(player8, ?),
          player9 = NULLIF(player9, ?),
          player10 = NULLIF(player10, ?),
          player11 = NULLIF(player11, ?),
          sub1 = NULLIF(sub1, ?),
          sub2 = NULLIF(sub2, ?),
          sub3 = NULLIF(sub3, ?),
          sub4 = NULLIF(sub4, ?)
      WHERE id = ?`;

    db.query(
      query,
      [
        registrationNumber,
        registrationNumber,
        registrationNumber,
        registrationNumber,
        registrationNumber,
        registrationNumber,
        registrationNumber,
        registrationNumber,
        registrationNumber,
        registrationNumber,
        registrationNumber,
        registrationNumber,
        registrationNumber,
        registrationNumber,
        registrationNumber,
        newClubId,
      ],
      (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      }
    );
  }
}

module.exports = Teams;
