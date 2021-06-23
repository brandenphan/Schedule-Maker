import React from "react";

function App() {
	const [data, setData] = React.useState();

	React.useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return <p>{data}</p>;
}

export default App;
