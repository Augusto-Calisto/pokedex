import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PokedexService {
  	constructor(private httpClient: HttpClient) { }

	public carregarPokemons(offset: number, limit: number): Observable<any> {		
		return this.httpClient.get<any>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  	}
}