import { registerRootComponent } from 'expo';

import { WebApp } from './Web';

const a = 1;

if (a * 2 > 1) {
	throw new Error();
}

registerRootComponent(WebApp);
