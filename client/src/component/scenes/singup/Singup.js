import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import InputComp from '../reusuable/inputComp';
import ButtonComp from '../reusuable/buttonComp';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {SINGUP_DATA} from "../../../service/types"
import {connect} from "react-redux";
import {redux_set_newuser, redux_signup_request} from "../../../reducer/ducksReducer"
import {validation_name, validation_Email, validation_password} from "../../../service/util";

const {FIRST_NAME, LAST_NAME, EMAIL, PASSWORD} = SINGUP_DATA;

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

const Signup = (props) => {
  const classes = useStyles();
  const [activeBtn, setActiveBtn] = useState(false);

  let history = useHistory();

  useEffect(() => {
    if (validation_Email(props.redux_signupInput[EMAIL])
      && validation_password(props.redux_signupInput[PASSWORD])
      && validation_name(props.redux_signupInput[FIRST_NAME])
      && validation_name(props.redux_signupInput[LAST_NAME])) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }

  }, [props.redux_signupInput[FIRST_NAME]
    , props.redux_signupInput[LAST_NAME]
    , props.redux_signupInput[EMAIL]
    , props.redux_signupInput[PASSWORD]]);

  const onChangeHandler = (e) => {
    props.redux_set_newuser({inputName: e.target.name, inputValue: e.target.value});
  }

  const onClickBtn = () => {
    if (activeBtn) {
      props.redux_signup_request({history});
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create New Account
        </Typography>
        <form className={classes.form}>
          <Grid container>
            <Grid item>
              <InputComp
                name={FIRST_NAME}
                placeholder={'First Name'}
                value={props.redux_signupInput[FIRST_NAME]}
                onChangeHandler={onChangeHandler}
              />
            </Grid>
            <Grid item>
              <InputComp
                name={LAST_NAME}
                placeholder={'Last Name'}
                value={props.redux_signupInput[LAST_NAME]}
                onChangeHandler={onChangeHandler}
              />
            </Grid>
          </Grid>
          <InputComp
            name={EMAIL}
            placeholder={'Email'}
            value={props.redux_signupInput[EMAIL]}
            onChangeHandler={onChangeHandler}
          />
          <InputComp
            name={PASSWORD}
            type={'password'}
            placeholder={'Password'}
            value={props.redux_signupInput[PASSWORD]}
            onChangeHandler={onChangeHandler}
          />
          <ButtonComp
            activeBtn={activeBtn}
            onClickBtn={onClickBtn}
            text="Sign Up"
          />
        </form>
      </div>
    </Container>
  )
};

const mapStateToProps = state => ({
  redux_signupInput: state.ducksReducer.signupInput
});

const mapDispatchToProps = (dispatch) => {
  return {
    redux_set_newuser: (userData) => dispatch(redux_set_newuser(userData)),
    redux_signup_request: (history) => dispatch(redux_signup_request(history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
