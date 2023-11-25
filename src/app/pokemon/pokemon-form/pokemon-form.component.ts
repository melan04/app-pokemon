import { Component, Input, OnInit } from "@angular/core";
import { PokemonService } from "../pokemon.service";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";

@Component({
  selector: "app-pokemon-form",
  templateUrl: "./pokemon-form.component.html",
  styleUrls: ["./pokemon-form.component.css"],
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon; // Pour passer un pokemon en entrée lorsque qu'on utilise le pokemon form
  types: string[];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList(); // recupère la liste de tous les types du Pokemon
  }

  hasType(type: string): boolean {
    // Détermine si le pokemon en cours d'édition possède le type de paramètre ou non
    return this.pokemon.types.includes(type); // Si mon pokemon a dans ses types le type passé en paramètre . Include() renvoie 'true' ou 'false' , c'est du JS natif.
  }

  selectType($event: Event, type: string) {
    // Pour savoir si la case et cochée ou décochée
    const isChecked: boolean = ($event.target as HTMLInputElement).checked; // Si l'utilisateur a checké ou non la case
    if (isChecked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

isTypesValid(type:string): boolean {

  if(this.pokemon.types.length == 1 && this.hasType(type)) {
return false;
  }

  if (this.pokemon.types.length > 2 &&!this.hasType(type)) {
    return false;
  }
  return true
}

  onSubmit() {
    console.log("Submit form");
    this.router.navigate(["/pokemon", this.pokemon.id]);
  }
}
