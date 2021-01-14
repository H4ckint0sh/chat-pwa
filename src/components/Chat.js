/* eslint-disable import/no-unresolved */
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  lazy,
  Suspense,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Divider,
  List,
  InputBase,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import firebase from 'firebase';
import app from '../config/firebase';
import { AuthContext } from '../context/Auth';
import FormatDate from '../util/getDate';

const UserListItem = lazy(() => import('./UserListItem'));
const MessageListItem = lazy(() => import('./MessageListItem'));
const MessageInput = lazy(() => import('./MessageInput'));

const useStyles = makeStyles({
  chatSection: {
    width: '90%',
    margin: '5vh auto',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'scroll',
    borderBottom: '1px solid #e0e0e0',
  },
});

const Chat = () => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const postMessage = (msg) => {
    import('firebase/firestore').then(async () => {
      const database = app.firestore();

      await database
        .collection('messages')
        .add({
          msg,
          author: currentUser.email,
          userId: currentUser.uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log('message posted');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.length !== 0) {
      postMessage(message);
      setMessage('');
    }
  };

  useEffect(() => {
    const unsubscribe = import('firebase/firestore').then(() => {
      const database = app.firestore();

      database
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = import('firebase/firestore').then(() => {
      const database = app.firestore();

      database.collection('users').onSnapshot((snapshot) => {
        setUsers(snapshot.docs.map((doc) => doc.data()));
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleKeyDown = (e) => {
    // send the message if Enter pressed
    if (e.key === 'Enter') {
      e.preventDefault();
      postMessage(message);
      setMessage('');
    }
  };

  const logOut = () => {
    app.auth().signOut();
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={12} style={{ borderBottom: '1px solid #e0e0e0' }}>
            <Toolbar style={{ height: '4vh' }}>
              <Typography style={{ flex: 1 }}>Chat</Typography>
              <Button onClick={logOut}>LogOut</Button>
            </Toolbar>
          </Grid>
          <Grid item xs={3} className={classes.borderRight500}>
            <List>
              <UserListItem
                id="JohnWick"
                alt="John Wick"
                src="https://material-ui.com/static/images/avatar/1.jpg"
                primary="John Wick"
              />
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: 5, display: 'flex' }}>
              <InputBase
                id="outlined-basic-search"
                placeholder="Search users ..."
                variant="outlined"
                fullWidth
              />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="send"
                disabled
              >
                <Search />
              </IconButton>
            </Grid>
            <Divider />
            {users.length !== 0 &&
              users.map((user) => {
                return (
                  <UserListItem
                    id={user.id.toString()}
                    alt={user.name}
                    src={user.photoUrl ? user.photoUrl : undefined}
                    primary={user.name}
                    secondary="online"
                  />
                );
              })}
          </Grid>
          <Grid item xs={9}>
            <List className={classes.messageArea}>
              {messages.length !== 0 &&
                messages.map((item) => {
                  console.log(item.timestamp);
                  return (
                    <MessageListItem
                      id={item.timestamp}
                      align={item.userId === currentUser.uid ? 'right' : 'left'}
                      primary={item.msg}
                      secondary={item.timestamp && FormatDate(item.timestamp)}
                    />
                  );
                })}
              <div ref={messagesEndRef} />
            </List>
            <Grid container>
              <Grid
                item
                xs={12}
                style={{
                  height: 50,
                  position: 'relative',
                }}
              >
                <MessageInput
                  message={message}
                  setMessage={setMessage}
                  handleKeyDown={handleKeyDown}
                  sendMessage={sendMessage}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Suspense>
    </div>
  );
};

export default Chat;
