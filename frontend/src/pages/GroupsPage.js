import React, { useState } from "react";
import "./GroupsPage.css";

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [joinedGroupId, setJoinedGroupId] = useState(null);

  const handleCreateGroup = () => {
    if (!groupName.trim()) return;

    const newGroup = {
      id: Date.now(),
      name: groupName.trim(),
    };

    setGroups([...groups, newGroup]);
    setGroupName(""); // clear input
  };

  const handleJoinGroup = (groupId) => {
    setJoinedGroupId(groupId);
  };

  const handleLeaveGroup = () => {
    setJoinedGroupId(null);
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
        <button onClick={handleCreateGroup}>Create Group</button>

        <h3>Available Groups</h3>
        <ul>
          {groups.map((group) => (
            <li key={group.id}>
              <strong>{group.name}</strong>
              {joinedGroupId === group.id ? (
                <button onClick={handleLeaveGroup}>Leave Group</button>
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

