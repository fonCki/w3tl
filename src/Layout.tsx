import React, { ReactNode, useState } from 'react';
import { MySidebar } from '@components/sideBar/MySidebar';
import Header from '@components/header/Header';
import Left from '@components/board/Left';
import Right from '@components/board/Right';
import 'semantic-ui-css/semantic.min.css';
import { Menu } from 'semantic-ui-react';
import MenuBar from '@components/MenuBar';
import { StickyContainer, Sticky } from 'react-sticky';
import StickyWrapper from '@components/tools/StickyWrapper';
import CreatePost from '@components/CreatePost';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

    return (
        <div className="">
            <div className="-z-50">
                <Header toggleSidebar={toggleSidebar} />
            </div>
            <CreatePost />
            <MySidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
            <main className="flex justify-center align-middle overflow-auto bg-custom-gray pt-20">
                <div className="grid grid-cols-12 gap-4 max-w-screen-xl mx-auto w-full">
                    <div className="col-span-1 col-start-1 sm:col-span-2 col-start-3 md:col-span-1 col-start-1 lg:col-span-3 flex-shrink-0 mr-2  lg:block ml-2 items-center justify-center h-full z-10 ">
                        {/*<Left / >*/}
                        {/*TODO fix sticky*/}
                        <StickyWrapper mode={'Basic'} topOffset={80} bottomOffset={20}>
                            <MenuBar />
                        </StickyWrapper>

                    </div>

                    <div className="col-span-10 col-start-2 sm:col-span-9 md:col-start-2 md:col-span-7 lg:col-span-6">
                        {children} {/* Page-specific content goes here */}
                    </div>
                    <div className="col-span-1  lg:col-span-3 flex-shrink-0 hidden md:col-span-3 md:block md:col-start-9 lg:block mr-2">
                        <Right />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Layout;
