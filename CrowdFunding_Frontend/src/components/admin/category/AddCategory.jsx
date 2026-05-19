import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ClipLoader, MoonLoader } from "react-spinners";
import ApiService from "../../../services/ApiService";

export default function AddCategory() {
    let nav = useNavigate()
    const [load, setload] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const handleForm = (data) => {
        setload(true)
        const formData = new FormData();

        formData.append("categoryName", data.categoryName);
        formData.append("description", data.description);




        // SINGLE IMAGE
        formData.append("image", data.image[0]);

        console.log("form Submitted", data);
        ApiService.addCategory(formData)
            .then((res) => {
                if (res.data.success) {
                    setload(false)
                    console.log(res.data)
                    toast.success(res.data.message)


                    nav("/admin/category/all")
                }
                else {
                    setload(false)
                    toast.error(res.data.message)
                }

            })
            .catch((err) => {
                setload(false)
                toast.error(err.message);

            })

    }
    const handleError = (error) => {
        setload(false)
        console.log("err", error);

    }
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
                        <div className="container d-flex justify-content-center">
                            <div className="p-4 bg-light rounded contact-form">
                                <div className="row g-  ">
                                    <div className="col-12 text-center">

                                        <h1 className="display-5 mb-0">Add Category</h1>
                                    </div>
                                    <div className="col-12 mt-4 ">

                                        <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        required
                                                        type="text"
                                                        className="w-100 form-control p-3 mb-4 border-primary bg-light"
                                                        placeholder="Category Name"
                                                        style={{ height: 55 }}
                                                        {...register("categoryName", {
                                                            required: {
                                                                value: true,
                                                                message: "categoryName is req"
                                                            }
                                                        })}
                                                    />

                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        required
                                                        type="text"
                                                        className="w-100 form-control p-3 mb-4 border-primary bg-light"
                                                        placeholder="Description"
                                                        style={{ height: 55 }}
                                                        {...register("description", {
                                                            required: {
                                                                value: true,
                                                                message: "description is req"
                                                            }
                                                        })}
                                                    />

                                                </div>
                                            </div>







                                            <div className="col-12">
                                                <div className="form-group">

                                                    <input
                                                        required
                                                        type="file"
                                                        accept="image/*"
                                                        className=" w-100 form-control p-3 mb-4 border-primary "
                                                        {...register("image", {
                                                            required: "image is required"
                                                        })}
                                                    />

                                                </div>
                                            </div>




                                            <button
                                                className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                                                type="submit"
                                            >
                                               Add Category
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