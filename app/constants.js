export const
	MARK_KEY 			= 32,
	PHASE_KEY 			= 32,
	ENTER_KEY 			= 13,
	SHOW_INT 			= 700,
	HIDE_INT 			= 300,
	ITERATIONS 			= 90,
	ITERATIONS_INTRO 	= 12;

export const
	MARKABLES = [
		{content: '1', shouldBeMarked: true},
		{content: '2', shouldBeMarked: true},
		{content: '3', shouldBeMarked: true},
		{content: '4', shouldBeMarked: false},
		{content: '5', shouldBeMarked: false},
		{content: '6', shouldBeMarked: false},
		{content: '7', shouldBeMarked: false},
		{content: '8', shouldBeMarked: false},
		{content: '9', shouldBeMarked: false},
	];

export const
	IDENTIFY	 	 = 'phase:identify',
	DIRECTIONS	 	 = 'phase:directions',
	SAMPLE 			 = 'phase:sample',
	FEEDBACK	 	 = 'phase:feedback',
	TEST	 		 = 'phase:test',
	CONCLUSION 		 = 'phase:conclusion',
	PHASES_ORDERED	 = [
		IDENTIFY,
		DIRECTIONS,
		SAMPLE,
		FEEDBACK,
		TEST,
		CONCLUSION,
	];

export const
	DATA	= 'storage:data',
	SUCCESS	= 'storage:success',
	ERROR	= 'storage:error',
	EMAIL	= 'exp.psych.2@gmail.com';
