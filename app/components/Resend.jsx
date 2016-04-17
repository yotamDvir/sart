import React, {PropTypes} from 'react';
import storage from 'store2';
import texts from '../texts'
import linesToHTML from '../helpers/lines-to-html';
import postReport from '../helpers/post-report';
import {DATA, SUCCESS, ERROR} from '../constants';

const Resend = () => {
	if (!storage.has(SUCCESS) || storage.has(ERROR)) {
		const {id, report} = storage.get(DATA);
		postReport(id, report);
	}
	return (
		<div className="paragraph">
			{linesToHTML(texts.conclusion)}
		</div>
	);
};

Resend.propTypes = {
};

export default Resend;
