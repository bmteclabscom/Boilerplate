
##### Requirements
- node version 6.9.2 or latest
- npm version 5.0.3 or latest
##### Description
- Fullstack application, client/server running javascript
- [PassportJS](http://passportjs.org/) authentication
- Authenticated API implemented with [ExpressJS](https://expressjs.com/)
- Hot Reload, preprocessing, compiling for the client with [webpack](https://webpack.js.org/), browser will reload after any change
- Server code changes watch, everytime backend code is changed, server is reloaded
- Handlebars for ExpressJS views rendering
- Babel for: JSX, latest ES, etc..
- Styling with SCSS

##### Scripts
Development and production scripts :
- `npm run start:all`: Starts dev servers; client code server running in port `3001` and expressjs server in `3000`
- `npm run start:prod"`: Starts production mode server; it runs on port 8080, and it first generates the bundled client files into `build` folder
- `npm run build`: No server, this just bundles client files into `build` folder
    
###### Author
alejandro soto

### Feel free to modify, send PR or use this...

