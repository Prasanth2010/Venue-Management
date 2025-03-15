import { App, Credentials } from "realm-web";

// Replace with your MongoDB Realm App ID
const appId = "your-app-id"; // Found in MongoDB App Services dashboard
const app = new App({ id: appId });

export async function logInAnonymous() {
  const credentials = Credentials.anonymous();
  const user = await app.logIn(credentials);
  return user;
}

export async function getMongoClient() {
  const user = await logInAnonymous();
  return user.mongoClient("mongodb-atlas");
}

export async function testDBConnection() {
  try {
    const mongoClient = await getMongoClient();
    const db = mongoClient.db("your-database-name"); // Replace with your database name
    const collections = await db.listCollections().toArray();
    return collections.length > 0
      ? `Connected! Collections: ${collections.map((c) => c.name).join(", ")}`
      : "Connected, but no collections found.";
  } catch (error) {
    return `Connection failed: ${error.message}`;
  }
}
