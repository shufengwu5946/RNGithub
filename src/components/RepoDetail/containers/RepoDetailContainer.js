import { connect } from "react-redux";
import RepoDetail from "../components/RepoDetail";

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoDetail);
