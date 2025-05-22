import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const data = await req.json();

        const response = await axios.patch(`${BASE_URL}/${id}`, data, {
            headers: { 'Content-Type': 'application/json' },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}



export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        await axios.delete(`${BASE_URL}/${id}`);

        return NextResponse.json({ id, deleted: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}
