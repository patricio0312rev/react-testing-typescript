import React, { useState } from 'react';
import Axios from 'axios';
import CustomInput from './CustomInput';

const pokemonApiUri = 'https://pokeapi.co/api/v2';

type Ability = {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

function Pokemon() {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonAbilities, setPokemonAbilities] = useState<Ability[]>([]);
    const [error, setError] = useState(null);

    async function handleFetch(event) {
        let result;

        try {
            result = await Axios.get(`${pokemonApiUri}/pokemon/${pokemonName}`);
            setPokemonAbilities(result.data.abilities);
        } catch(err) {
            setPokemonAbilities([]);
            setError(err);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPokemonName(event.target.value);
    }

    return (
        <div>
            <CustomInput value={pokemonName} onChange={handleChange}>
                Pokemon name:
            </CustomInput>

            <button type="button" onClick={handleFetch}>
                Fetch Pokemon Abilities
            </button>
            { error && <span>Something went wrong...</span>}
            <ul>
                {
                    pokemonAbilities.map((ability) => {
                        return (
                            <li key={ability.ability.name}>
                                <a href={ability.ability.url}>{ability.ability.name}</a>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default Pokemon;