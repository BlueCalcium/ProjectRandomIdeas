# Webpack-Starter
Boilerplate for creating applications with Webpack. Based on the Webpack boilerplate creation guide from the Traversy Media Modern JS Course.


To start, type `npm install` to install dependencies.


To build a distributable for a dev environment, type `npm run build-dev`. 

To build a distributable for a production environment, type `npm run build-production`.

To spin up the live dev server, type `npm run dev`.


Note: In the webpack.config.js file, the browser that webpack-dev-server opens is currently set to Google Chrome. For projects meant for more than personal practice, it is recommended to change the `open` configs for the webpack-dev-server plugin from what it is now to `open: true`. This changes it so that the webpack-dev-server browser opens whatever the system default is.
