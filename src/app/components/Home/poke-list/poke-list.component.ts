import { Component, OnInit } from '@angular/core';
import { Pokemons } from 'src/app/Model/pokemons';
import { faHeart as fasHeart, fas} from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart, far} from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import { PokemonsService } from 'src/app/service/pokemons.service';


library.add(fas,far)


@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {
//variaves com os pokemons do get
 
allPokemons:Pokemons[] = [];
Pokemons:Pokemons[] = [];

//variaveis de filtros


buttonType: string = 'btn-type';
types: string[] = 
['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire','Flying', 'Ghost','Grass',
'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Stell', 'Water'];



//icon font awesome
faSearch = faSearch;
searchTerm: string = '';
heartfav = farHeart;

// variaveis de ver mais 
view = 'flex'
range:number = 20;

//variaveis do fav

pokemonfav:string[] = [];
btnOnOff = false


  constructor(private getPoke:PokemonsService) { }

  ngOnInit(): void {
    this.getPokemons();
  }
//Get dos pokemons

getPokemons(){
  this.getPoke.getAll().subscribe((resp)=>{
    //Array de Pokemons completa(com os repetidos)
    const dataAll = resp.results
    //metodo para filtrar os pokemons repetidos usando map()
    const datafilter = new Map()     
    
    dataAll.forEach((pokemon)=>{if(!datafilter.has(pokemon.name))
    {datafilter.set(pokemon.name, pokemon)}})
    
    //convertendo de volta para Array e devolvendo nas variaveis
    const data = Array.from(datafilter, ([_,value])=> value)
    
    this.allPokemons = data
    this.Pokemons = data
    })};

//busca do pokemon
search(e:Event):void{
  const target = e.target as HTMLInputElement
  const value = target.value

  this.Pokemons = this.allPokemons.filter((poke)=>{
    return poke.name.toLowerCase().includes(value.toLowerCase()) || poke.national_number.includes(value)
  })

}

//filtro pokemon national number
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
 //botão ver mais
viewMore(){this.range = this.range + 20;}


 //filtro por tipo
btnFilterTypes(e:string) {
  this.Pokemons = this.allPokemons.filter((poke)=> poke.type.includes(e))
  console.log(e)

}
  //seleciona os pokemons favoritos
selectfav(name:string){

  let fav = document.getElementById(name)
  let index:number = 0
    
  if(this.pokemonfav.includes(name)){this.pokemonfav.splice(this.pokemonfav.indexOf(name),1)}
  else{this.pokemonfav.push(name)} 
  
  //remove o botão ver mais
  if(fav!.style.display == 'block') {fav!.style.display = ''}
  else{fav!.style.display = 'block', this.heartfav = fasHeart}

  
}


//botão fav On-Off
filterFavBtn(){
  
  if(this.btnOnOff == false) {this.Pokemons = this.allPokemons.filter((a)=> this.pokemonfav.includes(a.name)), this.btnOnOff = true}
  else{this.Pokemons = this.allPokemons, this.btnOnOff = false}
  if(this.view == 'flex'){this.view = 'none'}
  else {this.view = 'flex'}  
  console.log(this.view)
}
 
}
