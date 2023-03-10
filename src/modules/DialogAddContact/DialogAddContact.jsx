import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from '@mui/material';
import { Form } from './DialogAddContact.styled';

import { useAddContactsMutation } from 'redux/api/contactsApi/contactsApi';
import { toast } from 'react-toastify';
function DialogAddContact({ contacts, isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [addContacts, { isLoading: isPosting }] = useAddContactsMutation();
  const resetState = () => {
    setName('');
    setPhone('');
    onClose();
  };

  const checkingDuplicate = newName => {
    return contacts.find(({ name }) => name === newName);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (checkingDuplicate(name)) {
      toast.error(`Contact ${name} already exists`);
      return;
    }
    const response = await addContacts({
      phone,
      name,
    });

    if (response.error) {
      toast.error('Oops! Something went wrong');
      return;
    }

    toast.info('New contact added');
    onClose();
  };

  const handleChange = e => {
    const { value, name } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const isDisableAdd = name && phone;
  return (
    <Dialog open={isOpen} onClose={resetState} fullWidth={true}>
      <DialogTitle>Add new contact</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="standard"
            value={name}
            onChange={handleChange}
            inputProps={{
              pattern:
                "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
              title:
                "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
            }}
            type="text"
            name="name"
            required
          />
          <TextField
            label="Phone"
            variant="standard"
            value={phone}
            onChange={handleChange}
            inputProps={{
              pattern:
                '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
              title:
                'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
            }}
            type="tel"
            name="phone"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />

          <Box justifyContent="right" display="flex" gap="20px">
            <Button disabled={!isDisableAdd} type="submit">
              Add
            </Button>
            <Button disabled={isPosting} onClick={resetState}>
              Cancel
            </Button>
          </Box>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

DialogAddContact.propTypes = {
  onClose: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
    })
  ),
  isOpen: PropTypes.bool,
};

export default DialogAddContact;
