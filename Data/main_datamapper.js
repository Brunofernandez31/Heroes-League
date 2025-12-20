import client from "./database_client.js";
import Heroes from "../src/models/Heroes.model.js";
import pg from "pg";




const datamapper = {
  async getHeroes() {
    const result = await client.query(
      `SELECT * FROM hero LIMIT 3;`
    );
  },

  async getProductById(id) {
    const sqlQuery = `
      SELECT 
        coffee.*, 
        array_agg(category.name) AS categories,
        country.name AS origin_country
      FROM 
        coffee 
      JOIN 
        coffee_category ON coffee.id = coffee_category.coffee_id
      JOIN 
        category ON coffee_category.category_id = category.id
      JOIN
        country ON coffee.country_id = country.id
      WHERE 
        coffee.id = $1
      GROUP BY 
        coffee.id, country.name
      ;
    `;
    const result = await db.query(sqlQuery, [id]);
    return result.rows[0];
  },
};

export default datamapper;
