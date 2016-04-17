import storage from 'store2';
import {DATA, SUCCESS, ERROR, EMAIL} from '../constants';

export default function (id, report) {
	storage.set(DATA, {id, report});
	$.ajax({
		url: "https://formspree.io/" + EMAIL,
		method: "POST",
		data: {id, report: JSON.stringify({id, report})},
		dataType: "json",
		error: (jqXHR, str, err) => storage.set(ERROR, err),
		success: (data, str, jqXHR) => storage.set(SUCCESS, str),
	});
}
