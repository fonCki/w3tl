// App.js or App.tsx
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import AppRoutes from './routes/AppRoutes'; // Adjust the path as necessary
import { Provider } from 'react-redux';
import store from '@store/store';
import 'primereact/resources/themes/saga-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css';
import ScrollToTop from '@components/tools/ScrollTop';
import { AuthProvider } from '@context/AuthContext';
import { LoadingProvider } from '@context/LoadingProvider';


/**
 * Renders the main application component.
 *
 * @returns {React.Component} The main application component.
 */
function App() {

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

