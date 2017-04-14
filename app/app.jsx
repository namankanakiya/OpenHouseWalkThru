// React/API/Route imports
var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Faker = require('faker');
var $ = require('jquery');
var ohwtAPI = require('ohwtAPI');

//Components
var Main = require('Main').default;
var UserProfile = require('UserProfile').default;
var Dashboard = require('Dashboard').default;
var HouseProfile = require('HouseProfile').default;
var AddHouse = require('AddHouse').default;
var POI = require('POI').default;
var Checklist = require('Checklist').default;
var Login = require('Login').default;
var Registration = require('Registration').default;
var Walkthru = require('Walkthru').default;
var NotFound = require('NotFound').default;

//Firebase
import firebase, {firebaseRef} from 'app/firebase';

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'

//Redux
var actions = require('actions');
export var store = require('configureStore').configure();
var {Provider} = require('react-redux');

// Inject touch for Material UI
try {
    injectTapEventPlugin();
} catch (e) {
        //do Nothing, already injected
}

store.subscribe(() => {
    // Every time store changes, log it in the console
    console.log('New State', store.getState());
});

// For Generating Fake houses
/*
var randomIntFromInterval = function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};*/
// Generate Initial Houses
/*var num = randomIntFromInterval(5, 10)
for (var x = 0; x < num; x++) {
    var house = {
        address :  Faker.address.streetAddress(),
        city : Faker.address.city(),
        state : Faker.address.state(),
        zipcode : Faker.address.zipCode(),
        description : Faker.lorem.sentences(),
        imageurl : Faker.image.image(),
    }
    store.dispatch(actions.startAddHouse(house, 1));
}*/

// On Authentication change, update Firbase and local state
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("Signed in!");
        var uid = user.uid;
        store.dispatch(actions.loginUser(uid));
        store.dispatch(actions.startLoadHouse(uid));
    } else {
        store.dispatch(actions.logoutHouses());
        store.dispatch(actions.logoutUser());
        console.log("Logged out :(");
    }
});


// Load Foundation
$(document).foundation();

//SCSS
require('applicationStyles');
//Sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Function used to check that the URL the user is accessing
// has a house/checklist associated with it
const checkHouse = (store) => {
    return (nextState, replace) => {
        // Get URL -> get checklist/house id
        var nextLoc = nextState.location.pathname;
        var splitArray = nextLoc.split('/');
        var id = splitArray.slice(-1)[0];
        // otherLoc to determine where they were going (house or checklist)
        var otherLoc = splitArray.slice(-2)[0];
        var houses = store.getState().houses;
        if ($.isArray(houses)) {
            if (houses.length > 0) {
                var house = ohwtAPI.findHouseById(houses, id);
                // if the house doesn't exist, redirect the user
                if (house === null) {
                    replace({
                        pathname : '/notfound',
                        state : {notFound : otherLoc}
                    });
                } else {
                    // House was found, add it to redux state
                    store.dispatch(actions.addCurHouse(house));
                }
            }
            else {
                sleep(1000).then(() => {
                    var houses = store.getState().houses;
                    replace({
                        pathname : '/notfound',
                        state : {notFound : otherLoc}
                    });
                });
            }
        } else {
            replace({
                pathname : '/notfound',
                state : {notFound : otherLoc}
            });
        }
    }
}


// Defining the URL routes, and the components they map to
const routes = (
    <Route path="/" component={Main}>
        <Route path='/userprofile' component={UserProfile}></Route>
        <Route path='/houseprofile/:id' component={HouseProfile} onEnter={checkHouse(store)}></Route>
        <Route path='/addhouse' component={AddHouse}></Route>
        <Route path='/poi' component={POI}></Route>
        <Route path='/checklist/:id' component={Checklist} onEnter={checkHouse(store)}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Registration}></Route>
        <Route path='/walkthru/:id' component={Walkthru} onEnter={checkHouse(store)}></Route>
        <Route path="*" component={NotFound}/>
        <IndexRoute component={Dashboard}/>
    </Route>
);

// Uses all of the above
const Root = props => {
    return (
        <Provider store={store}>
            <Router key={Math.random()} history={hashHistory} routes={routes}>
                {routes}
            </Router>
        </Provider>
    )
}

export default Root;