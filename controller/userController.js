const connectDB = require('../mongoDB');
const { ObjectId } = require('mongodb');
// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const db = await connectDB();
        const users = await db.collection('users').find({}).toArray();
        res.status(200).json({
            status: "success",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

// Get a Single User by ID
exports.getUser = async (req, res) => {
    try {
        const db = await connectDB();
        const user = await db.collection('users').findOne({ _id: new require('mongodb').ObjectId(req.params.id) });

        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found!",
            });
        }

        res.status(200).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

// Create a New User
exports.createUser = async (req, res) => {
    try {
        const db = await connectDB();
        const newUser = req.body;
        const result = await db.collection('users').insertOne(newUser);

        res.status(201).json({
            status: "success",
            data: {
                id: result.insertedId,
                ...newUser,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const db = await connectDB();
        const updatedUser = req.body;

        // Use ObjectId correctly
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(req.body.id) },
            { $set: updatedUser }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                status: "fail",
                message: "User not found!",
            });
        }

        res.status(200).json({
            status: "success",
            message: "User updated successfully!",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};


// Delete a User
exports.deleteUser = async (req, res) => {
    try {
        const db = await connectDB();

        const result = await db.collection('users').deleteOne({ _id: new require('mongodb').ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                status: "fail",
                message: "User not found!",
            });
        }

        res.status(200).json({
            status: "success",
            message: "User deleted successfully!",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
