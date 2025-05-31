import mongoose from "mongoose";
const connection = { isConnected: null };

export const connectToDB = async () => {
	if (connection.isConnected) {
		console.log("MongoDB is already connected");
		return;
	}

	try {
		const db = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		connection.isConnected = db.connections[0].readyState;
		console.log("MongoDB connected successfully");
	} catch (error) {
		console.error("MongoDB connection failed:", error);
		throw new Error("Failed to connect to MongoDB");
	}
};
