import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Drawer,
  Avatar,
  Typography,
  IconButton,
  Button,
  ListItemAvatar,
  ListItemSecondaryAction,
  InputBase,
  Paper,
} from '@material-ui/core';
import { Add, MeetingRoom, MoreVert, Search } from '@material-ui/icons';
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
  addRoom: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  addButton: {
    height: '60%',
    borderRadius: 20,
  },
  search: {
    width: '100%',
  },
  input: {
    padding: '0 12px',
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
      <div className={classes.addRoom}>
        <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
          startIcon={<Add />}
        >
          Add a chatroom
        </Button>
      </div>
      <Divider />
      <Paper component="form" className={classes.search}>
        <InputBase
          className={classes.input}
          placeholder="Search a room ..."
          inputProps={{ 'aria-label': 'search-a-room' }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          disabled
        >
          <Search />
        </IconButton>
      </Paper>
      <div className={classes.demo}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MeetingRoom />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Single-line item"
              secondary="Secondary text"
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <MoreVert />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
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
