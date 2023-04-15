const { spawn } = require('child_process'); // npm install child_process

const targetProgram = 'PATH TO YOUR PROGRAM';
const dllPath = 'PATH TO YOUR DLL';

const targetProcess = spawn(targetProgram);

console.log(`Target process started with PID ${targetProcess.pid}`);

targetProcess.on('exit', () => {
  console.log('Target process exited');
});

const injectProcess = spawn('rundll32', ['inject.dll', 'RunThread', targetProcess.pid, dllPath]); // std::thread RunThread(MainThread);

injectProcess.on('exit', () => {
  console.log('DLL injected successfully');
});
