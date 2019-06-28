const express = require("express");
const Component = require("leap-core").Component;
const AppBuilder = require("leap-web").AppBuilder;

const ROUTER = "routerbuilder";
class AutoConfiguration {

    static preLoad(environment) {
        const routerComponent = new Component("router", "leap-web/App", null, []);
        routerComponent.setInstance(express.Router());
        return routerComponent;
    }

    static postLoad(components) {

        const routers = components.filter(component => component.name.toLowerCase().includes(ROUTER));

        const appBuilder = new AppBuilder(express());
        routers.forEach(router => appBuilder.addRouter(router.getInstance().build()));

        const app = appBuilder.build();

        const appComponent = new Component("app", "leap-web/App", AppBuilder, []);
        appComponent.setInstance(app);

        return appComponent;
    }
}

module.exports = AutoConfiguration;