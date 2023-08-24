'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';

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
import { useRouter } from 'next/navigation';

const defaultValues: z.infer<typeof JobPostSchema> = {
    jobTitle: '',
    employmentTypeId: '',
    workplaceTypeId: '',
    companyName: '',
    location: '',
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
            router.push('/jobs/recruitments');
        } catch (error) {
            if (isAxiosError<{ message: string }>(error))
                toast({ title: 'Error', description: error.message });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 rounded-lg border bg-white p-8 shadow-sm'
            >
                <h1 className='text-2xl font-black'>Create Job Recruitment</h1>
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
                <FormField
                    control={form.control}
                    name='employmentTypeId'
                    render={({ field, fieldState }) => (
                        <FormSelect
                            label='Employment Type'
                            error={fieldState.error?.message}
                            value={field.value}
                            onChange={field.onChange}
                            data={employmentTypes.map(({ name, id }) => ({
                                label: name,
                                value: id,
                            }))}
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name='workplaceTypeId'
                    render={({ field, fieldState }) => (
                        <FormSelect
                            label='Workplace Type'
                            error={fieldState.error?.message}
                            value={field.value}
                            onChange={field.onChange}
                            data={workplaceTypes.map(({ name, id }) => ({
                                label: name,
                                value: id,
                            }))}
                        />
                    )}
                />
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
                <Button type='submit' disabled={isLoading}>
                    Create Notice
                </Button>
            </form>
        </Form>
    );
};

export default CreateJobForm;
