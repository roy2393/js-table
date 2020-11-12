import { Component } from "./Component";

export default class InputBox extends Component {
  constructor(parent, config, data) {
    super();
    this.rootTag = "input";
    this.rootClass = "form-input";
    this.parent = parent;
    this.data = data;
    this.value = "";
    this.setConfig(config);
  }
  getRootTag() {
    return this.rootTag;
  }

  getDefaultClass() {
    return this.rootClass;
  }

  setConfig(config) {
    this.config = config;
  }

  initializeRootNode() {
    if (!this.node) {
      this.node = document.createElement(this.getRootTag());
      this.node.id = this.getId();
      this.node.className = this.getDefaultClass();
    }
    return this.node;
  }

  getNode() {
    if (this.node) return this.node;
    this.initializeRootNode();
    this.addEventListener();
    return this.node;
  }

  addEventListener() {
    this.node.addEventListener("input", e => {
      console.log("input", e.target.value);
      this.value = e.target.value;
    });
  }
}
