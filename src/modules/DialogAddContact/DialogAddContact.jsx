import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.scss';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';

import { useAddContactsMutation } from 'redux/api/contactsApi/contactsApi';
function DialogAddContact({ contacts, isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  const [addContacts, { isLoading: isPosting, data }] =
    useAddContactsMutation();
  const resetState = () => {
    setName('');
    setPhone('');
    setIsDuplicate(false);
    onClose();
  };

  const checkingDuplicate = newName => {
    return contacts.find(({ name }) => name === newName);
  };

  const handleSubmit = () => {
    if (checkingDuplicate(name)) {
      setIsDuplicate(true);
      return;
    }
    addContacts({
      phone,
      name,
    });

    if (!isPosting) {
      resetState();
    }
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
        <Box flexDirection={'column'} display={'flex'} gap={2}>
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
                '+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}',
              title:
                'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
            }}
            type="tel"
            name="phone"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button disabled={!isDisableAdd} onClick={handleSubmit}>
          Add
        </Button>
        <Button disabled={isPosting} onClick={resetState}>
          Cancel
        </Button>
      </DialogActions>
      <Snackbar
        open={isDuplicate}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={() => setIsDuplicate(false)}
      >
        <Alert severity="warning" sx={{ width: '100%' }}>
          {`A contact with this ${name} already exists`}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

DialogAddContact.propTypes = {
  onSubmit: PropTypes.func,
};

export default DialogAddContact;
