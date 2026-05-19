import { useEffect, useState } from "react"
import ApiService from "../../../services/ApiService"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"

export default function OwnerInvestment() {

    const ownerId = sessionStorage.getItem("userId")

    const [investments, setInvestments] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = () => {
        setLoading(true)

        ApiService.allInvestment({})
            .then(res => {
                if (res.data.success) {
                     const filtered = (res.data.data || []).filter(inv => {
            // ❗ guard clause (MOST IMPORTANT)
            if (!inv.ideaId || !inv.ideaId.ownerId) return false

            // ownerId could be object or string
            const ideaOwnerId =
                typeof inv.ideaId.ownerId === "object"
                    ? inv.ideaId.ownerId._id
                    : inv.ideaId.ownerId

            return String(ideaOwnerId) === String(ownerId)
        })

        setInvestments(filtered)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(err => toast.error(err.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
       
            {/* Hero */}
            <div className="container-fluid  py-4 my-4 mt-0">
    <div className="container text-center ">
      <h1 className="display-1 mb-4"> All Investments </h1>
      <ol className="breadcrumb justify-content-center mb-0 ">
        <li className="breadcrumb-item">
          <a href="/owner">Home</a>
        </li>
       
        <li className="breadcrumb-item text-dark" aria-current="page">
          Investments
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

            {/* Investment Cards */}
             <div className="container">
                <div className="row">
                    <div className="col">
                        {investments.length > 0 ? (
                            <div className="table-responsive">
                                < table className="table border ">
                                    <thead className="thead-dark">
                                        <tr className="text-dark">
                                            <th scope="col">Sno</th>
                                            <th scope="col">Investor Name</th>
                                            <th scope="col">Idea Name</th>

                                            
                                            <th scope="col">Amount</th>
                                            
                                            <th scope="col">EquityPercent</th>

                                            <th scope="col">Status</th>
                                            



                                        </tr>
                                    </thead>
                                    <tbody>

                                        {investments?.map((el, index) => (
                                            <tr key={index}>
                                                <td className="text-dark">{index + 1}</td>
                                                <td >
                                                    <h5>{el?.investorId?.name}</h5>
                                                </td>
                                                <td className="hover-bg">
                                                    <h5> {el?.ideaId?.title}</h5>
                                                </td>

                                                <td className="hover-bg">
                                                    <h5>₹ {el?.amount}</h5>
                                                </td>

                                                <td >
                                                    <h5> {el?.equityPercent} %</h5>
                                                </td>
                                                



                                                {/* <td className="hover-bg text-center">
                                                    {el?.pitchVideoUrl ? (
                                                        <video
                                                            src={el.pitchVideoUrl}
                                                            width="70"
                                                            height="55"
                                                            muted
                                                            preload="metadata"
                                                            onClick={() => setPreviewVideo(el.pitchVideoUrl)}
                                                            style={{
                                                                cursor: "pointer",
                                                                // objectFit: "cover",
                                                                borderRadius: "4px",
                                                                border: "1px solid #ddd"
                                                            }}
                                                        />
                                                    ) : (
                                                        <span>No Video</span>
                                                    )}
                                                </td> */}


                                                <td className="hover-bg">
                                                    <h5 className={
                                                        el.status === "Approved"
                                                            ? "text-success"
                                                            : el.status === "Rejected"
                                                                ? "text-danger"
                                                                : "text-warning"
                                                    }>
                                                        {el.status}
                                                    </h5>
                                                </td>

                                                {/* <td >
                                                     <select
                                                        className="form-select form-select-sm d-inline w-auto"
                                                        value={el.status}
                                                        onChange={(e) => changeStatus(el._id, e.target.value)}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Approved">Approved</option>
                                                        <option value="Rejected">Rejected</option>
                                                        <option value="Funded">Funded</option>
                                                    </select>
                            
                                                    <button className="btn" onClick={() => { deleteinvestment(el?._id) }}><i class="bi bi-trash-fill"></i></button>
                                                    <Link to={`/owner/Manageinvestment/${el.categoryId._id}`} className="btn btn-success mx-2"> <i class="bi bi-eye"></i></Link>
                                                    <Link to={`/owner/investment/update/${el._id}`} className="btn btn-success mx-2"> <i class="bi bi-pencil-fill"></i></Link>
                                                </td> */}
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    No Investment available
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
