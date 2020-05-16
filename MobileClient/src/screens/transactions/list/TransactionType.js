import React, {Component} from 'react';
import {Text, Left, View} from 'native-base';
import styles from './styles';

export default function TransactionType(type) {
  if (type == SELL) {
    return (
      <Left>
        <View style={{backgroundColor: 'red'}}>
          <Text style={styles.textCard}>PURCHASE</Text>
        </View>
      </Left>
    );
  } else if (type == PURCHASE) {
    return (
      <Left>
        <View style={{backgroundColor: 'black'}}>
          <Text style={styles.textCard}>SELL</Text>
        </View>
      </Left>
    );
  }
}
