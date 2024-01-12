import React from 'react';
import { useNavigate } from 'react-router-dom';


export const Logo: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="cursor-pointer" onClick={()=>navigate(`/home`)}>
            <h1 className="text-yellow text-4xl font-bold leading-[28px]">
                W<span className="text-custom-gray">3</span>TL
            </h1>
        </div>
    );
};
