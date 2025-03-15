import { App, Credentials } from "realm-web";

const appId = "mongodb+srv://prasanth:prasanth2010@cluster0.uwh3g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
const app = new App({ id: appId });

export async function getMongoClient() {
  try {
    const credentials = Credentials.anonymous(); // Anonymous authentication
    const user = await app.logIn(credentials); // Log in to Realm
    return user.mongoClient("mongodb-atlas"); // Access MongoDB Atlas
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Propagate the error for debugging
  }
}
