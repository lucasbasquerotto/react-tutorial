import { useDispatch } from 'react-redux';

export function useTest() {
	const dispatch = useDispatch();

	dispatch && (() => {})();
}
