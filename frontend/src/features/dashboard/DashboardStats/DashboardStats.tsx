import styles from './DashboardStats.module.css';
import type { DashboardMode } from '../../../layouts/main-layout/AppNavigation/AppNavigation';
import { useState, useEffect } from 'react';
import { CheckCircleIcon, ClockIcon, ArrowPathIcon, ChatBubbleLeftRightIcon, HandRaisedIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '../../../shared/i18n/useTranslation';

type DashboardStatsProps = {
	className: string;
	mode: DashboardMode;
}

type CardsData = {
	label: string;
	count: number;
	color: string;
	icon: React.ElementType;
};


type JobOfferStats = {
	applied: number;
	notApplied: number;
}

type ApplicationStats = {
	applied: number;
	inProgress: number;	
	interview: number;	
	offer: number;	
	rejected: number;	
}

type DashboardStatsState = 
	| {
			mode: 'JobOffer';
			stats: JobOfferStats;
	  }
	| {
			mode: 'Application';
			stats: ApplicationStats;
	  };

export default function DashboardStats({className, mode}: DashboardStatsProps) {
	const {t} = useTranslation();
	const [summaryCount, setSummaryCount] = useState<number>(0);
	const [statsState, setStatsState] = useState<DashboardStatsState | null>(null);
	
	function fetchStatsData() {
		
		if (mode === 'JobOffer') {
			//TODO: fetched data
			const mockedData: JobOfferStats = {
				applied: 15,
				notApplied: 27
			};
			setStatsState({mode: 'JobOffer', stats: mockedData});

		} else if (mode === 'Application') {
			//TODO: fetched data
			const mockedData: ApplicationStats = {
				applied: 16,
				inProgress: 2,	
				interview: 	3,
				offer: 4,
				rejected: 8 	
			};
			setStatsState({mode: 'Application', stats: mockedData});
		}
		setSummaryCount(39 /* TODO: fetched data */);
	}

	function buildCardsData(): CardsData[] {
		if (!statsState) return [];

		if (statsState.mode === 'JobOffer') {
			return [
					{
						label: t('applied'),
						count: statsState.stats.applied,
						color: '--alert-lightblue',
						icon: CheckCircleIcon
					},
					{
						label: t('notApplied'),
						count: statsState.stats.notApplied,
						color: '--alert-burgund',
						icon: ClockIcon
					}
				];
		} else if (statsState.mode === 'Application') {
			return [
					{
						label: t('applied'),
						count: statsState.stats.applied,
						color: '--alert-lightblue',
						icon: CheckCircleIcon
					},
					{
						label: t('inProgress'),
						count: statsState.stats.inProgress,
						color: '--alert-yellow',
						icon: ArrowPathIcon
					},
					{
						label: t('interview'),
						count: statsState.stats.interview,
						color: '--alert-purple',
						icon: ChatBubbleLeftRightIcon
					},
					{
						label: t('offer'),
						count: statsState.stats.offer,
						color: '--alert-green',
						icon: HandRaisedIcon
					},
					{
						label: t('rejected'),
						count: statsState.stats.rejected,
						color: '--alert-burgund',
						icon: XCircleIcon
					}
				];
		} else {
			return [];
		}
	}
	const cardsData = buildCardsData();
	
	useEffect(() => {
		fetchStatsData();
	}, [mode, t]);
	
	
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
				<p>{t('inTotal')}:{summaryCount}</p>
			</div>
		</div>
	);
}