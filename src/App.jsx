import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom';
import ProductList, {products} from "./pages/ProductList/index.jsx";
import Registration from "./pages/Registration/index.jsx";
import ConfirmationPage from "./pages/Confirmation/index.jsx";

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
				<Route path={'confirmation'} element={<ConfirmationPage order={products}/>}/>
			</Routes>
		</div>
	);
}

export default App;