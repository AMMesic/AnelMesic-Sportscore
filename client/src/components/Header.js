import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './Header.css'

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="menu">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className="menu-button">
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link to="/Allsvenskan" >Allsvenskan</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/SM-guld" >SM-Special</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/Livescore" >Livescore</Link></MenuItem>
      </Menu>
    </div>
  )
}

export default Header;