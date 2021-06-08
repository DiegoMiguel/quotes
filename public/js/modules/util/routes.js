import about from "../pages/about.js";
import help from "../pages/help.js";
import home from "../pages/home.js";
import quote from "./quote.js";

const routes = {
  "/": home,
  "/about": about,
  "/help": help,
};

function render(pagePath) {
  let title = document.getElementById("page-title");
  let main = document.querySelector("main");

  title.innerHTML = routes[pagePath].title;
  main.innerHTML = routes[pagePath].content;

  if (pagePath == "/") {
    document.querySelector("form").onsubmit = (event) => {
      event.preventDefault();
      quote();
    };
  }
}

function contains(path) {
  return !!routes[path];
}

export { render, contains };