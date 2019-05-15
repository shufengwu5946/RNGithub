import { connect } from "react-redux";
import StartPage from "../components/StartPage";
import { setToken, setLogin } from "~/actions/Login";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setToken: token => {
    dispatch(setToken(token));
  },
  setLogin: login => {
    dispatch(setLogin(login));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartPage);
