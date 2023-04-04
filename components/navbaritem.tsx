import React from 'react';
interface NavBarItemProps {
    label: string;
    
}
const NavBarItem: React.FC<NavBarItemProps> = ({
    label,
}) => {
    return (
        <div 
        className="text-white cursor-pointer transition  hover:text-gray-300"
        >
       {label}
        </div>

    );
};
export default NavBarItem;