import CartItem from '../CartItem/CartItem';

// styles here
import { Wrapper } from './Cart.style';

// types here
import { CartItemType } from '../App'


type Props = {
    cartItem: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;

};

const Cart: React.FC<Props> = ({ cartItem, addToCart, removeFromCart }) => {
    return (
        <Wrapper>
            <h2> Your Shopping Cart</h2>
            {cartItem.length === 0 ? <p> You have no items in your cart. </p> : null}
            {cartItem.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
        </Wrapper>
    )
}

export default Cart;