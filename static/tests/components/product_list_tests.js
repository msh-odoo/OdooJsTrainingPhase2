
import { ProductList } from "../../js/components/product_list/product_list.js";
import { rpc } from "../../js/core/rpc.js";

// function add(a, b) {
//     return a + b;
// }

let datas;
let target;
let env;
QUnit.module('ProductList', (hooks) => {
    hooks.before(async () => {
        // TODO: MSH: Prepare env which is called in setup which is called as first file in test and it will will have async function
        // which load all templates and then QUnit.start is called
        // set Qunit.config.autostart to false in setup.js file

        target = document.querySelector("#qunit-fixture");
        let xml = await rpc("/load-qweb", {});
        const qweb = new QWeb2.Engine();
        qweb.add_template(xml);
        env = { qweb: qweb };
    });
    hooks.beforeEach(async () => {
        datas = {

        };
    });

    QUnit.test('Simple UI test for ProductList component', async function (assert) {
        ProductList.env = env;
        const productList = new ProductList(null);
        await productList.mount(target);
        debugger;
    });

    // QUnit.test('two numbers', function (assert) {
    //     assert.equal(add(1, 2), 3);
    // });
});
