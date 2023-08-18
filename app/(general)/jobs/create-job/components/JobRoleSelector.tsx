import axios, { AxiosError } from 'axios';
import { FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useQuery } from 'react-query';
import { JobRole } from '@prisma/client';

const JobRoleSelector = () => {
    const { data: jobRoles } = useQuery<
        { data: JobRole[] },
        AxiosError<{ message: string }>
    >({
        queryKey: ['job-roles'],
        queryFn: () => axios.get('/api/job-roles'),
    });

    console.log(jobRoles);

    return (
        <FormItem>
            <FormLabel>Job Roles</FormLabel>
            <Input />
        </FormItem>
    );
};

export default JobRoleSelector;
