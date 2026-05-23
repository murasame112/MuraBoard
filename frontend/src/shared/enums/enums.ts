export const ApplicationStatus = {
  APPLIED: 'applied',
  IN_PROGRESS: 'in progress',
  INTERVIEW: 'interview',
  OFFER: 'offer',
  REJECTED: 'rejected',
} as const;


export type ApplicationStatus =
  typeof ApplicationStatus[keyof typeof ApplicationStatus];


export const Currency = {
	PLN: 'PLN',
	EUR: 'EUR',
	USD: 'USD'
} as const;

export type Currency = 
	typeof Currency[keyof typeof Currency];