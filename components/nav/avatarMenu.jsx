import React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {useApi} from '@/hooks/queries/useApi';
import UserContext from '@/context/userContext';
import {useContext} from 'react';
import {Divider, Typography} from '@mui/material';


export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // eslint-disable-next-line no-unused-vars
  const [logoutResponse, logoutLoading, logoutError, clearLogoutError, callLogout] = useApi('POST', 'logout');

  const {user} = useContext(UserContext);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    callLogout();
  };

  if (logoutResponse) {
    window.location.href = '/login';
  }

  let userCharacters = '';
  if (user?.firstname) {
    userCharacters += user.firstname.charAt(0);
  }
  if (user?.lastname) {
    userCharacters += user.lastname.charAt(0);
  }
  if (userCharacters === '' && user?.email) {
    userCharacters = user.email.charAt(0);
  }

  function renderIcon() {
    return (
      <Tooltip title="Account">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ml: 2}}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{width: 40, height: 40}}>{userCharacters}</Avatar>
        </IconButton>
      </Tooltip>
    );
  }

  function renderMenu() {
    return (
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            'overflow': 'visible',
            'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            'mt': 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <div className='px-2 flex items-center mb-2'>
          <div className='flex ml-[6px] justify-center'>
            <Avatar />
          </div>
          <div className='mx-[2px]'>
            <Typography variant='body1'>
              {user?.firstname} {user?.lastname}
            </Typography>
            <Typography variant='body2'>
              {user?.email}
            </Typography>
          </div>
        </div>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClickLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    );
  }

  return (
    <div className='mr-2'>
      {renderIcon()}
      {renderMenu()}
    </div>
  );
}


