import JobNavigationLink from './JobNavigationLink';

const JobsNavigation = () => {
    return (
        <section className='grid rounded-lg border bg-white p-4 shadow-sm'>
            <JobNavigationLink href='/jobs'>Find Jobs</JobNavigationLink>
            <JobNavigationLink href='/jobs/saved'>Saved Jobs</JobNavigationLink>
            <JobNavigationLink href='/jobs/recruitments'>
                My Recruitments
            </JobNavigationLink>
            <JobNavigationLink href='/jobs/my-job-applications'>
                My Applications
            </JobNavigationLink>
        </section>
    );
};

export default JobsNavigation;
