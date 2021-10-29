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
        const doc = new DOMParser().parseFromString(html, "text/html");
        this.el = doc.body.firstElementChild;
        // TODO: MSH: What if there are multiple root node of component template
        // for (let child of doc.body.childNodes) {
        //     if (this.el) {
        //         this.el.insertAdjacentHTML("afterend", child);
        //     } else {
        //         this.el = child;
        //     }
        // }
        // TODO: MSH: Do not always append, position params should be passed in mount and element should be mounted at that position
        target.appendChild(this.el);
    }
    render() {
        return this.env.qweb.render(this.template, { widget: this });
    }
}
BaseComponent.template = null;
