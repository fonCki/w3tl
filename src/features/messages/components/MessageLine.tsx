import React from 'react';
import { Image, List } from 'semantic-ui-react';
import { Message } from '@models/message';
import { formatDistanceToNow } from 'date-fns';
import { defaultUser } from '@models/defaults';

/**
 * Represents the props for a MessageLine component.
 */
interface MessageLineProps {
    message: Message;
    onMessageClick: () => void;
}

/**
 * Represents the details of the sender.
 *
 * @type {string}
 */
const senderDetails = defaultUser;


/**
 * MessageLine component represents a single message in a list of messages.
 *
 * @component
 * @example
 * <MessageLine
 *    message={message}
 *    onMessageClick={handleMessageClick}
 * />
 *
 * @param {object} props - The component props.
 * @param {object} props.message - The message object.
 * @param {number} props.message.id - The unique identifier of the message.
 * @param {number} props.message.sender - The unique identifier of the message sender.
 * @param {string} props.message.content - The content of the message.
 * @param {string} props.message.date - The date of the message.
 * @param {boolean} props.message.read - The read status of the message.
 * @param {function} props.onMessageClick - The event handler for clicking the message.
 * @returns {ReactElement} The rendered MessageLine component.
 */
export const MessageLine: React.FC<MessageLineProps> = ({ message, onMessageClick }) => {


    // Function to find user details based on user ID
    // const getUserDetails = (username: number) => {
    //     return usersMock.find(user => user.id === username);
    // };

    // Resolve sender details
    // const senderDetails = getUserDetails(message.sender);

    // Function to truncate the content
    const truncateContent = (text: string, maxLength: number = 30) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="flex w-full" onClick={onMessageClick}>
            <List.Item key={message.id} className={`cursor-pointer px-4 py-3 flex items-center ${!message.read ? 'bg-gray-100' : 'bg-white'}`}>
                {!message.read && <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>}
                {message.read && <div className="h-2 w-2 rounded-full bg-transparent mr-2"></div>}
                <Image avatar src={senderDetails?.avatar || ''} className="mr-3" />
                <div className="flex flex-col flex-grow">
                    <List.Header className={`font-medium ${!message.read ? 'text-gray-900' : 'text-gray-500'}`}>
                        {senderDetails?.username || 'Unknown User'}
                    </List.Header>
                    <List.Description className="text-sm text-gray-700">
                        {truncateContent(message.content)}
                    </List.Description>
                    <span className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(message.date), { addSuffix: true })}
                    </span>
                </div>
            </List.Item>
        </div>
    );
};
