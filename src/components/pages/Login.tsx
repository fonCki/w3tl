// src/components/Login.tsx
import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import SignUpModal from '@components/SignUpModal';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    // Access isAuthenticated and user from Redux state
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.currentUser);

    useEffect(() => {
        if (isAuthenticated) {
            console.log('User already logged in:', user); // Print user details
            // navigate('/home'); // Adjust the route as needed
        }
    }, [isAuthenticated, user, navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await login(username, password);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleSignUpClick = () => {
        setIsModalOpen(true);
    };


    async function handlePrintUsers() {
        // console.log('print users')
        // const [users] = await gunService.getAllUsers()
        // forEach(users, (user) => {
        //     console.log(user);
        // }
        // )
    }

    const handleSignUpSuccess = async (username: string, password: string) => {
        console.log('Signup successful, this is un and pw:', username, password);
        setUsername(username);
        setPassword(password);
        try {
            await login(username, password); // Auto-login
        } catch (error) {
            console.error('Automatic login failed:', error);
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
            <Button onClick={handlePrintUsers}>Print users</Button>
        </div>
    );
};

export default Login;
