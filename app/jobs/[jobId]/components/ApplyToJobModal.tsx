'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import JobApplicationSchema, {
    JobApplicationSchemaType,
} from '@/schema/JobApplicationSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const defaultValues: JobApplicationSchemaType = {
    caption: '',
    resumeLink: '',
    email: '',
    contactNo: '',
};

const ApplyToJobModal = () => {
    const form = useForm<JobApplicationSchemaType>({
        defaultValues,
        resolver: zodResolver(JobApplicationSchema),
    });

    const onSubmit = (values: JobApplicationSchemaType) => {
        console.log(values);
    };

    return (
        <Dialog open>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apply to Job</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'
                    >
                        <FormField
                            control={form.control}
                            name='caption'
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Introduction</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {fieldState.error?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='contactNo'
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Contact No.</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {fieldState.error?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {fieldState.error?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='resumeLink'
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Link of your Resume</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {fieldState.error?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <div className='flex justify-end gap-2'>
                            <Button variant='outline'>Close</Button>
                            <Button type='submit'>Apply</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default dynamic(() => Promise.resolve(ApplyToJobModal), { ssr: false });
