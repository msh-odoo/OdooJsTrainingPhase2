import { BaseComponent } from "../components/base_component.js";
import { Content } from "../components/content/content.js";
import { Header } from "../components/header/header.js";
import { Footer } from "../components/footer/footer.js";
import { rpc } from "../core/rpc.js";
import { json_node_to_xml } from "../core/utils.js";

// TODO: MSH: Add unit tests, maybe use Qunit lib for testing

export class App extends BaseComponent {
    async mount(target) {
        await super.mount(target);
        // TODO: MSH: I don't like this, someday we will make it declarative so it is defined in xml but we need to
        // develop our own templating engine in that case to handle declarative syntax like we did in owl
        this.header = new Header(this);
        this.header.mount(this.el);
        this.content = new Content(this);
        this.content.mount(this.el);
        this.footer = new Footer(this);
        this.footer.mount(this.el);
    }
}
App.template = "App";

(function () {
    const setup = async () => {
        let xml = await rpc("/load-qweb", {});
        const qweb = new QWeb2.Engine();
        // qweb.add_template(xml);
        // xml = json_node_to_xml(xml);
        qweb.add_template(xml);

        // create instance of App and get element of App and push it into o_main element
        App.env = { qweb: qweb };
        const app = new App(null);
        app.mount(document.body);
    };

    setup();
})();
