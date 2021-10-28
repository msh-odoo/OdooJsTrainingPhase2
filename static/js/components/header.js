import { BaseComponent } from "./base_component.js";

export class Header extends BaseComponent {
    render() {
        super.render(...arguments);
        this.el.classList.add("o_header");
    }
}
