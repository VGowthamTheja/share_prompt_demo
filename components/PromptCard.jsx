"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
    setCopied(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post?.creator.image}
            alt="profile picture"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post?.creator.email}
            </p>
          </div>
        </div>
        <div className="cop_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user?.id === post?.creator?._id && pathName === "/profile" && (
        <div className="flex gap-14 items-end flex-center border-t border-gray-100 pt-3">
          <p
            className="px-2 py-1 rounded-md font-inter text-sm green_gradient cursor-pointer hover:border border-gray-500 "
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="px-2 py-1 rounded-md font-inter text-sm orange_gradient cursor-pointer hover:border border-gray-500 r"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
