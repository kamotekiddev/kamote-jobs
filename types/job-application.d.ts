import { JobApplication, User } from '@prisma/client';

export type FullJobApplication = JobApplication & {
    user: User;
};
