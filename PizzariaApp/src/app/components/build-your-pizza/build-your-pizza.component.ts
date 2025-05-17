import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-build-your-pizza',
  standalone:false,
  templateUrl: './build-your-pizza.component.html',
  styleUrls: ['./build-your-pizza.component.css']
})
export class BuildYourPizzaComponent implements OnInit {
  toppings: any[] = [];
  totalPrice: number = 0;

  constructor(private pizzaService: PizzaService, private cartService: CartService) {}

  ngOnInit() {
  
    this.pizzaService.getToppings().subscribe(data => {
      this.toppings = data.map(t => ({ ...t, selected: false }));
    });
  }

  calculateTotal() {
    this.totalPrice = this.toppings
      .filter(t => t.selected)
      .reduce((sum, t) => sum + t.price, 0);
  }

  confirmSelection() {
    const selectedToppings = this.toppings.filter(t => t.selected);
    
    if (selectedToppings.length === 0) {
      alert("Please select at least one topping.");
      return;
    }

    const customPizza = {
      name: "Custom Pizza",
      toppings: selectedToppings.map(t => ({
          tname: t.tname,
          price: t.price,
          image: t.image || 'assets/custompizza.png'  
      })),
      price: this.totalPrice,
      image: 'assets/custompizza.png'  
  };

    this.cartService.addToCart(customPizza);
    alert("Your custom pizza has been added to the cart!");
  }
}