import mongoose from "mongoose";

const userSettingsSchema = mongoose.Schema({
	darkMode: Boolean,
	type: String,
});

export default userSettingsSchema;
