import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
// component
import { db } from "../../../Firebase/fbconfig"
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({users,setUsers, setSelected, selected, setCount, count, numSelected, filterName, onFilterName }) {
  const [search,setSearch]=useState()
  const originalData=users
  // console.log(originalData)
  const [isPending,setIsPending]=useState(false)
  const handleClick = () => {
    // console.log(selected)
    if(window.confirm("Are you sure want to delete"))
    {
    const len = selected.length;
    let cc = 0
    selected.forEach(async (fs) => {
      setIsPending(true)
      await deleteDoc(doc(db, "UserDetails", fs))
        .then(() => {
          cc += 1;
          // console.log(cc);
          if (cc === len) {
            setCount(count + 1)
            alert("Deleted")
            setSelected([])
            setIsPending(false);
          }
        }).catch((err) => {
          console.log(err);
          alert(err);
        })
    })
  } 

  }
  const handleChange=(e)=>{
    // console.log(e);
     
    if(e.length===0)
    {
      setUsers(users)
    }
    else{
      
    const filtered=originalData?.filter((us)=>{
      const name=us.username;
      
      return name.includes(e)
    })
    // console.log(filtered)
    setUsers(filtered)
  }
   
  }
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          // value={filterName}
          value={search}
          onChange={(e)=>{ 
            handleChange(e.target.value);
          }}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton disabled={isPending} onClick={handleClick}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
