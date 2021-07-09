import express from "express";
import cors from "cors";

import mongoose from "mongoose";

const PORT = process.env.PORT || 3001;

const app = express();

// try {
// 	await mongoose.connect(
// 		"mongodb+srv://brandenphan:brandenphan2001@cluster0.ymxvc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
// 		{ useNewUrlParser: true, useUnifiedTopology: true }
// 	);
// } catch (error) {
// 	console.log(error.message);
// }

// const productSchema = mongoose.Schema({
// 	id: mongoose.Schema.Types.ObjectId,
// 	name: String,
// 	price: Number,
// });

// const Product = mongoose.model(
// 	"Product",
// 	productSchema,
// 	"branden.phan@gmail.com"
// );
// const product = new Product({
// 	_id: new mongoose.Types.ObjectId(),
// 	name: "bye",
// 	price: 10,
// });
// product.save();

// Headers
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/api", (req, res) => {
	res.json({ message: "Hello from Server!" });
});

app.get("/scheduleData", (req, res) => {
	res.json([
		{
			title: "Website Re-Design Plan",
			startDate: new Date(2018, 5, 25, 9, 35),
			endDate: new Date(2018, 5, 25, 11, 30),
			id: 0,
			location: "Room 1",
		},
		{
			title: "Book Flights to San Fran for Sales Trip",
			startDate: new Date(2018, 5, 25, 12, 11),
			endDate: new Date(2018, 5, 25, 13, 0),
			id: 1,
			location: "Room 1",
		},
		{
			title: "Install New Router in Dev Room",
			startDate: new Date(2018, 5, 25, 14, 30),
			endDate: new Date(2018, 5, 25, 15, 35),
			id: 2,
			location: "Room 2",
		},
	]);
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
