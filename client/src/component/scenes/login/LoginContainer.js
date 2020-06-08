import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputComp from '../reusuable/inputComp';
import ButtonComp from '../reusuable/buttonComp';

import {USER_DATA} from '../../../service/types';
import {redux_set_userinput, redux_login_request} from "../../../reducer/ducksReducer";
import {validation_Email, validation_password} from '../../../service/util';


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
  const [activeBtn, setActiveBtn] = useState(false);

  useEffect(() => {
    if (validation_Email(props.redux_userInput[USER_EMAIL])
      && validation_password(props.redux_userInput[USER_PASSWORD])) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }

  }, [props.redux_userInput[USER_EMAIL], props.redux_userInput[USER_PASSWORD]]);

  const onChangeHandler = (e) => {
    props.redux_set_userinput({inputName: e.target.name, inputValue: e.target.value});
  }

  const onClickBtn = () => {
    if(activeBtn) {
      props.redux_login_request();
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          BookBox
        </Typography>
        <form className={classes.form}>
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
          <ButtonComp
            activeBtn={activeBtn}
            onClickBtn={onClickBtn}
            text="Login"
          />
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2" style={{color: '#627141'}}>
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
    redux_set_userinput: (userData) => dispatch(redux_set_userinput(userData)),
    redux_login_request: () => dispatch(redux_login_request()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
