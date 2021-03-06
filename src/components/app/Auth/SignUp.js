import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import Firebase from '../../firebase'

// Material-ui imports
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

/** This component provides a form for the user to create an account with. */
class SignUpFormBase extends Component {

  firebase = new Firebase();

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      error: null,
    }
  }

  // Function for handling the data when the user presses submit.
  onSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    
    // Once the user has signed up, the preferences and the progress is set for the user.
    this.firebase.signUp(email, password)
    .then((authUser) => {
      this.firebase.user(authUser.user.uid).set({
        username,
        email,
        preferences: {
          Nature: true,
          Food: true,
          Fitness: true,
          Culture: true,
          Volunteer: true,
          Creative: true,
          Romantic: true,
          Games: true,
          distance: 30,
          cost: 2,
        },
        progress: {
          Nature: 0,
          Food: 0,
          Fitness: 0,
          Culture: 0,
          Volunteer: 0,
          Creative: 0,
          Romantic: 0,
          Games: 0,
        }
      });
    })
    .then(() => {
      this.setState({
        username: '',
        email: '',
        password: '',
        error: null,
      });
      // Redirects the user after signing up.
      this.props.history.push(ROUTES.HOME);
    });
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  render() {
    return (
        <Grid container justify='center'>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper style={{textAlign: 'center', padding: '2em', margin: '2em 2em 0 2em'}}>
              <form onSubmit={this.onSubmit}>
                <Grid container spacing={24} justify = "center">
                  <Grid item xs={8}>
                    <Grid container direction="column-reverse" justify="center" alignItems="center" spacing={8}>
                      <Grid item>
                        <Typography style={{color: 'grey'}} variant="h5">New Account</Typography>
                      </Grid>
                    </Grid>                  
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="username-input">
                        Username <span style={{color: 'red'}}>*</span>
                      </InputLabel>
                      <Input name="username" id="username-input" type="text" onChange={this.onChange} required />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="email-input">
                        Email <span style={{color: 'red'}}>*</span>
                      </InputLabel>
                      <Input name="email" id="email-input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="email" onChange={this.onChange} required />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="password-input">
                        Password <span style={{color: 'red'}}>*</span>
                      </InputLabel>
                      <Input name="password" id="password-input" type="password" pattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={this.onChange} required />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} style={{marginTop: '2em'}}>
                    <Button type="submit" color="primary" variant="contained" fullWidth>Create</Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
    );
  }
}

const SignUpForm = withRouter(SignUpFormBase);

export default SignUpPage;