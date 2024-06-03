import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom';
import ProductList from "./pages/ProductList/index.jsx";
import Registration from "./pages/Registration/index.jsx";
import ConfirmationPage from "./pages/Confirmation/index.jsx";
import ShippingInfo from "./pages/ShippingInfo/index.jsx";

const test = [
	{
		"id": "2",
		"title": "Куртка",
		"price": 12000,
		"description": "Зеленого цвета, теплая",
		"image": "https://i.pinimg.com/originals/6f/5f/53/6f5f5332cd54ba419022a4882935dbd5.png",
		"count": 1
	},
	{
		"id": "1",
		"title": "Джинсы",
		"price": 5000,
		"description": "Синего цвета, прямые,Синего цвета, прямые,Синего цвета, прямые,Синего цвета, прямые,Синего цвета, прямые",
		"image": "https://i.pinimg.com/originals/6f/5f/53/6f5f5332cd54ba419022a4882935dbd5.png",
		"count": 1
	}
];

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
				<Route path={'confirmation'} element={<ConfirmationPage/>}/>
				<Route path={'registration'} element={<ShippingInfo/>}/>
			</Routes>
		</div>
	);
}

export default App;