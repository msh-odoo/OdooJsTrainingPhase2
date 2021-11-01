import { BaseComponent } from "../base_component.js";
import { rpc } from "../../core/rpc.js";

// TODO: this should be renamed to ProductList component and this hsould have Product as child component

export class Content extends BaseComponent {
    async willStart() {
        const data = await rpc("/get_products", {});
        this.products = JSON.parse(data).products;
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * Finds product ID from event detail and opens product description page
     * @param {MouseEvent} ev 
     */
    onClickProduct(ev) {
        const productId = ev.target.dataset.id;
        this.trigger('change-screen', { screen_name: 'product_details', product_id: productId });
    }
}
Content.template = "Content";
Content.events = {
    'click .product-entry': 'onClickProduct',
};
