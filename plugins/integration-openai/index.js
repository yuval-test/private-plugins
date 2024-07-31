/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 466:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dependencies = exports.envVariables = void 0;
exports.envVariables = [
    { OPENAI_API_KEY: "[open-ai-key]" },
];
exports.dependencies = {
    dependencies: {
        openai: "^4.24.7",
    },
};


/***/ }),

/***/ 928:
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const path_1 = __webpack_require__(928);
const constants_1 = __webpack_require__(466);
class IntegrationOpenaiPlugin {
    register() {
        return {
            CreateServer: {
                after: this.afterCreateServer,
            },
            CreateServerPackageJson: {
                before: this.beforeCreateServerPackageJson,
            },
            CreateServerDotEnv: {
                before: this.beforeCreateServerDotEnv,
            },
        };
    }
    //adds the openai dependency to the package.json file
    beforeCreateServerPackageJson(context, eventParams) {
        eventParams.updateProperties.push(constants_1.dependencies);
        return eventParams;
    }
    //adds the openai api key to the .env file
    beforeCreateServerDotEnv(context, eventParams) {
        eventParams.envVariables = [...eventParams.envVariables, ...constants_1.envVariables];
        return eventParams;
    }
    //adds the openai module and service to the "providers" folder
    async afterCreateServer(context, eventParams, modules) {
        const staticPath = (0, path_1.resolve)(__dirname, "./static");
        const staticsFiles = await context.utils.importStaticModules(staticPath, context.serverDirectories.srcDirectory);
        await modules.merge(staticsFiles);
        return modules;
    }
}
exports["default"] = IntegrationOpenaiPlugin;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=main.js.map