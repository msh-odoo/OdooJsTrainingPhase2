import { BaseComponent } from "./base_component.js";

export class Footer extends BaseComponent {
    render() {
        super.render(...arguments);
        this.el.classList.add('o_footer');
    }
}
