import getWorkplaceTypes from '@/actions/getWorkplaceTypes';
import CreateJobForm from './components/CreateJobForm';
import getEmploymentTypes from '@/actions/getEmploymentTypes';

const CreateJob = async () => {
    const { workplaceTypes } = await getWorkplaceTypes();
    const { employmentTypes } = await getEmploymentTypes();

    return (
        <section className='grid grid-cols-[1fr_300px] overflow-hidden'>
            <CreateJobForm
                workplaceTypes={workplaceTypes}
                employmentTypes={employmentTypes}
            />
        </section>
    );
};

export default CreateJob;
