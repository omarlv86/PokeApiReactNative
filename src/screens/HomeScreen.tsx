import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePokemonPaginate } from '../hooks/usePokemonPaginate'
import { styles } from '../theme/appTheme'

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemons } = usePokemonPaginate();
    //console.log(simplePokemonList)
    return (
        <>
            <Image
              source={require('../assets/pokebola.png')}
              style={ styles.pokebolaBG}
            />

            <FlatList
              data={ simplePokemonList }
              keyExtractor={ (pokemon) => pokemon.id}
              //renderItem={ ({ item }) => <Text style={{color:'black'}}>{ item.name }</Text>  }
              showsVerticalScrollIndicator={false}
              renderItem={ ({ item }) => (
                <Image
                  source={{ uri: item.picture }}
                  style={{
                      width:100,
                      height:100
                  }}
                />
              )}

              //inifinite scroll
              onEndReached={ loadPokemons } 
              onEndReachedThreshold={ 0.4 }

              ListFooterComponent={(
                <ActivityIndicator 
                  style={{height:100 }}
                  size={20}
                  color="grey"
                />
              )}
            />
            {/* <Text style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 20
                }}>Pokedex
            </Text> */}
        </>
    )
}