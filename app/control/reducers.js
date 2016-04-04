import {combineReducers} from 'redux';

import {PHASES_ORDERED} from '../constants';
import acts from './actions';
import extend from '../helpers/extend';
import xor from '../helpers/xor';

const xnumber = (state = {
	reveal: false,
	showtime: false,
	int: -1,
	markable: null,
	marks: [],
	all: [],
	isIncorrect: false,
}, action) => {
	const all = state.all.concat();
	const marks = state.marks.concat();
	switch (action.type) {
		case acts.SHOW:
			return extend(state, {
				reveal: true,
				showtime: true,
				int: state.int+1,
				markable: action.payload,
				isIncorrect: false,
			});
			break;
		case acts.HIDE:
			all[state.int] = state.markable;
			if (!state.marks[state.int]) {
				marks[state.int] = false;
			}
			return extend(state, {
				showtime: false,
				reveal: false,
				all,
				marks,
				isIncorrect: xor(state.markable.shouldBeMarked, !state.marks[state.int]),
			});
			break;
		case acts.MARK:
			marks[state.int] = true;
			return !state.reveal ? state : extend(state, {
				reveal: false,
				marks,
				isIncorrect: !state.markable.shouldBeMarked,
			});
			break;
		case acts.CLEAR:
			return extend(state, {
				int: -1,
				marks: [],
				all: [],
			});
			break;
		default:
			return state;
	};
};

const phase = (state = PHASES_ORDERED[0], action) => {
	switch (action.type) {
		case acts.ADVANCE:
			return action.payload || PHASES_ORDERED[PHASES_ORDERED.indexOf(state)+1];
			break;
		default:
			return state;
	};
};

export default combineReducers({
	xnumber,
	phase,
});
