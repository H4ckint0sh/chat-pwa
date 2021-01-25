import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Drawer,
  Avatar,
  Typography,
} from '@material-ui/core';
import { Mail, Inbox } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  profile: {
    padding: '25px',
    height: 180,
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    alignSelf: 'center',
    height: 50,
    width: 50,
  },
  displayName: {
    paddingTop: 20,
  },
}));

function DrawerContent({ container, mobileOpen, handleDrawerToggle }) {
  const classes = useStyles();
  const theme = useTheme();
  const drawer = (
    <div>
      <div className={classes.profile}>
        <Avatar className={classes.avatar} src="" />
        <Typography className={classes.displayName} variant="h6" gutterBottom>
          Alijan Adeli
        </Typography>
        <Typography>alijan.adeli@gmail.com</Typography>
      </div>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default DrawerContent;
