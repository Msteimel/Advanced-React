import styled from 'styled-components';
import CartStyle from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  const { product } = cartItem;

  if (!product) return null;
  return (
    <CartItemStyles>
      <img
        width="100px"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)}
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!me) return null;
  return (
    <CartStyle open={cartOpen}>
      <header>
        <Supreme>{me.name}'s cart</Supreme>
        <CloseButton type="button" onClick={closeCart}>
          x
        </CloseButton>
      </header>
      <ul>
        {me.cart.map(cartItem => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyle>
  );
}
