import type { SystemState, SystemActionTypes } from './types';
import { UPDATE_SESSION } from './types';

export function updateSession(newSession: SystemState): SystemActionTypes {
	return {
		type: UPDATE_SESSION,
		payload: newSession,
	};
}
