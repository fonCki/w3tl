import React, { ReactNode, useState } from 'react';
import Header from '@components/header/Header';
import Right from '@components/board/Right';
import 'semantic-ui-css/semantic.min.css';
import MenuBar from '@components/MenuBar';
import StickyWrapper from '@components/tools/StickyWrapper';
import CreatePost from '@components/CreatePost';
import PostFabButton from '@components/postFabButton';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <div className="">
            {/*Header*/}
            <div className="-z-50">
                <Header />
            </div>

            {/* Hidden Content */}
            <PostFabButton />
            <CreatePost />

            {/*Main Content*/}
            <main className="flex justify-center align-middle overflow-auto bg-custom-gray pt-20">
                <div className="grid grid-cols-12 gap-4 max-w-screen-xl mx-auto w-full">

                    {/* Left Area*/}
                    <div className="col-span-1 col-start-1 lg:col-span-3 flex-shrink-0 mr-2 md:col-span-1 lg:block ml-2 justify-center align-middle h-full z-10 relative">
                        {/*<Left / >*/}
                        {/*TODO fix sticky*/}
                        <StickyWrapper mode={'Basic'} topOffset={70} bottomOffset={20}>
                            <MenuBar />
                        </StickyWrapper>
                    </div>

                    {/* Center Area*/}
                    <div className="col-span-10 col-start-2  md:col-start-2 md:col-span-7 lg:col-span-6">
                        {children} {/* Page-specific content goes here */}
                    </div>

                    {/* Right Area*/}
                    <div className="col-span-1  lg:col-span-3 flex-shrink-0 hidden md:col-span-2 md:block md:col-start-9 lg:block mr-2">
                        <Right />
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Layout;
