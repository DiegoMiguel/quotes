import about from '../pages/about.js'
import help from '../pages/help.js'
import home from '../pages/home.js'

const contents = {
    '/': home,
    '/about': about,
    '/help': help
};

const router = (destinyPath) => {
    let currentPath = history.state.path;

    if (currentPath != destinyPath) {
        render(destinyPath)
        window.history.pushState({path: destinyPath}, "", `${destinyPath}`);
    }
}

const render = (pagePath) => {
    let title = document.getElementById('page-title');
    let main = document.querySelector('main');

    title.innerHTML = contents[pagePath].title;
    main.innerHTML = contents[pagePath].content;
}

export default router;