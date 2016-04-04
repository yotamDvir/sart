import React, {PropTypes} from 'react';

const Feedback = ({marks, all, above, below}) => {
	return (
		<div>
			<p>
				{above}
			</p>
			<ul>
				{all.map(
					(markable, ind) => {
						const content = markable.content;
						const haveMarked = !!marks[ind];
						const shouldHave = markable.shouldBeMarked;
						const correct = (haveMarked && shouldHave) || (!haveMarked && !shouldHave);
						return (
							<li key={ind} style={{color: correct ? 'green' : 'red'}}>
								{correct ? 'צדקת ' : 'טעית '}
								כאשר
								{' '}
								{!haveMarked && 'לא'}
								{' '}
								סימנת את
								{' ' + content}
								.
							</li>
						)
					}
				)}
			</ul>
			<p>
				{below}
			</p>
		</div>
	);
};

Feedback.propTypes = {
	above: PropTypes.arrayOf(PropTypes.node),
	below: PropTypes.arrayOf(PropTypes.node),
	marks: PropTypes.arrayOf(PropTypes.oneOf([true, false, null])),
	all: PropTypes.arrayOf(PropTypes.shape({
		content: PropTypes.string.isRequired,
		shouldBeMarked: PropTypes.bool.isRequired,
	})),
};

export default Feedback;
