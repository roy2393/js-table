import InputBox from "./components/InputBox";
import CheckBox from "./components/CheckBox";
import SelectBox from "./components/SelectBox";
import Table from "./components/Table";

export default class App {
  constructor(ele, data) {
    console.log("APP");
    this.root = ele;
    this.data = data;
  }
  table;
  handleSearchInput(e) {
    console.log("search text", e.target.value);
  }

  handleShowSelectInput(e) {
    console.log("show select", e.target.checked);
  }

  setupHeaders() {
    console.log("setupHeaders");
    const div = document.createElement("div");
    div.className = "header";

    const searchInput = new InputBox(div).getNode();
    searchInput.addEventListener("input", this.handleSearchInput);

    const checkboxContainer = document.createElement("div");
    checkboxContainer.className = "select-cont";
    const showSelect = new CheckBox(div, { label: "Show Selected" }).getNode();
    showSelect.addEventListener("change", this.handleShowSelectInput);

    checkboxContainer.appendChild(showSelect);
    // const selectBox = new SelectBox().getNode();
    div.appendChild(searchInput);
    div.appendChild(checkboxContainer);
    // div.appendChild(selectBox);

    this.root.appendChild(div);
  }

  handleTableInput(value, id) {
    console.log("handleTableInput", value, id);
  }

  renderCellInput(parent, id, rowData) {
    const {
      field: { defaultValue, type, options }
    } = rowData;
    const input = new InputBox(parent).getNode();
    input.addEventListener("input", e =>
      this.handleTableInput(e.target.value, id)
    );
    input.value = defaultValue;

    if (!rowData.selected) input.disabled = true;

    return input;
  }

  renderCellSelect(parent, id, rowData) {
    const {
      field: { defaultValue, options }
    } = rowData;
    const selectBox = new SelectBox(
      parent,
      {
        options: options.map(value => ({ value, label: value }))
      },
      defaultValue
    ).getNode();
    selectBox.addEventListener("change", e =>
      this.handleTableInput(e.target.value, id)
    );

    if (!rowData.selected) selectBox.disabled = true;

    return selectBox;
  }

  renderCellCompoent(parent, id, data) {
    if (id === "value") {
      const {
        field: { defaultValue, type, options }
      } = data;
      console.log(this);
      switch (type) {
        case "text":
          return this.renderCellInput(parent, id, data);
        case "select":
          return this.renderCellSelect(parent, id, data);
      }
    }
  }

  setupTable() {
    const div = document.createElement("div");
    div.className = "container";

    this.table = new Table(
      div,
      {
        headerData: [
          {
            label: "Key",
            id: "key"
          },
          {
            label: "Value",
            id: "value",
            renderComponent: this.renderCellCompoent.bind(this)
          },
          {
            label: "Description",
            id: "description"
          }
        ],
        select: true,
        id: "p-t"
      },
      this.data
    ).getNode();

    div.appendChild(this.table);
    this.root.appendChild(div);
  }

  setupFooter() {
    const div = document.createElement("div");
    div.className = "footer";
    this.root.appendChild(div);
  }

  init() {
    this.setupHeaders();
    this.setupTable();
    this.setupFooter();
  }
}
