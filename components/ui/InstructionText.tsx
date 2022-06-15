import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Colors from '../../constants/colors';

const InstructionText = ({children, style}: any) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 20,
    textAlign: 'center',
    padding: 12,
    fontFamily: 'OpenSans-Regular',
  },
});

export default InstructionText;
