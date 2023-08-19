'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import JobRoleSelector from './JobRoleSelector';
import createJobPost from '@/actions/createJobPost';

const JobPostSchema = z.object({
    image: z.string(),
    caption: z.string().nonempty(),
    roles: z.array(z.string()).min(1),
});

const defaultValues: z.infer<typeof JobPostSchema> = {
    image: '',
    caption: '',
    roles: [],
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
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <h1 className='text-2xl font-black'>Create Job Recruitment</h1>
                <FormField
                    control={form.control}
                    name='roles'
                    render={({ field, fieldState }) => (
                        <JobRoleSelector
                            selectedRoles={field.value}
                            onSelectRoles={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name='caption'
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Caption</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage color='red'>
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
