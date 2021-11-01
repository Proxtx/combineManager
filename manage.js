import { dirname } from "path";
import { fork } from "child_process";
import { config } from "./config.js";

export let services = {};

export let serviceConfirmation = {};
let portIndex = config.startPort;

export const startService = async (path) => {
  let port = ++portIndex;
  fork(path, [port, config.startPort], {
    cwd: dirname(path),
  });

  await new Promise((resolve) => (serviceConfirmation[port] = resolve));

  return port;
};

export const confirmService = (port, name) => {
  services[name] = { port };
  serviceConfirmation[port]();
};

export const getService = (name) => {
  return services[name];
};
