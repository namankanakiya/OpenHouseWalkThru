var React = require('react');
var Nav = require('Nav').default;

var Main = ({children}) => {
    return (
        <div>
            <div>
                <Nav/>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Main;