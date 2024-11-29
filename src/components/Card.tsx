import React from "react";

interface CardProps {
  title: string;
  startIcon?: React.ReactNode;
  middleIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type: "YOUTUBE" | "TWITTER";
  link: string;
}

const Card: React.FC<CardProps> = ({ title, startIcon, middleIcon, endIcon, type, link }) => {
  return (
    <div className="max-w-72 border rounded-md shadow-md">
      <div className="flex justify-between px-2 items-center mt-2">
        <div className="flex gap-2 items-center">
          <div className="text-slate-400">{startIcon}</div>
          <div className="font-extralight text-md">{title}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-slate-400 ">{middleIcon}</div>
          <div className="text-slate-400 cursor-pointer">{endIcon}</div>
        </div>
      </div>

      <div className="flex-grow">
        {/* YouTube Embed */}
        {type === "YOUTUBE" && link && (
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe
              src={link.replace("watch?v=", "embed/")} // Replacing 'watch?v=' with 'embed/'
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-md border-mediumslateblue border-2"
            ></iframe>
          </div>
        )}

        {/* Twitter Embed */}
        {type === "TWITTER" && link && (
          <div className="twitter-embed mb-4">
            <blockquote className="twitter-tweet" data-dnt="true">
              {/* Twitter embed URL handling */}
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
