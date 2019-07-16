class EnvironmentResolver {

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

module.exports = EnvironmentResolver;