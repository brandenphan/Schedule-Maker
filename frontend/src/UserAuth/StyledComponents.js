import styled from "styled-components";

export const BackgroundContainer = styled.div`
	// background: linear-gradient(to left, #e0e0eb, #99b3ff);
	background: linear-gradient(to left, #e0e0eb, #b3c6ff);
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0px;
	left: 0px;
	z-index: 1000;
	overflow-y: auto;
`;

export const FormContainer = styled.div`
	background: white;
	width: 20%;
	height: 40%;
	margin: auto;
	display: block;
	margin-top: 40px;
	border-radius: 10px;
	max-width: 400px;
	min-width: 400px;
`;

export const CenteredDiv = styled.div`
	display: flex;
	justify-content: center;
`;
