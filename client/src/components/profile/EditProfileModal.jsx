import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { updateProfile } from "../../services/userService";

const EditProfileModal = ({ isOpen, onClose, profile, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    phone: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
    skills: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        bio: profile.bio || "",
        phone: profile.phone || "",
        location: profile.location || "",
        website: profile.website || "",
        github: profile.github || "",
        linkedin: profile.linkedin || "",
        skills: profile.skills?.join(", ") || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, bio, phone, location, website, github, linkedin, skills } =
      formData;

    if (!name.trim()) {
      return toast.error("Name is required.");
    }

    try {
      setSaving(true);

      const payload = {
        name: name.trim(),
        bio: bio.trim(),
        phone: phone.trim(),
        location: location.trim(),
        website: website.trim(),
        github: github.trim(),
        linkedin: linkedin.trim(),

        skills: skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const { data } = await updateProfile(payload);

      toast.success(data.message);

      if (onProfileUpdated) {
        await onProfileUpdated();
      }

      onClose();

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
  <div className="flex min-h-full items-center justify-center">
    <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-2xl font-bold">Edit Profile</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Name */}

          <div>
            <label className="mb-2 block font-semibold">Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border p-3 outline-none focus:border-black"
            />
          </div>

          {/* Bio */}

          <div>
            <label className="mb-2 block font-semibold">Bio</label>

            <textarea
              rows={4}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell something about yourself..."
              className="w-full resize-none rounded-xl border p-3 outline-none focus:border-black"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Phone */}

            <div>
              <label className="mb-2 block font-semibold">Phone</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full rounded-xl border p-3 outline-none focus:border-black"
              />
            </div>

            {/* Location */}

            <div>
              <label className="mb-2 block font-semibold">Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ahmedabad, India"
                className="w-full rounded-xl border p-3 outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Part 1A Ends Here */}
          {/* Website */}

          <div>
            <label className="mb-2 block font-semibold">Website</label>

            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
              className="w-full rounded-xl border p-3 outline-none focus:border-black"
            />
          </div>

          {/* GitHub */}

          <div>
            <label className="mb-2 block font-semibold">GitHub</label>

            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="w-full rounded-xl border p-3 outline-none focus:border-black"
            />
          </div>

          {/* LinkedIn */}

          <div>
            <label className="mb-2 block font-semibold">LinkedIn</label>

            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full rounded-xl border p-3 outline-none focus:border-black"
            />
          </div>

          {/* Skills */}

          <div>
            <label className="mb-2 block font-semibold">Skills</label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB, Express"
              className="w-full rounded-xl border p-3 outline-none focus:border-black"
            />

            <p className="mt-2 text-sm text-gray-500">
              Separate multiple skills using commas.
            </p>
          </div>

          {/* Footer Buttons */}

          <div className="flex justify-end gap-4 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-6 py-3 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Updating Profile..." : "Update Profile"}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
