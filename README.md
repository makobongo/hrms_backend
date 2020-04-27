### hris
human resource information system backend written in nodejs.
#### setting it up locally
1. clone the project locally e.g. https://github.com/makobongo/hrms_backend.git
2. npm install to install all the necessary dependencies
3. create .env file to include MONGODB_URI which points to the database i.e. mongoDB and TOP_SECRET which should have an api secret word
4. change the NODE_ENV in root app.js to development
5. run DEBUG=hrms_backend:* npm run devstart
