'use client';

import { useForm } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SignInForm = () => {
    const form = useForm();
    const onSubmit = () => {};

    return (
        <Form {...form}>
            <form
                className='w-full max-w-md space-y-4 rounded-md p-6 shadow-lg'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <h1 className='text-2xl font-black'>Login to your account</h1>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage>
                                {fieldState.error?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage>
                                {fieldState.error?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button className='w-full'>Login</Button>
                <hr />
                <Button variant='outline' className='w-full'>
                    Continue with Google
                </Button>
            </form>
        </Form>
    );
};

export default SignInForm;
