import React, {PropTypes} from 'react';
import store from '../control/store';
import {id} from '../control/actions';

const Id = ({value, children}) => (
	<div>
		<p>
			{children}
		</p>
		<input
			style={{direction: 'ltr', display: 'block', margin: '0 auto'}}
			value={value}
			onChange={Id.handleChange}
			/>
	</div>
);

Id.handleChange = e => {store.dispatch(id(e.target.value.substr(0, 9)));}

Id.propTypes = {
	value: PropTypes.string.isRequired,
};

export default Id;
