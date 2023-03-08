import { Contact } from './ContactsItem.styled';
import {
  ListItemText,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteContactsMutation } from 'redux/api/contactsApi/contactsApi';

function ContactsItem({ id, name, phone }) {
  const [deleteContact, { isLoading: isDeleting, isSuccess }] =
    useDeleteContactsMutation();

  return (
    <Contact
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteContact(id)}
        >
          {isDeleting ? <CircularProgress size={24} /> : <DeleteIcon />}
        </IconButton>
      }
    >
      <Snackbar
        open={isSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Contact deleted
        </Alert>
      </Snackbar>

      <ListItemText primary={name} secondary={phone} />
    </Contact>
  );
}

export default ContactsItem;
