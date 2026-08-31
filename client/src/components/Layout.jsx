import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Avatar from './Avatar.jsx';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLink = ({ isActive }) =>
    `nav-link${isActive ? ' active' : ''}`;

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">微圈</Link>
        <nav className="topnav">
          <NavLink to="/" end className={navLink}>新鲜事</NavLink>
          <NavLink to="/explore" className={navLink}>发现用户</NavLink>
        </nav>
        <div className="topbar-right">
          {user && (
            <Link to={`/u/${user.id}`} className="topbar-user">
              <Avatar user={user} size={30} />
              <span>{user.display_name || user.username}</span>
            </Link>
          )}
          <button className="btn btn-ghost" onClick={handleLogout}>退出</button>
        </div>
      </header>
      <main className="main">{children}</main>
    </div>
  );
}
