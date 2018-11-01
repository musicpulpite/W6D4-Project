class DOMNodeCollection {
  constructor(arr){
    this.htmlElements = arr;
  }

  html(str) {
    if (str === undefined) {
      return this.htmlElements[0].innerHTML;
    }
    this.htmlElements.forEach((htmlNode) => htmlNode.innerHTML = str);
  }

  empty() {
    this.html("");
  }

  append(node) {
    this.htmlElements.forEach((htmlNode) => {
      node.htmlElements.forEach((element) => {
        htmlNode.innerHTML += element.outerHTML;
        }
      );
    });
  }

  attr(key, value){
    if (value) {
      this.htmlElements.forEach(( htmlNode ) => { htmlNode.setAttribute( key, value ); });
    } else {
      const attr_vals = this.htmlElements.map(( node ) => {
        return node.getAttribute( key );
      });
      return attr_vals;
    }
  }

  addClass(newClass) {
    this.htmlElements.forEach((htmlNode) => {
      htmlNode.className += " " + newClass;
      htmlNode.className = htmlNode.className.trim();
   });
  }

  removeClass(oldClass) {
    this.htmlElements.forEach((htmlNode) => {
      const indx = htmlNode.className.split(" ").indexOf(oldClass);
      let classArr = htmlNode.className.split(" ");
      classArr.splice(indx, 1);
      htmlNode.className = classArr.join(" ");
    });
  }

  children(){
    let childrenDOMNodeCollection = [];
    this.htmlElements.forEach( htmlNode => {
      let childrenArr = Array.from(htmlNode.children);

      const nodeArr = childrenArr.map((htmlEl) => {
        return new DOMNodeCollection([htmlEl]);
      });
      childrenDOMNodeCollection = childrenDOMNodeCollection.concat(nodeArr);
    });

    return childrenDOMNodeCollection;
  }

  parent() {
    let parentsArr = this.htmlElements.map(htmlNode => htmlNode.parentElement);
    parentsArr = [...new Set(parentsArr)];

    return parentsArr.map((htmlNodeParent) => new DOMNodeCollection([htmlNodeParent]));
  }

  find(selector) {
    // const theObeARr = [];
    // this.htmlElements.querySelectorAll(selector).map

    let selectedDOMNodeCollection = [];
    this.htmlElements.forEach( htmlNode => {
      let childrenArr = Array.from(htmlNode.querySelectorAll(selector));

      const nodeArr = childrenArr.map((htmlEl) => {
        return new DOMNodeCollection([htmlEl]);
      });
      selectedDOMNodeCollection = selectedDOMNodeCollection.concat(nodeArr);
    });

    return selectedDOMNodeCollection;
  }

  remove(){
    // this.parent().forEach( parent => parent.empty());
    this.htmlElements.forEach(htmlNode => htmlNode.outerHTML = "")
  }
}



module.exports = DOMNodeCollection;
