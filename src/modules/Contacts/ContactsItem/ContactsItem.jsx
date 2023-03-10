import { Contact } from './ContactsItem.styled';
import { ListItemText, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteContactsMutation } from 'redux/api/contactsApi/contactsApi';
import { toast } from 'react-toastify';

function ContactsItem({ id, name, phone }) {
  const [deleteContact, { isLoading: isDeleting }] =
    useDeleteContactsMutation();

  const onDelete = async id => {
    const response = await deleteContact(id);
    if (response.error) {
      toast.error('Oops! Something went wrong');
      return;
    }

    toast.info('Contact deleted');
  };

  return (
    <Contact
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(id)}>
          {isDeleting ? <CircularProgress size={24} /> : <DeleteIcon />}
        </IconButton>
      }
    >
      <ListItemText primary={name} secondary={phone} />
    </Contact>
  );
}

export default ContactsItem;
