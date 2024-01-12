import React, { ReactNode, useState } from 'react';
import { MySidebar } from '@components/sideBar/MySidebar';
import Header from '@components/header/Header';
import Left from '@components/board/Left';
import Right from '@components/board/Right';
import 'semantic-ui-css/semantic.min.css';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

    return (
        <div className="">
            <Header toggleSidebar={toggleSidebar} />
            <MySidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
            <main className="flex justify-center align-middle overflow-auto bg-custom-gray pt-20">
                <div className="grid grid-cols-12 gap-4 max-w-screen-xl mx-auto w-full">
                    <div className="col-span-3 lg:col-span-3 flex-shrink-0 hidden lg:block ml-2">
                        <Left />
                    </div>
                    <div className="col-span-10 col-start-2 md:col-start-3 md:col-span-8 lg:col-span-6">
                        {children} {/* Page-specific content goes here */}
                    </div>
                    <div className="col-span-3 lg:col-span-3 flex-shrink-0 hidden lg:block mr-2">
                        <Right />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Layout;
