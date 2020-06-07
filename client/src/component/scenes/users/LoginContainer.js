import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputComp from '../reusuable/inputComp';
import {USER_DATA} from '../../../service/types';
import {redux_set_userinput} from "../../../reducer/ducksReducer";

const {USER_EMAIL, USER_PASSWORD} = USER_DATA;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const LoginContainer = (props) => {
  const classes = useStyles();

  useEffect(() => {
    console.log(props.redux_userInput[USER_EMAIL]);
    console.log(props.redux_userInput[USER_PASSWORD]);
  }, [props.redux_userInput[USER_EMAIL], props.redux_userInput[USER_PASSWORD]]);

  const onChangeHandler = (e) => {
    props.redux_set_userinput({inputName: e.target.name, inputValue: e.target.value});
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          BookBox
        </Typography>
        <form className={classes.form} noValidate>
          <InputComp
            name={USER_EMAIL}
            placeholder={'Email'}
            value={props.redux_userInput[USER_EMAIL]}
            onChangeHandler={onChangeHandler}
          />
          <InputComp
            name={USER_PASSWORD}
            type={'password'}
            placeholder={'Password'}
            value={props.redux_userInput[USER_PASSWORD]}
            onChangeHandler={onChangeHandler}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Don't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
};

const mapStateToProps = state => ({
  redux_userInput: state.ducksReducer.userInput
});

const mapDispatchToProps = (dispatch) => {
  return {
    redux_set_userinput: (userData) => dispatch(redux_set_userinput(userData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
