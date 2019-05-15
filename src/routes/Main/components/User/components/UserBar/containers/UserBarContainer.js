import { connect } from "react-redux";
import UserBar from "../components/UserBar";
import { getUserInfo } from "~/actions/Main/User/UserBar";

const mapStateToProps = state => ({
  avatarUrl: state.avatarUrl,
  login: state.login,
  createdAt: state.createdAt,
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => {
    dispatch(getUserInfo());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBar);
