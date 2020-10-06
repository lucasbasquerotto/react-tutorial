import { useSelector } from 'react-redux';

interface RootState {
	isOn: boolean;
}

// TS infers type: (state: RootState) => boolean
const selectIsOn = (state: RootState) => state.isOn;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useTest() {
	// TS infers `isOn` is boolean
	// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
	const isOn = useSelector(selectIsOn);
}
