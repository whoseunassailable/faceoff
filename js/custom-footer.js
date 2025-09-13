class CustomFooter extends HTMLElement {
  connectedCallback() {
    fetch("custom-footer.html")
      .then((response) => response.text())
      .then((data) => {
        this.innerHTML = data;
      })
      .catch((error) => console.error("Error loading footer:", error));
  }
}

customElements.define("custom-footer", CustomFooter);
