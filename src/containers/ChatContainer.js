import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/Auth';
import { db, auth } from '../config/firebase';
import Chat from '../components/Chat';
import Notifications from '../Notifications';

function ChatContainer({ history }) {
  const { currentUser } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [notifications, setNotifications] = useState(null);
  const [notify, setNotify] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
    />
  );
}

export default ChatContainer;
