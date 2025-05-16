import React, { useState, useEffect } from "react";
import "./GroupsPage.css";

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("username") || "");
  const [joinedGroupId, setJoinedGroupId] = useState(null);
  const BACKEND_URL = "http://localhost:3000";

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/groups`)
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error("Failed to fetch groups:", err));
  }, []);

  const handleCreateGroup = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: groupName, email: userEmail }),
      });
      const newGroup = await res.json();
      setGroups([...groups, newGroup]);
      alert("Group created and shared via email!");
      setGroupName("");
    } catch (err) {
      console.error("Create group failed:", err);
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      await fetch(`${BACKEND_URL}/api/groups/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId, email: userEmail }),
      });
      setJoinedGroupId(groupId);
      alert("Joined the group successfully!");
    } catch (err) {
      console.error("Join group failed:", err);
    }
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      await fetch(`${BACKEND_URL}/api/groups/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId, email: userEmail }),
      });
      setJoinedGroupId(null);
      alert("Left the group.");
    } catch (err) {
      console.error("Leave group failed:", err);
    }
  };

  return (
    <div className="group-container">
      <div className="group-box">
        <h2>Groups</h2>
        <p className="subtitle">Create, join and manage progress-sharing groups</p>

        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={handleCreateGroup}>Create & Share Group</button>

        <h3>Available Groups</h3>
        <ul>
          {groups.map((group) => (
            <li key={group.id}>
              <strong>{group.name}</strong>
              {joinedGroupId === group.id ? (
                <button onClick={() => handleLeaveGroup(group.id)}>Leave Group</button>
              ) : (
                <button onClick={() => handleJoinGroup(group.id)}>Join Group</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupsPage;
