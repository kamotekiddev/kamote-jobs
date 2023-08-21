import {
    WorkplaceType,
    JobTitle,
    EmploymentType,
    User,
    JobPost,
    JobApplication,
} from '@prisma/client';

export type FullJobPosts = JobPost & {
    user: Omit<User, 'hashedPassword'>;
    employmentType: EmploymentType;
    jobTitle: JobTitle;
    workplaceType: WorkplaceType;
    applications: JobApplication[];
};
