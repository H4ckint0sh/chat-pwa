import React from 'react';
import { Grid, ListItem, ListItemText } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

function MessageListItem({ id, align, primary, secondary }) {
  const theme = useTheme();
  return (
    <ListItem key={id}>
      <Grid
        container
        style={{
          textAlign: `${align}`,
          width: '100%',
          justifyContent: `${align === 'right' ? 'flex-end' : 'flex-start'}`,
        }}
      >
        <Grid
          item
          xs={4}
          style={{
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
            width: '10%',
            height: 50,
            border: '1px solid #e0e0e0',
            borderRadius: `${
              align === 'right' ? '20px 0px 20px 20px' : '0px 20px 20px 20px'
            }`,
            backgroundColor: `${theme.palette.primary.main}`,
          }}
        >
          <ListItemText
            style={{
              color: `${theme.palette.secondary.contrastText}`,
              padding: '0 20px',
            }}
            align={align}
            primary={primary}
          />
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={align} secondary={secondary} />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default MessageListItem;
