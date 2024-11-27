import { ReactElement, useEffect } from "react";

const extractYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const extractTweetId = (url: string): string | null => {
  const regex = /(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:[^\/\n\s]+\/\S+\/|(?:status|i\/web\/status)\/)(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

interface CardInterface {
  title: string;
  startIcon?: ReactElement;
  middleIcon?: ReactElement;
  endIcon?: ReactElement;
  type: "Youtube" | "Twitter";
  link: string;
}

const Card = ({ title, startIcon, middleIcon, endIcon, type, link }: CardInterface) => {
  const videoId = extractYouTubeVideoId(link);
  const tweetId = extractTweetId(link);

  // Load Twitter's embed script dynamically
  useEffect(() => {
    if (tweetId) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [tweetId]);

  return (
    <div className="max-w-72 border rounded-md shadow-md">
      <div className="flex justify-between px-2 items-center mt-2">
        <div className="flex gap-2 items-center">
          <div className="text-slate-400">{startIcon}</div>
          <div className="font-extralight text-md">{title}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-slate-400 cursor-pointer">{middleIcon}</div>
          <div className="text-slate-400">{endIcon}</div>
        </div>
      </div>

      {type === "Twitter" ? (
        tweetId ? (
          <div className="py-2">
            <blockquote
              className="twitter-tweet"
              data-cards="hidden"
              data-dnt="true"
              align="center"
              data-url={`https://twitter.com/twitter/status/${tweetId}`} 
            >
              <p lang="en" dir="ltr">
                Loading tweet...
              </p>
            </blockquote>
          </div>
        ) : (
          <div className="py-2">Invalid Tweet URL</div>
        )
      ) : (
        <div className="py-2">
          {/* Embed for YouTube Video */}
          {videoId ? (
            <iframe
              width="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="py-2">Invalid YouTube URL</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
