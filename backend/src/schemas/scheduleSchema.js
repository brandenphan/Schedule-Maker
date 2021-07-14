import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
	scheduleName: String,
	currentDate: String,
	type: String,
	scheduleEvents: Array,
});

export default scheduleSchema;
