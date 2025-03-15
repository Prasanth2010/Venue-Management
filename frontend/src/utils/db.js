const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // Replace this with your connection string
const client = new MongoClient(uri);

const connectDB = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB Compass!");
    } catch (err) {
        console.error("Error connecting to MongoDB Compass:", err);
        process.exit(1);
    }
};

module.exports = { connectDB, client };
