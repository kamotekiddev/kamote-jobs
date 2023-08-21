import getJobRecruitments from '@/actions/getJobRecruitments';
import RecruitmentLists from './components/RecruitmentLists';

const Jobs = async () => {
    const { jobRecruitments } = await getJobRecruitments();

    return (
        <section>
            <RecruitmentLists jobPosts={jobRecruitments} />
        </section>
    );
};

export default Jobs;
