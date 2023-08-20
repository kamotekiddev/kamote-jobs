import getUserRecruitmentPosts from '@/actions/getUserRecruitmentPosts';
import RecruitmentLists from './components/RecruitmentLists';

const Recruitments = async () => {
    const { jobposts, error } = await getUserRecruitmentPosts();

    if (error) return <span>{error}</span>;
    if (!jobposts?.length) return <span>No data found.</span>;

    return (
        <section className='grid grid-cols-[1fr_300px]'>
            <RecruitmentLists jobPosts={jobposts} />
        </section>
    );
};

export default Recruitments;
