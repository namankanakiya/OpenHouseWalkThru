var React = require('react');
var Nav = require('Nav');

var Main = ({children}) => {
	return (
		<div>
			<div>
				<Nav/>
				<div>
					<p>Main.jsx Rendered</p>
					{children}
				</div>
			</div>
		</div>
	);
}

module.exports = Main;