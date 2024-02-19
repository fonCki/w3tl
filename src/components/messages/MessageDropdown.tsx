import React, { useState, useEffect } from 'react';
import { MessageLine } from '@components/messages/MessageLine';
import { Message } from '@models/message';
import { HeaderButton } from '@components/buttons/HeaderButton';
import { messageService } from '@services/messageService';

const MessagesDropdown: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <HeaderButton iconName="envelope" onClick={() => setDropdownOpen(!dropdownOpen)} />
            {dropdownOpen && (
                <div className="fixed inset-y-0 right-0 z-50 w-1/4 mt-16 overflow-hidden">

                </div>
            )}
        </div>
    );
    // useEffect(() => {
    //     const loadMessages = async () => {
    //         const fetchedMessages = await messageService.getMessagesByusername(10);
    //         setMessages(fetchedMessages);
    //     };
    //     loadMessages();
    // }, []);
    //
    // const handleMessageClick = (id: number) => {
    //     console.log('Message clicked:', id);
    //     // Add logic to open the chat window
    // };
    //
    // const toggleDropdown = () => {
    //     setDropdownOpen(!dropdownOpen);
    // };
    //
    // const unreadCount = messages.filter(message => !message.read).length;
    //
    // return (
    //     <div className="relative inline-block text-left">
    //         <HeaderButton iconName="envelope" onClick={toggleDropdown}>
    //             {unreadCount > 0 && (
    //                 <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
    //                     {unreadCount}
    //                 </span>
    //             )}
    //         </HeaderButton>
    //
    //         {dropdownOpen && (
    //             <div className="fixed inset-y-0 right-0 z-50 w-1/4 mt-16 overflow-hidden">
    //                 <List className="overflow-y-auto max-h-screen shadow-lg rounded-b-lg bg-white">
    //                     {messages.map((message) => (
    //                         <MessageLine key={message.id} message={message} onMessageClick={() => handleMessageClick(message.id)} />
    //                     ))}
    //                 </List>
    //             </div>
    //         )}
    //     </div>
    // );
};

export default MessagesDropdown;
