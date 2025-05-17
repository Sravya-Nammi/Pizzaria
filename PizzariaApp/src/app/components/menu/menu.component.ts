import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-menu',
  standalone:false,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pizzas: any[] = [];

  constructor(private pizzaService: PizzaService, private cartService: CartService) {}

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe(data => {
      this.pizzas = data;
    });
  }

  getIngredientList(pizza: any): string {
    return pizza.ingredients ? pizza.ingredients.join(', ') : 'No ingredients listed';
  }

getToppingList(pizza: any): string {
    return pizza.topping.map((t: any) => t.tname).join(', ');
}

addToCart(pizza: any) {
    this.cartService.addToCart(pizza);
    alert(`${pizza.name} added to cart!`);
}

}