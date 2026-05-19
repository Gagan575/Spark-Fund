import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { ClipLoader, MoonLoader } from "react-spinners"

export default function UpdateCategory() {

    let { id } = useParams()
    let nav = useNavigate()
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()
    const[load,setLoad]=useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        let data = {
            _id: id
        }
        ApiService.singleCategory(data)
            .then((res) => {
                console.log(res);

                if (res.data.success) {

                    setValue("categoryName", res.data.data.categoryName);
                    
                    setValue("description", res.data.data.description);



                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })

       

    }


    const handleForm = (data) => {
         setLoad(true)
         const formData = new FormData();

        formData.append("categoryName", data.categoryName);
        formData.append("description", data.description);
      
         formData.append("_id",id)
        // append image ONLY if selected
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        ApiService.updateCategory(formData)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    toast.success(res.data.message)
                    setLoad(false)
                    nav("/admin/category/all")
                }
                else {
                       setLoad(false)
                    toast.error(res.data.message)
                }

            })
            .catch((err) => {
                   setLoad(false)
                toast.error(err.message);

            })

    }
    const handleError = (error) => {
           setLoad(false)
        console.log("err", error);

    }


    return (
        <>

        <>
            {
                load ?
                    (<div style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(255,255,255,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999
                    }}>
                        <div style={{ transform: "translateY(-40px)" }}>
                            <ClipLoader color="#000" size={50}   />
                        </div>
                    </div>)
                    :
                    <div
                                    className="container-fluid contact py-6 wow bounceInUp"
                                    data-wow-delay="0.1s"
                                >
                                    <div className="container d-flex justify-content-center">
                                        <div className="p-4 bg-light rounded contact-form">
                                            <div className="row g-  ">
                                                <div className="col-12 text-center">

                                                    <h1 className="display-5 mb-0">Update Category</h1>
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
                                                                       
                                                                        type="file"
                                                                        accept="image/*"
                                                                        className=" w-100 form-control p-3 mb-4 border-primary "
                                                                        {...register("image")}
                                                                    />
                                                               
                                                            </div>
                                                        </div>




                                                        <button
                                                            className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                                                            type="submit"
                                                        >
                                                           Update Category
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
    
        </>
    )
}