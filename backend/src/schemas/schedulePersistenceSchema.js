import mongoose from "mongoose";

const schedulePersistenceSchema = mongoose.Schema({
	currentSchedule: String,
	type: String,
});

export default schedulePersistenceSchema;
