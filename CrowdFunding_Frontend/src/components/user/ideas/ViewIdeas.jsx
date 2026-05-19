import { useEffect, useState } from "react"
import ApiService from "../../../services/ApiService"
import { toast } from "react-toastify"
import { Link, useParams } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";

export default function ViewIdeas() {
    const { id } = useParams()

    const [idea, setIdea] = useState([])
    const [ideaMedia, setIdeaMedia] = useState([])

    const [previewVideo, setPreviewVideo] = useState(null);

    const [likedIdeas, setLikedIdeas] = useState({});
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [activeIdeaId, setActiveIdeaId] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [showMedia, setShowMedia] = useState(null)
    const [investmentSuggestion, setInvestmentSuggestion] = useState({});
    const [invLoading, setInvLoading] = useState(false);
    const [activeSuggestionIdea, setActiveSuggestionIdea] = useState(null);
    const [loading, setLoading] = useState(false);





    const login = sessionStorage.getItem("isLogin")
    const userId = sessionStorage.getItem("userId")
    const data = {
        _id: id
    }
    const generateInvestmentSuggestion = (idea) => {
        setInvLoading(true);
        setActiveSuggestionIdea(idea._id);

        ApiService.getInvestmentSuggestion({
            title: idea.title,
            description: idea.description,
            aiScore: idea.aiScore,
        })
            .then((res) => {
                if (res.data.success) {
                    setInvestmentSuggestion((prev) => ({
                        ...prev,
                        [idea._id]: res.data.data,
                    }));
                } else {
                    toast.error("Failed to generate suggestion");
                }
            })
            .catch((err) => {
                toast.error("AI service error");
                console.error(err);
            })
            .finally(() => {
                setInvLoading(false);
            });
    };


    // const getInvestmentSuggestion = (idea) => {
    //     const score = Number(idea.aiScore || 0);
    //     const totalSales = Number(idea.totalSales || 0);

    //     if (score >= 80 && totalSales >= 100000) {
    //         return {
    //             text: "🔥 Highly Recommended for Investment",
    //             color: "success",
    //             icon: "fa-rocket"
    //         };
    //     }

    //     if (score >= 60) {
    //         return {
    //             text: "👍 Good Potential – Consider Investing",
    //             color: "primary",
    //             icon: "fa-chart-line"
    //         };
    //     }

    //     if (score >= 40) {
    //         return {
    //             text: "⚠ Moderate Risk – Invest Carefully",
    //             color: "warning",
    //             icon: "fa-exclamation-triangle"
    //         };
    //     }

    //     return {
    //         text: "❌ High Risk – Not Recommended",
    //         color: "danger",
    //         icon: "fa-ban"
    //     };
    // };



    const fetchData = () => {
        setLoading(true);

        ApiService.allIdea(data)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    setIdea(res.data.data)
                }
                else {
                    toast.error(res.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })

        ApiService.allIdeaMedia({ ideaId: id })
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    setIdeaMedia(res.data.data || []);
                }
                else {
                    setIdeaMedia([]); // no media
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(() => {
                setLoading(false);
            });


        ApiService.allLikes({ ideaId: id }).then(res => {
            if (res.data.success) {
                const allLikes = res.data.data || [];
                setLikes(allLikes);

                const likedMap = {};
                allLikes.forEach(l => {
                    if (l.userId === userId) {
                        likedMap[l.ideaId._id] = true;
                    }
                });
                setLikedIdeas(likedMap);
            }
        });


        ApiService.allComments({ ideaId: id })
            .then(res => {
                if (res.data.success) {
                    setComments(res.data.data);
                }
            });

    }
    useEffect(() => {
        fetchData()
    }, [])

    idea.map((el, index) => {
        // filter media for this idea
        const mediaForIdea = ideaMedia.filter(
            (m) => m.ideaId.toString() === el._id.toString()
        )
    });





    return (


        <>

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
            <div className="container-fluid py-3  mt-0">
                <div className="container text-center ">
                    <h1 className="display-1 mb-4">Idea</h1>
                    <ol className="breadcrumb justify-content-center mb-0 ">
                        <li className="breadcrumb-item">
                            <a href="/">Home</a>
                        </li>

                        <li className="breadcrumb-item text-dark" aria-current="page">
                            Idea
                        </li>
                    </ol>
                </div>
            </div>





            <div className="container py-6 d-flex flex-column align-items-center">

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

                {!loading && idea.length > 0 && (
                    (
                        idea.length > 0 ? (
                            idea.map((el, index) => {
                                const mediaForIdea = ideaMedia.filter(
                                    (m) => m.ideaId._id.toString() === el._id.toString()
                                );

                                return (
                                    <div
                                        key={index}
                                        className="row align-items-center mb-5 shadow overflow-hidden"
                                        style={{
                                            background: "#fff",
                                                maxHeight:"700px",
                                            width: "100%",
                                            borderRadius: "14px",
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                        }}
                                    >
                                        {/* 🎥 VIDEO WITH THUMBNAIL */}
                                        <div className="col-md-4 p-0 position-relative ">
                                            <img
                                                src={el.thumbnailUrl || mediaForIdea[0]?.mediaUrl}
                                                alt="Video Thumbnail"
                                                className="w-100  "
                                                style={{
                                                    height: "700px",
                                                    objectFit: "cover",
                                                    cursor: "pointer",
                                                    borderTopLeftRadius: "14px",
                                                    borderBottomLeftRadius: "14px",
                                                }}
                                                onClick={() => setPreviewVideo(el.pitchVideoUrl)}
                                            />

                                            {/* ▶ Play icon overlay */}
                                            <div
                                                onClick={() => setPreviewVideo(el.pitchVideoUrl)}
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: "translate(-50%, -50%)",
                                                    background: "rgba(0,0,0,0.6)",
                                                    borderRadius: "50%",
                                                    width: "60px",
                                                    height: "60px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <i className="fas fa-play text-white"></i>
                                            </div>

                                            {/* Category tag */}
                                            {/* <span
                                                className="position-absolute top-0 start-0 bg-dark text-white px-3 py-1 fw-bold rounded-bottom"
                                                style={{ fontSize: "0.75rem" }}
                                            >
                                                {el.categoryId?.categoryName}
                                            </span> */}
                                        </div>

                                        {/* 📝 CONTENT */}
                                        <div className="col-md-8 p-4">
                                            <h4 className="fw-bold mb-1">{el.title}</h4>
                                            <small className="text-muted" style={{
                                                wordBreak: "break-word",
                                                overflowWrap: "break-word"
                                            }}>{el.description}</small>

                                            <div className="d-flex gap-2 my-3">
                                                <div className="border rounded p-2 text-center flex-fill">
                                                    <div className="text-warning fw-bold small">Total Sales</div>
                                                    <div className="fw-bold"> ₹ {el.totalSales}</div>
                                                </div>
                                                <div className="border rounded p-2 text-center flex-fill">
                                                    <div className="text-success fw-bold small">Current Sales</div>
                                                    <div className="fw-bold">₹ {el.currentYearSales}</div>
                                                </div>
                                                <div className="border rounded p-2 text-center flex-fill">

                                                    <div className="border rounded p-2 flex-fill">
                                                        <div className="text-primary fw-bold small mb-1">AI Confidence</div>
                                                        <div className="progress" style={{ height: "8px" }}>
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                style={{ width: `${el.aiScore}%` }}
                                                            ></div>
                                                        </div>
                                                        <small className="fw-bold">{el.aiScore}/100</small>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* {(() => {
                                        const suggestion = getInvestmentSuggestion(el);
                                        return (
                                            <div className={`alert alert-${suggestion.color} d-flex align-items-center mt-3`}>
                                                <i className={`fas ${suggestion.icon} me-2`}></i>
                                                <strong>{suggestion.text}</strong>
                                            </div>
                                        );
                                    })()} */}
                                    <div className="d-flex justify-content-end mt-3">
                                            <button
                                                className="btn btn-outline-success btn-sm mt-2"
                                                disabled={invLoading && activeSuggestionIdea === el._id}
                                                onClick={() => generateInvestmentSuggestion(el)}
                                            >
                                                {invLoading && activeSuggestionIdea === el._id
                                                    ? "Analyzing..."
                                                    : "Get Investment Suggestion"}
                                            </button>
                                            </div>

                                            {investmentSuggestion[el._id] && (
                                                <div
                                                    className="mt-3 p-3 border rounded"
                                                    style={{ background: "#f8fff9" }}
                                                >
                                                    <h6 className="fw-bold text-success mb-2">
                                                        💡 AI Investment Suggestion
                                                    </h6>

                                                    <div className="d-flex gap-3 flex-wrap">
                                                        <div>
                                                            <small className="text-muted">Amount</small>
                                                            <div className="fw-bold">
                                                                {investmentSuggestion[el._id].amount}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <small className="text-muted">Equity</small>
                                                            <div className="fw-bold">
                                                                {investmentSuggestion[el._id].equityPercent}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="mt-2 mb-0 small text-muted">
                                                        {investmentSuggestion[el._id].reason}
                                                    </p>
                                                </div>
                                            )}



                                            {/* 🔗 MEDIA LINKS */}
                                            {mediaForIdea.length > 0 && (
                                                <div>
                                                    <h6 className="fw-bold mb-2">Additional Media</h6>
                                                    {mediaForIdea.map((media, idx) => (
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

                                                    ))}
                                                </div>
                                            )}


                                            {/* Like & Comment actions */}
                                            <div className="d-flex align-items-center gap-4 mt-3">
                                                {/* Like */}
                                                <span
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        ApiService.addLikes({ ideaId: el._id, userId })
                                                            .then(() => {
                                                                if (!userId) {
                                                                    toast.error("Please Login")
                                                                }

                                                                ApiService.allLikes({ ideaId: el._id })
                                                                    .then(res => {
                                                                        const allLikes = res.data.data || [];
                                                                        setLikes(allLikes);

                                                                        const likedMap = {};
                                                                        allLikes.forEach(l => {
                                                                            if ((l.userId?._id || l.userId) === userId) {
                                                                                likedMap[l.ideaId?._id] = true;
                                                                            }
                                                                        });
                                                                        setLikedIdeas(likedMap);
                                                                    })
                                                                    .catch((res) => toast.error(res.message))
                                                            })
                                                            .catch((err) => {
                                                                toast.error(err.message)
                                                            })

                                                    }}
                                                >
                                                    <i
                                                        className={`fa${likedIdeas[el._id] ? "s" : "r"} fa-heart`}
                                                        style={{
                                                            color: likedIdeas[el._id] ? "red" : "#555",
                                                            fontSize: "20px",
                                                        }}
                                                    ></i>

                                                    <span className="ms-1 text-muted">
                                                        {(likes || []).filter(l => l.ideaId?._id === el._id).length}
                                                    </span>


                                                </span>


                                                {/* Comment */}
                                                <span
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        setActiveIdeaId(el._id);
                                                        setShowCommentModal(true);
                                                    }}
                                                >
                                                    <i
                                                        className="far fa-comment"
                                                        style={{ fontSize: "20px", color: "#555" }}
                                                    ></i>
                                                    <span className="ms-1 text-muted">
                                                        {(comments || []).filter(c => c.ideaId?._id === el._id).length}
                                                    </span>


                                                </span>

                                                {login ?
                                                    <Link
                                                        to={`/investment/add/${el._id}`}
                                                        state={{
                                                            idea: el,
                                                            suggestion: investmentSuggestion[el._id],
                                                        }}
                                                        className="btn btn-primary py-3 px-5 rounded-pill ms-auto"
                                                    >
                                                        Invest Now
                                                    </Link>
                                                    :
                                                    <Link
                                                        to="/login"
                                                        className="btn btn-primary py-3 px-5 rounded-pill ms-auto"
                                                    >
                                                        Login to Invest
                                                    </Link>
                                                }

                                            </div>

                                        </div>
                                    </div>
                                );
                            })
                        ) : (

                            <div className="text-center">
                                <h4 className="text-muted">No Ideas  available</h4>
                                <p>Please check back later.</p>
                            </div>
                        )
                    )
                    )}

            </div>









            {previewVideo && (
                <div
                    onClick={() => setPreviewVideo(null)} // click outside closes
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
                        onClick={(e) => e.stopPropagation()} // clicking video does not close
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            borderRadius: "6px",
                            boxShadow: "0 0 10px #000"
                        }}
                    />
                </div>
            )}


            {showCommentModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
                    onClick={() => setShowCommentModal(false)}
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content rounded">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Comment</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowCommentModal(false)}
                                />
                            </div>

                            <div className="modal-body">
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="Write your comment..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                />
                                <div style={{ maxHeight: "200px", overflowY: "auto" }} className="mt-3">
                                    {(comments || [])
                                        .filter(c => c.ideaId?._id === activeIdeaId)
                                        .map((c, i) => (
                                            <div key={i} className="mb-2 p-2 border rounded">
                                                <small className="text-muted">{c.userId?.name || "User"}</small>
                                                <div>{c.commentText}</div>
                                            </div>
                                        ))}
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowCommentModal(false)}
                                >
                                    Cancel
                                </button>
                                <button

                                    className="btn btn-primary"
                                    onClick={() => {
                                        if (!commentText.trim()) {
                                            toast.error("Comment cannot be empty");
                                            return;
                                        }
                                        if (!userId) {
                                            toast.error("Please Login")
                                        }
                                        ApiService.addComments({
                                            ideaId: activeIdeaId,
                                            userId,
                                            commentText: commentText.trim()
                                        }).then(() => {
                                            ApiService.allComments({ ideaId: activeIdeaId }).then(res => {
                                                setComments(res.data.data);
                                            })
                                                .catch((res) => toast.error(res.message))
                                            setCommentText("");
                                            setShowCommentModal(false);
                                        })
                                            .catch(err => toast.error(err.message));
                                    }}


                                >
                                    Post
                                </button>




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








