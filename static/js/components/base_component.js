export class BaseComponent {
    willStart() {
        return Promise.resolve();
    }
    async mount(target) {
        await this.willStart();
        this.render();
        target.appendChild(this.el);
    }
    render() {
        this.el = document.createElement("div");
    }
}
