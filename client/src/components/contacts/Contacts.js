import React, { useContext, Fragment } from 'react';

import ContactContext from '../../context/contact/contactContext';

import ContactsItem from './ContactsItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map(contact => (
        <ContactsItem contact={contact} key={contact.id} />
      ))}
    </Fragment>
  );
};

export default Contacts;
