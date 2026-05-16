import { Outlet } from 'react-router-dom';

import Footer from '../footer/footer';
import Header from '../header/header';

const MainLayout = () => {
	return (
		<>
			<Header />
			<div id="main-content">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default MainLayout;
