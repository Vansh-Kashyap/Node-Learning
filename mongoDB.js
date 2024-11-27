const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017"; // Connection URI
const client = new MongoClient(uri);

const connectDB = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        return client.db('testDB');
    } catch (error) {
        console.error("Connection failed:", error);
        throw error;
    }
};

module.exports = connectDB;
