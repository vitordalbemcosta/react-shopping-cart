import { useState } from 'react'
import { useQuery } from 'react-query'


//components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';


// Styles
import { Wrapper, StyledButton } from './App.styles';



// Types
export type CartItemType = {
  id: number;
  category: string;
  description:  string;
  image: string;
  price: number;
  title: string;
  amount: number;
}


const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();


const App = () => {
  const [ cartOpen, setCartOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);


  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
  
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(items => items.id === clickedItem.id)

      if (isItemInCart) {
        return prev.map(items => 
          items.id === clickedItem.id
            ? { ...items, amount: items.amount + 1 }
            : items
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }]
    })
  };

  const handleRemoveFromCart = () => null;


  if (isLoading) return <LinearProgress />;
  if(error) return <div> Oh no! Something went wrong... </div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItem= {cartItems}
          addToCart= {handleAddToCart}
          removeFromCart= {handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(items => 
          <Grid item key={items.id} xs={12} sm={4}>
            <Item item={items} handleAddToCart={handleAddToCart} />
          </Grid>
        )}


      </Grid>
    </Wrapper>
  );

};

export default App;
