import React, { useEffect, useState } from 'react';
import { Logo } from '@components/ui/icons/logo-header';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useAuth } from '@context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setLoading } from '@store/slices/authSlice';
import SignUpModal from '@components/ui/forms/SignUpModal';
import { Form, Input } from 'semantic-ui-react';
import { validateEmail, validatePassword } from '@utils/validationUtils';
import ForgotPasswordModal from '../../modals/ForgotPasswordModal';

/**
 * Represents the WelcomePage component.
 * @constructor
 * @returns JSX.Element
 */
const WelcomePage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const { login, loginWithProvider } = useAuth();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    const handleLoginOrSignUp = async (email:string, password:string) => {
        console.log('Login/Signup:', email, password);
        const emailError = validateEmail(email)
        const passwordError = validatePassword(password);
        if (emailError || passwordError) {
            setLoginError(emailError || passwordError);
            return;
        }
        setLoginError('');
        dispatch(setLoading(true));
        try {
            console.log('Logging in...');
            console.log('Logging in', email, password);
            await login(email, password);
            navigate('/home');
        } catch (error) {
            console.error('Login/Signup failed:', error);
            setLoginError('Failed to log in. Please check your credentials.');
        } finally {
            dispatch(setLoading(false));
        }
    };

    const loginWithSocial = async (provider: string) => {
        dispatch(setLoading(true));
        try {
            await loginWithProvider(provider);
            console.log('Logged in with', provider);
            navigate('/home');
        } catch (error) {
            console.error('Social login failed:', error);
            setLoginError('Failed to log in. Please check your credentials.');
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-50">
            <div className="flex-1 flex flex-col justify-center items-start space-y-6 min-w-[300px] px-10 mx-28 mt-6 text-justify pb-6">
                <Logo size="xl" />
                <h2 className="text-xl font-extrabold text-gray-900">
                    Experience true freedom on the blockchain.
                </h2>
                <p className="text-gray-700">
                    Your voice, uncensored. Decentralized conversations in privacy.
                </p>
            </div>
            <div className="flex-1 flex justify-center items-center">
                <div className="max-w-md w-full space-y-6 bg-white shadow-md rounded px-10 pt-6 pb-8 mx-12 mb-4 min-w-80">
                    <Form onSubmit={(e) => { e.preventDefault(); handleLoginOrSignUp(username, password); }}>
                        <Form.Field>
                            <Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="Email"
                                value={username}
                                onChange={(e, { value }) => setUsername(value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e, { value }) => setPassword(value)}
                            />
                        </Form.Field>
                        <div>
                            <button
                                type="submit"
                                className="mt-6 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-custom-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-blue"
                            >
                                Log In
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm"         onClick={() => setIsForgotPasswordModalOpen(true)}>
                                <a href="#forgot" className="font-medium text-custom-blue hover:text-blue">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-github hover:bg-githubHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-github"
                                onClick={(e) => {
                                    e.preventDefault();
                                    loginWithSocial('github');
                                }}
                            >
                                <FaGithub className="h-6 w-6 mr-2" />
                                Connect with GitHub
                            </button>
                            <button
                                type="button"
                                className="mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-google hover:bg-googleHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google"
                                onClick={(e) => {
                                    e.preventDefault();
                                    loginWithSocial('google');
                                }}
                            >
                                <FaGoogle className="h-6 w-6 mr-2" />
                                Connect with Google
                            </button>
                        </div>
                        <div className="mt-6">
                            <button
                                type="button"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Create new account
                            </button>
                        </div>
                        <p className="mt-2 text-center text-sm text-gray-600 cursor-pointer">
                            Create a Page for a celebrity, brand or business.
                        </p>
                        {loginError && (
                            <p className="text-red-500 text-center text-sm mt-2">{loginError}</p>
                        )}
                    </Form>
                </div>
            </div>
            <SignUpModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSignUpSuccess={handleLoginOrSignUp}
            />
            <ForgotPasswordModal
                email={username}
                isOpen={isForgotPasswordModalOpen}
                onClose={() => setIsForgotPasswordModalOpen(false)}
            />
        </div>
    );
}

export default WelcomePage;
