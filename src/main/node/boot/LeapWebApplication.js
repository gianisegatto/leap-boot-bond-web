const express = require("express");
const Component = require("leap-core").Component;
const AppBuilder = require("leap-web").AppBuilder;
const LeapApplication = require("leap-boot").LeapApplication;
const EnvironmentLoader = require("leap-core").EnvironmentLoader;

const ROUTER = "routerbuilder";
class LeapWebApplication {

    static start() {

        const router = this.createRouter();

        const components = LeapApplication.start([router]);

        const app = this.createApp(components);

        const environment = new EnvironmentLoader().load();

        const serverPort = getServerPort(environment);
        const applicationName = this.getApplicationName(environment);

        app.listen(serverPort, () => {
            console.info(applicationName + " running on port: " + serverPort);
        });
    }

    static createRouter() {
        const routerComponent = new Component("router", "leap-web/App", null, []);
        routerComponent.setInstance(express.Router());
        return routerComponent;
    }

    static createApp(components) {

        const routers = components.filter(component => component.name.toLowerCase().includes(ROUTER));

        const appBuilder = new AppBuilder(express());
        routers.forEach(router => appBuilder.addRouter(router.getInstance().build()));

        const app = appBuilder.build();

        const appComponent = new Component("app", "leap-web/App", AppBuilder, []);
        appComponent.setInstance(app);

        return appComponent;
    }

    static getServerPort(environment) {
        if (environment.serverPort) {
            return environment.serverPort;
        } else {
            return 8080;
        }
    }

    static getApplicationName(environment) {
        if (environment.applicationName) {
            return environment.applicationName;
        } else {
            return "leap boot web app";
        }
    }
}

module.exports = AutoConfiguration;