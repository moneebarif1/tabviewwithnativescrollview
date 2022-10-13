import React, { memo, useRef } from 'react';
import {
  Dimensions,
  I18nManager,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import ItemLazyLoader from './ItemLazyLoader';
import TabScrolls from './TabsScrolls';

export interface TabViewAndScrollViewProps {
  childrens: JSX.Element[];
  isNotLazyLoading: boolean;
  intialRouteNumber: number;
  tabFlexNotToShow: boolean;
  tabs: Tabs[];
  scrollviewStyles: ScrollViewStyles;
  tabsStyle: TabStyles;
  handleIndexChange?: any;
}

interface ScrollViewStyles {
  scrollTabStyle?: any;
}

interface TabStyles {
  tabIconStyle?: any;
  tabDefualtColor?: any;
  tabTintColor?: any;
  tabTextStyle?: any;
  tabScrollEnabled?: boolean;
  tabInactiveTextStyle?: any;
  tabStyle?: any;
  tabFlexNotToShow?: boolean;
  tabContainnerStyle?: any;
}

export interface Tabs {
  key?: string;
  icon?: string;
  title?: string;
}

export const TabViewAndScrollView = ({
  tabViewAndScrollViewProps,
}: {
  tabViewAndScrollViewProps: TabViewAndScrollViewProps;
}): JSX.Element => {
  const flatListViewerRef = useRef<ScrollView | null>(null);
  const tabRefScrollView = useRef<ScrollView | null>(null);

  var _selectedIndex = tabViewAndScrollViewProps.intialRouteNumber
    ? tabViewAndScrollViewProps.intialRouteNumber
    : 0;
  const isRevertingIndex = Platform.OS != 'ios' && I18nManager.isRTL;

  const _totalLeng = isRevertingIndex
    ? tabViewAndScrollViewProps.childrens.length - 1
    : undefined;
  const itemWidth = Dimensions.get('window').width;

  const tempIndex = _totalLeng ? _totalLeng - _selectedIndex : _selectedIndex;
  var setOffSetValue = itemWidth * tempIndex;
  const tabsIconsRef = useRef<TabScrolls[] | null[]>([]);
  const itemLazyLoader = useRef<ItemLazyLoader[] | null[]>([]);
  const widthOfItemTab = 100;
  var isTabSelected = false;

  const renderIcons = (tab: Tabs, index: number) => {
    return (
      <TabScrolls
        key={index}
        ref={(el) => (tabsIconsRef.current[index] = el)}
        tab={tab}
        isLoadingFrist={true}
        _selectedIndex={_selectedIndex}
        scrollToPage={scrollToPage}
        tabStyle={tabViewAndScrollViewProps.tabsStyle.tabStyle}
        index={index}
        _totalLeng={_totalLeng}
        tabIconStyle={tabViewAndScrollViewProps.tabsStyle.tabIconStyle}
        tabDefualtColor={tabViewAndScrollViewProps.tabsStyle.tabDefualtColor}
        tabTintColor={tabViewAndScrollViewProps.tabsStyle.tabTintColor}
        tabTextStyle={tabViewAndScrollViewProps.tabsStyle.tabTextStyle}
        tabInactiveTextStyle={
          tabViewAndScrollViewProps.tabsStyle.tabInactiveTextStyle
        }
        tabFlexNotToShow={tabViewAndScrollViewProps.tabsStyle.tabFlexNotToShow}
      />
    );
  };

  const setUnSelected = (index: number) => {
    const unSelectedIndex = _totalLeng ? _totalLeng - index : index;
    if (tabsIconsRef.current[unSelectedIndex]?.state.isSelected == true) {
      tabsIconsRef.current[unSelectedIndex]?.onStateToUpdate(false);
    }
  };

  const setSelected = (index: number) => {
    const selectedIndex = _totalLeng ? _totalLeng - index : index;
    if (tabsIconsRef.current[selectedIndex]?.state.isSelected == false) {
      tabsIconsRef.current[selectedIndex]?.onStateToUpdate(true);
    }

    itemLazyLoader.current[selectedIndex]?.setState({
      isSelected: true,
    });
  };

  const onScroll = (e: any) => {
    var contentOffset = e.nativeEvent.contentOffset;
    var pageNum = Math.floor((contentOffset.x + itemWidth / 2) / itemWidth);

    if (_selectedIndex != pageNum && !isTabSelected) {
      setUnSelected(_selectedIndex);
      _selectedIndex = pageNum;
      setSelected(_selectedIndex);
      var tabPositionX = widthOfItemTab * _selectedIndex - widthOfItemTab / 2;
      tabRefScrollView.current?.scrollTo({
        x: tabPositionX,
        animated: true,
      });
    }
  };

  const onUserDragStart = (e: any) => {
    //  setUnSelected(_selectedIndex);
    isTabSelected = false;
  };
  const onUserDragEnd = (e: any) => {
    // setMakeScrollEnabelOrDisabel(true);
  };

  const onScrollAnimationEnd = () => {
    //setSelected(_selectedIndex);
  };

  const scrollToPage = (pageNumTemp: number) => {
    isTabSelected = true;
    if (_selectedIndex != pageNumTemp) {
      if (tabViewAndScrollViewProps.handleIndexChange)
        tabViewAndScrollViewProps.handleIndexChange(pageNumTemp);

      setUnSelected(_selectedIndex);
      _selectedIndex = pageNumTemp;
      setSelected(_selectedIndex);
      {
        var scrollPostionX = itemWidth * pageNumTemp;

        flatListViewerRef.current?.scrollTo({
          x: scrollPostionX,
          animated: true,
        });
      }

      var tabPositionX = widthOfItemTab * pageNumTemp - widthOfItemTab / 2;

      tabRefScrollView.current?.scrollTo({
        x: tabPositionX,
        animated: true,
      });
    }
  };

  const Rendertabs = ({ tabs }: { tabs: Tabs[] | undefined }) => {
    return (
      <>
        {tabs != undefined && tabs.map((tab, index) => renderIcons(tab, index))}
      </>
    );
  };
  const MemoTabs = memo(Rendertabs);

  return (
    <>
      <View
        style={
          tabViewAndScrollViewProps.scrollviewStyles.scrollTabStyle ?? {
            height: 68,
            alignContent: 'center',
            alignSelf: 'center',
            marginTop: 16,
          }
        }
      >
        <ScrollView
          horizontal={true}
          scrollEnabled={tabViewAndScrollViewProps.tabsStyle.tabScrollEnabled}
          ref={tabRefScrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            tabViewAndScrollViewProps.tabsStyle.tabContainnerStyle ?? {}
          }
        >
          <MemoTabs tabs={tabViewAndScrollViewProps.tabs} />
        </ScrollView>
      </View>
      <ScrollView
        style={styles.pagerView}
        horizontal={true}
        scrollEventThrottle={16}
        // snapToOffsets={_pagingOffsets}
        disableIntervalMomentum={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ref={flatListViewerRef}
        contentOffset={{ x: setOffSetValue, y: 0 }}
        decelerationRate={0}
        snapToInterval={Dimensions.get('window').width}
        snapToAlignment={'center'}
        onScrollBeginDrag={onUserDragStart}
        onScroll={onScroll}
        nestedScrollEnabled={true}
        removeClippedSubviews={true} // Unmount components when outside of window
        scrollEnabled={true}
      >
        {tabViewAndScrollViewProps.childrens &&
          tabViewAndScrollViewProps.childrens.map((item, index) => {
            if (tabViewAndScrollViewProps.isNotLazyLoading) return item;

            return (
              <ItemLazyLoader
                item={item}
                ref={(el) => (itemLazyLoader.current[index] = el)}
                key={index}
                index={index}
                _selectedIndex={_selectedIndex}
                isLoadingFrist={true}
              />
            );
          })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },

  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
    //marginBottom: R.dimens.spacingXxs,
  },
  tabIconFocused: {
    width: 24,
    height: 24,
    tintColor: '#e75e40',
  },
});

export default memo(TabViewAndScrollView);
