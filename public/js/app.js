import { render, contains } from "./modules/util/routes.js";
import quote from "./modules/util/quote.js";

document.querySelectorAll("nav a").forEach((a) => {
  a.onclick = (event) => {
    event.preventDefault();

    let currentPath = history.state.path,
      selected = event.target,
      destinyPath = selected.pathname;

    if (currentPath != destinyPath) {
      document.querySelector('nav a[class="selected"]').className = "";
      selected.className = "selected";

      render(destinyPath);
      window.history.pushState({ path: destinyPath }, "", `${destinyPath}`);
    }
  };
});

window.onload = () => {
  let path = document.location.pathname;

  if (path == "/") {
    document.querySelector("form").onsubmit = (event) => {
      event.preventDefault();
      quote();
    };
  }

  if (contains(path)) {
    document.querySelector(`nav a[href="${path}"]`).className = "selected";
  }

  history.replaceState({ path }, "", document.location.href);
};

window.onpopstate = (event) => {
  let destinyPath = event.state.path;

  document.querySelector('nav a[class="selected"]').className = "";
  document.querySelector(`nav a[href="${destinyPath}"]`).className = "selected";

  render(destinyPath);
};