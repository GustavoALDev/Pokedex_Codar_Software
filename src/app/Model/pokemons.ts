export interface Pokemons {
    national_number: string,
    evolution:{},
    sprites: {normal:string, Large:string, animated:string},
    name: string,
    type: string[],
    total: number,
    hp: number,
    attack: number,
    defense: number,
    sp_atk: number,
    sp_def: number,
    speed: number    
}
