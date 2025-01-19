import axios from 'axios';


export async function addToCart(discItem: string, quantity: number) {
    try {
      const response = await axios.post('/api/add-to-cart', {
        discItem: discItem,
        quantity: quantity,
      });
  
      return response.data; // Return the data from the response (success message, cart item)
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error; // Re-throw the error to be handled by the calling code
    }
  }


  export async function deleteCartItem(cartItemId: number) {
    try {
      const response = await axios.delete('/api/delete-cart-item', {
        params: {
          id: cartItemId,
        },
      });
  
      return response.data; // Return success message from response
    } catch (error) {
      console.error('Error deleting cart item:', error);
      throw error; // Re-throw the error for handling in the calling code
    }
  }

  export async function updateCartItemQuantity(cartItemId: number, newQuantity: number) {
    try {
      const response = await axios.put('/api/update-cart-item', 
        {
          quantity: newQuantity
        },
        {
          params: {
            id: cartItemId,  // Send cart item ID as a query parameter
          }
        }
      );
  
      return response.data; // Return the updated cart item data
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      throw error; // Re-throw the error for handling in the calling code
    }
  }