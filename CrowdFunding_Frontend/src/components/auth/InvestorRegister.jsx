import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import ApiService from "../../services/ApiService"
import { toast } from "react-toastify"

import { useEffect, useState } from "react"
import { ClipLoader, MoonLoader } from "react-spinners"


export default function InvestorRegister() {

    let nav = useNavigate()
    const [load, setload] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [sport, setSport] = useState([])
    const [sportId, setSportId] = useState("")






    const handleForm = (data) => {
        setload(true)

        const formData = new FormData();
        formData.append("name", data?.name);
        formData.append("email", data?.email);
        formData.append("password", data?.password);
        formData.append("contact", data?.contact);
        formData.append("riskPreference", data?.riskPreference);

        formData.append("country", data?.country);

        formData.append("profileImage", data.profileImage[0]);
formData.append("verificationImage", data.verificationImage[0]);// investor




        console.log("form Submitted", formData);
        ApiService.investorregister(formData)
            .then((res) => {
                console.log(res)

                if (res.data.success) {
                    setload(false)
                    toast.success(res.data.message)

                    let logindata = {
                        email: data.email,
                        password: data.password
                    }
                    console.log(logindata);

                    ApiService.login(logindata)
                        .then((result) => {
                            console.log(result);
                            if (res.data.success === false) {
                      setload(false)
                      toast.error("User already exists")
                      return
                    }
                            if (result.data.success) {
                                toast.success(result.data.message)
                                setload(false)
                                sessionStorage.setItem("isLogin", true)

                                sessionStorage.setItem("token", result.data.token)
                                sessionStorage.setItem("name", result.data.data.name)
                                sessionStorage.setItem("email", result.data.data.email)
                                sessionStorage.setItem("role", result.data.data.role)
                                sessionStorage.setItem("userId", result.data.data._id)
                                if (result.data.data.role == "admin") {
                                    nav("/admin")
                                }
                                else if (result.data.data.role == "owner") {
                                    nav("/owner")
                                }
                                else {
                                    nav("/")
                                }

                            } else {
                                setload(false)
                                toast.error("something went wrong")
                            }
                        })
                        .catch((err) => {
                            setload(false)
                             const firstError = Object.values(errors)[0];
        toast.error(firstError?.message || "Form has errors");
                            console.log("1", err);

                        })
                }
            })
            .catch((err) => {
                setload(false)
                toast.error(err.message)

            })
    }

    const handleError = (errors) => {
        setload(false);
        const firstError = Object.values(errors)[0];
        toast.error(firstError?.message || "Form has errors");
        
    };











    return (
        <>
            {
                load ?
                    (
                    <div style={{
                        minHeight: "60vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}>
                        <ClipLoader color="#000" size={50} />
                    </div>
                )
                    :

                    <div
                        className="container-fluid contact py-6 wow bounceInUp"
                        data-wow-delay="0.1s"
                    >
                        <div className="container d-flex justify-content-center w-50">
                            <div className="p-4 bg-light rounded contact-form">
                                <div className="row g-4 ">
                                    <div className="col-12 text-center">

                                        <h1 className="display-5 mb-0">Investor Register</h1>
                                    </div>
                                    <div className="col-16 mt-4 ">

                                        <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                          <span className="text-dark mb-3"> Name</span> 
                                                        <input
                                                            
                                                            type="text"
                                                            className="w-100 form-control p-3 mb-4 border-primary bg-light"
                                                            placeholder="Name"
                                                            style={{ height: 55 }}
                                                            {...register("name", {
                                                                required: {
                                                                    value: true,
                                                                    message: "Name is required"
                                                                },
                                                                minLength: {
                                                                        value: 3,
                                                                        message: "Name must be at least 3 characters"
                                                                    },
                                                                    pattern: {
                                                                        value: /^[A-Za-z\s]+$/,
                                                                        message: "Name should contain only letters"
                                                                    },
                                                                    validate: (value) => {
                                                                        if (value.trim().length === 0) {
                                                                            return "Name cannot be only spaces";
                                                                        }
                                                                        return true;
                                                                    }
                                                            })}
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                          <span className="text-dark mb-3">  Email</span> 
                                                        <input
                                                           
                                                            type="email"
                                                            className="w-100 form-control p-3 mb-4 border-primary bg-light"
                                                            placeholder="Your Email"
                                                            style={{ height: 55 }}
                                                            {...register("email", {
                                                               required: {
                                                                        value: true,
                                                                        message: "Email is required"
                                                                    },
                                                                    pattern: {
                                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                        message: "Invalid email format"
                                                                    }

                                                            })}
                                                        />

                                                    </div>
                                                </div>



                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                          <span className="text-dark mb-3">  Password</span> 
                                                        <input
                                                            

                                                            type="password"
                                                            className=" w-100 form-control p-3 mb-4 border-primary "
                                                            placeholder="Password"
                                                            style={{ height: 55 }}
                                                            {...register("password", {
                                                                required: {
                                                                    value: true,
                                                                    message: "Password is required"
                                                                },
                                                                minLength: {
                                                                        value: 8,
                                                                        message: "Password must be at least 8 characters"
                                                                    },
                                                                    pattern: {
                                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                                                                        message: "Password must be 8+ chars, include uppercase, lowercase, number & special character"
                                                                    }
                                                            })}
                                                        />


                                                    </div>
                                                </div>


                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                          <span className="text-dark mb-3">Contact</span> 

                                                        <input
                                                          
                                                            type="number"
                                                            inputMode="numeric"
                                                            maxLength={10}
                                                              minLength={10}



                                                            className=" w-100 form-control p-3 mb-4 border-primary "
                                                            placeholder="Contact"
                                                            style={{ height: 55 }}
                                                            {...register("contact", {
                                                                required: {
                                                                        value: true,
                                                                        message: "Contact is required"
                                                                    },
                                                                    pattern: {
                                                                        value: /^[0-9]{10}$/,
                                                                        message: "Contact must be exactly 10 digits not string"
                                                                    }, validate: (value) =>
                                                                        !/^0+$/.test(value) || "Invalid contact number"


                                                            })}
                                                        />

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                          <span className="text-dark mb-3">  Country</span> 
                                                        <select
                                                            className="form-select border-primary p-2 mb-4"
                                                            aria-label="Default select example"
                                                            {...register("country", {
                                                                required: {
                                                                    value: true,
                                                                    message: "Country is req"
                                                                }
                                                            })}
                                                        >
                                                            <option selected="">Country</option>
                                                            <option value="India">India</option>
                                                            <option value="USA">USA</option>
                                                            <option value="Russia">Russia</option>
                                                            <option value="China">China</option>
                                                            <option value="Uk">Uk</option>


                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                          <span className="text-dark mb-3">  Risk Preference</span> 
                                                        <select
                                                            className="form-select border-primary p-2 mb-4"
                                                            aria-label="Default select example"
                                                            {...register("riskPreference", {
                                                                required: {
                                                                    value: true,
                                                                    message: "Risk Preference is required"
                                                                }
                                                            })}
                                                        >
                                                            <option selected="">Risk preference</option>
                                                            <option value="low">Low</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="High">High</option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                      <span className="text-dark mb-3">  Profile Image</span> 

                                                        <input
                                                           
                                                            type="file"
                                                            accept="image/*"
                                                            className=" w-100 form-control p-3 mb-4 border-primary "
                                                            {...register("profileImage", {
                                                                required: "ProfileImage is required"
                                                            })}
                                                        />

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                          <span className="text-dark mb-3">  Verification Image</span> 

                                                        <input
                                                           
                                                            type="file"
                                                            accept="image/*"
                                                            className=" w-100 form-control p-3 mb-4 border-primary "
                                                            {...register("verificationImage", {
                                                                required: "Verification Image is required"
                                                            })}
                                                        />

                                                    </div>
                                                </div>
                                            </div>



                                            <button
                                                className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                                                type="submit"
                                            >
                                                Register
                                            </button>
                                            {/* <p className="text-center mt-2"><Link to="/register"  >Signup as Owner </Link>| <Link to="/coachregister">Investor</Link></p> */}

                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div >
                    </div >


            }
        </>
    )
}



