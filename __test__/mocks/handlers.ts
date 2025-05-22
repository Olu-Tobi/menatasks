import { rest } from 'msw';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const handlers = [
  rest.get(BASE_URL, (_: any, res: any, ctx: any) => {
    return res(
      ctx.status(200),
      ctx.json(
        Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          title: `Task ${i + 1}`,
          completed: false,
        }))
      )
    );
  }),

  rest.post(BASE_URL, async (req: any, res: any, ctx: any) => {
    const body = await req.json();
    return res(ctx.status(201), ctx.json({ ...body, id: 101 }));
  }),
];