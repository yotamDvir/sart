import React from 'react';

export default function (lines) {
	return lines.map(
		(line, key) => <span key={key}>{line}<br/></span>
	);
};
