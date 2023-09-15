'use client';

import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useSelectRole } from '@/hooks/useRole';

const SelectRole = () => {
    const { toast } = useToast();
    const router = useRouter();

    const selectRole = useSelectRole();

    const handleSelectRole = async (role: string) => {
        try {
            await selectRole.mutateAsync(role);
            router.refresh();
        } catch (error) {
            if (isAxiosError<{ message: string }>(error))
                toast({
                    title: 'Error',
                    description:
                        error.response?.data.message ||
                        'Please try again later.',
                    variant: 'destructive',
                });
        }
    };

    return (
        <section className='p-4'>
            <Card>
                <CardHeader>
                    <CardTitle className='font-bold'>
                        Select your Role
                    </CardTitle>
                    <CardDescription>
                        Please select your purpose on using this website
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs
                        orientation='vertical'
                        onValueChange={handleSelectRole}
                    >
                        <TabsList className='grid w-full grid-cols-2'>
                            <TabsTrigger value='recruiter'>
                                I am a recruiter looking for talents
                            </TabsTrigger>
                            <TabsTrigger value='jobseeker'>
                                I am Jobseeker looking for opportunities
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardContent>
            </Card>
        </section>
    );
};

export default SelectRole;
