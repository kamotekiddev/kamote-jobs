import { FullJobPost } from '@/types/jobPost';

type Props = {
    jobPost?: FullJobPost;
};

const AboutJob = ({ jobPost }: Props) => {
    return (
        <article className='space-y-6 rounded-lg border bg-white p-4 shadow-sm'>
            <div>
                <h1 className='mb-4 text-xl font-bold'>About the Job</h1>
                <p>{jobPost?.aboutJob}</p>
            </div>
            <div>
                <h2 className='text-lg font-bold'>Responsibilities</h2>
                <ul className='list-disc p-4'>
                    {jobPost?.responsibilities.map((responsibility, i) => (
                        <li key={i}>{responsibility}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className='text-lg font-bold'>
                    Required Skills/Experience
                </h2>
                <ul className='list-disc p-4'>
                    {jobPost?.skillsOrExperiences.map(
                        (skillOrExperience, i) => (
                            <li key={i}>{skillOrExperience}</li>
                        )
                    )}
                </ul>
            </div>
            <div>
                <h2 className='text-lg font-bold'>Education</h2>
                <ul className='list-disc p-4'>
                    {jobPost?.educations.map((education, i) => (
                        <li key={i}>{education}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
};

export default AboutJob;
