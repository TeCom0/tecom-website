
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from '../assets/Club_Logo.png'
import { LoginInfo } from '../../utils/Types';
import { useLoginMutation } from '../../Api/MemberApi';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { isFetchBaseQueryError } from '../../utils/helpers'
import { Login_ } from '../../State/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const SignInForm = () => {
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });
    const Dispatch = useDispatch()
    const [Login] = useLoginMutation()
    const Navigate = useNavigate()
    const [isPhoneScreen, setIsPhoneScreen] = useState(window.innerWidth <= 620)
    useEffect(() => {
        const handleResize = () => {
            setIsPhoneScreen(window.innerWidth <= 620)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    useEffect(() => {
        Navigate('/useComputer')
    }, [Navigate, isPhoneScreen])
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 font-roboto">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm"><img className="mx-auto h-32 w-auto hover:cursor-pointer hover:scale-110 hover:duration-300" onClick={() => Navigate('/')} src={logo} alt="TeCom Logo" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={async (values: LoginInfo) => {
                        try {
                            const { data } = await Login(values)
                            Dispatch(Login_({ user: data }))
                            Navigate('/manager/profile')
                        } catch (error) {
                            if (isFetchBaseQueryError(error)) {
                                const errorMessage = 'data' in error ? (error.data as { message?: string }).message : 'An unexpected error occurred';
                                toast.error(errorMessage || 'An unexpected error occurred');
                            } else {
                                toast.error('An unknown error occurred');
                            }
                        }
                    }}
                >
                    <Form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-4"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-4"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-clearBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default SignInForm;
