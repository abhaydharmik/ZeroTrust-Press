import { CalendarDays, Mail, MapPin } from "lucide-react";

const ProfileHeader = ({ profile }) => {
  const avatarUrl = profile.avatar
    ? `http://localhost:5000/uploads/${profile.avatar}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profile.name,
      )}&background=000000&color=ffffff&size=256`;

  return (
    <div className="border rounded-2xl p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}

        <img
          src={avatarUrl}
          alt={profile.name}
          className="w-40 h-40 rounded-full object-cover border"
        />

        {/* User Information */}

        <div className="flex-1">
          <h1 className="text-4xl font-bold">{profile.name}</h1>

          <div className="flex items-center gap-2 mt-3 text-gray-600">
            <Mail size={18} />

            <span>{profile.email}</span>
          </div>

          <div className="flex items-center gap-2 mt-3 text-gray-600">
            <MapPin size={18} />

            <span>{profile.location || "Location not added"}</span>
          </div>

          <div className="flex items-center gap-2 mt-3 text-gray-600">
            <CalendarDays size={18} />

            <span>
              Joined {new Date(profile.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Bio */}

          <div className="mt-6">
            <h3 className="font-semibold text-lg">About</h3>

            <p className="text-gray-600 mt-2 leading-7">
              {profile.bio || "No bio added yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
