import pool from "./database_client.js"; // Pour se connecter à la bdd afin de faire des requetes

const datamapper = {

  async getHeroes(limit = null) {
    const query = limit
      ? `SELECT * FROM hero LIMIT $1;`
      : `SELECT * FROM hero;`;

    const result = limit
      ? await pool.query(query, [limit])
      : await pool.query(query);
    return result.rows;
  },


  async getHeroesById(id) {
    const result = await pool.query(
      `
      SELECT * 
      FROM hero
      WHERE id_hero = $1
      `, [id] // prévention contre injection sql, le [id] remplacera le $1
    );
    return result.rows[0]; // Retourner que le premier élément du tableau
  },


  async getTestimonyById(id) {
    const result = await pool.query(
      `
      SELECT opinion.*, client.img_client, client.name as client_name
      FROM opinion
      JOIN client ON opinion.id_client = client.id_client
      WHERE opinion.id_hero = $1
      `, [id] // prévention contre injection sql, le [id] remplacera le $1
    );
    return result.rows;
  },


  async getTestimonies() {
    const result = await pool.query(
      `      
      SELECT opinion.*, client.img_client, client.name as client_name
      FROM opinion
      JOIN client ON opinion.id_client = client.id_client
      `
    );
    return result.rows;
  },


  async getClientByMail(mail) {
    const result = await pool.query(
      `
      SELECT * FROM client
      WHERE email = $1;
      `, [mail]);
    return result.rows[0];
  },


  async createClientBdd(nameClient, mail) {
    const result = await pool.query(
      `
      INSERT INTO client (name, email, img_client) 
      VALUES ($1, $2, $3)
      RETURNING * `, // Pour récuperer le client créér avec son ID
      // Après un INSERT, PostgreSQL peut te retourner la ligne qui vient d'être insérée (avec l'ID auto-généré)
      [nameClient, mail, 'avatarGenerique.png']
    );
    return result.rows[0];
  },


  async createMission(description, city, id_client, urgency) {
    const result = await pool.query(
      `
      INSERT INTO mission (description, city, id_client, urgency)
      VALUES ($1, $2, $3, $4)
      RETURNING *`, [description, city, id_client, urgency]
    ); // Si pas de returning on renvoie un tableau vide pour result.rows
    return result.rows[0];
  },


  async getMissionById(id) {
    const result = await pool.query(
      `
      SELECT * 
      FROM mission
      WHERE id_mission = $1
      `, [id] // prévention contre injection sql, le [id] remplacera le $1
    );
    return result.rows[0]; // Retourner que le premier élément du tableau
  },

  async getMissionEnCoursByHero(id) {
    const result = await pool.query(
      `
      SELECT id_hero, status
      FROM mission
      WHERE id_hero = $1 AND status = 'En cours'
      `, [id] 
    );
    return result.rows[0]; // Retourner que le premier élément du tableau
  },


  async updateMission(missionId, idHero, missionDuration, missionComments, priceFixed, missionResult) {
    const result = await pool.query(
      `
      UPDATE mission 
      SET id_hero = $2, duration = $3, status = 'Terminée', comments = $4, total_price = $5, mission_result = $6
      WHERE id_mission = $1
      RETURNING *`, [missionId, idHero, missionDuration, missionComments, priceFixed, missionResult]
    );
    return result.rows[0];
  },

  async getMissionDashboard(id) {
    const result = await pool.query(
      `
      SELECT mission.id_mission, mission.description, mission.city, mission.start_date, mission.id_client, mission.status, mission.urgency, client.name as client_name
      FROM mission
      JOIN client ON mission.id_client = client.id_client
      WHERE (id_hero IS NULL OR id_hero = $1)
      ORDER BY 
      CASE 
        WHEN id_hero = $1 THEN 0
        ELSE 1
      END,
      CASE urgency
        WHEN 'immediate' THEN 1
        WHEN 'threeDays' THEN 2
        WHEN 'hebdomadaire' THEN 3
      END
      `, [id]
    );
    return result.rows;
  },


  // Incrémenter le nombre de mission du héro
  async updateHero(id) {
    const result = await pool.query(
      `
      UPDATE hero
      SET nb_mission = nb_mission + 1
      WHERE id_hero = $1
      RETURNING *
      `, [id] 
    );
    return result.rows[0]; 
  },

  async createUser(email, password, role, firstName, lastName) {
    const result = await pool.query(
      `
      INSERT INTO users (email, password, role, firstname, lastname)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `, [email, password, role, firstName, lastName]
    );
    return result.rows[0];
  },

  async getIdHeroByIdUser(idUser) {
    const result = await pool.query(
      `
      SELECT id_hero from hero
      WHERE id_user = $1 
      `, [idUser]
    );
    return result.rows[0];
  },

  async getUserByEmail(email) {
    const result = await pool.query(
      `
    SELECT * 
    FROM users
    WHERE email = $1;
    `, [email]
    );
    return result.rows[0];
  },

  async createHero(firstName, lastName, advantage, disadvantage, price_per_hour, created_by, id_user, other_price, img_hero, quartier) {
    const result = await pool.query(
      `
      INSERT INTO hero (firstname, lastname, advantage, disadvantage, price_per_hour, created_by, id_user, other_price, img_hero, quartier)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
      `,
      [firstName, lastName, advantage, disadvantage, price_per_hour, created_by, id_user, other_price, img_hero, quartier]
    );
    return result.rows[0];
  },

  async updateMissionById(id_mission, id_hero) {
    const result = await pool.query(
      `
    UPDATE mission 
    SET id_hero = $2, status = 'En cours'
    WHERE id_mission = $1
    RETURNING *
    `,
      [id_mission, id_hero]
    );
    // console.log(result.rows[0])
    return result.rows[0];
  },

    async getHeroesForAdmin() {
      const result = await pool.query(
        'select * from hero'
      )
    return result.rows;
  },

  async deleteIdHeroById(id) {
    const result = await pool.query(
      `
      DELETE FROM hero
      WHERE id_hero = $1
      RETURNING*
      `,[id]
    )
    return result.rows[0];
  },

  async deleteUserHeroById(id) {
    const result = await pool.query(
      `
      DELETE FROM users
      WHERE id_user = $1
      RETURNING*
      `,[id]
    )
    return result.rows[0];
  },

}

export default datamapper;