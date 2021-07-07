import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3001;

const app = express();

// Headers
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/api", (req, res) => {
	res.json({ message: "Hello from Server!" });
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
