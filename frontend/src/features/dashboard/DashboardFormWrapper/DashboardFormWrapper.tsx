import type { DashboardMode } from '../../../layouts/main-layout/AppNavigation/AppNavigation';
import styles from './DashboardFormWrapper.module.css';

export type DashboardFormType = 'add' | 'edit';
//type={formConfiguration.type} mode={mode} onFormClose={onFormClose}

type DashboardFormWrapperProps = {
	type: DashboardFormType;
	mode: DashboardMode;
	onFormClose: () => void;
}


export default function DashboardFormWrapper({type, mode, onFormClose}: DashboardFormWrapperProps){

	return (
		<>dashboard form wrapper: {type} <button onClick={onFormClose}>close</button></>
	);
}