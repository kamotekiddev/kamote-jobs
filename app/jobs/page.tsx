import JobList from './components/JobList';

const Jobs = () => {
    return (
        <section className='grid grid-cols-[1fr_300px] overflow-auto scrollbar-hide'>
            <JobList />
        </section>
    );
};

export default Jobs;
