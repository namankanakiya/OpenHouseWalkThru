var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var uuid = require('node-uuid');
var Faker = require('faker');

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
var RatingComment = require('RatingComment');
var NotFound = require('NotFound');

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
    var house = {
        id : uuid(),
        address :  Faker.address.streetAddress(),
        city : Faker.address.city(),
        state : Faker.address.state(),
        zipcode : Number(Faker.address.zipCode()),
        description : Faker.lorem.sentences(),
        imageurl : Faker.image.image(),
        score : randomIntFromInterval(60, 100),
        checklist : [{
                id : uuid(),
                feature : 'Big Garage'
            },{
                id : uuid(),
                feature : 'Great Lighting'
            },{
                id : uuid(),
                feature : 'Wooden Floors'
            },{
                id : uuid(),
                feature : 'Basement'
            }]
    }
    store.dispatch(actions.addHouse(house));    
}

// Load Foundation
$(document).foundation();

//SCSS
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                <Route path='/userprofile' component={UserProfile}></Route>
                <Route path='/housesummary' component={HouseSummary}></Route>
                <Route path='/score' component={Score}></Route>
                <Route path='/houseprofile/:id' component={HouseProfile}></Route>
                <Route path='/averagedistance' component={AverageDistance}></Route>
                <Route path='/settings' component={Settings}></Route>
                <Route path='/logout' component={Logout}></Route>
                <Route path='/addhouse' component={AddHouse}></Route>
                <Route path='/checklist/:id' component={Checklist}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/registration' component={Registration}></Route>
                <Route path='/ratingcomment' component={RatingComment}></Route>
                <Route path="*" component={NotFound}/>
                <IndexRoute component={Dashboard}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app'));