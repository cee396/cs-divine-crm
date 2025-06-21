"use strict";
exports.id = "vendor-chunks/@radix-ui";
exports.ids = ["vendor-chunks/@radix-ui"];
exports.modules = {

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/primitive/dist/index.mjs":
/*!***********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/primitive/dist/index.mjs ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   composeEventHandlers: () => (/* binding */ composeEventHandlers)
/* harmony export */ });
// packages/core/primitive/src/primitive.tsx
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-collection/dist/index.mjs":
/*!******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-collection/dist/index.mjs ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCollection: () => (/* binding */ createCollection)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-context */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-context/dist/index.mjs");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-slot */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-slot/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
/* __next_internal_client_entry_do_not_use__ createCollection auto */ // packages/react/collection/src/Collection.tsx





function createCollection(name) {
    const PROVIDER_NAME = name + "CollectionProvider";
    const [createCollectionContext, createCollectionScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__.createContextScope)(PROVIDER_NAME);
    const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
        collectionRef: {
            current: null
        },
        itemMap: /* @__PURE__ */ new Map()
    });
    const CollectionProvider = (props)=>{
        const { scope, children } = props;
        const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
        const itemMap = react__WEBPACK_IMPORTED_MODULE_0__.useRef(/* @__PURE__ */ new Map()).current;
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionProviderImpl, {
            scope,
            itemMap,
            collectionRef: ref,
            children
        });
    };
    CollectionProvider.displayName = PROVIDER_NAME;
    const COLLECTION_SLOT_NAME = name + "CollectionSlot";
    const CollectionSlot = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
        const { scope, children } = props;
        const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
        const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__.useComposedRefs)(forwardedRef, context.collectionRef);
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_4__.Slot, {
            ref: composedRefs,
            children
        });
    });
    CollectionSlot.displayName = COLLECTION_SLOT_NAME;
    const ITEM_SLOT_NAME = name + "CollectionItemSlot";
    const ITEM_DATA_ATTR = "data-radix-collection-item";
    const CollectionItemSlot = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
        const { scope, children, ...itemData } = props;
        const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
        const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__.useComposedRefs)(forwardedRef, ref);
        const context = useCollectionContext(ITEM_SLOT_NAME, scope);
        react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
            context.itemMap.set(ref, {
                ref,
                ...itemData
            });
            return ()=>void context.itemMap.delete(ref);
        });
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_4__.Slot, {
            ...{
                [ITEM_DATA_ATTR]: ""
            },
            ref: composedRefs,
            children
        });
    });
    CollectionItemSlot.displayName = ITEM_SLOT_NAME;
    function useCollection(scope) {
        const context = useCollectionContext(name + "CollectionConsumer", scope);
        const getItems = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>{
            const collectionNode = context.collectionRef.current;
            if (!collectionNode) return [];
            const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
            const items = Array.from(context.itemMap.values());
            const orderedItems = items.sort((a, b)=>orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current));
            return orderedItems;
        }, [
            context.collectionRef,
            context.itemMap
        ]);
        return getItems;
    }
    return [
        {
            Provider: CollectionProvider,
            Slot: CollectionSlot,
            ItemSlot: CollectionItemSlot
        },
        useCollection,
        createCollectionScope
    ];
}
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs":
/*!********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   composeRefs: () => (/* binding */ composeRefs),
/* harmony export */   useComposedRefs: () => (/* binding */ useComposedRefs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
// packages/react/compose-refs/src/composeRefs.tsx

function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}
function useComposedRefs(...refs) {
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(composeRefs(...refs), refs);
}

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-context/dist/index.mjs":
/*!***************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-context/dist/index.mjs ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createContext: () => (/* binding */ createContext2),
/* harmony export */   createContextScope: () => (/* binding */ createContextScope)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
// packages/react/context/src/createContext.tsx


function createContext2(rootComponentName, defaultContext) {
  const Context = react__WEBPACK_IMPORTED_MODULE_0__.createContext(defaultContext);
  function Provider(props) {
    const { children, ...context } = props;
    const value = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => context, Object.values(context));
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Context.Provider, { value, children });
  }
  function useContext2(consumerName) {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(Context);
    if (context) return context;
    if (defaultContext !== void 0) return defaultContext;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }
  Provider.displayName = rootComponentName + "Provider";
  return [Provider, useContext2];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    function Provider(props) {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName][index] || BaseContext;
      const value = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Context.Provider, { value, children });
    }
    function useContext2(consumerName, scope) {
      const Context = scope?.[scopeName][index] || BaseContext;
      const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    Provider.displayName = rootComponentName + "Provider";
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return react__WEBPACK_IMPORTED_MODULE_0__.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-dialog/dist/index.mjs":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-dialog/dist/index.mjs ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Close: () => (/* binding */ Close),
/* harmony export */   Content: () => (/* binding */ Content),
/* harmony export */   Description: () => (/* binding */ Description),
/* harmony export */   Dialog: () => (/* binding */ Dialog),
/* harmony export */   DialogClose: () => (/* binding */ DialogClose),
/* harmony export */   DialogContent: () => (/* binding */ DialogContent),
/* harmony export */   DialogDescription: () => (/* binding */ DialogDescription),
/* harmony export */   DialogOverlay: () => (/* binding */ DialogOverlay),
/* harmony export */   DialogPortal: () => (/* binding */ DialogPortal),
/* harmony export */   DialogTitle: () => (/* binding */ DialogTitle),
/* harmony export */   DialogTrigger: () => (/* binding */ DialogTrigger),
/* harmony export */   Overlay: () => (/* binding */ Overlay),
/* harmony export */   Portal: () => (/* binding */ Portal),
/* harmony export */   Root: () => (/* binding */ Root),
/* harmony export */   Title: () => (/* binding */ Title),
/* harmony export */   Trigger: () => (/* binding */ Trigger),
/* harmony export */   WarningProvider: () => (/* binding */ WarningProvider),
/* harmony export */   createDialogScope: () => (/* binding */ createDialogScope)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @radix-ui/primitive */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-context */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-context/dist/index.mjs");
/* harmony import */ var _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-id */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-id/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-use-controllable-state */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs");
/* harmony import */ var _radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @radix-ui/react-dismissable-layer */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs");
/* harmony import */ var _radix_ui_react_focus_scope__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @radix-ui/react-focus-scope */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-focus-scope/dist/index.mjs");
/* harmony import */ var _radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @radix-ui/react-portal */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-portal/dist/index.mjs");
/* harmony import */ var _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @radix-ui/react-presence */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-presence/dist/index.mjs");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_focus_guards__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @radix-ui/react-focus-guards */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-focus-guards/dist/index.mjs");
/* harmony import */ var react_remove_scroll__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-remove-scroll */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/react-remove-scroll/dist/es2015/Combination.js");
/* harmony import */ var aria_hidden__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! aria-hidden */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/aria-hidden/dist/es2015/index.js");
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @radix-ui/react-slot */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-slot/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
/* __next_internal_client_entry_do_not_use__ Close,Content,Description,Dialog,DialogClose,DialogContent,DialogDescription,DialogOverlay,DialogPortal,DialogTitle,DialogTrigger,Overlay,Portal,Root,Title,Trigger,WarningProvider,createDialogScope auto */ // packages/react/dialog/src/Dialog.tsx
















var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__.createContextScope)(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog = (props)=>{
    const { __scopeDialog, children, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
    const triggerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const contentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const [open = false, setOpen] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_3__.useControllableState)({
        prop: openProp,
        defaultProp: defaultOpen,
        onChange: onOpenChange
    });
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogProvider, {
        scope: __scopeDialog,
        triggerRef,
        contentRef,
        contentId: (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__.useId)(),
        titleId: (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__.useId)(),
        descriptionId: (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__.useId)(),
        open,
        onOpenChange: setOpen,
        onOpenToggle: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>setOpen((prevOpen)=>!prevOpen), [
            setOpen
        ]),
        modal,
        children
    });
};
Dialog.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.useComposedRefs)(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_6__.Primitive.button, {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.composeEventHandlers)(props.onClick, context.onOpenToggle)
    });
});
DialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
    forceMount: void 0
});
var DialogPortal = (props)=>{
    const { __scopeDialog, forceMount, children, container } = props;
    const context = useDialogContext(PORTAL_NAME, __scopeDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PortalProvider, {
        scope: __scopeDialog,
        forceMount,
        children: react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children, (child)=>/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_8__.Presence, {
                present: forceMount || context.open,
                children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_9__.Portal, {
                    asChild: true,
                    container,
                    children: child
                })
            }))
    });
};
DialogPortal.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_8__.Presence, {
        present: forceMount || context.open,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogOverlayImpl, {
            ...overlayProps,
            ref: forwardedRef
        })
    }) : null;
});
DialogOverlay.displayName = OVERLAY_NAME;
var DialogOverlayImpl = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return(// Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
    // ie. when `Overlay` and `Content` are siblings
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_remove_scroll__WEBPACK_IMPORTED_MODULE_10__["default"], {
        as: _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_11__.Slot,
        allowPinchZoom: true,
        shards: [
            context.contentRef
        ],
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_6__.Primitive.div, {
            "data-state": getState(context.open),
            ...overlayProps,
            ref: forwardedRef,
            style: {
                pointerEvents: "auto",
                ...overlayProps.style
            }
        })
    }));
});
var CONTENT_NAME = "DialogContent";
var DialogContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_8__.Presence, {
        present: forceMount || context.open,
        children: context.modal ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogContentModal, {
            ...contentProps,
            ref: forwardedRef
        }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogContentNonModal, {
            ...contentProps,
            ref: forwardedRef
        })
    });
});
DialogContent.displayName = CONTENT_NAME;
var DialogContentModal = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.useComposedRefs)(forwardedRef, context.contentRef, contentRef);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const content = contentRef.current;
        if (content) return (0,aria_hidden__WEBPACK_IMPORTED_MODULE_12__.hideOthers)(content);
    }, []);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogContentImpl, {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.composeEventHandlers)(props.onCloseAutoFocus, (event)=>{
            event.preventDefault();
            context.triggerRef.current?.focus();
        }),
        onPointerDownOutside: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.composeEventHandlers)(props.onPointerDownOutside, (event)=>{
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.composeEventHandlers)(props.onFocusOutside, (event)=>event.preventDefault())
    });
});
var DialogContentNonModal = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const hasPointerDownOutsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogContentImpl, {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event)=>{
            props.onCloseAutoFocus?.(event);
            if (!event.defaultPrevented) {
                if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
                event.preventDefault();
            }
            hasInteractedOutsideRef.current = false;
            hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event)=>{
            props.onInteractOutside?.(event);
            if (!event.defaultPrevented) {
                hasInteractedOutsideRef.current = true;
                if (event.detail.originalEvent.type === "pointerdown") {
                    hasPointerDownOutsideRef.current = true;
                }
            }
            const target = event.target;
            const targetIsTrigger = context.triggerRef.current?.contains(target);
            if (targetIsTrigger) event.preventDefault();
            if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
                event.preventDefault();
            }
        }
    });
});
var DialogContentImpl = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.useComposedRefs)(forwardedRef, contentRef);
    (0,_radix_ui_react_focus_guards__WEBPACK_IMPORTED_MODULE_13__.useFocusGuards)();
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_focus_scope__WEBPACK_IMPORTED_MODULE_14__.FocusScope, {
                asChild: true,
                loop: true,
                trapped: trapFocus,
                onMountAutoFocus: onOpenAutoFocus,
                onUnmountAutoFocus: onCloseAutoFocus,
                children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_15__.DismissableLayer, {
                    role: "dialog",
                    id: context.contentId,
                    "aria-describedby": context.descriptionId,
                    "aria-labelledby": context.titleId,
                    "data-state": getState(context.open),
                    ...contentProps,
                    ref: composedRefs,
                    onDismiss: ()=>context.onOpenChange(false)
                })
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                children: [
                    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TitleWarning, {
                        titleId: context.titleId
                    }),
                    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DescriptionWarning, {
                        contentRef,
                        descriptionId: context.descriptionId
                    })
                ]
            })
        ]
    });
});
var TITLE_NAME = "DialogTitle";
var DialogTitle = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_6__.Primitive.h2, {
        id: context.titleId,
        ...titleProps,
        ref: forwardedRef
    });
});
DialogTitle.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_6__.Primitive.p, {
        id: context.descriptionId,
        ...descriptionProps,
        ref: forwardedRef
    });
});
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_6__.Primitive.button, {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.composeEventHandlers)(props.onClick, ()=>context.onOpenChange(false))
    });
});
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
    return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__.createContext)(TITLE_WARNING_NAME, {
    contentName: CONTENT_NAME,
    titleName: TITLE_NAME,
    docsSlug: "dialog"
});
var TitleWarning = ({ titleId })=>{
    const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
    const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (titleId) {
            const hasTitle = document.getElementById(titleId);
            if (!hasTitle) console.error(MESSAGE);
        }
    }, [
        MESSAGE,
        titleId
    ]);
    return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId })=>{
    const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
    const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const describedById = contentRef.current?.getAttribute("aria-describedby");
        if (descriptionId && describedById) {
            const hasDescription = document.getElementById(descriptionId);
            if (!hasDescription) console.warn(MESSAGE);
        }
    }, [
        MESSAGE,
        contentRef,
        descriptionId
    ]);
    return null;
};
var Root = Dialog;
var Trigger = DialogTrigger;
var Portal = DialogPortal;
var Overlay = DialogOverlay;
var Content = DialogContent;
var Title = DialogTitle;
var Description = DialogDescription;
var Close = DialogClose;
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs":
/*!*************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Branch: () => (/* binding */ Branch),
/* harmony export */   DismissableLayer: () => (/* binding */ DismissableLayer),
/* harmony export */   DismissableLayerBranch: () => (/* binding */ DismissableLayerBranch),
/* harmony export */   Root: () => (/* binding */ Root)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @radix-ui/primitive */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @radix-ui/react-use-callback-ref */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_escape_keydown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-use-escape-keydown */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
/* __next_internal_client_entry_do_not_use__ Branch,DismissableLayer,DismissableLayerBranch,Root auto */ // packages/react/dismissable-layer/src/DismissableLayer.tsx







var DISMISSABLE_LAYER_NAME = "DismissableLayer";
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext({
    layers: /* @__PURE__ */ new Set(),
    layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
    branches: /* @__PURE__ */ new Set()
});
var DismissableLayer = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { disableOutsidePointerEvents = false, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, ...layerProps } = props;
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DismissableLayerContext);
    const [node, setNode] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const ownerDocument = node?.ownerDocument ?? globalThis?.document;
    const [, force] = react__WEBPACK_IMPORTED_MODULE_0__.useState({});
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__.useComposedRefs)(forwardedRef, (node2)=>setNode(node2));
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [
        ...context.layersWithOutsidePointerEventsDisabled
    ].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
    const index = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const pointerDownOutside = usePointerDownOutside((event)=>{
        const target = event.target;
        const isPointerDownOnBranch = [
            ...context.branches
        ].some((branch)=>branch.contains(target));
        if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
        onPointerDownOutside?.(event);
        onInteractOutside?.(event);
        if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    const focusOutside = useFocusOutside((event)=>{
        const target = event.target;
        const isFocusInBranch = [
            ...context.branches
        ].some((branch)=>branch.contains(target));
        if (isFocusInBranch) return;
        onFocusOutside?.(event);
        onInteractOutside?.(event);
        if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    (0,_radix_ui_react_use_escape_keydown__WEBPACK_IMPORTED_MODULE_3__.useEscapeKeydown)((event)=>{
        const isHighestLayer = index === context.layers.size - 1;
        if (!isHighestLayer) return;
        onEscapeKeyDown?.(event);
        if (!event.defaultPrevented && onDismiss) {
            event.preventDefault();
            onDismiss();
        }
    }, ownerDocument);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!node) return;
        if (disableOutsidePointerEvents) {
            if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
                originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
                ownerDocument.body.style.pointerEvents = "none";
            }
            context.layersWithOutsidePointerEventsDisabled.add(node);
        }
        context.layers.add(node);
        dispatchUpdate();
        return ()=>{
            if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
                ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
            }
        };
    }, [
        node,
        ownerDocument,
        disableOutsidePointerEvents,
        context
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        return ()=>{
            if (!node) return;
            context.layers.delete(node);
            context.layersWithOutsidePointerEventsDisabled.delete(node);
            dispatchUpdate();
        };
    }, [
        node,
        context
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const handleUpdate = ()=>force({});
        document.addEventListener(CONTEXT_UPDATE, handleUpdate);
        return ()=>document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
    }, []);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_4__.Primitive.div, {
        ...layerProps,
        ref: composedRefs,
        style: {
            pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
            ...props.style
        },
        onFocusCapture: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_5__.composeEventHandlers)(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_5__.composeEventHandlers)(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_5__.composeEventHandlers)(props.onPointerDownCapture, pointerDownOutside.onPointerDownCapture)
    });
});
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch";
var DismissableLayerBranch = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DismissableLayerContext);
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__.useComposedRefs)(forwardedRef, ref);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const node = ref.current;
        if (node) {
            context.branches.add(node);
            return ()=>{
                context.branches.delete(node);
            };
        }
    }, [
        context.branches
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_4__.Primitive.div, {
        ...props,
        ref: composedRefs
    });
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
    const handlePointerDownOutside = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_6__.useCallbackRef)(onPointerDownOutside);
    const isPointerInsideReactTreeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const handleClickRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(()=>{});
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const handlePointerDown = (event)=>{
            if (event.target && !isPointerInsideReactTreeRef.current) {
                let handleAndDispatchPointerDownOutsideEvent2 = function() {
                    handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, handlePointerDownOutside, eventDetail, {
                        discrete: true
                    });
                };
                var handleAndDispatchPointerDownOutsideEvent = handleAndDispatchPointerDownOutsideEvent2;
                const eventDetail = {
                    originalEvent: event
                };
                if (event.pointerType === "touch") {
                    ownerDocument.removeEventListener("click", handleClickRef.current);
                    handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
                    ownerDocument.addEventListener("click", handleClickRef.current, {
                        once: true
                    });
                } else {
                    handleAndDispatchPointerDownOutsideEvent2();
                }
            } else {
                ownerDocument.removeEventListener("click", handleClickRef.current);
            }
            isPointerInsideReactTreeRef.current = false;
        };
        const timerId = window.setTimeout(()=>{
            ownerDocument.addEventListener("pointerdown", handlePointerDown);
        }, 0);
        return ()=>{
            window.clearTimeout(timerId);
            ownerDocument.removeEventListener("pointerdown", handlePointerDown);
            ownerDocument.removeEventListener("click", handleClickRef.current);
        };
    }, [
        ownerDocument,
        handlePointerDownOutside
    ]);
    return {
        // ensures we check React component tree (not just DOM tree)
        onPointerDownCapture: ()=>isPointerInsideReactTreeRef.current = true
    };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
    const handleFocusOutside = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_6__.useCallbackRef)(onFocusOutside);
    const isFocusInsideReactTreeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const handleFocus = (event)=>{
            if (event.target && !isFocusInsideReactTreeRef.current) {
                const eventDetail = {
                    originalEvent: event
                };
                handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
                    discrete: false
                });
            }
        };
        ownerDocument.addEventListener("focusin", handleFocus);
        return ()=>ownerDocument.removeEventListener("focusin", handleFocus);
    }, [
        ownerDocument,
        handleFocusOutside
    ]);
    return {
        onFocusCapture: ()=>isFocusInsideReactTreeRef.current = true,
        onBlurCapture: ()=>isFocusInsideReactTreeRef.current = false
    };
}
function dispatchUpdate() {
    const event = new CustomEvent(CONTEXT_UPDATE);
    document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
    const target = detail.originalEvent.target;
    const event = new CustomEvent(name, {
        bubbles: false,
        cancelable: true,
        detail
    });
    if (handler) target.addEventListener(name, handler, {
        once: true
    });
    if (discrete) {
        (0,_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_4__.dispatchDiscreteCustomEvent)(target, event);
    } else {
        target.dispatchEvent(event);
    }
}
var Root = DismissableLayer;
var Branch = DismissableLayerBranch;
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-focus-guards/dist/index.mjs":
/*!********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-focus-guards/dist/index.mjs ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusGuards: () => (/* binding */ FocusGuards),
/* harmony export */   Root: () => (/* binding */ Root),
/* harmony export */   useFocusGuards: () => (/* binding */ useFocusGuards)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* __next_internal_client_entry_do_not_use__ FocusGuards,Root,useFocusGuards auto */ // packages/react/focus-guards/src/FocusGuards.tsx

var count = 0;
function FocusGuards(props) {
    useFocusGuards();
    return props.children;
}
function useFocusGuards() {
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
        document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
        document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
        count++;
        return ()=>{
            if (count === 1) {
                document.querySelectorAll("[data-radix-focus-guard]").forEach((node)=>node.remove());
            }
            count--;
        };
    }, []);
}
function createFocusGuard() {
    const element = document.createElement("span");
    element.setAttribute("data-radix-focus-guard", "");
    element.tabIndex = 0;
    element.style.cssText = "outline: none; opacity: 0; position: fixed; pointer-events: none";
    return element;
}
var Root = FocusGuards;
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-focus-scope/dist/index.mjs":
/*!*******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-focus-scope/dist/index.mjs ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusScope: () => (/* binding */ FocusScope),
/* harmony export */   Root: () => (/* binding */ Root)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-use-callback-ref */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
/* __next_internal_client_entry_do_not_use__ FocusScope,Root auto */ // packages/react/focus-scope/src/FocusScope.tsx





var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = {
    bubbles: false,
    cancelable: true
};
var FOCUS_SCOPE_NAME = "FocusScope";
var FocusScope = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { loop = false, trapped = false, onMountAutoFocus: onMountAutoFocusProp, onUnmountAutoFocus: onUnmountAutoFocusProp, ...scopeProps } = props;
    const [container, setContainer] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const onMountAutoFocus = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_2__.useCallbackRef)(onMountAutoFocusProp);
    const onUnmountAutoFocus = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_2__.useCallbackRef)(onUnmountAutoFocusProp);
    const lastFocusedElementRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__.useComposedRefs)(forwardedRef, (node)=>setContainer(node));
    const focusScope = react__WEBPACK_IMPORTED_MODULE_0__.useRef({
        paused: false,
        pause () {
            this.paused = true;
        },
        resume () {
            this.paused = false;
        }
    }).current;
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (trapped) {
            let handleFocusIn2 = function(event) {
                if (focusScope.paused || !container) return;
                const target = event.target;
                if (container.contains(target)) {
                    lastFocusedElementRef.current = target;
                } else {
                    focus(lastFocusedElementRef.current, {
                        select: true
                    });
                }
            }, handleFocusOut2 = function(event) {
                if (focusScope.paused || !container) return;
                const relatedTarget = event.relatedTarget;
                if (relatedTarget === null) return;
                if (!container.contains(relatedTarget)) {
                    focus(lastFocusedElementRef.current, {
                        select: true
                    });
                }
            }, handleMutations2 = function(mutations) {
                const focusedElement = document.activeElement;
                if (focusedElement !== document.body) return;
                for (const mutation of mutations){
                    if (mutation.removedNodes.length > 0) focus(container);
                }
            };
            var handleFocusIn = handleFocusIn2, handleFocusOut = handleFocusOut2, handleMutations = handleMutations2;
            document.addEventListener("focusin", handleFocusIn2);
            document.addEventListener("focusout", handleFocusOut2);
            const mutationObserver = new MutationObserver(handleMutations2);
            if (container) mutationObserver.observe(container, {
                childList: true,
                subtree: true
            });
            return ()=>{
                document.removeEventListener("focusin", handleFocusIn2);
                document.removeEventListener("focusout", handleFocusOut2);
                mutationObserver.disconnect();
            };
        }
    }, [
        trapped,
        container,
        focusScope.paused
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (container) {
            focusScopesStack.add(focusScope);
            const previouslyFocusedElement = document.activeElement;
            const hasFocusedCandidate = container.contains(previouslyFocusedElement);
            if (!hasFocusedCandidate) {
                const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
                container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
                container.dispatchEvent(mountEvent);
                if (!mountEvent.defaultPrevented) {
                    focusFirst(removeLinks(getTabbableCandidates(container)), {
                        select: true
                    });
                    if (document.activeElement === previouslyFocusedElement) {
                        focus(container);
                    }
                }
            }
            return ()=>{
                container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
                setTimeout(()=>{
                    const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
                    container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
                    container.dispatchEvent(unmountEvent);
                    if (!unmountEvent.defaultPrevented) {
                        focus(previouslyFocusedElement ?? document.body, {
                            select: true
                        });
                    }
                    container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
                    focusScopesStack.remove(focusScope);
                }, 0);
            };
        }
    }, [
        container,
        onMountAutoFocus,
        onUnmountAutoFocus,
        focusScope
    ]);
    const handleKeyDown = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((event)=>{
        if (!loop && !trapped) return;
        if (focusScope.paused) return;
        const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
        const focusedElement = document.activeElement;
        if (isTabKey && focusedElement) {
            const container2 = event.currentTarget;
            const [first, last] = getTabbableEdges(container2);
            const hasTabbableElementsInside = first && last;
            if (!hasTabbableElementsInside) {
                if (focusedElement === container2) event.preventDefault();
            } else {
                if (!event.shiftKey && focusedElement === last) {
                    event.preventDefault();
                    if (loop) focus(first, {
                        select: true
                    });
                } else if (event.shiftKey && focusedElement === first) {
                    event.preventDefault();
                    if (loop) focus(last, {
                        select: true
                    });
                }
            }
        }
    }, [
        loop,
        trapped,
        focusScope.paused
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_4__.Primitive.div, {
        tabIndex: -1,
        ...scopeProps,
        ref: composedRefs,
        onKeyDown: handleKeyDown
    });
});
FocusScope.displayName = FOCUS_SCOPE_NAME;
function focusFirst(candidates, { select = false } = {}) {
    const previouslyFocusedElement = document.activeElement;
    for (const candidate of candidates){
        focus(candidate, {
            select
        });
        if (document.activeElement !== previouslyFocusedElement) return;
    }
}
function getTabbableEdges(container) {
    const candidates = getTabbableCandidates(container);
    const first = findVisible(candidates, container);
    const last = findVisible(candidates.reverse(), container);
    return [
        first,
        last
    ];
}
function getTabbableCandidates(container) {
    const nodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node)=>{
            const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
            if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
            return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
    });
    while(walker.nextNode())nodes.push(walker.currentNode);
    return nodes;
}
function findVisible(elements, container) {
    for (const element of elements){
        if (!isHidden(element, {
            upTo: container
        })) return element;
    }
}
function isHidden(node, { upTo }) {
    if (getComputedStyle(node).visibility === "hidden") return true;
    while(node){
        if (upTo !== void 0 && node === upTo) return false;
        if (getComputedStyle(node).display === "none") return true;
        node = node.parentElement;
    }
    return false;
}
function isSelectableInput(element) {
    return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
    if (element && element.focus) {
        const previouslyFocusedElement = document.activeElement;
        element.focus({
            preventScroll: true
        });
        if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
    }
}
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
    let stack = [];
    return {
        add (focusScope) {
            const activeFocusScope = stack[0];
            if (focusScope !== activeFocusScope) {
                activeFocusScope?.pause();
            }
            stack = arrayRemove(stack, focusScope);
            stack.unshift(focusScope);
        },
        remove (focusScope) {
            stack = arrayRemove(stack, focusScope);
            stack[0]?.resume();
        }
    };
}
function arrayRemove(array, item) {
    const updatedArray = [
        ...array
    ];
    const index = updatedArray.indexOf(item);
    if (index !== -1) {
        updatedArray.splice(index, 1);
    }
    return updatedArray;
}
function removeLinks(items) {
    return items.filter((item)=>item.tagName !== "A");
}
var Root = FocusScope;
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-id/dist/index.mjs":
/*!**********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-id/dist/index.mjs ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useId: () => (/* binding */ useId)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-use-layout-effect */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs");
// packages/react/id/src/id.tsx


var useReactId = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))["useId".toString()] || (() => void 0);
var count = 0;
function useId(deterministicId) {
  const [id, setId] = react__WEBPACK_IMPORTED_MODULE_0__.useState(useReactId());
  (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    if (!deterministicId) setId((reactId) => reactId ?? String(count++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-portal/dist/index.mjs":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-portal/dist/index.mjs ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Portal: () => (/* binding */ Portal),
/* harmony export */   Root: () => (/* binding */ Root)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-dom.js");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-use-layout-effect */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
/* __next_internal_client_entry_do_not_use__ Portal,Root auto */ // packages/react/portal/src/Portal.tsx





var PORTAL_NAME = "Portal";
var Portal = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { container: containerProp, ...portalProps } = props;
    const [mounted, setMounted] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(()=>setMounted(true), []);
    const container = containerProp || mounted && globalThis?.document?.body;
    return container ? /*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_4__.Primitive.div, {
        ...portalProps,
        ref: forwardedRef
    }), container) : null;
});
Portal.displayName = PORTAL_NAME;
var Root = Portal;
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-presence/dist/index.mjs":
/*!****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-presence/dist/index.mjs ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Presence: () => (/* binding */ Presence)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-dom.js");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-use-layout-effect */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs");
/* __next_internal_client_entry_do_not_use__ Presence auto */ // packages/react/presence/src/Presence.tsx




// packages/react/presence/src/useStateMachine.tsx

function useStateMachine(initialState, machine) {
    return react__WEBPACK_IMPORTED_MODULE_0__.useReducer((state, event)=>{
        const nextState = machine[state][event];
        return nextState ?? state;
    }, initialState);
}
// packages/react/presence/src/Presence.tsx
var Presence = (props)=>{
    const { present, children } = props;
    const presence = usePresence(present);
    const child = typeof children === "function" ? children({
        present: presence.isPresent
    }) : react__WEBPACK_IMPORTED_MODULE_0__.Children.only(children);
    const ref = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__.useComposedRefs)(presence.ref, getElementRef(child));
    const forceMount = typeof children === "function";
    return forceMount || presence.isPresent ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(child, {
        ref
    }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
    const [node, setNode] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
    const stylesRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef({});
    const prevPresentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(present);
    const prevAnimationNameRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef("none");
    const initialState = present ? "mounted" : "unmounted";
    const [state, send] = useStateMachine(initialState, {
        mounted: {
            UNMOUNT: "unmounted",
            ANIMATION_OUT: "unmountSuspended"
        },
        unmountSuspended: {
            MOUNT: "mounted",
            ANIMATION_END: "unmounted"
        },
        unmounted: {
            MOUNT: "mounted"
        }
    });
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const currentAnimationName = getAnimationName(stylesRef.current);
        prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
    }, [
        state
    ]);
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(()=>{
        const styles = stylesRef.current;
        const wasPresent = prevPresentRef.current;
        const hasPresentChanged = wasPresent !== present;
        if (hasPresentChanged) {
            const prevAnimationName = prevAnimationNameRef.current;
            const currentAnimationName = getAnimationName(styles);
            if (present) {
                send("MOUNT");
            } else if (currentAnimationName === "none" || styles?.display === "none") {
                send("UNMOUNT");
            } else {
                const isAnimating = prevAnimationName !== currentAnimationName;
                if (wasPresent && isAnimating) {
                    send("ANIMATION_OUT");
                } else {
                    send("UNMOUNT");
                }
            }
            prevPresentRef.current = present;
        }
    }, [
        present,
        send
    ]);
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(()=>{
        if (node) {
            const handleAnimationEnd = (event)=>{
                const currentAnimationName = getAnimationName(stylesRef.current);
                const isCurrentAnimation = currentAnimationName.includes(event.animationName);
                if (event.target === node && isCurrentAnimation) {
                    react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(()=>send("ANIMATION_END"));
                }
            };
            const handleAnimationStart = (event)=>{
                if (event.target === node) {
                    prevAnimationNameRef.current = getAnimationName(stylesRef.current);
                }
            };
            node.addEventListener("animationstart", handleAnimationStart);
            node.addEventListener("animationcancel", handleAnimationEnd);
            node.addEventListener("animationend", handleAnimationEnd);
            return ()=>{
                node.removeEventListener("animationstart", handleAnimationStart);
                node.removeEventListener("animationcancel", handleAnimationEnd);
                node.removeEventListener("animationend", handleAnimationEnd);
            };
        } else {
            send("ANIMATION_END");
        }
    }, [
        node,
        send
    ]);
    return {
        isPresent: [
            "mounted",
            "unmountSuspended"
        ].includes(state),
        ref: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node2)=>{
            if (node2) stylesRef.current = getComputedStyle(node2);
            setNode(node2);
        }, [])
    };
}
function getAnimationName(styles) {
    return styles?.animationName || "none";
}
function getElementRef(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.props.ref;
    }
    return element.props.ref || element.ref;
}
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-primitive/dist/index.mjs":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-primitive/dist/index.mjs ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Primitive: () => (/* binding */ Primitive),
/* harmony export */   Root: () => (/* binding */ Root),
/* harmony export */   dispatchDiscreteCustomEvent: () => (/* binding */ dispatchDiscreteCustomEvent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-dom.js");
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-slot */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-slot/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
// packages/react/primitive/src/Primitive.tsx




var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Node = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__.Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target) react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(() => target.dispatchEvent(event));
}
var Root = Primitive;

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-slot/dist/index.mjs":
/*!************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-slot/dist/index.mjs ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Root: () => (/* binding */ Root),
/* harmony export */   Slot: () => (/* binding */ Slot),
/* harmony export */   Slottable: () => (/* binding */ Slottable)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
// packages/react/slot/src/Slot.tsx



var Slot = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (react__WEBPACK_IMPORTED_MODULE_0__.Children.count(newElement) > 1) return react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null);
        return react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(newElement) ? newElement.props.children : null;
      } else {
        return child;
      }
    });
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children: react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(newElement) ? react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(newElement, void 0, newChildren) : null });
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children });
});
Slot.displayName = "Slot";
var SlotClone = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if (react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(children)) {
    const childrenRef = getElementRef(children);
    return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, {
      ...mergeProps(slotProps, children.props),
      // @ts-ignore
      ref: forwardedRef ? (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__.composeRefs)(forwardedRef, childrenRef) : childrenRef
    });
  }
  return react__WEBPACK_IMPORTED_MODULE_0__.Children.count(children) > 1 ? react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null) : null;
});
SlotClone.displayName = "SlotClone";
var Slottable = ({ children }) => {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, { children });
};
function isSlottable(child) {
  return react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(child) && child.type === Slottable;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var Root = Slot;

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-toast/dist/index.mjs":
/*!*************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-toast/dist/index.mjs ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Action: () => (/* binding */ Action),
/* harmony export */   Close: () => (/* binding */ Close),
/* harmony export */   Description: () => (/* binding */ Description),
/* harmony export */   Provider: () => (/* binding */ Provider),
/* harmony export */   Root: () => (/* binding */ Root2),
/* harmony export */   Title: () => (/* binding */ Title),
/* harmony export */   Toast: () => (/* binding */ Toast),
/* harmony export */   ToastAction: () => (/* binding */ ToastAction),
/* harmony export */   ToastClose: () => (/* binding */ ToastClose),
/* harmony export */   ToastDescription: () => (/* binding */ ToastDescription),
/* harmony export */   ToastProvider: () => (/* binding */ ToastProvider),
/* harmony export */   ToastTitle: () => (/* binding */ ToastTitle),
/* harmony export */   ToastViewport: () => (/* binding */ ToastViewport),
/* harmony export */   Viewport: () => (/* binding */ Viewport),
/* harmony export */   createToastScope: () => (/* binding */ createToastScope)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-dom.js");
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @radix-ui/primitive */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var _radix_ui_react_collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-collection */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-collection/dist/index.mjs");
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-context */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-context/dist/index.mjs");
/* harmony import */ var _radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @radix-ui/react-dismissable-layer */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs");
/* harmony import */ var _radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @radix-ui/react-portal */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-portal/dist/index.mjs");
/* harmony import */ var _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @radix-ui/react-presence */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-presence/dist/index.mjs");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @radix-ui/react-use-callback-ref */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @radix-ui/react-use-controllable-state */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @radix-ui/react-use-layout-effect */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs");
/* harmony import */ var _radix_ui_react_visually_hidden__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @radix-ui/react-visually-hidden */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
/* __next_internal_client_entry_do_not_use__ Action,Close,Description,Provider,Root,Title,Toast,ToastAction,ToastClose,ToastDescription,ToastProvider,ToastTitle,ToastViewport,Viewport,createToastScope auto */ // packages/react/toast/src/Toast.tsx















var PROVIDER_NAME = "ToastProvider";
var [Collection, useCollection, createCollectionScope] = (0,_radix_ui_react_collection__WEBPACK_IMPORTED_MODULE_3__.createCollection)("Toast");
var [createToastContext, createToastScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_4__.createContextScope)("Toast", [
    createCollectionScope
]);
var [ToastProviderProvider, useToastProviderContext] = createToastContext(PROVIDER_NAME);
var ToastProvider = (props)=>{
    const { __scopeToast, label = "Notification", duration = 5e3, swipeDirection = "right", swipeThreshold = 50, children } = props;
    const [viewport, setViewport] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const [toastCount, setToastCount] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
    const isFocusedToastEscapeKeyDownRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const isClosePausedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    if (!label.trim()) {
        console.error(`Invalid prop \`label\` supplied to \`${PROVIDER_NAME}\`. Expected non-empty \`string\`.`);
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Collection.Provider, {
        scope: __scopeToast,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ToastProviderProvider, {
            scope: __scopeToast,
            label,
            duration,
            swipeDirection,
            swipeThreshold,
            toastCount,
            viewport,
            onViewportChange: setViewport,
            onToastAdd: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>setToastCount((prevCount)=>prevCount + 1), []),
            onToastRemove: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(()=>setToastCount((prevCount)=>prevCount - 1), []),
            isFocusedToastEscapeKeyDownRef,
            isClosePausedRef,
            children
        })
    });
};
ToastProvider.displayName = PROVIDER_NAME;
var VIEWPORT_NAME = "ToastViewport";
var VIEWPORT_DEFAULT_HOTKEY = [
    "F8"
];
var VIEWPORT_PAUSE = "toast.viewportPause";
var VIEWPORT_RESUME = "toast.viewportResume";
var ToastViewport = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeToast, hotkey = VIEWPORT_DEFAULT_HOTKEY, label = "Notifications ({hotkey})", ...viewportProps } = props;
    const context = useToastProviderContext(VIEWPORT_NAME, __scopeToast);
    const getItems = useCollection(__scopeToast);
    const wrapperRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const headFocusProxyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const tailFocusProxyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.useComposedRefs)(forwardedRef, ref, context.onViewportChange);
    const hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
    const hasToasts = context.toastCount > 0;
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const handleKeyDown = (event)=>{
            const isHotkeyPressed = hotkey.every((key)=>event[key] || event.code === key);
            if (isHotkeyPressed) ref.current?.focus();
        };
        document.addEventListener("keydown", handleKeyDown);
        return ()=>document.removeEventListener("keydown", handleKeyDown);
    }, [
        hotkey
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const wrapper = wrapperRef.current;
        const viewport = ref.current;
        if (hasToasts && wrapper && viewport) {
            const handlePause = ()=>{
                if (!context.isClosePausedRef.current) {
                    const pauseEvent = new CustomEvent(VIEWPORT_PAUSE);
                    viewport.dispatchEvent(pauseEvent);
                    context.isClosePausedRef.current = true;
                }
            };
            const handleResume = ()=>{
                if (context.isClosePausedRef.current) {
                    const resumeEvent = new CustomEvent(VIEWPORT_RESUME);
                    viewport.dispatchEvent(resumeEvent);
                    context.isClosePausedRef.current = false;
                }
            };
            const handleFocusOutResume = (event)=>{
                const isFocusMovingOutside = !wrapper.contains(event.relatedTarget);
                if (isFocusMovingOutside) handleResume();
            };
            const handlePointerLeaveResume = ()=>{
                const isFocusInside = wrapper.contains(document.activeElement);
                if (!isFocusInside) handleResume();
            };
            wrapper.addEventListener("focusin", handlePause);
            wrapper.addEventListener("focusout", handleFocusOutResume);
            wrapper.addEventListener("pointermove", handlePause);
            wrapper.addEventListener("pointerleave", handlePointerLeaveResume);
            window.addEventListener("blur", handlePause);
            window.addEventListener("focus", handleResume);
            return ()=>{
                wrapper.removeEventListener("focusin", handlePause);
                wrapper.removeEventListener("focusout", handleFocusOutResume);
                wrapper.removeEventListener("pointermove", handlePause);
                wrapper.removeEventListener("pointerleave", handlePointerLeaveResume);
                window.removeEventListener("blur", handlePause);
                window.removeEventListener("focus", handleResume);
            };
        }
    }, [
        hasToasts,
        context.isClosePausedRef
    ]);
    const getSortedTabbableCandidates = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(({ tabbingDirection })=>{
        const toastItems = getItems();
        const tabbableCandidates = toastItems.map((toastItem)=>{
            const toastNode = toastItem.ref.current;
            const toastTabbableCandidates = [
                toastNode,
                ...getTabbableCandidates(toastNode)
            ];
            return tabbingDirection === "forwards" ? toastTabbableCandidates : toastTabbableCandidates.reverse();
        });
        return (tabbingDirection === "forwards" ? tabbableCandidates.reverse() : tabbableCandidates).flat();
    }, [
        getItems
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const viewport = ref.current;
        if (viewport) {
            const handleKeyDown = (event)=>{
                const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
                const isTabKey = event.key === "Tab" && !isMetaKey;
                if (isTabKey) {
                    const focusedElement = document.activeElement;
                    const isTabbingBackwards = event.shiftKey;
                    const targetIsViewport = event.target === viewport;
                    if (targetIsViewport && isTabbingBackwards) {
                        headFocusProxyRef.current?.focus();
                        return;
                    }
                    const tabbingDirection = isTabbingBackwards ? "backwards" : "forwards";
                    const sortedCandidates = getSortedTabbableCandidates({
                        tabbingDirection
                    });
                    const index = sortedCandidates.findIndex((candidate)=>candidate === focusedElement);
                    if (focusFirst(sortedCandidates.slice(index + 1))) {
                        event.preventDefault();
                    } else {
                        isTabbingBackwards ? headFocusProxyRef.current?.focus() : tailFocusProxyRef.current?.focus();
                    }
                }
            };
            viewport.addEventListener("keydown", handleKeyDown);
            return ()=>viewport.removeEventListener("keydown", handleKeyDown);
        }
    }, [
        getItems,
        getSortedTabbableCandidates
    ]);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_6__.Branch, {
        ref: wrapperRef,
        role: "region",
        "aria-label": label.replace("{hotkey}", hotkeyLabel),
        tabIndex: -1,
        style: {
            pointerEvents: hasToasts ? void 0 : "none"
        },
        children: [
            hasToasts && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FocusProxy, {
                ref: headFocusProxyRef,
                onFocusFromOutsideViewport: ()=>{
                    const tabbableCandidates = getSortedTabbableCandidates({
                        tabbingDirection: "forwards"
                    });
                    focusFirst(tabbableCandidates);
                }
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Collection.Slot, {
                scope: __scopeToast,
                children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__.Primitive.ol, {
                    tabIndex: -1,
                    ...viewportProps,
                    ref: composedRefs
                })
            }),
            hasToasts && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FocusProxy, {
                ref: tailFocusProxyRef,
                onFocusFromOutsideViewport: ()=>{
                    const tabbableCandidates = getSortedTabbableCandidates({
                        tabbingDirection: "backwards"
                    });
                    focusFirst(tabbableCandidates);
                }
            })
        ]
    });
});
ToastViewport.displayName = VIEWPORT_NAME;
var FOCUS_PROXY_NAME = "ToastFocusProxy";
var FocusProxy = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeToast, onFocusFromOutsideViewport, ...proxyProps } = props;
    const context = useToastProviderContext(FOCUS_PROXY_NAME, __scopeToast);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_visually_hidden__WEBPACK_IMPORTED_MODULE_8__.VisuallyHidden, {
        "aria-hidden": true,
        tabIndex: 0,
        ...proxyProps,
        ref: forwardedRef,
        style: {
            position: "fixed"
        },
        onFocus: (event)=>{
            const prevFocusedElement = event.relatedTarget;
            const isFocusFromOutsideViewport = !context.viewport?.contains(prevFocusedElement);
            if (isFocusFromOutsideViewport) onFocusFromOutsideViewport();
        }
    });
});
FocusProxy.displayName = FOCUS_PROXY_NAME;
var TOAST_NAME = "Toast";
var TOAST_SWIPE_START = "toast.swipeStart";
var TOAST_SWIPE_MOVE = "toast.swipeMove";
var TOAST_SWIPE_CANCEL = "toast.swipeCancel";
var TOAST_SWIPE_END = "toast.swipeEnd";
var Toast = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { forceMount, open: openProp, defaultOpen, onOpenChange, ...toastProps } = props;
    const [open = true, setOpen] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_9__.useControllableState)({
        prop: openProp,
        defaultProp: defaultOpen,
        onChange: onOpenChange
    });
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_10__.Presence, {
        present: forceMount || open,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ToastImpl, {
            open,
            ...toastProps,
            ref: forwardedRef,
            onClose: ()=>setOpen(false),
            onPause: (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_11__.useCallbackRef)(props.onPause),
            onResume: (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_11__.useCallbackRef)(props.onResume),
            onSwipeStart: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.composeEventHandlers)(props.onSwipeStart, (event)=>{
                event.currentTarget.setAttribute("data-swipe", "start");
            }),
            onSwipeMove: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.composeEventHandlers)(props.onSwipeMove, (event)=>{
                const { x, y } = event.detail.delta;
                event.currentTarget.setAttribute("data-swipe", "move");
                event.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${x}px`);
                event.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${y}px`);
            }),
            onSwipeCancel: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.composeEventHandlers)(props.onSwipeCancel, (event)=>{
                event.currentTarget.setAttribute("data-swipe", "cancel");
                event.currentTarget.style.removeProperty("--radix-toast-swipe-move-x");
                event.currentTarget.style.removeProperty("--radix-toast-swipe-move-y");
                event.currentTarget.style.removeProperty("--radix-toast-swipe-end-x");
                event.currentTarget.style.removeProperty("--radix-toast-swipe-end-y");
            }),
            onSwipeEnd: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.composeEventHandlers)(props.onSwipeEnd, (event)=>{
                const { x, y } = event.detail.delta;
                event.currentTarget.setAttribute("data-swipe", "end");
                event.currentTarget.style.removeProperty("--radix-toast-swipe-move-x");
                event.currentTarget.style.removeProperty("--radix-toast-swipe-move-y");
                event.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${x}px`);
                event.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${y}px`);
                setOpen(false);
            })
        })
    });
});
Toast.displayName = TOAST_NAME;
var [ToastInteractiveProvider, useToastInteractiveContext] = createToastContext(TOAST_NAME, {
    onClose () {}
});
var ToastImpl = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeToast, type = "foreground", duration: durationProp, open, onClose, onEscapeKeyDown, onPause, onResume, onSwipeStart, onSwipeMove, onSwipeCancel, onSwipeEnd, ...toastProps } = props;
    const context = useToastProviderContext(TOAST_NAME, __scopeToast);
    const [node, setNode] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.useComposedRefs)(forwardedRef, (node2)=>setNode(node2));
    const pointerStartRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const swipeDeltaRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const duration = durationProp || context.duration;
    const closeTimerStartTimeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
    const closeTimerRemainingTimeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(duration);
    const closeTimerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
    const { onToastAdd, onToastRemove } = context;
    const handleClose = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_11__.useCallbackRef)(()=>{
        const isFocusInToast = node?.contains(document.activeElement);
        if (isFocusInToast) context.viewport?.focus();
        onClose();
    });
    const startTimer = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((duration2)=>{
        if (!duration2 || duration2 === Infinity) return;
        window.clearTimeout(closeTimerRef.current);
        closeTimerStartTimeRef.current = /* @__PURE__ */ new Date().getTime();
        closeTimerRef.current = window.setTimeout(handleClose, duration2);
    }, [
        handleClose
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const viewport = context.viewport;
        if (viewport) {
            const handleResume = ()=>{
                startTimer(closeTimerRemainingTimeRef.current);
                onResume?.();
            };
            const handlePause = ()=>{
                const elapsedTime = /* @__PURE__ */ new Date().getTime() - closeTimerStartTimeRef.current;
                closeTimerRemainingTimeRef.current = closeTimerRemainingTimeRef.current - elapsedTime;
                window.clearTimeout(closeTimerRef.current);
                onPause?.();
            };
            viewport.addEventListener(VIEWPORT_PAUSE, handlePause);
            viewport.addEventListener(VIEWPORT_RESUME, handleResume);
            return ()=>{
                viewport.removeEventListener(VIEWPORT_PAUSE, handlePause);
                viewport.removeEventListener(VIEWPORT_RESUME, handleResume);
            };
        }
    }, [
        context.viewport,
        duration,
        onPause,
        onResume,
        startTimer
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (open && !context.isClosePausedRef.current) startTimer(duration);
    }, [
        open,
        duration,
        context.isClosePausedRef,
        startTimer
    ]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        onToastAdd();
        return ()=>onToastRemove();
    }, [
        onToastAdd,
        onToastRemove
    ]);
    const announceTextContent = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>{
        return node ? getAnnounceTextContent(node) : null;
    }, [
        node
    ]);
    if (!context.viewport) return null;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
        children: [
            announceTextContent && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ToastAnnounce, {
                __scopeToast,
                role: "status",
                "aria-live": type === "foreground" ? "assertive" : "polite",
                "aria-atomic": true,
                children: announceTextContent
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ToastInteractiveProvider, {
                scope: __scopeToast,
                onClose: handleClose,
                children: /*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Collection.ItemSlot, {
                    scope: __scopeToast,
                    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_6__.Root, {
                        asChild: true,
                        onEscapeKeyDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.composeEventHandlers)(onEscapeKeyDown, ()=>{
                            if (!context.isFocusedToastEscapeKeyDownRef.current) handleClose();
                            context.isFocusedToastEscapeKeyDownRef.current = false;
                        }),
                        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__.Primitive.li, {
                            role: "status",
                            "aria-live": "off",
                            "aria-atomic": true,
                            tabIndex: 0,
                            "data-state": open ? "open" : "closed",
                            "data-swipe-direction": context.swipeDirection,
                            ...toastProps,
                            ref: composedRefs,
                            style: {
                                userSelect: "none",
                                touchAction: "none",
                                ...props.style
                            },
                            onKeyDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.composeEventHandlers)(props.onKeyDown, (event)=>{
                                if (event.key !== "Escape") return;
                                onEscapeKeyDown?.(event.nativeEvent);
                                if (!event.nativeEvent.defaultPrevented) {
                                    context.isFocusedToastEscapeKeyDownRef.current = true;
                                    handleClose();
                                }
                            }),
                            onPointerDown: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.composeEventHandlers)(props.onPointerDown, (event)=>{
                                if (event.button !== 0) return;
                                pointerStartRef.current = {
                                    x: event.clientX,
                                    y: event.clientY
                                };
                            }),
                            onPointerMove: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.composeEventHandlers)(props.onPointerMove, (event)=>{
                                if (!pointerStartRef.current) return;
                                const x = event.clientX - pointerStartRef.current.x;
                                const y = event.clientY - pointerStartRef.current.y;
                                const hasSwipeMoveStarted = Boolean(swipeDeltaRef.current);
                                const isHorizontalSwipe = [
                                    "left",
                                    "right"
                                ].includes(context.swipeDirection);
                                const clamp = [
                                    "left",
                                    "up"
                                ].includes(context.swipeDirection) ? Math.min : Math.max;
                                const clampedX = isHorizontalSwipe ? clamp(0, x) : 0;
                                const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0;
                                const moveStartBuffer = event.pointerType === "touch" ? 10 : 2;
                                const delta = {
                                    x: clampedX,
                                    y: clampedY
                                };
                                const eventDetail = {
                                    originalEvent: event,
                                    delta
                                };
                                if (hasSwipeMoveStarted) {
                                    swipeDeltaRef.current = delta;
                                    handleAndDispatchCustomEvent(TOAST_SWIPE_MOVE, onSwipeMove, eventDetail, {
                                        discrete: false
                                    });
                                } else if (isDeltaInDirection(delta, context.swipeDirection, moveStartBuffer)) {
                                    swipeDeltaRef.current = delta;
                                    handleAndDispatchCustomEvent(TOAST_SWIPE_START, onSwipeStart, eventDetail, {
                                        discrete: false
                                    });
                                    event.target.setPointerCapture(event.pointerId);
                                } else if (Math.abs(x) > moveStartBuffer || Math.abs(y) > moveStartBuffer) {
                                    pointerStartRef.current = null;
                                }
                            }),
                            onPointerUp: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.composeEventHandlers)(props.onPointerUp, (event)=>{
                                const delta = swipeDeltaRef.current;
                                const target = event.target;
                                if (target.hasPointerCapture(event.pointerId)) {
                                    target.releasePointerCapture(event.pointerId);
                                }
                                swipeDeltaRef.current = null;
                                pointerStartRef.current = null;
                                if (delta) {
                                    const toast = event.currentTarget;
                                    const eventDetail = {
                                        originalEvent: event,
                                        delta
                                    };
                                    if (isDeltaInDirection(delta, context.swipeDirection, context.swipeThreshold)) {
                                        handleAndDispatchCustomEvent(TOAST_SWIPE_END, onSwipeEnd, eventDetail, {
                                            discrete: true
                                        });
                                    } else {
                                        handleAndDispatchCustomEvent(TOAST_SWIPE_CANCEL, onSwipeCancel, eventDetail, {
                                            discrete: true
                                        });
                                    }
                                    toast.addEventListener("click", (event2)=>event2.preventDefault(), {
                                        once: true
                                    });
                                }
                            })
                        })
                    })
                }), context.viewport)
            })
        ]
    });
});
var ToastAnnounce = (props)=>{
    const { __scopeToast, children, ...announceProps } = props;
    const context = useToastProviderContext(TOAST_NAME, __scopeToast);
    const [renderAnnounceText, setRenderAnnounceText] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const [isAnnounced, setIsAnnounced] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    useNextFrame(()=>setRenderAnnounceText(true));
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        const timer = window.setTimeout(()=>setIsAnnounced(true), 1e3);
        return ()=>window.clearTimeout(timer);
    }, []);
    return isAnnounced ? null : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_13__.Portal, {
        asChild: true,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_visually_hidden__WEBPACK_IMPORTED_MODULE_8__.VisuallyHidden, {
            ...announceProps,
            children: renderAnnounceText && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
                children: [
                    context.label,
                    " ",
                    children
                ]
            })
        })
    });
};
var TITLE_NAME = "ToastTitle";
var ToastTitle = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeToast, ...titleProps } = props;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__.Primitive.div, {
        ...titleProps,
        ref: forwardedRef
    });
});
ToastTitle.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "ToastDescription";
var ToastDescription = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeToast, ...descriptionProps } = props;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__.Primitive.div, {
        ...descriptionProps,
        ref: forwardedRef
    });
});
ToastDescription.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "ToastAction";
var ToastAction = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { altText, ...actionProps } = props;
    if (!altText.trim()) {
        console.error(`Invalid prop \`altText\` supplied to \`${ACTION_NAME}\`. Expected non-empty \`string\`.`);
        return null;
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ToastAnnounceExclude, {
        altText,
        asChild: true,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ToastClose, {
            ...actionProps,
            ref: forwardedRef
        })
    });
});
ToastAction.displayName = ACTION_NAME;
var CLOSE_NAME = "ToastClose";
var ToastClose = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeToast, ...closeProps } = props;
    const interactiveContext = useToastInteractiveContext(CLOSE_NAME, __scopeToast);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ToastAnnounceExclude, {
        asChild: true,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__.Primitive.button, {
            type: "button",
            ...closeProps,
            ref: forwardedRef,
            onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.composeEventHandlers)(props.onClick, interactiveContext.onClose)
        })
    });
});
ToastClose.displayName = CLOSE_NAME;
var ToastAnnounceExclude = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{
    const { __scopeToast, altText, ...announceExcludeProps } = props;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__.Primitive.div, {
        "data-radix-toast-announce-exclude": "",
        "data-radix-toast-announce-alt": altText || void 0,
        ...announceExcludeProps,
        ref: forwardedRef
    });
});
function getAnnounceTextContent(container) {
    const textContent = [];
    const childNodes = Array.from(container.childNodes);
    childNodes.forEach((node)=>{
        if (node.nodeType === node.TEXT_NODE && node.textContent) textContent.push(node.textContent);
        if (isHTMLElement(node)) {
            const isHidden = node.ariaHidden || node.hidden || node.style.display === "none";
            const isExcluded = node.dataset.radixToastAnnounceExclude === "";
            if (!isHidden) {
                if (isExcluded) {
                    const altText = node.dataset.radixToastAnnounceAlt;
                    if (altText) textContent.push(altText);
                } else {
                    textContent.push(...getAnnounceTextContent(node));
                }
            }
        }
    });
    return textContent;
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
    const currentTarget = detail.originalEvent.currentTarget;
    const event = new CustomEvent(name, {
        bubbles: true,
        cancelable: true,
        detail
    });
    if (handler) currentTarget.addEventListener(name, handler, {
        once: true
    });
    if (discrete) {
        (0,_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__.dispatchDiscreteCustomEvent)(currentTarget, event);
    } else {
        currentTarget.dispatchEvent(event);
    }
}
var isDeltaInDirection = (delta, direction, threshold = 0)=>{
    const deltaX = Math.abs(delta.x);
    const deltaY = Math.abs(delta.y);
    const isDeltaX = deltaX > deltaY;
    if (direction === "left" || direction === "right") {
        return isDeltaX && deltaX > threshold;
    } else {
        return !isDeltaX && deltaY > threshold;
    }
};
function useNextFrame(callback = ()=>{}) {
    const fn = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_11__.useCallbackRef)(callback);
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_14__.useLayoutEffect)(()=>{
        let raf1 = 0;
        let raf2 = 0;
        raf1 = window.requestAnimationFrame(()=>raf2 = window.requestAnimationFrame(fn));
        return ()=>{
            window.cancelAnimationFrame(raf1);
            window.cancelAnimationFrame(raf2);
        };
    }, [
        fn
    ]);
}
function isHTMLElement(node) {
    return node.nodeType === node.ELEMENT_NODE;
}
function getTabbableCandidates(container) {
    const nodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node)=>{
            const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
            if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
            return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
    });
    while(walker.nextNode())nodes.push(walker.currentNode);
    return nodes;
}
function focusFirst(candidates) {
    const previouslyFocusedElement = document.activeElement;
    return candidates.some((candidate)=>{
        if (candidate === previouslyFocusedElement) return true;
        candidate.focus();
        return document.activeElement !== previouslyFocusedElement;
    });
}
var Provider = ToastProvider;
var Viewport = ToastViewport;
var Root2 = Toast;
var Title = ToastTitle;
var Description = ToastDescription;
var Action = ToastAction;
var Close = ToastClose;
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs":
/*!************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCallbackRef: () => (/* binding */ useCallbackRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
// packages/react/use-callback-ref/src/useCallbackRef.tsx

function useCallbackRef(callback) {
  const callbackRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(callback);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    callbackRef.current = callback;
  });
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs":
/*!******************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useControllableState: () => (/* binding */ useControllableState)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-use-callback-ref */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs");
// packages/react/use-controllable-state/src/useControllableState.tsx


function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  }
}) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__.useCallbackRef)(onChange);
  const setValue = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue;
        const value2 = typeof nextValue === "function" ? setter(prop) : nextValue;
        if (value2 !== prop) handleChange(value2);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const uncontrolledState = react__WEBPACK_IMPORTED_MODULE_0__.useState(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(value);
  const handleChange = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__.useCallbackRef)(onChange);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);
  return uncontrolledState;
}

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs":
/*!**************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useEscapeKeydown: () => (/* binding */ useEscapeKeydown)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-use-callback-ref */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs");
// packages/react/use-escape-keydown/src/useEscapeKeydown.tsx


function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
  const onEscapeKeyDown = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__.useCallbackRef)(onEscapeKeyDownProp);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };
    ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [onEscapeKeyDown, ownerDocument]);
}

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs":
/*!*************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLayoutEffect: () => (/* binding */ useLayoutEffect2)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
// packages/react/use-layout-effect/src/useLayoutEffect.tsx

var useLayoutEffect2 = Boolean(globalThis?.document) ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : () => {
};

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs":
/*!***********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Root: () => (/* binding */ Root),
/* harmony export */   VisuallyHidden: () => (/* binding */ VisuallyHidden)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
// packages/react/visually-hidden/src/VisuallyHidden.tsx



var NAME = "VisuallyHidden";
var VisuallyHidden = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
      _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__.Primitive.span,
      {
        ...props,
        ref: forwardedRef,
        style: {
          // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
          position: "absolute",
          border: 0,
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          wordWrap: "normal",
          ...props.style
        }
      }
    );
  }
);
VisuallyHidden.displayName = NAME;
var Root = VisuallyHidden;

//# sourceMappingURL=index.mjs.map


/***/ })

};
;