import {
    WorkplaceType,
    JobTitle,
    EmploymentType,
    User,
    JobPost,
} from '@prisma/client';

export type FullJobPosts = JobPost & {
    user: User;
    employmentType: EmploymentType;
    jobTitle: JobTitle;
    workplaceType: WorkplaceType;
};
