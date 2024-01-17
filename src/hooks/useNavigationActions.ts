import { useNavigate } from 'react-router-dom';
import { routes } from '@constants/routesConfig';

export const useNavigationActions = () => {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate(routes[0].path);
    };

    const userNotFound = () => {
        navigateToHome();
        // navigate('/page-not-found');
    }

    const navigateToRoute = (label: string) => {
        //search in routesConfig.ts the route with the same path
        const routeItem = routes.find(item => item.label === label)?.path
        if (routeItem) {
            navigate(routeItem);
        } else {
            navigateToHome();
        }
    }

    return {
        navigateToHome,
        userNotFound,
        navigateToRoute,
    };
};
