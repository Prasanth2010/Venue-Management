import React, { useState } from "react";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Web Developer | Tech Enthusiast",
    profilePic: "https://via.placeholder.com/150",
  });

  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newBio, setNewBio] = useState(user.bio);
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size should be less than 2MB.");
        return;
      }
      setImage(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleSave = () => {
    if (!newName.trim() || !newBio.trim()) {
      setError("Name and Bio cannot be empty.");
      return;
    }
    setUser({ ...user, name: newName, bio: newBio, profilePic: image || user.profilePic });
    setEditing(false);
    setError("");
  };

  const handleCancel = () => {
    setNewName(user.name);
    setNewBio(user.bio);
    setImage(null);
    setEditing(false);
    setError("");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-pic">
          <img src={image || user.profilePic} alt="Profile" />
          {editing && (
            <div className="upload-overlay">
              <label htmlFor="profile-upload" className="upload-label">
                Change Photo
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          )}
        </div>
        {editing ? (
          <div className="profile-info">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="profile-input"
              placeholder="Enter your name"
            />
            <textarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              className="profile-input"
              placeholder="Enter your bio"
              rows="4"
            />
            {error && <p className="error-message">{error}</p>}
            <div className="action-buttons">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
            <p className="email">{user.email}</p>
            <button className="edit-btn" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;