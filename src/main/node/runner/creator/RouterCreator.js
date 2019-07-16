const Component = require("leap-core").Component;

class RouterCreator {

    static create(express) {
        const routerComponent = new Component("router", "leap-web/App", null, []);
        routerComponent.setInstance(express.Router());
        return routerComponent;
    }
}

module.exports = RouterCreator;