var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var Checklist = React.createClass({

    addFeature : function(e) {
        e.preventDefault(); 
        var newFeature = this.refs.newFeature.value;
        if (newFeature.length > 0) {
            this.refs.newFeature.value = '';
            var {dispatch} = this.props;
            dispatch(actions.addChecklistItem(newFeature));
        }
    },

    render : function() {
        var key = 0;
        var {checklist} = this.props;
        return (
            <div className="checklist-main">
                <ul>
                    {checklist.map((feature) => {
                        return <li key={feature.id}>{feature.feature}</li>
                    })}
                </ul>
                <br/>
                <div>
                    <form onSubmit={this.addFeature} className="sameLine">
                        <input type="text" ref="newFeature" placeholder ="Enter a feature for tracking"/>
                        <button className="button primary"> Add Feature </button>
                    </form>
                    <a href="/#/houseprofile"><button className="back button secondary">Go back</button></a>
                </div>
            </div>
        );
    }
})

module.exports = connect(
    (state) => {
        return {
            checklist : state.checklist
        }
    }
)(Checklist);