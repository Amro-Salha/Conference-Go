import { Link, NavLink } from "react-router-dom"

function Nav() {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="">Conference GO!</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link" aria-current="page">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" id="new-location-link" aria-current="page" to="/locations/new">New Location</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" id="new-conference-link" aria-current="page" to="/conferences/new">New Conference</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" id="new-presentation-link" aria-current="page" to="/presentations/new">New Presentation</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
        </>

    )
}

export default Nav
