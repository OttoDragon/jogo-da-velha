import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Constants from 'expo-constants';
import { Audio } from 'expo-av';
import * as Updates from "expo-updates";

const players = ['O', 'X'];
const colors = ['red', 'blue'];
var lastColor = colors[0];
var lastPlayer = players[0];

whoIsNext = () => {
  if (lastPlayer == players[0]) {
    lastPlayer = players[1];
    lastColor = colors[1];
    console.log('1');
    return {
      player: lastPlayer,
      color: lastColor,
    };
  }
  if (lastPlayer == players[1]) {
    lastPlayer = players[0];
    lastColor = colors[0];
    console.log('0');
    return {
      player: lastPlayer,
      color: lastColor,
    };
  }
};

class ButtonText extends React.Component {
  state = { text: '', style: { color: '#faafff' }, isEnabled: true };
  onButtonPress = () => {
    const { player, color } = whoIsNext();
    this.setState({ text: player, style: { color: color }, isEnabled: false });
  };
  render() {
    return (
      <View style={styles.board}>
        <TouchableOpacity
          disabled={!this.state.isEnabled}
          style={styles.button}
          onPress={this.onButtonPress}>
          <Text style={[styles.buttonText, this.state.style]}>
            {this.state.text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default function App() {
  return (
    <View style={styles.container}>
    <Text style={styles.titulo}>Jogo Da Velha</Text>
      <View style={styles.board}>
        <ButtonText />
        <ButtonText />
        <ButtonText />
        <ButtonText />
        <ButtonText />
        <ButtonText />
        <ButtonText />
        <ButtonText />
        <ButtonText />
      </View>
      <TouchableOpacity
        style={styles.reset}
        onPress={() => {
          Updates.reloadAsync()
        }}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'lightgreen',
    padding: 8,
  },
  reset: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 50,
    width: 200,
    height: 50,
    textAlign: 'center',
  },
  resetText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 15,
    width: 80,
    height: 80,
    marginTop: 2,
    marginLeft: 15,
    textAlign: 'center',
  },
  board: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginLeft: 15,
  },
  buttonText: {
    fontSize: 60,
    marginLeft: 20,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 50,
    alignSelf: 'center',
  },
});