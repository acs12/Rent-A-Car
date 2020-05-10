# Team AABM

### Group Members
* Ankit Thanekar
* Aayush Sukhadia
* Brian Hsu
* Manish Arigala 

### Project Idea
Rent-A-Car is a full stack web application, which allows young people to rent cars of their choice. Our system has 3 roles namely User(i.e Young Adults), Admin and Manager. So, user will signup in out system by creating an account and will add his/her driving license's image. Manager's role is to validate the driving license of the user. In our system Admin can Add, Modify and Remove Rental Locations, Vehicles and different Categories of Vehicles. User can browse through different Vehicles and Location and can book one if avaialable in the given time slot. User can cancel the reservation or return after the reservation is completed. User can optionally provide the feedback and rating of his/her experience.

### Technology Stack
Frontend: React, Redux <br>
Backend: NodeJS<br>
Authentication Strategy: Passport,JWT<br>
Database: MongoDB<br>

## Getting Started in Local Machine

Clone code from the master branch and extract files on your local computer.

### Prerequisites

You need to have NodeJS and NPM(Node Package Manager) installed on your local device to succesfully run this project.

Node can be installed through this website[https://phoenixnap.com/kb/install-node-js-npm-on-windows]
Node can also be installed through NVM.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```

### Installing

A step by step series of examples that tell you how to get a development env running

Clone repository on your local computer.
Traverse through the Backend folder, open terminal in this folder and enter
```
npm install
```
This will download all the dependencies required for the project.
After Installing all the dependencies enter
```
node app.js
```
"app.js" is our root file which will create connection with database and handle all the APIs

Travser to Frontend folder and again install the dependencies by entering
```
npm install
```
After Installing all the dependencies enter
```
npm start
```
It will start our frontend server which is in React-Redux.
Everything is set and you are good to go.

# UML Diagrams

### Architecture Diagram

![Architecture Diagram](https://user-images.githubusercontent.com/46435796/81486898-143d1900-920d-11ea-8dde-046756e0db63.jpg)

### Use Case Diagram

![Use case](https://user-images.githubusercontent.com/46435796/81486931-70a03880-920d-11ea-88b4-1634146c4200.jpg)

### Activity Diagram

![Activity Diagram](https://user-images.githubusercontent.com/46435796/81486939-83b30880-920d-11ea-9fe8-5f4d20246e5f.jpg)

### Deployment Diagram
![UML Deployment Diagram](https://user-images.githubusercontent.com/26094255/81490416-09977980-9237-11ea-8742-57afc519b9bf.png)

## Built With

* [React](https://reactjs.org/docs/getting-started.html) - The library used
* [Redux](https://redux.js.org/introduction/getting-started) - The library used
* [NodeJS](https://nodejs.org/en/docs/) - run time open source development platform
* [Passport-JWT Token](http://www.passportjs.org/docs/) - Authentication Strategy used
* [MongoDB](https://docs.mongodb.com/) - Database used

## Authors
* **Aayush Sukhadia**, 
* **Ankit Thanekar**, 
* **Brian Hsu**, 
* **Manish Arigala**
