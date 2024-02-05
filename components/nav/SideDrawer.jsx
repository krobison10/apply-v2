'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {HouseDoorFill} from 'react-bootstrap-icons';
import {JournalText} from 'react-bootstrap-icons';
import {PersonLinesFill} from 'react-bootstrap-icons';
import {MenuUp} from 'react-bootstrap-icons';
import {GearFill} from 'react-bootstrap-icons';

/**
 * Component representing a navigation item in the sidebar
 * @param {Object} props
 * @return {React.Component}
 */
function NavItem({isActive, href, label, icon}) {
  return (
    <li className='mb-2'>
      <Link href={href} className={isActive ? 'active' : ''}>
        <div className='inline-block my-auto text-lg mr-2'>{icon}</div>
        {label}
      </Link>
    </li>
  );
}

/**
 * The side drawer/navigation component for internal pages
 * @return {React.Component}
 */
function SideDrawer() {
  const pathName = usePathname();

  return (
    <nav className='absolute top-0 left-0 h-screen w-64 shadow-md bg-base-200'>
      <ul className="menu bg-base-200 w-full">
        {[
          {icon: <HouseDoorFill/>, label: 'Home', href: '/home'},
          {icon: <JournalText/>, label: 'Applications', href: '/applications'},
          {icon: <PersonLinesFill/>, label: 'Interviews', href: '/interviews'},
          {icon: <MenuUp/>, label: 'Blog', href: '/blog'},
          {icon: <GearFill/>, label: 'Settings', href: '/settings'},
        ].map(({icon, label, href}) => (
          <NavItem
            key={href}
            icon={icon}
            label={label}
            href={href}
            isActive={pathName === href}
          />
        ))}
      </ul>
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
