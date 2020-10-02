/** @jsx jsx */
import { jsx } from '@emotion/core';
import type {
	ComponentType,
	FunctionComponent,
	MutableRefObject,
	ReactNode,
} from 'react';
import React, { useCallback, useRef, useState } from 'react';
import type { Obj } from '../types';

interface MouseState {
	x: number;
	y: number;
}

interface MouseStateProp {
	mouse: MouseState;
}

const Cat: FunctionComponent<MouseStateProp> = (props) => (
	<img
		src="/logo192.png"
		alt="cat"
		css={{
			position: 'absolute',
			left: props.mouse.x - 96,
			top: props.mouse.y - 96,
		}}
	/>
);

interface MouseProps {
	render: (state: MouseState) => ReactNode;
}

const mouseInitialStyle: React.CSSProperties = {
	height: '100vh',
	overflow: 'hidden',
	position: 'relative',
	border: '1px solid #666',
};

const Mouse: FunctionComponent<MouseProps> = (props) => {
	const [state, setState] = useState<MouseState>({ x: 0, y: 0 });
	const inputRef = useRef() as MutableRefObject<HTMLDivElement>;

	const handleMouseMove = useCallback(
		(event) => {
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
		},
		[inputRef],
	);

	const [style] = useState(mouseInitialStyle);

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

type WithMouse<T> = T & MouseStateProp;

// If you really want a HOC for some reason, you can easily
// create one using a regular component with a render prop!
const withMouse = <T extends Obj>(Component: ComponentType<WithMouse<T>>) => (
	props: T,
) => <Mouse render={(mouse) => <Component {...props} mouse={mouse} />} />;

const CatWithMouseHOC = withMouse(Cat);

const renderTheCat: FunctionComponent<MouseState> = (mouse) => (
	<Cat mouse={mouse} />
);

const MouseTracker: FunctionComponent<Obj> = () => (
	<React.Fragment>
		<h1>Move the mouse around!</h1>
		<Mouse render={renderTheCat} />
		<h1>Move the mouse around (HOC)!</h1>
		<CatWithMouseHOC />
	</React.Fragment>
);

export { Cat, Mouse, MouseTracker };
