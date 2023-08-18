import CreateJobWidget from './components/CreateJobWidget';
import JobList from './components/JobList';

const Jobs = () => {
    return (
        <section className='grid grid-cols-[1fr_auto] p-4'>
            <JobList />
            <CreateJobWidget />
        </section>
    );
};

export default Jobs;
