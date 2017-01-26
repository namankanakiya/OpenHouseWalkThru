var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var Dashboard = require('Dashboard');

describe("Dashboard", () => {
    it("should exist", () => {
        expect(Dashboard).toExist();
    });

    describe("render", () => {
        it("should render dashboard", () => {
            var dashboard = TestUtils.renderIntoDocument(<Dashboard/>);
            var $el = $(ReactDOM.findDOMNode(dashboard));
            var actualText = $el.find(".page-title").text();
            expect(actualText).toBe("Dashboard");
        });
    });

})