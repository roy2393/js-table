// Import stylesheets
import "./style.css";
import App from "./src/App";

// Write Javascript code!
var data = {
  config: [
    {
      key: "product_count",
      label: "Products Count",
      field: {
        defaultValue: "30",
        type: "text"
      },
      description: "Max Products Count",
      selected: true
    },
    {
      key: "product_type",
      label: "Products Type",
      field: {
        defaultValue: "",
        type: "text"
      },
      description: "Gives Product Type information",
      selected: false
    },
    {
      key: "listing_count",
      label: "Listing Count",
      field: {
        defaultValue: "3",
        type: "text"
      },
      description: "Number of listings per product",
      selected: false
    },
    {
      key: "geo_browse",
      label: "Geo Browse",
      field: {
        defaultValue: "disabled",
        type: "select",
        options: ["enabled", "disabled"]
      },
      description: "Get zone level ordering of products",
      selected: true
    },
    {
      key: "client_tag",
      label: "Client Tag",
      field: {
        defaultValue: "mobile-apps-retail",
        type: "text"
      },
      description: "Client Tag",
      selected: false
    },
    {
      key: "pincode",
      label: "Pincode",
      field: {
        defaultValue: "560103",
        type: "text"
      },
      description: "Pincode to search in",
      selected: true
    },
    {
      key: "disable_cache",
      label: "Disable Cache",
      field: {
        defaultValue: "false",
        type: "select",
        options: ["true", "false"]
      },
      description: "Disable augmentation cache",
      selected: false
    }
  ]
};
var ele = document.getElementById("app");

var instance = new App(ele, data.config);
instance.init();
