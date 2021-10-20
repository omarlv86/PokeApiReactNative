import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { FadeInImage } from '../components/FadeInImage'
import { PokemonDetails } from '../components/PokemonDetails'
import { usePokemon } from '../hooks/usePokemon'
import { RootStackParams } from '../navigation/Navigator'

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {};

export const PokemonScreen = ( { navigation, route }: Props) => {
    const { simplePokemon, color } = route.params
    const { id, name, picture } = simplePokemon;
    const { top } = useSafeAreaInsets();
    //console.log(simplePokemon, color)

    const { isLoading, pokemon } =usePokemon( id )
    console.log(pokemon)
    return (
        <View style={{flex:1}}>
          <View style={{
            ...styles.headerContainer,
            backgroundColor: color,
          }}>
            {/* backButton */}
            <TouchableOpacity 
              activeOpacity={0.8}
              style={{
                ...styles.backButton,
                top: top + 5
              }}
              onPress={ () => navigation.pop() }
            >
                <Icon 
                  name="arrow-back-outline"
                  color='white'
                  size={35}
                />
            </TouchableOpacity>

            {/* Nombre del Pokemon */}
            <Text style={{
                ...styles.pokemonName,
                top: top + 40
            }}>
                {  name + '\n' }#{ id }
            </Text>

            {/* Pokebola blanca */}
            <Image 
              source={  require('../assets/pokebola-blanca.png')}
              style={ styles.pokeball }
            />

            <FadeInImage 
              uri={ picture}
              style={ styles.pokemonImage }
            />
          </View>

          {/* Detalles y Loading */}
          {
            isLoading ? (
              <View style={styles.loadingIndicator}>
                <ActivityIndicator 
                  color={ color }
                  size={50}
                />
              </View>
            ) : <PokemonDetails pokemon={pokemon}/>
          }
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
      height:370, 
      zIndex:999,
      alignItems:'center',
      borderBottomRightRadius:1000,
      borderBottomLeftRadius:1000,
    },
    backButton:{
      position:'absolute',
      left: 20,
    },
    pokemonName: {
      color:'white',
      fontSize: 40,
      alignSelf:'flex-start',
      left:20
    },
    pokeball: {
      width:250,
      height:250,
      bottom:-15,
      opacity:.7
    },
    pokemonImage: {
        width:250,
        height:250,
        position:'absolute',
        bottom:-20
    },
    loadingIndicator:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
})