import tokenValues from '@/datas/token-value.json';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';
import { TokenPriceSchema } from './token-price.schema';

export const tokenPriceRouter = createTRPCRouter({
  getTokenPrice: publicProcedure.input(TokenPriceSchema).query(({ input }) => {
    const mappedTokenValue = tokenValues.find(
      (token) => token.address === input.address
    );
    if (!mappedTokenValue) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }
    return mappedTokenValue;
  }),
});
