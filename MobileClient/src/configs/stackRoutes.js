import React, {Component} from 'react';
import {ItemScreen} from '../screens/items';
import {LoginScreen} from '../screens/login';
import MainScreen from '../screens/Main/MainScreen';
import {UnitScreen} from '../screens/units';
import {TransactionScreen} from '../screens/transactions';
import {StockScreen} from '../screens/stocks';
import {SplashScreen} from '../screens/splash';

export const stackRoutes = [
  // {
  //   name: 'SplashScreen',
  //   component: SplashScreen,
  // },
  // {
  //   name: 'LoginScreen',
  //   component: LoginScreen,
  // },
  {
    name: 'Main',
    component: MainScreen,
  },
  {
    name: 'ItemDetail',
    component: ItemScreen,
  },
  {
    name: 'UnitDetail',
    component: UnitScreen,
  },
  {
    name: 'TransactionDetail',
    component: TransactionScreen,
  },
  {
    name: 'StockDetail',
    component: StockScreen,
  },
];
