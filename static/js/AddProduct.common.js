/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 744:
/***/ (function(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.Z = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject = require("vue");
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AddProduct.vue?vue&type=template&id=211962cd&lang=pug

const _hoisted_1 = {
  key: 0,
  class: "text-center m-4"
};
const _hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", {
  class: "spinner-border",
  role: "status"
}, [/*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", {
  class: "visually-hidden"
}, "Loading...")], -1);
const _hoisted_3 = [_hoisted_2];
const _hoisted_4 = {
  class: "container-fluid px-4"
};
const _hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", {
  class: "row g-0 mt-5 mb-4"
}, [/*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", {
  class: "col-12"
}, [/*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("h2", {
  class: "m-0"
}, "Add Product")])], -1);
const _hoisted_6 = {
  key: 0,
  class: "row g-4 mb-5"
};
const _hoisted_7 = {
  class: "col-12"
};
const _hoisted_8 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("label", {
  class: "form-label",
  for: "pCategory"
}, "Category", -1);
const _hoisted_9 = {
  class: "list-group categories"
};
const _hoisted_10 = ["onMouseover", "onMouseout", "onMousedown"];
const _hoisted_11 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_12 = {
  class: "col-12"
};
const _hoisted_13 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("label", {
  class: "form-label",
  for: "pTitle"
}, "Title", -1);
const _hoisted_14 = {
  class: "list-group titles"
};
const _hoisted_15 = ["onMouseover", "onMouseout", "onMousedown"];
const _hoisted_16 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_17 = {
  class: "col-12"
};
const _hoisted_18 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("label", {
  class: "form-label",
  for: "pImage"
}, "Image", -1);
const _hoisted_19 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_20 = {
  class: "col-12"
};
const _hoisted_21 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("label", {
  class: "form-label",
  for: "pInventory"
}, "Inventory", -1);
const _hoisted_22 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_23 = {
  class: "col-12"
};
const _hoisted_24 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("label", {
  class: "form-label",
  for: "pPrice"
}, "Price", -1);
const _hoisted_25 = {
  class: "input-group"
};
const _hoisted_26 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", {
  class: "input-group-text"
}, "$", -1);
const _hoisted_27 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_28 = {
  class: "col-12"
};
const _hoisted_29 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("label", {
  class: "form-label",
  for: "pDescription"
}, "Description", -1);
const _hoisted_30 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_31 = {
  class: "col-12"
};
const _hoisted_32 = {
  class: "form-check"
};
const _hoisted_33 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("label", {
  class: "form-check-label",
  for: "pShippable"
}, "Shippable", -1);
const _hoisted_34 = {
  class: "form-check"
};
const _hoisted_35 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("label", {
  class: "form-check-label",
  for: "pNotShippable"
}, "Not Shippable", -1);
const _hoisted_36 = {
  key: 0,
  class: "input-group"
};
const _hoisted_37 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("span", {
  class: "is-invalid"
}, null, -1);
const _hoisted_38 = {
  class: "invalid-feedback"
};
const _hoisted_39 = {
  class: "col-12"
};
const _hoisted_40 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("label", {
  class: "form-label",
  for: "pWeight"
}, "Weight (oz)", -1);
const _hoisted_41 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_42 = {
  class: "col-12 col-sm-4 pe-sm-3"
};
const _hoisted_43 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("label", {
  class: "form-label",
  for: "pWidth"
}, "Width (in)", -1);
const _hoisted_44 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_45 = {
  class: "col-12 col-sm-4 px-sm-3"
};
const _hoisted_46 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("label", {
  class: "form-label",
  for: "pLength"
}, "Length (in)", -1);
const _hoisted_47 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_48 = {
  class: "col-12 col-sm-4 ps-sm-3"
};
const _hoisted_49 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("label", {
  class: "form-label",
  for: "pHeight"
}, "Height (in)", -1);
const _hoisted_50 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_51 = {
  class: "col-12"
};
const _hoisted_52 = ["disabled"];
const _hoisted_53 = {
  key: 0,
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
};
const _hoisted_54 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createTextVNode)(" Add Product");
const _hoisted_55 = {
  key: 1,
  class: "alert alert-danger px-4 mb-5"
};
const _hoisted_56 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("p", {
  class: "mb-0"
}, "You must have sufficient privileges.", -1);
const _hoisted_57 = [_hoisted_56];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, [this.loading ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_1, _hoisted_3)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_4, [_hoisted_5, this.admin ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_6, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_7, [_hoisted_8, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
    type: "text",
    id: "pCategory",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.categoryError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "50",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => this.category = $event),
    onFocus: _cache[1] || (_cache[1] = (...args) => $options.handleCategoryFocus && $options.handleCategoryFocus(...args)),
    onBlur: _cache[2] || (_cache[2] = (...args) => $options.handleCategoryBlur && $options.handleCategoryBlur(...args)),
    onKeydown: [_cache[3] || (_cache[3] = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withKeys)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withModifiers)((...args) => $options.handleCategoryDown && $options.handleCategoryDown(...args), ["stop"]), ["down"])), _cache[4] || (_cache[4] = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withKeys)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withModifiers)((...args) => $options.handleCategoryUp && $options.handleCategoryUp(...args), ["stop"]), ["up"])), _cache[5] || (_cache[5] = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withKeys)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withModifiers)($event => $options.handleCategorySelect($event), ["stop"]), ["enter"]))],
    onKeyup: _cache[6] || (_cache[6] = (...args) => $options.handleCategoryFilter && $options.handleCategoryFilter(...args))
  }, null, 34), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, this.category]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("ul", _hoisted_9, [((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)($data.selectedCategories, (item, index) => {
    return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("li", {
      class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.activateCategory[index] ? 'list-group-item active' : 'list-group-item'),
      onMouseover: $event => $options.handleCategoryOver(index),
      onMouseout: $event => $options.handleCategoryOut(index),
      onMousedown: $event => $options.handleCategoryClick(item)
    }, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(item), 43, _hoisted_10);
  }), 256))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $data.showCategories]]), $data.categoryError ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_11, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)($data.categoryError), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_12, [_hoisted_13, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
    type: "text",
    id: "pTitle",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.titleError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "100",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => this.title = $event),
    onFocus: _cache[8] || (_cache[8] = (...args) => $options.handleTitleFocus && $options.handleTitleFocus(...args)),
    onBlur: _cache[9] || (_cache[9] = (...args) => $options.handleTitleBlur && $options.handleTitleBlur(...args)),
    onKeydown: [_cache[10] || (_cache[10] = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withKeys)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withModifiers)((...args) => $options.handleTitleDown && $options.handleTitleDown(...args), ["stop"]), ["down"])), _cache[11] || (_cache[11] = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withKeys)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withModifiers)((...args) => $options.handleTitleUp && $options.handleTitleUp(...args), ["stop"]), ["up"])), _cache[12] || (_cache[12] = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withKeys)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withModifiers)($event => $options.handleTitleSelect($event), ["stop"]), ["enter"]))],
    onKeyup: _cache[13] || (_cache[13] = (...args) => $options.handleTitleFilter && $options.handleTitleFilter(...args))
  }, null, 34), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, this.title]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("ul", _hoisted_14, [((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)($data.selectedTitles, (item, index) => {
    return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("li", {
      class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.activateTitle[index] ? 'list-group-item active' : 'list-group-item'),
      onMouseover: $event => $options.handleTitleOver(index),
      onMouseout: $event => $options.handleTitleOut(index),
      onMousedown: $event => $options.handleTitleClick(item)
    }, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)(item), 43, _hoisted_15);
  }), 256))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vShow, $data.showTitles]]), $data.titleError ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_16, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)($data.titleError), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_17, [_hoisted_18, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
    type: "file",
    id: "pImage",
    name: "pImage",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.imageError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "100",
    autocomplete: "off",
    accept: "image/*",
    onChange: _cache[14] || (_cache[14] = e => this.image = e.target.value)
  }, null, 34), $data.imageError ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_19, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)($data.imageError), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_20, [_hoisted_21, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
    type: "text",
    id: "pInventory",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.inventoryError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "50",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => this.inventory = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, this.inventory]]), $data.inventoryError ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_22, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)($data.inventoryError), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_23, [_hoisted_24, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_25, [_hoisted_26, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
    type: "text",
    id: "pPrice",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.priceError ? 'form-control rounded-end is-invalid' : 'form-control'),
    maxlength: "50",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => this.price = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, this.price]]), $data.priceError ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_27, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)($data.priceError), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_28, [_hoisted_29, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("textarea", {
    id: "pDescription",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.descriptionError ? 'form-control is-invalid' : 'form-control'),
    rows: "3",
    "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => this.description = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, this.description]]), $data.descriptionError ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_30, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)($data.descriptionError), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_31, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_32, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
    id: "pShippable",
    name: "pShippable",
    type: "radio",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.shippableError ? 'form-check-input is-invalid' : 'form-check-input'),
    "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => this.shippable = $event),
    value: "true"
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelRadio, this.shippable]]), _hoisted_33]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_34, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
    id: "pNotShippable",
    name: "pShippable",
    type: "radio",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.shippableError ? 'form-check-input is-invalid' : 'form-check-input'),
    "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => this.shippable = $event),
    value: "false"
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelRadio, this.shippable]]), _hoisted_35]), $data.shippableError ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_36, [_hoisted_37, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_38, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)($data.shippableError), 1)])) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_39, [_hoisted_40, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
    type: "text",
    id: "pWeight",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.weightError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "50",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[20] || (_cache[20] = $event => this.weight = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, this.weight]]), $data.weightError ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_41, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)($data.weightError), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_42, [_hoisted_43, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
    type: "text",
    id: "pWidth",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.widthError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "50",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[21] || (_cache[21] = $event => this.pwidth = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, this.pwidth]]), $data.widthError ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_44, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)($data.widthError), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_45, [_hoisted_46, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
    type: "text",
    id: "pLength",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.lengthError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "50",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[22] || (_cache[22] = $event => this.plength = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, this.plength]]), $data.lengthError ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_47, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)($data.lengthError), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_48, [_hoisted_49, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("input", {
    type: "text",
    id: "pHeight",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)($data.heightError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "50",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[23] || (_cache[23] = $event => this.pheight = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.vModelText, this.pheight]]), $data.heightError ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_50, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.toDisplayString)($data.heightError), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("div", _hoisted_51, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("button", {
    class: "btn btn-secondary btn-lg",
    id: "addProduct",
    type: "button",
    onClick: _cache[24] || (_cache[24] = (...args) => $options.handleAddProductButton && $options.handleAddProductButton(...args)),
    disabled: !this.admin
  }, [$props.loading ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("span", _hoisted_53)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true), _hoisted_54], 8, _hoisted_52)])])) : ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", _hoisted_55, _hoisted_57))])], 64);
}
;// CONCATENATED MODULE: ./src/components/AddProduct.vue?vue&type=template&id=211962cd&lang=pug

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AddProduct.vue?vue&type=script&lang=js
/* harmony default export */ var AddProductvue_type_script_lang_js = ({
  props: ['username', 'quantity', 'totalItems', 'width', 'cart', 'stripeKey', 'admin', 'loading', 'costs', 'errors', 'categories', 'listings'],
  emits: ['quantity', 'addToCart', 'getError', 'SendData', 'DeleteProduct', 'Checkout', 'clearCart'],
  data() {
    return {
      title: '',
      image: '',
      inventory: '',
      category: '',
      price: '',
      description: '',
      shippable: false,
      weight: '',
      pwidth: '',
      plength: '',
      pheight: '',
      titleError: '',
      imageError: '',
      inventoryError: '',
      categoryError: '',
      priceError: '',
      descriptionError: '',
      shippableError: '',
      weightError: '',
      widthError: '',
      lengthError: '',
      heightError: '',
      showCategories: false,
      activateCategory: [],
      categoryIndex: -1,
      selectedCategories: [],
      showTitles: false,
      activateTitle: [],
      titleIndex: -1,
      selectedTitles: []
    };
  },
  watch: {},
  mounted() {
    this.$emit('getError', '');
  },
  methods: {
    validTitle() {
      if (!/^[A-Za-z0-9 \-'".,?!]{1,100}$/.test(this.title) || /static/.test(this.title)) {
        this.titleError = "Can contain A-Z, a-z, 0-9, spaces, and .,?!'\"-.";
        return false;
      } else {
        this.titleError = "";
        return true;
      }
    },
    validImage() {
      if (this.image && !/^[A-Za-z0-9 \-'.,\\:]{1,100}$/.test(this.image)) {
        this.imageError = "Can contain A-Z, a-z, 0-9, spaces, and '.,-.";
        return false;
      } else {
        this.imageError = "";
        return true;
      }
    },
    validInventory() {
      if (!/^[0-9]{0,4}$/.test(this.inventory)) {
        this.inventoryError = "Format must be in XXXX.";
        return false;
      } else {
        this.inventoryError = "";
        return true;
      }
    },
    validCategory() {
      if (!/^[A-Za-z0-9 \-'".,?!]{1,50}$/.test(this.category) || /static/.test(this.category)) {
        this.categoryError = "Can contain A-Z, a-z, 0-9, spaces, and .,?!'\"-.";
        return false;
      } else {
        this.categoryError = "";
        return true;
      }
    },
    validPrice() {
      if (this.price === '' || !/^[0-9]{0,4}(\.[0-9]{1,2})?$/.test(this.price)) {
        this.priceError = "Format must be in XXXX.XX.";
        return false;
      } else {
        this.priceError = "";
        return true;
      }
    },
    validDescription() {
      if (!/^[A-Za-z0-9 \-,.!?:;'"#@$%\s]{0,150}$/.test(this.description)) {
        this.descriptionError = "Can be 0 to 150 characters in length.";
        return false;
      } else {
        this.descriptionError = "";
        return true;
      }
    },
    validShippable() {
      if (!/^(true|false)$/.test(this.shippable)) {
        this.shippableError = "Can be true or false.";
        return false;
      } else {
        this.shippableError = "";
        return true;
      }
    },
    validWeight() {
      if (!/^[0-9]{0,4}$/.test(this.weight)) {
        this.weightError = "Format must be in XXXX.";
        return false;
      } else if (this.shippable === "true" && (!this.weight || parseInt(this.weight, 10) === 0)) {
        this.weightError = "Must be a non-zero value.";
        return false;
      } else {
        this.weightError = "";
        return true;
      }
    },
    validWidth() {
      if (!/^[0-9]{0,4}$/.test(this.pwidth)) {
        this.widthError = "Format must be in XXXX.";
        return false;
      } else if (this.shippable === "true" && (!this.pwidth || parseInt(this.pwidth, 10) === 0)) {
        this.widthError = "Must be a non-zero value.";
        return false;
      } else {
        this.widthError = "";
        return true;
      }
    },
    validLength() {
      if (!/^[0-9]{0,4}$/.test(this.plength)) {
        this.lengthError = "Format must be in XXXX.";
        return false;
      } else if (this.shippable === "true" && (!this.plength || parseInt(this.plength, 10) === 0)) {
        this.lengthError = "Must be a non-zero value.";
        return false;
      } else {
        this.lengthError = "";
        return true;
      }
    },
    validHeight() {
      if (!/^[0-9]{0,4}$/.test(this.pheight)) {
        this.heightError = "Format must be in XXXX.";
        return false;
      } else if (this.shippable === "true" && (!this.pheight || parseInt(this.pheight, 10) === 0)) {
        this.heightError = "Must be a non-zero value.";
        return false;
      } else {
        this.heightError = "";
        return true;
      }
    },
    handleCategoryFocus() {
      this.showCategories = true;
      if (this.selectedCategories.length === 0) {
        this.selectedCategories = this.categories.slice(0, 5);
      }
    },
    handleCategoryBlur() {
      this.showCategories = false;
    },
    handleCategoryOver(index) {
      this.activateCategory[index] = true;
      this.categoryIndex = index;
    },
    handleCategoryOut(index) {
      this.activateCategory[index] = false;
    },
    handleCategoryClick(category) {
      this.category = category;
    },
    handleCategoryDown() {
      for (var i = 0; i < this.selectedCategories.length; i++) {
        this.activateCategory[i] = false;
      }
      if (this.categoryIndex + 1 > this.selectedCategories.length) {
        this.categoryIndex = 0;
      } else {
        this.categoryIndex++;
      }
      this.activateCategory[this.categoryIndex] = true;
    },
    handleCategoryUp() {
      for (var i = 0; i < this.selectedCategories.length; i++) {
        this.activateCategory[i] = false;
      }
      if (this.categoryIndex - 1 < 0) {
        this.categoryIndex = this.selectedCategories.length;
      } else {
        this.categoryIndex--;
      }
      this.activateCategory[this.categoryIndex] = true;
    },
    handleCategorySelect(event) {
      if (this.categoryIndex >= 0 && this.categoryIndex < this.selectedCategories.length) {
        this.category = this.selectedCategories[this.categoryIndex];
      }
      event.currentTarget.blur();
    },
    handleCategoryFilter() {
      this.selectedCategories = [];
      for (var i = 0; i < this.categories.length; i++) {
        if (this.categories[i].indexOf(this.category) !== -1) {
          this.selectedCategories.push(this.categories[i]);
        }
      }
      this.selectedCategories = this.selectedCategories.slice(0, 5);
    },
    handleTitleFocus() {
      this.showTitles = true;
      var titles = [];
      if (this.selectedTitles.length === 0) {
        for (var i = 0; i < this.listings.length; i++) {
          for (var j = 0; j < this.listings[i].length; j++) {
            titles.push(this.listings[i][j].title);
          }
        }
        this.selectedTitles = titles.slice(0, 5);
      }
    },
    handleTitleBlur() {
      this.showTitles = false;
    },
    handleTitleOver(index) {
      this.activateTitle[index] = true;
      this.titleIndex = index;
    },
    handleTitleOut(index) {
      this.activateTitle[index] = false;
    },
    handleTitleClick(title) {
      this.title = title;
    },
    handleTitleDown() {
      for (var i = 0; i < this.selectedTitles.length; i++) {
        this.activateTitle[i] = false;
      }
      if (this.titleIndex + 1 > this.selectedTitles.length) {
        this.titleIndex = 0;
      } else {
        this.titleIndex++;
      }
      this.activateTitle[this.titleIndex] = true;
    },
    handleTitleUp() {
      for (var i = 0; i < this.selectedTitles.length; i++) {
        this.activateTitle[i] = false;
      }
      if (this.titleIndex - 1 < 0) {
        this.titleIndex = this.selectedTitle.length;
      } else {
        this.titleIndex--;
      }
      this.activateTitle[this.titleIndex] = true;
    },
    handleTitleSelect(event) {
      if (this.titleIndex >= 0 && this.titleIndex < this.selectedTitles.length) {
        this.title = this.selectedTitles[this.titleIndex];
      }
      event.currentTarget.blur();
    },
    handleTitleFilter() {
      this.selectedTitles = [];
      for (var i = 0; i < this.listings.length; i++) {
        for (var j = 0; j < this.listings[i].length; j++) {
          if (this.listings[i][j].title.indexOf(this.title) !== -1) {
            this.selectedTitles.push(this.listings[i][j].title);
          }
        }
      }
      this.selectedTitles = this.selectedTitles.slice(0, 5);
    },
    handleAddProductButton() {
      var validTitle = this.validTitle();
      var validImage = this.validImage();
      var validInventory = this.validInventory();
      var validCategory = this.validCategory();
      var validPrice = this.validPrice();
      var validDescription = this.validDescription();
      var validShippable = this.validShippable();
      var validWeight = this.validWeight();
      var validWidth = this.validWidth();
      var validLength = this.validLength();
      var validHeight = this.validHeight();
      if (validTitle && validImage && validInventory && validCategory && validPrice && validDescription && validShippable && validWeight && validWidth && validLength && validHeight) {
        this.$emit('getError', '');
        this.$emit('SendData', {
          title: this.title,
          image: this.image,
          inventory: this.inventory,
          category: this.category,
          price: this.price,
          description: this.description,
          shippable: this.shippable,
          weight: this.weight,
          width: this.pwidth,
          length: this.plength,
          height: this.pheight
        });
      } else {
        this.$emit('getError', "There are errors in the Add Product form.");
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/AddProduct.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(744);
;// CONCATENATED MODULE: ./src/components/AddProduct.vue




;
const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(AddProductvue_type_script_lang_js, [['render',render]])

/* harmony default export */ var AddProduct = (__exports__);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (AddProduct);


}();
module.exports = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=AddProduct.common.js.map