import React, { useReducer } from 'react';
import uuid from 'uuid';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Ice King',
        email: 'aniceking@landofoo.com',
        phone: '555-555-5555',
        type: 'professional',
      },
      {
        id: 2,
        name: 'Marceline',
        email: 'vampirequeen@landofoo.com',
        phone: '666-666-6666',
        type: 'personal',
      },
      {
        id: 3,
        name: 'Peppermint Butler',
        email: 'peppbutt@landofoo.com',
        phone: '999-999-9999',
        type: 'personal',
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Current Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
