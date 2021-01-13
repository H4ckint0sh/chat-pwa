import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@material-ui/core';

function UserListItem({ id, alt, src, primary, secondary }) {
  return (
    <ListItem button key={id}>
      <ListItemIcon>
        <Avatar alt={alt} src={src} />
      </ListItemIcon>
      <ListItemText primary={primary} />
      {secondary && <ListItemText secondary={secondary} align="right" />}
    </ListItem>
  );
}

export default UserListItem;
