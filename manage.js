import { dirname } from "path";
import { fork } from "child_process";
import { config } from "./config.js";

export let services = {};

export let serviceConfirmation = {};
let portIndex = config.startPort;

export const startService = (path) => {
  fork(path, [++portIndex, config.startPort], {
    cwd: dirname(path),
  });

  serviceConfirmation[portIndex] = false;
};

export const confirmService = (port, name) => {
  serviceConfirmation[port] = true;
  services[name] = { port };
};

export const getService = (name) => {
  return services[name];
};
