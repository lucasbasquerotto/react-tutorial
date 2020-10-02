declare module '*.css' {
	const content: { [className: string]: string };
	export default content;
}

declare module '*.png';

declare module '*.svg' {
	const content: unknown;
	export default content;
}
