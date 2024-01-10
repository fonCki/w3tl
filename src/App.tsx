import React, { useState } from 'react';
import { MySidebar } from '@components/sideBar/MySidebar';
import Header from '@components/Header';
import 'semantic-ui-css/semantic.min.css';
import Feed from '@components/feed/Feed';
import Left from '@components/Board/Left';
import Right from '@components/Board/Right';

function App() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

    return (
        <div className="">
            <Header toggleSidebar={toggleSidebar} />
            <MySidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
            <main className="flex justify-center align-middle overflow-auto bg-custom-gray pt-20">
                <div className="grid grid-cols-12 gap-4 max-w-screen-xl mx-auto">
                    {/* Left column (WhoToFollow) - Visible on large screens, hidden on medium and small screens */}
                    <div className="col-span-3 lg:col-span-3 flex-shrink-0 hidden lg:block">
                        <Left />
                    </div>

                    {/* Middle column (Feed) - Adjusts based on screen size */}
                    <div className="col-span-10 col-start-2 md:col-start-3 md:col-span-8 lg:col-span-6">
                        <Feed />
                    </div>

                    {/* Right.tsx column (TrendingBoard) - Visible on large screens, hidden on medium and small screens */}
                    <div className="col-span-3 lg:col-span-3 flex-shrink-0 hidden lg:block">
                        <Right />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;





