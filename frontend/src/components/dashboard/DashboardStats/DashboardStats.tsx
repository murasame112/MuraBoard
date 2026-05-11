import styles from './DashboardStats.module.css';
import type { CardsData } from '../DashboardContent/DashboardContent';
import { useTranslation } from '../../../shared/i18n/useTranslation';

type DashboardStatsProps = {
	className: string;
	cardsData: CardsData[];
	summaryCount: string;
}

export default function DashboardStats({className, cardsData, summaryCount}: DashboardStatsProps) {
	const { t } = useTranslation();

	return(
		<div className={className}>
			<div className={styles.cardBox}>
				{cardsData.map((element: CardsData) => {
					const Icon = element.icon;
					return (
						<div key={element.label} className={styles.card} style={{borderBottom: `6px solid var(${element.color})`}}>
							<div className={styles.cardText}>
								<Icon style={{color: `var(${element.color})`}} className={styles.icon}/><p>{element.label}</p>
							</div>
							<p className={styles.count}>{element.count}</p>
						</div>
					)
				})}
			</div>
			<div className={styles.summary}>
				<p>{summaryCount}</p>
			</div>
		</div>

			
	);
}