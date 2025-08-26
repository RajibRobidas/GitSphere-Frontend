import React, { useState, useEffect } from "react";
import axios from "axios";
import "./repo.css";
import Navbar from "../Navbar";

const CreateRepo = () => {
  const [formData, setFormData] = useState({
    owner: "",
    name: "",
    description: "",
    visibility: true,
    content: [],
  });

  const [message, setMessage] = useState("");

  // Get userId from localStorage on component mount
  useEffect(() => {
    const userId = localStorage.getItem("userId") || "";
    setFormData((prev) => ({ ...prev, owner: userId }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating repository...");

    try {
      const res = await axios.post("13.53.150.225:3002/repo/create", formData);
      setMessage(res.data.message || "Repository created!");
      setFormData((prev) => ({
        ...prev,
        name: "",
        description: "",
        visibility: true,
        content: [],
      }));
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error creating repository!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-repo-page">
        <div className="create-repo-card">
          <h2 className="create-repo-title">Create Repository</h2>

          <form onSubmit={handleSubmit} className="create-repo-form">

            {/* Repo Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Repository Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
                placeholder="Enter Repository Name"
                autoComplete="off"
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea"
                placeholder="Enter Repository Description"
                rows={4}
              />
            </div>

            {/* Visibility */}
            <div className="checkbox-row">
              <input
                id="visibility"
                type="checkbox"
                name="visibility"
                checked={formData.visibility}
                onChange={handleChange}
                className="checkbox"
              />
              <label className="checkbox-label" htmlFor="visibility">
                Public Repository
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="btn">
              Create Repository
            </button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default CreateRepo;
