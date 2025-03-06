'use client';

import { useFormik } from 'formik';
import { SignInValues } from '../../types/auth';
import LoaderWithErrorHandler from '../../components/LoaderWithErrorHandler';
import * as Yup from 'yup';
import { PagesURL } from '../../lib/pageURLs';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { Alert } from '@/types';

const SignIn: React.FC = () => {
    const [alert, setAlert] = useState<Alert | null>();
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const formik = useFormik<SignInValues>({
        initialValues: { email: '', password: '', },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            console.log({ values });

            setLoading(true)
            const res = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            setLoading(false)

            if (res?.error) {
                setAlert({
                    type: 'error',
                    message: res?.error
                });

            } else {
                router.push("/dashboard"); // Redirect after successful login
            }
        },
    });

    return (
        <div className="flex h-screen w-full">
            {/* Left Side - Login Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center  md:px-4">
                <div className="w-full max-w-md md:p-6">
                    <CardContent>
                        <h2 className="text-2xl font-bold mb-2">Login</h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Enter your email below to login to your account
                        </p>
                        <form onSubmit={formik.handleSubmit}>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="email" className='mb-2'>Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        {...formik.getFieldProps('email')}
                                        className={cn(formik.touched.email && formik.errors.email && 'border-red-500')}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="text-red-500 text-sm">{formik.errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="password" className='mb-2'>Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        {...formik.getFieldProps('password')}
                                        className={cn(formik.touched.password && formik.errors.password && 'border-red-500')}
                                    />
                                    {formik.touched.password && formik.errors.password && (
                                        <p className="text-red-500 text-sm">{formik.errors.password}</p>
                                    )}
                                </div>
                            </div>

                            <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={formik.isSubmitting}>
                                Login
                            </Button>
                        </form>
                        <p className="text-sm text-center mt-4">
                            Don't have an account?{' '}
                            <Link href={PagesURL.signup} className="text-blue-600 font-semibold">
                                Sign up
                            </Link>
                        </p>
                    </CardContent>
                </div>
            </div>

            {/* Right Side - Background Image */}
            <div className="hidden md:block md:w-1/2 relative">
                <Image src={'/bg.jpg'} alt="Background" fill className="object-cover" />
            </div>
            <LoaderWithErrorHandler loading={loading} alert={alert} />
        </div>
    );
};

export default SignIn;
