import { BaseComponent } from "./components/base_component.js";
import { Content } from "./components/content/content.js";
import { Header } from "./components/header/header.js";
import { Footer } from "./components/footer/footer.js";

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

// TODO: MSH:: this should go inside rpc file, also make it service so it can be called from whole application
function jsonrpc(rpcId, url, params, settings = {}) {
    // const bus = env.bus;
    const XHR = window.XMLHttpRequest;
    const data = {
        id: rpcId,
        jsonrpc: "2.0",
        method: "call",
        params: params,
    };
    const request = settings.xhr || new XHR();
    let rejectFn;
    const promise = new Promise((resolve, reject) => {
        rejectFn = reject;
        // if (!settings.silent) {
        //     bus.trigger("RPC:REQUEST", data.id);
        // }
        // handle success
        request.addEventListener("load", () => {
            if (request.status === 502) {
                // If Odoo is behind another server (eg.: nginx)
                // bus.trigger("RPC:RESPONSE", data.id);
                reject(new Error());
                return;
            }
            const { error: responseError, result: responseResult } = JSON.parse(request.response);
            // bus.trigger("RPC:RESPONSE", data.id);
            if (!responseError) {
                return resolve(responseResult);
            }
            const error = Error(responseError);
            reject(error);
        });
        // handle failure
        request.addEventListener("error", () => {
            // bus.trigger("RPC:RESPONSE", data.id);
            reject(new Error());
        });
        // configure and send request
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));
    });
    promise.abort = function () {
        if (request.abort) {
            request.abort();
        }
        rejectFn(new Error("XmlHttpRequestError abort"));
    };
    return promise;
}

let rpcId = 0;
function rpc(route, params = {}, settings) {
    return jsonrpc(rpcId++, route, params, settings);
}

(function () {
    const setup = async () => {
        //TODO: MSH: load qweb template here and pass it in consturctor and manage it in environment of component

        
        // const xml = await fetch("/load-qweb", { method: "GET" });
        const xml = await rpc("/load-qweb", {});
        debugger;
        var qweb = new QWeb2.Engine();
        qweb.add_template(xml);
        // qweb.add_template(utils.json_node_to_xml(xml));

        // create instance of App and get element of App and push it into o_main element
        App.env = { qweb: qweb };
        const app = new App(null);
        app.mount(document.body);
    };

    setup();
})();
