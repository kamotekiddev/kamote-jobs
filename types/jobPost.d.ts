import {
    WorkplaceType,
    JobTitle,
    EmploymentType,
    User,
    JobPost,
    JobApplication,
} from '@prisma/client';

import { FullJobApplication } from './job-application';

export type FullJobPost = JobPost & {
    user: User;
    savedByUsers: User[];
    jobApplications: FullJobApplication[];
};
export type JobPostListItem = JobPost & { user: User };
