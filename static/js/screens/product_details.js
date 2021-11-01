import { BaseComponent } from "../components/base_component.js";
import { ProductDetails } from "../components/product_detail/product_detail.js";
import { Header } from "../components/header/header.js";
import { Footer } from "../components/footer/footer.js";
import { registry } from "../core/registry.js";

export class ProductDetailsScreen extends BaseComponent {
    constructor(parent, params) {
        super(...arguments);
        this.productId = params.product_id;
    }
    async mount(target) {
        await super.mount(target);
        // TODO: MSH: I don't like this, someday we will make it declarative so it is defined in xml but we need to
        // develop our own templating engine in that case to handle declarative syntax like we did in owl
        this.header = new Header(this);
        await this.header.mount(this.el);
        this.content = new ProductDetails(this, this.productId);
        await this.content.mount(this.el);
        this.footer = new Footer(this);
        await this.footer.mount(this.el);
    }
}

registry.category("screens").add("product_details", ProductDetailsScreen);
