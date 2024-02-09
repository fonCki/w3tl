import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

const UserLinePlaceholder = () => {
    return (
        <Card fluid>
            <div className="bg-white rounded-lg shadow-lg p-4">
                <Placeholder>
                    <Placeholder.Header image>
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="full" />
                    </Placeholder.Header>
                </Placeholder>
                <Placeholder.Paragraph>
                    <Placeholder.Line length="short" />
                </Placeholder.Paragraph>
            </div>
        </Card>
    );
};

export default UserLinePlaceholder;
