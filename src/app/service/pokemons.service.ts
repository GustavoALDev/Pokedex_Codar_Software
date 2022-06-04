import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemons } from '../Model/pokemons';
import { Database } from '../Model/database';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private Url = "https://unpkg.com/pokemons@1.1.0/pokemons.json"

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<Database<Pokemons[]>>(`${this.Url}`)
  }
}
