'use client';

import dynamic from 'next/dynamic';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useCancelJobApplication } from '@/hooks/useJobApplication';
import { isAxiosError } from 'axios';

type Props = {
    isOpen: boolean;
    jobpostId: string;
    applicationId: string;
    onClose: () => void;
};

const CancelJobApplicationModal = ({
    isOpen,
    jobpostId,
    applicationId,
    onClose,
}: Props) => {
    const { toast } = useToast();
    const cancelJobApplication = useCancelJobApplication();

    const handleClose = () => {
        if (cancelJobApplication.isLoading) return;
        onClose();
    };

    const handleCancelJobApplication = async () => {
        try {
            await cancelJobApplication.mutateAsync({
                jobId: jobpostId,
                applicationId,
            });
            toast({
                title: 'Success',
                description: 'Your job application has been canceled',
            });
            handleClose();
        } catch (error) {
            if (isAxiosError<{ message: string }>(error))
                toast({
                    title: 'Error',
                    description: error.response?.data.message,
                    variant: 'destructive',
                });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cancel Job Application</DialogTitle>
                    <DialogDescription>
                        Are you sure? you cannot revert this.
                    </DialogDescription>
                </DialogHeader>

                <div className='flex justify-end gap-2'>
                    <Button
                        variant='outline'
                        type='button'
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        onClick={handleCancelJobApplication}
                        disabled={cancelJobApplication.isLoading}
                    >
                        Cancel Application
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default dynamic(() => Promise.resolve(CancelJobApplicationModal), {
    ssr: false,
});
