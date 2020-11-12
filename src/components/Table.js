import { Component } from "./Component";
import CheckBox from "./CheckBox";

export default class Table extends Component {
  constructor(parent, config, data) {
    super();
    this.rootTag = "table";
    this.rootClass = "table";
    this.parent = parent;
    this.data = data;
    this.value = "";
    this.setConfig(config);
  }
  getRootTag() {
    return this.rootTag;
  }
  getHeaderData() {
    if (this.config && Array.isArray(this.config.headerData))
      return this.config.headerData;
    return [];
  }
  getDefaultClass() {
    return this.rootClass;
  }

  setConfig(config) {
    this.config = config;
  }

  addHeaders() {
    const headerContainer = document.createElement("TR");
    if (this.config.select) {
      headerContainer.append(document.createElement("TH"));
    }

    this.getHeaderData().forEach(data => {
      const headerCell = document.createElement("TH");
      var label = document.createTextNode(data.label);
      headerCell.appendChild(label);
      headerContainer.append(headerCell);
    });

    this.node.appendChild(headerContainer);
  }
  initializeRootNode() {
    if (!this.node) {
      this.node = document.createElement(this.getRootTag());
      this.node.id = this.getId();
      this.node.className = this.getDefaultClass();

      this.addHeaders();
      this.renderRows();
    }
    return this.node;
  }

  getNode() {
    if (this.node) return this.node;
    this.initializeRootNode();
    this.addEventListener();
    return this.node;
  }

  renderSelect(parent, rowData) {
    if (this.config && this.config.select) {
      const cell = document.createElement("TD");
      const select = new CheckBox(cell, {}, rowData.selected).getNode();
      cell.appendChild(select);
      parent.appendChild(cell);
    }
  }

  renderRow(parent, rowData) {
    this.renderSelect(parent, rowData);

    this.getHeaderData().forEach(column => {
      const cell = document.createElement("TD");

      if (column.renderComponent) {
        cell.append(column.renderComponent(cell, column.id, rowData));
      } else {
        var label = document.createTextNode(rowData[column.id]);
        cell.append(label);
      }

      parent.appendChild(cell);
    });
  }

  getRowId(index) {
    let id = this.getId();
    if (this.config && this.config.id) {
      id = this.config.id;
    }

    return `${id}-${index}`;
  }

  renderRows() {
    if (Array.isArray(this.data)) {
      const tableBody = document.createElement("TBODY");
      this.data.forEach((rowData, index) => {
        const rowContainer = document.createElement("TR");
        rowContainer.id = this.getRowId(index);
        this.renderRow(rowContainer, rowData);
        tableBody.appendChild(rowContainer);
      });

      this.node.appendChild(tableBody);
    }
  }

  updateData(data) {
    this.data = data;
    this.renderRows();
  }

  addEventListener() {}
}
