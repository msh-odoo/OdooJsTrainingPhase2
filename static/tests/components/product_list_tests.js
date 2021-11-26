
import { ProductList } from "../../js/components/product_list/product_list.js";

// TODO: Intercept rpc method and check if route is handled in given mockRPC then call it and return it
// we will pass mockRPC function and will handle route and return response in all test case
// move rpc method in env, we will pass mockRPC in test env, our test environemtn's rpc method will first check
// whether route is handled in mockRPC then call it else we will raise error that route is not handled

let datas;
let target;
let env;
QUnit.module('ProductList', (hooks) => {
    hooks.before(async () => {
        target = document.querySelector("#qunit-fixture");
        env = { qweb: window.qweb };
    });
    hooks.beforeEach(async () => {
        datas = {

        };
    });

    // TODO: MSH: Create function like createProductList which will set env, create instance of productList
    // and mount to target, all test will call that method so we don't have to write same code everywhere
    QUnit.test('Simple UI test for ProductList component', async function (assert) {
        assert.expect(1);

        ProductList.env = env;
        const productList = new ProductList(null);
        await productList.mount(target);
        debugger;
        assert.ok(productList.el.classList.contains('o_content'), "should have o_content class");

        productList.destroy();
    });

});
