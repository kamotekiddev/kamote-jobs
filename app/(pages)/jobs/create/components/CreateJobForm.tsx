'use client';

import * as z from 'zod';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

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
    content: `<h2 style="text-align: justify;">About</h2>
    <p style="text-align: justify;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, adipisci. Cupiditate perferendis placeat dignissimos. Laboriosam, laborum? Ipsum veniam numquam doloremque?</p>
    <h2 style="text-align: justify;">Responsibilities</h2>
    <ul style="text-align: justify;">
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, ad?</li>
    <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae fuga quasi omnis perspiciatis? Nesciunt&nbsp;inventore ullam nihil natus, eaque cum!</li>
    </ul>
    <h2 style="text-align: justify;">Skills and Experiences</h2>
    <ul style="text-align: justify;">
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, ad?</li>
    <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae fuga quasi omnis perspiciatis? Nesciunt&nbsp;inventore ullam nihil natus, eaque cum!</li>
    </ul>
    <h2 style="text-align: justify;">Educations</h2>
    <ul style="text-align: justify;">
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, ad?</li>
    <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae fuga quasi omnis perspiciatis? Nesciunt&nbsp;inventore ullam nihil natus, eaque cum!</li>
    </ul>
    CreateJobForm.tsx:183 <h2 style="text-align: justify;">About</h2>
    <p style="text-align: justify;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, adipisci. Cupiditate perferendis placeat dignissimos. Laboriosam, laborum? Ipsum veniam numquam doloremque?</p>
    <h2 style="text-align: justify;">Responsibilities</h2>
    <ul style="text-align: justify;">
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, ad?</li>
    <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae fuga quasi omnis perspiciatis? Nesciunt&nbsp;inventore ullam nihil natus, eaque cum!</li>
    </ul>
    <h2 style="text-align: justify;">Skills and Experiences</h2>
    <ul style="text-align: justify;">
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, ad?</li>
    <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae fuga quasi omnis perspiciatis? Nesciunt&nbsp;inventore ullam nihil natus, eaque cum!</li>
    </ul>
    <h2 style="text-align: justify;">Educations</h2>
    <ul style="text-align: justify;">
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, ad?</li>
    <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae fuga quasi omnis perspiciatis? Nesciunt&nbsp;inventore ullam nihil natus, eaque cum!&nbsp;</li>
    </ul>`,
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

    const onSubmit = async (values: z.infer<typeof JobPostSchema>) => {
        try {
            await createJobPost(values);
            toast({ title: 'Success', description: 'New JobPost added.' });
            router.push('/jobs/owned');
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
                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                        <Editor
                            apiKey='w83ajm9q3jsn1guwje8vew92a0mb0sluo1id94k563aot3hs'
                            init={{
                                height: 700,
                                plugins:
                                    'mentions anchor autolink charmap image link lists media searchreplace wordcount checklist mediaembed casechange formatpainter pageembed  editimage powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                                toolbar:
                                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media | align lineheight | checklist numlist bullist indent outdent | charmap | removeformat',
                            }}
                            onEditorChange={field.onChange}
                            value={field.value}
                        />
                    )}
                />

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
