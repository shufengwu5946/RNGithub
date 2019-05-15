import { connect } from "react-redux";
import StarPage from "../components/StarPage";

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarPage);
