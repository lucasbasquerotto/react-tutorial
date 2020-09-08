/* eslint-disable react/prop-types */
import React, { useState, useRef, useCallback } from 'react';

const Cat = (props) => {
	const mouse = props.mouse;
	return (
		<img
			src='/logo192.png'
			alt='cat'
			style={{ position: 'absolute', left: mouse.x - 96, top: mouse.y - 96 }}
		/>
	);
};

const Mouse = (props) => {
	const [state, setState] = useState({ x: 0, y: 0 });
	const inputRef = useRef();

	const handleMouseMove = useCallback((event) => {
		setState({
			x:
				event.clientX +
				document.documentElement.scrollLeft -
				inputRef.current.offsetLeft,
			y:
				event.clientY +
				document.documentElement.scrollTop -
				inputRef.current.offsetTop,
		});
	}, []);

	const [style] = useState({
		height: '100vh',
		overflow: 'hidden',
		position: 'relative',
		border: '1px solid #666',
	});

	return (
		<div ref={inputRef} style={style} onMouseMove={handleMouseMove}>
			{/*
            Instead of providing a static representation of what <Mouse> renders,
            use the `render` prop to dynamically determine what to render.
            */}
			{props.render(state)}
		</div>
	);
};

// If you really want a HOC for some reason, you can easily
// create one using a regular component with a render prop!
const withMouse = (Component) => (props) => (
	<Mouse render={(mouse) => <Component {...props} mouse={mouse} />} />
);

const CatWithMouseHOC = withMouse(Cat);

const renderTheCat = (mouse) => <Cat mouse={mouse} />;

const MouseTracker = () => (
	<>
		<h1>Move the mouse around!</h1>
		<Mouse render={renderTheCat} />
		<h1>Move the mouse around (HOC)!</h1>
		<CatWithMouseHOC />
	</>
);

export default MouseTracker;
