import store from './store';
import {show, mark, clear, advance} from './actions';
import {
	SAMPLE, TEST, FEEDBACK, DIRECTIONS, IDENTIFY,
	PHASE_KEY, MARK_KEY, ENTER_KEY,
	SHOW_INT, HIDE_INT,
	ITERATIONS, ITERATIONS_INTRO,
} from '../constants';
import randMark from '../helpers/random-markable';
import ticker from './ticker';

const identify = function () {
	const id = store.getState().id;
	const isIdCorrect = confirm(
		'ת.ז. שהכנסת הינה '
		+ id
		+ '.\n'
		+ '.אנא אשר/י נכונותה'
	);
	if (!isIdCorrect) {
		return;
	}
	store.dispatch(advance());
};

const phaser = function (phase) {
	if (phase === FEEDBACK) {
		store.dispatch(clear());
	}
	store.dispatch(show(randMark()));
	store.dispatch(advance());
	const isSample = store.getState().phase === SAMPLE;
	ticker.reset();
	const iter = isSample ? ITERATIONS_INTRO : ITERATIONS;
	ticker.start((SHOW_INT+HIDE_INT)*iter);
};

const marker = function () {
	const currentMarkable = store.getState().xnumber.int;
	store.dispatch(mark(currentMarkable));
};

let hasReleasedKey = true;

const onKeyboard = function (e) {
	if (!hasReleasedKey) {
		return undefined;
	}
	hasReleasedKey = false;
	const key = e.which;
	if ([MARK_KEY, PHASE_KEY, ENTER_KEY].indexOf(key) < 0) {
		return undefined;
	}
	e.preventDefault();
	let phase = store.getState().phase;
	if (key === ENTER_KEY && [IDENTIFY].indexOf(phase) >= 0) {
		identify();
	}
	if (key === PHASE_KEY && [FEEDBACK, DIRECTIONS].indexOf(phase) >= 0) {
		phaser(phase);
	}
	if (key === MARK_KEY && [SAMPLE, TEST].indexOf(phase) >= 0) {
		marker();
	}
};

document.body.addEventListener('keydown', onKeyboard);
document.body.addEventListener('keyup', function () {hasReleasedKey = true;});
