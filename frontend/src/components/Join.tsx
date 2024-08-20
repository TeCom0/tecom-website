import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useJoinMemberMutation } from '../../Api/MemberApi';
import toast from 'react-hot-toast';
import { NewMember } from '../../utils/Types';
interface PropsType {
    onClose: () => void;
}

export default function Join(prop: PropsType) {
    const [joinMember] = useJoinMemberMutation();

    const Schema = yup.object().shape({
        FirstName: yup.string().optional(),
        LastName: yup.string().optional(),
        Email: yup.string().email('Invalid Email').matches(/^[\w-]+(\.[\w-]+)*@aui\.ma$/, 'Not an AUI email').required(),
        MemberId: yup.string().matches(/^\d+$/, 'Invalid ID').required('ID is required')
    });

    const Values: NewMember = {
        FirstName: '',
        LastName: '',
        Email: '',
        MemberId: '',
    };

    const handleSubmit = async (values: NewMember) => {
        console.log(values)
        try {
            const response = await joinMember(values).unwrap();
            const message = response.message || 'Success';
            prop.onClose();
            toast.success(message);
        } catch (error) {
            toast.error('Server Error')
        }
    };

    const { onClose } = prop;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700 max-h-full">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Join our Club
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => onClose()}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <Formik initialValues={Values} validationSchema={Schema} onSubmit={handleSubmit}>
                            <Form>
                                <div className="mb-4">
                                    <label htmlFor="FirstName" className="block text-gray-700 dark:text-gray-200">First Name</label>
                                    <Field name="FirstName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600" />
                                    <ErrorMessage name="FirstName" component="div" className="text-red-600" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="LastName" className="block text-gray-700 dark:text-gray-200">Last Name</label>
                                    <Field name="LastName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600" />
                                    <ErrorMessage name="LastName" component="div" className="text-red-600" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Email" className="block text-gray-700 dark:text-gray-200">Email</label>
                                    <Field name="Email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600" />
                                    <ErrorMessage name="Email" component="div" className="text-red-600" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="MemberId" className="block text-gray-700 dark:text-gray-200">Member ID</label>
                                    <Field name="MemberId" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600" />
                                    <ErrorMessage name="MemberId" component="div" className="text-red-600" />
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                        Join
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}
