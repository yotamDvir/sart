import React, {PropTypes} from 'react';

const Xnumber = ({number, size, X = false, indicateIncorrect}) => (
	<div className="centered big">
		<span style={{
				fontSize: X ? '' : size+'pt'
			}}>
			{!X ? number : '\u2A02'}
		</span>
		<span style={{
				color: 'red',
				display: indicateIncorrect ? 'block' : 'none',
				position: 'fixed',
				bottom: 0, left: '40%',
				width: '20%',
				textAlign: 'center',
			}}>Incorrect</span>
	</div>
);

Xnumber.propTypes = {
	number: PropTypes.string.isRequired,
	size: PropTypes.number.isRequired,
	X: PropTypes.bool,
	indicateIncorrect: PropTypes.bool,
};

export default Xnumber;
