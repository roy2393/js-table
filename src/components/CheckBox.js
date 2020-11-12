import { Component } from "./Component";

export default class InputBox extends Component {
  constructor(parent, config, data) {
    super();
    this.rootTag = "input";
    this.rootClass = "form-input";
    this.type = "checkbox";
    this.parent = parent;
    this.data = data;
    this.value = data;
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

  addLabel() {
    if (this.config && this.config.label) {
      this.parent.appendChild(document.createTextNode(this.config.label));
    }
  }

  initializeRootNode() {
    if (!this.node) {
      this.node = document.createElement(this.getRootTag());
      this.node.setAttribute("type", "checkbox");
      this.node.id = this.getId();
      this.node.checked = this.value;
      this.node.className = this.getDefaultClass();

      this.addLabel();
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
    this.node.addEventListener("change", e => {
      console.log("checkbox change", e.target.checked);
      this.value = e.target.checked;
    });
  }
}
