import { BaseComponent } from "./components/base_component.js";
import { Content } from "./components/content.js";
import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";

export class App extends BaseComponent {
    async mount(target) {
        await super.mount(target);
        this.header = new Header();
        this.header.mount(this.el);
        this.content = new Content();
        this.content.mount(this.el);
        this.footer = new Footer();
        this.footer.mount(this.el);
    }
    render() {
        super.render(...arguments);
        this.el.classList.add('o_main');
    }
}

(function () {
    const setup = () => {
        // create instance of App and get element of App and push it into o_main element
        const app = new App(document.body);
        app.mount(document.body);
    };

    setup();
})();
