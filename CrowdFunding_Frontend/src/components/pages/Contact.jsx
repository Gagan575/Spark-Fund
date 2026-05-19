import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [load, setLoad] = useState(false);

  const handleForm = (data) => {
    setLoad(true);
    ApiService.contact(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          reset();
        } else {
          toast.error(res.data.message);
        }
        setLoad(false);
      })
      .catch((err) => {
        setLoad(false);
        toast.error(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      });
  };

  const handleError = () => {
    toast.error("All fields are required");
  };

  useEffect(() => {
    document.body.style.overflow = load ? "hidden" : "auto";
  }, [load]);

  return (
    <>
      {/* Spinner Start */}
      {load && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-3">Sending Message...</p>
        </div>
      )}

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
      <div className="container-fluid pb-3 my-1 mt-0">
        <div className="container text-center ">
          <h1 className="display-1 mb-4">Contact</h1>
          <ol className="breadcrumb justify-content-center mb-0 ">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item text-dark" aria-current="page">
              Contact
            </li>
          </ol>
        </div>
      </div>
      {/* Hero End */}

      {/* Contact Start */}
      <div
        className="container-fluid contact py-6 wow bounceInUp"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="p-5 bg-light rounded contact-form">
            <div className="row g-4">
              <div className="col-12">
                <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                  Get in touch
                </small>
                <h1 className="display-5 mb-0">
                  Contact Us For Any Queries!
                </h1>
              </div>
              <div className="col-md-6 col-lg-7">
                <p className="mb-4">
                  The contact form is now active. Fill out the details below
                  and submit your message.
                </p>
                <form onSubmit={handleSubmit(handleForm, handleError)}>
                  <input
                    type="text"
                    className="w-100 form-control p-3 mb-4 border-primary bg-light"
                    placeholder="Your Name"
                    {...register("name", { required: true })}
                  />
                  <input
                    type="email"
                    className="w-100 form-control p-3 mb-4 border-primary bg-light"
                    placeholder="Enter Your Email"
                    {...register("email", { required: true })}
                  />
                  <textarea
                    className="w-100 form-control mb-4 p-3 border-primary bg-light"
                    rows={4}
                    cols={10}
                    placeholder="Your Message"
                    {...register("message", { required: true })}
                  />
                  <button
                    className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                    type="submit"
                  >
                    Submit Now
                  </button>
                </form>
              </div>
              <div className="col-md-6 col-lg-5">
                <div>
                  <div className="d-inline-flex w-100 border border-primary p-4 rounded mb-4">
                    <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                    <div className="">
                      <h4>Address</h4>
                      <p>123 Street, Jalandhar, Punjab</p>
                    </div>
                  </div>
                  <div className="d-inline-flex w-100 border border-primary p-4 rounded mb-4">
                    <i className="fas fa-envelope fa-2x text-primary me-4" />
                    <div className="">
                      <h4>Mail Us</h4>
                      <p className="mb-2">abc@example.com</p>
                    </div>
                  </div>
                  <div className="d-inline-flex w-100 border border-primary p-4 rounded">
                    <i className="fas fa-phone fa-2x text-primary me-4" />
                    <div className="">
                      <h4>Telephone</h4>
                      <p className="mb-2">(+91)1234567899</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </>
  );
}