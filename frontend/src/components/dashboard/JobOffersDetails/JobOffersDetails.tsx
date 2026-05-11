import styles from './JobOffersDetails.module.css';
import type { JobOffer } from '../../../shared/models/models';

type JobOffersDetailsProps = {
	jobOffers: JobOffer[];
}

export default function JobOffersDetails({jobOffers}: JobOffersDetailsProps){
	return(
		<div style={{display:'flex', flexDirection:'column'}}>
			{jobOffers.map((element) => (
				<div key={element.id}>{`${element.title} - ${element.createdAt} - ${element.id}`}</div>
			))}
		</div>
	);

}