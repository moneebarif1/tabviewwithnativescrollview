# react-native-tabviewwithnativescrollview
A cross-platform Tab View component for React Native. Implemented using react-native scrollview work well in RTL also. Can set tab scroll styles
* Checkout /example for exampe how to run
* support topbar for now
*Fully typed with TypeScript

Limitation 
** support full width page for now
## Installation

<a href=https://user-images.githubusercontent.com/45369702/195601677-0822212d-965e-47bc-a5f0-b5ec68c4cbf4.gif><img src=https://user-images.githubusercontent.com/45369702/195601677-0822212d-965e-47bc-a5f0-b5ec68c4cbf4.gif width="360"></a>
 

```sh
npm install react-native-tabviewwithnativescrollview
```

#Dependency 
```sh
npm i react-native-fast-image
```

## Quick Start

```js
import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import {
  TabViewAndScrollView,
  TabViewAndScrollViewProps,
} from 'react-native-tabviewwithnativescrollview';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  const getChildMap = () => {

    let sceneList: JSX.Element[] = [];

    sceneList.push(
      <View style={{ flex: 1, backgroundColor: '#ff81da' }}>
        <Text style={{ flex: 1, textAlign: 'center', marginTop: 50 }}>P1</Text>
      </View>
    );
    sceneList.push(
      <View style={{ flex: 1, backgroundColor: '#e75e40' }}>
        <Text style={{ flex: 1, textAlign: 'center', marginTop: 50 }}>P3</Text>
      </View>
    );
    sceneList.push(
      <View style={{ flex: 1, backgroundColor: '#f4f4ff' }}>
        <Text style={{ flex: 1, textAlign: 'center', marginTop: 50 }}>P2</Text>
      </View>
    );

    return sceneList;
  };

  const getTabs = () => {
    let tabsList = [];
    tabsList.push({
      key: 'k1',
      title: 'Page1',
    });
    tabsList.push({
      key: 'k2',
      title: 'Page2',
    });
    tabsList.push({
      key: 'k3',
      title: 'Page3',
    });

    return tabsList;
  };

  const propsForTabView: TabViewAndScrollViewProps = {
    childrens: getChildMap(),
    isNotLazyLoading: false,
    intialRouteNumber: 0,
    tabFlexNotToShow: false,
    tabs: getTabs(),
    scrollviewStyles: {},
    tabsStyle: {},
  };

  return (
    <View style={styles.container}>
      <TabViewAndScrollView tabViewAndScrollViewProps={propsForTabView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
