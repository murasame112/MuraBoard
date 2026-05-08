import { ApplicationStatus } from "../generated/prisma/index.js";

export const companiesSeed = [
  {
    name: 'Company A',
    location: 'Warsaw',
    website: 'https://company-a.example',
  },
  {
    name: 'Company B',
    location: 'Krakow',
    website: 'https://company-b.example',
  },
  {
    name: 'Company C',
    location: 'Gdansk',
    website: 'https://company-c.example',
  },
  {
    name: 'Company D',
    location: 'Wroclaw',
    website: 'https://company-d.example',
  },
  {
    name: 'Company E',
    location: 'Poznan',
    website: 'https://company-e.example',
  },
];

export const jobOffersSeed = [
  {
    title: 'Junior Frontend Developer',
    salaryMin: 7000,
    salaryMax: 9000,
    createdAt: new Date('2026-05-01T09:00:00.000Z'),
    companyName: 'Company A',
    userId: 4,
  },
  {
    title: 'Junior Backend Developer',
    salaryMin: 8000,
    salaryMax: 10000,
    createdAt: new Date('2026-05-01T09:10:00.000Z'),
    companyName: 'Company A',
    userId: 4,
  },
  {
    title: 'QA Engineer',
    salaryMin: 6500,
    salaryMax: 8500,
    createdAt: new Date('2026-05-01T09:20:00.000Z'),
    companyName: 'Company B',
    userId: 4,
  },
  {
    title: 'Frontend Developer',
    salaryMin: 9000,
    salaryMax: 12000,
    createdAt: new Date('2026-05-01T09:30:00.000Z'),
    companyName: 'Company C',
    userId: 4,
  },
  {
    title: 'Backend Developer',
    salaryMin: 9500,
    salaryMax: 13000,
    createdAt: new Date('2026-05-01T09:40:00.000Z'),
    companyName: 'Company C',
    userId: 4,
  },
  {
    title: 'Fullstack Developer',
    salaryMin: 10000,
    salaryMax: 14000,
    createdAt: new Date('2026-05-01T09:50:00.000Z'),
    companyName: 'Company D',
    userId: 4,
  },
  {
    title: 'DevOps Engineer',
    salaryMin: 11000,
    salaryMax: 15000,
    createdAt: new Date('2026-05-01T10:00:00.000Z'),
    companyName: 'Company D',
    userId: 4,
  },
  {
    title: 'Software Engineer',
    salaryMin: 12000,
    salaryMax: 16000,
    createdAt: new Date('2026-05-01T10:10:00.000Z'),
    companyName: 'Company E',
    userId: 4,
  },
  {
    title: 'Mobile Developer',
    salaryMin: 9000,
    salaryMax: 12500,
    createdAt: new Date('2026-05-01T10:20:00.000Z'),
    companyName: 'Company E',
    userId: 4,
  },
  {
    title: 'Junior Fullstack Developer',
    salaryMin: 7500,
    salaryMax: 9500,
    createdAt: new Date('2026-05-01T10:30:00.000Z'),
    companyName: 'Company B',
    userId: 4,
  },
];

export const applicationsSeed = [
  {
    userId: 4,
    jobOfferTitle: 'Junior Frontend Developer',
    status: ApplicationStatus.APPLIED,
    nextStepDate: new Date('2026-05-10T12:00:00.000Z'),
    comment: 'Applied via company website.',
  },
  {
    userId: 4,
    jobOfferTitle: 'QA Engineer',
    status: ApplicationStatus.IN_PROGRESS,
    nextStepDate: new Date('2026-05-12T14:00:00.000Z'),
    comment: 'Waiting for technical test.',
  },
  {
    userId: 4,
    jobOfferTitle: 'Frontend Developer',
    status: ApplicationStatus.INTERVIEW,
    nextStepDate: new Date('2026-05-15T09:00:00.000Z'),
    comment: 'First interview scheduled.',
  },
  {
    userId: 4,
    jobOfferTitle: 'Backend Developer',
    status: ApplicationStatus.APPLIED,
    nextStepDate: null,
    comment: 'Sent CV and cover letter.',
  },
  {
    userId: 4,
    jobOfferTitle: 'DevOps Engineer',
    status: ApplicationStatus.REJECTED,
    nextStepDate: null,
    comment: 'Rejected after CV screening.',
  },
  {
    userId: 4,
    jobOfferTitle: 'Software Engineer',
    status: ApplicationStatus.OFFER,
    nextStepDate: new Date('2026-05-18T11:00:00.000Z'),
    comment: 'Got an offer, considering it.',
  },
  {
    userId: 4,
    jobOfferTitle: 'Junior Fullstack Developer',
    status: ApplicationStatus.APPLIED,
    nextStepDate: new Date('2026-05-11T08:30:00.000Z'),
    comment: 'Applied through LinkedIn.',
  },
];