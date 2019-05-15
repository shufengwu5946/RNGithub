import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";
import EventType from "~/constants/User/Activity";
const getEvent = (
  userName,
  eventType,
  eventRepo,
  eventPayloadType,
  eventRef,
  eventTagName,
  eventActionType
) => {
  switch (eventType) {
    case EventType.WatchEvent:
      return <EventComp eventName="星标" eventRef="" eventRepo={eventRepo} />;
    case EventType.CreateEvent:
      if (eventPayloadType === "repository") {
        return <EventComp eventName="创建" eventRef="" eventRepo={eventRepo} />;
      } else if (eventPayloadType === "branch") {
        return (
          <EventComp
            eventName="创建分支"
            eventRef={eventRef}
            eventRepo={eventRepo}
          />
        );
      } else if (eventPayloadType === "tag") {
        return (
          <EventComp
            eventName="创建标签"
            eventRef={eventRef}
            eventRepo={eventRepo}
          />
        );
      } else {
        return <EventComp eventName="" eventRef="" eventRepo={eventRepo} />;
      }
    case EventType.DeleteEvent:
      if (eventPayloadType === "branch") {
        return (
          <EventComp
            eventName="删除分支"
            eventRef={eventRef}
            eventRepo={eventRepo}
          />
        );
      } else if (eventPayloadType === "tag") {
        return (
          <EventComp
            eventName="删除标签"
            eventRef={eventRef}
            eventRepo={eventRepo}
          />
        );
      } else {
        return <EventComp eventName="" eventRef="" eventRepo={eventRepo} />;
      }
    case EventType.PushEvent:
      return (
        <EventComp
          eventName="提交到分支"
          eventRef={
            eventRef ? eventRef.split("/")[eventRef.split("/").length - 1] : ""
          }
          eventRepo={eventRepo}
        />
      );
    case EventType.ReleaseEvent:
      return (
        <EventComp
          eventName="发布版本"
          eventRef={eventTagName}
          eventRepo={eventRepo}
        />
      );
    case EventType.PullRequestReviewCommentEvent:
      switch (eventActionType) {
        case "created":
          return (
            <EventComp
              eventName="创建拉取请求审查评论在"
              eventRef=""
              eventRepo={eventRepo}
            />
          );
        case "edited":
          return (
            <EventComp
              eventName="编辑拉取请求审查评论在"
              eventRef=""
              eventRepo={eventRepo}
            />
          );
        case "deleted":
          return (
            <EventComp
              eventName="删除拉取请求审查评论在"
              eventRef=""
              eventRepo={eventRepo}
            />
          );
        default:
          return (
            <EventComp
              eventName="创建拉取请求审查评论在"
              eventRef=""
              eventRepo={eventRepo}
            />
          );
      }
    case EventType.PullRequestReviewEvent:
      switch (eventActionType) {
        case "submitted":
          return (
            <EventComp
              eventName="提交拉取请求审查在"
              eventRef=""
              eventRepo={eventRepo}
            />
          );
        case "edited":
          return (
            <EventComp
              eventName="编辑拉取请求审查在"
              eventRef=""
              eventRepo={eventRepo}
            />
          );
        case "dismissed":
          return (
            <EventComp
              eventName="取消拉取请求审查在"
              eventRef=""
              eventRepo={eventRepo}
            />
          );
        default:
          return (
            <EventComp
              eventName="提交拉取请求审查在"
              eventRef=""
              eventRepo={eventRepo}
            />
          );
      }
    case EventType.PullRequestEvent:
      return (
        <PullRequestEventComp
          eventActionType={eventActionType}
          eventRepo={eventRepo}
        />
      );
    case EventType.PublicEvent:
      return <EventComp eventName="公开" eventRef="" eventRepo={eventRepo} />;
    case EventType.ProjectEvent:
      return <ProjectEventComp eventActionType={eventActionType} />;
    case EventType.ProjectColumnEvent:
      return <ProjectEventComp eventActionType={eventActionType} />;
    case EventType.ProjectCardEvent:
      return <ProjectEventComp eventActionType={eventActionType} />;
    case EventType.MarketplacePurchaseEvent:
      return <MarketplacePurchaseEventComp eventActionType={eventActionType} />;
    case EventType.GollumEvent:
      return <GollumEventComp eventActionType={eventActionType} />;
    case EventType.InstallationEvent:
      return <InstallationEventComp eventActionType={eventActionType} />;
    case EventType.InstallationRepositoriesEvent:
      return (
        <InstallationRepositoriesEventComp eventActionType={eventActionType} />
      );
    case EventType.ForkEvent:
      return <ForkEventComp eventRepo={eventRepo} userName={userName} />;
    case EventType.OrgBlockEvent:
    case EventType.MemberEvent:

    case EventType.IssuesEvent:
    case EventType.IssueCommentEvent:

    case EventType.CommitCommentEvent:
    default:
      return <EventComp eventName="" eventRef="" eventRepo={eventRepo} />;
  }
};

const ForkEventComp = props => {
  return (
    <View>
      <Text style={styles.eventRepo}>
        <Text style={styles.eventOther}>从</Text>
        {props.eventRepo}
        <Text style={styles.eventOther}>{" 创建分支 "}</Text>
        {`${props.userName}/${
          props.eventRepo.split("/")[props.eventRepo.split("/").length - 1]
        }`}
      </Text>
    </View>
  );
};

const InstallationRepositoriesEventComp = props => {
  return (
    <View>
      <Text style={styles.eventOther}>{`${
        props.eventActionType
      } repository from an installation `}</Text>
    </View>
  );
};

const InstallationEventComp = props => {
  return (
    <View>
      <Text style={styles.eventOther}>{`${
        props.eventActionType
      } an GitHub App `}</Text>
    </View>
  );
};

const GollumEventComp = props => {
  return (
    <View>
      <Text style={styles.eventOther}>{`${
        props.eventActionType
      } a wiki page `}</Text>
    </View>
  );
};

const MarketplacePurchaseEventComp = props => {
  return (
    <View>
      <Text style={styles.eventOther}>{`${
        props.eventActionType
      } marketplace plan `}</Text>
    </View>
  );
};

const ProjectEventComp = props => {
  return (
    <View>
      <Text style={styles.eventOther}>{`${
        props.eventActionType
      } a project `}</Text>
    </View>
  );
};

const PullRequestEventComp = props => {
  return (
    <View>
      <Text style={styles.eventRepo}>
        <Text style={styles.eventOther}>{`${
          props.eventActionType
        } pull request `}</Text>
        {props.eventRepo}
      </Text>
    </View>
  );
};

const EventComp = props => {
  return (
    <View>
      <Text style={styles.eventRepo}>
        <Text style={styles.eventOther}>{props.eventName}</Text>
        <Text style={styles.eventOther}>
          {props.eventRef ? ` ${props.eventRef} 在` : ""}
        </Text>
        {props.eventRepo}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  eventRepo: {
    fontSize: scaleSize(30),
    color: "black",
    fontWeight: "bold"
  },
  eventOther: { fontWeight: "normal" }
});

export default getEvent;
