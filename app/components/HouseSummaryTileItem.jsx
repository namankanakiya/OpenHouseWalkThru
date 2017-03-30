var React = require('react');
var Score = require('Score').default;
var {Link} = require('react-router');
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

var HouseSummaryTileItem = React.createClass({
    getDefaultProps : function() {
        return {
            score : -1,
            imageURL : ''
        };
    },

    propTypes : {
        address : React.PropTypes.string.isRequired,
        city : React.PropTypes.string.isRequired,
        state : React.PropTypes.string.isRequired,
        zipcode : React.PropTypes.string.isRequired,
        score : React.PropTypes.number,
        imageurl : React.PropTypes.string
    },

    render : function() {
        var {id, address, city, state, zipcode, score, imageurl} = this.props;
        const IMAGE_NOT_FOUND = "https://cdn.browshot.com/static/images/not-found.png";
        const HOUSE_URL = "/houseprofile/" + id;
        var titleStyle = 
        {
            margin: 5,
            border: -20,
            padding: -10,
            height: 20,
            width: 20
        };
        return (
            <GridTile title={<span>{address},{city}, {state}</span>} subtitle={<b><Score score={score}/></b>} actionIcon={<IconButton><StarBorder color="white" /></IconButton>}>                
                
                <Link to={HOUSE_URL} activeClassName="active-link">
                
                    <img src={imageurl} alt="No Image" style={{width:640, height:240}} onError={(e) => {e.target.src=IMAGE_NOT_FOUND}}/>
                
                </Link>
            
            </GridTile>
        );
    }
});

export default HouseSummaryTileItem;