import identify from 'raw!./identify.txt';
import directions from 'raw!./directions.txt';
import feedbackAbove from 'raw!./feedback-above.txt';
import feedbackBelow from 'raw!./feedback-below.txt';
import conclusion from 'raw!./conclusion.txt';

const texts = {
	identify,
	directions,
	feedbackAbove,
	feedbackBelow,
	conclusion,
};

const LinesLists = {};

Object.keys(texts).forEach(
	name => {LinesLists[name] = texts[name].split('\n');}
);

export default LinesLists;
