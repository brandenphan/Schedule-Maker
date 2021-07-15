import express from "express";
let router = express.Router();

import mongoose from "mongoose";
import schedulePersistenceSchema from "../schemas/schedulePersistenceSchema.js";
import successfulDatabaseConnection from "../index.js";

router.post("/resetCurrentSchedulePersistence", async (req, res) => {
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

router.post("/setCurrentSchedulePersistence", async (req, res) => {
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

router.get("/getUserPersistence", async (req, res) => {
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

export default router;
