import { useEffect, useState } from "react"
import ApiService from "../../../services/ApiService"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import ReadMore from "../../pages/ReadMore";
import ClipLoader from "react-spinners/ClipLoader";

export default function ViewCategories() {

    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = () => {

        setLoading(true)

        ApiService.allCategory({ status: true })
            .then((res) => {
                if (res.data.success) {
                    setCategory(res.data.data)
                }
                else {
                    toast.error(res.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className="container-fluid  py-3 mt-0">
                <div className="container text-center">
                    <h1 className="display-1 mb-4">Categories</h1>
                </div>
            </div>

            <div className="container-fluid team py-4">
                <div className="container">

                  
                    {loading ? (
                        <div className="loader-wrapper">
                            <ClipLoader
                                color="#000000"
                                size={50}
                            />
                        </div>
                    ) : (
                        <div className="row g-4 d-flex  ">
                            {category.length > 0 ? (
                                category.map((el) => (
                                  

 <div key={el._id} className="col-lg-4 col-md-6 ">
                                        <Link to={`/manageideas/${el._id}`}>
                                            <div className="team-item rounded">
                                                <img
                                                    className="img-fluid rounded-top w-100"
                                                    src={el.image}
                                                    style={{ height: '250px', objectFit: 'cover' }}
                                                    alt=""
                                                />
                                                <div className="team-content text-center py-3 bg-dark rounded-bottom">
                                                    <h4 className="text-primary">
                                                        {el.categoryName}
                                                    </h4>
                                                    
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
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}