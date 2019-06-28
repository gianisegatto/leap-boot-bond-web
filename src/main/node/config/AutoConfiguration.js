const express = require("express");
const Component = require("leap-core").Component;
const MySqlDatasourceFactory = require("leap-web").AppBuilder;

const ROUTER = "router";
class AutoConfiguration {
    
    static preLoad(environment) {
    }

    static postLoad(components) {

        const routers = components.filter(component => component.name.lowerCase.includes(ROUTER));

        const appBuilder = new AppBuilder(express());
        routers.forEach(router => appBuilder.addRouter(router.getInstance()));

        return appBuilder.build();
    }
}

module.exports = AutoConfiguration;