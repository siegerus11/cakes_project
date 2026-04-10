import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';

type Props = {};

const MainLayout = (props: Props) => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default MainLayout;
