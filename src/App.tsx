import { useState } from 'react';
import { MySidebar } from '@components/sideBar/MySidebar';
import Header from '@components/Header';
import FeedComponent from '@components/feed/FeedComponent';
import Sidebar from '@components/Board/SideBoard';
import SideBoard from '@components/Board/SideBoard';
import ScrollSharedBoard from '@components/ScrollSharedBoard';


function App() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

    return (
        <div className="flex h-screen overflow-hidden">
            <Header toggleSidebar={toggleSidebar} />
            <MySidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />

            <main className="flex-1 overflow-auto bg-custom-gray pt-16">
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
                        {/* Empty column for spacing */}
                    </div>
                    <div className="col-span-6 max-w-4xl mx-auto">
                        <FeedComponent />
                    </div>
                    <div className="col-span-3">
                        <SideBoard />
                    </div>
                </div>
            </main>
        </div>


    );
}

export default App;
