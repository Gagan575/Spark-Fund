import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./header.css";
import { useState } from "react";


export default function CoachHeader() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null)


  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  let { pathname } = useLocation

  let isLogin = sessionStorage.getItem("isLogin")
  let name = sessionStorage.getItem("name")
  const nav = useNavigate()
  const logout = () => {

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor:"#d4a762 ",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear()
        nav("/login")
        Swal.fire({
          confirmButtonColor:"#d4a762 ",
          title: "Logout!",
          text: "Logout successfully.",
          icon: "success"
        });
      }
    });
  }





  return (
    <>


      <div className="container-fluid nav-bar">
        <div className="container">
          <nav className="navbar navbar-light navbar-expand-lg py-4">
            <Link to="/owner" className="navbar-brand">
              <h1 className="text-primary fw-bold mb-0">
                Spark<span className="text-dark">Fund</span>{" "}
              </h1>
            </Link>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <Link to="/owner" className="nav-item nav-link">
                  Home
                </Link>
                {/* <Link to="/about" className="nav-item nav-link active">
                  About
                </Link> */}
                <Link to="/owner/Managecategories" className="nav-item nav-link">
                  Categories
                </Link>
                  <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Idea
                  </a>
                  <div className="dropdown-menu bg-light">
                    <Link to="/owner/idea/add" className="dropdown-item">
                      Add Idea
                    </Link>
                    <Link to="/owner/idea/all" className="dropdown-item">
                     All Idea
                    </Link>
                    {/* <Link to="team.html" className="dropdown-item">
                      Our Team
                    </Link>
                    <Link to="testimonial.html" className="dropdown-item">
                      Testimonial
                    </Link>
                    <Link to="404.html" className="dropdown-item">
                      404 Page
                    </Link> */}
                  </div>
                </div>
                 <Link to="/owner/investments/all" className="nav-item nav-link">
                  Investments
                </Link>
               {/* <Link to="/menu" className="nav-item nav-link">
                  Menu
                </Link>
 */}



               



                {/* <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </a>
                  <div className="dropdown-menu bg-light">
                    <Link to="book.html" className="dropdown-item">
                      Booking
                    </Link>
                    <Link to="blog.html" className="dropdown-item">
                      Our Blog
                    </Link>
                    <Link to="team.html" className="dropdown-item">
                      Our Team
                    </Link>
                    <Link to="testimonial.html" className="dropdown-item">
                      Testimonial
                    </Link>
                    <Link to="404.html" className="dropdown-item">
                      404 Page
                    </Link>
                  </div>
                </div>
                <Link to="contact.html" className="nav-item nav-link">
                  Contact
                </Link> */}
              </div>
              {/* <button
                className="btn-search btn btn-primary btn-md-square me-4 rounded-circle d-none d-lg-inline-flex"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <i className="fas fa-search" />
              </button> */}
              {
              isLogin ?

                <>



                  <li >
                    <Link to="#" className="btn btn-primary py-2 px-4 d-none d-xl-inline-block rounded-pill" onClick={logout} >Logout {name}</Link>
                  </li>
                </>

                :
                <li >
                  <Link className="btn btn-primary py-2 px-4 d-none d-xl-inline-block rounded-pill" to="/login" >Login</Link>
                </li>
              }

            </div>
          </nav>
        </div>
      </div>


    </>
  )
}