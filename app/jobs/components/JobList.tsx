import getJobRecruitments from '@/actions/getJobRecruitments';
import RecruitmentLists from '@/components/RecruitmentLists';

const JobList = async () => {
    const { jobRecruitments } = await getJobRecruitments();

    return (
        <>
            <RecruitmentLists jobPosts={jobRecruitments} />
        </>
    );
};

export default JobList;
