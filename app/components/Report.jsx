import React, {PropTypes} from 'react';
import postReport from '../helpers/post-report';

const Report = ({id, report, children}) => {
	postReport(id, report);
	// const namedReport = {id, report};
	// const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(namedReport));
	return (
		<div>
			<p>
				{children}
			</p>
			{/*
				<a
					href={'data:' + data}
					download={id || 'data' + '.json'}
					style={{color: 'cyan'}}
					>
					הורדת קובץ סיכום המבחן
				</a>
			*/}
		</div>
	);
};

Report.propTypes = {
	children: PropTypes.arrayOf(PropTypes.node),
	name: PropTypes.string,
	report: PropTypes.arrayOf(PropTypes.shape({
		content: PropTypes.string.isRequired,
		haveMarked: PropTypes.bool.isRequired,
		shouldHave: PropTypes.bool.isRequired,
	})).isRequired,
};

export default Report;
