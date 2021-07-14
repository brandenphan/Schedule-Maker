import express from "express";
let router = express.Router();

import mongoose from "mongoose";
import scheduleSchema from "../schemas/scheduleSchema.js";
import successfulDatabaseConnection from "../index.js";

router.get("/getUserSchedules", async (req, res) => {
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

router.delete("/deleteUserSchedule", async (req, res) => {
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

router.post("/addNewSchedule", async (req, res) => {
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
				showAllHours: false,
			});
			schedule.save().then(() => {
				console.log("New schedule saved");
			});
			res.send("New schedule sucessfully created");
		}
	}
});

export default router;
