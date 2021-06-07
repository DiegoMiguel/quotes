import router from "./modules/util/routes.js";
import quote from "./modules/util/quote.js";

const quotesForm = document.querySelector("form");

quotesForm.onsubmit = (event) => {
  event.preventDefault();
  quote();
};

document.querySelectorAll("nav a").forEach(
  (a) =>
    (a.onclick = (event) => {
      event.preventDefault();
      router(event.target.pathname);
    })
);

window.onload = () => {
  history.replaceState(
    { path: document.location.pathname },
    "",
    document.location.href
  );
};