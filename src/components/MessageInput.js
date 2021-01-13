import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { AttachFile, SendRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 30,
    width: 2,
    margin: 4,
  },
}));

export default function CustomizedInputBase({
  message,
  setMessage,
  handleKeyDown,
  sendMessage,
}) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        // placeholder="Type Your Message ..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="send"
        onClick={(e) => sendMessage(e)}
      >
        <SendRounded />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="files"
      >
        <AttachFile />
      </IconButton>
    </Paper>
  );
}
