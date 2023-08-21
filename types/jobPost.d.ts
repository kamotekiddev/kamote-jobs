import {
    WorkplaceType,
    JobTitle,
    EmploymentType,
    User,
    JobPost,
    JobApplication,
} from '@prisma/client';

export type FullJobPosts = JobPost & {
    user: User;
    employmentType: EmploymentType;
    jobTitle: JobTitle;
    workplaceType: WorkplaceType;
    applications: JobApplication[];
};
