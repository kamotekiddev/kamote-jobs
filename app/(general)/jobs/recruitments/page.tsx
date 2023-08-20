import getUserRecruitmentPosts from '@/actions/getUserRecruitmentPosts';
import RecruitmentLists from './components/RecruitmentLists';

const Recruitments = async () => {
    const { jobposts, error } = await getUserRecruitmentPosts();

    if (error) return <span>{error}</span>;
    if (!jobposts?.length) return <span>No data found.</span>;

    return (
        <section>
            <RecruitmentLists jobPosts={jobposts} />
        </section>
    );
};

export default Recruitments;
