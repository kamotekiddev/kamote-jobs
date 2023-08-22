import React from 'react';
import RecruitmentLists from '../components/RecruitmentLists';

const SavedJobs = () => {
    return (
        <section className='space-y-4 overflow-auto scrollbar-hide'>
            <header className='sticky top-0 rounded-lg border bg-white p-4 shadow-sm'>
                <h1 className='text-2xl font-black'>Saved Jobs</h1>
                <p>All of the Job recruitments that you previously saved.</p>
            </header>
            <RecruitmentLists />
        </section>
    );
};

export default SavedJobs;
