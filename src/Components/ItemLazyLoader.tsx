import React from 'react';
import { Dimensions, View } from 'react-native';

interface ItemLazyLoadeProps {
  index?: number;
  _selectedIndex?: number;
  isLoadingFrist?: boolean;
  item?: any;
}

type ItemState = { isSelected: boolean };

class ItemLazyLoader extends React.PureComponent<
  ItemLazyLoadeProps,
  ItemState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      isSelected:
        props.isLoadingFrist && props.index == props._selectedIndex
          ? true
          : false,
    };
  }
  render(): React.ReactNode {
    return (
      <View style={{ width: Dimensions.get('window').width }}>
        {this.state.isSelected && this.props.item}
      </View>
    );
  }
}

export default ItemLazyLoader;
