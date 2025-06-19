"use strict";
(() => {
var exports = {};
exports.id = "app/api/leads/route";
exports.ids = ["app/api/leads/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fleads%2Froute&page=%2Fapi%2Fleads%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fleads%2Froute.ts&appDir=%2Fhome%2Fubuntu%2Ftax-deed-crm-enterprise%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Ftax-deed-crm-enterprise%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fleads%2Froute&page=%2Fapi%2Fleads%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fleads%2Froute.ts&appDir=%2Fhome%2Fubuntu%2Ftax-deed-crm-enterprise%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Ftax-deed-crm-enterprise%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   patchFetch: () => (/* binding */ patchFetch),
/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   serverHooks: () => (/* binding */ serverHooks),
/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js");
/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-kind.js");
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/lib/patch-fetch.js");
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _home_ubuntu_tax_deed_crm_enterprise_app_app_api_leads_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/leads/route.ts */ "(rsc)/./app/api/leads/route.ts");




// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,
        page: "/api/leads/route",
        pathname: "/api/leads",
        filename: "route",
        bundlePath: "app/api/leads/route"
    },
    resolvedPagePath: "/home/ubuntu/tax-deed-crm-enterprise/app/app/api/leads/route.ts",
    nextConfigOutput,
    userland: _home_ubuntu_tax_deed_crm_enterprise_app_app_api_leads_route_ts__WEBPACK_IMPORTED_MODULE_3__
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;
const originalPathname = "/api/leads/route";
function patchFetch() {
    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({
        serverHooks,
        staticGenerationAsyncStorage
    });
}


//# sourceMappingURL=app-route.js.map

/***/ }),

/***/ "(rsc)/./app/api/leads/route.ts":
/*!********************************!*\
  !*** ./app/api/leads/route.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   dynamic: () => (/* binding */ dynamic)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/server.js");
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ "(rsc)/./lib/db.ts");
const dynamic = "force-dynamic";


async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get("limit");
        const sort = searchParams.get("sort");
        const status = searchParams.get("status");
        const search = searchParams.get("search");
        const page = parseInt(searchParams.get("page") || "1");
        const pageSize = parseInt(searchParams.get("pageSize") || "10");
        // Build where clause
        const where = {};
        if (status && status !== "all") {
            where.status = status;
        }
        if (search) {
            where.OR = [
                {
                    ownerName: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    propertyAddress: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    county: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    ownerEmail: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    ownerPhone: {
                        contains: search,
                        mode: "insensitive"
                    }
                }
            ];
        }
        // Build order by clause
        let orderBy = {
            createdAt: "desc"
        };
        if (sort === "recent") {
            orderBy = {
                createdAt: "desc"
            };
        } else if (sort === "name") {
            orderBy = {
                ownerName: "asc"
            };
        } else if (sort === "status") {
            orderBy = {
                status: "asc"
            };
        }
        // Get total count for pagination
        const totalCount = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.lead.count({
            where
        });
        // Get leads with pagination
        const leads = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.lead.findMany({
            where,
            orderBy,
            skip: limit ? 0 : (page - 1) * pageSize,
            take: limit ? parseInt(limit) : pageSize,
            select: {
                id: true,
                ownerName: true,
                propertyAddress: true,
                propertyCity: true,
                propertyState: true,
                propertyZip: true,
                county: true,
                status: true,
                taxesOwed: true,
                ownerPhone: true,
                ownerEmail: true,
                createdAt: true,
                updatedAt: true,
                priority: true,
                contactAttempts: true,
                lastContactDate: true,
                nextFollowUpDate: true,
                assessedValue: true,
                marketValue: true,
                yearsDelinquent: true
            }
        });
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            leads,
            pagination: {
                page,
                pageSize,
                totalCount,
                totalPages: Math.ceil(totalCount / pageSize)
            }
        });
    } catch (error) {
        console.error("Error fetching leads:", error);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: "Failed to fetch leads"
        }, {
            status: 500
        });
    }
}


/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   prisma: () => (/* binding */ prisma)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
if (true) globalForPrisma.prisma = prisma;


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fleads%2Froute&page=%2Fapi%2Fleads%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fleads%2Froute.ts&appDir=%2Fhome%2Fubuntu%2Ftax-deed-crm-enterprise%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Ftax-deed-crm-enterprise%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();