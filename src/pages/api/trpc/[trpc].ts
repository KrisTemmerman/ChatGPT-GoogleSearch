import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createOpenApiNextHandler } from 'trpc-openapi';

import { env } from "~/env.mjs";
import { createTRPCContext } from "~/server/api/trpc";
import { appRouter } from "~/server/api/root";
import { NextApiRequest, NextApiResponse } from "next";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});


// export default createOpenApiNextHandler({ router: appRouter,
//   createContext: createTRPCContext,
//   onError:
//     env.NODE_ENV === "development"
//       ? ({ path, error }) => {
//           console.error(
//             `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
//           );
//         }
//       : undefined,
// });

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // Setup CORS
//   // await cors(req, res);

//   // Handle incoming OpenAPI requests
//   return createOpenApiNextHandler({
//     router: appRouter,
//     createContext:createTRPCContext,
    
//     onError:
//       env.NODE_ENV === "development"
//         ? ({ path, error }) => {
//             console.error(
//               `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
//             );
//           }
//         : undefined,
//   })(req, res);
// };

// export default handler;
