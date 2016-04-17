import React, {PropTypes} from 'react';
import {
	IDENTIFY,
	DIRECTIONS,
	FEEDBACK,
	CONCLUSION,
} from '../constants';
import Report from './Report';
import Feedback from './Feedback';
import Id from './Id';
import texts from '../texts'
import linesToHTML from '../helpers/lines-to-html';

const Paragraph = ({phase, marks, all, id}) => (
	<div className="paragraph">
		{phase === CONCLUSION &&
			<Report
				id={id}
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
		{phase === IDENTIFY &&
			<Id
				value={id}
				>
				{linesToHTML(texts.identify)}
			</Id>
		}
		{phase === DIRECTIONS &&
			<div>
				<p>{linesToHTML(texts.directions)}</p>
			</div>
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
	phase: PropTypes.oneOf([IDENTIFY, DIRECTIONS, FEEDBACK, CONCLUSION]),
	marks: PropTypes.arrayOf(PropTypes.oneOf([true, false, null])),
	all: PropTypes.arrayOf(PropTypes.shape({
		content: PropTypes.string.isRequired,
		shouldBeMarked: PropTypes.bool.isRequired,
	})),
};

export default Paragraph;
