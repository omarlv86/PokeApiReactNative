import React, { useEffect, useRef, useState} from 'react'
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginate = () => {

    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')

    const loadPokemons = async () => {
        const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
        nextPageUrl.current = resp.data.next;

        //setSimplePokemonList( resp.data.result) //No se puede establecer de esa manera el resultado
        mapPokemonList(resp.data.results)
    }

    const mapPokemonList = ( pokemonList : Result[] ) => {
        pokemonList.forEach( poke => console.log( poke.url ))
    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        simplePokemonList
    }
}
