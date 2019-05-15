import { connect } from "react-redux";
import ActivityPage from "../components/ActivityPage";

const mapStateToProps = state => ({
  login: state.login,
  token: state.token
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityPage);
