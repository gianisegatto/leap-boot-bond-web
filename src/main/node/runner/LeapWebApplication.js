const express = require("express");
const RouterCreator = require("./creator/RouterCreator");
const AppCreator = require("./creator/AppCreator");
const EnvironmentResolver = require("./resolver/EnvironmentResolver");
const LeapApplication = require("leap-runner").LeapApplication;
const EnvironmentLoader = require("leap-core").EnvironmentLoader;

class LeapWebApplication {

    static run() {

        const router = RouterCreator.create(express);

        const components = LeapApplication.start([router]);

        const app = AppCreator.create(express, components);

        const environment = new EnvironmentLoader().load();

        const serverPort = EnvironmentResolver.getServerPort(environment);
        const applicationName = EnvironmentResolver.getApplicationName(environment);

        app.listen(serverPort, () => {
            console.info(applicationName + " running on port: " + serverPort);
        });
    }
}

module.exports = LeapWebApplication;