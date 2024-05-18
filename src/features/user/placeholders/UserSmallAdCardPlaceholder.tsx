import React from 'react';
import { Card, Image, Placeholder } from 'semantic-ui-react';

/**
 * UserSmallAdCardPlaceholder component is a placeholder for a small ad card with empty data.
 *
 * @returns {JSX.Element} JSX element representing the user small ad card placeholder
 */
const UserSmallAdCardPlaceholder = () => {
    return (
        <Card className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="w-full h-52">
                <Placeholder>
                    <Placeholder.Image rectangular />
                </Placeholder>
            </div>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="very short" />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length="full" />
                        <Placeholder.Line length="full" />
                        <Placeholder.Line length="full" />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Card.Content>
        </Card>
    );
};

export default UserSmallAdCardPlaceholder;
