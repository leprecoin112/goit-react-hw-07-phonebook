import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from './SearchContact.styled';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
function SearchContact({ changeFilter, value }) {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={changeFilter}
        value={value}
      />
    </Search>
  );
}
SearchContact.propTypes = {
  changeFilter: PropTypes.func,
  value: PropTypes.string,
};

export default SearchContact;
