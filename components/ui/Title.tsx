import React from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import Colors from '../../constants/colors';

const Title = ({children}: any) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 25,
    // fontWeight: 'bold',
    textAlign: 'center',
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    borderWidth: Platform.select({ios: 0, android: 2}),
    borderColor: 'white',
    padding: 12,
    fontFamily: 'OpenSans-Bold',
    maxWidth: '80%',
    width: 300,
  },
});

export default Title;
