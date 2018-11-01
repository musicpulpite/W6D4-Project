const DOMNodeCollection = require("./dom_node_collection.js");


window.$l = (selector) => {
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }

  const nodeList = document.querySelectorAll(selector);
  const nodeArr = Array.from(nodeList);
  return new DOMNodeCollection(nodeArr);
};
