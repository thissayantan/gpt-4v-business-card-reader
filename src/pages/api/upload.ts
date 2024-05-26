import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  text: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { image } = req.body; // In reality, you'd send this image to Cloudflare R2 and your GPT-4V powered text extraction API

  // Simulated text extraction response
  res.status(200).json({ text: "Extracted text from the image" });
}
