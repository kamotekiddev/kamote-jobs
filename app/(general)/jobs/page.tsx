import getJobRecruitments from '@/actions/getJobRecruitments';
import RecruitmentLists from './components/RecruitmentLists';

const Jobs = async () => {
    const { jobRecruitments } = await getJobRecruitments();

    return (
        <section className='space-y-4 overflow-auto scrollbar-hide'>
            <header className='sticky top-0 rounded-lg border bg-white p-4 shadow-sm'>
                <h1 className='text-2xl font-black'>Jobs</h1>
                <p>list of Job Recruitments</p>
            </header>
            <RecruitmentLists jobPosts={jobRecruitments} />
        </section>
    );
};

export default Jobs;
