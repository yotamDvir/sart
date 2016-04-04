import Tock from 'tocktimer';
import store from './store';
import {show, hide, advance} from './actions';
import randMark from '../helpers/random-markable';
import {
	SHOW_INT, HIDE_INT
} from '../constants';

// export const msToTime = (ms) => new Tock().msToTime(ms).substr(0, 5);

const ticker = new Tock({
	countdown: true,
	interval: 100,
	callback: () => {controlShowHide(ticker.lap());},
	complete: () => {complete()}
});

const lapToShouldShow = (lap) => {
	const shouldShow = (lap-1) % (SHOW_INT+HIDE_INT) > SHOW_INT;
	return shouldShow;
};

const controlShowHide = (lap) => {
	const shouldShow = lapToShouldShow(lap);
	const isShowtime = store.getState().xnumber.showtime;
	const isInOrder = (shouldShow && isShowtime) || (!shouldShow && !isShowtime);
	if (shouldShow && !isShowtime) {
		store.dispatch(show(randMark()));
	}
	if (!shouldShow && isShowtime) {
		store.dispatch(hide());
	}
};

const complete = () => {
	store.dispatch(advance());
};

export default ticker;
