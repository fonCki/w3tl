import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import SignUpModal from '@components/ui/forms/SignUpModal';
import { useAuth } from '@context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setLoading } from '@store/slices/authSlice';


/**
 * Represents a Login component.
 * @component
 */
const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { login, logout } = useAuth();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();


    useEffect(() => {
        if (isAuthenticated) {
            // navigate('/home'); // Redirect to home page or desired route
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setLoading(true));
        try {
            await login(username, password);
            navigate('/home'); // Redirect after successful login
        } catch (error) {
            console.error('Login failed:', error);
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
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Field>
                <Button type="submit" primary>Login</Button>
                <Button onClick={handleSignUpClick}>Sign Up</Button>
            </Form>
            <SignUpModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSignUpSuccess={handleSignUpSuccess}
            />
            <Button onClick={logout}>Logout</Button>

        </div>
    );
};

export default Login;
