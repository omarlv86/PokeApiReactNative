import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../components/PokemonCard'
//import { FadeInImage } from '../components/FadeInImage'
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
          <View
            style={{ alignItems:'center' }}
          >
            <FlatList
              data={ simplePokemonList }
              keyExtractor={ (pokemon) => pokemon.id}
              showsVerticalScrollIndicator={false}
              numColumns={ 2 }
              //Header
              ListHeaderComponent={( 
                <Text style={{
                  ...styles.title,
                  ...styles.globalMargin,
                  top: top + 20,
                  marginBottom: top + 20
                  }}>Pokedex
                </Text>
              )}
              renderItem={ ({ item }) => (
                <PokemonCard pokemon={ item }/>
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
          </View>
        </>
    )
}