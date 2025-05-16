import React, { useState, useEffect } from "react";
import "./GroupsPage.css";

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [goalTitle, setGoalTitle] = useState("");
  const [incomingGoalCode, setIncomingGoalCode] = useState("");
  const user = { username: "demo_user", email: "demo@example.com" };

  useEffect(() => {
    const stored = localStorage.getItem("groups");
    if (stored) setGroups(JSON.parse(stored));
  }, []);

  const saveGroups = (newGroups) => {
    setGroups(newGroups);
    localStorage.setItem("groups", JSON.stringify(newGroups));
  };

  const createGroup = () => {
    if (!groupName.trim()) return alert("Enter group name");
    const id = Date.now();
    const group = {
      id,
      name: groupName.trim(),
      members: [user],
      goals: [],
    };
    saveGroups([...groups, group]);
    setGroupName("");
    alert(`Group created. Share this code: ${id} or use email link.`);
  };

  const joinGroup = () => {
    const code = prompt("Enter group code to join:");
    const found = groups.find(g => g.id.toString() === code);
    if (!found) return alert("Group not found.");
    if (found.members.find(m => m.username === user.username)) {
      return alert("Already a member");
    }
    const updated = {
      ...found,
      members: [...found.members, user]
    };
    saveGroups(groups.map(g => g.id === updated.id ? updated : g));
    alert(`Joined group: ${updated.name}`);
  };

  const leaveGroup = (groupId) => {
    const group = groups.find(g => g.id === groupId);
    const updated = {
      ...group,
      members: group.members.filter(m => m.username !== user.username)
    };
    saveGroups(groups.map(g => g.id === groupId ? updated : g));
    setSelectedGroup(null);
  };

  const sendGoal = () => {
    if (!goalTitle || !selectedGroup) return alert("Enter goal title and select a group.");
    const goal = {
      id: Date.now(),
      title: goalTitle,
      createdBy: user.username,
      achieved: false
    };
    const updated = {
      ...selectedGroup,
      goals: [...selectedGroup.goals, goal]
    };
    saveGroups(groups.map(g => g.id === updated.id ? updated : g));
    setSelectedGroup(updated);
    setGoalTitle("");
    alert(`Goal "${goal.title}" sent to group! Code: ${goal.id}`);
  };

  const achieveGoal = (goalId) => {
    const updatedGoals = selectedGroup.goals.map(goal =>
      goal.id === goalId ? { ...goal, achieved: true } : goal
    );
    const updatedGroup = { ...selectedGroup, goals: updatedGoals };
    saveGroups(groups.map(g => g.id === updatedGroup.id ? updatedGroup : g));
    setSelectedGroup(updatedGroup);
    alert("Goal achieved! Group has been notified.");
  };

  const addGoalFromEmail = () => {
    if (!incomingGoalCode || !selectedGroup) return;
    const goal = {
      id: incomingGoalCode,
      title: "Imported Goal",
      createdBy: "email",
      achieved: false
    };
    const updated = {
      ...selectedGroup,
      goals: [...selectedGroup.goals, goal]
    };
    saveGroups(groups.map(g => g.id === updated.id ? updated : g));
    setSelectedGroup(updated);
    setIncomingGoalCode("");
    alert("Goal imported successfully.");
  };

  return (
    <div className="groups">
      <h2>Group Management</h2>
      <div className="form">
        <input value={groupName} onChange={e => setGroupName(e.target.value)} placeholder="New group name" />
        <button onClick={createGroup}>Create</button>
        <button onClick={joinGroup}>Join Group</button>
      </div>

      <h3>My Groups</h3>
      <ul className="list">
        {groups.filter(g => g.members.some(m => m.username === user.username)).map(g => (
          <li key={g.id} onClick={() => setSelectedGroup(g)} className={selectedGroup?.id === g.id ? "active" : ""}>
            {g.name} ({g.members.length})
            <button onClick={() => leaveGroup(g.id)}>Leave</button>
          </li>
        ))}
      </ul>

      {selectedGroup && (
        <>
          <h3>Goals in {selectedGroup.name}</h3>
          <input value={goalTitle} onChange={e => setGoalTitle(e.target.value)} placeholder="New goal title" />
          <button onClick={sendGoal}>Send Goal to Group</button>

          <ul className="list">
            {selectedGroup.goals.map(goal => (
              <li key={goal.id}>
                {goal.title} {goal.achieved ? "(Achieved)" : ""}
                {!goal.achieved && (
                  <button onClick={() => achieveGoal(goal.id)}>Mark Achieved</button>
                )}
              </li>
            ))}
          </ul>

          <div className="form">
            <input
              value={incomingGoalCode}
              onChange={(e) => setIncomingGoalCode(e.target.value)}
              placeholder="Enter goal code from email"
            />
            <button onClick={addGoalFromEmail}>Import Goal</button>
          </div>
        </>
      )}
    </div>
  );
};

export default GroupsPage;
