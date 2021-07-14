import React from "react";
import { auth } from "../firebase/firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
	return React.useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = React.useState();
	const [loading, setLoading] = React.useState(true);

	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password);
	};

	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	const logout = () => {
		return auth.signOut();
	};

	const resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email);
	};

	const updatePassword = (password) => {
		return currentUser.updatePassword(password);
	};

	React.useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
		resetPassword,
		updatePassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
