import {
	Grid,
	Zoom,
	Card,
	CardActionArea,
	CardContent,
	CardActions,
	Typography,
	IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";

const ScheduleCards = () => {
	const history = useHistory();
	return (
		<>
			<Zoom in={true} timeout={800}>
				<Grid item xs={3} style={{ borderRadius: "20px" }}>
					<div
						style={{
							padding: "5%",
						}}
					>
						<Card>
							<CardActionArea
								onClick={() => {
									history.push("/SchedulePage");
								}}
							>
								<CardContent>
									<Typography>Schedule Name</Typography>
									<Typography>Last Modified</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions style={{ float: "right", marginTop: "-3%" }}>
								<IconButton>
									<DeleteIcon />
								</IconButton>
							</CardActions>
						</Card>
					</div>
				</Grid>
			</Zoom>
			<Zoom in={true} timeout={800}>
				<Grid item xs={3} style={{ borderRadius: "20px" }}>
					<div
						style={{
							padding: "5%",
						}}
					>
						<Card>
							<CardActionArea
								onClick={() => {
									history.push("/SchedulePage");
								}}
							>
								<CardContent>
									<Typography>Schedule Name</Typography>
									<Typography>Last Modified</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions style={{ float: "right", marginTop: "-3%" }}>
								<IconButton>
									<DeleteIcon />
								</IconButton>
							</CardActions>
						</Card>
					</div>
				</Grid>
			</Zoom>
			<Zoom in={true} timeout={800}>
				<Grid
					item
					xs={3}
					style={{
						borderRadius: "20px",
					}}
				>
					<div
						style={{
							padding: "5%",
						}}
					>
						<Card
							style={{
								width: "100%",
								textAlign: "center",
								marginTop: "7%",
							}}
						>
							<CardActionArea
								onClick={() => {
									console.log("ADD");
								}}
							>
								<CardContent>
									<AddIcon />
								</CardContent>
							</CardActionArea>
						</Card>
					</div>
				</Grid>
			</Zoom>
			<Grid item xs={3}></Grid>
		</>
	);
};

export default ScheduleCards;
