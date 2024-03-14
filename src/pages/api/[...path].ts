import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';
// import { withSentry } from '@sentry/nextjs';

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
    console.log('-----------------req.url-------------', req.url);
    proxy.web(req, res, { target: API_SERVER_URL, changeOrigin: true });
    proxy.once('error', reject);
  });
};

// export default withSentry(handler);
export default handler;
