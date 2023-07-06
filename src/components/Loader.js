import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';

const Loader = props => {
  const backgroundColor = 'rgba(52, 52, 52, 0.5)';
  const opacity = 1;
  return (
    <View style={[{backgroundColor, opacity}, styles.containerStyle]}>
      <ActivityIndicator
        size="large"
        color={
          props.color !== null && props.color !== undefined
            ? props.color
            : 'black'
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default Loader;
