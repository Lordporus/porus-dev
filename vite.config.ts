import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      {
        name: 'api-server-middleware',
        configureServer(server) {
          server.middlewares.use(async (req: any, res: any, next: any) => {
            if (req.url === '/api/chat' && req.method === 'POST') {
              process.env.GROQ_API_KEY = env.GROQ_API_KEY;
              let body = '';
              req.on('data', (chunk: any) => { body += chunk.toString() });
              req.on('end', async () => {
                try {
                  req.body = JSON.parse(body || '{}');

                  // Mock Vercel response helpers
                  res.status = (code: any) => {
                    res.statusCode = code;
                    return res;
                  };
                  res.json = (data: any) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                  };

                  const { default: handler } = await server.ssrLoadModule('./api/chat.ts');
                  await handler(req, res);
                } catch (e) {
                  console.error(e);
                  if (res.status) res.status(500);
                  else res.statusCode = 500;
                  res.end(e instanceof Error ? e.message : 'Internal Server Error');
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
