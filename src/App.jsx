import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom';
import ProductList from "./pages/ProductList/index.jsx";
import Registration from "./pages/Registration/index.jsx";

function App() {
	const {onToggleButton, tg} = useTelegram();

	useEffect(() => {
		tg.ready();
	}, []);

	return (
		<div className="App">
			{/*<Header/>*/}
			<Routes>
				<Route index element={<ProductList/>}/>
				<Route path={'form'} element={<Registration/>}/>
			</Routes>
		</div>
	);
}

export default App;