import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';

const API_SERVER_URL = `${process.env.SERVER_API_URL}`;
const proxy = httpProxy.createProxyServer();

// * Don't parse JSON body on this route
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve, reject) => {
    req.url = req.url?.replace(/^\/api/, '');

    proxy.web(req, res, { target: API_SERVER_URL, changeOrigin: true, xfwd: true });
    proxy.once('error', reject);
  });
};

export default handler;
