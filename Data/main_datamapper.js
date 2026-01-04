import pool from "./database_client.js"; // Pour se connecter à la bdd afin de faire des requetes


const datamapper = {

  async getHeroes() {
    const result = await pool.query(
      `SELECT * FROM hero;`
    );
    return result.rows
  },

  async getHeroesById(id) {
    const result = await pool.query(
      `
      SELECT * 
      FROM hero
      WHERE id_hero = $1
      `,[id] // prévention contre injection sql, le [id] remplacera le $1
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
      `,[id] // prévention contre injection sql, le [id] remplacera le $1
      );
      return result.rows;
  },

  async getTestimonies () {
    const result = await pool.query(
      `      
      SELECT opinion.*, client.img_client, client.name as client_name
      FROM opinion
      JOIN client ON opinion.id_client = client.id_client
      `
      );
      return result.rows;
  },

  async getClientByMail (mail) {
    const result = await pool.query(
      `
      SELECT * FROM client
      WHERE email = $1;
      `,[mail]);
      return result.rows[0];
  },

  async createClientBdd (nameClient, mail) {
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

  async createMission (description, city, id_client, urgency) {
    const result = await pool.query(
      `
      INSERT INTO mission (description, city, id_client, urgency)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,[description, city, id_client, urgency]
    ); // Si pas de returning on renvoie un tableau vide pour result.rows
    return result.rows[0];
  },

  async getMissionById (id) {

    const result = await pool.query(
      `
      SELECT * 
      FROM mission
      WHERE id_mission = $1
      `,[id] // prévention contre injection sql, le [id] remplacera le $1
      );
      return result.rows[0]; // Retourner que le premier élément du tableau
  }

  }

  // async updateMission () {
  //   const result = await pool.query()
  // },

  // async updateHero () {
  //   const result = await pool.query()
  // }


export default datamapper;

  //   const result = await pool.query(
  //     `
  //     UPDATE mission 
  //     SET id_hero = $1, duration = $2, status =$3
  //     WHERE id_hero = $1, duration = $2, status =$3
  //     `,[id_hero, duration, status]
  //   )