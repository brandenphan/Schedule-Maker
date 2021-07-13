import {
	Button,
	TextField,
	Link,
	FormControlLabel,
	Checkbox,
} from "@material-ui/core";
import { CenteredDiv } from "../StyledComponents";

const LoginForm = ({
	loading,
	emailRef,
	passwordRef,
	check,
	handleCheckboxChange,
	handleSubmit,
}) => (
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

			<FormControlLabel
				style={{ marginTop: "-2%" }}
				value="start"
				control={
					<Checkbox
						checked={check}
						onChange={handleCheckboxChange}
						color="primary"
					/>
				}
				label={
					<p style={{ fontFamily: "Source Sans Pro", fontSize: "17px" }}>
						Remember Me
					</p>
				}
				labelPlacement="end"
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
					}}
				>
					Login
				</Button>
			</CenteredDiv>

			<br />
			<CenteredDiv>
				<Link href="/ForgotPassword" variant="body1">
					Forgot Password?
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

export default LoginForm;
