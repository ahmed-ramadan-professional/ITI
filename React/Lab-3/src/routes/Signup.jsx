import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

const signupSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),
});

export default function Signup({ setCurrentUser }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
            <div className="max-w-md mx-auto">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl shadow-lg shadow-black/20 backdrop-blur-md p-6">
                    <h2 className="text-3xl font-bold text-center">Signup</h2>
                    <p className="mt-2 text-sm text-slate-400 text-center">
                        Create your new account
                    </p>

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={signupSchema}
                        onSubmit={(
                            values,
                            { setSubmitting, setFieldError },
                        ) => {
                            const users =
                                JSON.parse(localStorage.getItem('users')) || [];

                            const emailExists = users.some(
                                (user) => user.email === values.email,
                            );

                            if (emailExists) {
                                setFieldError(
                                    'email',
                                    'This email is already registered',
                                );
                                setSubmitting(false);
                                return;
                            }

                            const newUser = {
                                name: values.name,
                                email: values.email,
                                password: values.password,
                            };

                            localStorage.setItem(
                                'users',
                                JSON.stringify([...users, newUser]),
                            );

                            setCurrentUser({
                                name: newUser.name,
                                email: newUser.email,
                            });

                            setSubmitting(false);
                            navigate('/');
                        }}>
                        {({ isSubmitting }) => (
                            <Form className="mt-6 flex flex-col gap-4">
                                <div>
                                    <Field
                                        name="name"
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full px-4 py-3 text-white bg-white/[0.03] rounded-xl border border-white/10 outline-none focus:border-cyan-400"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="p"
                                        className="mt-1 text-sm text-red-400"
                                    />
                                </div>

                                <div>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        className="w-full px-4 py-3 text-white bg-white/[0.03] rounded-xl border border-white/10 outline-none focus:border-cyan-400"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="p"
                                        className="mt-1 text-sm text-red-400"
                                    />
                                </div>

                                <div>
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        className="w-full px-4 py-3 text-white bg-white/[0.03] rounded-xl border border-white/10 outline-none focus:border-cyan-400"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="p"
                                        className="mt-1 text-sm text-red-400"
                                    />
                                </div>

                                <div>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="w-full px-4 py-3 text-white bg-white/[0.03] rounded-xl border border-white/10 outline-none focus:border-cyan-400"
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="p"
                                        className="mt-1 text-sm text-red-400"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-2 py-3 text-sm font-semibold text-slate-900 bg-cyan-400 rounded-xl transition-all duration-200 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/30 active:scale-[0.98] disabled:opacity-50">
                                    {isSubmitting
                                        ? 'Creating account...'
                                        : 'Signup'}
                                </button>

                                <p className="text-sm text-slate-400 text-center">
                                    Already have an account?{' '}
                                    <Link
                                        to="/login"
                                        className="text-cyan-400 hover:text-cyan-300">
                                        Login
                                    </Link>
                                </p>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
