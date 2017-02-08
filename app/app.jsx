var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
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

//Redux
var actions = require('actions');
var store = require('configureStore').configure();
var {Provider} = require('react-redux');

console.log(store);

store.subscribe(() => {
    console.log('New State', store.getState());
});

store.dispatch(actions.addChecklistItem('Big Garage'));
store.dispatch(actions.addChecklistItem('Great Lighting'));
store.dispatch(actions.addChecklistItem('Wooden Floors'));
store.dispatch(actions.addChecklistItem('Good Insulation'));

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
                <Route path='/houseprofile' component={HouseProfile}></Route>
                <Route path='/averagedistance' component={AverageDistance}></Route>
                <Route path='/settings' component={Settings}></Route>
                <Route path='/logout' component={Logout}></Route>
                <Route path='/addhouse' component={AddHouse}></Route>
                <Route path='/checklist' component={Checklist}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/registration' component={Registration}></Route>
                <Route path='/ratingcomment' component={RatingComment}></Route>
                <IndexRoute component={Dashboard}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app'));