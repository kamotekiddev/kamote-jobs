'use client';

import * as z from 'zod';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { Plus, X } from 'lucide-react';

import { EmploymentType, WorkplaceType } from '@prisma/client';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import JobTitleSelector from './JobTitleSelector';
import JobPostSchema from '@/schema/JobPostSchema';
import FormSelect from '@/components/FormSelect';
import { useCreateJobPost } from '@/hooks/useJobPosts';

const defaultValues: z.infer<typeof JobPostSchema> = {
    jobTitle: '',
    employmentType: '',
    workplaceType: '',
    companyName: '',
    location: '',
    aboutJob: '',
    responsibilities: [{ responsibility: '' }],
    educations: [{ education: '' }],
    skillsOrExperiences: [{ skillOrExperience: '' }],
};

type Props = {
    workplaceTypes?: WorkplaceType[];
    employmentTypes?: EmploymentType[];
};

const CreateJobForm = ({
    workplaceTypes = [],
    employmentTypes = [],
}: Props) => {
    const { toast } = useToast();
    const router = useRouter();
    const { mutateAsync: createJobPost, isLoading } = useCreateJobPost();

    const form = useForm<z.infer<typeof JobPostSchema>>({
        defaultValues,
        resolver: zodResolver(JobPostSchema),
    });

    const responsibilities = useFieldArray({
        name: 'responsibilities',
        control: form.control,
    });
    const skillsOrExperiences = useFieldArray({
        name: 'skillsOrExperiences',
        control: form.control,
    });
    const educations = useFieldArray({
        name: 'educations',
        control: form.control,
    });

    const onSubmit = async (values: z.infer<typeof JobPostSchema>) => {
        try {
            await createJobPost({
                ...values,
                responsibilities: values.responsibilities.map(
                    ({ responsibility }) => responsibility
                ),
                skillsOrExperiences: values.skillsOrExperiences.map(
                    ({ skillOrExperience }) => skillOrExperience
                ),
                educations: values.educations.map(({ education }) => education),
            });
            toast({ title: 'Success', description: 'New JobPost added.' });
            router.push('/jobs/recruitments');
        } catch (error) {
            if (isAxiosError<{ message: string }>(error))
                toast({ title: 'Error', description: error.message });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <div className='rounded-lg border bg-white p-4 px-6 shadow-sm'>
                    <h1 className='text-xl font-bold'>
                        Create Job Recruitment
                    </h1>
                </div>
                <div className='space-y-4 rounded-lg border bg-white p-6 shadow-sm'>
                    <FormField
                        control={form.control}
                        name='jobTitle'
                        render={({ field, fieldState }) => (
                            <JobTitleSelector
                                label='Job Title'
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='companyName'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <Input {...field} />
                                <FormMessage>
                                    {fieldState.error?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <div className='flex items-start gap-4'>
                        <FormField
                            control={form.control}
                            name='employmentType'
                            render={({ field, fieldState }) => (
                                <FormSelect
                                    label='Employment Type'
                                    error={fieldState.error?.message}
                                    value={field.value}
                                    onChange={field.onChange}
                                    data={employmentTypes.map(({ name }) => ({
                                        label: name,
                                        value: name,
                                    }))}
                                />
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='workplaceType'
                            render={({ field, fieldState }) => (
                                <FormSelect
                                    label='Workplace Type'
                                    error={fieldState.error?.message}
                                    value={field.value}
                                    onChange={field.onChange}
                                    data={workplaceTypes.map(({ name }) => ({
                                        label: name,
                                        value: name,
                                    }))}
                                />
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name='location'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <Input {...field} />
                                <FormMessage>
                                    {fieldState.error?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <div className='rounded-lg border bg-white p-4 shadow-sm'>
                    <FormField
                        control={form.control}
                        name='aboutJob'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>About the Job</FormLabel>
                                <Textarea {...field} />
                                <FormMessage>
                                    {fieldState.error?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <div className='rounded-lg border bg-white p-4 shadow-sm'>
                    <div className='mb-4 flex items-center justify-between gap-2'>
                        <h1 className='text-sm font-medium'>
                            Responsibilities
                        </h1>
                        <Button
                            size='icon'
                            type='button'
                            onClick={() =>
                                responsibilities.append({ responsibility: '' })
                            }
                            variant='outline'
                        >
                            <Plus />
                        </Button>
                    </div>
                    <div className='space-y-4'>
                        {responsibilities.fields.map((_, i) => (
                            <FormField
                                key={i}
                                control={form.control}
                                name={`responsibilities.${i}.responsibility`}
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <div className='flex gap-2'>
                                            <Input {...field} />
                                            <Button
                                                disabled={i === 0}
                                                size='icon'
                                                type='button'
                                                onClick={() =>
                                                    responsibilities.remove(i)
                                                }
                                                variant='outline'
                                            >
                                                <X />
                                            </Button>
                                        </div>
                                        <FormMessage>
                                            {fieldState.error?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                </div>
                <div className='rounded-lg border bg-white p-4 shadow-sm'>
                    <div className='mb-4 flex items-center justify-between gap-2'>
                        <h1 className='text-sm font-medium'>
                            Skills or Experience
                        </h1>
                        <Button
                            size='icon'
                            type='button'
                            onClick={() =>
                                skillsOrExperiences.append({
                                    skillOrExperience: '',
                                })
                            }
                            variant='outline'
                        >
                            <Plus />
                        </Button>
                    </div>
                    <div className='space-y-4'>
                        {skillsOrExperiences.fields.map((_, i) => (
                            <FormField
                                key={i}
                                control={form.control}
                                name={`skillsOrExperiences.${i}.skillOrExperience`}
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <div className='flex gap-2'>
                                            <Input {...field} />
                                            <Button
                                                disabled={i === 0}
                                                size='icon'
                                                type='button'
                                                onClick={() =>
                                                    responsibilities.remove(i)
                                                }
                                                variant='outline'
                                            >
                                                <X />
                                            </Button>
                                        </div>
                                        <FormMessage>
                                            {fieldState.error?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                </div>
                <div className='rounded-lg border bg-white p-4 shadow-sm'>
                    <div className='mb-4 flex items-center justify-between gap-2'>
                        <h1 className='text-sm font-medium'>Educations</h1>
                        <Button
                            size='icon'
                            type='button'
                            onClick={() =>
                                responsibilities.append({ responsibility: '' })
                            }
                            variant='outline'
                        >
                            <Plus />
                        </Button>
                    </div>
                    <div className='space-y-4'>
                        {educations.fields.map((_, i) => (
                            <FormField
                                key={i}
                                control={form.control}
                                name={`educations.${i}.education`}
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <div className='flex gap-2'>
                                            <Input {...field} />
                                            <Button
                                                disabled={i === 0}
                                                size='icon'
                                                type='button'
                                                onClick={() =>
                                                    responsibilities.remove(i)
                                                }
                                                variant='outline'
                                            >
                                                <X />
                                            </Button>
                                        </div>
                                        <FormMessage>
                                            {fieldState.error?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                </div>

                <div className='flex justify-between gap-4 rounded-lg border bg-white p-6 shadow-sm'>
                    <Button variant='outline' onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type='submit' disabled={isLoading}>
                        Create Job
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CreateJobForm;
