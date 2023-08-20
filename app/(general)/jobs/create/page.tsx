import CreateJobForm from './components/CreateJobForm';

const CreateJob = () => {
    return (
        <section className='overflow-hidden'>
            <div className='scrollbar-hide h-full overflow-auto'>
                <CreateJobForm />
            </div>
        </section>
    );
};

export default CreateJob;
