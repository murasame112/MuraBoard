export const ApplicationStatus = {
  APPLIED: 'APPLIED',
  IN_PROGRESS: 'IN_PROGRESS',
  INTERVIEW: 'INTERVIEW',
  OFFER: 'OFFER',
  REJECTED: 'REJECTED'
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