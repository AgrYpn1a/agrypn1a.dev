import { getAllPaths } from '@/lib/api';

export type AllPathsResponse = {
    paths: string[];
};

export async function GET() {
    return Response.json({ paths: await getAllPaths() });
}
