// Types
export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
  }
  
 export interface CartItem extends Product {
    quantity: number;
  }
  
export  interface OrderSummary {
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
  }
  