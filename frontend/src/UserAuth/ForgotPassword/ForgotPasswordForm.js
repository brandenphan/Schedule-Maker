import { Button, TextField, Link } from "@material-ui/core";
import { CenteredDiv } from "../StyledComponents";

const ForgotPasswordForm = ({ loading, emailRef, handleSubmit }) => (
	<CenteredDiv style={{ padding: "5%", marginTop: "-3%" }}>
		<form onSubmit={handleSubmit}>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				label="Email Address"
				name="email"
				type="email"
				inputRef={emailRef}
			/>

			<Button
				disabled={loading}
				type="submit"
				variant="contained"
				style={{
					backgroundColor: "#8a7aff",
					color: "white",
					width: "100%",
					padding: "3%",
					marginTop: "4%",
				}}
			>
				Reset Password
			</Button>

			<br />
			<br />
			<CenteredDiv>
				<Link href="/Login" variant="body1">
					Login
				</Link>
			</CenteredDiv>
			<br />
			<CenteredDiv>
				<Link href="/Signup" variant="body1">
					Need an account? Sign up
				</Link>
			</CenteredDiv>
		</form>
	</CenteredDiv>
);

export default ForgotPasswordForm;
