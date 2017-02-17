var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var uuid = require('human-readable-ids').hri;
var Faker = require('faker');
var $ = require('jquery');

//Components
var Main = require('Main');
var UserProfile = require('UserProfile');
var Dashboard = require('Dashboard');
var HouseSummary = require('HouseSummary');
var Score = require('Score');
var HouseProfile = require('HouseProfile');
var AverageDistance = require('AverageDistance');
var Settings = require('Settings');
var Logout = require('Logout');
var AddHouse = require('AddHouse');
var Checklist = require('Checklist');
var Login = require('Login');
var Registration = require('Registration');
var Walkthru = require('Walkthru');
var NotFound = require('NotFound');
var ohwtAPI = require('ohwtAPI');

//Redux
var actions = require('actions');
var store = require('configureStore').configure();
var {Provider} = require('react-redux');

console.log(store);

store.subscribe(() => {
    console.log('New State', store.getState());
});
var randomIntFromInterval = function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};

// Generate Initial Houses
var num = randomIntFromInterval(5, 10)
for (var x = 0; x < num; x++) {
    var checklistArray = ohwtAPI.addChecklistItem([],'Big Garage');
    checklistArray = ohwtAPI.addChecklistItem(checklistArray, 'Great Lighting');
    checklistArray = ohwtAPI.addChecklistItem(checklistArray, 'Wooden Floors');
    checklistArray = ohwtAPI.addChecklistItem(checklistArray, 'Basement');
    var house = {
        id : uuid.random(),
        address :  Faker.address.streetAddress(),
        city : Faker.address.city(),
        state : Faker.address.state(),
        zipcode : Faker.address.zipCode(),
        description : Faker.lorem.sentences(),
        imageurl : Faker.image.image(),
        score : randomIntFromInterval(60, 100),
        checklist : checklistArray
    }
    store.dispatch(actions.addHouse(house));    
}

// Load Foundation
$(document).foundation();

//SCSS
require('style!css!sass!applicationStyles');

const checkHouse = (store) => {
    return (nextState, replace) => {
        var nextLoc = nextState.location.pathname;
        var splitArray = nextLoc.split('/');
        var id = splitArray.slice(-1)[0];
        var otherLoc = splitArray.slice(-2)[0];
        console.log(otherLoc);
        var houses = store.getState().houses;
        if ($.isArray(houses)) {
            if (houses.length > 0) {
                var house = ohwtAPI.findHouseById(houses, id);
                if (house === null) {
                    replace({
                        pathname : '/notfound',
                        state : {notFound : otherLoc}
                    });
                } else {
                    store.dispatch(actions.addCurHouse(house));
                }
            }
            else {
                replace({
                    pathname : '/notfound',
                    state : {notFound : otherLoc}
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

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                <Route path='/userprofile' component={UserProfile}></Route>
                <Route path='/housesummary' component={HouseSummary}></Route>
                <Route path='/score' component={Score}></Route>
                <Route path='/houseprofile/:id' component={HouseProfile} onEnter={checkHouse(store)}></Route>
                <Route path='/averagedistance' component={AverageDistance}></Route>
                <Route path='/settings' component={Settings}></Route>
                <Route path='/logout' component={Logout}></Route>
                <Route path='/addhouse' component={AddHouse}></Route>
                <Route path='/checklist/:id' component={Checklist} onEnter={checkHouse(store)}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/registration' component={Registration}></Route>
                <Route path='/walkthru/:id' component={Walkthru} onEnter={checkHouse(store)}></Route>
                <Route path="*" component={NotFound}/>
                <IndexRoute component={Dashboard}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app'));