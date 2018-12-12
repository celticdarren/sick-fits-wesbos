import Link from 'next/link';
import NavStyled from './styles/NavStyles';
import User from './User';
import Signout from './Signout';

const Nav = () => (

  <User>
    {({ data: { me } }) => (
      <NavStyled>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Me</a>
            </Link>
            <Signout/>
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Sign in</a>
          </Link>
        )}
      </NavStyled>
    )}
  </User>
);

export default Nav;