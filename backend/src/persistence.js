// import express from "express";
// const app = (module.exports = express());

// app.get("/hey", (req, res) => {
// 	res.send("hey");
// });

// import express from "express";

// let router = express.Router();

// testRoute = router.route("/hey");

// testRoute.get((req, res) => {
// 	res.send("HEY");
// });

// module.exports = testRoute;

import express from "express";
let router = express.Router();

router.get("/test", (req, res) => {
	res.send("HEY");
});

export default router;
