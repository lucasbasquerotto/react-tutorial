import React, {
	ComponentType,
	FunctionComponent,
	MutableRefObject,
	ReactNode,
	useCallback,
	useRef,
	useState,
} from 'react';

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
		style={{
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

// If you really want a HOC for some reason, you can easily
// create one using a regular component with a render prop!
const withMouse = (Component: ComponentType<MouseStateProp>) => (
	props: any,
) => <Mouse render={(mouse) => <Component {...props} mouse={mouse} />} />;

const CatWithMouseHOC: FunctionComponent<{}> = withMouse(Cat);

const renderTheCat: FunctionComponent<MouseState> = (mouse) => (
	<Cat mouse={mouse} />
);

const MouseTracker: FunctionComponent<{}> = () => (
	<React.Fragment>
		<h1>Move the mouse around!</h1>
		<Mouse render={renderTheCat} />
		<h1>Move the mouse around (HOC)!</h1>
		<CatWithMouseHOC />
	</React.Fragment>
);

export { Cat, Mouse, MouseTracker };
