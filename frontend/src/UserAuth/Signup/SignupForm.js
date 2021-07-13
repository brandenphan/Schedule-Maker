import { CenteredDiv } from "../StyledComponents";
import { Button, TextField, Link } from "@material-ui/core";

const SignupForm = ({ loading, emailRef, passwordRef, handleSubmit }) => (
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
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				inputRef={passwordRef}
			/>

			<br />
			<br />
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
					}}
				>
					Sign up
				</Button>
			</CenteredDiv>

			<br />
			<CenteredDiv>
				<Link href="/Login" variant="body1">
					Already have an account? Login
				</Link>
			</CenteredDiv>
		</form>
	</CenteredDiv>
);

export default SignupForm;
