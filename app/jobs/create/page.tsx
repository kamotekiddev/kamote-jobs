import getWorkplaceTypes from '@/actions/getWorkplaceTypes';
import CreateJobForm from './components/CreateJobForm';
import getEmploymentTypes from '@/actions/getEmploymentTypes';

const CreateJob = async () => {
    const { workplaceTypes } = await getWorkplaceTypes();
    const { employmentTypes } = await getEmploymentTypes();

    return (
        <section className='overflow-hidden'>
            <div className='scrollbar-hide h-full overflow-auto'>
                <CreateJobForm
                    workplaceTypes={workplaceTypes}
                    employmentTypes={employmentTypes}
                />
            </div>
        </section>
    );
};

export default CreateJob;
