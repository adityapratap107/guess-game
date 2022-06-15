import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Colors from '../../constants/colors';

const Card = ({children}: any) => {
  return <View style={styles.card}>{children}</View>;
};

const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  card: {
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    borderRadius: 8,
    padding: 16,
    backgroundColor: Colors.primary700,
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 20,
    shadowOpacity: 0.25,
    alignItems: 'center',
  },
});
export default Card;
