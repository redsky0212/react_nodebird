webpackHotUpdate("static\\development\\pages\\_app.js",{

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_AppLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/AppLayout */ "./components/AppLayout.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next-redux-wrapper */ "./node_modules/next-redux-wrapper/es6/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../reducers */ "./reducers/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
/* harmony import */ var _sagas__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../sagas */ "./sagas/index.js");


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;











var NodeBird = function NodeBird(_ref) {
  var Component = _ref.Component,
      store = _ref.store;
  return __jsx(react_redux__WEBPACK_IMPORTED_MODULE_7__["Provider"], {
    store: store
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, null, __jsx("title", null, "\uB178\uB4DC\uBC84\uB4DC"), __jsx("link", {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.5/antd.min.css"
  })), __jsx(_components_AppLayout__WEBPACK_IMPORTED_MODULE_4__["default"], null, __jsx(Component, null)));
};

NodeBird.propTypes = {
  Component: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.elementType,
  store: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object
};

NodeBird.getInitialProps =
/*#__PURE__*/
function () {
  var _ref2 = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
  /*#__PURE__*/
  _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(context) {
    var ctx, Component, pageProps;
    return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(context);
            ctx = context.ctx, Component = context.Component;
            pageProps = {};

            if (!Component.getInitialProps) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return Component.getInitialProps(ctx);

          case 6:
            pageProps = _context.sent;

          case 7:
            return _context.abrupt("return", {
              pageProps: pageProps
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (Object(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_6__["default"])(function (initialState, options) {
  // 사가 미들웨어 추가
  var sagaMiddleware = Object(redux_saga__WEBPACK_IMPORTED_MODULE_10__["default"])(); // 커스터마이징 코드 추가

  var middlewares = [sagaMiddleware];
  var enhancer =  false ? undefined : Object(redux__WEBPACK_IMPORTED_MODULE_9__["compose"])(redux__WEBPACK_IMPORTED_MODULE_9__["applyMiddleware"].apply(void 0, middlewares), !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (f) {
    return f;
  });
  var store = Object(redux__WEBPACK_IMPORTED_MODULE_9__["createStore"])(_reducers__WEBPACK_IMPORTED_MODULE_8__["default"], initialState, enhancer);
  sagaMiddleware.run(_sagas__WEBPACK_IMPORTED_MODULE_11__["default"]);
  return store;
})(NodeBird));

/***/ })

})
//# sourceMappingURL=_app.js.a767fa83387cf65b7e0d.hot-update.js.map