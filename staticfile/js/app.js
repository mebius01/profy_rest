/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack:///./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ \"./node_modules/axios/lib/core/buildFullPath.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password || '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    var fullPath = buildFullPath(config.baseURL, config.url);\n    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    // Listen for ready state\n    request.onreadystatechange = function handleLoad() {\n      if (!request || request.readyState !== 4) {\n        return;\n      }\n\n      // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      }\n\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        status: request.status,\n        statusText: request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(resolve, reject, response);\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle browser request cancellation (as opposed to a manual cancellation)\n    request.onabort = function handleAbort() {\n      if (!request) {\n        return;\n      }\n\n      reject(createError('Request aborted', config, 'ECONNABORTED', request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';\n      if (config.timeoutErrorMessage) {\n        timeoutErrorMessage = config.timeoutErrorMessage;\n      }\n      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',\n        request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      var cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\n\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?\n        cookies.read(config.xsrfCookieName) :\n        undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (!utils.isUndefined(config.withCredentials)) {\n      request.withCredentials = !!config.withCredentials;\n    }\n\n    // Add responseType to request if needed\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel);\n        // Clean up request\n        request = null;\n      });\n    }\n\n    if (requestData === undefined) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Factory for creating new instances\naxios.create = function create(instanceConfig) {\n  return createInstance(mergeConfig(axios.defaults, instanceConfig));\n};\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports.default = axios;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar buildURL = __webpack_require__(/*! ../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\nvar mergeConfig = __webpack_require__(/*! ./mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\n\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = arguments[1] || {};\n    config.url = arguments[0];\n  } else {\n    config = config || {};\n  }\n\n  config = mergeConfig(this.defaults, config);\n\n  // Set config.method\n  if (config.method) {\n    config.method = config.method.toLowerCase();\n  } else if (this.defaults.method) {\n    config.method = this.defaults.method.toLowerCase();\n  } else {\n    config.method = 'get';\n  }\n\n  // Hook up interceptors middleware\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\nAxios.prototype.getUri = function getUri(config) {\n  config = mergeConfig(this.defaults, config);\n  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\\?/, '');\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, data, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Creates a new URL by combining the baseURL with the requestedURL,\n * only when the requestedURL is not already an absolute URL.\n * If the requestURL is absolute, this function returns the requestedURL untouched.\n *\n * @param {string} baseURL The base URL\n * @param {string} requestedURL Absolute or relative URL to combine\n * @returns {string} The combined full path\n */\nmodule.exports = function buildFullPath(baseURL, requestedURL) {\n  if (baseURL && !isAbsoluteURL(requestedURL)) {\n    return combineURLs(baseURL, requestedURL);\n  }\n  return requestedURL;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/buildFullPath.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData(\n    config.data,\n    config.headers,\n    config.transformRequest\n  );\n\n  // Flatten headers\n  config.headers = utils.merge(\n    config.headers.common || {},\n    config.headers[config.method] || {},\n    config.headers\n  );\n\n  utils.forEach(\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\n    function cleanHeaderConfig(method) {\n      delete config.headers[method];\n    }\n  );\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData(\n      response.data,\n      response.headers,\n      config.transformResponse\n    );\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData(\n          reason.response.data,\n          reason.response.headers,\n          config.transformResponse\n        );\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n\n  error.request = request;\n  error.response = response;\n  error.isAxiosError = true;\n\n  error.toJSON = function() {\n    return {\n      // Standard\n      message: this.message,\n      name: this.name,\n      // Microsoft\n      description: this.description,\n      number: this.number,\n      // Mozilla\n      fileName: this.fileName,\n      lineNumber: this.lineNumber,\n      columnNumber: this.columnNumber,\n      stack: this.stack,\n      // Axios\n      config: this.config,\n      code: this.code\n    };\n  };\n  return error;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Config-specific merge-function which creates a new config-object\n * by merging two configuration objects together.\n *\n * @param {Object} config1\n * @param {Object} config2\n * @returns {Object} New object resulting from merging config2 to config1\n */\nmodule.exports = function mergeConfig(config1, config2) {\n  // eslint-disable-next-line no-param-reassign\n  config2 = config2 || {};\n  var config = {};\n\n  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];\n  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];\n  var defaultToConfig2Keys = [\n    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',\n    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',\n    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',\n    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',\n    'httpsAgent', 'cancelToken', 'socketPath'\n  ];\n\n  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {\n    if (typeof config2[prop] !== 'undefined') {\n      config[prop] = config2[prop];\n    }\n  });\n\n  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {\n    if (utils.isObject(config2[prop])) {\n      config[prop] = utils.deepMerge(config1[prop], config2[prop]);\n    } else if (typeof config2[prop] !== 'undefined') {\n      config[prop] = config2[prop];\n    } else if (utils.isObject(config1[prop])) {\n      config[prop] = utils.deepMerge(config1[prop]);\n    } else if (typeof config1[prop] !== 'undefined') {\n      config[prop] = config1[prop];\n    }\n  });\n\n  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {\n    if (typeof config2[prop] !== 'undefined') {\n      config[prop] = config2[prop];\n    } else if (typeof config1[prop] !== 'undefined') {\n      config[prop] = config1[prop];\n    }\n  });\n\n  var axiosKeys = valueFromConfig2Keys\n    .concat(mergeDeepPropertiesKeys)\n    .concat(defaultToConfig2Keys);\n\n  var otherKeys = Object\n    .keys(config2)\n    .filter(function filterAxiosKeys(key) {\n      return axiosKeys.indexOf(key) === -1;\n    });\n\n  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {\n    if (typeof config2[prop] !== 'undefined') {\n      config[prop] = config2[prop];\n    } else if (typeof config1[prop] !== 'undefined') {\n      config[prop] = config1[prop];\n    }\n  });\n\n  return config;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/mergeConfig.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  if (!validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError(\n      'Request failed with status code ' + response.status,\n      response.config,\n      null,\n      response.request,\n      response\n    ));\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n\n  return data;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Accept');\n    normalizeHeaderName(headers, 'Content-Type');\n    if (utils.isFormData(data) ||\n      utils.isArrayBuffer(data) ||\n      utils.isBuffer(data) ||\n      utils.isStream(data) ||\n      utils.isFile(data) ||\n      utils.isBlob(data)\n    ) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) { /* Ignore */ }\n    }\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\n\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).\n    replace(/%40/gi, '@').\n    replace(/%3A/gi, ':').\n    replace(/%24/g, '$').\n    replace(/%2C/gi, ',').\n    replace(/%20/g, '+').\n    replace(/%5B/gi, '[').\n    replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    var hashmarkIndex = url.indexOf('#');\n    if (hashmarkIndex !== -1) {\n      url = url.slice(0, hashmarkIndex);\n    }\n\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\n    : baseURL;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs support document.cookie\n    (function standardBrowserEnv() {\n      return {\n        write: function write(name, value, expires, path, domain, secure) {\n          var cookie = [];\n          cookie.push(name + '=' + encodeURIComponent(value));\n\n          if (utils.isNumber(expires)) {\n            cookie.push('expires=' + new Date(expires).toGMTString());\n          }\n\n          if (utils.isString(path)) {\n            cookie.push('path=' + path);\n          }\n\n          if (utils.isString(domain)) {\n            cookie.push('domain=' + domain);\n          }\n\n          if (secure === true) {\n            cookie.push('secure');\n          }\n\n          document.cookie = cookie.join('; ');\n        },\n\n        read: function read(name) {\n          var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n          return (match ? decodeURIComponent(match[3]) : null);\n        },\n\n        remove: function remove(name) {\n          this.write(name, '', Date.now() - 86400000);\n        }\n      };\n    })() :\n\n  // Non standard browser env (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return {\n        write: function write() {},\n        read: function read() { return null; },\n        remove: function remove() {}\n      };\n    })()\n);\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs have full support of the APIs needed to test\n  // whether the request URL is of the same origin as current location.\n    (function standardBrowserEnv() {\n      var msie = /(msie|trident)/i.test(navigator.userAgent);\n      var urlParsingNode = document.createElement('a');\n      var originURL;\n\n      /**\n    * Parse a URL to discover it's components\n    *\n    * @param {String} url The URL to be parsed\n    * @returns {Object}\n    */\n      function resolveURL(url) {\n        var href = url;\n\n        if (msie) {\n        // IE needs attribute set twice to normalize properties\n          urlParsingNode.setAttribute('href', href);\n          href = urlParsingNode.href;\n        }\n\n        urlParsingNode.setAttribute('href', href);\n\n        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n        return {\n          href: urlParsingNode.href,\n          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n          host: urlParsingNode.host,\n          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n          hostname: urlParsingNode.hostname,\n          port: urlParsingNode.port,\n          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\n            urlParsingNode.pathname :\n            '/' + urlParsingNode.pathname\n        };\n      }\n\n      originURL = resolveURL(window.location.href);\n\n      /**\n    * Determine if a URL shares the same origin as the current location\n    *\n    * @param {String} requestURL The URL to test\n    * @returns {boolean} True if URL shares the same origin, otherwise false\n    */\n      return function isURLSameOrigin(requestURL) {\n        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\n        return (parsed.protocol === originURL.protocol &&\n            parsed.host === originURL.host);\n      };\n    })() :\n\n  // Non standard browser envs (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return function isURLSameOrigin() {\n        return true;\n      };\n    })()\n);\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = [\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\n  'referer', 'retry-after', 'user-agent'\n];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) { return parsed; }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\n\n/*global toString:true*/\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is a Buffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Buffer, otherwise false\n */\nfunction isBuffer(val) {\n  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)\n    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n * nativescript\n *  navigator.product -> 'NativeScript' or 'NS'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||\n                                           navigator.product === 'NativeScript' ||\n                                           navigator.product === 'NS')) {\n    return false;\n  }\n  return (\n    typeof window !== 'undefined' &&\n    typeof document !== 'undefined'\n  );\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (typeof result[key] === 'object' && typeof val === 'object') {\n      result[key] = merge(result[key], val);\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Function equal to merge with the difference being that no reference\n * to original objects is kept.\n *\n * @see merge\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction deepMerge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (typeof result[key] === 'object' && typeof val === 'object') {\n      result[key] = deepMerge(result[key], val);\n    } else if (typeof val === 'object') {\n      result[key] = deepMerge({}, val);\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  deepMerge: deepMerge,\n  extend: extend,\n  trim: trim\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/index.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/index.scss ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!../style/reset.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style/reset.css\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css2?family=Mr+De+Haviland&family=Rubik:wght@300;400;500;700;900&display=swap);\"]);\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap);\"]);\n// Module\nexports.push([module.i, \"@charset \\\"UTF-8\\\";\\n.slideInLeft {\\n  animation-name: slideInLeft;\\n  animation-duration: 1s;\\n  animation-fill-mode: both;\\n}\\n@keyframes slideInLeft {\\n  0% {\\n    transform: translateX(-100%);\\n    visibility: visible;\\n  }\\n  100% {\\n    transform: translateX(0);\\n  }\\n}\\n\\n.slideInRight {\\n  animation-name: slideInRight;\\n  animation-duration: 1s;\\n  animation-fill-mode: both;\\n}\\n@keyframes slideInRight {\\n  0% {\\n    transform: translateX(100%);\\n    visibility: visible;\\n  }\\n  100% {\\n    transform: translateX(0);\\n  }\\n}\\n\\n.zoomIn {\\n  animation-name: zoomIn;\\n  animation-duration: 0.5s;\\n  animation-fill-mode: both;\\n}\\n@-webkit-keyframes zoomIn {\\n  0% {\\n    opacity: 0;\\n    transform: scale3d(0.3, 0.3, 0.3);\\n  }\\n  50% {\\n    opacity: 1;\\n  }\\n}\\n@keyframes zoomIn {\\n  0% {\\n    opacity: 0;\\n    transform: scale3d(0.3, 0.3, 0.3);\\n  }\\n  50% {\\n    opacity: 1;\\n  }\\n}\\n\\n.scale-in-ver-bottom {\\n  animation: scale-in-ver-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\\n}\\n@keyframes scale-in-ver-bottom {\\n  0% {\\n    transform: scaleY(0);\\n    transform-origin: 0% 100%;\\n    opacity: 1;\\n  }\\n  100% {\\n    transform: scaleY(1);\\n    transform-origin: 0% 100%;\\n    opacity: 1;\\n  }\\n}\\n\\n.pulse, .menu__link:hover, .call .form input[type=submit]:hover, .map .fa-times:hover, .menu .fa-times:hover, .call .fa-times:hover, .social__link:hover, .footer .row .form input[type=submit]:hover {\\n  animation-name: pulse;\\n  animation-duration: 0.5s;\\n  animation-fill-mode: both;\\n}\\n@keyframes pulse {\\n  0% {\\n    transform: scale3d(1, 1, 1);\\n  }\\n  50% {\\n    transform: scale3d(1.5, 1.5, 1.5);\\n  }\\n}\\n\\n.shake, .header .blue:hover, .header .green:hover, .header .yellow:hover, .header .red:hover {\\n  animation-name: shake;\\n  animation-duration: 1s;\\n  animation-fill-mode: both;\\n}\\n@keyframes shake {\\n  0%, 100% {\\n    transform: translateX(0);\\n  }\\n  10%, 30%, 50%, 70%, 90% {\\n    transform: translateX(-5px);\\n  }\\n  20%, 40%, 60%, 80% {\\n    transform: translateX(5px);\\n  }\\n}\\n\\nhtml,\\nbody {\\n  margin: 0;\\n  padding: 0;\\n  font-family: \\\"Rubik\\\", sans-serif;\\n}\\n\\n.h2 {\\n  padding-bottom: 10px;\\n  color: #373f48;\\n  font-size: 32px;\\n  line-height: 38px;\\n  font-weight: 500;\\n}\\n@media (min-width: 320px) and (max-width: 640px) {\\n  .h2 {\\n    font-size: 23px;\\n  }\\n}\\n\\n.focus, .menu__link:focus, .social__link:focus, .footer .row .contact__link:focus, .footer .row .contact__link:hover, .main .article__link:focus {\\n  outline: none;\\n  border: #e74c3c solid 3px;\\n  padding: 4px;\\n  transition-property: border;\\n  transition-duration: 0.3s;\\n}\\n\\n.flex-col-centr, .main .article__content {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n}\\n\\n.shadow, .thank, .call, .main .article {\\n  box-shadow: -1px 1px 9px 1px rgba(0, 0, 0, 0.6);\\n}\\n\\n.close-icon {\\n  cursor: pointer;\\n  border: none;\\n  background-color: #373f48;\\n  display: block;\\n  position: absolute;\\n  padding: 8px;\\n  top: 0;\\n  right: 0;\\n  color: #e74c3c;\\n}\\n.close-icon::after {\\n  content: \\\"✖\\\";\\n  font-size: 32px;\\n}\\n\\n.header {\\n  position: relative;\\n  height: 200px;\\n  display: flex;\\n  flex-direction: row;\\n  justify-content: space-between;\\n}\\n.header .strip {\\n  padding: 20px 0;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: space-between;\\n  width: 100vh;\\n  color: white;\\n}\\n.header .strip span {\\n  display: block;\\n}\\n.header .strip .strict-letter {\\n  font-family: \\\"Rubik\\\", sans-serif;\\n  font-size: 70px;\\n  font-weight: 400;\\n  margin-bottom: 20px;\\n  border-bottom: 4px white solid;\\n}\\n.header .strip .soft-letter {\\n  font-family: \\\"Kaushan Script\\\", cursive;\\n  font-size: 60px;\\n  color: #373f48;\\n}\\n@media (min-width: 320px) and (max-width: 640px) {\\n  .header .strip {\\n    height: 100px;\\n  }\\n  .header .strip .strict-letter {\\n    font-size: 40px;\\n  }\\n  .header .strip .soft-letter {\\n    font-size: 30px;\\n  }\\n}\\n.header .red {\\n  background-color: red;\\n}\\n.header .orange {\\n  background-color: #373f48;\\n}\\n.header .yellow {\\n  background-color: #FF00FF;\\n}\\n.header .green {\\n  background-color: green;\\n}\\n.header .blue {\\n  background-color: blue;\\n}\\n.main {\\n  width: 80%;\\n  margin: 40px auto;\\n}\\n@media (min-width: 320px) and (max-width: 640px) {\\n  .main {\\n    width: 100%;\\n    margin: -20px auto;\\n  }\\n}\\n.main .article {\\n  height: 444px;\\n  margin-bottom: 88px;\\n}\\n@media (min-width: 320px) and (max-width: 640px) {\\n  .main .article {\\n    margin-bottom: 44px;\\n  }\\n}\\n.main .article__img {\\n  text-align: right;\\n}\\n.main .article__img img {\\n  height: 444px;\\n  width: 100%;\\n  object-fit: cover;\\n}\\n.main .article__content {\\n  background-color: rgba(255, 255, 255, 0.5);\\n  color: #373f48;\\n  position: relative;\\n  top: -342px;\\n  height: 160px;\\n  width: 50%;\\n  padding: 40px 10px;\\n  transition-property: top padding background-color;\\n  transition-duration: 0.5s;\\n  align-items: flex-start;\\n}\\n@media (min-width: 320px) and (max-width: 640px) {\\n  .main .article__content {\\n    width: auto;\\n    background-color: rgba(255, 255, 255, 0.5);\\n  }\\n}\\n@media (min-width: 641px) and (max-width: 940px) {\\n  .main .article__content {\\n    width: 80%;\\n  }\\n}\\n.main .article__content .article__title {\\n  transition-property: border-bottom color;\\n  transition-duration: 0.3s;\\n}\\n.main .article__content .article__title::after {\\n  content: \\\"→\\\";\\n  font-size: 38px;\\n  color: #373f48;\\n  transition-property: font-size color;\\n  transition-duration: 0.5s;\\n}\\n.main .article__content .article__title::after:hover {\\n  color: #e74c3c;\\n}\\n.main .article__content:hover {\\n  background-color: white;\\n  top: -445px;\\n  padding: 143px 10px;\\n}\\n.main .article__content:hover .article__title::after {\\n  content: \\\"→\\\";\\n  font-size: 42px;\\n  color: #e74c3c;\\n}\\n.main .article__content:hover .article__title {\\n  border-bottom: 3px #e74c3c solid;\\n}\\n@media (min-width: 320px) and (max-width: 640px) {\\n  .main .article__content:hover {\\n    border-top: 1px solid rgba(189, 189, 189, 0.3);\\n    border-bottom: 1px solid rgba(189, 189, 189, 0.3);\\n  }\\n}\\n.main .article__text {\\n  margin-top: 15px;\\n  font-size: 18px;\\n  line-height: 20px;\\n}\\n.main .article__link {\\n  text-decoration: none;\\n  display: block;\\n}\\n.footer {\\n  background-color: #373f48;\\n}\\n.footer__line {\\n  height: 1px;\\n  width: 95%;\\n  background-color: #e74c3c;\\n  margin: 0 auto;\\n}\\n.footer .row {\\n  display: flex;\\n  flex-direction: row;\\n  justify-content: space-between;\\n}\\n.footer .row .contact {\\n  list-style: none;\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: space-between;\\n  align-items: flex-start;\\n  padding: 40px;\\n  color: white;\\n}\\n.footer .row .contact__link {\\n  color: white;\\n  text-decoration: none;\\n}\\n.footer .row .contact__icon {\\n  margin-right: 5px;\\n  width: 20px;\\n  height: 20px;\\n}\\n.footer .row .contact i {\\n  margin-right: 5px;\\n  font-size: 20px;\\n  color: #e74c3c;\\n}\\n.footer .row .form {\\n  padding: 40px;\\n}\\n.footer .row .form__item {\\n  width: 100%;\\n}\\n.footer .row .form input {\\n  display: block;\\n  border: none;\\n  margin-bottom: 8px;\\n  padding: 10px;\\n  width: 100%;\\n}\\n.footer .row .form input[type=submit] {\\n  background-color: #e74c3c;\\n  color: white;\\n  width: calc(100% + 20px);\\n}\\n.footer .copyright {\\n  display: flex;\\n  flex-direction: row;\\n  justify-content: space-between;\\n  align-items: center;\\n  padding: 10px 40px;\\n  color: white;\\n  font-size: 13px;\\n}\\n.footer .copyright img {\\n  height: 30px;\\n  width: auto;\\n}\\n@media (min-width: 320px) and (max-width: 640px) {\\n  .footer .row {\\n    flex-direction: column;\\n    justify-content: center;\\n  }\\n  .footer .row .contact,\\n.footer .row .form {\\n    padding: 10px;\\n  }\\n  .footer .row .contact__item {\\n    padding: 8px 0;\\n  }\\n  .footer .row .form input {\\n    padding: 10px;\\n    width: calc(100% - 20px);\\n  }\\n  .footer .row .form input[type=submit] {\\n    background-color: #e74c3c;\\n    color: white;\\n    width: 100%;\\n  }\\n  .footer .copyright {\\n    padding: 10px;\\n    justify-content: space-between;\\n  }\\n}\\n\\n.social {\\n  list-style: none;\\n  position: fixed;\\n  top: 200px;\\n  right: 10px;\\n}\\n@media (min-width: 320px) and (max-width: 640px) {\\n  .social {\\n    top: 140px;\\n    z-index: 1;\\n  }\\n}\\n.social__item {\\n  margin: 5px auto;\\n}\\n.social__link {\\n  display: block;\\n  text-align: center;\\n  padding: 2px;\\n}\\n.social__link:focus {\\n  width: 32px;\\n  height: 32px;\\n}\\n.social__link img {\\n  width: 32px;\\n  height: 32px;\\n}\\n\\n.map, .menu, .call {\\n  display: none;\\n  width: 100%;\\n  height: 100%;\\n  margin: auto;\\n  background-color: #373f48;\\n  text-align: center;\\n  position: fixed;\\n  top: 50%;\\n  left: 50%;\\n  transform: translate(-50%, -50%);\\n  z-index: 2;\\n}\\n.map iframe, .menu iframe, .call iframe {\\n  width: 80vw;\\n  height: 80vh;\\n  padding: 66px 44px;\\n}\\n.map .fa-times, .menu .fa-times, .call .fa-times {\\n  cursor: pointer;\\n  display: block;\\n  color: #e74c3c;\\n  font-size: 32px;\\n  position: absolute;\\n  padding: 18px;\\n  top: 0;\\n  right: 0;\\n}\\n.call {\\n  background-color: #373f48;\\n  width: 50%;\\n  height: auto;\\n}\\n.call .form {\\n  padding: 40px;\\n  z-index: 2;\\n}\\n.call .form__item {\\n  margin: 30px auto;\\n  width: 90%;\\n}\\n.call .form input,\\n.call .form textarea {\\n  display: block;\\n  border: none;\\n  margin-bottom: 20px;\\n  padding: 8px;\\n  width: 100%;\\n  font-size: 16px;\\n}\\n.call .form input[type=submit] {\\n  background-color: #e74c3c;\\n  color: white;\\n  width: calc(100% + 20px);\\n}\\n@media (min-width: 320px) and (max-width: 640px) {\\n  .call {\\n    width: 100%;\\n    height: auto;\\n  }\\n}\\n\\n.menu__item {\\n  margin-top: 60px;\\n}\\n@media (min-width: 320px) and (max-width: 640px) {\\n  .menu__item {\\n    margin-top: 22px;\\n  }\\n}\\n.menu__link {\\n  display: inline-block;\\n  text-decoration: none;\\n  text-transform: uppercase;\\n  color: white;\\n  font-size: 26px;\\n  padding: 20px;\\n}\\n.thank {\\n  visibility: visible;\\n  position: fixed;\\n  top: 20px;\\n  right: 10px;\\n  background-color: white;\\n  color: #373f48;\\n  border-radius: 6px;\\n  padding: 28px;\\n  width: 244px;\\n  height: auto;\\n  font-size: 18px;\\n}\\n\\n.dark-line {\\n  background: #373f48;\\n  width: 20%;\\n  height: 100vh;\\n  position: fixed;\\n  top: 0;\\n  right: 20%;\\n  z-index: -1;\\n}\\n\\n#hellopreloader p {\\n  display: none;\\n}\\n\\n#hellopreloader_preload {\\n  display: block;\\n  position: fixed;\\n  z-index: 99999;\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100%;\\n  min-width: 1000px;\\n  background: #e74c3c url(https://profy-shop.top/static/img/tail-spin.svg) center no-repeat;\\n  background-size: 144px;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/style/index.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style/reset.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style/reset.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"/* http://meyerweb.com/eric/tools/css/reset/\\n   v2.0-modified | 20110126\\n   License: none (public domain)\\n*/\\n\\nhtml, body, div, span, applet, object, iframe,\\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\\na, abbr, acronym, address, big, cite, code,\\ndel, dfn, em, img, ins, kbd, q, s, samp,\\nsmall, strike, strong, sub, sup, tt, var,\\nb, u, i, center,\\ndl, dt, dd, ol, ul, li,\\nfieldset, form, label, legend,\\ntable, caption, tbody, tfoot, thead, tr, th, td,\\narticle, aside, canvas, details, embed,\\nfigure, figcaption, footer, header, hgroup,\\nmenu, nav, output, ruby, section, summary,\\ntime, mark, audio, video {\\n  margin: 0;\\n\\tpadding: 0;\\n\\tborder: 0;\\n\\tfont-size: 100%;\\n\\tfont: inherit;\\n\\tvertical-align: baseline;\\n}\\n\\n/* make sure to set some focus styles for accessibility */\\n:focus {\\n    outline: 0;\\n}\\n\\n/* HTML5 display-role reset for older browsers */\\narticle, aside, details, figcaption, figure,\\nfooter, header, hgroup, menu, nav, section {\\n\\tdisplay: block;\\n}\\n\\nbody {\\n\\tline-height: 1;\\n}\\n\\nol, ul {\\n\\tlist-style: none;\\n}\\n\\nblockquote, q {\\n\\tquotes: none;\\n}\\n\\nblockquote:before, blockquote:after,\\nq:before, q:after {\\n\\tcontent: '';\\n\\tcontent: none;\\n}\\n\\ntable {\\n\\tborder-collapse: collapse;\\n\\tborder-spacing: 0;\\n}\\n\\ninput[type=search]::-webkit-search-cancel-button,\\ninput[type=search]::-webkit-search-decoration,\\ninput[type=search]::-webkit-search-results-button,\\ninput[type=search]::-webkit-search-results-decoration {\\n    -webkit-appearance: none;\\n    -moz-appearance: none;\\n}\\n\\ninput[type=search] {\\n    -webkit-appearance: none;\\n    -moz-appearance: none;\\n    -webkit-box-sizing: content-box;\\n    -moz-box-sizing: content-box;\\n    box-sizing: content-box;\\n}\\n\\ntextarea {\\n    overflow: auto;\\n    vertical-align: top;\\n    resize: vertical;\\n}\\n\\n/**\\n * Correct `inline-block` display not defined in IE 6/7/8/9 and Firefox 3.\\n */\\n\\naudio,\\ncanvas,\\nvideo {\\n    display: inline-block;\\n    *display: inline;\\n    *zoom: 1;\\n    max-width: 100%;\\n}\\n\\n/**\\n * Prevent modern browsers from displaying `audio` without controls.\\n * Remove excess height in iOS 5 devices.\\n */\\n\\naudio:not([controls]) {\\n    display: none;\\n    height: 0;\\n}\\n\\n/**\\n * Address styling not present in IE 7/8/9, Firefox 3, and Safari 4.\\n * Known issue: no IE 6 support.\\n */\\n\\n[hidden] {\\n    display: none;\\n}\\n\\n/**\\n * 1. Correct text resizing oddly in IE 6/7 when body `font-size` is set using\\n *    `em` units.\\n * 2. Prevent iOS text size adjust after orientation change, without disabling\\n *    user zoom.\\n */\\n\\nhtml {\\n    font-size: 100%; /* 1 */\\n    -webkit-text-size-adjust: 100%; /* 2 */\\n    -ms-text-size-adjust: 100%; /* 2 */\\n}\\n\\n/**\\n * Address `outline` inconsistency between Chrome and other browsers.\\n */\\n\\na:focus {\\n    outline: thin dotted;\\n}\\n\\n/**\\n * Improve readability when focused and also mouse hovered in all browsers.\\n */\\n\\na:active,\\na:hover {\\n    outline: 0;\\n}\\n\\n/**\\n * 1. Remove border when inside `a` element in IE 6/7/8/9 and Firefox 3.\\n * 2. Improve image quality when scaled in IE 7.\\n */\\n\\nimg {\\n    border: 0; /* 1 */\\n    -ms-interpolation-mode: bicubic; /* 2 */\\n}\\n\\n/**\\n * Address margin not present in IE 6/7/8/9, Safari 5, and Opera 11.\\n */\\n\\nfigure {\\n    margin: 0;\\n}\\n\\n/**\\n * Correct margin displayed oddly in IE 6/7.\\n */\\n\\nform {\\n    margin: 0;\\n}\\n\\n/**\\n * Define consistent border, margin, and padding.\\n */\\n\\nfieldset {\\n    border: 1px solid #c0c0c0;\\n    margin: 0 2px;\\n    padding: 0.35em 0.625em 0.75em;\\n}\\n\\n/**\\n * 1. Correct color not being inherited in IE 6/7/8/9.\\n * 2. Correct text not wrapping in Firefox 3.\\n * 3. Correct alignment displayed oddly in IE 6/7.\\n */\\n\\nlegend {\\n    border: 0; /* 1 */\\n    padding: 0;\\n    white-space: normal; /* 2 */\\n    *margin-left: -7px; /* 3 */\\n}\\n\\n/**\\n * 1. Correct font size not being inherited in all browsers.\\n * 2. Address margins set differently in IE 6/7, Firefox 3+, Safari 5,\\n *    and Chrome.\\n * 3. Improve appearance and consistency in all browsers.\\n */\\n\\nbutton,\\ninput,\\nselect,\\ntextarea {\\n    font-size: 100%; /* 1 */\\n    margin: 0; /* 2 */\\n    vertical-align: baseline; /* 3 */\\n    *vertical-align: middle; /* 3 */\\n}\\n\\n/**\\n * Address Firefox 3+ setting `line-height` on `input` using `!important` in\\n * the UA stylesheet.\\n */\\n\\nbutton,\\ninput {\\n    line-height: normal;\\n}\\n\\n/**\\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\\n * All other form control elements do not inherit `text-transform` values.\\n * Correct `button` style inheritance in Chrome, Safari 5+, and IE 6+.\\n * Correct `select` style inheritance in Firefox 4+ and Opera.\\n */\\n\\nbutton,\\nselect {\\n    text-transform: none;\\n}\\n\\n/**\\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\\n *    and `video` controls.\\n * 2. Correct inability to style clickable `input` types in iOS.\\n * 3. Improve usability and consistency of cursor style between image-type\\n *    `input` and others.\\n * 4. Remove inner spacing in IE 7 without affecting normal text inputs.\\n *    Known issue: inner spacing remains in IE 6.\\n */\\n\\nbutton,\\nhtml input[type=\\\"button\\\"], /* 1 */\\ninput[type=\\\"reset\\\"],\\ninput[type=\\\"submit\\\"] {\\n    -webkit-appearance: button; /* 2 */\\n    cursor: pointer; /* 3 */\\n    *overflow: visible;  /* 4 */\\n}\\n\\n/**\\n * Re-set default cursor for disabled elements.\\n */\\n\\nbutton[disabled],\\nhtml input[disabled] {\\n    cursor: default;\\n}\\n\\n/**\\n * 1. Address box sizing set to content-box in IE 8/9.\\n * 2. Remove excess padding in IE 8/9.\\n * 3. Remove excess padding in IE 7.\\n *    Known issue: excess padding remains in IE 6.\\n */\\n\\ninput[type=\\\"checkbox\\\"],\\ninput[type=\\\"radio\\\"] {\\n    box-sizing: border-box; /* 1 */\\n    padding: 0; /* 2 */\\n    *height: 13px; /* 3 */\\n    *width: 13px; /* 3 */\\n}\\n\\n/**\\n * 1. Address `appearance` set to `searchfield` in Safari 5 and Chrome.\\n * 2. Address `box-sizing` set to `border-box` in Safari 5 and Chrome\\n *    (include `-moz` to future-proof).\\n */\\n\\ninput[type=\\\"search\\\"] {\\n    -webkit-appearance: textfield; /* 1 */\\n    -moz-box-sizing: content-box;\\n    -webkit-box-sizing: content-box; /* 2 */\\n    box-sizing: content-box;\\n}\\n\\n/**\\n * Remove inner padding and search cancel button in Safari 5 and Chrome\\n * on OS X.\\n */\\n\\ninput[type=\\\"search\\\"]::-webkit-search-cancel-button,\\ninput[type=\\\"search\\\"]::-webkit-search-decoration {\\n    -webkit-appearance: none;\\n}\\n\\n/**\\n * Remove inner padding and border in Firefox 3+.\\n */\\n\\nbutton::-moz-focus-inner,\\ninput::-moz-focus-inner {\\n    border: 0;\\n    padding: 0;\\n}\\n\\n/**\\n * 1. Remove default vertical scrollbar in IE 6/7/8/9.\\n * 2. Improve readability and alignment in all browsers.\\n */\\n\\ntextarea {\\n    overflow: auto; /* 1 */\\n    vertical-align: top; /* 2 */\\n}\\n\\n/**\\n * Remove most spacing between table cells.\\n */\\n\\ntable {\\n    border-collapse: collapse;\\n    border-spacing: 0;\\n}\\n\\nhtml,\\nbutton,\\ninput,\\nselect,\\ntextarea {\\n    color: #222;\\n}\\n\\n\\n::-moz-selection {\\n    background: #b3d4fc;\\n    text-shadow: none;\\n}\\n\\n::selection {\\n    background: #b3d4fc;\\n    text-shadow: none;\\n}\\n\\nimg {\\n    vertical-align: middle;\\n}\\n\\nfieldset {\\n    border: 0;\\n    margin: 0;\\n    padding: 0;\\n}\\n\\ntextarea {\\n    resize: vertical;\\n}\\n\\n.chromeframe {\\n    margin: 0.2em 0;\\n    background: #ccc;\\n    color: #000;\\n    padding: 0.2em 0;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/style/reset.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/wow.js/dist/wow.js":
/*!*****************************************!*\
  !*** ./node_modules/wow.js/dist/wow.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (module, exports) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _class, _temp;\n\n  function _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n      throw new TypeError(\"Cannot call a class as a function\");\n    }\n  }\n\n  var _createClass = function () {\n    function defineProperties(target, props) {\n      for (var i = 0; i < props.length; i++) {\n        var descriptor = props[i];\n        descriptor.enumerable = descriptor.enumerable || false;\n        descriptor.configurable = true;\n        if (\"value\" in descriptor) descriptor.writable = true;\n        Object.defineProperty(target, descriptor.key, descriptor);\n      }\n    }\n\n    return function (Constructor, protoProps, staticProps) {\n      if (protoProps) defineProperties(Constructor.prototype, protoProps);\n      if (staticProps) defineProperties(Constructor, staticProps);\n      return Constructor;\n    };\n  }();\n\n  function isIn(needle, haystack) {\n    return haystack.indexOf(needle) >= 0;\n  }\n\n  function extend(custom, defaults) {\n    for (var key in defaults) {\n      if (custom[key] == null) {\n        var value = defaults[key];\n        custom[key] = value;\n      }\n    }\n    return custom;\n  }\n\n  function isMobile(agent) {\n    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent)\n    );\n  }\n\n  function createEvent(event) {\n    var bubble = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];\n    var cancel = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];\n    var detail = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];\n\n    var customEvent = void 0;\n    if (document.createEvent != null) {\n      // W3C DOM\n      customEvent = document.createEvent('CustomEvent');\n      customEvent.initCustomEvent(event, bubble, cancel, detail);\n    } else if (document.createEventObject != null) {\n      // IE DOM < 9\n      customEvent = document.createEventObject();\n      customEvent.eventType = event;\n    } else {\n      customEvent.eventName = event;\n    }\n\n    return customEvent;\n  }\n\n  function emitEvent(elem, event) {\n    if (elem.dispatchEvent != null) {\n      // W3C DOM\n      elem.dispatchEvent(event);\n    } else if (event in (elem != null)) {\n      elem[event]();\n    } else if ('on' + event in (elem != null)) {\n      elem['on' + event]();\n    }\n  }\n\n  function addEvent(elem, event, fn) {\n    if (elem.addEventListener != null) {\n      // W3C DOM\n      elem.addEventListener(event, fn, false);\n    } else if (elem.attachEvent != null) {\n      // IE DOM\n      elem.attachEvent('on' + event, fn);\n    } else {\n      // fallback\n      elem[event] = fn;\n    }\n  }\n\n  function removeEvent(elem, event, fn) {\n    if (elem.removeEventListener != null) {\n      // W3C DOM\n      elem.removeEventListener(event, fn, false);\n    } else if (elem.detachEvent != null) {\n      // IE DOM\n      elem.detachEvent('on' + event, fn);\n    } else {\n      // fallback\n      delete elem[event];\n    }\n  }\n\n  function getInnerHeight() {\n    if ('innerHeight' in window) {\n      return window.innerHeight;\n    }\n\n    return document.documentElement.clientHeight;\n  }\n\n  // Minimalistic WeakMap shim, just in case.\n  var WeakMap = window.WeakMap || window.MozWeakMap || function () {\n    function WeakMap() {\n      _classCallCheck(this, WeakMap);\n\n      this.keys = [];\n      this.values = [];\n    }\n\n    _createClass(WeakMap, [{\n      key: 'get',\n      value: function get(key) {\n        for (var i = 0; i < this.keys.length; i++) {\n          var item = this.keys[i];\n          if (item === key) {\n            return this.values[i];\n          }\n        }\n        return undefined;\n      }\n    }, {\n      key: 'set',\n      value: function set(key, value) {\n        for (var i = 0; i < this.keys.length; i++) {\n          var item = this.keys[i];\n          if (item === key) {\n            this.values[i] = value;\n            return this;\n          }\n        }\n        this.keys.push(key);\n        this.values.push(value);\n        return this;\n      }\n    }]);\n\n    return WeakMap;\n  }();\n\n  // Dummy MutationObserver, to avoid raising exceptions.\n  var MutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (_temp = _class = function () {\n    function MutationObserver() {\n      _classCallCheck(this, MutationObserver);\n\n      if (typeof console !== 'undefined' && console !== null) {\n        console.warn('MutationObserver is not supported by your browser.');\n        console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');\n      }\n    }\n\n    _createClass(MutationObserver, [{\n      key: 'observe',\n      value: function observe() {}\n    }]);\n\n    return MutationObserver;\n  }(), _class.notSupported = true, _temp);\n\n  // getComputedStyle shim, from http://stackoverflow.com/a/21797294\n  var getComputedStyle = window.getComputedStyle || function getComputedStyle(el) {\n    var getComputedStyleRX = /(\\-([a-z]){1})/g;\n    return {\n      getPropertyValue: function getPropertyValue(prop) {\n        if (prop === 'float') {\n          prop = 'styleFloat';\n        }\n        if (getComputedStyleRX.test(prop)) {\n          prop.replace(getComputedStyleRX, function (_, _char) {\n            return _char.toUpperCase();\n          });\n        }\n        var currentStyle = el.currentStyle;\n\n        return (currentStyle != null ? currentStyle[prop] : void 0) || null;\n      }\n    };\n  };\n\n  var WOW = function () {\n    function WOW() {\n      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];\n\n      _classCallCheck(this, WOW);\n\n      this.defaults = {\n        boxClass: 'wow',\n        animateClass: 'animated',\n        offset: 0,\n        mobile: true,\n        live: true,\n        callback: null,\n        scrollContainer: null\n      };\n\n      this.animate = function animateFactory() {\n        if ('requestAnimationFrame' in window) {\n          return function (callback) {\n            return window.requestAnimationFrame(callback);\n          };\n        }\n        return function (callback) {\n          return callback();\n        };\n      }();\n\n      this.vendors = ['moz', 'webkit'];\n\n      this.start = this.start.bind(this);\n      this.resetAnimation = this.resetAnimation.bind(this);\n      this.scrollHandler = this.scrollHandler.bind(this);\n      this.scrollCallback = this.scrollCallback.bind(this);\n      this.scrolled = true;\n      this.config = extend(options, this.defaults);\n      if (options.scrollContainer != null) {\n        this.config.scrollContainer = document.querySelector(options.scrollContainer);\n      }\n      // Map of elements to animation names:\n      this.animationNameCache = new WeakMap();\n      this.wowEvent = createEvent(this.config.boxClass);\n    }\n\n    _createClass(WOW, [{\n      key: 'init',\n      value: function init() {\n        this.element = window.document.documentElement;\n        if (isIn(document.readyState, ['interactive', 'complete'])) {\n          this.start();\n        } else {\n          addEvent(document, 'DOMContentLoaded', this.start);\n        }\n        this.finished = [];\n      }\n    }, {\n      key: 'start',\n      value: function start() {\n        var _this = this;\n\n        this.stopped = false;\n        this.boxes = [].slice.call(this.element.querySelectorAll('.' + this.config.boxClass));\n        this.all = this.boxes.slice(0);\n        if (this.boxes.length) {\n          if (this.disabled()) {\n            this.resetStyle();\n          } else {\n            for (var i = 0; i < this.boxes.length; i++) {\n              var box = this.boxes[i];\n              this.applyStyle(box, true);\n            }\n          }\n        }\n        if (!this.disabled()) {\n          addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);\n          addEvent(window, 'resize', this.scrollHandler);\n          this.interval = setInterval(this.scrollCallback, 50);\n        }\n        if (this.config.live) {\n          var mut = new MutationObserver(function (records) {\n            for (var j = 0; j < records.length; j++) {\n              var record = records[j];\n              for (var k = 0; k < record.addedNodes.length; k++) {\n                var node = record.addedNodes[k];\n                _this.doSync(node);\n              }\n            }\n            return undefined;\n          });\n          mut.observe(document.body, {\n            childList: true,\n            subtree: true\n          });\n        }\n      }\n    }, {\n      key: 'stop',\n      value: function stop() {\n        this.stopped = true;\n        removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);\n        removeEvent(window, 'resize', this.scrollHandler);\n        if (this.interval != null) {\n          clearInterval(this.interval);\n        }\n      }\n    }, {\n      key: 'sync',\n      value: function sync() {\n        if (MutationObserver.notSupported) {\n          this.doSync(this.element);\n        }\n      }\n    }, {\n      key: 'doSync',\n      value: function doSync(element) {\n        if (typeof element === 'undefined' || element === null) {\n          element = this.element;\n        }\n        if (element.nodeType !== 1) {\n          return;\n        }\n        element = element.parentNode || element;\n        var iterable = element.querySelectorAll('.' + this.config.boxClass);\n        for (var i = 0; i < iterable.length; i++) {\n          var box = iterable[i];\n          if (!isIn(box, this.all)) {\n            this.boxes.push(box);\n            this.all.push(box);\n            if (this.stopped || this.disabled()) {\n              this.resetStyle();\n            } else {\n              this.applyStyle(box, true);\n            }\n            this.scrolled = true;\n          }\n        }\n      }\n    }, {\n      key: 'show',\n      value: function show(box) {\n        this.applyStyle(box);\n        box.className = box.className + ' ' + this.config.animateClass;\n        if (this.config.callback != null) {\n          this.config.callback(box);\n        }\n        emitEvent(box, this.wowEvent);\n\n        addEvent(box, 'animationend', this.resetAnimation);\n        addEvent(box, 'oanimationend', this.resetAnimation);\n        addEvent(box, 'webkitAnimationEnd', this.resetAnimation);\n        addEvent(box, 'MSAnimationEnd', this.resetAnimation);\n\n        return box;\n      }\n    }, {\n      key: 'applyStyle',\n      value: function applyStyle(box, hidden) {\n        var _this2 = this;\n\n        var duration = box.getAttribute('data-wow-duration');\n        var delay = box.getAttribute('data-wow-delay');\n        var iteration = box.getAttribute('data-wow-iteration');\n\n        return this.animate(function () {\n          return _this2.customStyle(box, hidden, duration, delay, iteration);\n        });\n      }\n    }, {\n      key: 'resetStyle',\n      value: function resetStyle() {\n        for (var i = 0; i < this.boxes.length; i++) {\n          var box = this.boxes[i];\n          box.style.visibility = 'visible';\n        }\n        return undefined;\n      }\n    }, {\n      key: 'resetAnimation',\n      value: function resetAnimation(event) {\n        if (event.type.toLowerCase().indexOf('animationend') >= 0) {\n          var target = event.target || event.srcElement;\n          target.className = target.className.replace(this.config.animateClass, '').trim();\n        }\n      }\n    }, {\n      key: 'customStyle',\n      value: function customStyle(box, hidden, duration, delay, iteration) {\n        if (hidden) {\n          this.cacheAnimationName(box);\n        }\n        box.style.visibility = hidden ? 'hidden' : 'visible';\n\n        if (duration) {\n          this.vendorSet(box.style, { animationDuration: duration });\n        }\n        if (delay) {\n          this.vendorSet(box.style, { animationDelay: delay });\n        }\n        if (iteration) {\n          this.vendorSet(box.style, { animationIterationCount: iteration });\n        }\n        this.vendorSet(box.style, { animationName: hidden ? 'none' : this.cachedAnimationName(box) });\n\n        return box;\n      }\n    }, {\n      key: 'vendorSet',\n      value: function vendorSet(elem, properties) {\n        for (var name in properties) {\n          if (properties.hasOwnProperty(name)) {\n            var value = properties[name];\n            elem['' + name] = value;\n            for (var i = 0; i < this.vendors.length; i++) {\n              var vendor = this.vendors[i];\n              elem['' + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value;\n            }\n          }\n        }\n      }\n    }, {\n      key: 'vendorCSS',\n      value: function vendorCSS(elem, property) {\n        var style = getComputedStyle(elem);\n        var result = style.getPropertyCSSValue(property);\n        for (var i = 0; i < this.vendors.length; i++) {\n          var vendor = this.vendors[i];\n          result = result || style.getPropertyCSSValue('-' + vendor + '-' + property);\n        }\n        return result;\n      }\n    }, {\n      key: 'animationName',\n      value: function animationName(box) {\n        var aName = void 0;\n        try {\n          aName = this.vendorCSS(box, 'animation-name').cssText;\n        } catch (error) {\n          // Opera, fall back to plain property value\n          aName = getComputedStyle(box).getPropertyValue('animation-name');\n        }\n\n        if (aName === 'none') {\n          return ''; // SVG/Firefox, unable to get animation name?\n        }\n\n        return aName;\n      }\n    }, {\n      key: 'cacheAnimationName',\n      value: function cacheAnimationName(box) {\n        // https://bugzilla.mozilla.org/show_bug.cgi?id=921834\n        // box.dataset is not supported for SVG elements in Firefox\n        return this.animationNameCache.set(box, this.animationName(box));\n      }\n    }, {\n      key: 'cachedAnimationName',\n      value: function cachedAnimationName(box) {\n        return this.animationNameCache.get(box);\n      }\n    }, {\n      key: 'scrollHandler',\n      value: function scrollHandler() {\n        this.scrolled = true;\n      }\n    }, {\n      key: 'scrollCallback',\n      value: function scrollCallback() {\n        if (this.scrolled) {\n          this.scrolled = false;\n          var results = [];\n          for (var i = 0; i < this.boxes.length; i++) {\n            var box = this.boxes[i];\n            if (box) {\n              if (this.isVisible(box)) {\n                this.show(box);\n                continue;\n              }\n              results.push(box);\n            }\n          }\n          this.boxes = results;\n          if (!this.boxes.length && !this.config.live) {\n            this.stop();\n          }\n        }\n      }\n    }, {\n      key: 'offsetTop',\n      value: function offsetTop(element) {\n        // SVG elements don't have an offsetTop in Firefox.\n        // This will use their nearest parent that has an offsetTop.\n        // Also, using ('offsetTop' of element) causes an exception in Firefox.\n        while (element.offsetTop === undefined) {\n          element = element.parentNode;\n        }\n        var top = element.offsetTop;\n        while (element.offsetParent) {\n          element = element.offsetParent;\n          top += element.offsetTop;\n        }\n        return top;\n      }\n    }, {\n      key: 'isVisible',\n      value: function isVisible(box) {\n        var offset = box.getAttribute('data-wow-offset') || this.config.offset;\n        var viewTop = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset;\n        var viewBottom = viewTop + Math.min(this.element.clientHeight, getInnerHeight()) - offset;\n        var top = this.offsetTop(box);\n        var bottom = top + box.clientHeight;\n\n        return top <= viewBottom && bottom >= viewTop;\n      }\n    }, {\n      key: 'disabled',\n      value: function disabled() {\n        return !this.config.mobile && isMobile(navigator.userAgent);\n      }\n    }]);\n\n    return WOW;\n  }();\n\n  exports.default = WOW;\n  module.exports = exports['default'];\n});\n\n\n//# sourceURL=webpack:///./node_modules/wow.js/dist/wow.js?");

/***/ }),

/***/ "./src/img/clock.svg":
/*!***************************!*\
  !*** ./src/img/clock.svg ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/clock.svg\");\n\n//# sourceURL=webpack:///./src/img/clock.svg?");

/***/ }),

/***/ "./src/img/facebook.svg":
/*!******************************!*\
  !*** ./src/img/facebook.svg ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/facebook.svg\");\n\n//# sourceURL=webpack:///./src/img/facebook.svg?");

/***/ }),

/***/ "./src/img/favicon-32x32.png":
/*!***********************************!*\
  !*** ./src/img/favicon-32x32.png ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/favicon-32x32.png\");\n\n//# sourceURL=webpack:///./src/img/favicon-32x32.png?");

/***/ }),

/***/ "./src/img/google-maps.svg":
/*!*********************************!*\
  !*** ./src/img/google-maps.svg ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/google-maps.svg\");\n\n//# sourceURL=webpack:///./src/img/google-maps.svg?");

/***/ }),

/***/ "./src/img/instagram.svg":
/*!*******************************!*\
  !*** ./src/img/instagram.svg ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/instagram.svg\");\n\n//# sourceURL=webpack:///./src/img/instagram.svg?");

/***/ }),

/***/ "./src/img/mail.svg":
/*!**************************!*\
  !*** ./src/img/mail.svg ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/mail.svg\");\n\n//# sourceURL=webpack:///./src/img/mail.svg?");

/***/ }),

/***/ "./src/img/map.svg":
/*!*************************!*\
  !*** ./src/img/map.svg ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/map.svg\");\n\n//# sourceURL=webpack:///./src/img/map.svg?");

/***/ }),

/***/ "./src/img/menu.svg":
/*!**************************!*\
  !*** ./src/img/menu.svg ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/menu.svg\");\n\n//# sourceURL=webpack:///./src/img/menu.svg?");

/***/ }),

/***/ "./src/img/smartphone.svg":
/*!********************************!*\
  !*** ./src/img/smartphone.svg ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/smartphone.svg\");\n\n//# sourceURL=webpack:///./src/img/smartphone.svg?");

/***/ }),

/***/ "./src/img/tail-spin.svg":
/*!*******************************!*\
  !*** ./src/img/tail-spin.svg ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/tail-spin.svg\");\n\n//# sourceURL=webpack:///./src/img/tail-spin.svg?");

/***/ }),

/***/ "./src/img/telephone.svg":
/*!*******************************!*\
  !*** ./src/img/telephone.svg ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/telephone.svg\");\n\n//# sourceURL=webpack:///./src/img/telephone.svg?");

/***/ }),

/***/ "./src/js/config/LocalData.js":
/*!************************************!*\
  !*** ./src/js/config/LocalData.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst localData = {\n  telephone: '+38(096)312-82-03',\n  email: 'profy.shop.top@gmail.com',\n  address: 'г. Николаев, ул. Космонавтов 124Б',\n  schedule: 'ПН-ПТ: 10.00 - 17.00',\n  instagram: 'https://www.instagram.com/profyshop_top/',\n  facebook: 'https://www.facebook.com/profyshoptop',\n  map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1619.1897115256013!2d32.067177559436224!3d46.95890688298181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c5caff9cb8a3c5%3A0xd114e4e38546ffcc!2z0YPQuy4g0JrQvtGB0LzQvtC90LDQstGC0L7QsiwgMTI00JAsINCd0LjQutC-0LvQsNC10LIsINCd0LjQutC-0LvQsNC10LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgNTQwMDA!5e0!3m2!1sru!2sua!4v1594713259040!5m2!1sru!2sua'\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (localData);\n\n//# sourceURL=webpack:///./src/js/config/LocalData.js?");

/***/ }),

/***/ "./src/js/config/config.js":
/*!*********************************!*\
  !*** ./src/js/config/config.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// const url = 'http://localhost:8000/api'\nconst url = 'https://profy-shop.top/api'\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (url);\n\n//# sourceURL=webpack:///./src/js/config/config.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/index.scss */ \"./src/style/index.scss\");\n/* harmony import */ var _style_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_index_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _img_menu_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/menu.svg */ \"./src/img/menu.svg\");\n/* harmony import */ var _img_favicon_32x32_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../img/favicon-32x32.png */ \"./src/img/favicon-32x32.png\");\n/* harmony import */ var _img_facebook_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../img/facebook.svg */ \"./src/img/facebook.svg\");\n/* harmony import */ var _img_instagram_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../img/instagram.svg */ \"./src/img/instagram.svg\");\n/* harmony import */ var _img_google_maps_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../img/google-maps.svg */ \"./src/img/google-maps.svg\");\n/* harmony import */ var _img_telephone_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../img/telephone.svg */ \"./src/img/telephone.svg\");\n/* harmony import */ var _img_tail_spin_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../img/tail-spin.svg */ \"./src/img/tail-spin.svg\");\n/* harmony import */ var _img_clock_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../img/clock.svg */ \"./src/img/clock.svg\");\n/* harmony import */ var _img_map_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../img/map.svg */ \"./src/img/map.svg\");\n/* harmony import */ var _img_mail_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../img/mail.svg */ \"./src/img/mail.svg\");\n/* harmony import */ var _img_smartphone_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../img/smartphone.svg */ \"./src/img/smartphone.svg\");\n/* harmony import */ var _plugins_wow__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./plugins/wow */ \"./src/js/plugins/wow.js\");\n/* harmony import */ var _services_Api__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/Api */ \"./src/js/services/Api.js\");\n/* harmony import */ var _views_categories__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./views/categories */ \"./src/js/views/categories.js\");\n/* harmony import */ var _views_click__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./views/click */ \"./src/js/views/click.js\");\n/* harmony import */ var _config_LocalData__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./config/LocalData */ \"./src/js/config/LocalData.js\");\n/* harmony import */ var _views_form__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./views/form */ \"./src/js/views/form.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// import \"../img/close.svg\"\n\n// import \"../img/1.jpeg\"\n// import \"../img/2.jpeg\"\n// import \"../img/3.jpeg\"\n// import \"../img/4.jpeg\"\n// import \"../img/5.jpeg\"\n// import \"../img/6.jpeg\"\n\n\n\n\n\n\n\n\n\nconst formFooter = document.forms.form_footer;\nconst formSicial = document.forms.form_social;\nconst mian = document.querySelector('.main')\nconst social = document.querySelector('.social')\n\nconst hellopreloader = document.getElementById(\"hellopreloader_preload\");\n\nwindow.onload = function () {\n\n  // Render for Categories\n  _services_Api__WEBPACK_IMPORTED_MODULE_13__[\"default\"].getCategories().then((response) => {\n    Object(_views_categories__WEBPACK_IMPORTED_MODULE_14__[\"default\"])(response.data, mian)\n    if (response.status === 200) {\n      console.log(`Get categories status = ${response.status}`);\n      hellopreloader.style.display = \"none\";\n    }\n  })\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  // CLICK ON SOCIAL\n  social.addEventListener('click', getEventOnIcon)\n\n  function getEventOnIcon(event) {\n    const parent = event.target.parentNode;\n    if (parent.getAttribute('id') == \"menu\") {\n      event.preventDefault()\n      Object(_views_click__WEBPACK_IMPORTED_MODULE_15__[\"default\"])('.menu')\n    } else if (parent.getAttribute('id') == \"map\") {\n      event.preventDefault()\n      Object(_views_click__WEBPACK_IMPORTED_MODULE_15__[\"default\"])('.map')\n\n    } else if (parent.getAttribute('id') == \"telephone\") {\n      event.preventDefault()\n      Object(_views_click__WEBPACK_IMPORTED_MODULE_15__[\"default\"])('.call')\n    }\n  }\n\n  // Render for localData\n  const telephone = document.getElementById('footer-telephone')\n  const email = document.getElementById('footer-email')\n  const address = document.getElementById('footer-address')\n  const schedule = document.getElementById('footer-schedule')\n  const instagram = document.getElementById('instagram')\n  const facebook = document.getElementById('facebook')\n  const map = document.getElementById('social-map')\n\n  telephone.textContent = _config_LocalData__WEBPACK_IMPORTED_MODULE_16__[\"default\"].telephone\n  telephone.setAttribute('href', `tel:${_config_LocalData__WEBPACK_IMPORTED_MODULE_16__[\"default\"].telephone}`)\n  email.setAttribute('href', `mailto:${_config_LocalData__WEBPACK_IMPORTED_MODULE_16__[\"default\"].email}`)\n  email.textContent = _config_LocalData__WEBPACK_IMPORTED_MODULE_16__[\"default\"].email\n  address.textContent = _config_LocalData__WEBPACK_IMPORTED_MODULE_16__[\"default\"].address\n  schedule.textContent = _config_LocalData__WEBPACK_IMPORTED_MODULE_16__[\"default\"].schedule\n  instagram.setAttribute('href', _config_LocalData__WEBPACK_IMPORTED_MODULE_16__[\"default\"].instagram)\n  facebook.setAttribute('href', _config_LocalData__WEBPACK_IMPORTED_MODULE_16__[\"default\"].facebook)\n  map.setAttribute('src', _config_LocalData__WEBPACK_IMPORTED_MODULE_16__[\"default\"].map)\n\n\n  // SEND CALL FORM\n  formSicial.addEventListener(\"submit\", getValueOnCall)\n  formFooter.addEventListener(\"submit\", getValueOnCall)\n\n  function getValueOnCall(e) {\n    e.preventDefault();\n    e.stopPropagation();\n    const parent = e.target.parentNode;\n    const objectCall = Object(_views_form__WEBPACK_IMPORTED_MODULE_17__[\"validationForm\"])(e);\n    if (objectCall) {\n      Object(_views_form__WEBPACK_IMPORTED_MODULE_17__[\"sendCallForm\"])(objectCall)\n      if (parent.classList.contains('call')) {\n        parent.style.display = 'none'\n      }\n    }\n  }\n\n  // block social jumping\n  window.addEventListener('scroll', function () {\n    if (window.innerWidth > 640) {\n\n      if (document.documentElement.scrollTop > 200) {\n        social.style.top = '5px'\n      }\n      if (document.documentElement.scrollTop < 200) {\n        social.style.top = '200px'\n      }\n    }\n    if (window.innerWidth < 640) {\n      if (document.documentElement.scrollTop > 140) {\n        social.style.top = '5px'\n      }\n      if (document.documentElement.scrollTop < 200) {\n        social.style.top = '140px'\n      }\n    }\n  });\n\n  _plugins_wow__WEBPACK_IMPORTED_MODULE_12__[\"default\"].init();\n  console.log(\"test web pack\");\n})\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/plugins/wow.js":
/*!*******************************!*\
  !*** ./src/js/plugins/wow.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wow.js */ \"./node_modules/wow.js/dist/wow.js\");\n/* harmony import */ var wow_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(wow_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst wow = new wow_js__WEBPACK_IMPORTED_MODULE_0___default.a({\n  boxClass: 'wow', // animated element css class (default is wow)\n  animateClass: 'animated', // animation css class (default is animated)\n  offset: 0, // distance to the element when triggering the animation (default is 0)\n  mobile: true, // trigger animations on mobile devices (default is true)\n  live: true, // act on asynchronously loaded content (default is true)\n  callback: function (box) {\n    // the callback is fired every time an animation is started\n    // the argument that is passed in is the DOM node being animated\n  },\n  scrollContainer: null, // optional scroll container selector, otherwise use window,\n  resetAnimation: true, // reset animation on end (default is true)\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (wow);\n\n//# sourceURL=webpack:///./src/js/plugins/wow.js?");

/***/ }),

/***/ "./src/js/services/Api.js":
/*!********************************!*\
  !*** ./src/js/services/Api.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/config */ \"./src/js/config/config.js\");\n\n\n\n// api/categories/\n// api/{pk=1} - {pk=1} category id\n// api/post/\n\nconst headers = {\n  \"Content-type\": \"application/json; charset=UTF-8\"\n};\n\nconst pk = '1'\n\nclass Api {\n  constructor(url, headers) {\n    this.url = url,\n      this.headers = headers\n  }\n\n  async getCategories() {\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${this.url}/categories/`)\n      return response\n    } catch (error) {\n      console.log(error);\n      return Promise.reject(error)\n    }\n  }\n  async postCall(data) {\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${this.url}/post/`, data, this.headers)\n      return response\n    } catch (error) {\n      console.log(error);\n      return Promise.reject(error)\n    }\n  }\n  async getOneCategory(pk) {\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${this.url}/${pk}/`)\n      return response\n    } catch (error) {\n      console.log(error);\n      return Promise.reject(error)\n    }\n  }\n\n}\nconst api = new Api(_config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"], headers);\n/* harmony default export */ __webpack_exports__[\"default\"] = (api);\n\n\n// api.getOneCategory(1).then((response) => {\n//   console.log(response.status);\n//   console.log(response.data);\n// })\n\n//# sourceURL=webpack:///./src/js/services/Api.js?");

/***/ }),

/***/ "./src/js/views/categories.js":
/*!************************************!*\
  !*** ./src/js/views/categories.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction getData(list, main) {\n  // Принимает массив response.data и css selector\n  const fragment = document.createDocumentFragment();\n\n  list.forEach(object => {\n    fragment.appendChild(createArticle(object));\n  });\n\n  main.appendChild(fragment);\n}\n\nfunction createArticle(object) {\n  const article = document.createElement(\"article\");\n  article.classList.add(\"article\", \"wow\", \"scale-in-ver-bottom\")\n  article.setAttribute(\"id\", object.id)\n  article.setAttribute(\"data-wow-offset\", \"222\")\n  article.insertAdjacentHTML(\"afterbegin\",\n    `\n  <div class=\"article__img\">\n      <img src=\"${object.img}\" alt=\"${object.title}\" class=\"img\" />\n    </div>\n    <div class=\"article__content\">\n     <!-- <a href=\"\" class=\"article__link\"> -->\n        <h2 class=\"article__title h2\">\n          ${object.title}\n        </h2>\n      <!-- </a> -->\n      <p class=\"article__text\">${object.description}</p>\n    </div>\n    `)\n  return article;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (getData);\n\n//# sourceURL=webpack:///./src/js/views/categories.js?");

/***/ }),

/***/ "./src/js/views/click.js":
/*!*******************************!*\
  !*** ./src/js/views/click.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction showHideModal(cls) {\n  const element = document.querySelector(cls)\n  const clos = element.querySelector('.close-icon')\n\n  function closeWindow() {\n    element.classList.remove('zoomIn')\n    element.style.display = 'none';\n  }\n\n  element.classList.add('zoomIn')\n  element.style.display = 'block'\n  clos.addEventListener('click', function () {\n    closeWindow()\n  })\n\n  document.addEventListener('keydown', function (event) {\n    if (event.code == 'Escape' || event.keyCode == 27) {\n      closeWindow()\n    }\n  });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (showHideModal);\n\n//# sourceURL=webpack:///./src/js/views/click.js?");

/***/ }),

/***/ "./src/js/views/form.js":
/*!******************************!*\
  !*** ./src/js/views/form.js ***!
  \******************************/
/*! exports provided: validationForm, sendCallForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validationForm\", function() { return validationForm; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sendCallForm\", function() { return sendCallForm; });\n/* harmony import */ var _services_Api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/Api */ \"./src/js/services/Api.js\");\n\n\n\nfunction sendCallForm(object) {\n  _services_Api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].postCall(object).then((response) => {\n    if (response.status === 201) {\n      const div = document.createElement('div')\n      div.classList.add(\"thank\", \"slideInRight\")\n      div.insertAdjacentHTML(\"afterbegin\",\n        `<p style=\"color: #e74c3c;\">${object.name}</p>\n      <p>спасибо за Ваше обращение, мы обязательно с Вами свяжемся в течении </p>\n      <p style=\"color: #e74c3c;\">10 минут</p>\n      `)\n      document.body.appendChild(div)\n      setTimeout(function () {\n        div.remove()\n      }, 4000);\n    }\n  });\n}\n\nfunction errorInput(field) {\n  field.classList.add('shake')\n  setTimeout(function () {\n    field.classList.remove('shake')\n  }, 1000);\n}\n\nfunction clearFields(e) {\n  e.target[0].value = ''\n  e.target[1].value = ''\n  e.target[2].value = ''\n}\n\nfunction validationForm(e) {\n  const name = e.target[0].value\n  const telephone = e.target[1].value\n  let comment = e.target[2].value\n\n  if (!name && !telephone) {\n    errorInput(e.target)\n  } else if (!name) {\n    errorInput(e.target[0])\n  } else if (!telephone) {\n    errorInput(e.target[1])\n  } else {\n    if (!comment) {\n      comment = 'Пустой коментарий'\n      const object = {\n        name,\n        telephone,\n        comment\n      }\n      clearFields(e)\n      // console.log(object);\n      return object\n    } else {\n      const object = {\n        name,\n        telephone,\n        comment\n      }\n      clearFields(e)\n      // console.log(object);\n      return object\n    }\n  }\n}\n\n\n\n// // /^(\\+{0,})(\\d{0,})([(]{1}\\d{1,3}[)]{0,}){0,}(\\s?\\d+|\\+\\d{2,3}\\s{1}\\d+|\\d+){1}[\\s|-]?\\d+([\\s|-]?\\d+){1,2}(\\s){0,}$/\n\n//# sourceURL=webpack:///./src/js/views/form.js?");

/***/ }),

/***/ "./src/style/index.scss":
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./index.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/index.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/style/index.scss?");

/***/ })

/******/ });