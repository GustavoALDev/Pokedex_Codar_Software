import { Component, OnInit } from '@angular/core';
import { Pokemons } from 'src/app/Model/pokemons';
import { faDisplay, faHeart as fasHeart, fas} from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart, far} from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import { PokemonsService } from 'src/app/service/pokemons.service';
import { faVimeoV } from '@fortawesome/free-brands-svg-icons';
import { style } from '@angular/animations';
import { JsonpClientBackend } from '@angular/common/http';
import { NgStyle } from '@angular/common';



library.add(fas,far)


@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {
 
allPokemons:Pokemons[] = [];
Pokemons:Pokemons[] = [];


buttonType: string = 'btn-type';
types: string[] = 
['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire','Flying', 'Ghost','Grass',
'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];



faSearch = faSearch;
searchTerm: string = '';
heartfavr = farHeart;
heartfavs = fasHeart

view = 'flex'
range:number = 20;


pokemonfav:string[] = [];

btnOnOff = false



  constructor(private getPoke:PokemonsService) { }

  ngOnInit(): void {
    this.getPokemons();

    
  }

getPokemons(){
  this.getPoke.getAll().subscribe((resp)=>{
    const dataAll = resp.results
    const datafilter = new Map()     
    
    dataAll.forEach((pokemon)=>{if(!datafilter.has(pokemon.name))
    {datafilter.set(pokemon.name, pokemon)}})
    
    const data = Array.from(datafilter, ([_,value])=> value)
    
    this.allPokemons = data
    this.Pokemons = data
    })};

search(e:Event):void{
  const target = e.target as HTMLInputElement
  const value = target.value

  this.Pokemons = this.allPokemons.filter((poke)=>{
    return poke.name.toLowerCase().includes(value.toLowerCase()) || poke.national_number.includes(value)
  })

}

filterPokeNum(e:Event){
  const target = e.target as HTMLSelectElement
  const value = target.value

  if(value == 'Menor'){
    this.Pokemons = this.allPokemons.sort((a,b)=> parseInt(a.national_number) - parseInt(b.national_number))
    console.log(this.Pokemons)}

  if(value == 'Maior'){
    this.Pokemons = this.allPokemons.sort((a,b)=> parseInt(b.national_number) - parseInt(a.national_number ))
    console.log(this.Pokemons)}

  if(value == 'AlfabeticaA'){this.Pokemons = this.allPokemons.sort((a,b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  console.log(this.Pokemons)}

  if(value == 'AlfabeticaD'){this.Pokemons = this.allPokemons.sort((a,b)=> b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
  console.log(this.Pokemons)}
}


viewMore(){this.range = this.range + 20;}


btnFilterTypes(e:string) {
  this.Pokemons = this.allPokemons.filter((poke)=> poke.type.includes(e))
  console.log(e)

}
selectfav(name:string){

  let fav = document.getElementById(name)
  
  if(this.pokemonfav.includes(name)){this.pokemonfav.splice(this.pokemonfav.indexOf(name),1)}
  else{this.pokemonfav.push(name)} 
  
  
}



filterFavBtn(){
  
  if(this.btnOnOff == false) {this.Pokemons = this.allPokemons.filter((a)=> this.pokemonfav.includes(a.name)), this.btnOnOff = true}
  else{this.Pokemons = this.allPokemons, this.btnOnOff = false}
  //remove o botão ver mais
  if(this.view == 'flex'){this.view = 'none'}
  else {this.view = 'flex'}  
  console.log(this.view)
}
 
}
