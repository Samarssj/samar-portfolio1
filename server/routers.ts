import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { searchSpotifySong, searchMultipleSongs } from "./spotify";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  spotify: router({
    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        // Parse the query to extract title and artist
        const parts = input.query.split(' - ');
        const title = parts[0]?.trim() || input.query;
        const artist = parts[1]?.trim() || '';
        
        const result = await searchSpotifySong(title, artist);
        return result;
      }),
    
    getTracks: publicProcedure
      .input(z.object({ 
        tracks: z.array(z.object({ 
          title: z.string(), 
          artist: z.string() 
        })) 
      }))
      .query(async ({ input }) => {
        const results = await searchMultipleSongs(input.tracks);
        return results;
      }),
  }),
});

export type AppRouter = typeof appRouter;
