import { FileText, Heart, MessageCircle, CalendarDays } from "lucide-react";

const ProfileStats = ({ profile }) => {
  const stats = [
    {
      title: "Blogs",
      value: profile.totalBlogs || 0,
      icon: <FileText size={26} />,
    },
    {
      title: "Likes",
      value: profile.totalLikes || 0,
      icon: <Heart size={26} />,
    },
    {
      title: "Comments",
      value: profile.totalComments || 0,
      icon: <MessageCircle size={26} />,
    },
    {
      title: "Member Since",
      value: new Date(profile.createdAt).getFullYear(),
      icon: <CalendarDays size={26} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="border rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-md transition"
        >
          <div className="mb-3">{item.icon}</div>

          <h2 className="text-3xl font-bold">{item.value}</h2>

          <p className="text-gray-500 mt-2">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;
