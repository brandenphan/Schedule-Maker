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

router.post("/changeScheduleSettings", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const currentUser = req.body.currentUser;
		const currentSchedule = req.body.currentSchedule;
		let showAllHours = req.body.showAllHours;
		const currentDate = req.body.currentDate;

		const Schedule = mongoose.model("Schedule", scheduleSchema, currentUser);

		const foundSchedule = await Schedule.find({
			scheduleName: currentSchedule,
		});
		await Schedule.deleteMany({ scheduleName: currentSchedule });

		if (showAllHours === false) {
			showAllHours = true;
		} else {
			showAllHours = false;
		}

		const updatedSchedule = new Schedule({
			scheduleName: foundSchedule[0].scheduleName,
			currentDate: currentDate,
			type: "TimeTable",
			scheduleEvents: foundSchedule[0].scheduleEvents,
			showAllHours: showAllHours,
		});
		updatedSchedule.save();

		res.send("Successfully changed schedule setting");
	}
});

router.post("/renameSchedule", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const currentUser = req.body.currentUser;
		const currentSchedule = req.body.currentSchedule;
		const newScheduleName = req.body.newScheduleName;
		const currentDate = req.body.currentDate;

		const Schedule = mongoose.model("Schedule", scheduleSchema, currentUser);
		let duplicateName = false;

		await Schedule.find({ type: "TimeTable" })
			.exec()
			.then((data) => {
				data.forEach((specificSchedule) => {
					if (
						newScheduleName.toLowerCase() ===
						specificSchedule.scheduleName.toLowerCase()
					) {
						duplicateName = true;
					}
				});
			});

		if (duplicateName === true) {
			res.statusMessage =
				"ERROR: There is already another schedule with this name";
			res.status(400).end();
		} else {
			const foundSchedule = await Schedule.find({
				scheduleName: currentSchedule,
			});
			await Schedule.deleteMany({ scheduleName: currentSchedule });

			const updatedSchedule = new Schedule({
				scheduleName: newScheduleName,
				currentDate: currentDate,
				type: "TimeTable",
				scheduleEvents: foundSchedule[0].scheduleEvents,
				showAllHours: foundSchedule[0].showAllHours,
			});
			updatedSchedule.save();

			res.send("Successfully changed schedule name");
		}
	}
});

router.get("/getEachScheduleEvent", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const currentUser = req.query.currentUser;
		const currentSchedule = req.query.currentSchedule;
		let listEvents = [];

		const Schedule = mongoose.model("Schedule", scheduleSchema, currentUser);

		await Schedule.find({ scheduleName: currentSchedule })
			.exec()
			.then((specificSchedule) => {
				specificSchedule[0].scheduleEvents.forEach((event, index) => {
					if (index === 0) {
						let eventDate = [];
						eventDate.push(event.startDate.day);

						let eventJSON = {
							title: event.title,
							startTimeHour: event.startDate.startTimeHourKey,
							startTimeMinute: event.startDate.startTimeMinuteKey,
							endTimeHour: event.endDate.endTimeHourKey,
							endTimeMinute: event.endDate.endTimeMinuteKey,
							days: eventDate,
						};

						listEvents.push(eventJSON);
					} else {
						let duplicate = false;

						for (let i = 0; i < listEvents.length; i++) {
							if (listEvents[i].title === event.title) {
								listEvents[i].days.push(event.startDate.day);
								duplicate = true;
								break;
							}
						}

						if (duplicate === false) {
							let eventDate = [];
							eventDate.push(event.startDate.day);

							let eventJSON = {
								title: event.title,
								startTimeHour: event.startDate.startTimeHourKey,
								startTimeMinute: event.startDate.startTimeMinuteKey,
								endTimeHour: event.endDate.endTimeHourKey,
								endTimeMinute: event.endDate.endTimeMinuteKey,
								days: eventDate,
							};
							listEvents.push(eventJSON);
						}
					}
				});
			});

		res.send(listEvents);
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

router.post("/deleteScheduleEvent", async (req, res) => {
	if (successfulDatabaseConnection === false) {
		res.statusMessage = "Failed to connect to database, please try again later";
		res.status(503).end();
	} else {
		const currentUser = req.body.currentUser;
		const currentSchedule = req.body.currentSchedule;
		const currentDate = req.body.currentDate;
		const eventName = req.body.eventName;

		const Schedule = mongoose.model("Schedule", scheduleSchema, currentUser);

		const foundSchedule = await Schedule.find({
			scheduleName: currentSchedule,
		});
		await Schedule.deleteMany({ scheduleName: currentSchedule });

		let newSchedule = [];
		foundSchedule[0].scheduleEvents.forEach((data, index) => {
			if (data.title !== eventName) {
				newSchedule.push(data);
			}
		});

		const updatedSchedule = new Schedule({
			scheduleName: foundSchedule[0].scheduleName,
			currentDate: currentDate,
			type: "TimeTable",
			scheduleEvents: newSchedule,
			showAllHours: foundSchedule[0].showAllHours,
		});
		updatedSchedule.save();

		res.send("Successfully deleted event");
	}
});

export default router;
