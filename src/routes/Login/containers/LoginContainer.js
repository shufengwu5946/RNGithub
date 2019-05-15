import {
  setUserName as setUser,
  setPassword as setPass,
  login
} from "~/actions/Login";
import { connect } from "react-redux";
import Login from "../components/Login";
import { authorizations } from "../../../actions/Login";

const mapStateToProps = state => ({
  userName: state.userName,
  password: state.password,
  loading: state.loading,
  loginSuccStatus: state.loginSuccStatus
});

const mapDispatchToProps = dispatch => ({
  setUserName: userName => {
    dispatch(setUser(userName));
  },
  setPassword: password => {
    dispatch(setPass(password));
  },
  handlePress: () => {
    dispatch(authorizations());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
