import {MARKABLES} from '../constants';
import extend from './extend';

export default () => extend(
	MARKABLES[Math.floor(Math.random()*9)],
	{size: size()}
);

const size = () => Math.floor(30+40*Math.random()+50*Math.floor(2*Math.random()))
