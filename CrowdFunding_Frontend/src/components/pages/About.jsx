import { Link } from "react-router-dom";

export default function About(){
    return(
        <>

        <>
  
 <>
  
  {/* Navbar start */}
 
  {/* Navbar End */}
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
  <div className="container-fluid  py-2  mt-0">
    <div className="container text-center ">
      <h1 className="display-1 mb-4">About Us</h1>
      <ol className="breadcrumb justify-content-center mb-0 ">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/about">About</Link>
        </li>
        
      </ol>
    </div>
  </div>
  {/* Hero End */}
  {/* About Satrt */}
  <div className="container-fluid py-6">
    <div className="container">
      <div className="row g-5 align-items-center">
        <div className="col-lg-5" data-wow-delay="0.1s">
          <img src="/assets/img/invest.jpg" className="img-fluid rounded" alt="" />
        </div>
        <div className="col-lg-7" data-wow-delay="0.3s">
          <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
            About Us
          </small>
        <h1 className="display-5 mb-4">
  AI-Powered Smart Investment Solutions
</h1>

<p className="mb-4">
  Our intelligent AI system analyzes market trends, risk factors, and user goals to deliver personalized investment suggestions. 
  </p>

<div className="row g-4 text-dark mb-5">
  <div className="col-sm-6">
    <i className="fas fa-share text-primary me-2" />
    AI-Driven Investment Recommendations
  </div>

  <div className="col-sm-6">
    <i className="fas fa-share text-primary me-2" />
    AI-Generated Idea Score for Every Idea
  </div>

  <div className="col-sm-6">
    <i className="fas fa-share text-primary me-2" />
   AI-Based Idea & Title Evaluation
  </div>

  <div className="col-sm-6">
    <i className="fas fa-share text-primary me-2" />
    Clear Explanations to Support Decision Making
  </div>
</div>

<Link to="/viewcategories" className="btn btn-primary py-3 px-5 rounded-pill">
  Explore Ideas
  <i className="fas fa-arrow-right ps-2" />
</Link>
        </div>
      </div>
    </div>
  </div>
  {/* About End */}


   <div className="container py-5">
  <div className="text-center mb-5">
    <h2 className="fw-bold">How Spark Fund Works</h2>
    <p className="text-muted">
      Connecting innovative ideas with smart investors
    </p>
  </div>

  <div className="row g-4 text-center">

    {/* Step 1 */}
    <div className="col-md-4 ">
      <div className="card border-0 shadow-sm h-100 p-4 temp-color text-light">
        <div className="mb-3 fs-1"><i class="fa-solid fa-lightbulb primary  fa-3x "></i></div>
        <h5 className="fw-semibold">Owner Adds Idea</h5>
        <p className="text-dark">
          Entrepreneurs submit their innovative ideas with pitch videos and details.
        </p>
      </div>
    </div>

    {/* Step 2 */}
    <div className="col-md-4">
      <div className="card border-0 shadow-sm h-100 p-4 temp-color text-light">
        <div className="mb-3 fs-1"><i class="fa-solid fa-magnifying-glass-dollar  fa-3x "></i></div>
        <h5 className="fw-semibold">Investors Explore</h5>
        <p className="text-dark">
          Investors browse verified ideas and evaluate opportunities.
        </p>
      </div>
    </div>

    {/* Step 3 */}
    <div className="col-md-4">
      <div className="card border-0 shadow-sm h-100 p-4 temp-color text-light">
        <div className="mb-3 fs-1"><i class="fa-solid fa-sack-dollar  fa-3x"></i></div>
        <h5 className="fw-semibold">Investment Happens</h5>
        <p className="text-dark">
          Investors fund promising ideas and help bring them to life.
        </p>
      </div>
    </div>

  </div>
</div>
  {/* Fact Start*/}
   <div className="container-fluid faqt py-6">
    <div className="container">
      <div className="row g-4 align-items-center">
        <div className="col-lg-7">
          <div className="row g-4">
            <div className="col-sm-4 wow bounceInUp" data-wow-delay="0.3s">
              <div className="faqt-item bg-primary rounded p-4 text-center">
                <i className="fas fa-users fa-4x mb-4 text-white" />
                <h1 className="display-4 fw-bold" data-toggle="counter-up">
                  689
                </h1>
                <p className="text-dark text-uppercase fw-bold mb-0">
                 Ideas
                </p>
              </div>
            </div>
            <div className="col-sm-4 wow bounceInUp" data-wow-delay="0.5s">
              <div className="faqt-item bg-primary rounded p-4 text-center">
                <i className="fas fa-users-cog fa-4x mb-4 text-white" />
                <h1 className="display-4 fw-bold" data-toggle="counter-up">
                  107
                </h1>
                <p className="text-dark text-uppercase fw-bold mb-0">
                  Expert Investors
                </p>
              </div>
            </div>
            <div className="col-sm-4 wow bounceInUp" data-wow-delay="0.7s">
              <div className="faqt-item bg-primary rounded p-4 text-center">
                <i className="fas fa-check fa-4x mb-4 text-white" />
                <h1 className="display-4 fw-bold" data-toggle="counter-up">
                  253
                </h1>
                <p className="text-dark text-uppercase fw-bold mb-0">
                 Completed Deals
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 wow bounceInUp" data-wow-delay="0.1s">
        
             <video autoplay className=" w-100 h-100  "
            src="/assets/img/3248990-uhd_3840_2160_25fps.mp4" type="video/mp4">
         
             </video>
           
         
        </div>
      </div>
    </div>
  </div>
  {/* Modal Video */}
  <div
    className="modal fade"
    id="videoModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content rounded-0">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Youtube Video
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          {/* 16:9 aspect ratio */}
          <div className="ratio ratio-16x9">
            <iframe
              className="embed-responsive-item"
              src=""
              id="video"
              allowFullScreen=""
              allowscriptaccess="always"
              allow="autoplay"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Fact End */}

 
  {/* Team Start */}
  {/* <div className="container-fluid team py-6">
    <div className="container">
      <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
        <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
          Our Team
        </small>
        <h1 className="display-5 mb-5">We have experienced chef Team</h1>
      </div>
      <div className="row g-4">
        <div className="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.1s">
          <div className="team-item rounded">
            <img
              className="img-fluid rounded-top "
              src="/assets/img/team-1.jpg"
              alt=""
            />
            <div className="team-content text-center py-3 bg-dark rounded-bottom">
              <h4 className="text-primary">Henry</h4>
              <p className="text-white mb-0">Decoration Chef</p>
            </div>
            <div className="team-icon d-flex flex-column justify-content-center m-4">
              <a
                className="share btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fas fa-share-alt" />
              </a>
              <a
                className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.3s">
          <div className="team-item rounded">
            <img
              className="img-fluid rounded-top "
              src="/assets/img/team-2.jpg"
              alt=""
            />
            <div className="team-content text-center py-3 bg-dark rounded-bottom">
              <h4 className="text-primary">Jemes Born</h4>
              <p className="text-white mb-0">Executive Chef</p>
            </div>
            <div className="team-icon d-flex flex-column justify-content-center m-4">
              <a
                className="share btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fas fa-share-alt" />
              </a>
              <a
                className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.5s">
          <div className="team-item rounded">
            <img
              className="img-fluid rounded-top "
              src="/assets/img/team-3.jpg"
              alt=""
            />
            <div className="team-content text-center py-3 bg-dark rounded-bottom">
              <h4 className="text-primary">Martin Hill</h4>
              <p className="text-white mb-0">Kitchen Porter</p>
            </div>
            <div className="team-icon d-flex flex-column justify-content-center m-4">
              <a
                className="share btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fas fa-share-alt" />
              </a>
              <a
                className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.7s">
          <div className="team-item rounded">
            <img
              className="img-fluid rounded-top "
              src="/assets/img/team-4.jpg"
              alt=""
            />
            <div className="team-content text-center py-3 bg-dark rounded-bottom">
              <h4 className="text-primary">Adam Smith</h4>
              <p className="text-white mb-0">Head Chef</p>
            </div>
            <div className="team-icon d-flex flex-column justify-content-center m-4">
              <a
                className="share btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fas fa-share-alt" />
              </a>
              <a
                className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                href=""
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}
  {/* Team End */}
  {/* Footer Start */}
 
</>

</>

        </>
    )
}