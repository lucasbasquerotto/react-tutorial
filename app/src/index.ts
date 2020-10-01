import { AppRegistry } from 'react-native';
import { Root } from './App';

AppRegistry.registerComponent('App', () => Root);

AppRegistry.runApplication('App', {
	rootTag: document.getElementById('root'),
});
