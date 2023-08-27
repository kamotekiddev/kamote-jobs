import {
    WorkplaceType,
    JobTitle,
    EmploymentType,
    User,
    JobPost,
} from '@prisma/client';

import { FullJobApplication } from './job-application';

export type FullJobPost = JobPost & {
    user: User;
    employmentType: EmploymentType;
    jobTitle: JobTitle;
    workplaceType: WorkplaceType;
    applications: FullJobApplication[];
};
