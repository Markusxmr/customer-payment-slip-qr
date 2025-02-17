const { app, BrowserWindow, Menu, shell } = require('electron');
const { spawn, exec } = require('child_process');
const waitOn = require('wait-on');

// Helper function to kill processes listening on a specific port.
function killPort(port) {
  exec(`lsof -ti tcp:${port}`, (err, stdout) => {
    if (stdout) {
      stdout.split('\n').forEach(pid => {
        if (pid) {
          exec(`kill -9 ${pid}`, killErr => {
            if (killErr) {
              console.error(`Error killing process on port ${port} (PID: ${pid}):`, killErr);
            } else {
              console.log(`Killed process on port ${port} (PID: ${pid}).`);
            }
          });
        }
      });
    }
  });
}

let mainWindow;
let binaryProcess = null;

async function createWindow() {
  // Spawn the binary process in detached mode.
  binaryProcess = spawn('./main-linux', ['--arg1', '--arg2'], {
    shell: true,
    stdio: 'inherit',
    detached: true,
  });

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  global.mainWindow = mainWindow;

  try {
    await waitOn({
      resources: ['http://localhost:3000'],
      timeout: 15000,
    });
  } catch (err) {
    console.error('Servers did not start in time:', err);
    app.quit();
    return;
  }

  await mainWindow.loadURL('http://localhost:3000');

  // Create a complete menu template that includes both your custom items and default Electron menus.
  const isMac = process.platform === 'darwin';
  const menuTemplate = [
    // App Menu (only on macOS)
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideothers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),
    // File menu with your custom Print Preview
    {
      label: 'File',
      submenu: [
        {
          label: 'Print Preview',
          accelerator: 'CmdOrCtrl+P',
          click: async () => {
            if (mainWindow) {
              try {
                const pdfData = await mainWindow.webContents.printToPDF({ printBackground: true });
                let previewWindow = new BrowserWindow({
                  width: 1200,
                  height: 800,
                  webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true,
                  },
                });
                previewWindow.loadURL('data:application/pdf;base64,' + pdfData.toString('base64'));
              } catch (error) {
                console.error('Print preview error:', error);
              }
            }
          },
        },
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    },
    // Edit menu (default)
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }],
              },
            ]
          : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
      ],
    },
    // View menu (default)
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    // Window menu (default)
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac
          ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
          : [{ role: 'close' }]),
      ],
    },
    // Help menu (default)
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://electronjs.org');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // When the main window is closed, kill the binary process group and free ports.
  mainWindow.on('closed', () => {
    mainWindow = null;
    if (binaryProcess) {
      try {
        // Kill the entire process group by using a negative PID.
        process.kill(-binaryProcess.pid, 'SIGTERM');
        console.log('Killed binary process group.');
      } catch (error) {
        console.error('Error killing binary process group:', error);
      }
      binaryProcess = null;
    }
    killPort(3000);
    killPort(4000);
  });
}

app.whenReady().then(async () => {
  await createWindow();
  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) await createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  if (binaryProcess) {
    try {
      process.kill(-binaryProcess.pid, 'SIGTERM');
      console.log('Killed binary process group on will-quit.');
    } catch (error) {
      console.error('Error killing binary process group on will-quit:', error);
    }
    binaryProcess = null;
  }
  killPort(3000);
  killPort(4000);
});
