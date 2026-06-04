import styles from './ApplicationsTable.module.css';

type ApplicationsTableProps = {
	callForm: (type: string) => void;
	callMassActionPopup: (selected: Set<number>) => void;
}


export default function ApplicationsTable({callForm, callMassActionPopup}: ApplicationsTableProps) {
	return (
		<>applications table</>
	);
}