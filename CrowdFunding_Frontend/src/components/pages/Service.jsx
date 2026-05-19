export default function Service() {
    return
    (
        <>
            <>
                <header id="header" className="header d-flex align-items-center fixed-top">
                    <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                        <a
                            href="index.html"
                            className="logo d-flex align-items-center me-auto me-xl-0"
                        >
                            {/* Uncomment the line below if you also wish to use an image logo */}
                            {/* <img src="assets/img/logo.webp" alt=""> */}
                            <h1 className="sitename">TheProperty</h1>
                        </a>
                        <nav id="navmenu" className="navmenu">
                            <ul>
                                <li>
                                    <a href="index.html">Home</a>
                                </li>
                                <li>
                                    <a href="about.html">About</a>
                                </li>
                                <li>
                                    <a href="properties.html">Properties</a>
                                </li>
                                <li>
                                    <a href="services.html" className="active">
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a href="agents.html">Agents</a>
                                </li>
                                <li>
                                    <a href="blog.html">Blog</a>
                                </li>
                                <li className="dropdown">
                                    <a href="#">
                                        <span>More Pages</span>{" "}
                                        <i className="bi bi-chevron-down toggle-dropdown" />
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="property-details.html">Property Details</a>
                                        </li>
                                        <li>
                                            <a href="service-details.html">Service Details</a>
                                        </li>
                                        <li>
                                            <a href="agent-profile.html">Agent Profile</a>
                                        </li>
                                        <li>
                                            <a href="blog-details.html">Blog Details</a>
                                        </li>
                                        <li>
                                            <a href="terms.html">Terms</a>
                                        </li>
                                        <li>
                                            <a href="privacy.html">Privacy</a>
                                        </li>
                                        <li>
                                            <a href="404.html">404</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#">
                                        <span>Dropdown</span>{" "}
                                        <i className="bi bi-chevron-down toggle-dropdown" />
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="#">Dropdown 1</a>
                                        </li>
                                        <li className="dropdown">
                                            <a href="#">
                                                <span>Deep Dropdown</span>{" "}
                                                <i className="bi bi-chevron-down toggle-dropdown" />
                                            </a>
                                            <ul>
                                                <li>
                                                    <a href="#">Deep Dropdown 1</a>
                                                </li>
                                                <li>
                                                    <a href="#">Deep Dropdown 2</a>
                                                </li>
                                                <li>
                                                    <a href="#">Deep Dropdown 3</a>
                                                </li>
                                                <li>
                                                    <a href="#">Deep Dropdown 4</a>
                                                </li>
                                                <li>
                                                    <a href="#">Deep Dropdown 5</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#">Dropdown 2</a>
                                        </li>
                                        <li>
                                            <a href="#">Dropdown 3</a>
                                        </li>
                                        <li>
                                            <a href="#">Dropdown 4</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="contact.html">Contact</a>
                                </li>
                            </ul>
                            <i className="mobile-nav-toggle d-xl-none bi bi-list" />
                        </nav>
                        <a className="btn-getstarted" href="properties.html">
                            Get Started
                        </a>
                    </div>
                </header>
                <main className="main">
                    {/* Page Title */}
                    <div className="page-title">
                        <div className="heading">
                            <div className="container">
                                <div className="row d-flex justify-content-center text-center">
                                    <div className="col-lg-8">
                                        <h1 className="heading-title">Services</h1>
                                        <p className="mb-0">
                                            Odio et unde deleniti. Deserunt numquam exercitationem. Officiis
                                            quo odio sint voluptas consequatur ut a odio voluptatem. Sit
                                            dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit
                                            quaerat ipsum dolorem.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav className="breadcrumbs">
                            <div className="container">
                                <ol>
                                    <li>
                                        <a href="index.html">Home</a>
                                    </li>
                                    <li className="current">Services</li>
                                </ol>
                            </div>
                        </nav>
                    </div>
                    {/* End Page Title */}
                    {/* Services Section */}
                    <section className="real-estate-services-3 services section" id="services">
                        <div className="container" data-aos="fade-up" data-aos-delay={100}>
                            <div className="row gy-4">
                                <div className="col-lg-6 col-md-12">
                                    <div
                                        className="service-block"
                                        data-aos="fade-right"
                                        data-aos-delay={200}
                                    >
                                        <div className="service-content">
                                            <div className="icon">
                                                <i className="bi bi-house-door" />
                                            </div>
                                            <h3>Buy Your Dream Home</h3>
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
                                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                enim ad minim veniam quis nostrud exercitation.
                                            </p>
                                            <div className="stats">
                                                <div className="stat-item">
                                                    <span className="number">2,500+</span>
                                                    <span className="label">Properties Sold</span>
                                                </div>
                                                <div className="stat-item">
                                                    <span className="number">98%</span>
                                                    <span className="label">Client Satisfaction</span>
                                                </div>
                                            </div>
                                            <a href="service-details.html" className="btn-service">
                                                Learn More <i className="bi bi-arrow-right" />
                                            </a>
                                        </div>
                                        <div className="service-image">
                                            <img
                                                src="assets/img/real-estate/property-exterior-3.webp"
                                                alt="Buy Property"
                                                className="img-fluid"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div
                                        className="service-block"
                                        data-aos="fade-left"
                                        data-aos-delay={200}
                                    >
                                        <div className="service-content">
                                            <div className="icon">
                                                <i className="bi bi-currency-dollar" />
                                            </div>
                                            <h3>Sell Your Property</h3>
                                            <p>
                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                                accusantium doloremque laudantium, totam rem aperiam eaque
                                                ipsa quae ab illo inventore veritatis.
                                            </p>
                                            <div className="stats">
                                                <div className="stat-item">
                                                    <span className="number">45</span>
                                                    <span className="label">Days Average Sale</span>
                                                </div>
                                                <div className="stat-item">
                                                    <span className="number">$2.5M+</span>
                                                    <span className="label">Highest Sale Price</span>
                                                </div>
                                            </div>
                                            <a href="service-details.html" className="btn-service">
                                                Get Valuation <i className="bi bi-arrow-right" />
                                            </a>
                                        </div>
                                        <div className="service-image">
                                            <img
                                                src="assets/img/real-estate/property-exterior-7.webp"
                                                alt="Sell Property"
                                                className="img-fluid"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row gy-4 mt-4">
                                <div className="col-lg-4 col-md-6">
                                    <div
                                        className="service-card"
                                        data-aos="zoom-in"
                                        data-aos-delay={100}
                                    >
                                        <div className="card-icon">
                                            <i className="bi bi-key" />
                                        </div>
                                        <h4>Rental Services</h4>
                                        <p>
                                            At vero eos et accusamus et iusto odio dignissimos ducimus qui
                                            blanditiis praesentium voluptatum.
                                        </p>
                                        <div className="feature-list">
                                            <div className="feature-item">
                                                <i className="bi bi-check2" />
                                                <span>Tenant Screening</span>
                                            </div>
                                            <div className="feature-item">
                                                <i className="bi bi-check2" />
                                                <span>Property Marketing</span>
                                            </div>
                                            <div className="feature-item">
                                                <i className="bi bi-check2" />
                                                <span>Lease Management</span>
                                            </div>
                                        </div>
                                        <a href="service-details.html" className="service-link">
                                            Explore Rentals <i className="bi bi-arrow-right" />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div
                                        className="service-card"
                                        data-aos="zoom-in"
                                        data-aos-delay={200}
                                    >
                                        <div className="card-icon">
                                            <i className="bi bi-graph-up" />
                                        </div>
                                        <h4>Investment Consulting</h4>
                                        <p>
                                            Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                            qui officia deserunt mollit anim id.
                                        </p>
                                        <div className="feature-list">
                                            <div className="feature-item">
                                                <i className="bi bi-check2" />
                                                <span>Market Analysis</span>
                                            </div>
                                            <div className="feature-item">
                                                <i className="bi bi-check2" />
                                                <span>ROI Calculations</span>
                                            </div>
                                            <div className="feature-item">
                                                <i className="bi bi-check2" />
                                                <span>Portfolio Planning</span>
                                            </div>
                                        </div>
                                        <a href="service-details.html" className="service-link">
                                            Start Investing <i className="bi bi-arrow-right" />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div
                                        className="service-card"
                                        data-aos="zoom-in"
                                        data-aos-delay={300}
                                    >
                                        <div className="card-icon">
                                            <i className="bi bi-tools" />
                                        </div>
                                        <h4>Property Management</h4>
                                        <p>
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat nulla pariatur.
                                        </p>
                                        <div className="feature-list">
                                            <div className="feature-item">
                                                <i className="bi bi-check2" />
                                                <span>Maintenance Coordination</span>
                                            </div>
                                            <div className="feature-item">
                                                <i className="bi bi-check2" />
                                                <span>Rent Collection</span>
                                            </div>
                                            <div className="feature-item">
                                                <i className="bi bi-check2" />
                                                <span>24/7 Support</span>
                                            </div>
                                        </div>
                                        <a href="service-details.html" className="service-link">
                                            Manage Property <i className="bi bi-arrow-right" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="cta-section" data-aos="fade-up" data-aos-delay={400}>
                                <div className="row align-items-center">
                                    <div className="col-lg-8">
                                        <h3>Ready to Take the Next Step?</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua enim
                                            ad minim veniam.
                                        </p>
                                    </div>
                                    <div className="col-lg-4 text-lg-end">
                                        <a href="#contact" className="btn btn-cta">
                                            Get Free Consultation
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* /Services Section */}
                </main>
                <footer id="footer" className="footer position-relative">
                    <div className="container">
                        <div className="row gy-5">
                            <div className="col-lg-4">
                                <div className="footer-content">
                                    <a
                                        href="index.html"
                                        className="logo d-flex align-items-center mb-4"
                                    >
                                        <span className="sitename">TheProperty</span>
                                    </a>
                                    <p className="mb-4">
                                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                                        posuere cubilia curae. Donec velit neque auctor sit amet aliquam
                                        vel ullamcorper sit amet ligula.
                                    </p>
                                    <div className="newsletter-form">
                                        <h5>Stay Updated</h5>
                                        <form
                                            action="forms/newsletter.php"
                                            method="post"
                                            className="php-email-form"
                                        >
                                            <div className="input-group">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                    required=""
                                                />
                                                <button type="submit" className="btn-subscribe">
                                                    <i className="bi bi-send" />
                                                </button>
                                            </div>
                                            <div className="loading">Loading</div>
                                            <div className="error-message" />
                                            <div className="sent-message">Thank you for subscribing!</div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-6">
                                <div className="footer-links">
                                    <h4>Company</h4>
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i className="bi bi-chevron-right" /> About
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="bi bi-chevron-right" /> Careers
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="bi bi-chevron-right" /> Press
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="bi bi-chevron-right" /> Blog
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="bi bi-chevron-right" /> Contact
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-6">
                                <div className="footer-links">
                                    <h4>Solutions</h4>
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i className="bi bi-chevron-right" /> Digital Strategy
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="bi bi-chevron-right" /> Cloud Computing
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="bi bi-chevron-right" /> Data Analytics
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="bi bi-chevron-right" /> AI Solutions
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="bi bi-chevron-right" /> Cybersecurity
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="footer-contact">
                                    <h4>Get in Touch</h4>
                                    <div className="contact-item">
                                        <div className="contact-icon">
                                            <i className="bi bi-geo-alt" />
                                        </div>
                                        <div className="contact-info">
                                            <p>
                                                2847 Maple Avenue
                                                <br />
                                                Los Angeles, CA 90210
                                                <br />
                                                United States
                                            </p>
                                        </div>
                                    </div>
                                    <div className="contact-item">
                                        <div className="contact-icon">
                                            <i className="bi bi-telephone" />
                                        </div>
                                        <div className="contact-info">
                                            <p>+1 (555) 987-6543</p>
                                        </div>
                                    </div>
                                    <div className="contact-item">
                                        <div className="contact-icon">
                                            <i className="bi bi-envelope" />
                                        </div>
                                        <div className="contact-info">
                                            <p>contact@example.com</p>
                                        </div>
                                    </div>
                                    <div className="social-links">
                                        <a href="#">
                                            <i className="bi bi-facebook" />
                                        </a>
                                        <a href="#">
                                            <i className="bi bi-twitter-x" />
                                        </a>
                                        <a href="#">
                                            <i className="bi bi-linkedin" />
                                        </a>
                                        <a href="#">
                                            <i className="bi bi-youtube" />
                                        </a>
                                        <a href="#">
                                            <i className="bi bi-github" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="copyright">
                                        <p>
                                            © <span>Copyright</span>{" "}
                                            <strong className="px-1 sitename">MyWebsite</strong>{" "}
                                            <span>All Rights Reserved</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="footer-bottom-links">
                                        <a href="#">Privacy Policy</a>
                                        <a href="#">Terms of Service</a>
                                        <a href="#">Cookie Policy</a>
                                    </div>
                                    <div className="credits">
                                        {/* All the links in the footer should remain intact. */}
                                        {/* You can delete the links only if you've purchased the pro version. */}
                                        {/* Licensing information: https://bootstrapmade.com/license/ */}
                                        {/* Purchase the pro version with working PHP/AJAX contact form: [buy-url] */}
                                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* Scroll Top */}
                <a
                    href="#"
                    id="scroll-top"
                    className="scroll-top d-flex align-items-center justify-content-center"
                >
                    <i className="bi bi-arrow-up-short" />
                </a>
                {/* Preloader */}
                <div id="preloader" />
                {/* Vendor JS Files */}
                {/* Main JS File */}
            </>
        </>
    )
}