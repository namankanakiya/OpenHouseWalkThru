# OpenHouseWalkThru
[![React](https://img.shields.io/badge/React-15.4.2-blue.svg)](https://img.shields.io/badge/React-15.4.2-blue.svg)  [![Redux](https://img.shields.io/badge/Redux-3.6.0-blue.svg)](https://img.shields.io/badge/Redux-3.6.0-blue.svg)  [![Firebase](https://img.shields.io/badge/Firebase-3.6.10-blue.svg)](https://img.shields.io/badge/Firebase-3.6.10-blue.svg)  [![Webpack](https://img.shields.io/badge/Webpack-2.2.1-blue.svg)](https://img.shields.io/badge/Webpack-2.2.1-blue.svg)  [![MaterialUI](https://img.shields.io/badge/MaterialUI-0.17.0-42ebf4.svg)](https://img.shields.io/badge/MaterialUI-0.17.0-42ebf4.svg)  [![Foundation](https://img.shields.io/badge/Foundation-6.2.0-42ebf4.svg)](https://img.shields.io/badge/Foundation-6.2.0-42ebf4.svg)

Open House Walk Thru is a web app designed for potential homebuyers who can use it to enhance their open house experiences while searching for a home. It allows the user to document different features of a home that they would like to evaluate. This includes rating features (such as garage, kitchen, etc.) based on a 1-5 point scale, uploading photos and writing comments about it. A large focus of the app is that it enables users to visualize the locations of their houses on a map relative to points of interest that they may frequent to, such as a local church, school, work or anything else. The app scores and ranks the houses accordingly based on the user’s ratings.

## Technologies Used

OpenHouseWalkThru is built using React+Redux, and uses Firebase for data storage. For image storage, Cloudinary is used and connected to Firebase. Google Maps is used to visualize map information of the houses and points of interests.

## Getting Started (developers)

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

#### External Credentials

Firebase Database: Please visit https://firebase.google.com/docs/web/setup to setup an account.
Edit ```app/firebase/index.js``` and input your credentials.

Cloudinary Image Storage: Please visit http://cloudinary.com/documentation/node_integration to setup an account.
Edit ```app/components/ImageUpload.js``` and input your cloudinary API key.

Google Maps: Please visit https://developers.google.com/maps/documentation/javascript/get-api-key to setup an account.
Edit ```public/index.html``` and input your Google Maps API key.

#### Local Development

Node.js must be installed.

Windows / Mac:
Visit https://nodejs.org/en/download/ for download and install instructions

Debian / Ubuntu:
Install curl if not installed using the terminal:
```
sudo apt install curl
```
Install Node using the terminal:
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Other Linux Distributions:
Visit https://nodejs.org/en/download/package-manager/ for download and install instructions.

To test for a succesful Node installation, run the following command in your terminal:
```
node -v
```
The version returned should be at least v6.10.2

### Installing

1) Download or clone the GitHub Project.
2) Install all development dependencies (Babel, JQuery, React, Webpack, etc.) by running the following command in a terminal opened to the project location:
```
npm install
```

This may take some time, as this downloads and installs all of the required dependencies. You will notice that npm creates a folder called “npm_modules” where these are placed.

## Building / Running the Web Application

Open House Walk Thru uses Webpack to compile the project. To build and run the project open up your Terminal / Command Prompt in the project folder and run:
```
npm run dev
```
This will ensure that any new changes made to the files in the project are automatically built upon saving. Open House Walk Thru will launch on http://localhost:3000/, which can be accessed from a browser, preferably Google Chrome.

## Deployment

Since webpack compiles everything into bundle.js, deployment to an external website becomes very trivial. We used Heroku for remote deployment, please visit https://devcenter.heroku.com/articles/git for further information on Heroku.

## Demo

A live demo of our application can be found at http://ohwt.herokuapp.com 

## Built With

* [React](https://facebook.github.io/react/) - The web framework used
* [Firebase](https://console.firebase.google.com) - The database used
* [Cloudinary](cloudinary.com) - Image Storage
* [Redux](http://redux.js.org/) - State Management 

## Troubleshooting

Installation has been tested on a completely new OS, please forward questions to: naman.kanakiya@gatech.edu

## Authors

* **Naman Kanakiya** - [Github](https://github.com/namankanakiya)
* **Neil Barooah** - [Github](https://github.com/neilbarooah)
* **Wilson Gao** - [Github](https://github.com/Batou8)
* **Nafiz Imtiaz Ali** - [Github](https://github.com/nafiz007)
* **Anurag Sharma** - [Github](https://github.com/anuragsv)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Professor Omojokun for the project inspiration and continued support.

# Release Notes

```
Version 1.0.0
```
