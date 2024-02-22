'use client';

import React from 'react';
import PropTypes from 'prop-types';
import {usePathname, useRouter} from 'next/navigation';

import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import BusinessIcon from '@mui/icons-material/Business';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import {ButtonBase, Typography} from '@mui/material';


/**
 * Component representing a navigation item in the sidebar
 * @param {Object} props
 * @return {React.Component}
 */
function NavItem({isActive, href, label, icon}) {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const activeClass = isActive ? 'bg-primary text-white' : 'hover:bg-gray-200 text-gray-700';
  return (
    <ButtonBase className={`w-full mb-2 h-10 pl-3 cursor-pointer 
    rounded-md ${activeClass}`}
    onClick={() => handleNavigation(href)}>
      <div className='flex items-center align-center w-full'>
        <div className='w-5 h-5 inline-block'>
          {icon}
        </div>
        <Typography variant='body1' className='inline-block ml-2 font-bold'>{label}</Typography>
      </div>

    </ButtonBase>
  );
}

/**
 * The side drawer/navigation component for internal pages
 * @return {React.Component}
 */
function SideDrawer() {
  const pathName = usePathname();
  return (
    <nav className="absolute top-0 left-0 h-screen w-64 p-4">
      {[
        {icon: <HomeIcon className='w-full h-full'/>, label: 'Home', href: '/home'},
        {icon: <ArticleIcon className='w-full h-full'/>, label: 'Applications', href: '/applications'},
        {icon: <BusinessIcon className='w-full h-full'/>, label: 'Interviews', href: '/interviews'},
        {icon: <ChatIcon className='w-full h-full'/>, label: 'Blog', href: '/blog'},
        {icon: <SettingsIcon className='w-full h-full'/>, label: 'Settings', href: '/settings'},
      ].map(({icon, label, href}) => (
        <NavItem
          key={href}
          icon={icon}
          label={label}
          href={href}
          isActive={pathName === href}
        />
      ))}
    </nav>
  );
}

export default SideDrawer;

NavItem.propTypes = {
  isActive: PropTypes.bool,
  href: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.any,
  className: PropTypes.string,
};
