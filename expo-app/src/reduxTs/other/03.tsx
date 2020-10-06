import React from 'react';
import type { ConnectedProps } from 'react-redux';
import { connect } from 'react-redux';

interface RootState {
	isOn: boolean;
}

const mapState = (state: RootState) => ({
	isOn: state.isOn,
});

const mapDispatch = {
	toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),
};

const connector = connect(mapState, mapDispatch);

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
	backgroundColor: string;
};

const MyComponent = ({ isOn, toggleOn, backgroundColor }: Props) => (
	<div style={{ backgroundColor }}>
		<button type="button" onClick={toggleOn}>
			Toggle is {isOn ? 'ON' : 'OFF'}
		</button>
	</div>
);

export default connector(MyComponent);
