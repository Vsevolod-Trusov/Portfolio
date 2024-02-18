import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';

export const prisma = new PrismaClient();
export const tRPC = initTRPC.create();

export const helloProcedure = tRPC.procedure.query(() => 'Hello from back');

export const router = tRPC.router({
  sayHi: tRPC.procedure.query(() => 'Hello from back'),
  getUsers: tRPC.procedure.query(async () => {
    try {
      const user = await prisma.user.findMany({ where: { name: 'Alice' } });
      return user;
    } catch (e) {
      return 'Some backend error';
    }
  }),
});
