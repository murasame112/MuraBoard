import type { DashboardMode } from '../../../layouts/main-layout/AppNavigation/AppNavigation';
import styles from './DashboardFormWrapper.module.css';

export type DashboardFormType = 'add' | 'edit';
//type={formConfiguration.type} mode={mode} onFormClose={onFormClose}

type DashboardFormWrapperProps = {
	mode: DashboardMode;
	type: DashboardFormType;
	selected?: Set<number>;
	onFormClose: () => void;
}


export default function DashboardFormWrapper({mode, type, onFormClose, selected = new Set<number>()}: DashboardFormWrapperProps){

	return (
		<>dashboard form wrapper: {type} <button onClick={onFormClose}>close</button></>
	);
}