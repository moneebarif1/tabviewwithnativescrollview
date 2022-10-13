import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Tabs } from './TabViewAndScrollView';

const color = {
  primary: '#e75e40',
  colorBrandNavy: '#2a2961',
};

interface TabIconsProps {
  tab: Tabs;
  scrollToPage: (index: number) => void;
  index: number;
  tabIconStyle?: any;
  tabDefualtColor?: any;
  tabTintColor?: any;
  tabTextStyle?: any;
  tabInactiveTextStyle?: any;
  tabStyle?: any;
  _totalLeng?: number;
  isLoadingFrist?: boolean;
  _selectedIndex?: number;
  tabFlexNotToShow?: boolean;
}

class TabScrolls extends React.PureComponent<TabIconsProps> {
  constructor(props: TabIconsProps) {
    super(props);
    this.state = {
      isSelected:
        props.isLoadingFrist && props.index == props._selectedIndex
          ? true
          : false,
    };
    this.onPressScrollTo = this.onPressScrollTo.bind(this);
    this.onStateToUpdate = this.onStateToUpdate.bind(this);
  }

  onPressScrollTo() {
    if (!this.state.isSelected && !this.state.moveToScroll) {
      this.setState({ moveToScroll: true });
    }
  }

  onStateToUpdate(nextState: boolean) {
    this.setState({ isSelected: nextState });
  }
  componentDidUpdate(
    prevProps: Readonly<TabIconsProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (this.state.moveToScroll && !prevState.moveToScroll) {
      const scrollIndex = this.props._totalLeng
        ? this.props._totalLeng - this.props.index
        : this.props.index;
      this.props.scrollToPage(scrollIndex);
      this.setState({ moveToScroll: false });
    }
  }

  componentDidMount(): void {
    if (this.state.isSelected) {
      const scrollIndex = this.props._totalLeng
        ? this.props._totalLeng - this.props.index
        : this.props.index;

      this.props.scrollToPage(scrollIndex);
    }
  }
  render() {
    return (
      <>
        {this.props.tab && (
          <Pressable
            onPress={this.onPressScrollTo}
            style={
              this.props.tabStyle ?? {
                alignItems: 'center',
                width: 100,
              }
            }
          >
            {this.props.tab.icon && (
              <FastImage
                style={this.props.tabIconStyle ?? styles.tabIcon}
                key={this.props.tab.key}
                source={{
                  uri: this.props.tab.icon,
                }}
                tintColor={
                  this.state.isSelected
                    ? this.props.tabTintColor ?? color.primary
                    : this.props.tabDefualtColor ?? color.colorBrandNavy
                }
                resizeMode={'contain'}
              />
            )}
            <Text
              numberOfLines={2}
              style={[
                this.state.isSelected
                  ? this.props.tabTextStyle
                  : this.props.tabInactiveTextStyle,
                {
                  marginBottom: 16,
                  marginTop: 16,
                },
              ]}
            >
              {this.props.tab.title}
            </Text>

            {!this.props.tabFlexNotToShow && this.state.isSelected && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,

                  height: 2,
                  width: '100%',
                  borderRadius: 8,
                  backgroundColor: color.primary,
                }}
              />
            )}
          </Pressable>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
    //marginBottom: R.dimens.spacingXxs,
  },
  tabIconFocused: {
    width: 24,
    height: 24,
    tintColor: color.primary,
    //marginBottom: R.dimens.spacingXxs,
  },
  labelArabic: {
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '#373946',
    height: 40,
  },
  labelFocusedArabic: {
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'center',
    color: color.primary,
    height: 40,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '#373946',
  },
  labelFocused: {
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'center',
    color: color.primary,
  },
});

export default TabScrolls;
