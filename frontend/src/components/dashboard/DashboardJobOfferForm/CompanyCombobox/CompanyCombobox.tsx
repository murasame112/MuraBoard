import styles from './CompanyCombobox.module.css'
import { useState } from 'react';

export default function CompanyCombobox() {

	return (
		<div>
			{/*input ktory wyswietla pod spodem pop up z firmami
			sam input robi za searchbar i na biezaco ogranicza liste*/}
			<input id='comboboxSelect' name='comboboxSelect' type='text'/>
		</div>
	);
}