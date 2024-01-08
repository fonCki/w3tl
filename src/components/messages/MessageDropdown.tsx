import React, { useState, useEffect } from 'react';
import { Dropdown, List, Image } from 'semantic-ui-react';
import { MessageLine } from '@components/messages/MessageLine';
import { Message } from '@models/message';
import { HeaderButton } from '@components/buttons/HeaderButton';
import { messageService } from '@services/messageService';


const MessagesDropdown: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const loadMessages = async () => {
            const fetchedMessages = await messageService.getMessages();
            setMessages(fetchedMessages);
        };
        loadMessages();
    }, []);
    const handleMessageClick = (id: number) => {
        console.log('Message clicked:', id);
        // Logic to open the chat window
    };

    const unreadCount = messages.filter(message => !message.read).length;

    return (
        <Dropdown
            trigger={
                <HeaderButton iconName="envelope" onClick={() => console.log('Message icon clicked')}>
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{unreadCount}</span>
                    )}
                </HeaderButton>
            }
            pointing="top right"
            icon={null}
            className="relative"
        >
            <Dropdown.Menu
                className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-opacity-5 focus:outline-none overflow-y-auto"
                style={{ maxHeight: '75vh' }}>
                <div className="sticky top-0 bg-white px-4 py-2 border-b z-10">
                    <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
                </div>
                <List relaxed divided>
                    {messages.map(message => (
                        <MessageLine
                            key={message.id}
                            message={message}
                            onMessageClick={() => handleMessageClick(message.id)}
                        />
                    ))}
                </List>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default MessagesDropdown;
