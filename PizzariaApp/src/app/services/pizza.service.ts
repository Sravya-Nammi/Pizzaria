import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'http://localhost:5000/api/pizzas'; 

  constructor(private http: HttpClient) {}

  getPizzas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getToppings(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/toppings'); 
  }
}