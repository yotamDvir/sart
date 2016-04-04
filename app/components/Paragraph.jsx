import React, {PropTypes} from 'react';
import {DIRECTIONS, FEEDBACK, CONCLUSION} from '../constants';
import Report from './Report';
import Feedback from './Feedback';
import texts from '../texts'

const linesToHTML = lines => lines.map(
	(line, key) => <span key={key}>{line}<br/></span>
);

const Paragraph = ({phase, marks, all}) => (
	<div className="paragraph">
		{phase === CONCLUSION &&
			<Report
				report={all.map(
					(markable, ind) => ({
						content: markable.content,
						size: markable.size,
						haveMarked: !!marks[ind],
						shouldHave: markable.shouldBeMarked,
					})
				)}>
				{linesToHTML(texts.conclusion)}
			</Report>
		}
		{phase === DIRECTIONS &&
			<p>{linesToHTML(texts.directions)}</p>
		}
		{phase === FEEDBACK &&
			<Feedback
				marks={marks}
				all={all}
				above={linesToHTML(texts.feedbackAbove)}
				below={linesToHTML(texts.feedbackBelow)}
				/>
		}
	</div>
);

Paragraph.propTypes = {
	phase: PropTypes.oneOf([DIRECTIONS, FEEDBACK, CONCLUSION]),
	marks: PropTypes.arrayOf(PropTypes.oneOf([true, false, null])),
	all: PropTypes.arrayOf(PropTypes.shape({
		content: PropTypes.string.isRequired,
		shouldBeMarked: PropTypes.bool.isRequired,
	})),
};

export default Paragraph;
