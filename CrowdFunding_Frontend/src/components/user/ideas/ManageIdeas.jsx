import { useEffect, useState } from "react"
import ApiService from "../../../services/ApiService"
import { toast } from "react-toastify"
import { Link, useParams } from "react-router-dom"
import ReadMore from "../../pages/ReadMore"
import ClipLoader from "react-spinners/ClipLoader"

export default function ManageIdeas() {
  const { id } = useParams()

  const [idea, setIdea] = useState([])
  const [loading, setLoading] = useState(true)
  const [previewVideo, setPreviewVideo] = useState(null)

  const data = {
    categoryId: id,
    status: "Approved"
  }

  const fetchData = () => {
    setLoading(true)

    ApiService.allIdea(data)
      .then((res) => {
        if (res.data.success) {
          setIdea(res.data.data)
        } else {
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
  }, [id])

  return (
    <>
      <div className="container-fluid  py-3 mt-0">
        <div className="container text-center">
          <h1 className="display-1 mb-4">Ideas</h1>
        </div>
      </div>

      <div className="container-fluid py-6">
        <div className="container">

          {/* ✅ LOADER */}
          {loading ? (
            <div className="loader-wrapper">
              <ClipLoader color="#000000" size={50} />
            </div>
          ) : (
           <div className="container py-4">
  <div className="row g-4 justify-content-center">

    {idea.length > 0 ? (
      idea.map((el) => (
        <div key={el._id} className="col-lg-4 col-md-6 col-sm-12">

          <div className="card shadow-sm border-0 h-100 idea-card" style={{backgroundColor:"#d4a762"}}>

            <Link
              to={`/viewideas/${el._id}`}
              className="text-decoration-none text-dark"
            >

              {/* Video Section */}
              <div className="card-img-top bg-light" style={{ height: "200px", overflow: "hidden" }}>
                {el?.pitchVideoUrl ? (
                  <video
                    src={el.pitchVideoUrl}
                    muted
                    preload="metadata"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                    No Video
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-2">
                  {el.title}
                </h5>

                <small className="text-light">
                  View
                </small>
              </div>

            </Link>

          </div>

        </div>
      ))
    ) : (
      <div className="col-12 text-center">
        <h4 className="text-muted">No Ideas available</h4>
        <p>Please check back later.</p>
      </div>
    )}

  </div>
</div> 
          )}

        </div>
      </div>

      {/* Video Preview Modal */}
      {previewVideo && (
        <div
          onClick={() => setPreviewVideo(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <video
            src={previewVideo}
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "6px"
            }}
          />
        </div>
      )}
    </>
  )
}