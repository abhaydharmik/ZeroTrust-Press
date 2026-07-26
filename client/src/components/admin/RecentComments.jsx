import { MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const RecentComments = ({ comments = [] }) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
        <MessageSquare size={20} />
        Recent Comments
      </h2>

      {comments.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          No comments found.
        </div>
      ) : (
        <div className="space-y-5">
          {comments.map((comment, index) => {
            const avatar = comment.userAvatar
              ? comment.userAvatar.startsWith("http")
                ? comment.userAvatar
                : `http://localhost:5000/uploads/${comment.userAvatar}`
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.userName)}`;

            return (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start gap-3">
                  <img
                    src={avatar}
                    alt={comment.userName}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{comment.userName}</h3>

                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-700">
                      {comment.comment}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      On:
                      <span className="ml-1 font-medium">
                        {comment.blogTitle}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentComments;
