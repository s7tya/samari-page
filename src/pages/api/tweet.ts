import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterClient } from "twitter-api-client";

interface Body {
  accessToken: string;
  accessTokenSecret: string;
  images: string[];
  title: string;
  includeTitle: boolean;
}

const arrayChunk = ([...array], size = 1) => {
  return array.reduce(
    (acc, _value, index) =>
      index % size ? acc : [...acc, array.slice(index, index + size)],
    []
  );
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Post以外弾く
  if (req.method !== "POST") {
    return res.status(400).json({
      error: "Invalid method.",
    });
  }

  const body: Body = JSON.parse(req.body);

  if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET) {
    return res.status(400).json({ error: "No API key or secret." });
  }

  const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: body.accessToken,
    accessTokenSecret: body.accessTokenSecret,
  });

  const chunkedImages: string[][] = arrayChunk(body.images, 4);

  let latestTweetId = "";

  for (const [index, images] of chunkedImages.entries()) {
    let media_ids = [];
    for (const image of images) {
      const init = await twitterClient.media.mediaUploadInit({
        command: "INIT",
        media_type: "image/png",
        total_bytes: Buffer.byteLength(image, "base64"),
      });

      media_ids.push(init.media_id_string);

      await twitterClient.media.mediaUploadAppend({
        command: "APPEND",
        media_id: init.media_id_string,
        media_data: image,
        segment_index: "0",
      });

      await twitterClient.media.mediaUploadFinalize({
        command: "FINALIZE",
        media_id: init.media_id_string,
      });
    }

    const tweet = await twitterClient.tweets.statusesUpdate({
      status: `${body.includeTitle || index == 0 ? body.title : ""} ${
        chunkedImages.length > 1 ? `(${index + 1}/${chunkedImages.length})` : ""
      }`,
      media_ids: media_ids.join(","),
      in_reply_to_status_id: latestTweetId,
    });

    latestTweetId = tweet.id_str;
  }

  res.status(200).json({});
};
