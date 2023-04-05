import { z } from "zod";

export const TokenPriceSchema = z.object({
    address: z.string().startsWith('0x')
})

export type ITokenPrice = z.infer<typeof TokenPriceSchema>
