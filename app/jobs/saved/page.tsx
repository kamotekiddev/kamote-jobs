import React from 'react';
import RecruitmentLists from '@/components/RecruitmentLists';
import getSavedJobPosts from '@/actions/getSavedJobPosts';

const SavedJobs = async () => {
    const { savedPosts } = await getSavedJobPosts();

    return (
        <section className='grid grid-cols-[1fr_300px] overflow-auto scrollbar-hide'>
            <div className='space-y-4'>
                <header className='sticky top-0 z-50 rounded-lg border bg-white p-4 shadow-sm'>
                    <h1 className='text-2xl font-black'>Saved Jobs</h1>
                    <p>
                        All of the Job recruitments that you previously saved.
                    </p>
                </header>
                <RecruitmentLists jobPosts={savedPosts} />
            </div>
        </section>
    );
};

export default SavedJobs;
