import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const loginSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

export default function Login({ setCurrentUser }) {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    return (
        <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
            <div className="max-w-md mx-auto">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl shadow-lg shadow-black/20 backdrop-blur-md p-6">
                    <h2 className="text-3xl font-bold text-center">Login</h2>
                    <p className="mt-2 text-sm text-slate-400 text-center">
                        Welcome back to your account
                    </p>

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={loginSchema}
                        onSubmit={(
                            values,
                            { setSubmitting, setFieldError },
                        ) => {
                            const users =
                                JSON.parse(localStorage.getItem('users')) || [];

                            const foundUser = users.find(
                                (user) =>
                                    user.email === values.email &&
                                    user.password === values.password,
                            );

                            if (!foundUser) {
                                setFieldError(
                                    'email',
                                    'Invalid email or password',
                                );
                                setFieldError(
                                    'password',
                                    'Invalid email or password',
                                );
                                setSubmitting(false);
                                return;
                            }

                            const loggedInUser = {
                                name: foundUser.name,
                                email: foundUser.email,
                            };

                            setCurrentUser(loggedInUser);
                            setSubmitting(false);
                            navigate(from, { replace: true });
                        }}>
                        {({ isSubmitting }) => (
                            <Form className="mt-6 flex flex-col gap-4">
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

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-2 py-3 text-sm font-semibold text-slate-900 bg-cyan-400 rounded-xl transition-all duration-200 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/30 active:scale-[0.98] disabled:opacity-50">
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </button>

                                <p className="text-sm text-slate-400 text-center">
                                    Don&apos;t have an account?{' '}
                                    <Link
                                        to="/signup"
                                        className="text-cyan-400 hover:text-cyan-300">
                                        Signup
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
