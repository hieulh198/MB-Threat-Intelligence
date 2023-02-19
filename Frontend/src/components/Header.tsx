import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation()
  const current = location.pathname
  return (
    <header className="container py-3 border-bottom">
      <div className="row">
        <div className="col fs-4 align-self-center">RedLineStealer Data</div>
        <div className="col d-flex justify-content-end align-self-center">
          <ul className="nav nav-pills">
            <li className="nav-item"><a href="/" className={`nav-link ${current === '/' && 'active'}`}>Home</a></li>
            <li className="nav-item"><a href="/export" className={`nav-link ${current === '/export' && 'active'}`}>Export Files</a></li>
          </ul>
        </div>
      </div>
    </header >
  );
};

export default Header;
