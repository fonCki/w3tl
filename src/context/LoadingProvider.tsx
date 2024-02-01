// src/context/LoadingProvider.tsx
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Dimmer, Loader } from 'semantic-ui-react';

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const isAuthLoading = useSelector((state: RootState) => state.auth.isLoading);
    const isDataLoading = useSelector((state: RootState) => state.loading.isLoading);

    let loaderText = '';
    if (isAuthLoading) {
        loaderText = 'Authenticating...';
    } else if (isDataLoading) {
        loaderText = 'Loading...';
    }

    return (
        <>
            {(isAuthLoading || isDataLoading) && (
                <Dimmer active inverted>
                    <Loader>{loaderText}</Loader>
                </Dimmer>
            )}
            {children}
        </>
    );
};
