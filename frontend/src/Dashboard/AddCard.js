import React from "react";
import { CardActionArea, CardContent } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

// axios.post("/addNewSchedule", { currentUser: currentUser.email });
// 0.25 means 1/4 0.5 means 2/4 0.75 means 3/4

const AddCard = () => {
	return (
		<CardActionArea
			onClick={() => {
				console.log("ADD");
			}}
		>
			<CardContent>
				<AddIcon />
			</CardContent>
		</CardActionArea>
	);
};

export default AddCard;
