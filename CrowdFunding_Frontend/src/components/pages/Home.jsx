import { Link } from "react-router-dom";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

export default function Home() {
    return (
        <>
            <>
  
  
  {/* Modal Search End */}
  {/* Hero Start */}
  <div className="container-fluid bg-light py-6 my-6 mt-0">
    <div className="container">
      <div className="row g-5 align-items-center">
        <div className="col-lg-7 col-md-12">
          <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-4 animated bounceInDown">
            Welcome to SparkFund
          </small>
          <h1 className="display-1 mb-4 animated bounceInDown">
           Invest <span className="text-primary">Spark</span>Fund
          </h1>
          <Link
           to="/viewcategories"
            className="btn btn-primary border-0 rounded-pill py-3 px-4 px-md-5 me-4 animated bounceInLeft"
          >
            Categories
          </Link>
         
        </div>
        <div className="col-lg-5 col-md-12">
          <img
            src="/assets/img/—Pngtree—financial concepts with coins charts_20942917.png"
            className="img-fluid rounded animated zoomIn"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
  {/* Hero End */}
  {/* About Satrt */}
  <div className="container-fluid py-6">
    <div className="container">
      <div className="row g-5 align-items-center">
        <div className="col-lg-5 wow bounceInUp" data-wow-delay="0.1s">
          <img src="/assets/img/idea.png" className="img-fluid rounded" alt="" />
        </div>
        <div className="col-lg-7 wow bounceInUp" data-wow-delay="0.3s">
          <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
            About Us
          </small>
          <h1 className="display-5 mb-4">Fueling the Next Generation of Startup Giants</h1>
          <p className="mb-4">
           SparkFund is a dynamic startup funding and mentorship platform inspired by the high-stakes energy of Shark Tank.

We connect bold founders with visionary investors who believe in transforming disruptive ideas into scalable, high-impact businesses. From ideation to investment, SparkFund equips entrepreneurs with capital, strategic mentorship, and real-world expertise to accelerate their growth journey.

Whether you're a first-time founder or a seasoned innovator, SparkFund is where ambition meets opportunity — and great ideas get the spotlight they deserve.
          </p>
          <div className="row g-4 text-dark mb-5">
            <div className="col-sm-6">
              <i className="fas fa-share text-primary me-2" />
             Pitch your startup to verified investors





            </div>
            <div className="col-sm-6">
              <i className="fas fa-share text-primary me-2" />
              Real-time funding & mentorship opportunities
            </div>
            <div className="col-sm-6">
              <i className="fas fa-share text-primary me-2" />
              Transparent deal-making process
            </div>
            <div className="col-sm-6">
              <i className="fas fa-share text-primary me-2" />
             Turning raw ideas into investable businesses
            </div>
          </div>
          <Link to="/viewcategories" className="btn btn-primary py-3 px-5 rounded-pill">
            Explore SparkFund
            <i className="fas fa-arrow-right ps-2" />
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* About End */}
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
  {/* <div
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
  </div> */}
  {/* Fact End */}
  {/* Service Start */}
  <div className="container-fluid service py-6">
    <div className="container">
      <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
        <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
          Our Categories
        </small>
        <h1 className="display-5 mb-5">Where you can Invest</h1>
      </div>
      <div className="row g-4">
        <div
          className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
          data-wow-delay="0.1s"
        >
          <div className="bg-light rounded service-item">
            <div className="service-content d-flex align-items-center justify-content-center p-4">
              <div className="service-content-icon text-center">
                 {/* <i className="fas fa-cheese fa-7x text-primary mb-4" />  */}
               <i class=" fas fa-solid fa-user-doctor fa-7x text-primary mb-4"></i>
               {/* <i class="bi bi-heart-pulse-fill"></i> */}
                <h4 className="mb-3">Medical & Healthcare Investment</h4>
                <p className="mb-4">
Investing in healthcare startups, med-tech solutions, digital health platforms, and services that improve patient care and medical access.                  
                </p>
                {/* <a href="#" className="btn btn-primary px-4 py-2 rounded-pill">
                  Read More
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
          data-wow-delay="0.3s"
        >
          <div className="bg-light rounded service-item">
            <div className="service-content d-flex align-items-center justify-content-center p-4">
              <div className="service-content-icon text-center">
                <i className="fa-solid fa-graduation-cap fa-7x text-primary mb-4" />
                <h4 className="mb-3">Education & EdTech Investment</h4>
                <p className="mb-4">
                  Funding education platforms, edtech startups, skill-based learning solutions, and tools that make quality education accessible to all.
                </p>
                {/* <a href="#" className="btn btn-primary px-4 py-2 rounded-pill">
                  Read More
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
          data-wow-delay="0.5s"
        >
          <div className="bg-light rounded service-item">
            <div className="service-content d-flex align-items-center justify-content-center p-4">
              <div className="service-content-icon text-center">
                <i className="fas fa-light fa-vest fa-7x text-primary mb-4" />
                <h4 className="mb-3">Fashion & Lifestyle Investment</h4>
                <p className="mb-4">
                  Empowering fashion, apparel, D2C, and lifestyle brands focused on design, sustainability, and brand innovation.
                </p>
                {/* <a href="#" className="btn btn-primary px-4 py-2 rounded-pill">
                  Read More
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
          data-wow-delay="0.7s"
        >
          <div className="bg-light rounded service-item">
            <div className="service-content d-flex align-items-center justify-content-center p-4">
              <div className="service-content-icon text-center">
                <i className="fas fa-solid fa-seedling fa-7x text-primary mb-4" />
                <h4 className="mb-3">Agriculture Investment</h4>
                <p className="mb-4">
                 Funding innovative agri-tech, sustainable farming, and food production startups that strengthen the future of agriculture.
                </p>
                {/* <a href="#" className="btn btn-primary px-4 py-2 rounded-pill">
                  Read More
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
          data-wow-delay="0.1s"
        >
          <div className="bg-light rounded service-item">
            <div className="service-content d-flex align-items-center justify-content-center p-4">
              <div className="service-content-icon text-center">
                <i className="fas fa-wine-glass-alt fa-7x text-primary mb-4" />
                <h4 className="mb-3">Food & Beverage Investment</h4>
                <p>
                 Funding food startups, cloud kitchens, packaged foods, beverages, and culinary innovations with mass appeal.
                </p>
                {/* <a href="#" className="btn btn-primary px-4 py-2 rounded-pill">
                  Read More
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
          data-wow-delay="0.3s"
        >
          <div className="bg-light rounded service-item">
            <div className="service-content d-flex align-items-center justify-content-center p-4">
              <div className="service-content-icon text-center">
                <i className="fas fa-solid fa-baseball fa-7x text-primary mb-4" />
                <h4 className="mb-3">Sports & Fitness Investment</h4>
                <p className="mb-4">
                 Supporting sports tech, fitness platforms, equipment brands, and performance-driven startups redefining active lifestyles.
                </p>
                {/* <a href="#" className="btn btn-primary px-4 py-2 rounded-pill">
                  Read More
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
          data-wow-delay="0.5s"
        >
          <div className="bg-light rounded service-item">
            <div className="service-content d-flex align-items-center justify-content-center p-4">
              <div className="service-content-icon text-center">
                <i className="fas fa-solid fa-laptop fa-7x text-primary mb-4" />
                <h4 className="mb-3">Technology Products</h4>
                <p className="mb-4">
                 Invest in innovative technology products such as laptops, smart devices, software tools, AI solutions, and digital platforms that power everyday life. 
                </p>
                {/* <a href="#" className="btn btn-primary px-4 py-2 rounded-pill">
                  Read More
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
          data-wow-delay="0.7s"
        >
          <div className="bg-light rounded service-item">
            <div className="service-content d-flex align-items-center justify-content-center p-4">
              <div className="service-content-icon text-center">
                <i className="fas fa-solid fa-business-time fa-7x text-primary mb-4" />
                <h4 className="mb-3">BUSINESS INVESTMENT </h4>
                <p className="mb-4">
                 Invest in business-focused products and services including office equipment, professional tools, logistics solutions.
                </p>
                {/* <a href="#" className="btn btn-primary px-4 py-2 rounded-pill">
                  Read More
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Service End */}
  
  {/* Menu Start */}
 
  
  {/* Blog Start */}
 
  {/* Blog End */}
  {/* Footer Start */}
  
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