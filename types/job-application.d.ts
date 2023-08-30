import { JobApplication, JobPost, User } from '@prisma/client';
import { FullJobPost } from './jobPost';

export type FullJobApplication = JobApplication & {
    user: User;
    jobPost: FullJobPost;
};
