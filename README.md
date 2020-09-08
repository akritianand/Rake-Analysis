# Rake-Ananlysis
Tool to store records of rake, search, view and edit them later.

Rake details are stored in MongoDB database. Database name is rake_analysis_db and collection name is Rake_Analysis_Collection.

To build react app, type:

cd Rake\ App
REACT_APP_API_URL=<ip address of server making API calls> npm run-script build

Then delete build folder in NodeServer folder. And copy paste build folder from Rake App folder to here.
Then start the server:

npm run server
