import Avatar from './Avatar';

function Header() {
  return (
    <header>
      <div>
        <h2>Agro Management</h2>
      </div>
      <Avatar fallback='RM' />
    </header>
  );
}
export default Header;
