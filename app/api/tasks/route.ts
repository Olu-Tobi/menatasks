import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export async function GET() {
    try {
        const response = await axios.get(BASE_URL);
        return NextResponse.json(response.data.slice(0, 10)); // You can limit or slice here if needed
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const response = await axios.post(BASE_URL, data, {
            headers: { 'Content-Type': 'application/json' },
        });
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}



