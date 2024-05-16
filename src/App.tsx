// App.js or App.tsx
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import AppRoutes from './routes/AppRoutes'; // Adjust the path as necessary
import { Provider } from 'react-redux';
import store from '@store/store';
import 'primereact/resources/themes/saga-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css';
import ScrollToTop from '@components/tools/ScrollTop';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingProvider';


function App() {


    //console log
    // const firebaseConfig = {
    //     apiKey: import.meta.env.VITE_APP_API_KEY,
    //     authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    //     projectId: import.meta.env.VITE_APP_PROJECT_ID,
    //     storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    //     messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    //     appId: import.meta.env.VITE_APP_APP_ID,
    //     measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID
    // };

    console.log('firebaseConfig: ', import.meta.env.VITE_APP_API_KEY);
    console.log('firebaseConfig: ', import.meta.env.VITE_APP_AUTH_DOMAIN);
    console.log('firebaseConfig: ', import.meta.env.VITE_APP_PROJECT_ID);
    console.log('firebaseConfig: ', import.meta.env.VITE_APP_STORAGE_BUCKET);
    console.log('firebaseConfig: ', import.meta.env.VITE_APP_MESSAGING_SENDER_ID);
    console.log('firebaseConfig: ', import.meta.env.VITE_APP_APP_ID);
    console.log('firebaseConfig: ', import.meta.env.VITE_APP_MEASUREMENT_ID);

    return (
        <Provider store={store}>
            {/*<ReduxStateDisplay />*/}
            <LoadingProvider>
            {/* Wrap your application layout with AuthProvider */}
            <AuthProvider>
                    <ScrollToTop />
                    <AppRoutes />
            </AuthProvider>
            </LoadingProvider>
        </Provider>
    );
}

export default App;

