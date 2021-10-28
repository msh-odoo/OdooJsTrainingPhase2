import { BaseComponent } from "./base_component.js";

export class Content extends BaseComponent {
    render() {
        super.render(...arguments);
        this.el.classList.add('o_body');
    }
}