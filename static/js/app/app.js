import { BaseComponent } from "../components/base_component.js";
import { rpc } from "../core/rpc.js";
import { registry } from "../core/registry.js";


// TODO: MSH: Add unit tests, maybe use Qunit/jest/mocha test runner lib for testing

// TODO: MSH: Introduce model part which stores data of application, we should use MVVM pattern

export class App extends BaseComponent {
    async mount(target) {
        await super.mount(target);
        const screenRegistry = registry.category("screens");
        const Shop = screenRegistry.get('shop');
        this.currentScreen = new Shop(this);
        await this.currentScreen.mount(this.el);
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    async onChangeScreen(ev) {
        // TODO: MSH: When screen is changed, always add some state to url so that refreshing a browser
        // should load proper screen from url state
        this.currentScreen.destroy();
        const screenName = ev.detail.screen_name;
        const params = ev.detail.params;
        const screenRegistry = registry.category("screens");
        const CurrentScreen = screenRegistry.get(screenName);
        this.currentScreen = new CurrentScreen(this, params);
        await this.currentScreen.mount(this.el);
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
