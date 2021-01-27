/* eslint-disable no-nested-ternary */
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
import CreateChat from './CreateChat';

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

function DrawerContent({
  user,
  rooms,
  mobileOpen,
  handleDrawerToggle,
  showCreate,
  setShowCreate,
  searchWord,
  setSearchWord,
  searchResults,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const drawer = (
    <div>
      <div className={classes.profile}>
        <Avatar className={classes.avatar} src={user.photoURL} />
        <Typography className={classes.displayName} variant="h6" gutterBottom>
          {user.displayName}
        </Typography>
        <Typography>{user.email}</Typography>
      </div>
      <Divider />
      <div className={classes.addRoom}>
        <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
          onClick={() => setShowCreate(true)}
          startIcon={<Add />}
        >
          Add a chatroom
        </Button>
      </div>
      {showCreate && (
        <CreateChat
          showCreate={showCreate}
          setShowCreate={setShowCreate}
          user={user}
        />
      )}
      <Divider />
      <Paper component="form" className={classes.search}>
        <InputBase
          className={classes.input}
          placeholder="Search a room ..."
          inputProps={{ 'aria-label': 'search-a-room' }}
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <IconButton className={classes.iconButton} aria-label="search" disabled>
          <Search />
        </IconButton>
      </Paper>
      {searchResults && (
        <div className={classes.rooms}>
          <List>
            {searchResults.map((result) => (
              <ListItem key={result.id}>
                <ListItemAvatar>
                  <Avatar>
                    <MeetingRoom />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={result.name}
                  secondary="Secondary text"
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="more">
                    <MoreVert />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      )}
      {rooms && !searchResults && (
        <div className={classes.rooms}>
          <List>
            {rooms &&
              rooms.map((room) => (
                <ListItem key={room.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <MeetingRoom />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={room.name}
                    secondary="Secondary text"
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="more">
                      <MoreVert />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </div>
      )}
    </div>
  );
  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
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
