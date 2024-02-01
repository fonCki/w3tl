// // src/context/LoadingContext.tsx
// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { Dimmer, Loader } from 'semantic-ui-react';
//
// interface LoadingContextType {
//     setLoading: (isLoading: boolean) => void;
// }
//
// const LoadingContext = createContext<LoadingContextType>({ setLoading: () => {} });
//
// // export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
// //     const [isLoading, setIsLoading] = useState(false);
// //
// //     // return (
// //     //     // <LoadingContext.Provider value={{ setLoading: setIsLoading }}>
// //     //     //     {isLoading && (
// //     //     //         <Dimmer active inverted>
// //     //     //             <Loader>Loading...</Loader>
// //     //     //         </Dimmer>
// //     //     //     )}
// //     //     //     {children}
// //     //     // </LoadingContext.Provider>
// //     // );
// // };
//
// export const useLoading = () => useContext(LoadingContext);
