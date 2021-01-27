/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { NotificationsActive, NotificationsNone } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import DrawerContent from './DrawerContent';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  appBarIcons: {
    marginLeft: 'auto',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  chat: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    padding: '10px',
  },
  content: {
    flexGrow: 1,
    position: 'relative',
  },
  input: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  notification: {
    marginRight: 20,
  },
}));

function Chat({
  user,
  rooms,
  mobileOpen,
  handleDrawerToggle,
  showCreate,
  setShowCreate,
  signOut,
  notify,
  notificationsOn,
  notificationsOff,
  searchWord,
  setSearchWord,
  searchResults,
}) {
  const classes = useStyles();

  const AVATAR =
    'https://i.pinimg.com/originals/0a/dd/87/0add874e1ea0676c4365b2dd7ddd32e3.jpg';

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.appBarIcons}>
            <IconButton
              className={classes.notification}
              color="inherit"
              aria-label="notification"
              edge="start"
              onClick={notify ? notificationsOff : notificationsOn}
            >
              {notify ? <NotificationsActive /> : <NotificationsNone />}
            </IconButton>
            <IconButton
              className={classes.exit}
              color="inherit"
              aria-label="sign-out"
              edge="start"
              onClick={signOut}
            >
              <ExitIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <DrawerContent
        user={user}
        rooms={rooms}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        showCreate={showCreate}
        setShowCreate={setShowCreate}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        searchResults={searchResults}
      />
      <div className={classes.chat}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <ChatMessages
            side="left"
            avatar={AVATAR}
            messages={[
              'Hi Jenny, How r u today?',
              'Did you train yesterday',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
            ]}
          />
          <ChatMessages
            side="right"
            messages={[
              "Great! What's about you?",
              'Of course I did. Speaking of which check this out',
            ]}
          />
          <ChatMessages
            side="left"
            avatar={AVATAR}
            messages={['Im good.', 'See u later.']}
          />
        </main>
        <MessageInput className={classes.input} />
      </div>
    </div>
  );
}

export default Chat;
