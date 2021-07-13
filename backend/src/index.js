import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3001;

const app = express();

dotenv.config();

import persistenceRoute from "./persistence.js";
app.use("/test", persistenceRoute);

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

const userSettingsSchema = mongoose.Schema({
	darkMode: Boolean,
	type: String,
});

const scheduleSchema = mongoose.Schema({
	scheduleName: String,
	currentDate: String,
	type: String,
	scheduleEvents: Array,
});

const schedulePersistenceSchema = mongoose.Schema({
	currentSchedule: String,
	type: String,
});

app.post("/setUserSettings", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const currentUser = req.body.currentUser;
		const darkModeBoolean = req.body.darkModeBoolean;
		const Settings = mongoose.model(
			"UserSettings",
			userSettingsSchema,
			currentUser
		);

		await Settings.deleteMany({ type: "UserSettings" });

		const newSettings = Settings({
			darkMode: darkModeBoolean,
			type: "UserSettings",
		});
		newSettings.save();

		res.send("Updated user profile successfully");
	}
});

app.post("/resetCurrentSchedulePersistence", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const currentUser = req.body.currentUser;
		const Persistence = mongoose.model(
			"Persistence",
			schedulePersistenceSchema,
			currentUser
		);

		await Persistence.deleteMany({ type: "Persistence" });

		const newPersistence = new Persistence({
			currentSchedule: "",
			type: "Persistence",
		});
		newPersistence.save();

		res.send("Updated user persistence successfully");
	}
});

app.post("/setCurrentSchedulePersistence", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const currentUser = req.body.currentUser;
		const currentSchedule = req.body.scheduleName;
		const Persistence = mongoose.model(
			"Persistence",
			schedulePersistenceSchema,
			currentUser
		);

		await Persistence.deleteMany({ type: "Persistence" });

		const newPersistence = new Persistence({
			currentSchedule: currentSchedule,
			type: "Persistence",
		});
		newPersistence.save();

		res.send("Updated user persistence successfully");
	}
});

app.get("/getUserPersistence", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const currentUser = req.query.currentUser;
		const Persistence = mongoose.model(
			"Persistence",
			schedulePersistenceSchema,
			currentUser
		);

		await Persistence.find({ type: "Persistence" })
			.exec()
			.then((data) => {
				res.send(data[0].currentSchedule);
			});
	}
});

app.get("/getUserSchedules", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const currentUser = req.query.currentUser;
		const Schedule = mongoose.model("Schedule", scheduleSchema, currentUser);

		await Schedule.find({ type: "TimeTable" })
			.exec()
			.then((data) => {
				res.send(data);
			});
	}
});

app.delete("/deleteUserSchedule", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const currentUser = req.body.currentUser;
		const scheduleName = req.body.scheduleName;

		const Schedule = mongoose.model("Schedule", scheduleSchema, currentUser);
		await Schedule.deleteMany({ scheduleName: scheduleName });

		res.send("Successfully deleted schedule");
	}
});

app.post("/addNewSchedule", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const scheduleName = req.body.scheduleName;
		const currentDate = req.body.currentDate;
		const currentUser = req.body.currentUser;

		const Schedule = mongoose.model("Schedule", scheduleSchema, currentUser);
		let duplicateName = false;

		await Schedule.find({ type: "TimeTable" })
			.exec()
			.then((data) => {
				data.forEach((specificSchedule) => {
					if (
						scheduleName.toLowerCase() ===
						specificSchedule.scheduleName.toLowerCase()
					) {
						duplicateName = true;
					}
				});
			});

		if (duplicateName === true) {
			res.statusMessage = "Duplicate Schedule name";
			res.status(400).end();
		} else {
			const schedule = new Schedule({
				scheduleName: scheduleName,
				currentDate: currentDate,
				type: "TimeTable",
				scheduleEvents: [],
			});
			schedule.save().then(() => {
				console.log("New schedule saved");
			});
			res.send("New schedule sucessfully created");
		}
	}
});

app.get("/getScheduleInformation", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const currentUser = req.query.currentUser;
		const currentSchedule = req.query.currentSchedule;
		let scheduleInformation = [];

		const Schedule = mongoose.model("Schedule", scheduleSchema, currentUser);
		Schedule.find({ scheduleName: currentSchedule })
			.exec()
			.then((data) => {
				data[0].scheduleEvents.forEach((eachItem) => {
					let eachItemValues = {
						title: eachItem.title,
						startDate: new Date(
							eachItem.startDate.year,
							eachItem.startDate.month,
							eachItem.startDate.day,
							eachItem.startDate.startTimeHourKey,
							eachItem.startDate.startTimeMinuteKey
						),
						endDate: new Date(
							eachItem.endDate.year,
							eachItem.endDate.month,
							eachItem.endDate.day,
							eachItem.endDate.endTimeHourKey,
							eachItem.endDate.endTimeMinuteKey
						),
						rRule: eachItem.rRule,
					};
					scheduleInformation.push(eachItemValues);
				});
				res.send(scheduleInformation);
			});
	}
});

app.post("/addScheduleEvent", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const scheduleName = req.body.scheduleName;
		const itemName = req.body.itemName;
		const scheduleEventData = req.body.information;
		const currentUser = req.body.currentUser;
		const currentDate = req.body.currentDate;

		const Schedule = mongoose.model("Schedule", scheduleSchema, currentUser);

		let duplicateTitle = false;

		await Schedule.find({ scheduleName: scheduleName })
			.exec()
			.then((data) => {
				data[0].scheduleEvents.forEach((itemData) => {
					if (itemData.title.toLowerCase() === itemName.toLowerCase()) {
						duplicateTitle = true;
					}
				});
			});

		if (duplicateTitle === true) {
			res.statusMessage = "Duplicate Item name";
			res.status(400).end();
		} else {
			let updatedEvents = [];
			await Schedule.find({ scheduleName: scheduleName })
				.exec()
				.then((data) => {
					scheduleEventData.forEach((newData) => {
						updatedEvents.push(newData);
					});

					data[0].scheduleEvents.forEach((itemData) => {
						updatedEvents.push(itemData);
					});
				});

			await Schedule.deleteOne({ scheduleName: scheduleName })
				.exec()
				.then(() => {
					console.log("Deleted successfully");
				});

			const schedule = new Schedule({
				scheduleName: scheduleName,
				currentDate: currentDate,
				type: "TimeTable",
				scheduleEvents: updatedEvents,
			});

			schedule.save().then(() => {
				console.log("Saved successfully");
			});

			res.send("Item added successfully");
		}
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
