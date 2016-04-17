import React from 'react';
import storage from 'store2';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './control/user-input';
import store from './control/store';
import App from './components/App';
import Resend from './components/Resend';
import {DATA} from './constants';

const app = document.createElement('div');
document.body.appendChild(app);

main();

function main() {
	if (storage.has(DATA)) {
		render(<Resend />, app);
	} else {
		render(<Provider store={store}><App /></Provider>, app);
	}
};
