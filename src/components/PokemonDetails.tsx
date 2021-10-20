import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { PokemonFull } from '../interfaces/pokemonInterfaces'

interface Props {
  pokemon : PokemonFull;
}

export const PokemonDetails = ( { pokemon } : Props ) => {
    return (
        <ScrollView style={{ 
          ...StyleSheet.absoluteFillObject,
          marginTop:370
        }}>
            {/* Types */}
            <View style={
              styles.container
            }>
              
              <Text style={styles.title}>Types:</Text>
              <View style={{ flexDirection:'row'}}>
                  {
                    pokemon.types.map( ({ type }) => 
                    (
                        <Text
                          style={{
                            ...styles.regularText,
                            marginRight:10
                          }}
                          key={ type.name }
                        >
                            { type.name }
                        </Text>
                    )
                    )
                  }
              </View>
            </View>

            {/* Sprites */}
            <View style={{
                ...styles.container,
                marginTop:20
            }}>
              <Text style={ styles.title }> Sprites</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
      marginHorizontal:20,
    },
    title:{
        fontSize:22,
        color:'black',
        fontWeight:'bold'
    },
    regularText:{
        fontSize:19,
        color:'black',
    }
})