import { connect } from "react-redux";
import RepoDetail from "../components/RepoDetail";
import {
  showLoadingDialog as showLoadingD,
  dismissLoadingDialog as dismissLoadingD
} from "../../../actions/Common";
import { getReadme as getRm } from "../../../actions/RepoDetail/TabView/Info";

const mapStateToProps = state => ({
  token: state.token,
  readme: state.readme
});

const mapDispatchToProps = dispatch => ({
  showLoadingDialog: () => {
    dispatch(showLoadingD());
  },
  dismissLoadingDialog: () => {
    dispatch(dismissLoadingD());
  },
  getReadme: (title, author, defaultBranch) => {
    dispatch(getRm(title, author, defaultBranch));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoDetail);
