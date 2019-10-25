webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./components/PostCard.js":
/*!********************************!*\
  !*** ./components/PostCard.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/post */ "./reducers/post.js");
/* harmony import */ var _PostCardContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PostCardContent */ "./components/PostCardContent.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







var PostCard = function PostCard(_ref) {
  var v = _ref.v;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      commentFormOpened = _useState[0],
      setCommentFormOpened = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      commentText = _useState2[0],
      setCommentText = _useState2[1];

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(function (state) {
    return state.user;
  }),
      me = _useSelector.me;

  var _useSelector2 = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(function (state) {
    return state.post;
  }),
      commentAdded = _useSelector2.commentAdded,
      isAddingComment = _useSelector2.isAddingComment;

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    setCommentText('');
  }, [commentAdded === true]);
  var onSubmitComment = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (e) {
    e.preventDefault();

    if (!me) {
      return alert('로그인이 필요합니다!');
    }

    return dispatch({
      type: _reducers_post__WEBPACK_IMPORTED_MODULE_4__["ADD_COMMENT_REQUEST"],
      data: {
        postId: v.id
      }
    });
  }, [me && me.id]);
  var onToggleComment = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (e) {
    setCommentFormOpened(function (prev) {
      return !prev;
    });
  }, []);
  var onChangeCommentText = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (e) {
    e.preventDefault();
    setCommentText(e.target.value);
  }, []);
  return __jsx("div", null, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    actions: [__jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      type: "retweet",
      key: "retweet"
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      type: "heart",
      key: "heart"
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      type: "message",
      key: "message",
      onClick: onToggleComment
    }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      type: "ellipsis",
      key: "ellipsis"
    })],
    extra: __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], null, "\uD314\uB85C\uC6B0")
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Card"].Meta, {
    avatar: __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Avatar"], null, v.User.nickname[0]),
    title: v.User.nickname,
    description: __jsx(_PostCardContent__WEBPACK_IMPORTED_MODULE_5__["default"], {
      postData: v.content
    })
  })), commentFormOpened && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Form"], {
    onSubmit: onSubmitComment
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Form"].Item, null, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Input"].TextArea, {
    rows: 4,
    value: commentText,
    onChange: onChangeCommentText
  })), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    type: "primary",
    htmlType: "submit",
    loading: isAddingComment
  }, "\uC090\uC57D")), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["List"], {
    header: "".concat(v.Comments ? v.Comments.length : 0, " \uB313\uAE00"),
    itemLayout: "horizontal",
    dataSource: v.Comments || [],
    renderItem: function renderItem(item) {
      return __jsx("li", null, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Comment"], {
        author: item.User.nickname,
        avatar: __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Avatar"], null, item.User.nickname[0]),
        content: item.content
      }));
    }
  })));
};

PostCard.propsTypes = {
  v: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    User: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    content: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    img: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    createdAt: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object
  })
};
/* harmony default export */ __webpack_exports__["default"] = (PostCard);

/***/ }),

/***/ "./components/PostCardContent.js":
/*!***************************************!*\
  !*** ./components/PostCardContent.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var PostCardContent = function PostCardContent(_ref) {
  var postData = _ref.postData;
  return __jsx("div", null, postData.split(/(#[^\s]+)/g).map(function (v) {
    if (v.match(/#[^\s]+/)) {
      return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        href: {
          pathname: '/hashtag',
          query: {
            tag: v.slice(1)
          }
        },
        as: "/hashtag/".concat(v.slice(1)),
        key: v
      }, __jsx("a", null, v));
    }

    return v;
  }));
};

PostCardContent.propTypes = {
  postData: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (PostCardContent);

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/user */ "./reducers/user.js");
/* harmony import */ var _components_PostForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PostForm */ "./components/PostForm.js");
/* harmony import */ var _components_PostCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PostCard */ "./components/PostCard.js");
/* harmony import */ var _reducers_post__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../reducers/post */ "./reducers/post.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;









var Home = function Home() {
  // redux의 state를 가져와 쓰는 방법
  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(function (state) {
    return state.user;
  }),
      me = _useSelector.me;

  var _useSelector2 = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(function (state) {
    return state.post;
  }),
      mainPosts = _useSelector2.mainPosts;

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    dispatch({
      type: _reducers_post__WEBPACK_IMPORTED_MODULE_7__["LOAD_MAIN_POSTS_REQUEST"]
    });
  }, []);
  return __jsx("div", null, me ? __jsx("div", null, "\uB85C\uADF8\uC778 \uD588\uC2B5\uB2C8\uB2E4: ", me.nickname) : __jsx("div", null, "\uB85C\uADF8\uC544\uC6C3 \uD588\uC2B5\uB2C8\uB2E4."), me && __jsx(_components_PostForm__WEBPACK_IMPORTED_MODULE_5__["default"], null), mainPosts.map(function (v, i) {
    return __jsx(_components_PostCard__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: +v.createdAt,
      v: v
    });
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

})
//# sourceMappingURL=index.js.eb2d2e68ad20797e6099.hot-update.js.map