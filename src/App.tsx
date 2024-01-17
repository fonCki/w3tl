// App.js or App.tsx
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import AppRoutes from './AppRoutes'; // Adjust the path as necessary
import Layout from './Layout';
import { Provider } from 'react-redux';
import store from '@store/store';
import 'primereact/resources/themes/saga-blue/theme.css';  //theme
import 'primereact/resources/primereact.min.css';
import ScrollToTop from '@components/tools/ScrollTop';


function App() {
    return (
        <Provider store={store}>
        <Layout>
            <ScrollToTop />
            <AppRoutes />
        </Layout>
        </Provider>
    );
}
export default App;
