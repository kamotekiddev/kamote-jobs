'use client';

import * as z from 'zod';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
import { useToast } from '@/components/ui/use-toast';
import registerUser from '@/actions/registerUser';

const SignInFormSchema = z
    .object({
        email: z.string().email().nonempty(),
        name: z.string().nonempty(),
        password: z.string().nonempty(),
        confirmPassword: z.string().nonempty(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password)
            ctx.addIssue({
                code: 'custom',
                message: 'Password does not match',
                path: ['confirmPassword'],
            });
    });

const defaultValues: z.infer<typeof SignInFormSchema> = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof SignInFormSchema>>({
        defaultValues,
        resolver: zodResolver(SignInFormSchema),
    });

    const onSubmit = async (values: z.infer<typeof SignInFormSchema>) => {
        setIsCreating(true);
        const response = await registerUser(values);
        setIsCreating(false);
        if (response.error)
            return toast({
                title: 'Error',
                description: response.error,
                variant: 'destructive',
            });

        setIsLoggingIn(true);
        const res = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        });
        setIsLoggingIn(false);

        if (res?.error)
            return toast({
                title: 'Error',
                description: res.error,
                variant: 'destructive',
            });

        router.replace('/jobs');
    };

    return (
        <Form {...form}>
            <form
                className='w-full max-w-md space-y-4 rounded-md border p-6 shadow-lg'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <h1 className='text-2xl font-black'>Register Here</h1>
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
                    name='name'
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
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
                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
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
                <Button
                    disabled={isCreating || isLoggingIn}
                    className='w-full'
                    type='submit'
                >
                    {isCreating
                        ? 'Signin Up...'
                        : isLoggingIn
                        ? 'Logging in...'
                        : 'Sign Up'}
                </Button>
                <hr />
                <div className='flex items-center justify-center gap-2'>
                    <p className='text-sm'>Already have an account?</p>
                    <Link
                        href='/sign-in'
                        className='text-sm hover:text-slate-500 hover:underline'
                    >
                        Login here
                    </Link>
                </div>
            </form>
        </Form>
    );
};

export default SignUpForm;
