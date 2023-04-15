const { spawn } = require('child_process');

// Путь к программе, в которую будем внедрять DLL
const targetProgram = 'C:\\Windows\\System32\\notepad.exe';
// Путь к DLL-библиотеке, которую будем инжектировать
const dllPath = 'C:\\path\\to\\mydll.dll';

// Запускаем целевую программу с помощью child_process.spawn
const targetProcess = spawn(targetProgram);

// При запуске программы выводим PID в консоль
console.log(`Target process started with PID ${targetProcess.pid}`);

// Ожидаем, пока целевая программа завершится
targetProcess.on('exit', () => {
  console.log('Target process exited');
});

// Инжектируем DLL-библиотеку в целевой процесс с помощью команды rundll32
const injectProcess = spawn('rundll32', ['inject.dll', 'Inject', targetProcess.pid, dllPath]);

// При инжекторе DLL выводим PID в консоль
injectProcess.on('exit', () => {
  console.log('DLL injected successfully');
});
