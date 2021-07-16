import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3001;

const app = express();
dotenv.config();

import userPersistenceRoutes from "./routes/userPersistence.js";
import userSchedulesRoutes from "./routes/userSchedules.js";
import scheduleInformationRoutes from "./routes/scheduleInformation.js";

import userSettingsSchema from "./schemas/userSettingsSchema.js";
import scheduleSchema from "./schemas/scheduleSchema.js";
import schedulePersistenceSchema from "./schemas/schedulePersistenceSchema.js";

// Headers
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

let databaseConnection;
let successfulDatabaseConnection;
try {
	databaseConnection = await mongoose.connect(process.env.DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	successfulDatabaseConnection = true;
	console.log("Successfully connected to database");
} catch (error) {
	successfulDatabaseConnection = false;
	console.log(error.message);
}

app.use("/", userPersistenceRoutes);
app.use("/", userSchedulesRoutes);
app.use("/", scheduleInformationRoutes);

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

export default successfulDatabaseConnection;
