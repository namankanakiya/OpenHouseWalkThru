var React = require('react');

var RatingComment = React.createClass({
    render: function(){
        return(
            <div>
                {/*<input type="radio" id="star5" name="rating" value="5"/>
                    <label for="star5" title="Rocks!">5</label>
                <input type="radio" id="star4" name="rating" value="4"/>
                    <label for="star4" title="Pretty good">4</label>
                <input type="radio" id="star3" name="rating" value="3"/>
                    <label for="star3" title="Meh">3</label>
                <input type="radio" id="star2" name="rating" value="2"/>
                    <label for="star2" title="Kinda bad">2</label>
                <input type="radio" id="star1" name="rating" value="1"/>
                    <label for="star1" title="Sucks big time">1</label>*/}
            
                <form action="" method = "post">
                    <label>Comment: <br/>
                        <textarea cols="50" rows="5" name="comment"></textarea>
                    </label>
                </form>

                <button type="submit" className="button primary">Done</button>
            </div>
        )
    }
});

module.exports = RatingComment;    