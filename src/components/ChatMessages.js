/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ palette, spacing }) => {
  const radius = spacing(2.5);
  const size = spacing(4);
  const rightBgColor = palette.primary.main;
  // if you want the same as facebook messenger, use this color '#09f'
  return {
    avatar: {
      width: size,
      height: size,
      marginRight: spacing(1),
      marginTop: spacing(2),
    },
    msg: {
      padding: spacing(1, 2),
      borderRadius: 4,
      marginBottom: 4,
      display: 'inline-block',
      wordBreak: 'break-all',
      fontFamily:
        // eslint-disable-next-line max-len
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    leftRow: {
      textAlign: 'left',
    },
    left: {
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
      backgroundColor: palette.grey[200],
    },
    leftFirst: {
      marginTop: spacing(2),
      borderTopLeftRadius: radius,
    },
    leftLast: {
      borderBottomLeftRadius: radius,
    },
    rightRow: {
      textAlign: 'right',
    },
    right: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      backgroundColor: rightBgColor,
      color: palette.common.white,
    },
    rightFirst: {
      borderTopRightRadius: radius,
    },
    rightLast: {
      borderBottomRightRadius: radius,
    },
  };
});

const ChatMessages = ({
  avatar,
  message,
  side,
  messages,
  userHasChanged,
  userGoingToChange,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const attachClass = (index) => {
    if (index === 0 || userHasChanged) {
      return classes[`${side}First`];
    }
    if (index === messages.length - 1 || userGoingToChange) {
      return classes[`${side}Last`];
    }
    return '';
  };
  return (
    <Grid container justify={side === 'right' ? 'flex-end' : 'flex-start'}>
      {side === 'left' && userHasChanged ? (
        <Grid item>
          <Avatar className={classes.avatar} src={avatar} />
        </Grid>
      ) : side === 'left' && message.index === 0 ? (
        <Grid item>
          <Avatar className={classes.avatar} src={avatar} />
        </Grid>
      ) : (
        <Grid item style={{ width: theme.spacing(5) }} />
      )}
      <Grid item xs={8}>
        <div className={classes[`${side}Row`]}>
          <Typography
            align="left"
            className={`${classes.msg} ${classes[side]} ${attachClass(
              message.index
            )}`}
          >
            {message.message.message}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default ChatMessages;
