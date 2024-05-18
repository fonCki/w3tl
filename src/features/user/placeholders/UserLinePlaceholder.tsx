import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

/**
 * Returns a placeholder component for a user line.
 *
 * @returns {React.Component} - The placeholder component for a user line.
 */
const UserLinePlaceholder = () => {
    return (
        <Card fluid>
            <div className="bg-white rounded-lg shadow-lg p-4 flex justify-between align-middle">
                <div className="flex-grow">
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
                <div className="flex flex-shrink-0 ml-4">
                    {/* Mimic a button with a placeholder */}
                    <Placeholder style={{ width: 100, height: 40 }}>
                        <Placeholder.Line />
                    </Placeholder>
                </div>
            </div>
        </Card>
    );
};

export default UserLinePlaceholder;
