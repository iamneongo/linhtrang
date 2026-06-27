import { spawn } from 'node:child_process';

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const rootProc = spawn(npmCmd, ['run', 'dev:root'], {
  cwd: process.cwd(),
  stdio: 'inherit',
});

const adminProc = spawn(npmCmd, ['--prefix', 'admin-zone', 'run', 'dev'], {
  cwd: process.cwd(),
  stdio: 'inherit',
});

let exiting = false;

function stop(code = 0) {
  if (exiting) return;
  exiting = true;

  for (const child of [rootProc, adminProc]) {
    if (!child.killed) {
      child.kill();
    }
  }

  process.exit(code);
}

for (const child of [rootProc, adminProc]) {
  child.on('exit', (code, signal) => {
    if (!exiting && (code !== 0 || signal)) {
      stop(typeof code === 'number' ? code : 1);
    }
  });
}

process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
