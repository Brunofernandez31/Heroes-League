import pg from "pg";

//Create a client connexion for postegreSQL
const client = new pg.Client(process.env.DATABASE_URL);

// connect it 
client.connect();

// Export the client
export default client;