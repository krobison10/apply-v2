'use client';

import React from 'react';
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
function NavItem({isActive, href, label, icon, className}) {
  if (isActive) {
    return (
      <li className='nav-item'>
        <Link href={href} className='nav-link p-2
        py-1 m-1 flex items-center bg-primary text-white rounded'>
          <div className='inline-block my-auto text-lg mr-2'>{icon}</div>


          <p className={'inline-block m-0 font-medium text-grey-800'}>
            {label}
          </p>
        </Link>
      </li>
    );
  } else {
    return (
      <li className='nav-item'>
        <Link
          href={href}
          className='nav-link p-2 py-1 m-1 flex items-center
           hover:bg-gray-100 text-secondary rounded'
        >
          <div className='inline-block my-auto text-lg mr-2'>{icon}</div>


          <p className={'inline-block m-0 text-grey-800'}>{label}</p>
        </Link>
      </li>
    );
  }
}

/**
 * The side drawer/navigation component for internal pages
 * @return {React.Component}
 */
function SideDrawer() {
  const pathName = usePathname();

  return (
    <nav className='absolute top-0 left-0 border-r-2 h-screen w-64'>
      <ul className="d-flex flex-column flex-shrink-0 p-3">
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
  isActive: propTypes.boolean,
  href: propTypes.string,
  label: propTypes.string,
  icon: propTypes.JSX.Element,
  className: propTypes.string,
};
