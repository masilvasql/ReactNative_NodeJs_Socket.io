import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
// window.navigator.userAgent = 'react-native'
import io from 'socket.io-client'

export default class App extends React.Component {

  constructor() {
    super()
    this.socket = io('http://10.1.1.154:5001', { jsonp: false })
    this.socket.on('update', (data) => {
      this.setState({ name: data })
    })

    this.socket.on('updateBtn', (data) => {
        this.setState({ text: data })
    })
    this.state = {
      name: null,
      text: null,
      param: null
    }
  }

  handleChange(event) {
    this.socket.emit('text', event);
  }

  buttonClick(param) {
    this.socket.emit('button', param);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewBtn}>
          <View style={styles.ViewTextos}>
            <Text style={styles.labels}>CÓDIGO COM LEITURA EM TEMPO REAL</Text>
          </View>
          <TextInput
            placeholder='DIGITE AQUI'
            value={this.state.name}
            onChangeText={(data) => this.handleChange(data)}
          />
          <Text >texto input:  {this.state.name}</Text>
          </View>

          <View style={styles.viewBtn}>
          <View style={styles.ViewTextos}>
            <Text style={styles.labels}>CÓDIGO COM ATUALIZAÇÃO AO CLICAR NO BOTÃO</Text>
          </View>
          <TextInput
            placeholder='DIGITE AQUI e clique no botão'
            value={this.state.param}
            onChangeText={(data) => this.setState({ param: data })}
          />
          <Button title='dispara informação' onPress={() => this.buttonClick(this.state.param)} />
          <Text>texto btn: {this.state.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtn: {
    borderWidth: 2,
    elevation: 10,
    borderRadius: 10,
    padding: 30,
    marginTop: 40
  },
  ViewTextos:{
    
    backgroundColor:'#aaa',
    padding:3,
    borderRadius:20
  },
  labels:{
    fontWeight:'bold',

  }
});
