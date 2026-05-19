import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { toast } from "react-toastify"

import { useEffect, useState } from "react"
import { ClipLoader, MoonLoader } from "react-spinners"
import ApiService from "../../../services/ApiService"



export default function AddIdea() {

    const userId = sessionStorage.getItem("userId")

    let nav = useNavigate()
    const [load, setload] = useState(false)
    const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm()
    const [category, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState("")


    const [enhancedDescription, setEnhancedDescription] = useState("");
    const [enhancedTitle, setEnhancedTitle] = useState("");

    const [enhancing, setEnhancing] = useState(false);


    const data = {
        status: "Approved"
    }

    // const handleEnhanceDescription = () => {
    //     const currenTitle  = getValues("title"); // Get description from form
    //     const currentDesc= getValues("description"); // Get description from form
    //     if (!currentTitle) {
    //         toast.error("Enter title first!");
    //         return;
    //     }
    //     if (!currentDesc) {
    //         toast.error("Enter description first!");
    //         return;
    //     }

    //     setEnhancing(true);

    //     ApiService.enhanceDescription(currentDesc)
    //         .then((res) => {
    //             if (res.success) {
    //                 setEnhancedDescription(res.data);
    //                 setEnhancedTitle(res.data);

    //                 setValue("description", res.data);
    //                 setValue("title", res.data); // Auto-fill enhanced description
    //                  // Auto-fill enhanced description
    //                 toast.success("Description enhanced!");
    //             } else {
    //                 toast.error("Failed to enhance description");
    //             }
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             toast.error("Error enhancing description");
    //         })
    //         .finally(() => {
    //             setEnhancing(false);
    //         });
    // };
    const handleEnhanceDescription = () => {
  const currentTitle = getValues("title");
  const currentDesc = getValues("description");

  if (!currentTitle) {
    toast.error("Enter title first!");
    return;
  }

  if (!currentDesc) {
    toast.error("Enter description first!");
    return;
  }

  setEnhancing(true);

  // 🔥 SAME API NAME, NEW PAYLOAD
  ApiService.enhanceDescription({
    title: currentTitle,
    description: currentDesc
  })
    .then((res) => {
        console.log("AI RESPONSE 👉", res.data); // keep once for sanity
     
const { enhancedTitle, enhancedDescription } = res.data;
        // ✅ Update form correctly
        setValue("title", enhancedTitle);
        setValue("description", enhancedDescription);

        setEnhancedTitle(enhancedTitle);
        setEnhancedDescription(enhancedDescription);

        toast.success("Title & Description enhanced!");
      
    })
    .catch((err) => {
      console.error(err);
      toast.error("Error enhancing idea");
    })
    .finally(() => {
      setEnhancing(false);
    });
};




    const fetchData = () => {




        ApiService.allCategory({ status: true })
            .then((res) => {
                if (res.data.success) {
                    setCategory(res.data.data);
                }
            })
            .catch(err => toast.error(err.message));
    };





    useEffect(() => {
        fetchData()
    }, [])





    

    const handleForm = async (data) => {
        setload(true);

        try {
            // 1️⃣ Generate AI score FIRST (hidden)
            const aiRes = await ApiService.getIdeaAIScore({
                title: data.title,
                description: data.description,
                totalSales: data.totalSales,
                currentYearSales: data.currentYearSales
            });

            const aiScore = aiRes.data.data.aiScore;

            // 2️⃣ Prepare form data
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("currentYearSales", data.currentYearSales);
            formData.append("totalSales", data.totalSales);
            formData.append("aiScore", aiScore); // ✅ CORRECT
            formData.append("categoryId", data.categoryId);
            formData.append("ownerId", userId);
            formData.append("pitchVideoUrl", data.pitchVideoUrl[0]);

            // 3️⃣ Submit idea
            const res = await ApiService.addIdea(formData);

            if (res.data.success) {
                toast.success(res.data.message);
                nav("/owner/idea/all");
            } else {
                toast.error(res.data.message);
            }

        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong"
            );
            console.log(err);
        } finally {
            setload(false);
        }
    };



    const handleError = (errors) => {
        setload(false);
        console.log("Form Errors:", errors);
        toast.error(
            errors.response?.data?.message ||
            errors.message ||
            "Something went wrong"
        );
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
                        <div className="container d-flex justify-content-center">
                            <div className="p-4 bg-light rounded contact-form">
                                <div className="row g-  ">
                                    <div className="col-12 text-center">

                                        <h1 className="display-5 mb-0">Add Idea</h1>
                                    </div>
                                    <div className="col-12 mt-4 ">

                                        <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <select
                                                        className="form-select border-primary p-2 mb-4"
                                                        aria-label="Default select example"
                                                        {...register("categoryId", {
                                                            required: "category is required",
                                                        })}
                                                    >
                                                        <option value="">
                                                            Select Category
                                                        </option>

                                                        {category.map((el) => (
                                                            <option key={el._id} value={el._id}>
                                                                {el.categoryName}
                                                            </option>
                                                        ))}
                                                    </select>


                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        required
                                                        type="text"
                                                        className="w-100 form-control p-3 mb-4 border-primary bg-light"
                                                        placeholder="Idea title"
                                                        style={{ height: 55 }}
                                                        {...register("title", {
                                                            required: {
                                                                value: true,
                                                                message: "title is req"
                                                            }
                                                        })}
                                                    />

                                                </div>
                                                
                                            </div>
                                             

                                            {/* <div className="col-md-12">
                                                <div className="form-group">
                                                    <textarea
                                                        required
                                                        className="w-100 form-control p-3 mb-4 border-primary bg-light"
                                                        placeholder="Description"
                                                        rows={3} // adjust height
                                                        {...register("description", {
                                                            required: {
                                                                value: true,
                                                                message: "description is req"
                                                            }
                                                        })}
                                                    />


                                                </div>
                                            </div>

                                            <div className="col-md-12 mb-2 d-flex align-items-center">
                                                <button

                                                    type="button"
                                                    className="btn btn-outline-success me-2"
                                                    onClick={handleEnhanceDescription}
                                                    disabled={enhancing}
                                                >
                                                    {enhancing ? "Enhancing..." : "Enhance Description and Title"}
                                                </button>
                                                {enhancedDescription && (
                                                    <span className="text-success">✅ Enhanced!</span>
                                                )}
                                            </div> */}


<div className="col-md-12">
                                            <div className="form-group position-relative">
                                                <textarea
                                                    required
                                                    className="w-100 form-control p-3 mb-4 bg-light"
                                                    placeholder="Description"
                                                    rows={3}
                                                    style={{ paddingRight: "40px" }} // space for icon/loader
                                                    {...register("description", {
                                                        required: {
                                                            value: true,
                                                            message: "Description is required",
                                                        },
                                                    })}
                                                />

                                                {/* Icon or Loader */}
                                                {enhancing ? (
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            right: "10px",
                                                            bottom: "15px",
                                                        }}
                                                    >
                                                        <div className="spinner-border spinner-border-sm text-success" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <i
                                                        className="fa-solid fa-wand-magic-sparkles"
                                                        style={{
                                                            position: "absolute",
                                                            right: "10px",
                                                            bottom: "15px",
                                                            fontSize: "20px",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={handleEnhanceDescription}
                                                    />
                                                )}

                                                {/* Optional enhanced success indicator */}
                                                {enhancedDescription && (
                                                    <span
                                                        className="text-success position-absolute"
                                                        style={{ right: "40px", bottom: "15px", fontWeight: "bold" }}
                                                    >

                                                    </span>
                                                )}
                                            </div>
                                        </div>


                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                    min={1}
                                                        required
                                                        type="number"
                                                        className="w-100 form-control p-3 mb-4 border-primary bg-light"
                                                        placeholder="Current Year Sales"
                                                        style={{ height: 55 }}
                                                        {...register("currentYearSales", {
                                                            required: {
                                                                value: true,
                                                                message: "currentYearSales is req"
                                                            }
                                                        })}
                                                    />

                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        required
                                                        min={1}
                                                        type="number"
                                                        className="w-100 form-control p-3 mb-4 border-primary bg-light"
                                                        placeholder="Total Year Sales"
                                                        style={{ height: 55 }}
                                                        {...register("totalSales", {
                                                            required: {
                                                                value: true,
                                                                message: "totalSales is req"
                                                            }
                                                        })}
                                                    />

                                                </div>
                                            </div>
                                            {/* <div className="col-md-12">
                                                <div className="form-group position-relative d-flex">

                                                    
                                                    <input 
                                                        readOnly
                                                        type="text"
                                                        className={`w-75  h-25 form-control p-3 mb-2 border-primary bg-light ${aiLoading ? "pe-none opacity-75" : ""
                                                            }`}
                                                        placeholder={aiLoading ? "AI is analyzing your idea..." : "AI Score"}
                                                        
                                                        {...register("aiScore")}
                                                    />

                                                   
                                                    <button
                                                        type="button"
                                                        className=" w-25  h-25 btn btn-sm btn-outline-primary d-flex align-items-center "
                                                        disabled={aiLoading}
                                                        onClick={() => generateAIScore(getValues())}
                                                    >
                                                        {aiLoading ? (
                                                            <>
                                                                <span  className="spinner-border spinner-border-sm h-25 w-25" />
                                                                Generating
                                                            </>
                                                        ) : (
                                                            <>
                                                                🤖 Generate AI Score
                                                            </>
                                                        )}
                                                    </button>

                                                    
                                                   

                                                </div>
                                            </div> */}







                                            <div className="col-12">
                                                <div className="form-group">

                                                    <input
                                                        required
                                                        type="file"
                                                        accept="video/*"
                                                        className=" w-100 form-control p-3 mb-4 border-primary "
                                                        {...register("pitchVideoUrl", {
                                                            required: "pitchVideoUrl is required"
                                                        })}
                                                    />

                                                </div>
                                            </div>




                                            <button
                                                className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                                                type="submit"
                                            >
                                                Add Idea
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



