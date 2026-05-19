


import { useEffect, useState } from "react"
import ApiService from "../../../services/ApiService"
import { toast } from "react-toastify"
import { Link, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { ClipLoader } from "react-spinners"

export default function OwnerIdea() {
    const { id } = useParams()

     const [loading, setLoading] = useState(false)
    const [idea, setIdea] = useState([])
    const [ideaMedia, setIdeaMedia] = useState([])

    const [previewVideo, setPreviewVideo] = useState(null)

    const [likedIdeas, setLikedIdeas] = useState({})
    const [showCommentModal, setShowCommentModal] = useState(false)
    const [activeIdeaId, setActiveIdeaId] = useState(null)
    const [commentText, setCommentText] = useState("")
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    const [showMediaModal, setShowMediaModal] = useState(false)
    const [activeMediaIdeaId, setActiveMediaIdeaId] = useState(null) // idea id
    const [activeMediaId, setActiveMediaId] = useState(null) // media doc id
    const [mediaFiles, setMediaFiles] = useState([])
    const [showMedia, setShowMedia] = useState(null)

    const [isUpdate, setIsUpdate] = useState(false) // distinguish add/update
    const MAX_MEDIA = 3;


    const userId = sessionStorage.getItem("userId")
    const data = {
        categoryId: id,
        ownerId: userId
    }

    const fetchData = async () => {
         setLoading(true)

        try {
            // Fetch all ideas for this category and owner
            const resIdea = await ApiService.allIdea(data)
            if (resIdea.data.success) {
                setIdea(resIdea.data.data)
            } else {
                toast.error(resIdea.message)
            }

            // Fetch media for all ideas
            const allMedia = []
            if (resIdea.data.success && resIdea.data.data.length > 0) {
                for (let ideaItem of resIdea.data.data) {
                    const resMedia = await ApiService.allIdeaMedia({ ideaId: ideaItem._id })
                    if (resMedia.data.success) {
                        allMedia.push(...resMedia.data.data)
                    }
                }
            }
            setIdeaMedia(allMedia)

            // Fetch likes
            const resLikes = await ApiService.allLikes()
            if (resLikes.data.success) {
                const allLikes = resLikes.data.data || []
                setLikes(allLikes)

                const likedMap = {}
                allLikes.forEach(l => {
                    if ((l.userId?._id || l.userId) === userId) {
                        likedMap[l.ideaId?._id] = true
                    }
                })
                setLikedIdeas(likedMap)
            }

            // Fetch comments
            const resComments = await ApiService.allComments()
            if (resComments.data.success) {
                setComments(resComments.data.data)
            }
        } catch (err) {
            toast.error(err.message)
        }
        finally {
                setLoading(false)
            }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    const getMediaCountForIdea = (ideaId) => {
    return ideaMedia.filter(
        m => String(m.ideaId?._id || m.ideaId) === String(ideaId)
    ).length;
};


    
    const handleMedia = async () => {
    if (mediaFiles.length === 0) {
        toast.error("Please select file(s)")
        return
    }
    const existingCount = getMediaCountForIdea(activeMediaIdeaId);

    if (!isUpdate && existingCount + mediaFiles.length > MAX_MEDIA) {
        toast.error(`You can upload maximum ${MAX_MEDIA} media files per idea`);
        return;
    }

    try {
        for (let file of mediaFiles) {
            const formData = new FormData()

            if (isUpdate) {
                formData.append("_id", activeMediaId) // media doc id
                formData.append("file", file)
                await ApiService.updateIdeaMedia(formData)
            } else {
                formData.append("ideaId", activeMediaIdeaId) // idea id
                formData.append("file", file)
                await ApiService.addIdeaMedia(formData)
            }
        }

        toast.success(isUpdate ? "Media updated successfully" : "Media added successfully")

        // ✅ Refresh only the media of this idea
        if (activeMediaIdeaId) {
            const res = await ApiService.allIdeaMedia({ ideaId: activeMediaIdeaId })
            if (res.data.success) {
                setIdeaMedia(prev => {
                    // Remove old media for this idea
                    const others = prev.filter(m => String(m.ideaId?._id || m.ideaId) !== String(activeMediaIdeaId))
                    // Add fresh media
                    return [...others, ...res.data.data]
                })
            }
        }

        setMediaFiles([])
        setShowMediaModal(false)
        setIsUpdate(false)
    } catch (err) {
        toast.error(err.message || "Something went wrong")
    }
}




    const deleteIdeaMedia = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
             confirmButtonColor:"#d4a762 ",
            cancelButtonColor: "#d33",
            confirmButtonText: `${!id ? "Enable" : "Delete"}`
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    _id: id,

                }
                let token = sessionStorage.getItem("token")
                let headers = {
                    Authorization: token
                }
                ApiService.DeleteIdeaMedia(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                // text: "Your file has been deleted.",
                                 confirmButtonColor:"#d4a762 ",
                                icon: "success"
                            });
                            fetchData()
                        }
                        else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message)
                    })
            }
        })


    }





    return (
        <>
        

        
            {/* Search Modal */}
           

            {/* Hero */}
            <div className="container-fluid  py-3 mt-0">
                <div className="container text-center ">
                    <h1 className="display-1 mb-4"> Manage Ideas</h1>
                    <ol className="breadcrumb justify-content-center mb-0 ">
                        <li className="breadcrumb-item"><a href="/owner">Home</a></li>
                        {/* <li className="breadcrumb-item"><a href="#">Pages</a></li> */}
                        <li className="breadcrumb-item text-dark" aria-current="page">Idea</li>
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

            

            {/* Ideas List */}
            <div className="container py-6 d-flex flex-column align-items-center">
                {idea.length > 0 ? idea.map((el, index) => {
                    const mediaForIdea = ideaMedia.filter(
                        (m) => String(m.ideaId?._id || m.ideaId) === String(el._id)
                    );
                    return (
                        <div key={index} className="row align-items-center mb-5 shadow overflow-hidden"
                            style={{ background: "#fff", maxHeight:"600px", width: "100%", borderRadius: "14px", transition: "transform 0.3s, box-shadow 0.3s" }}>

                            {/* Video */}
                            <div className="col-md-4  p-0 position-relative">
                                <img src={el.thumbnailUrl || mediaForIdea[0]?.mediaUrl} alt="Video Thumbnail" className="w-100"
                                    style={{ height: "600px", objectFit: "cover", cursor: "pointer", borderTopLeftRadius: "14px", borderBottomLeftRadius: "14px" }}
                                    onClick={() => setPreviewVideo(el.pitchVideoUrl)} />

                                <div onClick={() => setPreviewVideo(el.pitchVideoUrl)}
                                    style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "rgba(0,0,0,0.6)", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                    <i className="fas fa-play text-white"></i>
                                </div>

                                {/* <span className="position-absolute top-0 start-0 bg-dark text-white px-3 py-1 fw-bold rounded-bottom"
                                    style={{ fontSize: "0.75rem" }}>{el.categoryId?.categoryName}</span> */}
                            </div>

                            {/* Content */}
                            <div className="col-md-8  p-4">
                                <h4 className="fw-bold mb-1">{el.title}</h4>
                                <small className="text-muted" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>{el.description}</small>

                                <div className="d-flex gap-2 my-3">
                                    <div className="border rounded p-2 text-center flex-fill">
                                        <div className="text-warning fw-bold small">Total Sales</div>
                                        <div className="fw-bold">₹{el.totalSales}</div>
                                    </div>
                                    <div className="border rounded p-2 text-center flex-fill">
                                        <div className="text-success fw-bold small">Current Year Sales</div>
                                        <div className="fw-bold">₹{el.currentYearSales}</div>
                                    </div>
                                    <div className="border rounded p-2 text-center flex-fill">
                                        <div className="text-primary fw-bold small">AI Score</div>
                                        <div className="fw-bold">{el.aiScore}</div>
                                    </div>
                                </div>

                                {/* Media Links */}
                                {mediaForIdea.length > 0 && (
                                    <div  className="col-md-12">
                                        <h6 className="fw-bold mb-1 ">Additional Media</h6>
                                        {mediaForIdea.map((media, idx) => (
                                            <div key={idx} className="d-lg-flex align-items-center gap-2 mb-1 ">
                                               <img 
    key={idx}
    src={media.mediaUrl}
    alt="media"
    onClick={() => setShowMedia(media.mediaUrl)}
    style={{
        width: "80px",
        height: "80px",
        objectFit: "cover",
        borderRadius: "8px",
        cursor: "pointer",
        border: "1px solid #ddd",
        marginRight: "8px",
        marginBottom: "8px"
    }}
/>
                                                <button className="btn btn-sm btn-outline-warning" onClick={() => {
                                                    setActiveMediaIdeaId(el._id) // idea id
                                                    setActiveMediaId(media._id) // media doc id
                                                    setIsUpdate(true)
                                                    setShowMediaModal(true)
                                                }}>Update</button>
                                                <button className="btn btn-sm btn-outline-warning" onClick={() => { deleteIdeaMedia(media?._id) }}><i classname="fa fa-trash">delete</i></button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button className="btn btn-outline-primary btn-sm mt-2" onClick={() => {
                                    setActiveMediaIdeaId(el._id)
                                    setActiveMediaId(null)
                                    setIsUpdate(false)
                                    setShowMediaModal(true)
                                }}>+ Add Media</button>

                                {/* Like & Comment */}
                                <div className="d-flex align-items-center gap-4 mt-3">
                                    <span style={{ cursor: "pointer" }} onClick={() => {
                                        ApiService.allLikes({ ideaId: el._id }).then(res => {
                                            const allLikes = res.data.data || []
                                            setLikes(allLikes)
                                            const likedMap = {}
                                            allLikes.forEach(l => {
                                                if ((l.userId?._id || l.userId) === userId) {
                                                    likedMap[l.ideaId?._id] = true
                                                }
                                            })
                                            setLikedIdeas(likedMap)
                                        })
                                    }}>
                                        <i className={`fa${likedIdeas[el._id] ? "s" : "r"} fa-heart`} style={{ color: likedIdeas[el._id] ? "red" : "#555", fontSize: "20px" }}></i>
                                        <span className="ms-1 text-muted">{(likes || []).filter(l => l.ideaId?._id === el._id).length}</span>
                                    </span>

                                    <span style={{ cursor: "pointer" }} onClick={() => {
                                        setActiveIdeaId(el._id)
                                        setShowCommentModal(true)
                                    }}>
                                        <i className="far fa-comment" style={{ fontSize: "20px", color: "#555" }}></i>
                                        <span className="ms-1 text-muted">{(comments || []).filter(c => c.ideaId?._id === el._id).length}</span>
                                    </span>

                                    {/* <Link to={`/investment/add/${el._id}`} className="btn btn-primary py-3 px-5 rounded-pill ms-auto">Invest</Link> */}
                                </div>
                            </div>
                        </div>
                    )
                }) : (
                    <div className="text-center">
                        <h4 className="text-muted">No Ideas  available</h4>
                        <p>Please check back later.</p>
                    </div>
                )}
            </div>

            {/* Video Preview */}
            {previewVideo && (
                <div onClick={() => setPreviewVideo(null)}
                    style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <video src={previewVideo} controls autoPlay onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "6px", boxShadow: "0 0 10px #000" }} />
                </div>
            )}

            {/* Comment Modal */}
            {showCommentModal && (
                <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }} onClick={() => setShowCommentModal(false)}>
                    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content rounded">
                            <div className="modal-header">
                                <h5 className="modal-title">All Comment</h5>
                                <button type="button" className="btn-close" onClick={() => setShowCommentModal(false)} />
                            </div>
                            <div className="modal-body" style={{ maxHeight: "300px", overflowY: "auto" }}>
                                {(comments || []).filter(c => c.ideaId?._id === activeIdeaId).map((c, i) => (
                                    <div key={i} className="mb-2 p-2 border rounded">
                                        <small className="text-muted">{c.userId?.name || "User"}</small>
                                        <div>{c.commentText}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Media Modal */}
            {showMediaModal && (
                <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }} onClick={() => setShowMediaModal(false)}>
                    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isUpdate ? "Update Idea Media" : "Add Idea Media"}</h5>
                                <button className="btn-close" onClick={() => setShowMediaModal(false)} />
                            </div>
                            <div className="modal-body">
                               <input
    type="file"
    className="form-control"
    multiple
    onChange={(e) => {
        const selectedFiles = Array.from(e.target.files);
        const existingCount = getMediaCountForIdea(activeMediaIdeaId);

        if (!isUpdate && existingCount + selectedFiles.length > MAX_MEDIA) {
            toast.error(`You can upload maximum ${MAX_MEDIA} media files per idea`);
            e.target.value = null;
            return;
        }

        setMediaFiles(selectedFiles);
    }}
/>

                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={handleMedia}>{isUpdate ? "Update" : "Upload"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



            {showMedia && (
    <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
        onClick={() => setShowMedia(null)}
    >
        <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Media Preview</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowMedia(null)}
                    ></button>
                </div>

                <div className="modal-body text-center">
                    <img
                        src={showMedia}
                        alt="preview"
                        className="img-fluid rounded"
                    />
                </div>
            </div>
        </div>
    </div>
)}

        </>
    )
}







