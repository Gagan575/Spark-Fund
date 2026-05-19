import { useEffect, useState } from "react"
import ApiService from "../../../services/ApiService"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import ReadMore from "../../pages/ReadMore"
import { ClipLoader } from "react-spinners"

export default function ManageCategories() {

    const [category, setCategory] = useState([])
     const [loading, setLoading] = useState(false)

    const fetchData = () => {
        setLoading(true)

        ApiService.allCategory({ status: true })
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    setCategory(res.data.data)
                }
                else {
                    toast.error(res.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(()=>{
                setLoading(false)
            })
            
    }
    useEffect(() => {
        fetchData()
    }, [])





    return (


        <>
       


            {/* Modal Search End */}
            {/* Hero Start */}
            <div className="container-fluid  py-3  mt-0">
                <div className="container text-center ">
                    <h1 className="display-1 mb-4">Categories</h1>
                    <ol className="breadcrumb justify-content-center mb-0 ">
                        <li className="breadcrumb-item">
                            <a href="/owner">Home</a>
                        </li>

                        <li className="breadcrumb-item text-dark" aria-current="page">
                            Categories
                        </li>
                    </ol>
                </div>
            </div>
 {loading && (
                <div style={{
                    minHeight: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <ClipLoader color="#000" size={50} />
                </div>
            )}

            <div className="container-fluid team py-6">
                <div className="container">
                    <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
                       
                        {/* <h1 className="display-5 mb-5">We have diverse categories</h1> */}
                    </div>
                    <div className="row g-4">
                        {category.length > 0 ? (
                            category.map((el, index) => (
                                <div key={el._id} className="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.1s">
                                    <Link to={`/owner/Manageidea/${el._id}`}>
                                        <div className="team-item rounded">
                                            <img
                                                className="img-fluid rounded-top w-100"
                                                src={el.image}
                                                alt=""
                                                style={{ height: '250px', objectFit: 'cover' }}
                                            />
                                            <div className="team-content text-center py-3 bg-dark rounded-bottom">
                                                <h4 className="text-primary">{el.categoryName}</h4>
                                                
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    No Categories available
                                </h4>
                                <p>Please check back later.</p>
                            </div>
                        )}



                    </div>
                </div>
            </div>


        </>






    )
}