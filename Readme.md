# IIS Coding Exercise

This project is the work done for the Coding Exercise provided by Integrity Inspired Solutions.

This work is focused on a simulating an API connection for banking transactions.

## How to Run

To run this code, your device will require Node.JS to be installed. 
Once this programming language is installed, clone the repository to your device and run from your terminal using the following commands (Note: no additional environment variables are needed to run)

`
cd node-api && npm run start
`

These commands will run the API and make it available at http://localhost:3000 (assuming this port is available when running the previous commands)

For full examples of the endpoints made available in this API, navigate to http://localhost:3000/swagger for a full swagger page of documentation.

Postman API call examples are also available within the repository at ./docs/Coding Exercise.postman_colleaction.json . Follow this [link](https://github.com/BWBednar/IIS-Coding-Exercise/blob/main/docs/Coding%20Exercise.postman_collection.json) for quick access. (Note: This file can be imported if you have the Postman API tool, or the settings can be used to configure any local testing tool otherwise used)

## Additional Details 

The code in this repo is written in Typescript using the NestJS Framework. While it is not the ASP.NET Framework, the majority of API concepts translate between these frameworks.

This project does not have a true database connection, but rather a simulation of test JSON data. This data for simulation is found in the `./node-api/models/test-models`. Following this [link](https://github.com/BWBednar/IIS-Coding-Exercise/tree/main/node-api/models/test-models) to be taken to this section.