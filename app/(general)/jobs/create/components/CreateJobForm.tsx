'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

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
import createJobPost from '@/actions/createJobPost';
import JobPostSchema from '@/schema/JobPostSchema';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import FormSelect from '@/components/FormSelect';

const defaultValues: z.infer<typeof JobPostSchema> = {
    jobTitle: '',
    heading: '',
    employmentTypeId: '',
    workplaceTypeId: '',
    companyName: '',
    location: '',
};

const CreateJobForm = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof JobPostSchema>>({
        defaultValues,
        resolver: zodResolver(JobPostSchema),
    });

    const onSubmit = async (values: z.infer<typeof JobPostSchema>) => {
        setIsSubmitting(true);
        const { error } = await createJobPost(values);
        setIsSubmitting(false);

        if (!error)
            return toast({
                title: 'Success',
                description: 'New JobPost added.',
            });
        return toast({
            title: 'Error',
            description: error,
            variant: 'destructive',
        });
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
                    name='heading'
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Heading</FormLabel>
                            <Input {...field} />
                            <FormMessage>
                                {fieldState.error?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
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
                            data={[]}
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
                            data={[]}
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
                <Button type='submit' disabled={isSubmitting}>
                    Create Notice
                </Button>
            </form>
        </Form>
    );
};

export default CreateJobForm;
