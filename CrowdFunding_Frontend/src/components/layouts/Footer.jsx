export default function Footer(){
    return(
        <>
        <div
    className="container-fluid footer py-6 my-6 mb-0 bg-light wow bounceInUp"
    data-wow-delay="0.1s"
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h1 className="text-primary">
              Spark<span className="text-dark">Fund</span>
            </h1>
            <p className="lh-lg mb-4">
              Fueling the Next Generation of Startup Giants
            </p>
            <div className="footer-icon d-flex">
              <a
                className="btn btn-primary btn-sm-square me-2 rounded-circle"
                href="https://www.facebook.com/"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="btn btn-primary btn-sm-square me-2 rounded-circle"
                href="https://www.twitter.com"
              >
                <i className="fab fa-x" />
              </a>
              <a
                href="https://www.instagram.com"
                className="btn btn-primary btn-sm-square me-2 rounded-circle"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="https://www.linkedin.com"
                className="btn btn-primary btn-sm-square rounded-circle"
              >
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h4 className="mb-4">Categories</h4>
            <div className="d-flex flex-column align-items-start">
              <a className="text-body mb-3" href="/viewcategories">
                <i className="fa fa-check text-primary me-2" />
                Medical
              </a>
              <a className="text-body mb-3" href="/viewcategories">
                <i className="fa fa-check text-primary me-2" />
              Agriculture
              </a>
              <a className="text-body mb-3" href="/viewcategories">
                <i className="fa fa-check text-primary me-2" />
               FashionIndustry
              </a>
              <a className="text-body mb-3" href="/viewcategories">
                <i className="fa fa-check text-primary me-2" />
                Food Industry
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h4 className="mb-4">Contact Us</h4>
            <div className="d-flex flex-column align-items-start">
              <p>
                <i className="fa fa-building text-primary me-2" /> 123
                Street, Jalandhar, Punjab
              </p>
              <p>
                <i className="fa fa-phone text-primary me-2" /> (+91) 1234567899
              </p>
              <p>
                <i className="fas fa-envelope text-primary me-2" />{" "}
                abc@example.com
              </p>
              <p>
                <i className="fa fa-clock text-primary me-2" /> 24/7 Hours
                Service
              </p>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-3 col-md-6">
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
        </div> */}
      </div>
    </div>
  </div>
  {/* Footer End */}
  {/* Copyright Start */}
  <div className="container-fluid copyright bg-dark py-4">
    <div className="container">
      <div className="row text-center">
        <div className="col-md-12 text-center text-md-start mb-3 mb-md-0">
          <span className="text-light ">
            <a href="#">
              <i className="fas fa-copyright text-light me-2" />
             SparkFund
            </a>
            , All right reserved.
          </span>
        </div>
        {/* <div className="col-md-6 my-auto text-center text-md-end text-white">
          /*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. *** /
          /*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, *** /
          /*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". *** /
          Designed By{" "}
          <a className="border-bottom" href="https:/o7services.com">
            O7 Services
          </a>{" "}
         
          
        </div> */}
      </div>
    </div>
  </div>
        </>
    )
}