import { JobRole, User, JobPost } from '@prisma/client';

export type FullJobPosts = JobPost & { roles: JobRole[]; user: User };
