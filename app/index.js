import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './control/user-input';
import store from './control/store';
import App from './components/App';

const app = document.createElement('div');
document.body.appendChild(app);

main();

function main() {
	render(<Provider store={store}><App /></Provider>, app);
};
