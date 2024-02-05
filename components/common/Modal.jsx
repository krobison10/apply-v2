'use client';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * General modal component
 * @return {any}
 */
export default function Modal({id, title, children}) {
  return (
    <dialog id={id} className="modal">
      <div className='modal-box'>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">{title}</h3>
        <div>
          {children}
        </div>
      </div>
    </dialog>
  );
}

Modal.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
};
