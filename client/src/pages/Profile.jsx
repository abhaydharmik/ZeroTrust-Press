import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loader from "../components/common/Loader";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";

import { getProfile } from "../services/userService";
import EditProfileModal from "../components/profile/EditProfileModal";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfile = async () => {
    try {
      const { data } = await getProfile();

      setProfile(data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold">Profile Not Found</h2>

        <p className="text-gray-500 mt-3">
          Unable to load profile information.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/* Profile Header */}

      <ProfileHeader profile={profile} />

      {/* Statistics */}

      <div className="mt-10">
        <ProfileStats profile={profile} />
      </div>

      {/* Personal Information */}

      <div className="mt-10 border rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-8">Personal Information</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-500">Phone</p>

            <h3 className="font-semibold mt-2">
              {profile.phone || "Not Added"}
            </h3>
          </div>

          <div>
            <p className="text-gray-500">Location</p>

            <h3 className="font-semibold mt-2">
              {profile.location || "Not Added"}
            </h3>
          </div>

          <div>
            <p className="text-gray-500">Website</p>

            {profile.website ? (
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="font-semibold mt-2 underline"
              >
                {profile.website}
              </a>
            ) : (
              <h3 className="font-semibold mt-2">Not Added</h3>
            )}
          </div>

          <div>
            <p className="text-gray-500">GitHub</p>

            {profile.github ? (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="font-semibold mt-2 underline"
              >
                {profile.github}
              </a>
            ) : (
              <h3 className="font-semibold mt-2">Not Added</h3>
            )}
          </div>

          <div>
            <p className="text-gray-500">LinkedIn</p>

            {profile.linkedin ? (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="font-semibold mt-2 underline"
              >
                {profile.linkedin}
              </a>
            ) : (
              <h3 className="font-semibold mt-2">Not Added</h3>
            )}
          </div>
        </div>
      </div>

      {/* Skills */}

      <div className="mt-10 border rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>

        {profile.skills?.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {profile.skills.map((skill, index) => (
              <span key={index} className="border rounded-full px-4 py-2">
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No skills added yet.</p>
        )}
      </div>

      {/* Buttons */}

      <div className="flex gap-4 mt-10">
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Edit Profile
        </button>

        <button
          onClick={() => setShowPasswordModal(true)}
          className="border px-6 py-3 rounded-xl hover:bg-black hover:text-white transition"
        >
          Change Password
        </button>
      </div>

      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        profile={profile}
        onProfileUpdated={fetchProfile}
      />
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={() => {
          setShowPasswordModal(false);
        }}
      />
    </div>
  );
};

export default Profile;
