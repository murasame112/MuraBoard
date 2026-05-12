export const ApplicationStatus = {
  APPLIED: 'applied',
  IN_PROGRESS: 'in progress',
  INTERVIEW: 'interview',
  OFFER: 'offer',
  REJECTED: 'rejected',
} as const;


export type ApplicationStatus =
  typeof ApplicationStatus[keyof typeof ApplicationStatus];