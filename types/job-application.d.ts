import { JobApplication, JobPost, User } from '@prisma/client';
import { FullJobPost, JobPostListItem } from './jobPost';

export type FullJobApplication = JobApplication & {
    user: User;
    jobPost: JobPost;
};
