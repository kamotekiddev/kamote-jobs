'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
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
import { useCreateJobApplication } from '@/hooks/useJobApplication';
import { useToast } from '@/components/ui/use-toast';

const defaultValues: JobApplicationSchemaType = {
    caption: '',
    resumeLink: '',
    email: '',
    contactNo: '',
};

type Props = {
    isOpen: boolean;
    jobpostId: string;
    onClose: () => void;
};
const ApplyToJobModal = ({ isOpen, jobpostId, onClose }: Props) => {
    const { toast } = useToast();
    const applyToJob = useCreateJobApplication();
    const form = useForm<JobApplicationSchemaType>({
        defaultValues,
        resolver: zodResolver(JobApplicationSchema),
    });

    const handleClose = () => {
        if (applyToJob.isLoading) return;
        form.reset(defaultValues);
        onClose();
    };
    const onSubmit = async (values: JobApplicationSchemaType) => {
        try {
            await applyToJob.mutateAsync({
                id: jobpostId,
                data: values,
            });
            toast({
                title: 'Success',
                description: 'Successfully applied on the Job.',
            });
            handleClose();
        } catch (error) {
            if (isAxiosError<{ message: string }>(error))
                toast({
                    title: 'Success',
                    description:
                        error.response?.data.message || 'Something went wrong.',
                });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
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
                            <Button
                                variant='outline'
                                type='button'
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                            <Button
                                type='submit'
                                disabled={applyToJob.isLoading}
                            >
                                Apply
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default dynamic(() => Promise.resolve(ApplyToJobModal), { ssr: false });
