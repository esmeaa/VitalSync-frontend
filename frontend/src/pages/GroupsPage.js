import React, { useState, useEffect } from "react";
import "./GroupsPage.css";

function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);

  const [newGroupData, setNewGroupData] = useState({
    name: "",
    description: "",
    emailList: ""
  });

  const [joinGroupCode, setJoinGroupCode] = useState("");

  const [newGoalData, setNewGoalData] = useState({
    title: "",
    description: "",
    targetDate: "",
    targetValue: ""
  });

  const getCurrentUser = () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  };

  const currentUser = getCurrentUser();

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = () => {
    const groupsStr = localStorage.getItem('groups');
    const loadedGroups = groupsStr ? JSON.parse(groupsStr) : [];
    setGroups(loadedGroups);

    if (currentUser) {
      const userGroups = loadedGroups.filter(group =>
        group.members.some(member => member.username === currentUser.username)
      );
      setMyGroups(userGroups);
    }
  };
  const handleGroupInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroupData(prev => ({ ...prev, [name]: value }));
  };

  const handleGoalInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoalData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!currentUser) return alert("Log in to create a group");
    if (!newGroupData.name.trim()) return alert("Group name is required");

    const groupCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    const newGroup = {
      id: Date.now().toString(),
      name: newGroupData.name.trim(),
      description: newGroupData.description.trim(),
      createdBy: currentUser.username,
      createdAt: new Date().toISOString(),
      joinCode: groupCode,
      members: [{ ...currentUser, joinedAt: new Date().toISOString() }],
      goals: [],
      achievements: []
    };

    const groupsStr = localStorage.getItem('groups');
    const existingGroups = groupsStr ? JSON.parse(groupsStr) : [];
    const updatedGroups = [...existingGroups, newGroup];
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    setMyGroups([...myGroups, newGroup]);
    setShowCreateForm(false);
    setNewGroupData({ name: "", description: "", emailList: "" });

    if (newGroupData.emailList.trim()) {
      sendGroupInvitations(newGroup, newGroupData.emailList);
    }

    alert(`Group "${newGroup.name}" created. Code: ${groupCode}`);
  };

  const handleJoinGroup = (e) => {
    e.preventDefault();
    if (!currentUser) return alert("Log in to join a group");
    if (!joinGroupCode.trim()) return alert("Enter a group code");

    const allGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const groupToJoin = allGroups.find(g => g.joinCode === joinGroupCode.trim());

    if (!groupToJoin) return alert("Invalid code");
    if (groupToJoin.members.some(m => m.username === currentUser.username))
      return alert("You're already a member");

    const updatedGroup = {
      ...groupToJoin,
      members: [...groupToJoin.members, { ...currentUser, joinedAt: new Date().toISOString() }]
    };

    const updatedGroups = allGroups.map(g =>
      g.id === groupToJoin.id ? updatedGroup : g
    );
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    setMyGroups([...myGroups.filter(g => g.id !== groupToJoin.id), updatedGroup]);
    setShowJoinForm(false);
    setJoinGroupCode("");
    alert(`Joined group "${groupToJoin.name}"`);
  };
  const handleLeaveGroup = (groupId) => {
    if (!currentUser) return;
    if (!window.confirm("Are you sure you want to leave this group?")) return;

    const allGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const groupToLeave = allGroups.find(g => g.id === groupId);
    if (!groupToLeave) return;

    const updatedGroup = {
      ...groupToLeave,
      members: groupToLeave.members.filter(m => m.username !== currentUser.username)
    };

    let updatedGroups;
    if (updatedGroup.members.length === 0 && groupToLeave.createdBy === currentUser.username) {
      updatedGroups = allGroups.filter(g => g.id !== groupId);
    } else {
      updatedGroups = allGroups.map(g => g.id === groupId ? updatedGroup : g);
    }

    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    setMyGroups(myGroups.filter(g => g.id !== groupId));
    setSelectedGroup(null);
    alert("You have left the group.");
  };

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!selectedGroup || !currentUser) return;
    if (!newGoalData.title.trim() || !newGoalData.targetDate) {
      return alert("Goal title and target date required");
    }

    const newGoal = {
      id: Date.now().toString(),
      title: newGoalData.title.trim(),
      description: newGoalData.description.trim(),
      createdBy: currentUser.username,
      createdAt: new Date().toISOString(),
      targetDate: newGoalData.targetDate,
      targetValue: newGoalData.targetValue,
      achieved: false,
      participants: []
    };

    const allGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const updatedGroup = {
      ...selectedGroup,
      goals: [...selectedGroup.goals, newGoal]
    };

    const updatedGroups = allGroups.map(g =>
      g.id === selectedGroup.id ? updatedGroup : g
    );
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    setMyGroups(myGroups.map(g =>
      g.id === selectedGroup.id ? updatedGroup : g
    ));
    setSelectedGroup(updatedGroup);
    setShowGoalForm(false);
    setNewGoalData({ title: "", description: "", targetDate: "", targetValue: "" });
    sendGoalNotification(updatedGroup, newGoal);
    alert("Goal created successfully!");
  };

  const handleAchieveGoal = (goalId) => {
    if (!selectedGroup || !currentUser) return;

    const goal = selectedGroup.goals.find(g => g.id === goalId);
    if (!goal) return;

    const updatedGoal = {
      ...goal,
      achieved: true,
      achievedAt: new Date().toISOString(),
      achievedBy: currentUser.username
    };

    const achievement = {
      id: Date.now().toString(),
      goalId,
      goalTitle: goal.title,
      achievedBy: currentUser.username,
      achievedAt: new Date().toISOString()
    };

    const updatedGroup = {
      ...selectedGroup,
      goals: selectedGroup.goals.map(g => g.id === goalId ? updatedGoal : g),
      achievements: [...selectedGroup.achievements, achievement]
    };

    const allGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const updatedGroups = allGroups.map(g =>
      g.id === selectedGroup.id ? updatedGroup : g
    );
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    setMyGroups(myGroups.map(g =>
      g.id === selectedGroup.id ? updatedGroup : g
    ));
    setSelectedGroup(updatedGroup);
    sendAchievementNotification(updatedGroup, achievement);
    alert("Goal marked as achieved!");
  };
  const sendGroupInvitations = (group, emailList) => {
    const emails = emailList.split(',').map(e => e.trim()).filter(Boolean);
    console.log(`Inviting ${emails.length} members to "${group.name}" via code: ${group.joinCode}`);
    alert(`Invitations would be sent to: ${emails.join(', ')}`);
  };

  const sendGoalNotification = (group, goal) => {
    const emails = group.members.map(m => m.username);
    console.log(`Goal "${goal.title}" shared with:`, emails);
    alert(`Goal notification sent to ${emails.length} members`);
  };

  const sendAchievementNotification = (group, achievement) => {
    const emails = group.members.map(m => m.username);
    console.log(`Achievement "${achievement.goalTitle}" shared with:`, emails);
    alert(`Achievement shared with ${emails.length} members`);
  };

  const formatDate = (isoString) => new Date(isoString).toLocaleDateString();

  const handleProcessGoalFromEmail = () => {
    const code = prompt("Enter goal code from email:");
    if (!code || !selectedGroup) return;

    const mockGoal = {
      id: Date.now().toString(),
      title: "Shared Goal via Email",
      description: "Imported goal from email link",
      createdBy: "shared@external.com",
      createdAt: new Date().toISOString(),
      targetDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      targetValue: "1-hour walk",
      achieved: false,
      participants: []
    };

    const allGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const updatedGroup = {
      ...selectedGroup,
      goals: [...selectedGroup.goals, mockGoal]
    };

    const updatedGroups = allGroups.map(g => g.id === selectedGroup.id ? updatedGroup : g);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    setMyGroups(myGroups.map(g => g.id === selectedGroup.id ? updatedGroup : g));
    setSelectedGroup(updatedGroup);

    alert("Goal added from email successfully.");
  };
  return (
    <div className="groups-container">
      <div className="groups-header mb-6">
        <h1 className="text-3xl font-bold text-gray-800">VitalSync Groups</h1>
        <p className="groups-subtitle text-gray-600">Collaborate and achieve fitness goals together</p>
      </div>

      {!currentUser ? (
        <div className="login-prompt p-4 bg-white rounded shadow">
          <p className="text-lg mb-2">Please log in to access groups.</p>
          <button
            className="primary-button"
            onClick={() => window.location.href = '/auth'}
          >
            Go to Login
          </button>
        </div>
      ) : (
        <div className="groups-content flex gap-6">
          {/* Sidebar */}
          <div className="groups-sidebar w-1/3">
            <div className="sidebar-header mb-4">
              <h2 className="text-xl font-semibold">My Groups</h2>
              <div className="flex gap-2 mt-2">
                <button
                  className="action-button create"
                  onClick={() => {
                    setShowCreateForm(true);
                    setShowJoinForm(false);
                  }}
                >
                  + Create
                </button>
                <button
                  className="action-button join"
                  onClick={() => {
                    setShowJoinForm(true);
                    setShowCreateForm(false);
                  }}
                >
                  Join
                </button>
              </div>
            </div>

            {showCreateForm && (
              <div className="form-container">
                <h3>Create New Group</h3>
                <form onSubmit={handleCreateGroup}>
                  <div className="form-group">
                    <label>Group Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={newGroupData.name}
                      onChange={handleGroupInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      rows="2"
                      value={newGroupData.description}
                      onChange={handleGroupInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Invite Emails (comma-separated)</label>
                    <textarea
                      name="emailList"
                      rows="2"
                      value={newGroupData.emailList}
                      onChange={handleGroupInputChange}
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="primary-button">Create</button>
                    <button type="button" className="secondary-button" onClick={() => setShowCreateForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {showJoinForm && (
              <div className="form-container">
                <h3>Join a Group</h3>
                <form onSubmit={handleJoinGroup}>
                  <div className="form-group">
                    <label>Group Code</label>
                    <input
                      type="text"
                      value={joinGroupCode}
                      onChange={(e) => setJoinGroupCode(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="primary-button">Join</button>
                    <button type="button" className="secondary-button" onClick={() => setShowJoinForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="groups-list">
              {myGroups.length === 0 ? (
                <p className="text-gray-500 italic">No groups joined yet.</p>
              ) : (
                myGroups.map(group => (
                  <div
                    key={group.id}
                    className={`group-item ${selectedGroup?.id === group.id ? 'selected' : ''}`}
                    onClick={() => setSelectedGroup(group)}
                  >
                    <h3>{group.name}</h3>
                    <p className="text-sm text-gray-600">{group.members.length} members</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="group-main-content w-2/3">
            {selectedGroup ? (
              <div>
                <div className="group-header flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedGroup.name}</h2>
                    <p>{selectedGroup.description}</p>
                  </div>
                  <button className="secondary-button" onClick={() => handleLeaveGroup(selectedGroup.id)}>Leave</button>
                </div>

                <div className="group-code-info mb-4">
                  <p>Group Code: <span className="highlight-code">{selectedGroup.joinCode}</span></p>
                  <button className="text-sm text-blue-500" onClick={() => {
                    navigator.clipboard.writeText(selectedGroup.joinCode);
                    alert("Group code copied");
                  }}>Copy Code</button>
                </div>

                {/* Group Members */}
                <div className="section mb-4">
                  <h3 className="font-semibold mb-2">Members</h3>
                  <div className="members-list grid gap-2">
                    {selectedGroup.members.map(m => (
                      <div key={m.username} className="member-item flex items-center gap-2">
                        <div className="member-avatar bg-gray-300 text-white rounded-full w-8 h-8 flex items-center justify-center">
                          {m.firstName?.[0] || m.username[0]}
                        </div>
                        <div>
                          <p className="font-medium">{m.firstName ? `${m.firstName} ${m.lastName}` : m.username}</p>
                          <p className="text-xs text-gray-500">Joined {formatDate(m.joinedAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Group Goals and Achievements would follow here... */}
              </div>
            ) : (
              <div className="text-gray-600 italic">Select a group to view details</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupsPage;
