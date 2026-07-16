import styles from './AuthLayout.module.css';
import { Outlet } from 'react-router';

export default function AuthLayout() {
	return (<> <Outlet/> </>);
}