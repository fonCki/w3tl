// App.js or App.tsx
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import AppRoutes from './AppRoutes'; // Adjust the path as necessary
import Layout from './Layout'; // Adjust the path as necessary

function App() {
    return (
        <Layout>
            <AppRoutes />
        </Layout>
    );
}

export default App;
