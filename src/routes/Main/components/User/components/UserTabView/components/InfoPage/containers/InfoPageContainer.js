import { connect } from "react-redux";
import InfoPage from "../components/InfoPage";
import {
  setRepoListType as setType,
  setRepoListSort as setSort,
  setRepoListTypeItems as setTypeItems
} from "~/actions/Repo";

const mapStateToProps = state => ({
  repoListType: state.repoListType,
  repoListSort: state.repoListSort,
  repoListTypeItems: state.repoListTypeItems,
  followersCount: state.followersCount,
  followingCount: state.followingCount,
  reposCount: state.reposCount,
  name: state.name
});

const mapDispatchToProps = dispatch => ({
  setRepoListType: repoListType => {
    dispatch(setType(repoListType));
  },
  setRepoListSort: repoListSort => {
    dispatch(setSort(repoListSort));
  },
  setRepoListTypeItems: repoListTypeItems => {
    dispatch(setTypeItems(repoListTypeItems));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoPage);
