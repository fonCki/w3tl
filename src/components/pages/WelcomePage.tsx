import React, { useEffect, useState } from 'react';
import { Logo } from '@components/header/logo-header';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useAuth } from '@context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setLoading } from '@store/slices/authSlice';
import SignUpModal from '@components/SignUpModal';
import { Form, Input } from 'semantic-ui-react'; // Import the brand icons from react-icons


const WelcomePage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { login, logout } = useAuth();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home'); // Redirect to home page or desired route
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoginError(''); // Clear any existing errors
        dispatch(setLoading(true));
        console.log('username and pss', username, password);
        try {

            await login(username, password);
            // navigate('/home'); // Redirect after successful login
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError('Failed to log in. Please check your credentials.'); // Set the error message
            console.log(loginError);
        } finally {

            dispatch(setLoading(false));
        }
    };

    const handleSignUpClick = () => {
        setIsModalOpen(true);
    };

    const handleSignUpSuccess = async (username: string, password: string) => {
        setUsername(username);
        setPassword(password);
        dispatch(setLoading(true));
        try {
            await login(username, password); // Auto-login
            navigate('/home'); // Redirect after successful login
        } catch (error) {
            console.error('Automatic login failed:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };
    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-50 ">
            <div className="flex-1 flex flex-col justify-center items-start space-y-6 min-w-[300px] px-10 mx-20">
                {/* Logo and text */}
                <Logo size="xl" />
                <h2 className="text-xl font-extrabold text-gray-900">
                    Experience true freedom on the blockchain.
                </h2>
                <p className="text-gray-700">
                    Your voice, uncensored. Decentralized conversations in privacy.
                </p>
            </div>
            <div className="flex-1 flex justify-center items-center">
                {/* Form container */}
                <div className="max-w-md w-full space-y-6 bg-white shadow-md rounded px-10 pt-6 pb-8 m-12 mb-4 min-w-52">
                <Form  onSubmit={handleSubmit}>
                    <Form.Field>
                        <Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Email or Username'
                            value={username}
                            onChange={(e, { value }) => setUsername(value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e, { value }) => setPassword(value)}
                        />
                    </Form.Field>
                    <div>
                        <button
                            type="submit"
                            className="mt-6 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-custom-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-blue"
                            onClick={handleSubmit}
                        >
                            Log In
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="#forgot" className="font-medium text-custom-blue hover:text-blue">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            className="mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-github hover:bg-githubHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-github"
                            onClick={handleSubmit}
                        >
                            <FaGithub className="h-6 w-6 mr-2" />
                            Connect with GitHub
                        </button>
                        <button
                            className="mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-google hover:bg-googleHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google"
                            onClick={handleSubmit}
                        >
                            <FaGoogle className="h-6 w-6 mr-2" />
                            Connect with Google
                        </button>
                    </div>
                    <div className="mt-6">
                        <button
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            onClick={handleSignUpClick}
                        >
                            Create new account
                        </button>
                    </div>
                    <p className="mt-2 text-center text-sm text-gray-600 cursor-pointer">
                        Create a Page for a celebrity, brand or business.
                    </p>

                    {/* ... existing form elements ... */}
                    {loginError && (
                        <p className="text-red-500 text-center text-sm mt-2">{loginError}</p> // This will display the error message
                    )}

                    <SignUpModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSignUpSuccess={handleSignUpSuccess}
                    />
                </Form>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;



