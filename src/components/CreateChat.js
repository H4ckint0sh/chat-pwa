/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { db } from '../config/firebase';

const CreateChat = ({ user, showCreate, setShowCreate }) => {
  const [roomName, setRoomName] = useState('');
  const [open, setOpen] = useState(showCreate);

  const handleClose = () => {
    setOpen(false);
    setShowCreate(false);
  };

  const createChat = async () => {
    if (roomName) {
      if (roomName.length >= 30) {
        console.log('Chatroom name is too long!');
      } else {
        const snap = await db.collection('rooms').get();
        db.collection('rooms').add({
          name: roomName,
          creator: user.uid,
          id: snap.size + 1,
        });
      }
    }
    setOpen(false);
    setShowCreate(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create new chatroom</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please give the new chaatroom a name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={roomName}
            label="Room name"
            type="text"
            onKeyDown={(e) => e.key === 'Enter' && createChat()}
            onChange={(e) => setRoomName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={createChat} color="primary">
            create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateChat;
