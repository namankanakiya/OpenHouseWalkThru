# OpenHouseWalkThru

Open House Walk Thru is a web app designed for potential homebuyers who can use it to enhance their open house experiences while searching for a home. It allows the user to document different features of a home that they would like to evaluate. This includes rating features (such as garage, kitchen, etc.) based on a 1-5 point scale, uploading photos and writing comments about it. A large focus of the app is that it enables users to visualize the locations of their houses on a map relative to points of interest that they may frequent to, such as a local church, school, work or anything else. The app scores and ranks the houses accordingly based on the user’s ratings.

## Technologies Used

OpenHouseWalkThru is built using React+Redux, and uses Firebase for data storage. For image storage, Cloudinary is used and connected to Firebase. Google Maps is used to visualize map information of the houses and points of interests.

## Getting Started (developers)

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

#### External Credentials

Firebase Database: Please visit https://firebase.google.com/docs/web/setup to setup an account.
Edit app/firebase/index.js and input your credentials.

Cloudinary Image Storage: Please visit http://cloudinary.com/documentation/node_integration to setup an account.
Edit app/components/ImageUpload.js and input your cloudinary API key.

Google Maps: Please visit https://developers.google.com/maps/documentation/javascript/get-api-key to setup an account.
Edit public/index.html and input your Google Maps API key.

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

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
