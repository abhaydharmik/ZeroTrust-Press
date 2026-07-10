import { useEffect, useRef, useState } from "react";
import { Camera, Upload } from "lucide-react";
import toast from "react-hot-toast";

import { uploadAvatar } from "../../services/userService";

const AvatarUpload = ({ profile, onUpload }) => {
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile?.avatar) {
      setPreview(`http://localhost:5000/uploads/${profile.avatar}`);
    } else if (profile?.name) {
      setPreview(
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.name,
        )}&background=000000&color=ffffff&size=256`,
      );
    }
  }, [profile]);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Image Validation

    if (!file.type.startsWith("image/")) {
      return toast.error("Please select an image file.");
    }

    // Size Validation

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Image must be less than 5 MB.");
    }

    setSelectedFile(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return toast.error("Please select an image.");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("avatar", selectedFile);

      const { data } = await uploadAvatar(formData);

      toast.success(data.message);

      if (onUpload) {
        onUpload(data.avatar);
      }

      setPreview(`http://localhost:5000/uploads/${data.avatar}`);
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Avatar upload failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex flex-col items-center">
      {/* Avatar */}

      <div className="relative">
        <img
          src={preview}
          alt="Avatar"
          className="h-40 w-40 rounded-full border object-cover"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="absolute bottom-2 right-2 rounded-full bg-black p-3 text-white hover:bg-gray-800 transition"
        >
          <Camera size={18} />
        </button>
      </div>

      {/* Hidden Input */}

      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleImage}
      />

      {/* Selected File */}

      {selectedFile && (
        <p className="mt-4 text-sm text-gray-500">{selectedFile.name}</p>
      )}

      {/* Upload Button */}

      <button
        type="button"
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className="mt-5 flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Upload size={18} />

        {loading ? "Uploading..." : "Upload Avatar"}
      </button>
    </div>
  );
};

export default AvatarUpload;
