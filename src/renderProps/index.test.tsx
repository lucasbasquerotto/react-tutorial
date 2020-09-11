import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { Cat } from './index';

let container: Element | null = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	if (container) {
		// cleanup on exiting
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	}
});

it('cat - position', () => {
	act(() => {
		render(<Cat mouse={{ x: 10, y: 50 }} />, container);
	});

	expect(container && container.querySelector('img')?.style.left).toBe('-86px');

	expect(container && container.querySelector('img')?.style.top).toBe('-46px');

	act(() => {
		render(<Cat mouse={{ x: 200, y: 300 }} />, container);
	});

	expect(container && container.querySelector('img')?.style.left).toBe('104px');

	expect(container && container.querySelector('img')?.style.top).toBe('204px');
});

it('cat - position2', () => {
	act(() => {
		render(<Cat mouse={{ x: 10, y: 50 }} />, container);
	});

	expect(container && container.querySelector('img')?.style.left).toBe('-86px');

	expect(container && container.querySelector('img')?.style.top).toBe('-46px');

	act(() => {
		render(<Cat mouse={{ x: 200, y: 300 }} />, container);
	});

	expect(container && container.querySelector('img')?.style.left).toBe('104px');

	expect(container && container.querySelector('img')?.style.top).toBe('204px');
});
