import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';

type Props = {};

const MainLayout = (props: Props) => {
	return (
		<>
			<div className="container">
				<Header />
				<main>
					<Outlet />
				</main>
			</div>
			<Footer />
		</>
	);
};

export default MainLayout;
