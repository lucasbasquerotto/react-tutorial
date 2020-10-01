import { useSelector } from 'react-redux';

interface RootState {
	isOn: boolean;
}

// TS infers type: (state: RootState) => boolean
const selectIsOn = (state: RootState) => state.isOn;

export function useTest() {
	// TS infers `isOn` is boolean
	const isOn = useSelector(selectIsOn);

	isOn && (() => {})();
}
