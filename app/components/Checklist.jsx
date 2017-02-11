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
        } else {
            this.refs.newFeature.focus();
        }
    },

    render : function() {
        var key = 0;
        var {checklist, dispatch} = this.props;
        return (
            <div className="checklist-main">
                <div align="left">
                    {checklist.map((feature) => {
                        return (
                            <div key={feature.id} className="row">
                                <div className="small-2 columns">
                                    {feature.feature}
                                </div>
                                <div className="columns">
                                    <button className="alert button"onClick={() => {dispatch(actions.deleteFeature(feature.id))}}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
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