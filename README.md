# Alert
This project is still under construction. We are getting there!

Welcome to leap runner web express!
===================
I'm here to help the leap runner framework stack takes care of creating your [Express](https://expressjs.com/) application.
So following some standards I'll find your routers and stick them to the App.
I also uses [leap-runner](https://github.com/gianisegatto/leap-runner), [leap-context](https://github.com/gianisegatto/leap-context), [leap-web-express](https://github.com/gianisegatto/leap-web-express) and others leap modules to inject all of your module dependencies and startup your Express application.

## Before you start I recommend you have a look to [leap-context](https://github.com/gianisegatto/leap-context) it's will give a better idea how the dependency injection works on leap.

```js
const LeapWebApplication = require("leap-runner-web-express").LeapWebApplication;

LeapWebApplication.run();

```
If everything in your application is right you should get back from contextLoader.load a list of instancies of your application classes.

You should see a message like this:
```bash
Cheers mate. Leap is up and running 🍻
YOUR-APP-NAME running on port: 3333
```

## Application structure
The best way leap-runner-web-express works with is following the example below, but you can have a bit more freedom if you don't want to follow it.
```
----> src
--------> main
-------------> node
------------------> router
-------------------------> CreateRouterBuilder.js
------------------> service
--------------------------> CreateService.js
------------------> repository
-----------------------------> CreateRepository.js
-------------> resources
-----------------------> application.json
-----------------------> application-local.json
-----------------------> application-development.json
index.js
```

## Let's have a look to the CreateRouterBuilder.js all of your routers should follow the same standard.

#### This is the /src/mains/node/router/CreateRouterBuilder.js file:
```js
const promiseHandler = require("leap-web-express").promiseHandler;

class CreateRouterBuilder {
    
    constructor(router, createService) {
        this.router = router;
        this.createService = createService;
    }

    build() {
        this.router.post("/", (req, res, next) => {
            promiseHandler.handle(this.createService.insert(req.body), req, res, next, 204);
        })
        return this.router;
    }
}

module.exports = CreateRouterBuilder;
```

#### Explanation
As you can see your RouterBuilder should at least expect the express router as constructor parameter and should always have a method called build building the route to the operation you want to execute.

On this example we want to create something calling the createService, so it's expecting as constructor parameter the createService as well.

Behind the scenes leap-runner-web-express will execute leap-runner, which will execute leap-context in order to create all of your dependencies and inject it. After that it will find every RouterBuilder instance, call the method build, create an Express app and add the router from the build method into the app.
Something like this:
```js
    const express = require("express");
    const router = express.Router();
    const app = express();
    const createRouterBuilder = new CreateRouterBuilder(router, createService);

    app.use(createRouterBuilder.build());

    app.listen(3333, () => {
            console.info("YOUR-APP-NAME" + " running on port: " + serverPort);
    });
```
### Remember it's just and explanation the framework is doing much more.

## If you whant to see an application example using it. Please have a look to the [leap-pub-client-demo](https://github.com/gianisegatto/pub-leap-client-demo)

## Feel free to bring any suggestion or sending a pull request and as soon I get more inspired I'll update better this page