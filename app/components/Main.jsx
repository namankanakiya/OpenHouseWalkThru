var React = require('react');

var Main = ({children}) => {
	return (
		<div>
			<div>
				<div>
					<p>Main.jsx Rendered</p>
					{children}
				</div>
			</div>
		</div>
	);
}

module.exports = Main;