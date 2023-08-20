import React from 'react';
import CreateJobForm from './components/CreateJobForm';
import OpenRecruitmentWidgets from './components/OpenRecruitmentWidgets';

const CreateJob = () => {
    return (
        <section className='mx-auto grid max-w-7xl grid-cols-[1fr_auto] p-4'>
            <CreateJobForm />
            <OpenRecruitmentWidgets />
        </section>
    );
};

export default CreateJob;
