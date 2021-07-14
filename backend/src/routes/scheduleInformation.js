import express from "express";
let router = express.Router();

import mongoose from "mongoose";
import scheduleSchema from "../schemas/scheduleSchema.js";
import successfulDatabaseConnection from "../index.js";

router.get("/getScheduleInformation", async (req, res) => {
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
				res.send({
					scheduleInformation: scheduleInformation,
					showAllHours: data[0].showAllHours,
				});
			});
	}
});

router.post("/addScheduleEvent", async (req, res) => {
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
			let showAllHours;
			await Schedule.find({ scheduleName: scheduleName })
				.exec()
				.then((data) => {
					scheduleEventData.forEach((newData) => {
						updatedEvents.push(newData);
					});

					data[0].scheduleEvents.forEach((itemData) => {
						updatedEvents.push(itemData);
					});

					showAllHours = data[0].showAllHours;
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
				showAllHours: showAllHours,
			});

			schedule.save().then(() => {
				console.log("Saved successfully");
			});

			res.send("Item added successfully");
		}
	}
});

export default router;
