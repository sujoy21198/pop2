import React, { Component } from 'react'
import { Root } from 'native-base'
import AppStack from './AppStack'

export default class App extends Component{
  render(){
    return(
      <Root>
        <AppStack/>
      </Root>
    );
  }
}