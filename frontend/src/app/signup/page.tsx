'use client';

import { useFormik } from 'formik';
import { SignUpValues } from '../../types/auth';
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
import { useRouter } from "next/navigation";
import { useState } from 'react';
import axiosInstance from '@/lib/axios';
import { Alert } from '@/types';
import axios from 'axios';

const Signup: React.FC = () => {
    const [alert, setAlert] = useState<Alert | null>();
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const formik = useFormik<SignUpValues>({
        initialValues: { name: '', email: '', password: '', },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            name: Yup.string().min(3).required(),
            password: Yup.string()
                .min(8)
                .matches(/[a-zA-Z]/, "Must include a letter")
                .matches(/[0-9]/, "Must include a number")
                .matches(/[!@#$%^&*]/, "Must include a special character")
                .required("Required"),
        }),
        onSubmit: async (values) => {

            try {

                setLoading(true)
                await axiosInstance.post('/users', values)
                setLoading(false)
                setAlert({
                    type: 'success',
                    message: 'Your account has been created successfully! Redirecting to login page...'
                });
                setTimeout(() => {
                    router.push(PagesURL.login);
                }, 1000);

            } catch (error) {
                setAlert({
                    type: 'error',
                    message: axios.isAxiosError(error) ?
                        error.response?.data?.message ||
                        'Ops something was wrong please try again later' :
                        'Ops something was wrong please try again later'
                });

            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="flex h-screen w-full">
            {/* Left Side - Login Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center  md:px-4">
                <div className="w-full max-w-md md:p-6">
                    <CardContent>
                        <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Create an account now and get the best offers.
                        </p>
                        <form onSubmit={formik.handleSubmit}>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name" className='mb-2'>Name</Label>
                                    <Input
                                        id="name"
                                        type="name"
                                        {...formik.getFieldProps('name')}
                                        className={cn(formik.touched.name && formik.errors.name && 'border-red-500')}
                                    />
                                    {formik.touched.name && formik.errors.name && (
                                        <p className="text-red-500 text-sm">{formik.errors.name}</p>
                                    )}
                                </div>

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
                                Sign Up
                            </Button>
                        </form>
                        <p className="text-sm text-center mt-4">
                            have an account?{' '}
                            <Link href={PagesURL.login} className="text-blue-600 font-semibold">
                                Login
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

export default Signup;
