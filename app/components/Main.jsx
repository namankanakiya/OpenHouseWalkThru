var React = require('react');
var Nav = require('Nav').default;

//main component that holds all the children components and makes nav bar constant in all pages
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
