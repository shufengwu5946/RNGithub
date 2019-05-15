import React, { Component } from "react";
import { Modal, View } from "react-native";

export default class ModalMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  showModalMenu() {
    this.setState({ visible: true });
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.visible}
        onRequestClose={() => {
          this.setState({ visible: false });
        }}
        presentationStyle="formSheet"
      >
        {this.props.children}
      </Modal>
    );
  }
}
