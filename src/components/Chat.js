/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { NotificationsActive, NotificationsOff } from '@material-ui/icons';
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
    width: '100%',
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
      marginBottom: theme.spacing(2),
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
  setRoom,
  messages,
  input,
  setInput,
  sendMessage,
  el,
}) {
  const classes = useStyles();

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
              {notify ? <NotificationsActive /> : <NotificationsOff />}
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
        messages={messages}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        showCreate={showCreate}
        setShowCreate={setShowCreate}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        searchResults={searchResults}
        setRoom={setRoom}
      />
      <div className={classes.chat}>
        <main ref={el} className={classes.content}>
          <div className={classes.toolbar} />
          {messages &&
            messages.map((message, i) => {
              return (
                <ChatMessages
                  // eslint-disable-next-line react/no-array-index-key
                  key={message.userId + i}
                  side={message.userId === user.uid ? 'right' : 'left'}
                  message={{ message, index: i }}
                  messages={messages}
                  avatar={message.avatar}
                  userHasChanged={
                    i !== 0 && messages[i].userId !== messages[i - 1].userId
                  }
                  userGoingToChange={
                    i !== messages.length - 1 &&
                    messages[i].userId !== messages[i + 1].userId
                  }
                />
              );
            })}
        </main>
        <MessageInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          className={classes.input}
        />
      </div>
    </div>
  );
}

export default Chat;
