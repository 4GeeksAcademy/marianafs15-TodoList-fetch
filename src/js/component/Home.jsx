import React from "react";
import { TodosListFetch } from "./TodosListFetch";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Todo List!</h1>
			<TodosListFetch />
		</div>
	);
};

export default Home;
