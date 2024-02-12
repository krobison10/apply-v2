'use client';

import {
  HomeIcon,
  UserGroupIcon,
  Bars3CenterLeftIcon,
  ChatBubbleBottomCenterIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';

import React from 'react';
import PropTypes from 'prop-types';
import {usePathname, useRouter} from 'next/navigation';


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

  const activeClass = isActive ? 'bg-primary-light text-white' : 'hover:bg-gray-200 text';
  return (
    <div className={`w-full mb-2 h-10 pl-3 cursor-pointer 
    rounded-md flex items-center pl-3] ${activeClass}`}
    onClick={() => handleNavigation(href)}>
      <div className='w-5 h-5 inline-block'>{icon}</div>
      <span className='inline-block ml-2'>{label}</span>
    </div>
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
        {icon: <HomeIcon/>, label: 'Home', href: '/home'},
        {icon: <Bars3CenterLeftIcon/>, label: 'Applications', href: '/applications'},
        {icon: <UserGroupIcon/>, label: 'Interviews', href: '/interviews'},
        {icon: <ChatBubbleBottomCenterIcon/>, label: 'Blog', href: '/blog'},
        {icon: <Cog6ToothIcon/>, label: 'Settings', href: '/settings'},
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
