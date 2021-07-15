import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
	scheduleName: String,
	currentDate: String,
	type: String,
	scheduleEvents: Array,
	showAllHours: Boolean,
});

export default scheduleSchema;
