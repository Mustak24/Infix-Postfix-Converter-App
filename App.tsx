
import { useState } from 'react';
import {Pressable, SafeAreaView,ScrollView,StyleSheet, Text, TextInput, useColorScheme, View} from 'react-native';
import TypingText from './src/components/TypingText';
import { infixToPostfix, postfixToInfix } from './src/functions/conveter';
import DetailsCard from './src/components/DetailsCard';


type resultType = {
  action: string;
  solution: string;
}

export default function App(): React.JSX.Element {

  const isDatrkMode = useColorScheme() === 'dark';
  const backgroundColor = isDatrkMode ? 'black' : 'white';
  const color = isDatrkMode ? 'white' : 'blaack';

  const [text, setText] = useState<string>('');

  const [result, setResult] = useState<resultType[]>([]);

  const handleConvert = (type: string) => {
    let res = [];
    if (type === 'infix') {
      res = postfixToInfix(text)
    } else {
      res = infixToPostfix(text)
    }
    setResult(res);
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
        <TypingText 
          text='Build By Mustak24' 
          speed={100} 
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            position: 'absolute',
            top: 40, left: 8,
            color
          }} 
        ></TypingText>

        <TypingText text='Welcome to Convertor' style={{fontSize: 20, color}} />

        <TextInput 
          placeholder='Enter your expresion ...'
          style={[styles.inputText, {color}]}
          value={text}
          onChangeText={setText}
        />

        <View style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 20,
          marginBlock: 10
        }}>
          <Pressable style={[styles.btn]} onPress={() => handleConvert('infix')}>
            <Text style={{color: 'white'}}>Postfix to Infix</Text>
          </Pressable>
          <Pressable style={[styles.btn]} onPress={() => handleConvert('postfix')}>
            <Text style={{color: 'white'}}>Infix to Postfix</Text>
          </Pressable>
        </View>

        <DetailsCard summary='Solution' color={color} backgroundColor={backgroundColor}>
          <Text style={{color}}>{result.at(-1)?.solution || ''}</Text>
        </DetailsCard>


        <DetailsCard summary='Steps' color={color} backgroundColor={backgroundColor} style={{width: '100%', flex: 1, marginTop: 30}}>  
          <ScrollView 
            style={{width: '100%', height: '100%'}}
          >
            {
              result.map((item, index) => (
                <View 
                  key={index} 
                  style={{
                    display: 'flex', gap: 4, marginBottom: 20,
                    borderBottomColor: 'gray', borderBottomWidth: 1, paddingBottom: 10,
                    alignItems: 'flex-start', justifyContent: 'center'
                  }}
                >
                  <Text style={{color}}><Text style={{fontWeight: '800'}}>Action: </Text> {item?.action}</Text>
                  
                  <Text style={{color}}><Text style={{fontWeight: '800'}}>Solution: </Text> {item?.solution}</Text>
                </View>
              ))
            }
          </ScrollView>
        </DetailsCard>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#282c34',
    width: '100%',
    height: '100%',
    padding: 20,
    paddingTop: 80,
    position: 'relative',
    
  },

  inputText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 100,
  },

  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: 40,
    width: '100%',
    maxWidth: 150,
    paddingInline: 20,
    backgroundColor: 'royalblue'
  }
})