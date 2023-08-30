'use client';

import { useFetchJobpostById } from '@/hooks/useJobPosts';
import { FullJobPost } from '@/types/jobPost';
import JobInfo from './JobInfo';
import AboutJob from './AboutJob';
import JobApplicationList from './JobApplicationList';

type Props = { initialJobPost: FullJobPost };

const JobPost = ({ initialJobPost }: Props) => {
    const { data: jobPost } = useFetchJobpostById({
        id: initialJobPost.id,
        data: initialJobPost,
    });

    return (
        <>
            <JobInfo jobPost={jobPost} />
            <JobApplicationList jobPost={jobPost} />
            <AboutJob />
        </>
    );
};

export default JobPost;
