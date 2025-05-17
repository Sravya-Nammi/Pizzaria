import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-checkout',
  standalone:false,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  customerName: string = '';
  customerAddress: string = '';
  orderPlaced: boolean = false;

  constructor(private cartService: CartService, private router: Router) {} 

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  placeOrder() {
    if (!this.customerName || !this.customerAddress) {
      alert("Please enter your name and address.");
      return;
    }

    const orderDetails = {
      customerName: this.customerName,
      customerAddress: this.customerAddress,
      cartItems: this.cartItems,
      totalPrice: this.totalPrice,
      date: new Date()
    };

    console.log("Order placed:", orderDetails); 
    this.orderPlaced = true;
    this.cartService.clearCart();

    
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
}