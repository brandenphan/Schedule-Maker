import express from "express";
import cors from "cors";

import mongoose from "mongoose";

const PORT = process.env.PORT || 3001;

const app = express();

// Headers
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

let databaseConnection;
let successfulDatabaseConnection;

try {
	databaseConnection = await mongoose.connect(
		`mongodb+srv://brandenphan:brandenphan2001@cluster0.ymxvc.mongodb.net/Schedule-Maker?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	);
	successfulDatabaseConnection = true;
	console.log("Successfully connected to database");
} catch (error) {
	successfulDatabaseConnection = false;
	console.log(error.message);
}

const scheduleSchema = mongoose.Schema({
	scheduleName: String,
	currentDate: String,
	type: String,
	scheduleEvents: Array,
});

app.get("/getUserSchedule", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const test = req.query.currentUser;
		console.log(test);
		res.send("HEY");
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

		await Schedule.find({})
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

app.get("/api", (req, res) => {
	res.json({ message: "Hello from Server!" });
});

app.get("/scheduleData", (req, res) => {
	res.json([
		{
			title: "Website Re-Design Plan",
			startDate: new Date(2021, 7, 1, 9, 35),
			endDate: new Date(2021, 7, 1, 11, 30),
			id: 0,
			rRule: "FREQ=WEEKLY;COUNT=1000",
		},
		{
			title: "Website Re-Design Plan",
			startDate: new Date(2021, 7, 4, 9, 35),
			endDate: new Date(2021, 7, 4, 11, 30),
			id: 1,
			rRule: "FREQ=WEEKLY;COUNT=1000",
		},
		{
			title: "Math",
			startDate: new Date(2021, 7, 5, 11, 35),
			endDate: new Date(2021, 7, 5, 13, 30),
			id: 1,
			rRule: "FREQ=WEEKLY;COUNT=1000",
		},

		// {
		// 	title: "Book Flights to San Fran for Sales Trip",
		// 	startDate: new Date(2018, 5, 25, 12, 11),
		// 	endDate: new Date(2018, 5, 25, 13, 0),
		// 	id: 1,
		// },
		// {
		// 	title: "Install New Router in Dev Room",
		// 	startDate: new Date(2018, 5, 25, 14, 30),
		// 	endDate: new Date(2018, 5, 25, 15, 35),
		// 	id: 2,
		// },
	]);
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
