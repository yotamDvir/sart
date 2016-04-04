import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {SAMPLE, TEST} from '../constants';
import Xnumber from './Xnumber';
import Paragraph from './Paragraph';

const App = ({xnumber, phase}) => (
	<div>
		{[SAMPLE, TEST].indexOf(phase) >= 0 &&
			<Xnumber
				number={xnumber.markable.content}
				size={xnumber.markable.size}
				X={!xnumber.reveal}
				indicateIncorrect={phase === SAMPLE && xnumber.isIncorrect}
				/>
		}
		{[SAMPLE, TEST].indexOf(phase) < 0 &&
			<Paragraph
				phase={phase}
				marks={xnumber.marks}
				all={xnumber.all}
				/>
		}
	</div>
);

App.propTypes = {
};

export default connect(
	state => state
)(App);
