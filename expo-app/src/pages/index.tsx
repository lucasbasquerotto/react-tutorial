import React from 'react';
import { EmotionApp } from '../emotion/emotion';
import { MyContainer } from '../emotion/test';
import { FetchApp } from '../fetch';
import { IntlApp } from '../intl';
import { JssApp } from '../jss/jss';
import { LinkifyApp } from '../linkify/linkify';
import { MaterialUiApp } from '../material/material';
import { NativeApp } from '../native/App';
import { ReduxApp } from '../reduxEssentials/App';

// eslint-disable-next-line react/display-name
export default () => (
	<>
		<div className="root-container">
			<div className="fetch">
				<FetchApp />
			</div>
			<div className="redux-counter">
				<ReduxApp />
			</div>
			<div className="jss">
				<JssApp />
			</div>
			<div className="emotion">
				<EmotionApp />
			</div>
			<div className="material-ui">
				<MaterialUiApp />
			</div>
			<div className="test">
				<MyContainer />
			</div>
			<div className="intl">
				<IntlApp />
			</div>
			<div className="native">
				<NativeApp />
			</div>
			<div className="linkify">
				<LinkifyApp />
			</div>
		</div>
	</>
);
