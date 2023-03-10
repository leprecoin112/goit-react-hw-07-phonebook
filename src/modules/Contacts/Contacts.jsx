import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@mui/material';
import ContactsItem from './ContactsItem/ContactsItem';
import { useSelector } from 'react-redux';
import { getFilterValue } from 'redux/filters/filtersSlice';

function Contacts({ contacts }) {
  const filterValue = useSelector(getFilterValue);

  const getFilteredContacts = () => {
    const normalizedFilter = filterValue.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <List sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {getFilteredContacts().map(({ id, name, phone }) => (
        <ContactsItem key={id} id={id} name={name} phone={phone}></ContactsItem>
      ))}
    </List>
  );
}

Contacts.propTypes = {
  onDeleteContact: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
    })
  ),
};

export default Contacts;
