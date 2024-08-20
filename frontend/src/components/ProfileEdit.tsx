import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Select, { SingleValue } from 'react-select';
import { Positions } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, Login_ } from '../../State/authSlice';
import { useState } from 'react';
import { EditUser, User } from '../../utils/Types';
import { useEditProfileMutation } from '../../Api/MemberApi';
import toast from 'react-hot-toast';

interface Prop {
    onClose: () => void,
    Target?: User
}

export default function EditProfile(prop: Prop) {
    const { onClose, Target } = prop;

    const User = useSelector(getCurrentUser);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const Dispatch = useDispatch();
    const [EditProfile] = useEditProfileMutation();

    const validationSchema = yup.object().shape({
        FirstName: yup.string().required('First Name is required'),
        LastName: yup.string().required('Last Name is required'),
        Email: yup.string().email('Invalid Email').matches(/^[\w-]+(\.[\w-]+)*@aui\.ma$/, 'Not an AUI email').required('Email is required'),
        Password: yup.string().required('Password is required'),
        ConfirmPassword: yup.string()
            .oneOf([yup.ref('Password')], 'Passwords must match')
            .required('Confirm Password is required'),
        Position: yup.string().required('Position is required')
    });

    const initialValues: EditUser = {
        MemberId: User?.MemberId,
        FirstName: User?.FirstName || '',
        LastName: User?.LastName || '',
        Email: User?.Email || '',
        Password: User?.Password || '-',
        ConfirmPassword: User?.Password || '-',
        Position: User?.Position || ''
    };

    const handleSubmit = async (values: EditUser) => {
        console.log(values);
        try {
            const { data } = await EditProfile(values);
            Dispatch(Login_(data));
            onClose();
            toast.success('Profile Updated Successfully');
        } catch (error) {
            toast.error('Server Error');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 overflow-y-scroll">
            <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                    <h3 className="text-xl font-semibold text-gray-900">Edit Your Profile</h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                        onClick={onClose}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, values }) => (
                            <Form>
                                <div className="mb-4">
                                    <label htmlFor="FirstName" className="block text-gray-700">First Name</label>
                                    <Field
                                        name="FirstName"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage name="FirstName" component="div" className="text-red-600" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="LastName" className="block text-gray-700">Last Name</label>
                                    <Field
                                        name="LastName"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage name="LastName" component="div" className="text-red-600" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Email" className="block text-gray-700">Email</label>
                                    <Field
                                        name="Email"
                                        type="email"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage name="Email" component="div" className="text-red-600" />
                                </div>
                                {!Target && (
                                    <div>
                                        <div className="mb-4 relative">
                                            <label htmlFor="Password" className="block text-gray-700">Password</label>
                                            <Field
                                                name="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7z"
                                                    />
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 9a3 3 0 00-3 3h6a3 3 0 00-3-3z"
                                                    />
                                                </svg>
                                            </button>
                                            <ErrorMessage name="Password" component="div" className="text-red-600" />
                                        </div>
                                        <div className="mb-4 relative">
                                            <label htmlFor="ConfirmPassword" className="block text-gray-700">Confirm Password</label>
                                            <Field
                                                name="ConfirmPassword"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 9a3 3 0 00-3 3h6a3 3 0 00-3-3z"
                                                    />
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7z"
                                                    />
                                                </svg>
                                            </button>
                                            <ErrorMessage name="ConfirmPassword" component="div" className="text-red-600" />
                                        </div>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-200 mb-2">Type of Event</label>
                                    <Select
                                        options={Positions}
                                        onChange={(selectedOption: SingleValue<{ value: string; label: string }>) => {
                                            setFieldValue('Position', selectedOption?.value || '');
                                        }}
                                        value={Positions.find(option => option.value === values.Position)}
                                        className="w-full"
                                    />
                                    <ErrorMessage name="Position" component="div" className="text-red-600" />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-clearBlue text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
