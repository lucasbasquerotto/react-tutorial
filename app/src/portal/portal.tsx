// https://reactjs.org/tutorial/tutorial.html
import type { FunctionComponent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import type { Obj } from '../types';

// This contianer is sibling with the root container
const modalRoot = document.getElementById('modal-root');

// Let's create a Modal component that is an abstraction around
// the portal API.
const Modal: FunctionComponent<Obj> = ({ children }) => {
	const elRef = useRef() as React.MutableRefObject<HTMLDivElement>;

	if (!elRef.current) {
		elRef.current = document.createElement('div');
	}

	// Create a div that we'll render the modal into. Because each
	// Modal component has its own element, we can render multiple
	// modal components into the modal container.
	const el = elRef.current;

	useEffect(() => {
		if (modalRoot) {
			// Append the element into the DOM on mount. We'll render
			// into the modal container element (see the HTML tab).
			modalRoot.appendChild(el);

			// Remove the element from the DOM when we unmount
			return () => {
				modalRoot.removeChild(el);
			};
		}
	});

	// Use a portal to render the children into the element
	return ReactDOM.createPortal(
		// Any valid React child: JSX, strings, arrays, etc.
		children,
		// A DOM element
		el,
	);
};

// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.
const Portal: FunctionComponent<Obj> = () => {
	const [state, setState] = useState({ showModal: false, counter: 0 });

	const increment = () => setState((s) => ({ ...s, counter: s.counter + 1 }));
	const handleShow = () => setState((s) => ({ ...s, showModal: true }));
	const handleHide = () => setState((s) => ({ ...s, showModal: false }));

	// Show a Modal on click.
	// (In a real app, don't forget to use ARIA attributes
	// for accessibility!)
	const modal = state.showModal ? (
		<Modal>
			<div className="modal">
				<div>
					With a portal, we can render content into a different part of the DOM,
					as if it were any other React child.
				</div>
				This is being rendered inside the #modal-container div (counter inside:{' '}
				{state.counter}).
				<button onClick={increment}>Increment counter</button>
				<button onClick={handleHide}>Hide modal</button>
			</div>
		</Modal>
	) : null;

	return (
		<div className="app">
			This div has overflow: hidden. (counter outside: {state.counter})
			<button onClick={handleShow}>Show modal</button>
			{modal}
		</div>
	);
};

export default Portal;
