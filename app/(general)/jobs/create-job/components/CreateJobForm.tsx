'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import JobRoleSelector from './JobRoleSelector';

const JobPostSchema = z.object({
    image: z.string().nonempty(),
    caption: z.string().nonempty(),
    jobRoles: z.array(z.string()),
});

const defaultValues: z.infer<typeof JobPostSchema> = {
    image: '',
    caption: '',
    jobRoles: [],
};

const CreateJobForm = () => {
    const form = useForm<z.infer<typeof JobPostSchema>>({
        defaultValues,
        resolver: zodResolver(JobPostSchema),
    });

    const onSubmit = (values: z.infer<typeof JobPostSchema>) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <JobRoleSelector />
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
                <Button type='submit'>Create Notice</Button>
            </form>
        </Form>
    );
};

export default CreateJobForm;
