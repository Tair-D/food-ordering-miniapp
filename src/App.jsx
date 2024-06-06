import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom';
import ProductList from "./pages/ProductList/index.jsx";
import Registration from "./pages/Registration/index.jsx";
import ConfirmationPage from "./pages/Confirmation/index.jsx";
import ShippingInfo from "./pages/ShippingInfo/index.jsx";

function App() {
	const {tg} = useTelegram();

	useEffect(() => {
		tg.ready();
		tg.enableClosingConfirmation();
	}, [tg]);

	return (
		<div className="App">
			{/*<Header/>*/}
			<Routes>
				<Route index element={<ProductList/>}/>
				<Route path={'form'} element={<Registration/>}/>
				<Route path={'confirmation'} element={<ConfirmationPage/>}/>
				<Route path={'registration'} element={<ShippingInfo/>}/>
			</Routes>
		</div>
	);
}

export default App;