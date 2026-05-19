import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "./Chat";
import ApiService from "../../../services/ApiService";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const [users, setUsers] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const role = sessionStorage.getItem("role"); // "owner", "investor", "admin"

  useEffect(() => {
    if (!userId || !role) return;

    const fetchUsers = async () => {
      try {
        let usersList = [];

        // ======================
        // 🏠 OWNER
        // ======================
        if (role === "owner") {
          // Get investors
          const resInvestors = await ApiService.getChatInvestors({ ownerId: userId });
          if (resInvestors.data.success) {
            usersList = resInvestors.data.data.map(u => ({
              _id: u._id,
              name: u.name,
              role: u.role,
               profileImage: u.profileImage || null,
            }));
          }

          // Add admin
          // const resAdmin = await axios.post("http://localhost:5000/chat/get-admin");
          // if (resAdmin.data.success) {
          //   const adminList = resAdmin.data.data.map(a => ({
          //     _id: a._id,
          //     name: a.name,
          //     role: a.role
          //   }));

          //   const existingIds = new Set(usersList.map(u => u._id));
          //   adminList.forEach(a => {
          //     if (!existingIds.has(a._id)) usersList.push(a);
          //   });
          // }
        }

        // ======================
        // 👨‍💼 INVESTOR
        // ======================
        if (role === "investor") {
          // Get owners
          const resOwners = await ApiService.getChatOwners({ investorId: userId });
          if (resOwners.data.success) {
            usersList = resOwners.data.data.map(u => ({
              _id: u._id,
              name: u.name,
              role: u.role,
              profileImage: u.profileImage || null
            }));
          }

          // Add admin
          const resAdmin = await ApiService.getAdmin();
          if (resAdmin.data.success) {
            const adminList = resAdmin.data.data.map(a => ({
              _id: a._id,
              name: a.name,
              role: a.role,
               profileImage: a.profileImage || null,
            }));

            const existingIds = new Set(usersList.map(u => u._id));
            adminList.forEach(a => {
              if (!existingIds.has(a._id)) usersList.push(a);
            });
          }
        }

        // ======================
        // 🧑‍💼 ADMIN
        // ======================
        if (role === "admin") {
          const resInvestors = await ApiService.getAllInvestors();
          if (resInvestors.data.success) {
            usersList = resInvestors.data.data.map(u => ({
              _id: u._id,
              name: u.name,
              role: u.role,
              profileImage: u.profileImage || null,
            }));
          }
        }

        setUsers(usersList);
      } catch (err) {
        console.error("Error fetching chat users:", err);
      }
    };
 

    fetchUsers();
  }, [userId, role]);

  return (
    <div style={styles.widget}>
      {!open && (
        <button style={styles.floatingButton} onClick={() => setOpen(true)}>
          💬
        </button>
      )}

      {open && (
        <div
          style={{
            ...styles.chatContainer,
            display: receiverId ? "flex" : "block",
          }}
        >
          {/* Sidebar */}
          {!receiverId && (
            <div style={styles.sidebar}>
              <div style={styles.sidebarHeader}>
                <span>
                  {role === "owner"
                    ? "Investors & Admin"
                    : role === "investor"
                      ? "Owners & Admin"
                      : "Investors"}
                </span>
                <button style={styles.closeBtn} onClick={() => setOpen(false)}>
                 <i class="fa-solid fa-x"></i>
                </button>
              </div>
              <div style={styles.userList}>
                {users.length ? (
                  users.map((u) => (
                    <div
                      key={u._id}
                      style={styles.userItem}

                      onClick={() => setReceiverId(u._id)}
                    >
                    {u.profileImage ? (
                        <img className="me-2"
                          src={u.profileImage}
                          alt={u.name}
                          style={styles.avatar}
                        />
                      ) : (
                        <div className="me-2" style={styles.avatarPlaceholder}>{u.name.charAt(0)}</div>
                      )}

                       {u.name} {u.role === "admin" ? "(Admin)" : ""}
                    </div>
                  ))
                ) : (
                  <div style={{ padding: 10 }}>No users available</div>
                )}
              </div>
            </div>
          )}

          {/* Chat panel */}
          {receiverId && (
            <div style={styles.chatPanel}>
              <div style={styles.chatHeader}>
                <button onClick={() => setReceiverId(null)} style={styles.backBtn}>
                 <i class="fa-solid fa-arrow-left"></i>
                </button>
                <span>{users.find((u) => u._id === receiverId)?.name || "Chat"}</span>
                <button onClick={() => setOpen(false)} style={styles.closeBtn}>
               <i class="fa-solid fa-x"></i>
                </button>
              </div>
              {/* <Chat receiverId={receiverId} /> */}
              <div style={styles.chatPanelInner}>
                <Chat receiverId={receiverId} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  widget: { position: "fixed", bottom: 20, right: 20, zIndex: 9999 },
  floatingButton: {
    borderRadius: "50%",
    width: 60,
    height: 60,
    fontSize: 24,
    background: "#d4a762 ",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  chatContainer: {
    display: "flex",
    width: 350,
    height: 500,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",
    color: "black",
  },
  sidebar: {
    width: "100%",
    borderRight: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: {
    padding: 10,
    fontWeight: "bold",
    background: "#d4a762 ",
    display: "flex",
    justifyContent: "space-between",
    color: "black",
  },
  userList: { flex: 1, overflowY: "auto" },
  userItem: { padding: 10, borderBottom: "1px solid #ddd", cursor: "pointer",display: "flex",
    alignItems: "center" },
  //   chatPanel: {
  //   flex: 1,                // <-- ensures chat panel fills parent
  //   display: "flex",
  //   flexDirection: "column",
  //   height: "100%"          // <-- important so Chat wrapper has height
  // },
  chatPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,        // allows chat box to shrink inside flex
    position: "relative", // for header z-index stacking
  },

  chatHeader: {
    padding: 10,
    background: "#d4a762",
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "bold",
    position: "relative", // <-- add this
    zIndex: 10            // <-- higher than chat area
  },

  chatPanelInner: {
    flex: 1,
    overflowY: "auto",   // scrollable messages
    padding: 0,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
  },
  avatarPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "rgb(44, 122, 123)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
  },





  // chatHeader: {
  //   padding: 10,
  //   background: "#d4a762 ",
  //   color: "black",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   fontWeight: "bold",
  //   zindex:2

  // },
  closeBtn: { border: "none", background: "transparent", cursor: "pointer", color: "black" },
  backBtn: { border: "none", background: "transparent", cursor: "pointer", fontSize: 18, color: "black" },
};
