import { BaseComponent } from "../components/base_component.js";
import { Content } from "../components/content/content.js";
import { Header } from "../components/header/header.js";
import { Footer } from "../components/footer/footer.js";
import { rpc } from "../core/rpc.js";

// TODO: MSH: Add unit tests, maybe use Qunit/jest/mocha test runner lib for testing

// TOD: MSH: Instead of writing Header, Content and Footer, manage everything with screen, there will be
// registry of screens and we will call screen, initialize it and mount it in body
// on any screen we will call custom event change-screen and we will pass screen name in event detail
// this custom event change-screen is listened by window object here in App and handler will be here itself.

export class App extends BaseComponent {
    async mount(target) {
        await super.mount(target);
        // TODO: MSH: I don't like this, someday we will make it declarative so it is defined in xml but we need to
        // develop our own templating engine in that case to handle declarative syntax like we did in owl
        this.header = new Header(this);
        await this.header.mount(this.el);
        this.content = new Content(this);
        await this.content.mount(this.el);
        this.footer = new Footer(this);
        await this.footer.mount(this.el);
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    onChangeScreen(ev) {
        debugger;
        // TODO: Manage screens, instead of destorying current app, we will destroy screen and instantiate new screen
        this.destroy();
    }
}
App.template = "App";
App.events = {
    'change-screen': 'onChangeScreen',
};

(function () {
    const setup = async () => {
        let xml = await rpc("/load-qweb", {});
        const qweb = new QWeb2.Engine();
        qweb.add_template(xml);

        // create instance of App and get element of App and push it into o_main element
        App.env = { qweb: qweb };
        const app = new App(null);
        app.mount(document.body);
    };

    setup();
})();
