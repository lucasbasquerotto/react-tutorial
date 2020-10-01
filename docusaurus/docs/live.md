---
id: live
title: Interactive Code Editor
---

```jsx live
function Clock(props) {
	const [date, setDate] = useState(new Date());

	function tick() {
		setDate(new Date());
	}

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});

	return (
		<div>
			<h2>It iss {date.toLocaleTimeString()}.</h2>
		</div>
	);
}
```

<!-- ```jsx live
function MyPlayground(props) {
	return (
		<div>
			<ButtonExample onClick={() => alert('hey!')}>Click me</ButtonExample>
		</div>
	);
}
``` -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="js"
values={[
{ label: 'JavaScript', value: 'js', },
{ label: 'Python', value: 'py', },
{ label: 'Java', value: 'java', },
]
}>
<TabItem value="js">

```js
function helloWorld() {
	console.log('Hello, world!');
}
```

</TabItem>
<TabItem value="py">

```py
def hello_world():
  print 'Hello, world!'
```

</TabItem>
<TabItem value="java">

```java
class HelloWorld {
  public static void main(String args[]) {
    System.out.println("Hello, World");
  }
}
```

</TabItem>
</Tabs>
