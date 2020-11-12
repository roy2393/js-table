let ID_COUNTER = 0;
export class Component {
  constructor() {
    this.node = null;
    this.tag = "";
    this.id = "";
    this.config = null;
  }

  getId() {
    if (!this.id) this.id = this.constructor.name + "-" + ++ID_COUNTER;
    return this.id;
  }

  getNode() {
    throw new Error("Component must implment " + this.getNode());
  }

  getHTML() {
    throw new Error("Component must implment " + this.getHTML());
  }

  setConfig(config) {
    this.config = config;
  }

  getConfig() {
    return this.config;
  }

  onChange() {
    throw new Error("Component must implment " + this.onChange());
  }
}
