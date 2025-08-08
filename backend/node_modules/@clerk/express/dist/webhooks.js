"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/webhooks.ts
var webhooks_exports = {};
__export(webhooks_exports, {
  verifyWebhook: () => verifyWebhook
});
module.exports = __toCommonJS(webhooks_exports);
var import_webhooks = require("@clerk/backend/webhooks");

// src/utils.ts
var import_underscore = require("@clerk/shared/underscore");
var incomingMessageToRequest = (req) => {
  const headers = Object.keys(req.headers).reduce((acc, key) => Object.assign(acc, { [key]: req?.headers[key] }), {});
  const protocol = req.connection?.encrypted ? "https" : "http";
  const dummyOriginReqUrl = new URL(req.originalUrl || req.url || "", `${protocol}://clerk-dummy`);
  return new Request(dummyOriginReqUrl, {
    method: req.method,
    headers: new Headers(headers)
  });
};

// src/webhooks.ts
__reExport(webhooks_exports, require("@clerk/backend/webhooks"), module.exports);
async function verifyWebhook(req, options) {
  const webRequest = incomingMessageToRequest(req);
  let serializedBody;
  if (typeof req.body === "string") {
    serializedBody = req.body;
  } else if (Buffer.isBuffer(req.body)) {
    serializedBody = req.body.toString("utf8");
  } else if (req.body === void 0 || req.body === null) {
    serializedBody = "";
  } else {
    try {
      serializedBody = JSON.stringify(req.body);
    } catch (error) {
      throw new Error(`Failed to serialize request body: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  const clonedRequest = new Request(webRequest, {
    body: serializedBody
  });
  return (0, import_webhooks.verifyWebhook)(clonedRequest, options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  verifyWebhook,
  ...require("@clerk/backend/webhooks")
});
//# sourceMappingURL=webhooks.js.map