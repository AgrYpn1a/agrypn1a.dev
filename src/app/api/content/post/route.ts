import { getPostBySlug } from '@/lib/api';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug') ?? '';

    const post = await getPostBySlug(slug);
    return Response.json({ post });
}
