import { styled } from '@mui/material/styles';
import { ListItem } from '@mui/material';
export const Contact = styled(ListItem)(({ theme }) => ({
  boxShadow: theme.shadows[2],
  // maxWidth: 360,
  border: 1,
}));
