import Contacts from 'modules/Contacts/Contacts';
import SearchContact from 'shared/components/SearchContact';
import {
  LinearProgress,
  AppBar,
  Typography,
  Container,
  Toolbar,
  Fab,
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { setFilterValue, getFilterValue } from 'redux/filters/filtersSlice';
import { useGetContactsQuery } from 'redux/api/contactsApi/contactsApi';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import DialogAddContact from 'modules/DialogAddContact/DialogAddContact';

function App() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);
  const { data: contacts, isFetching } = useGetContactsQuery();
  const changeFilter = e => {
    dispatch(setFilterValue(e.target.value));
  };

  const onClose = () => {
    setIsOpenDialog(false);
  };

  return (
    <Container sx={{ position: 'relative' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="p"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Phone Book
          </Typography>
          <SearchContact changeFilter={changeFilter} value={filterValue} />
        </Toolbar>
      </AppBar>
      <main>
        <section>
          {isFetching && <LinearProgress />}
          {contacts && <Contacts contacts={contacts} />}
          <Fab
            sx={{ position: 'sticky', bottom: 20 }}
            aria-label={'Add contact'}
            color={'primary'}
            onClick={() => {
              setIsOpenDialog(true);
            }}
          >
            <Add />
          </Fab>
          <DialogAddContact
            isOpen={isOpenDialog}
            onClose={onClose}
            contacts={contacts}
          />
        </section>
      </main>
      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
}

export default App;
