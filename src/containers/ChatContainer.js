/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import React, { useContext, useState, useEffect, useRef } from 'react';
import firebase from 'firebase';
import { AuthContext } from '../context/Auth';
import { db, auth } from '../config/firebase';
import Chat from '../components/Chat';
import Notifications from '../Notifications';

function ChatContainer({ history }) {
  const el = useRef(null);

  const { currentUser } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [notifications, setNotifications] = useState(null);
  const [notify, setNotify] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // auto scrool to bottom of chat container
  useEffect(() => {
    el.current.scrollIntoView({ block: 'end', behavior: 'auto' });
  });

  useEffect(() => {
    const notificationsInstans = new Notifications();
    setNotifications(notificationsInstans);
    notificationsInstans.changeUser(currentUser);
  }, [currentUser]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setInput('');
    (async () => {
      await db
        .collection('rooms')
        .doc(room.id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          const messages = snapshot.docs.map((doc) => doc.data());
          setMessages(messages);
        });
    })();
  }, [room]);

  const sendMessage = (e) => {
    e.preventDefault();
    // setPopup(false);
    if (input && input.trim().length > 0) {
      (async () => {
        await db.collection('rooms').doc(room.id).collection('messages').add({
          name: currentUser.displayName,
          message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userId: currentUser.uid,
        });
      })();
    }
    setInput('');
  };

  useEffect(() => {
    const unsubscribe = db
      .collection('rooms')
      .orderBy('id', 'desc')
      .onSnapshot((snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            creator: doc.data().creator,
          }))
        );
      });
    return () => {
      unsubscribe();
    };
  }, [currentUser.uid]);

  useEffect(() => {
    db.collection('users')
      .doc(currentUser.uid)
      .onSnapshot((snap) => {
        setNotify(snap.data().notify);
      });
    if (notifications) {
      notifications.getPermission();
    }
  }, [currentUser.uid, notifications]);

  const notificationsOn = () => {
    notifications.changeUser(currentUser);
    notifications.getPermission();
    db.collection('users').doc(currentUser.uid).set(
      {
        notify: true,
      },
      { merge: true }
    );
  };

  const notificationsOff = () => {
    notifications.deleteToken();
  };

  // serch rooms
  useEffect(() => {
    const results = rooms.filter((room) => room.name.includes(searchWord));
    setSearchResults(results);
  }, [searchWord]);

  return (
    <Chat
      user={currentUser}
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
      handleDrawerToggle={handleDrawerToggle}
      showCreate={showCreate}
      setShowCreate={setShowCreate}
      rooms={rooms}
      signOut={signOut}
      notificationsOn={notificationsOn}
      notificationsOff={notificationsOff}
      notify={notify}
      searchWord={searchWord}
      setSearchWord={setSearchWord}
      searchResults={searchResults}
      input={input}
      setInput={setInput}
      sendMessage={sendMessage}
      messages={messages}
      setRoom={setRoom}
      el={el}
    />
  );
}

export default ChatContainer;
