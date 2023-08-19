import React from 'react';
import CreateJobForm from './components/CreateJobForm';
import OpenRecruitmentWidgets from './components/OpenRecruitmentWidgets';

const CreateJob = () => {
    return (
        <section className='grid grid-cols-[1fr_auto] p-4'>
            <CreateJobForm />
            <OpenRecruitmentWidgets />
        </section>
    );
};

export default CreateJob;
