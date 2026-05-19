import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ApiService from "../../services/ApiService"
import { Link } from "react-router-dom"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"

import { Line, Bar, Pie } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
)

export default function CardDashboard() {
  const [details, setDetails] = useState({})

  const fetchData = () => {
    ApiService.admindashboard()
      .then((res) => {
        if (res.data.success) {
          setDetails(res.data)
        } else {
          toast.error(res.data.message)
        }
      })
      .catch((err) => toast.error(err.message))
  }

  useEffect(() => {
    fetchData()
  }, [])

  // MONTHLY FUNDING
  const monthNames = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
]

// create array with 12 zeros
const fullMonthValues = Array(12).fill(0)

// fill values coming from backend
details.monthlyFunding?.forEach(m => {
  fullMonthValues[m._id - 1] = Number(m.total)
})

const fundingData = {
  labels: monthNames,
  datasets: [
    {
      label: "Funding",
      data: fullMonthValues,
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.2)",
      tension: 0.4,
      fill: false,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ],
}

  // CATEGORY BAR
  const categoryLabels =
  details.ideasByCategory?.map((c) => c.name) || []

const categoryCounts =
  details.ideasByCategory?.map((c) => Number(c.count)) || []

const categoryData = {
  labels: categoryLabels,
  datasets: [
    {
      label: "Ideas",
      data: categoryCounts,
      backgroundColor: "#3b82f6",
      borderRadius: 6,
    },
  ],
}

  // STATUS PIE
  const statusData = {
    labels: ["Approved", "Funded", "Pending", "Rejected"],
    datasets: [
      {
        data: [
          details.approvedIdeas,
          details.fundedIdeas,
          details.pendingIdeas,
          details.rejectedIdeas,
        ],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      },
    ],
  }

  return (
    <>
      {/* HEADER */}
      <div className="container-fluid  py-4">
        <div className="container text-center">
          <h1 className="display-6">Admin Dashboard</h1>
        </div>
      </div>

      {/* CARDS */}
      <div className="container py-5">
        <div className="row g-4 text-center ">
          {[
            ["Owners", details.totalOwner, "/admin/users"],
            ["Investors", details.totalInvestor, "/admin/investors/all"],
            ["Ideas", details.totalIdea, "/admin/idea/manage"],
            ["Categories", details.totalCategory, "/admin/category/all"],
            ["Investments", details.totalInvestment, "/admin/investments"],
          ].map(([title, value, path], i) => (
            <div className="col-md-4" key={i}>
              <Link to={path} className="text-decoration-none">
                <div className="bg-white text-white rounded p-4 shadow" style={{ cursor: "pointer" }}>
                  <h5>{title}</h5>
                  <h2>{value}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CHARTS */}
      <div className="container pb-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="bg-white rounded shadow p-4">
              <h5>Monthly Funding Trend</h5>
              <Line
  key={JSON.stringify(fullMonthValues)}
  data={fundingData}
  options={{
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }}
/>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="bg-white rounded shadow p-4">
              <h5>Ideas by Category</h5>
              {categoryLabels.length > 0 && (
  <Bar
    key={JSON.stringify(categoryCounts)}
    data={categoryData}
    options={{
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 },
        },
      },
    }}
  />
)}
            </div>
          </div>

          <div className="col-lg-12">
            <div className="bg-white rounded shadow p-4 text-center">
              <h5>Idea Status Distribution</h5>
              <div style={{ maxWidth: "400px", margin: "auto" }}>
                <Pie data={statusData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}