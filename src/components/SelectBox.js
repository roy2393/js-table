import { Component } from "./Component";

export default class SelectBox extends Component {
  constructor(parent, config, value) {
    super();
    this.rootTag = "select";
    this.rootClass = "form-input";
    this.parent = parent;
    this.data = value;
    this.value = value;
    this.options = config.options || [
      { value: 1, label: "one" },
      { value: 2, label: "Two" }
    ];
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

  getOptionsNode(value, label) {
    let option = document.createElement("OPTION");
    option.setAttribute("value", value);
    let labelNode = document.createTextNode(label);
    option.appendChild(labelNode);
    return option;
  }

  initializeRootNode() {
    if (!this.node) {
      this.node = document.createElement(this.getRootTag());
      this.node.id = this.getId();

      this.options.forEach(option => {
        this.node.appendChild(this.getOptionsNode(option.value, option.label));
      });
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
    this.node.addEventListener("change", e => {
      console.log("select", e.target.value);
      this.value = e.target.value;
    });
  }
}
