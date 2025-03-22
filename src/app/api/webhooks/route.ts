import fs from 'fs';
import { simpleGit } from 'simple-git';

const options = {
    baseDir: `${process.cwd()}/public/org`,
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
};

const git = simpleGit(options);

const VALID_REPO_NAME = 'AgrYpn1a/my-org';
const REPO = 'https://github.com/AgrYpn1a/my-org.git';
const REPO_LOCAL_PATH = `${process.cwd()}/public/org`;

export async function POST(request: Request) {
    const body = await request.json();
    if (body.repository.full_name !== VALID_REPO_NAME) {
        return new Response('Error', {
            status: 400,
        });
    }

    if (!fs.existsSync(REPO_LOCAL_PATH)) {
        fs.mkdirSync(REPO_LOCAL_PATH);
        git.clone(REPO, `${process.cwd()}/public/org`);
    }

    try {
        const isRepo = await git.checkIsRepo();
        if (isRepo) {
            // This command serves purpose for local testing
            // however it does not harm the production.
            git.reset(['--hard', 'HEAD']);
            git.pull();
        } else {
            throw new Error('Not a valid git repository.');
        }

        // await git.clone('', `${process.cwd()}/public/org`, ['--depth', '1']);
    } catch (err) {
        console.error('Tried to execute [git pull] in' + `${process.cwd()}/public/org`);
        console.error(err);

        return new Response('Error', {
            status: 500,
        });
    }

    return new Response('OK', {
        status: 201,
    });
}
