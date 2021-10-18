import React, { useEffect, useRef, useState} from 'react'
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginate = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')

    const loadPokemons = async () => {
        setIsLoading(true);
        const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
        nextPageUrl.current = resp.data.next;

        //setSimplePokemonList( resp.data.result) //No se puede establecer de esa manera el resultado
        mapPokemonList(resp.data.results)
    }

    const mapPokemonList = ( pokemonList : Result[] ) => {
        //pokemonList.forEach( poke => console.log( poke.url ) )
        const newPokemonList : SimplePokemon[] = 
        pokemonList.map( ( {name, url} ) => {
          
          //https://pokeapi.co/api/v2/pokemon/280/
          const urlParts = url.split('/');
          //console.log(urlParts)
          const id = urlParts[ urlParts.length -2];
          //console.log({id})
          const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`;

          return { id, picture, name };
        })

        setSimplePokemonList([ ...simplePokemonList, ...newPokemonList ])
        setIsLoading(false)
    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        isLoading,
        simplePokemonList
    }
}
