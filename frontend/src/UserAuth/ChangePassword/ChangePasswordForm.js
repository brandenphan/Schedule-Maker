import { Button, TextField, Link } from "@material-ui/core";
import { CenteredDiv } from "../StyledComponents";

const ChangePasswordForm = ({
	loading,
	passwordRef,
	passwordConfirmRef,
	handleSubmit,
}) => (
	<CenteredDiv style={{ padding: "5%", marginTop: "-3%" }}>
		<form onSubmit={handleSubmit}>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				label="Password"
				name="password"
				type="password"
				inputRef={passwordRef}
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password Confirm"
				type="password"
				inputRef={passwordConfirmRef}
			/>

			<CenteredDiv>
				<Button
					disabled={loading}
					type="submit"
					variant="contained"
					style={{
						backgroundColor: "#8a7aff",
						color: "white",
						width: "100%",
						padding: "3%",
						marginTop: "3%",
					}}
				>
					Change Password
				</Button>
			</CenteredDiv>

			<br />
			<CenteredDiv>
				<Link href="/Dashboard" variant="body1" style={{ marginBottom: "-5%" }}>
					Cancel
				</Link>
			</CenteredDiv>
			<br />
		</form>
	</CenteredDiv>
);

export default ChangePasswordForm;
