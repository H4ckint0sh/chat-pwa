/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { FcGoogle } from 'react-icons/fc';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import app from '../config/firebase';
import { AuthContext } from '../context/Auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    await app
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        // const token = result.credential.accessToken;
        const { user } = result;
        import('firebase/firestore').then(async () => {
          const database = app.firestore();

          await database
            .collection('users')
            .doc(user.providerData[0].uid.toString())
            .set({
              name: user.providerData[0].displayName,
              id: user.providerData[0].uid.toString(),
              email: user.providerData[0].email,
              photoUrl: user.providerData[0].photoURL,
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleLogin} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container style={{ margin: '10px 0' }}>
            <Grid item>
              <Button
                variant="outlined"
                style={{ padding: 10 }}
                onClick={handleGoogleLogin}
                color="primary"
                startIcon={<FcGoogle />}
              >
                Sign In With
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Link to="recover" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(Login);
