import fs from 'fs';
import { revalidatePath } from 'next/cache';
import { simpleGit } from 'simple-git';

const VALID_REPO_NAME = 'AgrYpn1a/my-org';
const REPO = 'https://github.com/AgrYpn1a/my-org.git';
const REPO_LOCAL_PATH = `${process.cwd()}/public/org`;

const options = {
    baseDir: REPO_LOCAL_PATH,
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
};

export async function POST(request: Request) {
    const body = await request.json();
    if (body.repository.full_name !== VALID_REPO_NAME) {
        return new Response('Error', {
            status: 400,
        });
    }

    try {
        // Remove and re-create dir
        fs.rmSync(REPO_LOCAL_PATH, { recursive: true });
        fs.mkdirSync(REPO_LOCAL_PATH);

        const git = simpleGit(options);

        // Clone again
        git.clone(REPO, REPO_LOCAL_PATH, ['--depth', '1']);
        revalidatePath('/org');
    } catch (err) {
        console.error('Tried to execute [git clone] in' + `${process.cwd()}/public/org`);
        console.error(err);

        return new Response('Error', {
            status: 500,
        });
    }

    return new Response('OK', {
        status: 201,
    });
}
