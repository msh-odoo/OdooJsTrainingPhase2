export class BaseComponent {
    constructor(parent) {
        this.parent = parent;
        this.template = this.constructor.template;
        if (parent) {
            this.env = parent.env;
        }
        else {
            // we are the root component
            this.env = this.constructor.env;
        }
    }
    willStart() {
        return Promise.resolve();
    }
    async mount(target) {
        await this.willStart();
        const html = this.render();
        const doc = new DOMParser().parseFromString(html, "text/xml");
        debugger;
        target.appendChild(doc.firstChild);
        // we assume rendered component will have only one root element so we considered firstElementChild
        this.el = doc.firstChild;
    }
    render() {
        return this.env.qweb.render(this.template, { widget: this });
    }
}
BaseComponent.template = null;
