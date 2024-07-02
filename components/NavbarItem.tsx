import React from 'react';

interface NavbarItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active, onClick }) => {
  return (
    <div onClick={onClick} className={active ? 'text-white cursor-default' : 'text-gray-200 hover:text-gray-300 cursor-pointer transition'}>
      {label}
    </div>
  )
}

export default NavbarItem;
