module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "6b0d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.default = (sfc, props) => {
    for (const [key, val] of props) {
        sfc[key] = val;
    }
    return sfc;
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "9dcd":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 *  big.js v6.2.1
 *  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
 *  Copyright (c) 2022 Michael Mclaughlin
 *  https://github.com/MikeMcl/big.js/LICENCE.md
 */
;(function (GLOBAL) {
  'use strict';
  var Big,


/************************************** EDITABLE DEFAULTS *****************************************/


    // The default values below must be integers within the stated ranges.

    /*
     * The maximum number of decimal places (DP) of the results of operations involving division:
     * div and sqrt, and pow with negative exponents.
     */
    DP = 20,            // 0 to MAX_DP

    /*
     * The rounding mode (RM) used when rounding to the above decimal places.
     *
     *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
     *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
     *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
     *  3  Away from zero.                                  (ROUND_UP)
     */
    RM = 1,             // 0, 1, 2 or 3

    // The maximum value of DP and Big.DP.
    MAX_DP = 1E6,       // 0 to 1000000

    // The maximum magnitude of the exponent argument to the pow method.
    MAX_POWER = 1E6,    // 1 to 1000000

    /*
     * The negative exponent (NE) at and beneath which toString returns exponential notation.
     * (JavaScript numbers: -7)
     * -1000000 is the minimum recommended exponent value of a Big.
     */
    NE = -7,            // 0 to -1000000

    /*
     * The positive exponent (PE) at and above which toString returns exponential notation.
     * (JavaScript numbers: 21)
     * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
     */
    PE = 21,            // 0 to 1000000

    /*
     * When true, an error will be thrown if a primitive number is passed to the Big constructor,
     * or if valueOf is called, or if toNumber is called on a Big which cannot be converted to a
     * primitive number without a loss of precision.
     */
    STRICT = false,     // true or false


/**************************************************************************************************/


    // Error messages.
    NAME = '[big.js] ',
    INVALID = NAME + 'Invalid ',
    INVALID_DP = INVALID + 'decimal places',
    INVALID_RM = INVALID + 'rounding mode',
    DIV_BY_ZERO = NAME + 'Division by zero',

    // The shared prototype object.
    P = {},
    UNDEFINED = void 0,
    NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;


  /*
   * Create and return a Big constructor.
   */
  function _Big_() {

    /*
     * The Big constructor and exported function.
     * Create and return a new instance of a Big number object.
     *
     * n {number|string|Big} A numeric value.
     */
    function Big(n) {
      var x = this;

      // Enable constructor usage without new.
      if (!(x instanceof Big)) return n === UNDEFINED ? _Big_() : new Big(n);

      // Duplicate.
      if (n instanceof Big) {
        x.s = n.s;
        x.e = n.e;
        x.c = n.c.slice();
      } else {
        if (typeof n !== 'string') {
          if (Big.strict === true && typeof n !== 'bigint') {
            throw TypeError(INVALID + 'value');
          }

          // Minus zero?
          n = n === 0 && 1 / n < 0 ? '-0' : String(n);
        }

        parse(x, n);
      }

      // Retain a reference to this Big constructor.
      // Shadow Big.prototype.constructor which points to Object.
      x.constructor = Big;
    }

    Big.prototype = P;
    Big.DP = DP;
    Big.RM = RM;
    Big.NE = NE;
    Big.PE = PE;
    Big.strict = STRICT;
    Big.roundDown = 0;
    Big.roundHalfUp = 1;
    Big.roundHalfEven = 2;
    Big.roundUp = 3;

    return Big;
  }


  /*
   * Parse the number or string value passed to a Big constructor.
   *
   * x {Big} A Big number instance.
   * n {number|string} A numeric value.
   */
  function parse(x, n) {
    var e, i, nl;

    if (!NUMERIC.test(n)) {
      throw Error(INVALID + 'number');
    }

    // Determine sign.
    x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

    // Decimal point?
    if ((e = n.indexOf('.')) > -1) n = n.replace('.', '');

    // Exponential form?
    if ((i = n.search(/e/i)) > 0) {

      // Determine exponent.
      if (e < 0) e = i;
      e += +n.slice(i + 1);
      n = n.substring(0, i);
    } else if (e < 0) {

      // Integer.
      e = n.length;
    }

    nl = n.length;

    // Determine leading zeros.
    for (i = 0; i < nl && n.charAt(i) == '0';) ++i;

    if (i == nl) {

      // Zero.
      x.c = [x.e = 0];
    } else {

      // Determine trailing zeros.
      for (; nl > 0 && n.charAt(--nl) == '0';);
      x.e = e - i - 1;
      x.c = [];

      // Convert string to array of digits without leading/trailing zeros.
      for (e = 0; i <= nl;) x.c[e++] = +n.charAt(i++);
    }

    return x;
  }


  /*
   * Round Big x to a maximum of sd significant digits using rounding mode rm.
   *
   * x {Big} The Big to round.
   * sd {number} Significant digits: integer, 0 to MAX_DP inclusive.
   * rm {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   * [more] {boolean} Whether the result of division was truncated.
   */
  function round(x, sd, rm, more) {
    var xc = x.c;

    if (rm === UNDEFINED) rm = x.constructor.RM;
    if (rm !== 0 && rm !== 1 && rm !== 2 && rm !== 3) {
      throw Error(INVALID_RM);
    }

    if (sd < 1) {
      more =
        rm === 3 && (more || !!xc[0]) || sd === 0 && (
        rm === 1 && xc[0] >= 5 ||
        rm === 2 && (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED))
      );

      xc.length = 1;

      if (more) {

        // 1, 0.1, 0.01, 0.001, 0.0001 etc.
        x.e = x.e - sd + 1;
        xc[0] = 1;
      } else {

        // Zero.
        xc[0] = x.e = 0;
      }
    } else if (sd < xc.length) {

      // xc[sd] is the digit after the digit that may be rounded up.
      more =
        rm === 1 && xc[sd] >= 5 ||
        rm === 2 && (xc[sd] > 5 || xc[sd] === 5 &&
          (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) ||
        rm === 3 && (more || !!xc[0]);

      // Remove any digits after the required precision.
      xc.length = sd;

      // Round up?
      if (more) {

        // Rounding up may mean the previous digit has to be rounded up.
        for (; ++xc[--sd] > 9;) {
          xc[sd] = 0;
          if (sd === 0) {
            ++x.e;
            xc.unshift(1);
            break;
          }
        }
      }

      // Remove trailing zeros.
      for (sd = xc.length; !xc[--sd];) xc.pop();
    }

    return x;
  }


  /*
   * Return a string representing the value of Big x in normal or exponential notation.
   * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
   */
  function stringify(x, doExponential, isNonzero) {
    var e = x.e,
      s = x.c.join(''),
      n = s.length;

    // Exponential notation?
    if (doExponential) {
      s = s.charAt(0) + (n > 1 ? '.' + s.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e;

    // Normal notation.
    } else if (e < 0) {
      for (; ++e;) s = '0' + s;
      s = '0.' + s;
    } else if (e > 0) {
      if (++e > n) {
        for (e -= n; e--;) s += '0';
      } else if (e < n) {
        s = s.slice(0, e) + '.' + s.slice(e);
      }
    } else if (n > 1) {
      s = s.charAt(0) + '.' + s.slice(1);
    }

    return x.s < 0 && isNonzero ? '-' + s : s;
  }


  // Prototype/instance methods


  /*
   * Return a new Big whose value is the absolute value of this Big.
   */
  P.abs = function () {
    var x = new this.constructor(this);
    x.s = 1;
    return x;
  };


  /*
   * Return 1 if the value of this Big is greater than the value of Big y,
   *       -1 if the value of this Big is less than the value of Big y, or
   *        0 if they have the same value.
   */
  P.cmp = function (y) {
    var isneg,
      x = this,
      xc = x.c,
      yc = (y = new x.constructor(y)).c,
      i = x.s,
      j = y.s,
      k = x.e,
      l = y.e;

    // Either zero?
    if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;

    // Signs differ?
    if (i != j) return i;

    isneg = i < 0;

    // Compare exponents.
    if (k != l) return k > l ^ isneg ? 1 : -1;

    j = (k = xc.length) < (l = yc.length) ? k : l;

    // Compare digit by digit.
    for (i = -1; ++i < j;) {
      if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
    }

    // Compare lengths.
    return k == l ? 0 : k > l ^ isneg ? 1 : -1;
  };


  /*
   * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,
   * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */
  P.div = function (y) {
    var x = this,
      Big = x.constructor,
      a = x.c,                  // dividend
      b = (y = new Big(y)).c,   // divisor
      k = x.s == y.s ? 1 : -1,
      dp = Big.DP;

    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }

    // Divisor is zero?
    if (!b[0]) {
      throw Error(DIV_BY_ZERO);
    }

    // Dividend is 0? Return +-0.
    if (!a[0]) {
      y.s = k;
      y.c = [y.e = 0];
      return y;
    }

    var bl, bt, n, cmp, ri,
      bz = b.slice(),
      ai = bl = b.length,
      al = a.length,
      r = a.slice(0, bl),   // remainder
      rl = r.length,
      q = y,                // quotient
      qc = q.c = [],
      qi = 0,
      p = dp + (q.e = x.e - y.e) + 1;    // precision of the result

    q.s = k;
    k = p < 0 ? 0 : p;

    // Create version of divisor with leading zero.
    bz.unshift(0);

    // Add zeros to make remainder as long as divisor.
    for (; rl++ < bl;) r.push(0);

    do {

      // n is how many times the divisor goes into current remainder.
      for (n = 0; n < 10; n++) {

        // Compare divisor and remainder.
        if (bl != (rl = r.length)) {
          cmp = bl > rl ? 1 : -1;
        } else {
          for (ri = -1, cmp = 0; ++ri < bl;) {
            if (b[ri] != r[ri]) {
              cmp = b[ri] > r[ri] ? 1 : -1;
              break;
            }
          }
        }

        // If divisor < remainder, subtract divisor from remainder.
        if (cmp < 0) {

          // Remainder can't be more than 1 digit longer than divisor.
          // Equalise lengths using divisor with extra leading zero?
          for (bt = rl == bl ? b : bz; rl;) {
            if (r[--rl] < bt[rl]) {
              ri = rl;
              for (; ri && !r[--ri];) r[ri] = 9;
              --r[ri];
              r[rl] += 10;
            }
            r[rl] -= bt[rl];
          }

          for (; !r[0];) r.shift();
        } else {
          break;
        }
      }

      // Add the digit n to the result array.
      qc[qi++] = cmp ? n : ++n;

      // Update the remainder.
      if (r[0] && cmp) r[rl] = a[ai] || 0;
      else r = [a[ai]];

    } while ((ai++ < al || r[0] !== UNDEFINED) && k--);

    // Leading zero? Do not remove if result is simply zero (qi == 1).
    if (!qc[0] && qi != 1) {

      // There can't be more than one zero.
      qc.shift();
      q.e--;
      p--;
    }

    // Round?
    if (qi > p) round(q, p, Big.RM, r[0] !== UNDEFINED);

    return q;
  };


  /*
   * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
   */
  P.eq = function (y) {
    return this.cmp(y) === 0;
  };


  /*
   * Return true if the value of this Big is greater than the value of Big y, otherwise return
   * false.
   */
  P.gt = function (y) {
    return this.cmp(y) > 0;
  };


  /*
   * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
   * return false.
   */
  P.gte = function (y) {
    return this.cmp(y) > -1;
  };


  /*
   * Return true if the value of this Big is less than the value of Big y, otherwise return false.
   */
  P.lt = function (y) {
    return this.cmp(y) < 0;
  };


  /*
   * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
   * return false.
   */
  P.lte = function (y) {
    return this.cmp(y) < 1;
  };


  /*
   * Return a new Big whose value is the value of this Big minus the value of Big y.
   */
  P.minus = P.sub = function (y) {
    var i, j, t, xlty,
      x = this,
      Big = x.constructor,
      a = x.s,
      b = (y = new Big(y)).s;

    // Signs differ?
    if (a != b) {
      y.s = -b;
      return x.plus(y);
    }

    var xc = x.c.slice(),
      xe = x.e,
      yc = y.c,
      ye = y.e;

    // Either zero?
    if (!xc[0] || !yc[0]) {
      if (yc[0]) {
        y.s = -b;
      } else if (xc[0]) {
        y = new Big(x);
      } else {
        y.s = 1;
      }
      return y;
    }

    // Determine which is the bigger number. Prepend zeros to equalise exponents.
    if (a = xe - ye) {

      if (xlty = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t = yc;
      }

      t.reverse();
      for (b = a; b--;) t.push(0);
      t.reverse();
    } else {

      // Exponents equal. Check digit by digit.
      j = ((xlty = xc.length < yc.length) ? xc : yc).length;

      for (a = b = 0; b < j; b++) {
        if (xc[b] != yc[b]) {
          xlty = xc[b] < yc[b];
          break;
        }
      }
    }

    // x < y? Point xc to the array of the bigger number.
    if (xlty) {
      t = xc;
      xc = yc;
      yc = t;
      y.s = -y.s;
    }

    /*
     * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
     * needs to start at yc.length.
     */
    if ((b = (j = yc.length) - (i = xc.length)) > 0) for (; b--;) xc[i++] = 0;

    // Subtract yc from xc.
    for (b = i; j > a;) {
      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i];) xc[i] = 9;
        --xc[i];
        xc[j] += 10;
      }

      xc[j] -= yc[j];
    }

    // Remove trailing zeros.
    for (; xc[--b] === 0;) xc.pop();

    // Remove leading zeros and adjust exponent accordingly.
    for (; xc[0] === 0;) {
      xc.shift();
      --ye;
    }

    if (!xc[0]) {

      // n - n = +0
      y.s = 1;

      // Result must be zero.
      xc = [ye = 0];
    }

    y.c = xc;
    y.e = ye;

    return y;
  };


  /*
   * Return a new Big whose value is the value of this Big modulo the value of Big y.
   */
  P.mod = function (y) {
    var ygtx,
      x = this,
      Big = x.constructor,
      a = x.s,
      b = (y = new Big(y)).s;

    if (!y.c[0]) {
      throw Error(DIV_BY_ZERO);
    }

    x.s = y.s = 1;
    ygtx = y.cmp(x) == 1;
    x.s = a;
    y.s = b;

    if (ygtx) return new Big(x);

    a = Big.DP;
    b = Big.RM;
    Big.DP = Big.RM = 0;
    x = x.div(y);
    Big.DP = a;
    Big.RM = b;

    return this.minus(x.times(y));
  };
  
  
  /*
   * Return a new Big whose value is the value of this Big negated.
   */
  P.neg = function () {
    var x = new this.constructor(this);
    x.s = -x.s;
    return x;
  };


  /*
   * Return a new Big whose value is the value of this Big plus the value of Big y.
   */
  P.plus = P.add = function (y) {
    var e, k, t,
      x = this,
      Big = x.constructor;

    y = new Big(y);

    // Signs differ?
    if (x.s != y.s) {
      y.s = -y.s;
      return x.minus(y);
    }

    var xe = x.e,
      xc = x.c,
      ye = y.e,
      yc = y.c;

    // Either zero?
    if (!xc[0] || !yc[0]) {
      if (!yc[0]) {
        if (xc[0]) {
          y = new Big(x);
        } else {
          y.s = x.s;
        }
      }
      return y;
    }

    xc = xc.slice();

    // Prepend zeros to equalise exponents.
    // Note: reverse faster than unshifts.
    if (e = xe - ye) {
      if (e > 0) {
        ye = xe;
        t = yc;
      } else {
        e = -e;
        t = xc;
      }

      t.reverse();
      for (; e--;) t.push(0);
      t.reverse();
    }

    // Point xc to the longer array.
    if (xc.length - yc.length < 0) {
      t = yc;
      yc = xc;
      xc = t;
    }

    e = yc.length;

    // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
    for (k = 0; e; xc[e] %= 10) k = (xc[--e] = xc[e] + yc[e] + k) / 10 | 0;

    // No need to check for zero, as +x + +y != 0 && -x + -y != 0

    if (k) {
      xc.unshift(k);
      ++ye;
    }

    // Remove trailing zeros.
    for (e = xc.length; xc[--e] === 0;) xc.pop();

    y.c = xc;
    y.e = ye;

    return y;
  };


  /*
   * Return a Big whose value is the value of this Big raised to the power n.
   * If n is negative, round to a maximum of Big.DP decimal places using rounding
   * mode Big.RM.
   *
   * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
   */
  P.pow = function (n) {
    var x = this,
      one = new x.constructor('1'),
      y = one,
      isneg = n < 0;

    if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
      throw Error(INVALID + 'exponent');
    }

    if (isneg) n = -n;

    for (;;) {
      if (n & 1) y = y.times(x);
      n >>= 1;
      if (!n) break;
      x = x.times(x);
    }

    return isneg ? one.div(y) : y;
  };


  /*
   * Return a new Big whose value is the value of this Big rounded to a maximum precision of sd
   * significant digits using rounding mode rm, or Big.RM if rm is not specified.
   *
   * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */
  P.prec = function (sd, rm) {
    if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
      throw Error(INVALID + 'precision');
    }
    return round(new this.constructor(this), sd, rm);
  };


  /*
   * Return a new Big whose value is the value of this Big rounded to a maximum of dp decimal places
   * using rounding mode rm, or Big.RM if rm is not specified.
   * If dp is negative, round to an integer which is a multiple of 10**-dp.
   * If dp is not specified, round to 0 decimal places.
   *
   * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */
  P.round = function (dp, rm) {
    if (dp === UNDEFINED) dp = 0;
    else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    return round(new this.constructor(this), dp + this.e + 1, rm);
  };


  /*
   * Return a new Big whose value is the square root of the value of this Big, rounded, if
   * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */
  P.sqrt = function () {
    var r, c, t,
      x = this,
      Big = x.constructor,
      s = x.s,
      e = x.e,
      half = new Big('0.5');

    // Zero?
    if (!x.c[0]) return new Big(x);

    // Negative?
    if (s < 0) {
      throw Error(NAME + 'No square root');
    }

    // Estimate.
    s = Math.sqrt(x + '');

    // Math.sqrt underflow/overflow?
    // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
    if (s === 0 || s === 1 / 0) {
      c = x.c.join('');
      if (!(c.length + e & 1)) c += '0';
      s = Math.sqrt(c);
      e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
      r = new Big((s == 1 / 0 ? '5e' : (s = s.toExponential()).slice(0, s.indexOf('e') + 1)) + e);
    } else {
      r = new Big(s + '');
    }

    e = r.e + (Big.DP += 4);

    // Newton-Raphson iteration.
    do {
      t = r;
      r = half.times(t.plus(x.div(t)));
    } while (t.c.slice(0, e).join('') !== r.c.slice(0, e).join(''));

    return round(r, (Big.DP -= 4) + r.e + 1, Big.RM);
  };


  /*
   * Return a new Big whose value is the value of this Big times the value of Big y.
   */
  P.times = P.mul = function (y) {
    var c,
      x = this,
      Big = x.constructor,
      xc = x.c,
      yc = (y = new Big(y)).c,
      a = xc.length,
      b = yc.length,
      i = x.e,
      j = y.e;

    // Determine sign of result.
    y.s = x.s == y.s ? 1 : -1;

    // Return signed 0 if either 0.
    if (!xc[0] || !yc[0]) {
      y.c = [y.e = 0];
      return y;
    }

    // Initialise exponent of result as x.e + y.e.
    y.e = i + j;

    // If array xc has fewer digits than yc, swap xc and yc, and lengths.
    if (a < b) {
      c = xc;
      xc = yc;
      yc = c;
      j = a;
      a = b;
      b = j;
    }

    // Initialise coefficient array of result with zeros.
    for (c = new Array(j = a + b); j--;) c[j] = 0;

    // Multiply.

    // i is initially xc.length.
    for (i = b; i--;) {
      b = 0;

      // a is yc.length.
      for (j = a + i; j > i;) {

        // Current sum of products at this digit position, plus carry.
        b = c[j] + yc[i] * xc[j - i - 1] + b;
        c[j--] = b % 10;

        // carry
        b = b / 10 | 0;
      }

      c[j] = b;
    }

    // Increment result exponent if there is a final carry, otherwise remove leading zero.
    if (b) ++y.e;
    else c.shift();

    // Remove trailing zeros.
    for (i = c.length; !c[--i];) c.pop();
    y.c = c;

    return y;
  };


  /*
   * Return a string representing the value of this Big in exponential notation rounded to dp fixed
   * decimal places using rounding mode rm, or Big.RM if rm is not specified.
   *
   * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */
  P.toExponential = function (dp, rm) {
    var x = this,
      n = x.c[0];

    if (dp !== UNDEFINED) {
      if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
        throw Error(INVALID_DP);
      }
      x = round(new x.constructor(x), ++dp, rm);
      for (; x.c.length < dp;) x.c.push(0);
    }

    return stringify(x, true, !!n);
  };


  /*
   * Return a string representing the value of this Big in normal notation rounded to dp fixed
   * decimal places using rounding mode rm, or Big.RM if rm is not specified.
   *
   * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   */
  P.toFixed = function (dp, rm) {
    var x = this,
      n = x.c[0];

    if (dp !== UNDEFINED) {
      if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
        throw Error(INVALID_DP);
      }
      x = round(new x.constructor(x), dp + x.e + 1, rm);

      // x.e may have changed if the value is rounded up.
      for (dp = dp + x.e + 1; x.c.length < dp;) x.c.push(0);
    }

    return stringify(x, false, !!n);
  };


  /*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Omit the sign for negative zero.
   */
  P.toJSON = P.toString = function () {
    var x = this,
      Big = x.constructor;
    return stringify(x, x.e <= Big.NE || x.e >= Big.PE, !!x.c[0]);
  };


  /*
   * Return the value of this Big as a primitve number.
   */
  P.toNumber = function () {
    var n = Number(stringify(this, true, true));
    if (this.constructor.strict === true && !this.eq(n.toString())) {
      throw Error(NAME + 'Imprecise conversion');
    }
    return n;
  };


  /*
   * Return a string representing the value of this Big rounded to sd significant digits using
   * rounding mode rm, or Big.RM if rm is not specified.
   * Use exponential notation if sd is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */
  P.toPrecision = function (sd, rm) {
    var x = this,
      Big = x.constructor,
      n = x.c[0];

    if (sd !== UNDEFINED) {
      if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
        throw Error(INVALID + 'precision');
      }
      x = round(new Big(x), sd, rm);
      for (; x.c.length < sd;) x.c.push(0);
    }

    return stringify(x, sd <= x.e || x.e <= Big.NE || x.e >= Big.PE, !!n);
  };


  /*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Include the sign for negative zero.
   */
  P.valueOf = function () {
    var x = this,
      Big = x.constructor;
    if (Big.strict === true) {
      throw Error(NAME + 'valueOf disallowed');
    }
    return stringify(x, x.e <= Big.NE || x.e >= Big.PE, true);
  };


  // Export


  Big = _Big_();

  Big['default'] = Big.Big = Big;

  //AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return Big; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Node and other CommonJS-like environments that support module.exports.
  } else {}
})(this);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
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

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Checkout.vue?vue&type=template&id=4ba250e8&lang=pug

const _hoisted_1 = {
  class: "row g-0"
};
const _hoisted_2 = {
  class: "col-12 col-md-6"
};

const _hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  class: "row g-0 m-4"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", {
  class: "mb-0"
}, "Order Summary")], -1);

const _hoisted_4 = {
  class: "pb-4 px-4"
};
const _hoisted_5 = {
  class: "col-6"
};
const _hoisted_6 = {
  class: "mb-2"
};
const _hoisted_7 = {
  class: "mb-0"
};
const _hoisted_8 = {
  class: "col-6 text-end text-md-start"
};

const _hoisted_9 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h5", {
  class: "mb-2 text-white"
}, "Subtotal", -1);

const _hoisted_10 = {
  class: "mb-0"
};
const _hoisted_11 = {
  class: "row g-0 px-4"
};

const _hoisted_12 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createStaticVNode"])("<div class=\"col-6 mt-4\"><h6 class=\"text-muted mb-2\">Subtotal</h6><h6 class=\"text-muted mb-2\">Shipping</h6><h6 class=\"text-muted mb-2\">Tax</h6><h6 class=\"mb-0\">Total</h6></div>", 1);

const _hoisted_13 = {
  class: "col-6 mt-4 text-end text-md-start"
};
const _hoisted_14 = {
  class: "text-muted mb-2"
};
const _hoisted_15 = {
  class: "text-muted mb-2"
};
const _hoisted_16 = {
  class: "text-muted mb-2"
};
const _hoisted_17 = {
  class: "mb-0"
};
const _hoisted_18 = {
  class: "col-12 col-md-6"
};
const _hoisted_19 = {
  key: 0,
  class: "text-center m-4"
};

const _hoisted_20 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  class: "spinner-border",
  role: "status"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "visually-hidden"
}, "Loading...")], -1);

const _hoisted_21 = [_hoisted_20];
const _hoisted_22 = {
  class: "row g-0 p-4 bg-light"
};
const _hoisted_23 = {
  class: "row g-0",
  id: "payment-form"
};

const _hoisted_24 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createStaticVNode"])("<h4 class=\"mb-4\">Payment Information</h4><div class=\"col-12 mb-4\"><label class=\"form-label\" for=\"card-postalCode\">Card Number</label><div class=\"form-control py-2\" id=\"card-postalCode\"></div></div><div class=\"col-12 col-sm-6 mb-4 pe-sm-3\"><label class=\"form-label\" for=\"card-country\">Card Expiration</label><div class=\"form-control py-2\" id=\"card-country\"></div></div><div class=\"col-12 col-sm-6 mb-4 ps-sm-3\"><label class=\"form-label\" for=\"card-number\">Card CVC</label><div class=\"form-control py-2\" id=\"card-number\"></div></div>", 4);

const _hoisted_28 = {
  class: "col-12 col-sm-6 mb-4 pe-sm-3"
};

const _hoisted_29 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "card-expiry"
}, "Postal Code", -1);

const _hoisted_30 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_31 = {
  class: "col-12 col-sm-6 mb-4 ps-sm-3"
};

const _hoisted_32 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "card-cvc"
}, "Country", -1);

const _hoisted_33 = {
  key: 0,
  class: "invalid-feedback"
};

const _hoisted_34 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", {
  class: "mb-4"
}, "Email", -1);

const _hoisted_35 = {
  class: "col-12 mb-4"
};

const _hoisted_36 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "phone"
}, "Email", -1);

const _hoisted_37 = {
  key: 0,
  class: "invalid-feedback"
};

const _hoisted_38 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", {
  class: "mb-4"
}, "Shipping Information", -1);

const _hoisted_39 = {
  class: "col-12 mb-4"
};

const _hoisted_40 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "email"
}, "Name", -1);

const _hoisted_41 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_42 = {
  class: "col-12 mb-4"
};

const _hoisted_43 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "city"
}, "Address Line 1", -1);

const _hoisted_44 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_45 = {
  class: "col-12 mb-4"
};

const _hoisted_46 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "state"
}, "Address Line 2", -1);

const _hoisted_47 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_48 = {
  class: "col-12 col-sm-4 pe-sm-3 mb-4"
};

const _hoisted_49 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "name"
}, "City", -1);

const _hoisted_50 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_51 = {
  class: "col-12 col-sm-4 px-sm-3 mb-4"
};

const _hoisted_52 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "postalCode"
}, "State", -1);

const _hoisted_53 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_54 = {
  class: "col-12 col-sm-4 ps-sm-3 mb-4"
};

const _hoisted_55 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "city"
}, "Postal Code", -1);

const _hoisted_56 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_57 = {
  class: "col-12 mb-4"
};

const _hoisted_58 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
  class: "form-label",
  for: "line1"
}, "Country", -1);

const _hoisted_59 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_60 = {
  class: "col-12 mb-0"
};
const _hoisted_61 = ["disabled"];
const _hoisted_62 = {
  key: 0,
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
};

const _hoisted_63 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" Submit Payment");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_2, [_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_4, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($props.cart, (item, index) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(index === 0 ? 'row g-0 border-top border-bottom p-4' : 'row g-0 border-bottom p-4')
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h5", _hoisted_6, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item.product), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h6", _hoisted_7, "$" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item.price) + " x " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item.quantity), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_8, [_hoisted_9, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h6", _hoisted_10, "$" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($options.getSubtotal(item.price, item.quantity)), 1)])], 2);
  }), 256)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_11, [_hoisted_12, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h6", _hoisted_14, "$" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.stripeKey.subtotal.toLocaleString('en-US', {
    minimumFractionDigits: 2
  })), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h6", _hoisted_15, "$" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.costs.shippingCost.toLocaleString('en-US', {
    minimumFractionDigits: 2
  })), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h6", _hoisted_16, "$" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.costs.total_tax_amounts.toLocaleString('en-US', {
    minimumFractionDigits: 2
  })), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h6", _hoisted_17, "$" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.stripeKey.total.toLocaleString('en-US', {
    minimumFractionDigits: 2
  })), 1)])])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_18, [this.loading && !$props.stripeKey.invoiceId ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_19, _hoisted_21)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_22, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", _hoisted_23, [_hoisted_24, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_28, [_hoisted_29, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "card-expiry",
    type: "text",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(_ctx.cardPostalCodeError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "100",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => this.cardPostalCode = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], this.cardPostalCode]]), _ctx.cardPostalCodeError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_30, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.cardPostalCodeError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_31, [_hoisted_32, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "card-cvc",
    type: "text",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(_ctx.cardCountryError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "100",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => this.cardCountry = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], this.cardCountry]]), _ctx.cardCountryError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_33, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.cardCountryError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), _hoisted_34, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_35, [_hoisted_36, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "phone",
    type: "text",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.emailError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "100",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => this.email = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], this.email]]), $data.emailError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_37, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.emailError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), $props.stripeKey.shippable ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [_hoisted_38, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_39, [_hoisted_40, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "email",
    type: "text",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.nameError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "100",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => this.name = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], this.name]]), $data.nameError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_41, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.nameError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_42, [_hoisted_43, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "city",
    type: "text",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.line1Error ? 'form-control is-invalid' : 'form-control'),
    maxlength: "100",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => this.line1 = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], this.line1]]), $data.line1Error ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_44, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.line1Error), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_45, [_hoisted_46, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "state",
    type: "text",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.line2Error ? 'form-control is-invalid' : 'form-control'),
    maxlength: "100",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => this.line2 = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], this.line2]]), $data.line2Error ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_47, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.line2Error), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_48, [_hoisted_49, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "name",
    type: "text",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.cityError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "100",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => this.city = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], this.city]]), $data.cityError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_50, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.cityError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_51, [_hoisted_52, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "postalCode",
    type: "text",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.stateError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "100",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => this.state = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], this.state]]), $data.stateError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_53, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.stateError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_54, [_hoisted_55, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "city",
    type: "text",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.postalCodeError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "100",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => this.postalCode = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], this.postalCode]]), $data.postalCodeError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_56, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.postalCodeError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_57, [_hoisted_58, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "line1",
    type: "text",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])($data.countryError ? 'form-control is-invalid' : 'form-control'),
    maxlength: "100",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => this.country = $event)
  }, null, 2), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], this.country]]), $data.countryError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_59, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.countryError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_60, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    class: "btn btn-secondary btn-lg",
    id: "submit",
    disabled: !$props.stripeKey.invoiceId,
    onClick: _cache[10] || (_cache[10] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])((...args) => $options.FormSubmit && $options.FormSubmit(...args), ["prevent"]))
  }, [$props.loading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", _hoisted_62)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _hoisted_63], 8, _hoisted_61)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], $props.stripeKey.invoiceId]])])]);
}
// CONCATENATED MODULE: ./src/components/Checkout.vue?vue&type=template&id=4ba250e8&lang=pug

// EXTERNAL MODULE: ./node_modules/big.js/big.js
var big = __webpack_require__("9dcd");
var big_default = /*#__PURE__*/__webpack_require__.n(big);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Checkout.vue?vue&type=script&lang=js

/* harmony default export */ var Checkoutvue_type_script_lang_js = ({
  components: {},

  data() {
    return {
      cardPostalCode: '',
      cardCountry: '',
      email: '',
      name: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      cardPostalCodeEmail: '',
      cardCountryEmail: '',
      emailError: '',
      nameError: '',
      line1Error: '',
      line2Error: '',
      cityError: '',
      stateError: '',
      postalCodeError: '',
      countryError: '',
      update: null
    };
  },

  props: ['username', 'quantity', 'totalItems', 'width', 'cart', 'stripeKey', 'admin', 'loading', 'costs', 'errors'],
  emits: ['quantity', 'addToCart', 'getError', 'SendData', 'DeleteProduct', 'Checkout', 'FormSubmit', 'clearCart', 'ShippingCost', 'GetTax'],
  watch: {
    errors(val) {
      for (var i = 0; i < val.length; i++) {
        if (val[i].param === 'cardPostalCode') {
          this.cardPostalCodeError = val[i].msg;
        } else if (val[i].param === 'cardCountry') {
          this.cardCountryError = val[i].msg;
        } else if (val[i].param === 'shippingAddress.email') {
          this.emailError = val[i].msg;
        } else if (val[i].param === 'shippingAddress.name') {
          this.nameError = val[i].msg;
        } else if (val[i].param === 'shippingAddress.line1') {
          this.line1Error = val[i].msg;
        } else if (val[i].param === 'shippingAddress.line2') {
          this.line2Error = val[i].msg;
        } else if (val[i].param === 'shippingAddress.city') {
          this.cityError = val[i].msg;
        } else if (val[i].param === 'shippingAddress.state') {
          this.stateError = val[i].msg;
        } else if (val[i].param === 'shippingAddress.postalCode') {
          this.postalCodeError = val[i].msg;
        } else if (val[i].param === 'shippingAddress.country') {
          this.countryError = val[i].msg;
        }
      }
    },

    cardPostalCode(val) {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(val)) {
        this.cardPostalCodeError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.cardPostalCodeError = "";
        var context = this;
        this.debounce(function () {
          context.$emit('GetTax', {
            postalCode: context.cardPostalCode,
            country: context.cardCountry
          });
        }, 1000)();
      }
    },

    cardCountry(val) {
      if (!/^[A-Za-z0-9 \-']{1,5}$/.test(val)) {
        this.countryError = "Must be a valid ISO 3166-1 alpha-2 country code.";
      } else {
        this.cardCountryError = "";
        var context = this;
        this.debounce(function () {
          context.$emit('GetTax', {
            postalCode: context.cardPostalCode,
            country: context.cardCountry
          });
        }, 1000)();
      }
    },

    email(val) {
      if (!/^[^@]{1,50}@[^@]{1,50}$/.test(val)) {
        this.emailError = "Must be a valid email address.";
      } else {
        this.emailError = "";
      }
    },

    name(val) {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(val)) {
        this.nameError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.nameError = "";
      }
    },

    line1(val) {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(val)) {
        this.line1Error = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.line1Error = "";
      }
    },

    line2(val) {
      if (!/^[A-Za-z0-9 \-']{0,100}$/.test(val)) {
        this.line2Error = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.line2Error = "";
      }
    },

    city(val) {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(val)) {
        this.cityError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.cityError = "";
      }
    },

    state(val) {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(val)) {
        this.stateError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.stateError = "";
      }
    },

    postalCode(val) {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(val)) {
        this.postalCodeError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.postalCodeError = "";
        var context = this;
        this.debounce(function () {
          context.$emit('ShippingCost', {
            postalCode: context.postalCode,
            country: context.country
          });
        }, 1000)();
      }
    },

    country(val) {
      if (!/^[A-Za-z0-9 \-']{1,5}$/.test(val)) {
        this.countryError = "Must be a valid ISO 3166-1 alpha-2 country code.";
      } else {
        this.countryError = "";
        var context = this;
        this.debounce(function () {
          context.$emit('ShippingCost', {
            postalCode: context.postalCode,
            country: context.country
          });
        }, 1000)();
      }
    }

  },
  computed: {
    total() {
      var total = new big_default.a(0);

      for (var i = 0; i < this.cart.length; i++) {
        var price = new big_default.a(this.cart[i].price);
        var quantity = new big_default.a(this.cart[i].quantity);
        var subtotal = price.times(quantity);
        total = total.add(subtotal);
      }

      return total.round(2).toNumber().toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

  },

  mounted() {
    this.$emit('getError', '');
    this.$emit('Checkout');
  },

  methods: {
    debounce(func, wait) {
      var context = this;
      return function () {
        clearTimeout(context.update);
        context.update = setTimeout(function () {
          context.update = null;
          func.apply(this, arguments);
        }, wait);
      };
    },

    validCardPostalCode() {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(this.cardPostalCode)) {
        this.cardPostalCodeError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.cardPostalCodeError = "";
        return true;
      }
    },

    validCardCountry() {
      if (!/^[A-Za-z0-9 \-']{1,5}$/.test(this.cardCountry)) {
        this.cardCountryError = "Must be a valid ISO 3166-1 alpha-2 country code.";
        return false;
      } else {
        this.cardCountryError = "";
        return true;
      }
    },

    validEmail() {
      if (!/^[^@]{1,50}@[^@]{1,50}$/.test(this.email)) {
        this.emailError = "Must be a valid email address.";
        return false;
      } else {
        this.emailError = "";
        return true;
      }
    },

    validName() {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(this.name)) {
        this.nameError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.nameError = "";
        return true;
      }
    },

    validLine1() {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(this.line1)) {
        this.line1Error = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.line1Error = "";
        return true;
      }
    },

    validLine2() {
      if (!/^[A-Za-z0-9 \-']{0,100}$/.test(this.line2)) {
        this.line2Error = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.line2Error = "";
        return true;
      }
    },

    validCity() {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(this.city)) {
        this.cityError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.cityError = "";
        return true;
      }
    },

    validState() {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(this.state)) {
        this.stateError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.stateError = "";
        return true;
      }
    },

    validPostalCode() {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(this.postalCode)) {
        this.postalCodeError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.postalCodeError = "";
        return true;
      }
    },

    validCountry() {
      if (!/^[A-Za-z0-9 \-']{1,5}$/.test(this.country)) {
        this.countryError = "Must be a valid ISO 3166-1 alpha-2 country code.";
        return false;
      } else {
        this.countryError = "";
        return true;
      }
    },

    FormSubmit() {
      var validCardPostalCode = this.validCardPostalCode();
      var validCardCountry = this.validCardCountry();
      var validEmail = this.validEmail();
      var validName = this.validName();
      var validLine1 = this.validLine1();
      var validLine2 = this.validLine2();
      var validCity = this.validCity();
      var validState = this.validState();
      var validPostalCode = this.validPostalCode();
      var validCountry = this.validCountry();

      if (validCardPostalCode && validCardCountry && validEmail && (!this.stripeKey.shippable || validName && validLine1 && validLine2 && validCity && validState && validPostalCode && validCountry)) {
        this.$emit('FormSubmit', {
          cardPostalCode: this.cardPostalCode,
          cardCountry: this.cardCountry,
          email: this.email,
          name: this.name,
          line1: this.line1,
          line2: this.line2,
          city: this.city,
          state: this.state,
          postalCode: this.postalCode,
          country: this.country
        });
      } else {
        if (!validCardPostalCode || !validCardCountry) {
          this.$emit('getError', "There are errors in the Payment Information form.");
        } else if (!validEmail) {
          this.$emit('getError', "There are errors in the Email form.");
        } else {
          this.$emit('getError', "There are errors in the Shipping Information form.");
        }
      }
    },

    getSubtotal(p, q) {
      var price = new big_default.a(p);
      var quantity = new big_default.a(q);
      var subtotal = price.times(quantity);
      return subtotal.round(2).toNumber().toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

  }
});
// CONCATENATED MODULE: ./src/components/Checkout.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/components/Checkout.vue





const __exports__ = /*#__PURE__*/exportHelper_default()(Checkoutvue_type_script_lang_js, [['render',render]])

/* harmony default export */ var Checkout = (__exports__);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (Checkout);



/***/ })

/******/ })["default"];
//# sourceMappingURL=Checkout.common.js.map