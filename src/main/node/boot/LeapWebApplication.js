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

        const serverPort = LeapWebApplication.getServerPort(environment);
        const applicationName = LeapWebApplication.getApplicationName(environment);

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

        return appBuilder.build();
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

module.exports = LeapWebApplication;