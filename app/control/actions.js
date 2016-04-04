const acts = {
	SHOW 	: 'action:show',
	HIDE 	: 'action:hide',
	MARK 	: 'action:mark',
	CLEAR 	: 'action:clear',
	ADVANCE : 'action:advance',
};

export const show = (markable) => ({
	type: acts.SHOW,
	payload: markable,
});

export const hide = () => ({
	type: acts.HIDE,
});

export const mark = (int) => ({
	type: acts.MARK,
	payload: int,
});

export const clear = () => ({
	type: acts.CLEAR,
});

export const advance = (phase) => ({
	type: acts.ADVANCE,
	payload: phase,
});

export default acts;
