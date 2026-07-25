import {
  FileText,
  FolderOpen,
  Heart,
  MessagesSquare,
  Users,
} from "lucide-react";
import React from "react";

const cards = [
  {
    key: "totalUsers",
    title: "Users",
    icon: Users,
  },
  {
    key: "totalBlogs",
    title: "Blogs",
    icon: FileText,
  },
  {
    key: "totalCategories",
    title: "Categories",
    icon: FolderOpen,
  },
  {
    key: "totalComments",
    title: "Comments",
    icon: MessagesSquare,
  },
  {
    key: "totalLikes",
    title: "Likes",
    icon: Heart,
  },
];

const AnalyticsCard = ({ overview }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>

                <h2 className="mt-2 text-3xl font-bold">
                  {(overview?.[card.key] ?? 0).toLocaleString()}
                </h2>
              </div>

              <div className="rounded-full bg-gray-100 p-3">
                <Icon size={26} className="text-gray-700" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnalyticsCard;
