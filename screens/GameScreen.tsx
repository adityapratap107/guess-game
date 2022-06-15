import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import GuessLogItem from '../components/game/GuessLogItem';

// Function to generate random number
const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number,
): any => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

// set initial minimum and maximum boundary
let minBoundary = 1;
let maxBoundary = 100;

// The main GameScreen component
const GameScreen = ({userNumber, onGameOver}: any) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const {width, height} = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction: any) =>
    // direction=> lower or greater
    {
      if (
        (direction === 'lower' && currentGuess < userNumber) ||
        (direction === 'greater' && currentGuess > userNumber)
      ) {
        Alert.alert("Don't Lie", 'You know that this is wrong...', [
          {
            text: 'Sorry!',
            style: 'cancel',
          },
        ]);
        return;
      }
      //   30  --- cg-> 25

      if (direction === 'lower') {
        maxBoundary = currentGuess;
      } else {
        minBoundary = currentGuess + 1;
      }

      // console.log(minBoundary, maxBoundary);
      const newRndNum = generateRandomBetween(
        minBoundary,
        maxBoundary,
        currentGuess,
      );
      setCurrentGuess(newRndNum);
      setGuessRounds(prevGuessRounds => [newRndNum, ...prevGuessRounds]);
    };

  const guessRoundListLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPressButton={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="add" size={20} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPressButton={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="remove" size={20} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );
  console.log('Device Width:', width);

  // if (width > 393) {
  //   content = (
  //     <>
  //       <InstructionText style={styles.instructionText}>
  //         Higher or lower?
  //       </InstructionText>
  //       <View style={styles.buttonsContainerWide}>
  //         <View style={styles.buttonContainer}>
  //           <PrimaryButton onPressButton={nextGuessHandler.bind(this, 'lower')}>
  //             <Ionicons name="add" size={20} color="white" />
  //           </PrimaryButton>
  //         </View>
  //         <NumberContainer>{currentGuess}</NumberContainer>;
  //         <View style={styles.buttonContainer}>
  //           <PrimaryButton
  //             onPressButton={nextGuessHandler.bind(this, 'greater')}>
  //             <Ionicons name="remove" size={20} color="white" />
  //           </PrimaryButton>
  //         </View>
  //       </View>
  //     </>
  //   );
  // }

  return (
    <ScrollView style={styles.scrollStyle}>
      <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        {content}
        <View style={styles.listContainer}>
          {/* {guessRounds.map(guessRound => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
          <FlatList
            data={guessRounds}
            renderItem={itemData => (
              <GuessLogItem
                roundNumber={guessRoundListLength - itemData.index} // latest round is always at begininng so latest round is having index 0
                guess={itemData.item}
              />
            )}
            keyExtractor={item => item}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: 60,
    alignItems: 'center',
  },
  scrollViewStyle: {
    flex: 1,
  },
  //   here we add additional styling to our InstructionText component
  instructionText: {
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

export default GameScreen;
