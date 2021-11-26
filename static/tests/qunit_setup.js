import { rpc } from "../js/core/rpc.js";

// do not run tests automatically as we are going to load templates
QUnit.config.autostart = false;
QUnit.config.testTimeout = 1 * 60 * 1000;

async function setupTests() {
    let xml = await rpc("/load-qweb", {});
    const qweb = new QWeb2.Engine();
    qweb.add_template(xml);
    window.qweb = qweb;
}

(async () => {
    await setupTests();
    QUnit.start();
})();
