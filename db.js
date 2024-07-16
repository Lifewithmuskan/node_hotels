const mongoose = require('mongoose');
//const mongoURL = process.env.MONGODB_HOTELURLL;
const itemsMongoURL = process.env.MONGODB_LOCALURL;
require('dotenv').config();
const mongoURL=process.env.MONGODB ;
//connection
// Set up MongoDB connection 
mongoose.connect(mongoURL, {
    useNewUrlParser: true, // Corrected typo here
    useUnifiedTopology: true
});

const itemsConnection = mongoose.createConnection(itemsMongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

// Define event listeners for database connection 
db.on('connected', () => {
    console.log("Connected to MongoDB server");
});

db.on('disconnected', () => {
    console.log("Disconnected from MongoDB server");
});

db.on('error', (err) => {
    console.error("Error connecting to MongoDB:", err);
});

// Define event listeners for items database connection 
itemsConnection.on('connected', () => {
    console.log("Connected to MongoDB items server");
});

itemsConnection.on('disconnected', () => {
    console.log("Disconnected from MongoDB items server");
});

itemsConnection.on('error', (err) => {
    console.error("Error connecting to MongoDB items:", err);
});

// Export the database connection 
module.exports = db;
module.exports=itemsConnection;
