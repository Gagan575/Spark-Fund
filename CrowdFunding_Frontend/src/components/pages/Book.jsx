export default function Book(){
    return(
        <>
        <>
  {/* Modal Search Start */}
  <div
    className="modal fade"
    id="searchModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-fullscreen">
      <div className="modal-content rounded-0">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Search by keyword
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body d-flex align-items-center">
          <div className="input-group w-75 mx-auto d-flex">
            <input
              type="search"
              className="form-control bg-transparent p-3"
              placeholder="keywords"
              aria-describedby="search-icon-1"
            />
            <span id="search-icon-1" className="input-group-text p-3">
              <i className="fa fa-search" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Modal Search End */}
  {/* Hero Start */}
  <div className="container-fluid bg-light py-6 my-6 mt-0">
    <div className="container text-center animated bounceInDown">
      <h1 className="display-1 mb-4">Booking</h1>
      <ol className="breadcrumb justify-content-center mb-0 animated bounceInDown">
        <li className="breadcrumb-item">
          <a href="#">Home</a>
        </li>
        <li className="breadcrumb-item">
          <a href="#">Pages</a>
        </li>
        <li className="breadcrumb-item text-dark" aria-current="page">
          Booking
        </li>
      </ol>
    </div>
  </div>
  {/* Hero End */}
  {/* Book Us Start */}
  <div
    className="container-fluid contact py-6 wow bounceInUp"
    data-wow-delay="0.1s"
  >
    <div className="container">
      <div className="row g-0">
        <div className="col-1">
          <img
            src="/assets/img/background-site.jpg"
            className="img-fluid h-100 w-100 rounded-start"
            style={{ objectFit: "cover", opacity: "0.7" }}
            alt=""
          />
        </div>
        <div className="col-10">
          <div className="border-bottom border-top border-primary bg-light py-5 px-4">
            <div className="text-center">
              <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Book Us
              </small>
              <h1 className="display-5 mb-5">Where you want Our Services</h1>
            </div>
            <div className="row g-4 form">
              <div className="col-lg-4 col-md-6">
                <select
                  className="form-select border-primary p-2"
                  aria-label="Default select example"
                >
                  <option selected="">Select Country</option>
                  <option value={1}>USA</option>
                  <option value={2}>UK</option>
                  <option value={3}>India</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6">
                <select
                  className="form-select border-primary p-2"
                  aria-label="Default select example"
                >
                  <option selected="">Select City</option>
                  <option value={1}>Depend On Country</option>
                  <option value={2}>UK</option>
                  <option value={3}>India</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6">
                <select
                  className="form-select border-primary p-2"
                  aria-label="Default select example"
                >
                  <option selected="">Select Palace</option>
                  <option value={1}>Depend On Country</option>
                  <option value={2}>UK</option>
                  <option value={3}>India</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6">
                <select
                  className="form-select border-primary p-2"
                  aria-label="Default select example"
                >
                  <option selected="">Small Event</option>
                  <option value={1}>Event Type</option>
                  <option value={2}>Big Event</option>
                  <option value={3}>Small Event</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6">
                <select
                  className="form-select border-primary p-2"
                  aria-label="Default select example"
                >
                  <option selected="">No. Of Palace</option>
                  <option value={1}>100-200</option>
                  <option value={2}>300-400</option>
                  <option value={3}>500-600</option>
                  <option value={4}>700-800</option>
                  <option value={5}>900-1000</option>
                  <option value={6}>1000+</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6">
                <select
                  className="form-select border-primary p-2"
                  aria-label="Default select example"
                >
                  <option selected="">Vegetarian</option>
                  <option value={1}>Vegetarian</option>
                  <option value={2}>Non Vegetarian</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6">
                <input
                  type="mobile"
                  className="form-control border-primary p-2"
                  placeholder="Your Contact No."
                />
              </div>
              <div className="col-lg-4 col-md-6">
                <input
                  type="date"
                  className="form-control border-primary p-2"
                  placeholder="Select Date"
                />
              </div>
              <div className="col-lg-4 col-md-6">
                <input
                  type="email"
                  className="form-control border-primary p-2"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-3 rounded-pill"
                >
                  Submit Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1">
          <img
            src="/assets/img/background-site.jpg"
            className="img-fluid h-100 w-100 rounded-end"
            style={{ objectFit: "cover", opacity: "0.7" }}
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
  {/* Book Us End */}
  {/* Footer Start */}
  <div
    className="container-fluid footer py-6 my-6 mb-0 bg-light wow bounceInUp"
    data-wow-delay="0.1s"
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h1 className="text-primary">
              Cater<span className="text-dark">Serv</span>
            </h1>
            <p className="lh-lg mb-4">
              There cursus massa at urnaaculis estieSed aliquamellus vitae ultrs
              condmentum leo massamollis its estiegittis miristum.
            </p>
            <div className="footer-icon d-flex">
              <a
                className="btn btn-primary btn-sm-square me-2 rounded-circle"
                href=""
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="btn btn-primary btn-sm-square me-2 rounded-circle"
                href=""
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                href="#"
                className="btn btn-primary btn-sm-square me-2 rounded-circle"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="#"
                className="btn btn-primary btn-sm-square rounded-circle"
              >
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h4 className="mb-4">Special Facilities</h4>
            <div className="d-flex flex-column align-items-start">
              <a className="text-body mb-3" href="">
                <i className="fa fa-check text-primary me-2" />
                Cheese Burger
              </a>
              <a className="text-body mb-3" href="">
                <i className="fa fa-check text-primary me-2" />
                Sandwich
              </a>
              <a className="text-body mb-3" href="">
                <i className="fa fa-check text-primary me-2" />
                Panner Burger
              </a>
              <a className="text-body mb-3" href="">
                <i className="fa fa-check text-primary me-2" />
                Special Sweets
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h4 className="mb-4">Contact Us</h4>
            <div className="d-flex flex-column align-items-start">
              <p>
                <i className="fa fa-map-marker-alt text-primary me-2" /> 123
                Street, New York, USA
              </p>
              <p>
                <i className="fa fa-phone-alt text-primary me-2" /> (+012) 3456
                7890 123
              </p>
              <p>
                <i className="fas fa-envelope text-primary me-2" />{" "}
                info@example.com
              </p>
              <p>
                <i className="fa fa-clock text-primary me-2" /> 26/7 Hours
                Service
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h4 className="mb-4">Social Gallery</h4>
            <div className="row g-2">
              <div className="col-4">
                <img
                  src="/assets/img/menu-01.jpg"
                  className="img-fluid rounded-circle border border-primary p-2"
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  src="/assets/img/menu-02.jpg"
                  className="img-fluid rounded-circle border border-primary p-2"
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  src="/assets/img/menu-03.jpg"
                  className="img-fluid rounded-circle border border-primary p-2"
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  src="/assets/img/menu-04.jpg"
                  className="img-fluid rounded-circle border border-primary p-2"
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  src="/assets/img/menu-05.jpg"
                  className="img-fluid rounded-circle border border-primary p-2"
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  src="/assets/img/menu-06.jpg"
                  className="img-fluid rounded-circle border border-primary p-2"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Footer End */}
  {/* Copyright Start */}
  <div className="container-fluid copyright bg-dark py-4">
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
          <span className="text-light">
            <a href="#">
              <i className="fas fa-copyright text-light me-2" />
              Your Site Name
            </a>
            , All right reserved.
          </span>
        </div>
        <div className="col-md-6 my-auto text-center text-md-end text-white">
          {/*/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. *** /*/}
          {/*/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, *** /*/}
          {/*/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". *** /*/}
          Designed By{" "}
          <a className="border-bottom" href="https://htmlcodex.com">
            HTML Codex
          </a>{" "}
          Distributed By{" "}
          <a className="border-bottom" href="https://themewagon.com">
            ThemeWagon
          </a>
        </div>
      </div>
    </div>
  </div>
  {/* Copyright End */}
  {/* Back to Top */}
  <a
    href="#"
    className="btn btn-md-square btn-primary rounded-circle back-to-top"
  >
    <i className="fa fa-arrow-up" />
  </a>
  {/* JavaScript Libraries */}
  {/* Template Javascript */}
</>

        
        </>
    )
}