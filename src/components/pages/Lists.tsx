//Create explore default template
// Path: src/components/pages/Explore.tsx
import React from 'react';
import { useNavigationActions } from '@hooks/useNavigationActions';
import { routes } from '@constants/routesConfig';
import FeedTitle from '@components/feed/FeedTitle';

const Lists = () => {
    const title = routes.find(route => route.label === 'Lists')?.label;

    return (
        <div>
            <FeedTitle title={title} showUser={false} />
        </div>
    );
};

export default Lists;