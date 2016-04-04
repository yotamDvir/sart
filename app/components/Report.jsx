import React, {PropTypes} from 'react';

const Report = ({name, report, children}) => {
	console.log(...report);
	const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report));
	return (
		<div>
			<p>
				{children}
			</p>
			<a
				href={'data:' + data}
				download={name || 'data' + '.json'}
				style={{color: 'cyan'}}
				>
				הורדת קובץ סיכום המבחן
			</a>
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
