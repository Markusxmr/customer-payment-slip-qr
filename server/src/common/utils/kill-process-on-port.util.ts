import * as process from 'process';
import { execSync } from 'child_process';
import * as os from 'os';

/**
 * Checks if a process is running on a given port and kills it if found.
 *
 * @param {number} port The port to check.
 * @returns {Promise<boolean>} True if a process was killed, false otherwise.
 */
export async function killProcessOnPort(port: number): Promise<boolean> {
  try {
    // Platform-specific commands
    let command: string;
    if (os.platform() === 'win32') {
      // Windows: Find process ID (PID) listening on the port and kill it.
      // netstat -ano | findstr :<port>  finds the pid
      // taskkill /F /PID <pid>            kills the process
      command = `FOR /F "tokens=5" %a IN ('netstat -ano ^| findstr :${port}') DO taskkill /F /PID %a`;
    } else {
      // macOS, Linux, and other Unix-like systems
      // lsof -i :<port> -t   finds the pid
      // kill -9 <pid>        kills the process.  -9 is SIGKILL (force kill)
      command = `lsof -i :${port} -t | xargs kill -9`;
    }

    // Try/Catch.  lsof and netstat return different error codes when a process isn't found.
    try {
      execSync(command, { stdio: 'ignore' }); // Execute and ignore output
      console.log(`Killed process on port ${port}`);
      return true; // Process was killed
    } catch (lsofNetstatError) {
      // likely that nothing was found;  check the error string
      const errorString = lsofNetstatError.message.toString().toLowerCase();
      // lsof exit code 1 means no processes matched
      if (
        os.platform() !== 'win32' &&
        (errorString.includes('exit code 1') || errorString.includes('no matching processes'))
      ) {
        return false;
      }
      // netstat on windows: if nothing found, we expect this:
      if (os.platform() === 'win32' && errorString.includes('findstr: cannot open')) {
        return false;
      }
      // Something else is very wrong.  Throw.
      throw lsofNetstatError;
    }
  } catch (error) {
    // Check if the error is due to no process being found or another error.
    // Different OSes will have different error messages or codes for 'no process found'.
    // So we can't reliably check for a specific error message/code.
    // If the port is free, it is likely that the command above failed because no process was found.
    console.warn(
      `Warning: Could not kill process on port ${port}. It may not be in use, or there may be a permissions issue. Error: ${error}`,
    );
    return false; // Assume no process was killed (port may be free or there was an error)
  }
}
