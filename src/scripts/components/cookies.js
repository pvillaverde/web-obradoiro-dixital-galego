export default class Cookies extends HTMLElement {
  connectedCallback() {
    const btn = this.querySelector("button");
    btn.addEventListener("click", () => this.accept());

    if (this.isAccepted()) {
      this.style.display = "none";
    }
  }

  accept() {
    localStorage.setItem("cookies-message", "hide");
    this.style.display = "none";
  }
  isAccepted() {
    const accepted = localStorage.getItem("cookies-message");
    return accepted === "hide";
  }
}
