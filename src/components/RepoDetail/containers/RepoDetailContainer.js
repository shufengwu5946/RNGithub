import { connect } from "react-redux";
import RepoDetail from "../components/RepoDetail";
import {
  showLoadingDialog as showLoadingD,
  dismissLoadingDialog as dismissLoadingD
} from "../../../actions/Common";

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  showLoadingDialog: () => {
    dispatch(showLoadingD());
  },
  dismissLoadingDialog: () => {
    dispatch(dismissLoadingD());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoDetail);
