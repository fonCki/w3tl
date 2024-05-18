import React from 'react';
import { Dropdown } from 'semantic-ui-react';

/**
 * Represents a dropdown component for a tweet with various options.
 *
 * @component
 */
const TweetDropdown: React.FC = () => {
    return (
        <Dropdown icon="ellipsis horizontal" className="icon hover:bg-gray-100 rounded-full accent-gray-700">
            <Dropdown.Menu>
                <Dropdown.Item text="Not Interested" />
                <Dropdown.Item text="Stop Following" />
                <Dropdown.Item text="Block" />
                {/* Add more options as needed */}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default TweetDropdown;
