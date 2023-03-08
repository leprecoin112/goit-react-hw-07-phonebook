import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from './SearchContact.styled';
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

export default SearchContact;
