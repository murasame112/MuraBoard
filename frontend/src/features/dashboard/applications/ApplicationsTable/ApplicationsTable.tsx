import type { DashboardFormType } from '../../DashboardFormWrapper/DashboardFormWrapper';
import styles from './ApplicationsTable.module.css';

type ApplicationsTableProps = {
	callForm: (type: DashboardFormType, selectedId?: number) => void;
	callMassActionPopup: (selected: Set<number>) => void;
}


export default function ApplicationsTable({callForm, callMassActionPopup}: ApplicationsTableProps) {
	return (
		<>applications table</>
	);
}