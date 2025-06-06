!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.fengari = t() : e.fengari = t()
}(window, function() {
    return function(e) {
        var t = {};
        function r(n) {
            if (t[n])
                return t[n].exports;
            var a = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(a.exports, a, a.exports, r),
            a.l = !0,
            a.exports
        }
        return r.m = e,
        r.c = t,
        r.d = function(e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, {
                configurable: !1,
                enumerable: !0,
                get: n
            })
        }
        ,
        r.r = function(e) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        r.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return r.d(t, "a", t),
            t
        }
        ,
        r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        r.p = "",
        r(r.s = 39)
    }([function(e, t, r) {
        "use strict";
        var n = void 0;
        n = "function" == typeof Uint8Array.from ? Uint8Array.from.bind(Uint8Array) : function(e) {
            for (var t = 0, r = e.length, n = new Uint8Array(r); r > t; )
                n[t] = e[t++];
            return n
        }
        ;
        var a = void 0;
        if ("function" == typeof (new Uint8Array).indexOf)
            a = function(e, t, r) {
                return e.indexOf(t, r)
            }
            ;
        else {
            var u = [].indexOf;
            if (0 !== u.call(new Uint8Array(1), 0))
                throw Error("missing .indexOf");
            a = function(e, t, r) {
                return u.call(e, t, r)
            }
        }
        var s = void 0;
        s = "function" == typeof Uint8Array.of ? Uint8Array.of.bind(Uint8Array) : function() {
            return n(arguments)
        }
        ;
        var o = function(e) {
            return e instanceof Uint8Array
        }
          , l = "cannot convert invalid utf8 to javascript string"
          , i = ";,/?:@&=+$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,-_.!~*'()#".split("").reduce(function(e, t) {
            return e[t.charCodeAt(0)] = !0,
            e
        }, {})
          , c = {}
          , _ = function(e, t) {
            if ("string" != typeof e)
                throw new TypeError("to_luastring expects a javascript string");
            if (t) {
                var r = c[e];
                if (o(r))
                    return r
            }
            for (var a = e.length, u = Array(a), s = 0, l = 0; l < a; ++l) {
                var i = e.charCodeAt(l);
                if (i <= 127)
                    u[s++] = i;
                else if (i <= 2047)
                    u[s++] = 192 | i >> 6,
                    u[s++] = 128 | 63 & i;
                else {
                    if (i >= 55296 && i <= 56319 && l + 1 < a) {
                        var _ = e.charCodeAt(l + 1);
                        _ >= 56320 && _ <= 57343 && (l++,
                        i = 1024 * (i - 55296) + _ + 9216)
                    }
                    i <= 65535 ? (u[s++] = 224 | i >> 12,
                    u[s++] = 128 | i >> 6 & 63,
                    u[s++] = 128 | 63 & i) : (u[s++] = 240 | i >> 18,
                    u[s++] = 128 | i >> 12 & 63,
                    u[s++] = 128 | i >> 6 & 63,
                    u[s++] = 128 | 63 & i)
                }
            }
            return u = n(u),
            t && (c[e] = u),
            u
        };
        e.exports.luastring_from = n,
        e.exports.luastring_indexOf = a,
        e.exports.luastring_of = s,
        e.exports.is_luastring = o,
        e.exports.luastring_eq = function(e, t) {
            if (e !== t) {
                var r = e.length;
                if (r !== t.length)
                    return !1;
                for (var n = 0; n < r; n++)
                    if (e[n] !== t[n])
                        return !1
            }
            return !0
        }
        ,
        e.exports.to_jsstring = function(e, t, r, n) {
            if (!o(e))
                throw new TypeError("to_jsstring expects a Uint8Array");
            r = void 0 === r ? e.length : Math.min(e.length, r);
            for (var a = "", u = void 0 !== t ? t : 0; u < r; ) {
                var s = e[u++];
                if (s < 128)
                    a += String.fromCharCode(s);
                else if (s < 194 || s > 244) {
                    if (!n)
                        throw RangeError(l);
                    a += "�"
                } else if (s <= 223) {
                    if (u >= r) {
                        if (!n)
                            throw RangeError(l);
                        a += "�";
                        continue
                    }
                    var i = e[u++];
                    if (128 != (192 & i)) {
                        if (!n)
                            throw RangeError(l);
                        a += "�";
                        continue
                    }
                    a += String.fromCharCode(((31 & s) << 6) + (63 & i))
                } else if (s <= 239) {
                    if (u + 1 >= r) {
                        if (!n)
                            throw RangeError(l);
                        a += "�";
                        continue
                    }
                    var c = e[u++];
                    if (128 != (192 & c)) {
                        if (!n)
                            throw RangeError(l);
                        a += "�";
                        continue
                    }
                    var _ = e[u++];
                    if (128 != (192 & _)) {
                        if (!n)
                            throw RangeError(l);
                        a += "�";
                        continue
                    }
                    var f = ((15 & s) << 12) + ((63 & c) << 6) + (63 & _);
                    if (f <= 65535)
                        a += String.fromCharCode(f);
                    else {
                        var p = 55296 + ((f -= 65536) >> 10)
                          , v = f % 1024 + 56320;
                        a += String.fromCharCode(p, v)
                    }
                } else {
                    if (u + 2 >= r) {
                        if (!n)
                            throw RangeError(l);
                        a += "�";
                        continue
                    }
                    var d = e[u++];
                    if (128 != (192 & d)) {
                        if (!n)
                            throw RangeError(l);
                        a += "�";
                        continue
                    }
                    var h = e[u++];
                    if (128 != (192 & h)) {
                        if (!n)
                            throw RangeError(l);
                        a += "�";
                        continue
                    }
                    var L = e[u++];
                    if (128 != (192 & L)) {
                        if (!n)
                            throw RangeError(l);
                        a += "�";
                        continue
                    }
                    var A = ((7 & s) << 18) + ((63 & d) << 12) + ((63 & h) << 6) + (63 & L)
                      , g = 55296 + ((A -= 65536) >> 10)
                      , T = A % 1024 + 56320;
                    a += String.fromCharCode(g, T)
                }
            }
            return a
        }
        ,
        e.exports.to_uristring = function(e) {
            if (!o(e))
                throw new TypeError("to_uristring expects a Uint8Array");
            for (var t = "", r = 0; r < e.length; r++) {
                var n = e[r];
                i[n] ? t += String.fromCharCode(n) : t += "%" + (n < 16 ? "0" : "") + n.toString(16)
            }
            return t
        }
        ,
        e.exports.to_luastring = _,
        e.exports.from_userstring = function(e) {
            if (!o(e)) {
                if ("string" != typeof e)
                    throw new TypeError("expects an array of bytes or javascript string");
                e = _(e)
            }
            return e
        }
        ;
        var f = _("Lua");
        e.exports.LUA_SIGNATURE = f,
        e.exports.LUA_VERSION_MAJOR = "5",
        e.exports.LUA_VERSION_MINOR = "3",
        e.exports.LUA_VERSION_NUM = 503,
        e.exports.LUA_VERSION_RELEASE = "4",
        e.exports.LUA_VERSION = "Lua 5.3",
        e.exports.LUA_RELEASE = "Lua 5.3.4",
        e.exports.LUA_COPYRIGHT = "Lua 5.3.4  Copyright (C) 1994-2017 Lua.org, PUC-Rio",
        e.exports.LUA_AUTHORS = "R. Ierusalimschy, L. H. de Figueiredo, W. Celes";
        var p = {
            LUA_TNONE: -1,
            LUA_TNIL: 0,
            LUA_TBOOLEAN: 1,
            LUA_TLIGHTUSERDATA: 2,
            LUA_TNUMBER: 3,
            LUA_TSTRING: 4,
            LUA_TTABLE: 5,
            LUA_TFUNCTION: 6,
            LUA_TUSERDATA: 7,
            LUA_TTHREAD: 8,
            LUA_NUMTAGS: 9
        };
        p.LUA_TSHRSTR = 0 | p.LUA_TSTRING,
        p.LUA_TLNGSTR = 16 | p.LUA_TSTRING,
        p.LUA_TNUMFLT = 0 | p.LUA_TNUMBER,
        p.LUA_TNUMINT = 16 | p.LUA_TNUMBER,
        p.LUA_TLCL = 0 | p.LUA_TFUNCTION,
        p.LUA_TLCF = 16 | p.LUA_TFUNCTION,
        p.LUA_TCCL = 32 | p.LUA_TFUNCTION;
        var v = -r(3).LUAI_MAXSTACK - 1e3;
        e.exports.LUA_HOOKCALL = 0,
        e.exports.LUA_HOOKCOUNT = 3,
        e.exports.LUA_HOOKLINE = 2,
        e.exports.LUA_HOOKRET = 1,
        e.exports.LUA_HOOKTAILCALL = 4,
        e.exports.LUA_MASKCALL = 1,
        e.exports.LUA_MASKCOUNT = 8,
        e.exports.LUA_MASKLINE = 4,
        e.exports.LUA_MASKRET = 2,
        e.exports.LUA_MINSTACK = 20,
        e.exports.LUA_MULTRET = -1,
        e.exports.LUA_OPADD = 0,
        e.exports.LUA_OPBAND = 7,
        e.exports.LUA_OPBNOT = 13,
        e.exports.LUA_OPBOR = 8,
        e.exports.LUA_OPBXOR = 9,
        e.exports.LUA_OPDIV = 5,
        e.exports.LUA_OPEQ = 0,
        e.exports.LUA_OPIDIV = 6,
        e.exports.LUA_OPLE = 2,
        e.exports.LUA_OPLT = 1,
        e.exports.LUA_OPMOD = 3,
        e.exports.LUA_OPMUL = 2,
        e.exports.LUA_OPPOW = 4,
        e.exports.LUA_OPSHL = 10,
        e.exports.LUA_OPSHR = 11,
        e.exports.LUA_OPSUB = 1,
        e.exports.LUA_OPUNM = 12,
        e.exports.LUA_REGISTRYINDEX = v,
        e.exports.LUA_RIDX_GLOBALS = 2,
        e.exports.LUA_RIDX_LAST = 2,
        e.exports.LUA_RIDX_MAINTHREAD = 1,
        e.exports.constant_types = p,
        e.exports.lua_Debug = function e() {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this.event = NaN,
            this.name = null,
            this.namewhat = null,
            this.what = null,
            this.source = null,
            this.currentline = NaN,
            this.linedefined = NaN,
            this.lastlinedefined = NaN,
            this.nups = NaN,
            this.nparams = NaN,
            this.isvararg = NaN,
            this.istailcall = NaN,
            this.short_src = null,
            this.i_ci = null
        }
        ,
        e.exports.lua_upvalueindex = function(e) {
            return v - e
        }
        ,
        e.exports.thread_status = {
            LUA_OK: 0,
            LUA_YIELD: 1,
            LUA_ERRRUN: 2,
            LUA_ERRSYNTAX: 3,
            LUA_ERRMEM: 4,
            LUA_ERRGCMM: 5,
            LUA_ERRERR: 6
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(0)
          , a = r(18)
          , u = r(11)
          , s = r(7)
          , o = r(10);
        e.exports.LUA_AUTHORS = n.LUA_AUTHORS,
        e.exports.LUA_COPYRIGHT = n.LUA_COPYRIGHT,
        e.exports.LUA_ERRERR = n.thread_status.LUA_ERRERR,
        e.exports.LUA_ERRGCMM = n.thread_status.LUA_ERRGCMM,
        e.exports.LUA_ERRMEM = n.thread_status.LUA_ERRMEM,
        e.exports.LUA_ERRRUN = n.thread_status.LUA_ERRRUN,
        e.exports.LUA_ERRSYNTAX = n.thread_status.LUA_ERRSYNTAX,
        e.exports.LUA_HOOKCALL = n.LUA_HOOKCALL,
        e.exports.LUA_HOOKCOUNT = n.LUA_HOOKCOUNT,
        e.exports.LUA_HOOKLINE = n.LUA_HOOKLINE,
        e.exports.LUA_HOOKRET = n.LUA_HOOKRET,
        e.exports.LUA_HOOKTAILCALL = n.LUA_HOOKTAILCALL,
        e.exports.LUA_MASKCALL = n.LUA_MASKCALL,
        e.exports.LUA_MASKCOUNT = n.LUA_MASKCOUNT,
        e.exports.LUA_MASKLINE = n.LUA_MASKLINE,
        e.exports.LUA_MASKRET = n.LUA_MASKRET,
        e.exports.LUA_MINSTACK = n.LUA_MINSTACK,
        e.exports.LUA_MULTRET = n.LUA_MULTRET,
        e.exports.LUA_NUMTAGS = n.constant_types.LUA_NUMTAGS,
        e.exports.LUA_OK = n.thread_status.LUA_OK,
        e.exports.LUA_OPADD = n.LUA_OPADD,
        e.exports.LUA_OPBAND = n.LUA_OPBAND,
        e.exports.LUA_OPBNOT = n.LUA_OPBNOT,
        e.exports.LUA_OPBOR = n.LUA_OPBOR,
        e.exports.LUA_OPBXOR = n.LUA_OPBXOR,
        e.exports.LUA_OPDIV = n.LUA_OPDIV,
        e.exports.LUA_OPEQ = n.LUA_OPEQ,
        e.exports.LUA_OPIDIV = n.LUA_OPIDIV,
        e.exports.LUA_OPLE = n.LUA_OPLE,
        e.exports.LUA_OPLT = n.LUA_OPLT,
        e.exports.LUA_OPMOD = n.LUA_OPMOD,
        e.exports.LUA_OPMUL = n.LUA_OPMUL,
        e.exports.LUA_OPPOW = n.LUA_OPPOW,
        e.exports.LUA_OPSHL = n.LUA_OPSHL,
        e.exports.LUA_OPSHR = n.LUA_OPSHR,
        e.exports.LUA_OPSUB = n.LUA_OPSUB,
        e.exports.LUA_OPUNM = n.LUA_OPUNM,
        e.exports.LUA_REGISTRYINDEX = n.LUA_REGISTRYINDEX,
        e.exports.LUA_RELEASE = n.LUA_RELEASE,
        e.exports.LUA_RIDX_GLOBALS = n.LUA_RIDX_GLOBALS,
        e.exports.LUA_RIDX_LAST = n.LUA_RIDX_LAST,
        e.exports.LUA_RIDX_MAINTHREAD = n.LUA_RIDX_MAINTHREAD,
        e.exports.LUA_SIGNATURE = n.LUA_SIGNATURE,
        e.exports.LUA_TNONE = n.constant_types.LUA_TNONE,
        e.exports.LUA_TNIL = n.constant_types.LUA_TNIL,
        e.exports.LUA_TBOOLEAN = n.constant_types.LUA_TBOOLEAN,
        e.exports.LUA_TLIGHTUSERDATA = n.constant_types.LUA_TLIGHTUSERDATA,
        e.exports.LUA_TNUMBER = n.constant_types.LUA_TNUMBER,
        e.exports.LUA_TSTRING = n.constant_types.LUA_TSTRING,
        e.exports.LUA_TTABLE = n.constant_types.LUA_TTABLE,
        e.exports.LUA_TFUNCTION = n.constant_types.LUA_TFUNCTION,
        e.exports.LUA_TUSERDATA = n.constant_types.LUA_TUSERDATA,
        e.exports.LUA_TTHREAD = n.constant_types.LUA_TTHREAD,
        e.exports.LUA_VERSION = n.LUA_VERSION,
        e.exports.LUA_VERSION_MAJOR = n.LUA_VERSION_MAJOR,
        e.exports.LUA_VERSION_MINOR = n.LUA_VERSION_MINOR,
        e.exports.LUA_VERSION_NUM = n.LUA_VERSION_NUM,
        e.exports.LUA_VERSION_RELEASE = n.LUA_VERSION_RELEASE,
        e.exports.LUA_YIELD = n.thread_status.LUA_YIELD,
        e.exports.lua_Debug = n.lua_Debug,
        e.exports.lua_upvalueindex = n.lua_upvalueindex,
        e.exports.lua_absindex = a.lua_absindex,
        e.exports.lua_arith = a.lua_arith,
        e.exports.lua_atpanic = a.lua_atpanic,
        e.exports.lua_atnativeerror = a.lua_atnativeerror,
        e.exports.lua_call = a.lua_call,
        e.exports.lua_callk = a.lua_callk,
        e.exports.lua_checkstack = a.lua_checkstack,
        e.exports.lua_close = o.lua_close,
        e.exports.lua_compare = a.lua_compare,
        e.exports.lua_concat = a.lua_concat,
        e.exports.lua_copy = a.lua_copy,
        e.exports.lua_createtable = a.lua_createtable,
        e.exports.lua_dump = a.lua_dump,
        e.exports.lua_error = a.lua_error,
        e.exports.lua_gc = a.lua_gc,
        e.exports.lua_getallocf = a.lua_getallocf,
        e.exports.lua_getextraspace = a.lua_getextraspace,
        e.exports.lua_getfield = a.lua_getfield,
        e.exports.lua_getglobal = a.lua_getglobal,
        e.exports.lua_gethook = u.lua_gethook,
        e.exports.lua_gethookcount = u.lua_gethookcount,
        e.exports.lua_gethookmask = u.lua_gethookmask,
        e.exports.lua_geti = a.lua_geti,
        e.exports.lua_getinfo = u.lua_getinfo,
        e.exports.lua_getlocal = u.lua_getlocal,
        e.exports.lua_getmetatable = a.lua_getmetatable,
        e.exports.lua_getstack = u.lua_getstack,
        e.exports.lua_gettable = a.lua_gettable,
        e.exports.lua_gettop = a.lua_gettop,
        e.exports.lua_getupvalue = a.lua_getupvalue,
        e.exports.lua_getuservalue = a.lua_getuservalue,
        e.exports.lua_insert = a.lua_insert,
        e.exports.lua_isboolean = a.lua_isboolean,
        e.exports.lua_iscfunction = a.lua_iscfunction,
        e.exports.lua_isfunction = a.lua_isfunction,
        e.exports.lua_isinteger = a.lua_isinteger,
        e.exports.lua_islightuserdata = a.lua_islightuserdata,
        e.exports.lua_isnil = a.lua_isnil,
        e.exports.lua_isnone = a.lua_isnone,
        e.exports.lua_isnoneornil = a.lua_isnoneornil,
        e.exports.lua_isnumber = a.lua_isnumber,
        e.exports.lua_isproxy = a.lua_isproxy,
        e.exports.lua_isstring = a.lua_isstring,
        e.exports.lua_istable = a.lua_istable,
        e.exports.lua_isthread = a.lua_isthread,
        e.exports.lua_isuserdata = a.lua_isuserdata,
        e.exports.lua_isyieldable = s.lua_isyieldable,
        e.exports.lua_len = a.lua_len,
        e.exports.lua_load = a.lua_load,
        e.exports.lua_newstate = o.lua_newstate,
        e.exports.lua_newtable = a.lua_newtable,
        e.exports.lua_newthread = o.lua_newthread,
        e.exports.lua_newuserdata = a.lua_newuserdata,
        e.exports.lua_next = a.lua_next,
        e.exports.lua_pcall = a.lua_pcall,
        e.exports.lua_pcallk = a.lua_pcallk,
        e.exports.lua_pop = a.lua_pop,
        e.exports.lua_pushboolean = a.lua_pushboolean,
        e.exports.lua_pushcclosure = a.lua_pushcclosure,
        e.exports.lua_pushcfunction = a.lua_pushcfunction,
        e.exports.lua_pushfstring = a.lua_pushfstring,
        e.exports.lua_pushglobaltable = a.lua_pushglobaltable,
        e.exports.lua_pushinteger = a.lua_pushinteger,
        e.exports.lua_pushjsclosure = a.lua_pushjsclosure,
        e.exports.lua_pushjsfunction = a.lua_pushjsfunction,
        e.exports.lua_pushlightuserdata = a.lua_pushlightuserdata,
        e.exports.lua_pushliteral = a.lua_pushliteral,
        e.exports.lua_pushlstring = a.lua_pushlstring,
        e.exports.lua_pushnil = a.lua_pushnil,
        e.exports.lua_pushnumber = a.lua_pushnumber,
        e.exports.lua_pushstring = a.lua_pushstring,
        e.exports.lua_pushthread = a.lua_pushthread,
        e.exports.lua_pushvalue = a.lua_pushvalue,
        e.exports.lua_pushvfstring = a.lua_pushvfstring,
        e.exports.lua_rawequal = a.lua_rawequal,
        e.exports.lua_rawget = a.lua_rawget,
        e.exports.lua_rawgeti = a.lua_rawgeti,
        e.exports.lua_rawgetp = a.lua_rawgetp,
        e.exports.lua_rawlen = a.lua_rawlen,
        e.exports.lua_rawset = a.lua_rawset,
        e.exports.lua_rawseti = a.lua_rawseti,
        e.exports.lua_rawsetp = a.lua_rawsetp,
        e.exports.lua_register = a.lua_register,
        e.exports.lua_remove = a.lua_remove,
        e.exports.lua_replace = a.lua_replace,
        e.exports.lua_resume = s.lua_resume,
        e.exports.lua_rotate = a.lua_rotate,
        e.exports.lua_setallof = s.lua_setallof,
        e.exports.lua_setfield = a.lua_setfield,
        e.exports.lua_setglobal = a.lua_setglobal,
        e.exports.lua_sethook = u.lua_sethook,
        e.exports.lua_seti = a.lua_seti,
        e.exports.lua_setlocal = u.lua_setlocal,
        e.exports.lua_setmetatable = a.lua_setmetatable,
        e.exports.lua_settable = a.lua_settable,
        e.exports.lua_settop = a.lua_settop,
        e.exports.lua_setupvalue = a.lua_setupvalue,
        e.exports.lua_setuservalue = a.lua_setuservalue,
        e.exports.lua_status = a.lua_status,
        e.exports.lua_stringtonumber = a.lua_stringtonumber,
        e.exports.lua_toboolean = a.lua_toboolean,
        e.exports.lua_todataview = a.lua_todataview,
        e.exports.lua_tointeger = a.lua_tointeger,
        e.exports.lua_tointegerx = a.lua_tointegerx,
        e.exports.lua_tojsstring = a.lua_tojsstring,
        e.exports.lua_tolstring = a.lua_tolstring,
        e.exports.lua_tonumber = a.lua_tonumber,
        e.exports.lua_tonumberx = a.lua_tonumberx,
        e.exports.lua_topointer = a.lua_topointer,
        e.exports.lua_toproxy = a.lua_toproxy,
        e.exports.lua_tostring = a.lua_tostring,
        e.exports.lua_tothread = a.lua_tothread,
        e.exports.lua_touserdata = a.lua_touserdata,
        e.exports.lua_type = a.lua_type,
        e.exports.lua_typename = a.lua_typename,
        e.exports.lua_upvalueid = a.lua_upvalueid,
        e.exports.lua_upvaluejoin = a.lua_upvaluejoin,
        e.exports.lua_version = a.lua_version,
        e.exports.lua_xmove = a.lua_xmove,
        e.exports.lua_yield = s.lua_yield,
        e.exports.lua_yieldk = s.lua_yieldk,
        e.exports.lua_tocfunction = a.lua_tocfunction
    }
    , function(e, t, r) {
        "use strict";
        var n = r(3).luai_apicheck
          , a = function(e) {
            if (!e)
                throw Error("assertion failed")
        };
        e.exports.lua_assert = a,
        e.exports.luai_apicheck = n || function(e, t) {
            return a(t)
        }
        ;
        e.exports.api_check = function(e, t, r) {
            return n(e, t && r)
        }
        ;
        e.exports.LUAI_MAXCCALLS = 200;
        e.exports.LUA_MINBUFFER = 32;
        e.exports.luai_nummod = function(e, t, r) {
            var n = t % r;
            return n * r < 0 && (n += r),
            n
        }
        ;
        e.exports.MAX_INT = 2147483647;
        e.exports.MIN_INT = -2147483648
    }
    , function(e, t, r) {
        "use strict";
        var n = {}
          , a = r(0)
          , u = a.LUA_VERSION_MAJOR
          , s = a.LUA_VERSION_MINOR
          , o = a.to_luastring;
        e.exports.LUA_PATH_SEP = ";";
        e.exports.LUA_PATH_MARK = "?";
        e.exports.LUA_EXEC_DIR = "!";
        var l = u + "." + s;
        e.exports.LUA_VDIR = l;
        e.exports.LUA_DIRSEP = "/";
        var i = "./lua/" + l + "/";
        e.exports.LUA_LDIR = i;
        var c = i;
        e.exports.LUA_JSDIR = c;
        var _ = o(i + "?.lua;" + i + "?/init.lua;./?.lua;./?/init.lua");
        e.exports.LUA_PATH_DEFAULT = _;
        var f = o(c + "?.js;" + c + "loadall.js;./?.js");
        e.exports.LUA_JSPATH_DEFAULT = f;
        var p = n.LUA_COMPAT_FLOATSTRING || !1
          , v = n.LUAI_MAXSTACK || 1e6
          , d = n.LUA_IDSIZE || 59
          , h = n.LUAL_BUFFERSIZE || 8192
          , L = function(e, t) {
            for (var r = Math.min(3, Math.ceil(Math.abs(t) / 1023)), n = e, a = 0; a < r; a++)
                n *= Math.pow(2, Math.floor((t + a) / r));
            return n
        };
        e.exports.LUAI_MAXSTACK = v,
        e.exports.LUA_COMPAT_FLOATSTRING = p,
        e.exports.LUA_IDSIZE = d,
        e.exports.LUA_INTEGER_FMT = "%d",
        e.exports.LUA_INTEGER_FRMLEN = "",
        e.exports.LUA_MAXINTEGER = 2147483647,
        e.exports.LUA_MININTEGER = -2147483648,
        e.exports.LUA_NUMBER_FMT = "%.14g",
        e.exports.LUA_NUMBER_FRMLEN = "",
        e.exports.LUAL_BUFFERSIZE = h,
        e.exports.frexp = function(e) {
            if (0 === e)
                return [e, 0];
            var t = new DataView(new ArrayBuffer(8));
            t.setFloat64(0, e);
            var r = t.getUint32(0) >>> 20 & 2047;
            0 === r && (t.setFloat64(0, e * Math.pow(2, 64)),
            r = (t.getUint32(0) >>> 20 & 2047) - 64);
            var n = r - 1022;
            return [L(e, -n), n]
        }
        ,
        e.exports.ldexp = L,
        e.exports.lua_getlocaledecpoint = function() {
            return 1.1.toLocaleString().charCodeAt(1)
        }
        ,
        e.exports.lua_integer2str = function(e) {
            return String(e)
        }
        ,
        e.exports.lua_number2str = function(e) {
            return String(Number(e.toPrecision(14)))
        }
        ,
        e.exports.lua_numbertointeger = function(e) {
            return e >= -2147483648 && e < 2147483648 && e
        }
        ,
        e.exports.luai_apicheck = function(e, t) {
            if (!t)
                throw Error(t)
        }
    }
    , function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var a = r(3).LUAL_BUFFERSIZE
          , u = r(1)
          , s = u.LUA_ERRERR
          , o = u.LUA_MULTRET
          , l = u.LUA_REGISTRYINDEX
          , i = u.LUA_SIGNATURE
          , c = u.LUA_TBOOLEAN
          , _ = u.LUA_TLIGHTUSERDATA
          , f = u.LUA_TNIL
          , p = u.LUA_TNONE
          , v = u.LUA_TNUMBER
          , d = u.LUA_TSTRING
          , h = u.LUA_TTABLE
          , L = u.LUA_VERSION_NUM
          , A = u.lua_Debug
          , g = u.lua_absindex
          , T = u.lua_atpanic
          , x = u.lua_call
          , b = u.lua_checkstack
          , k = u.lua_concat
          , O = u.lua_copy
          , E = u.lua_createtable
          , m = u.lua_error
          , U = u.lua_getfield
          , N = u.lua_getinfo
          , R = u.lua_getmetatable
          , S = u.lua_getstack
          , y = u.lua_gettop
          , w = u.lua_insert
          , I = u.lua_isinteger
          , M = u.lua_isnil
          , P = u.lua_isnumber
          , C = u.lua_isstring
          , D = u.lua_istable
          , V = u.lua_len
          , G = u.lua_load
          , B = u.lua_newstate
          , K = u.lua_newtable
          , F = u.lua_next
          , H = u.lua_pcall
          , j = u.lua_pop
          , X = u.lua_pushboolean
          , z = u.lua_pushcclosure
          , Y = u.lua_pushcfunction
          , J = u.lua_pushfstring
          , Z = u.lua_pushinteger
          , q = u.lua_pushliteral
          , W = u.lua_pushlstring
          , Q = u.lua_pushnil
          , $ = u.lua_pushstring
          , ee = u.lua_pushvalue
          , te = u.lua_pushvfstring
          , re = u.lua_rawequal
          , ne = u.lua_rawget
          , ae = u.lua_rawgeti
          , ue = u.lua_rawlen
          , se = u.lua_rawseti
          , oe = u.lua_remove
          , le = u.lua_setfield
          , ie = u.lua_setglobal
          , ce = u.lua_setmetatable
          , _e = u.lua_settop
          , fe = u.lua_toboolean
          , pe = u.lua_tointeger
          , ve = u.lua_tointegerx
          , de = u.lua_tojsstring
          , he = u.lua_tolstring
          , Le = u.lua_tonumber
          , Ae = u.lua_tonumberx
          , ge = u.lua_topointer
          , Te = u.lua_tostring
          , xe = u.lua_touserdata
          , be = u.lua_type
          , ke = u.lua_typename
          , Oe = u.lua_version
          , Ee = r(6)
          , me = Ee.from_userstring
          , Ue = Ee.luastring_eq
          , Ne = Ee.to_luastring
          , Re = Ee.to_uristring
          , Se = s + 1
          , ye = Ne("_LOADED")
          , we = Ne("_PRELOAD")
          , Ie = Ne("FILE*")
          , Me = Ne("__name")
          , Pe = Ne("__tostring")
          , Ce = new Uint8Array(0)
          , De = function e() {
            n(this, e),
            this.L = null,
            this.b = Ce,
            this.n = 0
        }
          , Ve = function(e, t) {
            var r = y(e);
            if (N(e, Ne("f"), t),
            U(e, l, ye),
            function e(t, r, n) {
                if (0 === n || !D(t, -1))
                    return 0;
                for (Q(t); F(t, -2); ) {
                    if (be(t, -2) === d) {
                        if (re(t, r, -1))
                            return j(t, 1),
                            1;
                        if (e(t, r, n - 1))
                            return oe(t, -2),
                            q(t, "."),
                            w(t, -2),
                            k(t, 3),
                            1
                    }
                    j(t, 1)
                }
                return 0
            }(e, r + 1, 2)) {
                var n = Te(e, -1);
                return 95 === n[0] && 71 === n[1] && 46 === n[2] && ($(e, n.subarray(3)),
                oe(e, -2)),
                O(e, -1, r + 1),
                j(e, 2),
                1
            }
            return _e(e, r),
            0
        }
          , Ge = function(e, t) {
            Ve(e, t) ? (J(e, Ne("function '%s'"), Te(e, -1)),
            oe(e, -2)) : 0 !== t.namewhat.length ? J(e, Ne("%s '%s'"), t.namewhat, t.name) : t.what && 109 === t.what[0] ? q(e, "main chunk") : t.what && 76 === t.what[0] ? J(e, Ne("function <%s:%d>"), t.short_src, t.linedefined) : q(e, "?")
        }
          , Be = function(e) {
            var t = "PANIC: unprotected error in call to Lua API (" + de(e, -1) + ")";
            throw new Error(t)
        }
          , Ke = function(e, t, r) {
            var n = new A;
            return S(e, 0, n) ? (N(e, Ne("n"), n),
            Ue(n.namewhat, Ne("method")) && 0 === --t ? je(e, Ne("calling '%s' on bad self (%s)"), n.name, r) : (null === n.name && (n.name = Ve(e, n) ? Te(e, -1) : Ne("?")),
            je(e, Ne("bad argument #%d to '%s' (%s)"), t, n.name, r))) : je(e, Ne("bad argument #%d (%s)"), t, r)
        }
          , Fe = function(e, t, r) {
            var n = void 0;
            n = pt(e, t, Me) === d ? Te(e, -1) : be(e, t) === _ ? Ne("light userdata", !0) : Ze(e, t);
            var a = J(e, Ne("%s expected, got %s"), r, n);
            return Ke(e, t, a)
        }
          , He = function(e, t) {
            var r = new A;
            S(e, t, r) && (N(e, Ne("Sl", !0), r),
            r.currentline > 0) ? J(e, Ne("%s:%d: "), r.short_src, r.currentline) : $(e, Ne(""))
        }
          , je = function(e, t) {
            He(e, 1);
            for (var r = arguments.length, n = Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
                n[a - 2] = arguments[a];
            return te(e, t, n),
            k(e, 2),
            m(e)
        }
          , Xe = function(e, t, r, n) {
            if (t)
                return X(e, 1),
                1;
            Q(e);
            var a = void 0
              , u = void 0;
            return n ? (a = n.message,
            u = -n.errno) : (a = "Success",
            u = 0),
            r ? J(e, Ne("%s: %s"), r, Ne(a)) : $(e, Ne(a)),
            Z(e, u),
            3
        }
          , ze = function(e, t) {
            return U(e, l, t)
        }
          , Ye = function(e, t, r) {
            var n = xe(e, t);
            return null !== n && R(e, t) ? (ze(e, r),
            re(e, -1, -2) || (n = null),
            j(e, 2),
            n) : null
        }
          , Je = function(e, t, r) {
            Fe(e, t, ke(e, r))
        }
          , Ze = function(e, t) {
            return ke(e, be(e, t))
        }
          , qe = function(e, t) {
            var r = he(e, t);
            return null !== r && void 0 !== r || Je(e, t, d),
            r
        }
          , We = qe
          , Qe = function(e, t, r) {
            return be(e, t) <= 0 ? null === r ? null : me(r) : qe(e, t)
        }
          , $e = Qe
          , et = function(e, t) {
            var r = Ae(e, t);
            return !1 === r && Je(e, t, v),
            r
        }
          , tt = function(e, t) {
            var r = ve(e, t);
            return !1 === r && function(e, t) {
                P(e, t) ? Ke(e, t, Ne("number has no integer representation", !0)) : Je(e, t, v)
            }(e, t),
            r
        }
          , rt = function(e, t) {
            var r = e.n + t;
            if (e.b.length < r) {
                var n = Math.max(2 * e.b.length, r)
                  , a = new Uint8Array(n);
                a.set(e.b),
                e.b = a
            }
            return e.b.subarray(e.n, r)
        }
          , nt = function(e, t) {
            t.L = e,
            t.b = Ce
        }
          , at = function(e, t, r) {
            r > 0 && (t = me(t),
            rt(e, r).set(t.subarray(0, r)),
            ot(e, r))
        }
          , ut = function(e, t) {
            t = me(t),
            at(e, t, t.length)
        }
          , st = function(e) {
            W(e.L, e.b, e.n),
            e.n = 0,
            e.b = Ce
        }
          , ot = function(e, t) {
            e.n += t
        }
          , lt = function(e, t, r, n) {
            return be(e, r) <= 0 ? n : t(e, r)
        }
          , it = function(e, t) {
            var r = t.string;
            return t.string = null,
            r
        }
          , ct = function(e, t, r, n, a) {
            return G(e, it, {
                string: t
            }, n, a)
        }
          , _t = function(e, t, r, n) {
            return ct(e, t, 0, n, null)
        }
          , ft = function(e, t) {
            return _t(e, t, t.length, t)
        }
          , pt = function(e, t, r) {
            if (R(e, t)) {
                $(e, r);
                var n = ne(e, -2);
                return n === f ? j(e, 2) : oe(e, -2),
                n
            }
            return f
        }
          , vt = function(e, t, r) {
            return t = g(e, t),
            pt(e, t, r) !== f && (ee(e, t),
            x(e, 1, 1),
            !0)
        }
          , dt = Ne("%I")
          , ht = Ne("%f")
          , Lt = function(e, t, r) {
            var n = r >>> 0
              , a = t.length
              , u = e.length + 1 - a;
            e: for (; n < u; n++) {
                for (var s = 0; s < a; s++)
                    if (e[n + s] !== t[s])
                        continue e;
                return n
            }
            return -1
        }
          , At = function(e, t, r) {
            return U(e, t, r) === h || (j(e, 1),
            t = g(e, t),
            K(e),
            ee(e, -1),
            le(e, t, r),
            !1)
        }
          , gt = function(e, t, r) {
            for (var n in Tt(e, r, Ne("too many upvalues", !0)),
            t) {
                for (var a = 0; a < r; a++)
                    ee(e, -r);
                z(e, t[n], r),
                le(e, -(r + 2), Ne(n))
            }
            j(e, r)
        }
          , Tt = function(e, t, r) {
            b(e, t) || (r ? je(e, Ne("stack overflow (%s)"), r) : je(e, Ne("stack overflow", !0)))
        }
          , xt = function(e, t, r, n) {
            var a = n.message
              , u = Te(e, r).subarray(1);
            return J(e, Ne("cannot %s %s: %s"), Ne(t), u, Ne(a)),
            oe(e, r),
            Se
        }
          , bt = void 0
          , kt = [239, 187, 191]
          , Ot = function(e) {
            var t = function(e) {
                e.n = 0;
                var t = void 0
                  , r = 0;
                do {
                    if (null === (t = bt(e)) || t !== kt[r])
                        return t;
                    r++,
                    e.buff[e.n++] = t
                } while (r < kt.length);return e.n = 0,
                bt(e)
            }(e);
            if (35 === t) {
                do {
                    t = bt(e)
                } while (t && 10 !== t);return {
                    skipped: !0,
                    c: bt(e)
                }
            }
            return {
                skipped: !1,
                c: t
            }
        }
          , Et = void 0
          , mt = function(e, t) {
            var r = t;
            if (null !== r.f && r.n > 0) {
                var n = r.n;
                return r.n = 0,
                r.f = r.f.subarray(r.pos),
                r.buff.subarray(0, n)
            }
            var a = r.f;
            return r.f = null,
            a
        };
        bt = function(e) {
            return e.pos < e.f.length ? e.f[e.pos++] : null
        }
        ,
        Et = function(e, t, r) {
            var a = new function e() {
                n(this, e),
                this.n = NaN,
                this.f = null,
                this.buff = new Uint8Array(1024),
                this.pos = 0,
                this.err = void 0
            }
              , u = y(e) + 1;
            if (null === t)
                throw new Error("Can't read stdin in the browser");
            J(e, Ne("@%s"), t);
            var s = Re(t)
              , o = new XMLHttpRequest;
            if (o.open("GET", s, !1),
            "undefined" == typeof window && (o.responseType = "arraybuffer"),
            o.send(),
            !(o.status >= 200 && o.status <= 299))
                return a.err = o.status,
                xt(e, "open", u, {
                    message: o.status + ": " + o.statusText
                });
            "string" == typeof o.response ? a.f = Ne(o.response) : a.f = new Uint8Array(o.response);
            var l = Ot(a);
            l.c === i[0] && t || l.skipped && (a.buff[a.n++] = 10),
            null !== l.c && (a.buff[a.n++] = l.c);
            var c = G(e, mt, a, Te(e, -1), r)
              , _ = a.err;
            return _ ? (_e(e, u),
            xt(e, "read", u, _)) : (oe(e, u),
            c)
        }
        ;
        var Ut = function(e, t) {
            return Et(e, t, null)
        }
          , Nt = function(e, t, r) {
            var n = Oe(e);
            72 != r && je(e, Ne("core and library have incompatible numeric types")),
            n != Oe(null) ? je(e, Ne("multiple Lua VMs detected")) : n !== t && je(e, Ne("version mismatch: app. needs %f, Lua core provides %f"), t, n)
        };
        e.exports.LUA_ERRFILE = Se,
        e.exports.LUA_FILEHANDLE = Ie,
        e.exports.LUA_LOADED_TABLE = ye,
        e.exports.LUA_NOREF = -2,
        e.exports.LUA_PRELOAD_TABLE = we,
        e.exports.LUA_REFNIL = -1,
        e.exports.luaL_Buffer = De,
        e.exports.luaL_addchar = function(e, t) {
            rt(e, 1),
            e.b[e.n++] = t
        }
        ,
        e.exports.luaL_addlstring = at,
        e.exports.luaL_addsize = ot,
        e.exports.luaL_addstring = ut,
        e.exports.luaL_addvalue = function(e) {
            var t = e.L
              , r = Te(t, -1);
            at(e, r, r.length),
            j(t, 1)
        }
        ,
        e.exports.luaL_argcheck = function(e, t, r, n) {
            t || Ke(e, r, n)
        }
        ,
        e.exports.luaL_argerror = Ke,
        e.exports.luaL_buffinit = nt,
        e.exports.luaL_buffinitsize = function(e, t, r) {
            return nt(e, t),
            rt(t, r)
        }
        ,
        e.exports.luaL_callmeta = vt,
        e.exports.luaL_checkany = function(e, t) {
            be(e, t) === p && Ke(e, t, Ne("value expected", !0))
        }
        ,
        e.exports.luaL_checkinteger = tt,
        e.exports.luaL_checklstring = qe,
        e.exports.luaL_checknumber = et,
        e.exports.luaL_checkoption = function(e, t, r, n) {
            for (var a = null !== r ? $e(e, t, r) : We(e, t), u = 0; n[u]; u++)
                if (Ue(n[u], a))
                    return u;
            return Ke(e, t, J(e, Ne("invalid option '%s'"), a))
        }
        ,
        e.exports.luaL_checkstack = Tt,
        e.exports.luaL_checkstring = We,
        e.exports.luaL_checktype = function(e, t, r) {
            be(e, t) !== r && Je(e, t, r)
        }
        ,
        e.exports.luaL_checkudata = function(e, t, r) {
            var n = Ye(e, t, r);
            return null === n && Fe(e, t, r),
            n
        }
        ,
        e.exports.luaL_checkversion = function(e) {
            Nt(e, L, 72)
        }
        ,
        e.exports.luaL_checkversion_ = Nt,
        e.exports.luaL_dofile = function(e, t) {
            return Ut(e, t) || H(e, 0, o, 0)
        }
        ,
        e.exports.luaL_dostring = function(e, t) {
            return ft(e, t) || H(e, 0, o, 0)
        }
        ,
        e.exports.luaL_error = je,
        e.exports.luaL_execresult = function(e, t) {
            var r = void 0
              , n = void 0;
            if (null === t)
                return X(e, 1),
                q(e, "exit"),
                Z(e, 0),
                3;
            if (t.status)
                r = "exit",
                n = t.status;
            else {
                if (!t.signal)
                    return Xe(e, 0, null, t);
                r = "signal",
                n = t.signal
            }
            return Q(e),
            q(e, r),
            Z(e, n),
            3
        }
        ,
        e.exports.luaL_fileresult = Xe,
        e.exports.luaL_getmetafield = pt,
        e.exports.luaL_getmetatable = ze,
        e.exports.luaL_getsubtable = At,
        e.exports.luaL_gsub = function(e, t, r, n) {
            var a = void 0
              , u = new De;
            for (nt(e, u); (a = Lt(t, r)) >= 0; )
                at(u, t, a),
                ut(u, n),
                t = t.subarray(a + r.length);
            return ut(u, t),
            st(u),
            Te(e, -1)
        }
        ,
        e.exports.luaL_len = function(e, t) {
            V(e, t);
            var r = ve(e, -1);
            return !1 === r && je(e, Ne("object length is not an integer", !0)),
            j(e, 1),
            r
        }
        ,
        e.exports.luaL_loadbuffer = _t,
        e.exports.luaL_loadbufferx = ct,
        e.exports.luaL_loadfile = Ut,
        e.exports.luaL_loadfilex = Et,
        e.exports.luaL_loadstring = ft,
        e.exports.luaL_newlib = function(e, t) {
            E(e),
            gt(e, t, 0)
        }
        ,
        e.exports.luaL_newlibtable = function(e) {
            E(e)
        }
        ,
        e.exports.luaL_newmetatable = function(e, t) {
            return ze(e, t) !== f ? 0 : (j(e, 1),
            E(e, 0, 2),
            $(e, t),
            le(e, -2, Me),
            ee(e, -1),
            le(e, l, t),
            1)
        }
        ,
        e.exports.luaL_newstate = function() {
            var e = B();
            return e && T(e, Be),
            e
        }
        ,
        e.exports.luaL_opt = lt,
        e.exports.luaL_optinteger = function(e, t, r) {
            return lt(e, tt, t, r)
        }
        ,
        e.exports.luaL_optlstring = Qe,
        e.exports.luaL_optnumber = function(e, t, r) {
            return lt(e, et, t, r)
        }
        ,
        e.exports.luaL_optstring = $e,
        e.exports.luaL_prepbuffer = function(e) {
            return rt(e, a)
        }
        ,
        e.exports.luaL_prepbuffsize = rt,
        e.exports.luaL_pushresult = st,
        e.exports.luaL_pushresultsize = function(e, t) {
            ot(e, t),
            st(e)
        }
        ,
        e.exports.luaL_ref = function(e, t) {
            var r = void 0;
            return M(e, -1) ? (j(e, 1),
            -1) : (t = g(e, t),
            ae(e, t, 0),
            r = pe(e, -1),
            j(e, 1),
            0 !== r ? (ae(e, t, r),
            se(e, t, 0)) : r = ue(e, t) + 1,
            se(e, t, r),
            r)
        }
        ,
        e.exports.luaL_requiref = function(e, t, r, n) {
            At(e, l, ye),
            U(e, -1, t),
            fe(e, -1) || (j(e, 1),
            Y(e, r),
            $(e, t),
            x(e, 1, 1),
            ee(e, -1),
            le(e, -3, t)),
            oe(e, -2),
            n && (ee(e, -1),
            ie(e, t))
        }
        ,
        e.exports.luaL_setfuncs = gt,
        e.exports.luaL_setmetatable = function(e, t) {
            ze(e, t),
            ce(e, -2)
        }
        ,
        e.exports.luaL_testudata = Ye,
        e.exports.luaL_tolstring = function(e, t) {
            if (vt(e, t, Pe))
                C(e, -1) || je(e, Ne("'__tostring' must return a string"));
            else
                switch (be(e, t)) {
                case v:
                    I(e, t) ? J(e, dt, pe(e, t)) : J(e, ht, Le(e, t));
                    break;
                case d:
                    ee(e, t);
                    break;
                case c:
                    q(e, fe(e, t) ? "true" : "false");
                    break;
                case f:
                    q(e, "nil");
                    break;
                default:
                    var r = pt(e, t, Me)
                      , n = r === d ? Te(e, -1) : Ze(e, t);
                    J(e, Ne("%s: %p"), n, ge(e, t)),
                    r !== f && oe(e, -2)
                }
            return he(e, -1)
        }
        ,
        e.exports.luaL_traceback = function(e, t, r, n) {
            var a = new A
              , u = y(e)
              , s = function(e) {
                for (var t = new A, r = 1, n = 1; S(e, n, t); )
                    r = n,
                    n *= 2;
                for (; r < n; ) {
                    var a = Math.floor((r + n) / 2);
                    S(e, a, t) ? r = a + 1 : n = a
                }
                return n - 1
            }(t)
              , o = s - n > 21 ? 10 : -1;
            for (r && J(e, Ne("%s\n"), r),
            Tt(e, 10, null),
            q(e, "stack traceback:"); S(t, n++, a); )
                0 == o-- ? (q(e, "\n\t..."),
                n = s - 11 + 1) : (N(t, Ne("Slnt", !0), a),
                J(e, Ne("\n\t%s:"), a.short_src),
                a.currentline > 0 && q(e, a.currentline + ":"),
                q(e, " in "),
                Ge(e, a),
                a.istailcall && q(e, "\n\t(...tail calls..)"),
                k(e, y(e) - u));
            k(e, y(e) - u)
        }
        ,
        e.exports.luaL_typename = Ze,
        e.exports.luaL_unref = function(e, t, r) {
            r >= 0 && (t = g(e, t),
            ae(e, t, 0),
            se(e, t, r),
            Z(e, r),
            se(e, t, 0))
        }
        ,
        e.exports.luaL_where = He,
        e.exports.lua_writestringerror = function() {
            for (var e = 0; e < arguments.length; e++) {
                var t = arguments[e];
                do {
                    var r = /([^\n]*)\n?([\d\D]*)/.exec(t);
                    console.error(r[1]),
                    t = r[2]
                } while ("" !== t)
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        var n, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        , u = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }();
        function s(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
            e
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var l = r(0)
          , i = l.LUA_OPADD
          , c = l.LUA_OPBAND
          , _ = l.LUA_OPBNOT
          , f = l.LUA_OPBOR
          , p = l.LUA_OPBXOR
          , v = l.LUA_OPDIV
          , d = l.LUA_OPIDIV
          , h = l.LUA_OPMOD
          , L = l.LUA_OPMUL
          , A = l.LUA_OPPOW
          , g = l.LUA_OPSHL
          , T = l.LUA_OPSHR
          , x = l.LUA_OPSUB
          , b = l.LUA_OPUNM
          , k = l.constant_types
          , O = k.LUA_NUMTAGS
          , E = k.LUA_TBOOLEAN
          , m = k.LUA_TCCL
          , U = k.LUA_TFUNCTION
          , N = k.LUA_TLCF
          , R = k.LUA_TLCL
          , S = k.LUA_TLIGHTUSERDATA
          , y = k.LUA_TLNGSTR
          , w = k.LUA_TNIL
          , I = k.LUA_TNUMBER
          , M = k.LUA_TNUMFLT
          , P = k.LUA_TNUMINT
          , C = k.LUA_TSHRSTR
          , D = k.LUA_TSTRING
          , V = k.LUA_TTABLE
          , G = k.LUA_TTHREAD
          , B = k.LUA_TUSERDATA
          , K = l.from_userstring
          , F = l.luastring_indexOf
          , H = l.luastring_of
          , j = l.to_jsstring
          , X = l.to_luastring
          , z = r(31)
          , Y = z.lisdigit
          , J = z.lisprint
          , Z = z.lisspace
          , q = z.lisxdigit
          , W = r(11)
          , Q = r(7)
          , $ = r(10)
          , ee = r(8)
          , te = ee.luaS_bless
          , re = ee.luaS_new
          , ne = r(9)
          , ae = r(3)
          , ue = ae.LUA_COMPAT_FLOATSTRING
          , se = ae.ldexp
          , oe = ae.lua_getlocaledecpoint
          , le = ae.lua_integer2str
          , ie = ae.lua_number2str
          , ce = r(14)
          , _e = r(2)
          , fe = _e.MAX_INT
          , pe = _e.luai_nummod
          , ve = _e.lua_assert
          , de = r(15)
          , he = O
          , Le = O + 1
          , Ae = function() {
            function e(t, r) {
                o(this, e),
                this.type = t,
                this.value = r
            }
            return u(e, [{
                key: "ttype",
                value: function() {
                    return 63 & this.type
                }
            }, {
                key: "ttnov",
                value: function() {
                    return 15 & this.type
                }
            }, {
                key: "checktag",
                value: function(e) {
                    return this.type === e
                }
            }, {
                key: "checktype",
                value: function(e) {
                    return this.ttnov() === e
                }
            }, {
                key: "ttisnumber",
                value: function() {
                    return this.checktype(I)
                }
            }, {
                key: "ttisfloat",
                value: function() {
                    return this.checktag(M)
                }
            }, {
                key: "ttisinteger",
                value: function() {
                    return this.checktag(P)
                }
            }, {
                key: "ttisnil",
                value: function() {
                    return this.checktag(w)
                }
            }, {
                key: "ttisboolean",
                value: function() {
                    return this.checktag(E)
                }
            }, {
                key: "ttislightuserdata",
                value: function() {
                    return this.checktag(S)
                }
            }, {
                key: "ttisstring",
                value: function() {
                    return this.checktype(D)
                }
            }, {
                key: "ttisshrstring",
                value: function() {
                    return this.checktag(C)
                }
            }, {
                key: "ttislngstring",
                value: function() {
                    return this.checktag(y)
                }
            }, {
                key: "ttistable",
                value: function() {
                    return this.checktag(V)
                }
            }, {
                key: "ttisfunction",
                value: function() {
                    return this.checktype(U)
                }
            }, {
                key: "ttisclosure",
                value: function() {
                    return (31 & this.type) === U
                }
            }, {
                key: "ttisCclosure",
                value: function() {
                    return this.checktag(m)
                }
            }, {
                key: "ttisLclosure",
                value: function() {
                    return this.checktag(R)
                }
            }, {
                key: "ttislcf",
                value: function() {
                    return this.checktag(N)
                }
            }, {
                key: "ttisfulluserdata",
                value: function() {
                    return this.checktag(B)
                }
            }, {
                key: "ttisthread",
                value: function() {
                    return this.checktag(G)
                }
            }, {
                key: "ttisdeadkey",
                value: function() {
                    return this.checktag(Le)
                }
            }, {
                key: "l_isfalse",
                value: function() {
                    return this.ttisnil() || this.ttisboolean() && !1 === this.value
                }
            }, {
                key: "setfltvalue",
                value: function(e) {
                    this.type = M,
                    this.value = e
                }
            }, {
                key: "chgfltvalue",
                value: function(e) {
                    ve(this.type == M),
                    this.value = e
                }
            }, {
                key: "setivalue",
                value: function(e) {
                    this.type = P,
                    this.value = e
                }
            }, {
                key: "chgivalue",
                value: function(e) {
                    ve(this.type == P),
                    this.value = e
                }
            }, {
                key: "setnilvalue",
                value: function() {
                    this.type = w,
                    this.value = null
                }
            }, {
                key: "setfvalue",
                value: function(e) {
                    this.type = N,
                    this.value = e
                }
            }, {
                key: "setpvalue",
                value: function(e) {
                    this.type = S,
                    this.value = e
                }
            }, {
                key: "setbvalue",
                value: function(e) {
                    this.type = E,
                    this.value = e
                }
            }, {
                key: "setsvalue",
                value: function(e) {
                    this.type = y,
                    this.value = e
                }
            }, {
                key: "setuvalue",
                value: function(e) {
                    this.type = B,
                    this.value = e
                }
            }, {
                key: "setthvalue",
                value: function(e) {
                    this.type = G,
                    this.value = e
                }
            }, {
                key: "setclLvalue",
                value: function(e) {
                    this.type = R,
                    this.value = e
                }
            }, {
                key: "setclCvalue",
                value: function(e) {
                    this.type = m,
                    this.value = e
                }
            }, {
                key: "sethvalue",
                value: function(e) {
                    this.type = V,
                    this.value = e
                }
            }, {
                key: "setdeadvalue",
                value: function() {
                    this.type = Le,
                    this.value = null
                }
            }, {
                key: "setfrom",
                value: function(e) {
                    this.type = e.type,
                    this.value = e.value
                }
            }, {
                key: "tsvalue",
                value: function() {
                    return ve(this.ttisstring()),
                    this.value
                }
            }, {
                key: "svalue",
                value: function() {
                    return this.tsvalue().getstr()
                }
            }, {
                key: "vslen",
                value: function() {
                    return this.tsvalue().tsslen()
                }
            }, {
                key: "jsstring",
                value: function(e, t) {
                    return j(this.svalue(), e, t, !0)
                }
            }]),
            e
        }()
          , ge = function(e, t, r) {
            e.stack[t].setsvalue(r)
        }
          , Te = new Ae(w,null);
        Object.freeze(Te),
        e.exports.luaO_nilobject = Te;
        var xe = function e(t, r) {
            o(this, e),
            this.id = t.l_G.id_counter++,
            this.p = null,
            this.nupvalues = r,
            this.upvals = new Array(r)
        }
          , be = function e(t, r, n) {
            for (o(this, e),
            this.id = t.l_G.id_counter++,
            this.f = r,
            this.nupvalues = n,
            this.upvalue = new Array(n); n--; )
                this.upvalue[n] = new Ae(w,null)
        }
          , ke = function e(t, r) {
            o(this, e),
            this.id = t.l_G.id_counter++,
            this.metatable = null,
            this.uservalue = new Ae(w,null),
            this.len = r,
            this.data = Object.create(null)
        }
          , Oe = X("...")
          , Ee = X('[string "')
          , me = X('"]')
          , Ue = function(e) {
            return Y(e) ? e - 48 : (223 & e) - 55
        }
          , Ne = function(e, t) {
            var r = 1;
            if (ve(t <= 1114111),
            t < 128)
                e[7] = t;
            else {
                var n = 63;
                do {
                    e[8 - r++] = 128 | 63 & t,
                    t >>= 6,
                    n >>= 1
                } while (t > n);e[8 - r] = ~n << 1 | t
            }
            return r
        }
          , Re = function(e, t) {
            var r = "x" === t ? function(e) {
                for (var t, r = 0, n = oe(), a = 0, u = 0, s = 0, o = 0, l = !1; Z(e[r]); )
                    r++;
                if ((t = 45 === e[r]) ? r++ : 43 === e[r] && r++,
                48 !== e[r] || 120 !== e[r + 1] && 88 !== e[r + 1])
                    return null;
                for (r += 2; ; r++)
                    if (e[r] === n) {
                        if (l)
                            break;
                        l = !0
                    } else {
                        if (!q(e[r]))
                            break;
                        0 === u && 48 === e[r] ? s++ : ++u <= 30 ? a = 16 * a + Ue(e[r]) : o++,
                        l && o--
                    }
                if (s + u === 0)
                    return null;
                if (o *= 4,
                112 === e[r] || 80 === e[r]) {
                    var i, c = 0;
                    if ((i = 45 === e[++r]) ? r++ : 43 === e[r] && r++,
                    !Y(e[r]))
                        return null;
                    for (; Y(e[r]); )
                        c = 10 * c + e[r++] - 48;
                    i && (c = -c),
                    o += c
                }
                return t && (a = -a),
                {
                    n: se(a, o),
                    i: r
                }
            }(e) : function(e) {
                try {
                    e = j(e)
                } catch (e) {
                    return null
                }
                var t = /^[\t\v\f \n\r]*[+-]?(?:[0-9]+\.?[0-9]*|\.[0-9]*)(?:[eE][+-]?[0-9]+)?/.exec(e);
                if (!t)
                    return null;
                var r = parseFloat(t[0]);
                return isNaN(r) ? null : {
                    n: r,
                    i: t[0].length
                }
            }(e);
            if (null === r)
                return null;
            for (; Z(e[r.i]); )
                r.i++;
            return r.i === e.length || 0 === e[r.i] ? r : null
        }
          , Se = [46, 120, 88, 110, 78]
          , ye = (s(n = {}, 46, "."),
        s(n, 120, "x"),
        s(n, 88, "x"),
        s(n, 110, "n"),
        s(n, 78, "n"),
        n)
          , we = Math.floor(fe / 10)
          , Ie = fe % 10
          , Me = function(e, t) {
            var r = void 0;
            if (t.ttisinteger())
                r = X(le(t.value));
            else {
                var n = ie(t.value);
                !ue && /^[-0123456789]+$/.test(n) && (n += String.fromCharCode(oe()) + "0"),
                r = X(n)
            }
            t.setsvalue(te(e, r))
        }
          , Pe = function(e, t) {
            Q.luaD_inctop(e),
            ge(e, e.top - 1, re(e, t))
        }
          , Ce = function(e, t, r) {
            for (var n = 0, u = 0, s = 0, o = void 0; -1 != (o = F(t, 37, u)); ) {
                switch (Pe(e, t.subarray(u, o)),
                t[o + 1]) {
                case 115:
                    var l = r[s++];
                    if (null === l)
                        l = X("(null)", !0);
                    else {
                        l = K(l);
                        var i = F(l, 0);
                        -1 !== i && (l = l.subarray(0, i))
                    }
                    Pe(e, l);
                    break;
                case 99:
                    var c = r[s++];
                    J(c) ? Pe(e, H(c)) : De(e, X("<\\%d>", !0), c);
                    break;
                case 100:
                case 73:
                    Q.luaD_inctop(e),
                    e.stack[e.top - 1].setivalue(r[s++]),
                    Me(e, e.stack[e.top - 1]);
                    break;
                case 102:
                    Q.luaD_inctop(e),
                    e.stack[e.top - 1].setfltvalue(r[s++]),
                    Me(e, e.stack[e.top - 1]);
                    break;
                case 112:
                    var _ = r[s++];
                    if (_ instanceof $.lua_State || _ instanceof ne.Table || _ instanceof ke || _ instanceof xe || _ instanceof be)
                        Pe(e, X("0x" + _.id.toString(16)));
                    else
                        switch (void 0 === _ ? "undefined" : a(_)) {
                        case "undefined":
                            Pe(e, X("undefined"));
                            break;
                        case "number":
                            Pe(e, X("Number(" + _ + ")"));
                            break;
                        case "string":
                            Pe(e, X("String(" + JSON.stringify(_) + ")"));
                            break;
                        case "boolean":
                            Pe(e, X(_ ? "Boolean(true)" : "Boolean(false)"));
                            break;
                        case "object":
                            if (null === _) {
                                Pe(e, X("null"));
                                break
                            }
                        case "function":
                            var f = e.l_G.ids.get(_);
                            f || (f = e.l_G.id_counter++,
                            e.l_G.ids.set(_, f)),
                            Pe(e, X("0x" + f.toString(16)));
                            break;
                        default:
                            Pe(e, X("<id NYI>"))
                        }
                    break;
                case 85:
                    var p = new Uint8Array(8)
                      , v = Ne(p, r[s++]);
                    Pe(e, p.subarray(8 - v));
                    break;
                case 37:
                    Pe(e, X("%", !0));
                    break;
                default:
                    W.luaG_runerror(e, X("invalid option '%%%c' to 'lua_pushfstring'"), t[o + 1])
                }
                n += 2,
                u = o + 2
            }
            return Q.luaD_checkstack(e, 1),
            Pe(e, t.subarray(u)),
            n > 0 && ce.luaV_concat(e, n + 1),
            e.stack[e.top - 1].svalue()
        }
          , De = function(e, t) {
            for (var r = arguments.length, n = Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
                n[a - 2] = arguments[a];
            return Ce(e, t, n)
        }
          , Ve = function(e, t, r, n) {
            switch (t) {
            case i:
                return r + n | 0;
            case x:
                return r - n | 0;
            case L:
                return ce.luaV_imul(r, n);
            case h:
                return ce.luaV_mod(e, r, n);
            case d:
                return ce.luaV_div(e, r, n);
            case c:
                return r & n;
            case f:
                return r | n;
            case p:
                return r ^ n;
            case g:
                return ce.luaV_shiftl(r, n);
            case T:
                return ce.luaV_shiftl(r, -n);
            case b:
                return 0 - r | 0;
            case _:
                return -1 ^ r;
            default:
                ve(0)
            }
        }
          , Ge = function(e, t, r, n) {
            switch (t) {
            case i:
                return r + n;
            case x:
                return r - n;
            case L:
                return r * n;
            case v:
                return r / n;
            case A:
                return Math.pow(r, n);
            case d:
                return Math.floor(r / n);
            case b:
                return -r;
            case h:
                return pe(e, r, n);
            default:
                ve(0)
            }
        };
        e.exports.CClosure = be,
        e.exports.LClosure = xe,
        e.exports.LUA_TDEADKEY = Le,
        e.exports.LUA_TPROTO = he,
        e.exports.LocVar = function e() {
            o(this, e),
            this.varname = null,
            this.startpc = NaN,
            this.endpc = NaN
        }
        ,
        e.exports.TValue = Ae,
        e.exports.Udata = ke,
        e.exports.UTF8BUFFSZ = 8,
        e.exports.luaO_arith = function(e, t, r, n, a) {
            var u = "number" == typeof a ? e.stack[a] : a;
            switch (t) {
            case c:
            case f:
            case p:
            case g:
            case T:
            case _:
                var s, o = void 0;
                if (!1 !== (s = ce.tointeger(r)) && !1 !== (o = ce.tointeger(n)))
                    return void u.setivalue(Ve(e, t, s, o));
                break;
            case v:
            case A:
                var l, d = void 0;
                if (!1 !== (l = ce.tonumber(r)) && !1 !== (d = ce.tonumber(n)))
                    return void u.setfltvalue(Ge(e, t, l, d));
                break;
            default:
                var h = void 0
                  , L = void 0;
                if (r.ttisinteger() && n.ttisinteger())
                    return void u.setivalue(Ve(e, t, r.value, n.value));
                if (!1 !== (h = ce.tonumber(r)) && !1 !== (L = ce.tonumber(n)))
                    return void u.setfltvalue(Ge(e, t, h, L))
            }
            ve(null !== e),
            de.luaT_trybinTM(e, r, n, a, t - i + de.TMS.TM_ADD)
        }
        ,
        e.exports.luaO_chunkid = function(e, t) {
            var r = e.length
              , n = void 0;
            if (61 === e[0])
                r < t ? (n = new Uint8Array(r - 1)).set(e.subarray(1)) : (n = new Uint8Array(t)).set(e.subarray(1, t + 1));
            else if (64 === e[0])
                r <= t ? (n = new Uint8Array(r - 1)).set(e.subarray(1)) : ((n = new Uint8Array(t)).set(Oe),
                t -= Oe.length,
                n.set(e.subarray(r - t), Oe.length));
            else {
                n = new Uint8Array(t);
                var a = F(e, 10);
                n.set(Ee);
                var u = Ee.length;
                r < (t -= Ee.length + Oe.length + me.length) && -1 === a ? (n.set(e, u),
                u += e.length) : (-1 !== a && (r = a),
                r > t && (r = t),
                n.set(e.subarray(0, r), u),
                u += r,
                n.set(Oe, u),
                u += Oe.length),
                n.set(me, u),
                u += me.length,
                n = n.subarray(0, u)
            }
            return n
        }
        ,
        e.exports.luaO_hexavalue = Ue,
        e.exports.luaO_int2fb = function(e) {
            var t = 0;
            if (e < 8)
                return e;
            for (; e >= 128; )
                e = e + 15 >> 4,
                t += 4;
            for (; e >= 16; )
                e = e + 1 >> 1,
                t++;
            return t + 1 << 3 | e - 8
        }
        ,
        e.exports.luaO_pushfstring = De,
        e.exports.luaO_pushvfstring = Ce,
        e.exports.luaO_str2num = function(e, t) {
            var r = function(e) {
                for (var t, r = 0, n = 0, a = !0; Z(e[r]); )
                    r++;
                if ((t = 45 === e[r]) ? r++ : 43 === e[r] && r++,
                48 !== e[r] || 120 !== e[r + 1] && 88 !== e[r + 1])
                    for (; r < e.length && Y(e[r]); r++) {
                        var u = e[r] - 48;
                        if (n >= we && (n > we || u > Ie + t))
                            return null;
                        n = 10 * n + u | 0,
                        a = !1
                    }
                else
                    for (r += 2; r < e.length && q(e[r]); r++)
                        n = 16 * n + Ue(e[r]) | 0,
                        a = !1;
                for (; r < e.length && Z(e[r]); )
                    r++;
                return a || r !== e.length && 0 !== e[r] ? null : {
                    n: 0 | (t ? -n : n),
                    i: r
                }
            }(e);
            return null !== r ? (t.setivalue(r.n),
            r.i + 1) : null !== (r = function(e) {
                for (var t = e.length, r = 0, n = 0; n < t; n++) {
                    var a = e[n];
                    if (-1 !== Se.indexOf(a)) {
                        r = a;
                        break
                    }
                }
                var u = ye[r];
                return "n" === u ? null : Re(e, u)
            }(e)) ? (t.setfltvalue(r.n),
            r.i + 1) : 0
        }
        ,
        e.exports.luaO_tostring = Me,
        e.exports.luaO_utf8esc = Ne,
        e.exports.numarith = Ge,
        e.exports.pushobj2s = function(e, t) {
            e.stack[e.top++] = new Ae(t.type,t.value)
        }
        ,
        e.exports.pushsvalue2s = function(e, t) {
            e.stack[e.top++] = new Ae(y,t)
        }
        ,
        e.exports.setobjs2s = function(e, t, r) {
            e.stack[t].setfrom(e.stack[r])
        }
        ,
        e.exports.setobj2s = function(e, t, r) {
            e.stack[t].setfrom(r)
        }
        ,
        e.exports.setsvalue2s = ge
    }
    , function(e, t, r) {
        "use strict";
        var n = r(0)
          , a = "Fengari 0.1.2  Copyright (C) 2017-2018 B. Giannangeli, Daurnimator\nBased on: " + n.LUA_COPYRIGHT;
        e.exports.FENGARI_AUTHORS = "B. Giannangeli, Daurnimator",
        e.exports.FENGARI_COPYRIGHT = a,
        e.exports.FENGARI_RELEASE = "Fengari 0.1.2",
        e.exports.FENGARI_VERSION = "Fengari 0.1",
        e.exports.FENGARI_VERSION_MAJOR = "0",
        e.exports.FENGARI_VERSION_MINOR = "1",
        e.exports.FENGARI_VERSION_NUM = 1,
        e.exports.FENGARI_VERSION_RELEASE = "2",
        e.exports.is_luastring = n.is_luastring,
        e.exports.luastring_eq = n.luastring_eq,
        e.exports.luastring_from = n.luastring_from,
        e.exports.luastring_indexOf = n.luastring_indexOf,
        e.exports.luastring_of = n.luastring_of,
        e.exports.to_jsstring = n.to_jsstring,
        e.exports.to_luastring = n.to_luastring,
        e.exports.to_uristring = n.to_uristring,
        e.exports.from_userstring = n.from_userstring
    }
    , function(e, t, r) {
        "use strict";
        var n = r(0)
          , a = n.LUA_HOOKCALL
          , u = n.LUA_HOOKRET
          , s = n.LUA_HOOKTAILCALL
          , o = n.LUA_MASKCALL
          , l = n.LUA_MASKLINE
          , i = n.LUA_MASKRET
          , c = n.LUA_MINSTACK
          , _ = n.LUA_MULTRET
          , f = n.LUA_SIGNATURE
          , p = n.constant_types
          , v = p.LUA_TCCL
          , d = p.LUA_TLCF
          , h = p.LUA_TLCL
          , L = p.LUA_TNIL
          , A = n.thread_status
          , g = A.LUA_ERRMEM
          , T = A.LUA_ERRERR
          , x = A.LUA_ERRRUN
          , b = A.LUA_ERRSYNTAX
          , k = A.LUA_OK
          , O = A.LUA_YIELD
          , E = n.lua_Debug
          , m = n.luastring_indexOf
          , U = n.to_luastring
          , N = r(18)
          , R = r(11)
          , S = r(16)
          , y = r(2)
          , w = y.api_check
          , I = y.lua_assert
          , M = y.LUAI_MAXCCALLS
          , P = r(5)
          , C = r(13)
          , D = r(30)
          , V = r(10)
          , G = r(8).luaS_newliteral
          , B = r(15)
          , K = r(3).LUAI_MAXSTACK
          , F = r(37)
          , H = r(14)
          , j = r(17).MBuffer
          , X = function(e, t) {
            if (e.top < t)
                for (; e.top < t; )
                    e.stack[e.top++] = new P.TValue(L,null);
            else
                for (; e.top > t; )
                    delete e.stack[--e.top]
        }
          , z = function(e, t, r) {
            for (var n = e.top; e.top < r + 1; )
                e.stack[e.top++] = new P.TValue(L,null);
            switch (t) {
            case g:
                P.setsvalue2s(e, r, G(e, "not enough memory"));
                break;
            case T:
                P.setsvalue2s(e, r, G(e, "error in error handling"));
                break;
            default:
                P.setobjs2s(e, r, n - 1)
            }
            for (; e.top > r + 1; )
                delete e.stack[--e.top]
        }
          , Y = K + 200
          , J = function(e, t) {
            I(t <= K || t == Y),
            I(e.stack_last == e.stack.length - V.EXTRA_STACK),
            e.stack.length = t,
            e.stack_last = t - V.EXTRA_STACK
        }
          , Z = function(e, t) {
            var r = e.stack.length;
            if (r > K)
                se(e, T);
            else {
                var n = e.top + t + V.EXTRA_STACK
                  , a = 2 * r;
                a > K && (a = K),
                a < n && (a = n),
                a > K ? (J(e, Y),
                R.luaG_runerror(e, U("stack overflow", !0))) : J(e, a)
            }
        }
          , q = function(e, t) {
            e.stack_last - e.top <= t && Z(e, t)
        }
          , W = function(e) {
            var t = function(e) {
                for (var t = e.top, r = e.ci; null !== r; r = r.previous)
                    t < r.top && (t = r.top);
                return I(t <= e.stack_last),
                t + 1
            }(e)
              , r = t + Math.floor(t / 8) + 2 * V.EXTRA_STACK;
            r > K && (r = K),
            e.stack.length > K && V.luaE_freeCI(e),
            t <= K - V.EXTRA_STACK && r < e.stack.length && J(e, r)
        }
          , Q = function e(t, r, n) {
            var u = t.stack[r];
            switch (u.type) {
            case v:
            case d:
                var s = u.type === v ? u.value.f : u.value;
                q(t, c);
                var l = V.luaE_extendCI(t);
                l.funcOff = r,
                l.nresults = n,
                l.func = u,
                l.top = t.top + c,
                I(l.top <= t.stack_last),
                l.callstatus = 0,
                t.hookmask & o && te(t, a, -1);
                var i = s(t);
                if ("number" != typeof i || i < 0 || (0 | i) !== i)
                    throw Error("invalid return value from JS function (expected integer)");
                return N.api_checknelems(t, i),
                $(t, l, t.top - i, i),
                !0;
            case h:
                var _ = void 0
                  , f = u.value.p
                  , p = t.top - r - 1
                  , A = f.maxstacksize;
                if (q(t, A),
                f.is_vararg)
                    _ = ne(t, f, p);
                else {
                    for (; p < f.numparams; p++)
                        t.stack[t.top++] = new P.TValue(L,null);
                    _ = r + 1
                }
                var g = V.luaE_extendCI(t);
                return g.funcOff = r,
                g.nresults = n,
                g.func = u,
                g.l_base = _,
                g.top = _ + A,
                X(t, g.top),
                g.l_code = f.code,
                g.l_savedpc = 0,
                g.callstatus = V.CIST_LUA,
                t.hookmask & o && re(t, g),
                !1;
            default:
                return q(t, 1),
                ae(t, r, u),
                e(t, r, n)
            }
        }
          , $ = function(e, t, r, n) {
            var a = t.nresults;
            e.hookmask & (i | l) && (e.hookmask & i && te(e, u, -1),
            e.oldpc = t.previous.l_savedpc);
            var s = t.funcOff;
            return e.ci = t.previous,
            e.ci.next = null,
            ee(e, r, s, n, a)
        }
          , ee = function(e, t, r, n, a) {
            switch (a) {
            case 0:
                break;
            case 1:
                0 === n ? e.stack[r].setnilvalue() : P.setobjs2s(e, r, t);
                break;
            case _:
                for (var u = 0; u < n; u++)
                    P.setobjs2s(e, r + u, t + u);
                for (var s = e.top; s >= r + n; s--)
                    delete e.stack[s];
                return e.top = r + n,
                !1;
            default:
                var o = void 0;
                if (a <= n)
                    for (o = 0; o < a; o++)
                        P.setobjs2s(e, r + o, t + o);
                else {
                    for (o = 0; o < n; o++)
                        P.setobjs2s(e, r + o, t + o);
                    for (; o < a; o++)
                        r + o >= e.top ? e.stack[r + o] = new P.TValue(L,null) : e.stack[r + o].setnilvalue()
                }
            }
            for (var l = r + a, i = e.top; i >= l; i--)
                delete e.stack[i];
            return e.top = l,
            !0
        }
          , te = function(e, t, r) {
            var n = e.hook;
            if (n && e.allowhook) {
                var a = e.ci
                  , u = e.top
                  , s = a.top
                  , o = new E;
                o.event = t,
                o.currentline = r,
                o.i_ci = a,
                q(e, c),
                a.top = e.top + c,
                I(a.top <= e.stack_last),
                e.allowhook = 0,
                a.callstatus |= V.CIST_HOOKED,
                n(e, o),
                I(!e.allowhook),
                e.allowhook = 1,
                a.top = s,
                X(e, u),
                a.callstatus &= ~V.CIST_HOOKED
            }
        }
          , re = function(e, t) {
            var r = a;
            t.l_savedpc++,
            t.previous.callstatus & V.CIST_LUA && t.previous.l_code[t.previous.l_savedpc - 1].opcode == C.OpCodesI.OP_TAILCALL && (t.callstatus |= V.CIST_TAIL,
            r = s),
            te(e, r, -1),
            t.l_savedpc--
        }
          , ne = function(e, t, r) {
            var n = t.numparams
              , a = e.top - r
              , u = e.top
              , s = void 0;
            for (s = 0; s < n && s < r; s++)
                P.pushobj2s(e, e.stack[a + s]),
                e.stack[a + s].setnilvalue();
            for (; s < n; s++)
                e.stack[e.top++] = new P.TValue(L,null);
            return u
        }
          , ae = function(e, t, r) {
            var n = B.luaT_gettmbyobj(e, r, B.TMS.TM_CALL);
            n.ttisfunction(n) || R.luaG_typeerror(e, r, U("call", !0)),
            P.pushobj2s(e, e.stack[e.top - 1]);
            for (var a = e.top - 2; a > t; a--)
                P.setobjs2s(e, a, a - 1);
            P.setobj2s(e, t, n)
        }
          , ue = function(e, t, r) {
            ++e.nCcalls >= M && function(e) {
                e.nCcalls === M ? R.luaG_runerror(e, U("JS stack overflow", !0)) : e.nCcalls >= M + (M >> 3) && se(e, T)
            }(e),
            Q(e, t, r) || H.luaV_execute(e),
            e.nCcalls--
        }
          , se = function e(t, r) {
            if (t.errorJmp)
                throw t.errorJmp.status = r,
                t.errorJmp;
            var n = t.l_G;
            if (t.status = r,
            !n.mainthread.errorJmp) {
                var a = n.panic;
                throw a && (z(t, r, t.top),
                t.ci.top < t.top && (t.ci.top = t.top),
                a(t)),
                new Error("Aborted " + r)
            }
            n.mainthread.stack[n.mainthread.top++] = t.stack[t.top - 1],
            e(n.mainthread, r)
        }
          , oe = function(e, t, r) {
            var n = e.nCcalls
              , a = {
                status: k,
                previous: e.errorJmp
            };
            e.errorJmp = a;
            try {
                t(e, r)
            } catch (t) {
                if (a.status === k) {
                    var u = e.l_G.atnativeerror;
                    if (u)
                        try {
                            if (a.status = k,
                            N.lua_pushcfunction(e, u),
                            N.lua_pushlightuserdata(e, t),
                            de(e, e.top - 2, 1),
                            0 !== e.errfunc) {
                                var s = e.errfunc;
                                P.pushobj2s(e, e.stack[e.top - 1]),
                                P.setobjs2s(e, e.top - 2, s),
                                de(e, e.top - 2, 1)
                            }
                            a.status = x
                        } catch (e) {
                            a.status === k && (a.status = -1)
                        }
                    else
                        a.status = -1
                }
            }
            return e.errorJmp = a.previous,
            e.nCcalls = n,
            a.status
        }
          , le = function(e, t) {
            var r = e.ci;
            I(null !== r.c_k && 0 === e.nny),
            I(r.callstatus & V.CIST_YPCALL || t === O),
            r.callstatus & V.CIST_YPCALL && (r.callstatus &= ~V.CIST_YPCALL,
            e.errfunc = r.c_old_errfunc),
            r.nresults === _ && e.ci.top < e.top && (e.ci.top = e.top);
            var n = (0,
            r.c_k)(e, t, r.c_ctx);
            N.api_checknelems(e, n),
            $(e, r, e.top - n, n)
        }
          , ie = function(e, t) {
            for (null !== t && le(e, t); e.ci !== e.base_ci; )
                e.ci.callstatus & V.CIST_LUA ? (H.luaV_finishOp(e),
                H.luaV_execute(e)) : le(e, O)
        }
          , ce = function(e, t) {
            var r = function(e) {
                for (var t = e.ci; null !== t; t = t.previous)
                    if (t.callstatus & V.CIST_YPCALL)
                        return t;
                return null
            }(e);
            if (null === r)
                return 0;
            var n = r.extra;
            return S.luaF_close(e, n),
            z(e, t, n),
            e.ci = r,
            e.allowhook = r.callstatus & V.CIST_OAH,
            e.nny = 0,
            W(e),
            e.errfunc = r.c_old_errfunc,
            1
        }
          , _e = function(e, t, r) {
            var n = G(e, t);
            if (0 === r)
                P.pushsvalue2s(e, n),
                w(e, e.top <= e.ci.top, "stack overflow");
            else {
                for (var a = 1; a < r; a++)
                    delete e.stack[--e.top];
                P.setsvalue2s(e, e.top - 1, n)
            }
            return x
        }
          , fe = function(e, t) {
            var r = e.top - t
              , n = e.ci;
            e.status === k ? Q(e, r - 1, _) || H.luaV_execute(e) : (I(e.status === O),
            e.status = k,
            n.funcOff = n.extra,
            n.func = e.stack[n.funcOff],
            n.callstatus & V.CIST_LUA ? H.luaV_execute(e) : (null !== n.c_k && (t = n.c_k(e, O, n.c_ctx),
            N.api_checknelems(e, t),
            r = e.top - t),
            $(e, n, r, t)),
            ie(e, null))
        }
          , pe = function(e, t, r, n) {
            var a = e.ci;
            return N.api_checknelems(e, t),
            e.nny > 0 && (e !== e.l_G.mainthread ? R.luaG_runerror(e, U("attempt to yield across a JS-call boundary", !0)) : R.luaG_runerror(e, U("attempt to yield from outside a coroutine", !0))),
            e.status = O,
            a.extra = a.funcOff,
            a.callstatus & V.CIST_LUA ? w(e, null === n, "hooks cannot continue after yielding") : (a.c_k = n,
            null !== n && (a.c_ctx = r),
            a.funcOff = e.top - t - 1,
            a.func = e.stack[a.funcOff],
            se(e, O)),
            I(a.callstatus & V.CIST_HOOKED),
            0
        }
          , ve = function(e, t, r, n, a) {
            var u = e.ci
              , s = e.allowhook
              , o = e.nny
              , l = e.errfunc;
            e.errfunc = a;
            var i = oe(e, t, r);
            return i !== k && (S.luaF_close(e, n),
            z(e, i, n),
            e.ci = u,
            e.allowhook = s,
            e.nny = o,
            W(e)),
            e.errfunc = l,
            i
        }
          , de = function(e, t, r) {
            e.nny++,
            ue(e, t, r),
            e.nny--
        }
          , he = function e(t, r, n) {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this.z = t,
            this.buff = new j,
            this.dyd = new D.Dyndata,
            this.mode = n,
            this.name = r
        }
          , Le = function(e, t, r) {
            t && -1 === m(t, r[0]) && (P.luaO_pushfstring(e, U("attempt to load a %s chunk (mode is '%s')"), r, t),
            se(e, b))
        }
          , Ae = function(e, t) {
            var r = void 0
              , n = t.z.zgetc();
            n === f[0] ? (Le(e, t.mode, U("binary", !0)),
            r = F.luaU_undump(e, t.z, t.name)) : (Le(e, t.mode, U("text", !0)),
            r = D.luaY_parser(e, t.z, t.buff, t.dyd, t.name, n)),
            I(r.nupvalues === r.p.upvalues.length),
            S.luaF_initupvals(e, r)
        };
        e.exports.adjust_top = X,
        e.exports.luaD_call = ue,
        e.exports.luaD_callnoyield = de,
        e.exports.luaD_checkstack = q,
        e.exports.luaD_growstack = Z,
        e.exports.luaD_hook = te,
        e.exports.luaD_inctop = function(e) {
            q(e, 1),
            e.stack[e.top++] = new P.TValue(L,null)
        }
        ,
        e.exports.luaD_pcall = ve,
        e.exports.luaD_poscall = $,
        e.exports.luaD_precall = Q,
        e.exports.luaD_protectedparser = function(e, t, r, n) {
            var a = new he(t,r,n);
            e.nny++;
            var u = ve(e, Ae, a, e.top, e.errfunc);
            return e.nny--,
            u
        }
        ,
        e.exports.luaD_rawrunprotected = oe,
        e.exports.luaD_reallocstack = J,
        e.exports.luaD_throw = se,
        e.exports.lua_isyieldable = function(e) {
            return 0 === e.nny
        }
        ,
        e.exports.lua_resume = function(e, t, r) {
            var n = e.nny;
            if (e.status === k) {
                if (e.ci !== e.base_ci)
                    return _e(e, "cannot resume non-suspended coroutine", r)
            } else if (e.status !== O)
                return _e(e, "cannot resume dead coroutine", r);
            if (e.nCcalls = t ? t.nCcalls + 1 : 1,
            e.nCcalls >= M)
                return _e(e, "JS stack overflow", r);
            e.nny = 0,
            N.api_checknelems(e, e.status === k ? r + 1 : r);
            var a = oe(e, fe, r);
            if (-1 === a)
                a = x;
            else {
                for (; a > O && ce(e, a); )
                    a = oe(e, ie, a);
                a > O ? (e.status = a,
                z(e, a, e.top),
                e.ci.top = e.top) : I(a === e.status)
            }
            return e.nny = n,
            e.nCcalls--,
            I(e.nCcalls === (t ? t.nCcalls : 0)),
            a
        }
        ,
        e.exports.lua_yield = function(e, t) {
            pe(e, t, 0, null)
        }
        ,
        e.exports.lua_yieldk = pe
    }
    , function(e, t, r) {
        "use strict";
        var n = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }();
        var a = r(0)
          , u = a.is_luastring
          , s = a.luastring_eq
          , o = a.luastring_from
          , l = a.to_luastring
          , i = r(2).lua_assert
          , c = function() {
            function e(t, r) {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.hash = null,
                this.realstring = r
            }
            return n(e, [{
                key: "getstr",
                value: function() {
                    return this.realstring
                }
            }, {
                key: "tsslen",
                value: function() {
                    return this.realstring.length
                }
            }]),
            e
        }()
          , _ = function(e) {
            i(u(e));
            for (var t = e.length, r = "|", n = 0; n < t; n++)
                r += e[n].toString(16);
            return r
        }
          , f = function(e, t) {
            return i(t instanceof Uint8Array),
            new c(e,t)
        };
        e.exports.luaS_eqlngstr = function(e, t) {
            return i(e instanceof c),
            i(t instanceof c),
            e == t || s(e.realstring, t.realstring)
        }
        ,
        e.exports.luaS_hash = _,
        e.exports.luaS_hashlongstr = function(e) {
            return i(e instanceof c),
            null === e.hash && (e.hash = _(e.getstr())),
            e.hash
        }
        ,
        e.exports.luaS_bless = f,
        e.exports.luaS_new = function(e, t) {
            return f(e, o(t))
        }
        ,
        e.exports.luaS_newliteral = function(e, t) {
            return f(e, l(t))
        }
        ,
        e.exports.TString = c
    }
    , function(e, t, r) {
        "use strict";
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        var a = r(0)
          , u = a.constant_types
          , s = u.LUA_TBOOLEAN
          , o = u.LUA_TCCL
          , l = u.LUA_TLCF
          , i = u.LUA_TLCL
          , c = u.LUA_TLIGHTUSERDATA
          , _ = u.LUA_TLNGSTR
          , f = u.LUA_TNIL
          , p = u.LUA_TNUMFLT
          , v = u.LUA_TNUMINT
          , d = u.LUA_TSHRSTR
          , h = u.LUA_TTABLE
          , L = u.LUA_TTHREAD
          , A = u.LUA_TUSERDATA
          , g = a.to_luastring
          , T = r(2).lua_assert
          , x = r(11)
          , b = r(5)
          , k = r(8)
          , O = k.luaS_hashlongstr
          , E = k.TString
          , m = r(10)
          , U = new WeakMap
          , N = function(e) {
            var t = U.get(e);
            return t || (t = {},
            U.set(e, t)),
            t
        }
          , R = function(e, t) {
            switch (t.type) {
            case f:
                return x.luaG_runerror(e, g("table index is nil", !0));
            case p:
                if (isNaN(t.value))
                    return x.luaG_runerror(e, g("table index is NaN", !0));
            case v:
            case s:
            case h:
            case i:
            case l:
            case o:
            case A:
            case L:
                return t.value;
            case d:
            case _:
                return O(t.tsvalue());
            case c:
                var r = t.value;
                switch (void 0 === r ? "undefined" : n(r)) {
                case "string":
                    return "*" + r;
                case "number":
                    return "#" + r;
                case "boolean":
                    return r ? "?true" : "?false";
                case "function":
                    return N(r);
                case "object":
                    if (r instanceof m.lua_State && r.l_G === e.l_G || r instanceof S || r instanceof b.Udata || r instanceof b.LClosure || r instanceof b.CClosure)
                        return N(r);
                default:
                    return r
                }
            default:
                throw new Error("unknown key type: " + t.type)
            }
        }
          , S = function e(t) {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this.id = t.l_G.id_counter++,
            this.strong = new Map,
            this.dead_strong = new Map,
            this.dead_weak = void 0,
            this.f = void 0,
            this.l = void 0,
            this.metatable = null,
            this.flags = -1
        }
          , y = function(e, t, r, n) {
            e.dead_strong.clear(),
            e.dead_weak = void 0;
            var a = null
              , u = {
                key: r,
                value: n,
                p: a = e.l,
                n: void 0
            };
            e.f || (e.f = u),
            a && (a.n = u),
            e.strong.set(t, u),
            e.l = u
        }
          , w = function(e, t) {
            var r, a = e.strong.get(t);
            if (a) {
                a.key.setdeadvalue(),
                a.value = void 0;
                var u = a.n
                  , s = a.p;
                a.p = void 0,
                s && (s.n = u),
                u && (u.p = s),
                e.f === a && (e.f = u),
                e.l === a && (e.l = s),
                e.strong.delete(t),
                ("object" === (void 0 === (r = t) ? "undefined" : n(r)) ? null !== r : "function" == typeof r) ? (e.dead_weak || (e.dead_weak = new WeakMap),
                e.dead_weak.set(t, a)) : e.dead_strong.set(t, a)
            }
        }
          , I = function(e, t) {
            var r = e.strong.get(t);
            return r ? r.value : b.luaO_nilobject
        }
          , M = function(e, t) {
            return T("number" == typeof t && (0 | t) === t),
            I(e, t)
        };
        e.exports.invalidateTMcache = function(e) {
            e.flags = 0
        }
        ,
        e.exports.luaH_delete = function(e, t, r) {
            T(r instanceof b.TValue);
            var n = R(e, r);
            return w(t, n)
        }
        ,
        e.exports.luaH_get = function(e, t, r) {
            return T(r instanceof b.TValue),
            r.ttisnil() || r.ttisfloat() && isNaN(r.value) ? b.luaO_nilobject : I(t, R(e, r))
        }
        ,
        e.exports.luaH_getint = M,
        e.exports.luaH_getn = function(e) {
            for (var t = 0, r = e.strong.size + 1; r - t > 1; ) {
                var n = Math.floor((t + r) / 2);
                M(e, n).ttisnil() ? r = n : t = n
            }
            return t
        }
        ,
        e.exports.luaH_getstr = function(e, t) {
            return T(t instanceof E),
            I(e, O(t))
        }
        ,
        e.exports.luaH_set = function(e, t, r) {
            return T(r instanceof b.TValue),
            function(e, t, r) {
                var n = e.strong.get(t);
                if (n)
                    return n.value;
                var a = r.value;
                r = r.ttisfloat() && (0 | a) === a ? new b.TValue(v,a) : new b.TValue(r.type,a);
                var u = new b.TValue(f,null);
                return y(e, t, r, u),
                u
            }(t, R(e, r), r)
        }
        ,
        e.exports.luaH_setint = function(e, t, r) {
            T("number" == typeof t && (0 | t) === t && r instanceof b.TValue);
            var n = t;
            if (r.ttisnil())
                w(e, n);
            else {
                var a = e.strong.get(n);
                if (a)
                    a.value.setfrom(r);
                else {
                    var u = new b.TValue(v,t)
                      , s = new b.TValue(r.type,r.value);
                    y(e, n, u, s)
                }
            }
        }
        ,
        e.exports.luaH_new = function(e) {
            return new S(e)
        }
        ,
        e.exports.luaH_next = function(e, t, r) {
            var n = e.stack[r]
              , a = void 0;
            if (n.type === f) {
                if (!(a = t.f))
                    return !1
            } else {
                var u = R(e, n);
                if (a = t.strong.get(u)) {
                    if (!(a = a.n))
                        return !1
                } else {
                    if (!(a = t.dead_weak && t.dead_weak.get(u) || t.dead_strong.get(u)))
                        return x.luaG_runerror(e, g("invalid key to 'next'"));
                    do {
                        if (!(a = a.n))
                            return !1
                    } while (a.key.ttisdeadkey())
                }
            }
            return b.setobj2s(e, r, a.key),
            b.setobj2s(e, r + 1, a.value),
            !0
        }
        ,
        e.exports.Table = S
    }
    , function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var a = r(0)
          , u = a.LUA_MINSTACK
          , s = a.LUA_RIDX_GLOBALS
          , o = a.LUA_RIDX_MAINTHREAD
          , l = a.constant_types
          , i = l.LUA_NUMTAGS
          , c = l.LUA_TNIL
          , _ = l.LUA_TTABLE
          , f = l.LUA_TTHREAD
          , p = a.thread_status.LUA_OK
          , v = r(5)
          , d = r(7)
          , h = r(18)
          , L = r(9)
          , A = r(15)
          , g = 2 * u
          , T = function e() {
            n(this, e),
            this.func = null,
            this.funcOff = NaN,
            this.top = NaN,
            this.previous = null,
            this.next = null,
            this.l_base = NaN,
            this.l_code = null,
            this.l_savedpc = NaN,
            this.c_k = null,
            this.c_old_errfunc = null,
            this.c_ctx = null,
            this.nresults = NaN,
            this.callstatus = NaN
        }
          , x = function e(t) {
            n(this, e),
            this.id = t.id_counter++,
            this.base_ci = new T,
            this.top = NaN,
            this.stack_last = NaN,
            this.oldpc = NaN,
            this.l_G = t,
            this.stack = null,
            this.ci = null,
            this.errorJmp = null,
            this.nCcalls = 0,
            this.hook = null,
            this.hookmask = 0,
            this.basehookcount = 0,
            this.allowhook = 1,
            this.hookcount = this.basehookcount,
            this.nny = 1,
            this.status = p,
            this.errfunc = 0
        }
          , b = function(e) {
            e.ci.next = null
        }
          , k = function(e, t) {
            e.stack = new Array(g),
            e.top = 0,
            e.stack_last = g - 5;
            var r = e.base_ci;
            r.next = r.previous = null,
            r.callstatus = 0,
            r.funcOff = e.top,
            r.func = e.stack[e.top],
            e.stack[e.top++] = new v.TValue(c,null),
            r.top = e.top + u,
            e.ci = r
        }
          , O = function(e) {
            e.ci = e.base_ci,
            b(e),
            e.stack = null
        }
          , E = function(e) {
            var t = e.l_G;
            k(e),
            function(e, t) {
                var r = L.luaH_new(e);
                t.l_registry.sethvalue(r),
                L.luaH_setint(r, o, new v.TValue(f,e)),
                L.luaH_setint(r, s, new v.TValue(_,L.luaH_new(e)))
            }(e, t),
            A.luaT_init(e),
            t.version = h.lua_version(null)
        };
        e.exports.lua_State = x,
        e.exports.CallInfo = T,
        e.exports.CIST_OAH = 1,
        e.exports.CIST_LUA = 2,
        e.exports.CIST_HOOKED = 4,
        e.exports.CIST_FRESH = 8,
        e.exports.CIST_YPCALL = 16,
        e.exports.CIST_TAIL = 32,
        e.exports.CIST_HOOKYIELD = 64,
        e.exports.CIST_LEQ = 128,
        e.exports.CIST_FIN = 256,
        e.exports.EXTRA_STACK = 5,
        e.exports.lua_close = function(e) {
            !function(e) {
                O(e)
            }(e = e.l_G.mainthread)
        }
        ,
        e.exports.lua_newstate = function() {
            var e = new function e() {
                n(this, e),
                this.id_counter = 1,
                this.ids = new WeakMap,
                this.mainthread = null,
                this.l_registry = new v.TValue(c,null),
                this.panic = null,
                this.atnativeerror = null,
                this.version = null,
                this.tmname = new Array(A.TMS.TM_N),
                this.mt = new Array(i)
            }
              , t = new x(e);
            return e.mainthread = t,
            d.luaD_rawrunprotected(t, E, null) !== p && (t = null),
            t
        }
        ,
        e.exports.lua_newthread = function(e) {
            var t = e.l_G
              , r = new x(t);
            return e.stack[e.top] = new v.TValue(f,r),
            h.api_incr_top(e),
            r.hookmask = e.hookmask,
            r.basehookcount = e.basehookcount,
            r.hook = e.hook,
            r.hookcount = r.basehookcount,
            k(r),
            r
        }
        ,
        e.exports.luaE_extendCI = function(e) {
            var t = new T;
            return e.ci.next = t,
            t.previous = e.ci,
            t.next = null,
            e.ci = t,
            t
        }
        ,
        e.exports.luaE_freeCI = b,
        e.exports.luaE_freethread = function(e, t) {
            O(t)
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(0)
          , a = n.LUA_HOOKCOUNT
          , u = n.LUA_HOOKLINE
          , s = n.LUA_MASKCOUNT
          , o = n.LUA_MASKLINE
          , l = n.constant_types
          , i = l.LUA_TBOOLEAN
          , c = l.LUA_TNIL
          , _ = l.LUA_TTABLE
          , f = n.thread_status
          , p = f.LUA_ERRRUN
          , v = f.LUA_YIELD
          , d = n.from_userstring
          , h = n.luastring_eq
          , L = n.luastring_indexOf
          , A = n.to_luastring
          , g = r(2)
          , T = g.api_check
          , x = g.lua_assert
          , b = r(3).LUA_IDSIZE
          , k = r(18)
          , O = r(7)
          , E = r(16)
          , m = r(19)
          , U = r(5)
          , N = r(13)
          , R = r(10)
          , S = r(9)
          , y = r(15)
          , w = r(14)
          , I = function(e) {
            return x(e.callstatus & R.CIST_LUA),
            e.l_savedpc - 1
        }
          , M = function(e) {
            return 0 !== e.func.value.p.lineinfo.length ? e.func.value.p.lineinfo[I(e)] : -1
        }
          , P = function(e) {
            if (e.status === v) {
                var t = e.ci
                  , r = t.funcOff;
                t.func = e.stack[t.extra],
                t.funcOff = t.extra,
                t.extra = r
            }
        }
          , C = function(e, t) {
            x(t < e.upvalues.length);
            var r = e.upvalues[t].name;
            return null === r ? A("?", !0) : r.getstr()
        }
          , D = function(e, t, r) {
            var n = void 0
              , a = null;
            if (t.callstatus & R.CIST_LUA) {
                if (r < 0)
                    return function(e, t) {
                        var r = e.func.value.p.numparams;
                        return t >= e.l_base - e.funcOff - r ? null : {
                            pos: e.funcOff + r + t,
                            name: A("(*vararg)", !0)
                        }
                    }(t, -r);
                n = t.l_base,
                a = E.luaF_getlocalname(t.func.value.p, r, I(t))
            } else
                n = t.funcOff + 1;
            if (null === a) {
                if (!((t === e.ci ? e.top : t.next.funcOff) - n >= r && r > 0))
                    return null;
                a = A("(*temporary)", !0)
            }
            return {
                pos: n + (r - 1),
                name: a
            }
        }
          , V = function(e, t) {
            if (null === t || t instanceof U.CClosure)
                e.source = A("=[JS]", !0),
                e.linedefined = -1,
                e.lastlinedefined = -1,
                e.what = A("J", !0);
            else {
                var r = t.p;
                e.source = r.source ? r.source.getstr() : A("=?", !0),
                e.linedefined = r.linedefined,
                e.lastlinedefined = r.lastlinedefined,
                e.what = 0 === e.linedefined ? A("main", !0) : A("Lua", !0)
            }
            e.short_src = U.luaO_chunkid(e.source, b)
        }
          , G = function(e, t) {
            var r = {
                name: null,
                funcname: null
            };
            return null === t ? null : t.callstatus & R.CIST_FIN ? (r.name = A("__gc", !0),
            r.funcname = A("metamethod", !0),
            r) : !(t.callstatus & R.CIST_TAIL) && t.previous.callstatus & R.CIST_LUA ? H(e, t.previous) : null
        }
          , B = function(e, t, r) {
            var n = {
                name: null,
                funcname: null
            };
            if (N.ISK(r)) {
                var a = e.k[N.INDEXK(r)];
                if (a.ttisstring())
                    return n.name = a.svalue(),
                    n
            } else {
                var u = F(e, t, r);
                if (u && 99 === u.funcname[0])
                    return u
            }
            return n.name = A("?", !0),
            n
        }
          , K = function(e, t) {
            return e < t ? -1 : e
        }
          , F = function e(t, r, n) {
            var a = {
                name: E.luaF_getlocalname(t, n + 1, r),
                funcname: null
            };
            if (a.name)
                return a.funcname = A("local", !0),
                a;
            var u = function(e, t, r) {
                for (var n = -1, a = 0, u = N.OpCodesI, s = 0; s < t; s++) {
                    var o = e.code[s]
                      , l = o.A;
                    switch (o.opcode) {
                    case u.OP_LOADNIL:
                        var i = o.B;
                        l <= r && r <= l + i && (n = K(s, a));
                        break;
                    case u.OP_TFORCALL:
                        r >= l + 2 && (n = K(s, a));
                        break;
                    case u.OP_CALL:
                    case u.OP_TAILCALL:
                        r >= l && (n = K(s, a));
                        break;
                    case u.OP_JMP:
                        var c = s + 1 + o.sBx;
                        s < c && c <= t && c > a && (a = c);
                        break;
                    default:
                        N.testAMode(o.opcode) && r === l && (n = K(s, a))
                    }
                }
                return n
            }(t, r, n)
              , s = N.OpCodesI;
            if (-1 !== u) {
                var o = t.code[u];
                switch (o.opcode) {
                case s.OP_MOVE:
                    var l = o.B;
                    if (l < o.A)
                        return e(t, u, l);
                    break;
                case s.OP_GETTABUP:
                case s.OP_GETTABLE:
                    var i = o.C
                      , c = o.B
                      , _ = o.opcode === s.OP_GETTABLE ? E.luaF_getlocalname(t, c + 1, u) : C(t, c);
                    return a.name = B(t, u, i).name,
                    a.funcname = _ && h(_, m.LUA_ENV) ? A("global", !0) : A("field", !0),
                    a;
                case s.OP_GETUPVAL:
                    return a.name = C(t, o.B),
                    a.funcname = A("upvalue", !0),
                    a;
                case s.OP_LOADK:
                case s.OP_LOADKX:
                    var f = o.opcode === s.OP_LOADK ? o.Bx : t.code[u + 1].Ax;
                    if (t.k[f].ttisstring())
                        return a.name = t.k[f].svalue(),
                        a.funcname = A("constant", !0),
                        a;
                    break;
                case s.OP_SELF:
                    var p = o.C;
                    return a.name = B(t, u, p).name,
                    a.funcname = A("method", !0),
                    a
                }
            }
            return null
        }
          , H = function(e, t) {
            var r = {
                name: null,
                funcname: null
            }
              , n = 0
              , a = t.func.value.p
              , u = I(t)
              , s = a.code[u]
              , o = N.OpCodesI;
            if (t.callstatus & R.CIST_HOOKED)
                return r.name = A("?", !0),
                r.funcname = A("hook", !0),
                r;
            switch (s.opcode) {
            case o.OP_CALL:
            case o.OP_TAILCALL:
                return F(a, u, s.A);
            case o.OP_TFORCALL:
                return r.name = A("for iterator", !0),
                r.funcname = A("for iterator", !0),
                r;
            case o.OP_SELF:
            case o.OP_GETTABUP:
            case o.OP_GETTABLE:
                n = y.TMS.TM_INDEX;
                break;
            case o.OP_SETTABUP:
            case o.OP_SETTABLE:
                n = y.TMS.TM_NEWINDEX;
                break;
            case o.OP_ADD:
                n = y.TMS.TM_ADD;
                break;
            case o.OP_SUB:
                n = y.TMS.TM_SUB;
                break;
            case o.OP_MUL:
                n = y.TMS.TM_MUL;
                break;
            case o.OP_MOD:
                n = y.TMS.TM_MOD;
                break;
            case o.OP_POW:
                n = y.TMS.TM_POW;
                break;
            case o.OP_DIV:
                n = y.TMS.TM_DIV;
                break;
            case o.OP_IDIV:
                n = y.TMS.TM_IDIV;
                break;
            case o.OP_BAND:
                n = y.TMS.TM_BAND;
                break;
            case o.OP_BOR:
                n = y.TMS.TM_BOR;
                break;
            case o.OP_BXOR:
                n = y.TMS.TM_BXOR;
                break;
            case o.OP_SHL:
                n = y.TMS.TM_SHL;
                break;
            case o.OP_SHR:
                n = y.TMS.TM_SHR;
                break;
            case o.OP_UNM:
                n = y.TMS.TM_UNM;
                break;
            case o.OP_BNOT:
                n = y.TMS.TM_BNOT;
                break;
            case o.OP_LEN:
                n = y.TMS.TM_LEN;
                break;
            case o.OP_CONCAT:
                n = y.TMS.TM_CONCAT;
                break;
            case o.OP_EQ:
                n = y.TMS.TM_EQ;
                break;
            case o.OP_LT:
                n = y.TMS.TM_LT;
                break;
            case o.OP_LE:
                n = y.TMS.TM_LE;
                break;
            default:
                return null
            }
            return r.name = e.l_G.tmname[n].getstr(),
            r.funcname = A("metamethod", !0),
            r
        }
          , j = function(e, t) {
            var r = e.ci
              , n = null;
            if (r.callstatus & R.CIST_LUA) {
                n = function(e, t, r) {
                    for (var n = t.func.value, a = 0; a < n.nupvalues; a++)
                        if (n.upvals[a] === r)
                            return {
                                name: C(n.p, a),
                                funcname: A("upvalue", !0)
                            };
                    return null
                }(0, r, t);
                var a = function(e, t, r) {
                    for (var n = t.l_base; n < t.top; n++)
                        if (e.stack[n] === r)
                            return n;
                    return !1
                }(e, r, t);
                !n && a && (n = F(r.func.value.p, I(r), a - r.l_base))
            }
            return n ? U.luaO_pushfstring(e, A(" (%s '%s')", !0), n.funcname, n.name) : A("", !0)
        }
          , X = function(e, t, r) {
            var n = y.luaT_objtypename(e, t);
            Y(e, A("attempt to %s a %s value%s", !0), r, n, j(e, t))
        }
          , z = function(e, t, r, n) {
            var a = void 0;
            return a = r ? U.luaO_chunkid(r.getstr(), b) : A("?", !0),
            U.luaO_pushfstring(e, A("%s:%d: %s", !0), a, n, t)
        }
          , Y = function(e, t) {
            for (var r = e.ci, n = arguments.length, a = Array(n > 2 ? n - 2 : 0), u = 2; u < n; u++)
                a[u - 2] = arguments[u];
            var s = U.luaO_pushvfstring(e, t, a);
            r.callstatus & R.CIST_LUA && z(e, s, r.func.value.p.source, M(r)),
            J(e)
        }
          , J = function(e) {
            if (0 !== e.errfunc) {
                var t = e.errfunc;
                U.pushobj2s(e, e.stack[e.top - 1]),
                U.setobjs2s(e, e.top - 2, t),
                O.luaD_callnoyield(e, e.top - 2, 1)
            }
            O.luaD_throw(e, p)
        };
        e.exports.luaG_addinfo = z,
        e.exports.luaG_concaterror = function(e, t, r) {
            (t.ttisstring() || w.cvt2str(t)) && (t = r),
            X(e, t, A("concatenate", !0))
        }
        ,
        e.exports.luaG_errormsg = J,
        e.exports.luaG_opinterror = function(e, t, r, n) {
            !1 === w.tonumber(t) && (r = t),
            X(e, r, n)
        }
        ,
        e.exports.luaG_ordererror = function(e, t, r) {
            var n = y.luaT_objtypename(e, t)
              , a = y.luaT_objtypename(e, r);
            h(n, a) ? Y(e, A("attempt to compare two %s values", !0), n) : Y(e, A("attempt to compare %s with %s", !0), n, a)
        }
        ,
        e.exports.luaG_runerror = Y,
        e.exports.luaG_tointerror = function(e, t, r) {
            !1 === w.tointeger(t) && (r = t),
            Y(e, A("number%s has no integer representation", !0), j(e, r))
        }
        ,
        e.exports.luaG_traceexec = function(e) {
            var t = e.ci
              , r = e.hookmask
              , n = 0 == --e.hookcount && r & s;
            if (n)
                e.hookcount = e.basehookcount;
            else if (!(r & o))
                return;
            if (t.callstatus & R.CIST_HOOKYIELD)
                t.callstatus &= ~R.CIST_HOOKYIELD;
            else {
                if (n && O.luaD_hook(e, a, -1),
                r & o) {
                    var l = t.func.value.p
                      , i = t.l_savedpc - 1
                      , c = 0 !== l.lineinfo.length ? l.lineinfo[i] : -1;
                    (0 === i || t.l_savedpc <= e.oldpc || c !== (0 !== l.lineinfo.length ? l.lineinfo[e.oldpc - 1] : -1)) && O.luaD_hook(e, u, c)
                }
                e.oldpc = t.l_savedpc,
                e.status === v && (n && (e.hookcount = 1),
                t.l_savedpc--,
                t.callstatus |= R.CIST_HOOKYIELD,
                t.funcOff = e.top - 1,
                t.func = e.stack[t.funcOff],
                O.luaD_throw(e, v))
            }
        }
        ,
        e.exports.luaG_typeerror = X,
        e.exports.lua_gethook = function(e) {
            return e.hook
        }
        ,
        e.exports.lua_gethookcount = function(e) {
            return e.basehookcount
        }
        ,
        e.exports.lua_gethookmask = function(e) {
            return e.hookmask
        }
        ,
        e.exports.lua_getinfo = function(e, t, r) {
            t = d(t);
            var n, a, u = void 0, s = void 0;
            return P(e),
            62 === t[0] ? (u = null,
            s = e.stack[e.top - 1],
            T(e, s.ttisfunction(), "function expected"),
            t = t.subarray(1),
            e.top--) : (s = (u = r.i_ci).func,
            x(u.func.ttisfunction())),
            n = function(e, t, r, n, a) {
                for (var u = 1; t.length > 0; t = t.subarray(1))
                    switch (t[0]) {
                    case 83:
                        V(r, n);
                        break;
                    case 108:
                        r.currentline = a && a.callstatus & R.CIST_LUA ? M(a) : -1;
                        break;
                    case 117:
                        r.nups = null === n ? 0 : n.nupvalues,
                        null === n || n instanceof U.CClosure ? (r.isvararg = !0,
                        r.nparams = 0) : (r.isvararg = n.p.is_vararg,
                        r.nparams = n.p.numparams);
                        break;
                    case 116:
                        r.istailcall = a ? a.callstatus & R.CIST_TAIL : 0;
                        break;
                    case 110:
                        var s = G(e, a);
                        null === s ? (r.namewhat = A("", !0),
                        r.name = null) : (r.namewhat = s.funcname,
                        r.name = s.name);
                        break;
                    case 76:
                    case 102:
                        break;
                    default:
                        u = 0
                    }
                return u
            }(e, t, r, a = s.ttisclosure() ? s.value : null, u),
            L(t, 102) >= 0 && (U.pushobj2s(e, s),
            T(e, e.top <= e.ci.top, "stack overflow")),
            P(e),
            L(t, 76) >= 0 && function(e, t) {
                if (null === t || t instanceof U.CClosure)
                    e.stack[e.top] = new U.TValue(c,null),
                    k.api_incr_top(e);
                else {
                    var r = t.p.lineinfo
                      , n = S.luaH_new(e);
                    e.stack[e.top] = new U.TValue(_,n),
                    k.api_incr_top(e);
                    for (var a = new U.TValue(i,!0), u = 0; u < r.length; u++)
                        S.luaH_setint(n, r[u], a)
                }
            }(e, a),
            n
        }
        ,
        e.exports.lua_getlocal = function(e, t, r) {
            var n = void 0;
            if (P(e),
            null === t)
                n = e.stack[e.top - 1].ttisLclosure() ? E.luaF_getlocalname(e.stack[e.top - 1].value.p, r, 0) : null;
            else {
                var a = D(e, t.i_ci, r);
                a ? (n = a.name,
                U.pushobj2s(e, e.stack[a.pos]),
                T(e, e.top <= e.ci.top, "stack overflow")) : n = null
            }
            return P(e),
            n
        }
        ,
        e.exports.lua_getstack = function(e, t, r) {
            var n = void 0
              , a = void 0;
            if (t < 0)
                return 0;
            for (n = e.ci; t > 0 && n !== e.base_ci; n = n.previous)
                t--;
            return 0 === t && n !== e.base_ci ? (a = 1,
            r.i_ci = n) : a = 0,
            a
        }
        ,
        e.exports.lua_sethook = function(e, t, r, n) {
            null !== t && 0 !== r || (r = 0,
            t = null),
            e.ci.callstatus & R.CIST_LUA && (e.oldpc = e.ci.l_savedpc),
            e.hook = t,
            e.basehookcount = n,
            e.hookcount = e.basehookcount,
            e.hookmask = r
        }
        ,
        e.exports.lua_setlocal = function(e, t, r) {
            var n = void 0;
            P(e);
            var a = D(e, t.i_ci, r);
            return a ? (n = a.name,
            U.setobjs2s(e, a.pos, e.top - 1),
            delete e.stack[--e.top]) : n = null,
            P(e),
            n
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(1)
          , a = "_" + n.LUA_VERSION_MAJOR + "_" + n.LUA_VERSION_MINOR;
        e.exports.LUA_VERSUFFIX = a,
        e.exports.lua_assert = function(e) {}
        ;
        e.exports.LUA_COLIBNAME = "coroutine",
        e.exports.luaopen_coroutine = r(29).luaopen_coroutine;
        e.exports.LUA_TABLIBNAME = "table",
        e.exports.luaopen_table = r(28).luaopen_table;
        e.exports.LUA_OSLIBNAME = "os",
        e.exports.luaopen_os = r(27).luaopen_os;
        e.exports.LUA_STRLIBNAME = "string",
        e.exports.luaopen_string = r(26).luaopen_string;
        e.exports.LUA_UTF8LIBNAME = "utf8",
        e.exports.luaopen_utf8 = r(25).luaopen_utf8;
        e.exports.LUA_BITLIBNAME = "bit32";
        e.exports.LUA_MATHLIBNAME = "math",
        e.exports.luaopen_math = r(24).luaopen_math;
        e.exports.LUA_DBLIBNAME = "debug",
        e.exports.luaopen_debug = r(23).luaopen_debug;
        e.exports.LUA_LOADLIBNAME = "package",
        e.exports.luaopen_package = r(22).luaopen_package;
        e.exports.LUA_FENGARILIBNAME = "fengari",
        e.exports.luaopen_fengari = r(21).luaopen_fengari;
        var u = r(34);
        e.exports.luaL_openlibs = u.luaL_openlibs
    }
    , function(e, t, r) {
        "use strict";
        var n = [96, 113, 65, 84, 80, 80, 92, 108, 60, 16, 60, 84, 108, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 96, 96, 96, 96, 104, 34, 188, 188, 188, 132, 228, 84, 84, 16, 98, 98, 4, 98, 20, 81, 80, 23]
          , a = function(e, t) {
            return ~(-1 << e) << t
        }
          , u = function(e, t) {
            return ~a(e, t)
        }
          , s = function(e, t, r, n) {
            return e.code = e.code & u(n, r) | t << r & a(n, r),
            l(e)
        }
          , o = function(e, t) {
            return s(e, t, 14, 18)
        }
          , l = function(e) {
            if ("number" == typeof e)
                return {
                    code: e,
                    opcode: e >> 0 & a(6, 0),
                    A: e >> 6 & a(8, 0),
                    B: e >> 23 & a(9, 0),
                    C: e >> 14 & a(9, 0),
                    Bx: e >> 14 & a(18, 0),
                    Ax: e >> 6 & a(26, 0),
                    sBx: (e >> 14 & a(18, 0)) - 131071
                };
            var t = e.code;
            return e.opcode = t >> 0 & a(6, 0),
            e.A = t >> 6 & a(8, 0),
            e.B = t >> 23 & a(9, 0),
            e.C = t >> 14 & a(9, 0),
            e.Bx = t >> 14 & a(18, 0),
            e.Ax = t >> 6 & a(26, 0),
            e.sBx = (t >> 14 & a(18, 0)) - 131071,
            e
        };
        e.exports.BITRK = 256,
        e.exports.CREATE_ABC = function(e, t, r, n) {
            return l(e << 0 | t << 6 | r << 23 | n << 14)
        }
        ,
        e.exports.CREATE_ABx = function(e, t, r) {
            return l(e << 0 | t << 6 | r << 14)
        }
        ,
        e.exports.CREATE_Ax = function(e, t) {
            return l(e << 0 | t << 6)
        }
        ,
        e.exports.GET_OPCODE = function(e) {
            return e.opcode
        }
        ,
        e.exports.GETARG_A = function(e) {
            return e.A
        }
        ,
        e.exports.GETARG_B = function(e) {
            return e.B
        }
        ,
        e.exports.GETARG_C = function(e) {
            return e.C
        }
        ,
        e.exports.GETARG_Bx = function(e) {
            return e.Bx
        }
        ,
        e.exports.GETARG_Ax = function(e) {
            return e.Ax
        }
        ,
        e.exports.GETARG_sBx = function(e) {
            return e.sBx
        }
        ,
        e.exports.INDEXK = function(e) {
            return -257 & e
        }
        ,
        e.exports.ISK = function(e) {
            return 256 & e
        }
        ,
        e.exports.LFIELDS_PER_FLUSH = 50,
        e.exports.MAXARG_A = 255,
        e.exports.MAXARG_Ax = 67108863,
        e.exports.MAXARG_B = 511,
        e.exports.MAXARG_Bx = 262143,
        e.exports.MAXARG_C = 511,
        e.exports.MAXARG_sBx = 131071,
        e.exports.MAXINDEXRK = 255,
        e.exports.NO_REG = 255,
        e.exports.OpArgK = 3,
        e.exports.OpArgN = 0,
        e.exports.OpArgR = 2,
        e.exports.OpArgU = 1,
        e.exports.OpCodes = ["MOVE", "LOADK", "LOADKX", "LOADBOOL", "LOADNIL", "GETUPVAL", "GETTABUP", "GETTABLE", "SETTABUP", "SETUPVAL", "SETTABLE", "NEWTABLE", "SELF", "ADD", "SUB", "MUL", "MOD", "POW", "DIV", "IDIV", "BAND", "BOR", "BXOR", "SHL", "SHR", "UNM", "BNOT", "NOT", "LEN", "CONCAT", "JMP", "EQ", "LT", "LE", "TEST", "TESTSET", "CALL", "TAILCALL", "RETURN", "FORLOOP", "FORPREP", "TFORCALL", "TFORLOOP", "SETLIST", "CLOSURE", "VARARG", "EXTRAARG"],
        e.exports.OpCodesI = {
            OP_MOVE: 0,
            OP_LOADK: 1,
            OP_LOADKX: 2,
            OP_LOADBOOL: 3,
            OP_LOADNIL: 4,
            OP_GETUPVAL: 5,
            OP_GETTABUP: 6,
            OP_GETTABLE: 7,
            OP_SETTABUP: 8,
            OP_SETUPVAL: 9,
            OP_SETTABLE: 10,
            OP_NEWTABLE: 11,
            OP_SELF: 12,
            OP_ADD: 13,
            OP_SUB: 14,
            OP_MUL: 15,
            OP_MOD: 16,
            OP_POW: 17,
            OP_DIV: 18,
            OP_IDIV: 19,
            OP_BAND: 20,
            OP_BOR: 21,
            OP_BXOR: 22,
            OP_SHL: 23,
            OP_SHR: 24,
            OP_UNM: 25,
            OP_BNOT: 26,
            OP_NOT: 27,
            OP_LEN: 28,
            OP_CONCAT: 29,
            OP_JMP: 30,
            OP_EQ: 31,
            OP_LT: 32,
            OP_LE: 33,
            OP_TEST: 34,
            OP_TESTSET: 35,
            OP_CALL: 36,
            OP_TAILCALL: 37,
            OP_RETURN: 38,
            OP_FORLOOP: 39,
            OP_FORPREP: 40,
            OP_TFORCALL: 41,
            OP_TFORLOOP: 42,
            OP_SETLIST: 43,
            OP_CLOSURE: 44,
            OP_VARARG: 45,
            OP_EXTRAARG: 46
        },
        e.exports.POS_A = 6,
        e.exports.POS_Ax = 6,
        e.exports.POS_B = 23,
        e.exports.POS_Bx = 14,
        e.exports.POS_C = 14,
        e.exports.POS_OP = 0,
        e.exports.RKASK = function(e) {
            return 256 | e
        }
        ,
        e.exports.SETARG_A = function(e, t) {
            return s(e, t, 6, 8)
        }
        ,
        e.exports.SETARG_Ax = function(e, t) {
            return s(e, t, 6, 26)
        }
        ,
        e.exports.SETARG_B = function(e, t) {
            return s(e, t, 23, 9)
        }
        ,
        e.exports.SETARG_Bx = o,
        e.exports.SETARG_C = function(e, t) {
            return s(e, t, 14, 9)
        }
        ,
        e.exports.SETARG_sBx = function(e, t) {
            return o(e, t + 131071)
        }
        ,
        e.exports.SET_OPCODE = function(e, t) {
            return e.code = e.code & u(6, 0) | t << 0 & a(6, 0),
            l(e)
        }
        ,
        e.exports.SIZE_A = 8,
        e.exports.SIZE_Ax = 26,
        e.exports.SIZE_B = 9,
        e.exports.SIZE_Bx = 18,
        e.exports.SIZE_C = 9,
        e.exports.SIZE_OP = 6,
        e.exports.fullins = l,
        e.exports.getBMode = function(e) {
            return n[e] >> 4 & 3
        }
        ,
        e.exports.getCMode = function(e) {
            return n[e] >> 2 & 3
        }
        ,
        e.exports.getOpMode = function(e) {
            return 3 & n[e]
        }
        ,
        e.exports.iABC = 0,
        e.exports.iABx = 1,
        e.exports.iAsBx = 2,
        e.exports.iAx = 3,
        e.exports.testAMode = function(e) {
            return 64 & n[e]
        }
        ,
        e.exports.testTMode = function(e) {
            return 128 & n[e]
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(0)
          , a = n.LUA_MASKLINE
          , u = n.LUA_MASKCOUNT
          , s = n.LUA_MULTRET
          , o = n.constant_types
          , l = o.LUA_TBOOLEAN
          , i = o.LUA_TLCF
          , c = o.LUA_TLIGHTUSERDATA
          , _ = o.LUA_TLNGSTR
          , f = o.LUA_TNIL
          , p = o.LUA_TNUMBER
          , v = o.LUA_TNUMFLT
          , d = o.LUA_TNUMINT
          , h = o.LUA_TSHRSTR
          , L = o.LUA_TTABLE
          , A = o.LUA_TUSERDATA
          , g = n.to_luastring
          , T = r(13)
          , x = T.INDEXK
          , b = T.ISK
          , k = T.LFIELDS_PER_FLUSH
          , O = T.OpCodesI
          , E = O.OP_ADD
          , m = O.OP_BAND
          , U = O.OP_BNOT
          , N = O.OP_BOR
          , R = O.OP_BXOR
          , S = O.OP_CALL
          , y = O.OP_CLOSURE
          , w = O.OP_CONCAT
          , I = O.OP_DIV
          , M = O.OP_EQ
          , P = O.OP_EXTRAARG
          , C = O.OP_FORLOOP
          , D = O.OP_FORPREP
          , V = O.OP_GETTABLE
          , G = O.OP_GETTABUP
          , B = O.OP_GETUPVAL
          , K = O.OP_IDIV
          , F = O.OP_JMP
          , H = O.OP_LE
          , j = O.OP_LEN
          , X = O.OP_LOADBOOL
          , z = O.OP_LOADK
          , Y = O.OP_LOADKX
          , J = O.OP_LOADNIL
          , Z = O.OP_LT
          , q = O.OP_MOD
          , W = O.OP_MOVE
          , Q = O.OP_MUL
          , $ = O.OP_NEWTABLE
          , ee = O.OP_NOT
          , te = O.OP_POW
          , re = O.OP_RETURN
          , ne = O.OP_SELF
          , ae = O.OP_SETLIST
          , ue = O.OP_SETTABLE
          , se = O.OP_SETTABUP
          , oe = O.OP_SETUPVAL
          , le = O.OP_SHL
          , ie = O.OP_SHR
          , ce = O.OP_SUB
          , _e = O.OP_TAILCALL
          , fe = O.OP_TEST
          , pe = O.OP_TESTSET
          , ve = O.OP_TFORCALL
          , de = O.OP_TFORLOOP
          , he = O.OP_UNM
          , Le = O.OP_VARARG
          , Ae = r(3)
          , ge = Ae.LUA_MAXINTEGER
          , Te = Ae.LUA_MININTEGER
          , xe = Ae.lua_numbertointeger
          , be = r(2)
          , ke = be.lua_assert
          , Oe = be.luai_nummod
          , Ee = r(5)
          , me = r(16)
          , Ue = r(10)
          , Ne = r(8)
          , Re = Ne.luaS_bless
          , Se = Ne.luaS_eqlngstr
          , ye = Ne.luaS_hashlongstr
          , we = r(7)
          , Ie = r(15)
          , Me = r(9)
          , Pe = r(11)
          , Ce = function(e, t, r) {
            return t + r.A
        }
          , De = function(e, t, r) {
            return t + r.B
        }
          , Ve = function(e, t, r, n) {
            return b(n.B) ? r[x(n.B)] : e.stack[t + n.B]
        }
          , Ge = function(e, t, r, n) {
            return b(n.C) ? r[x(n.C)] : e.stack[t + n.C]
        }
          , Be = function(e, t, r, n) {
            var a = r.A;
            0 !== a && me.luaF_close(e, t.l_base + a - 1),
            t.l_savedpc += r.sBx + n
        }
          , Ke = function(e, t) {
            Be(e, t, t.l_code[t.l_savedpc], 1)
        }
          , Fe = function(e, t, r) {
            if (t.ttisnumber() && r.ttisnumber())
                return Ze(t, r) ? 1 : 0;
            if (t.ttisstring() && r.ttisstring())
                return We(t.tsvalue(), r.tsvalue()) < 0 ? 1 : 0;
            var n = Ie.luaT_callorderTM(e, t, r, Ie.TMS.TM_LT);
            return null === n && Pe.luaG_ordererror(e, t, r),
            n ? 1 : 0
        }
          , He = function(e, t, r) {
            var n = void 0;
            return t.ttisnumber() && r.ttisnumber() ? qe(t, r) ? 1 : 0 : t.ttisstring() && r.ttisstring() ? We(t.tsvalue(), r.tsvalue()) <= 0 ? 1 : 0 : null !== (n = Ie.luaT_callorderTM(e, t, r, Ie.TMS.TM_LE)) ? n ? 1 : 0 : (e.ci.callstatus |= Ue.CIST_LEQ,
            n = Ie.luaT_callorderTM(e, r, t, Ie.TMS.TM_LT),
            e.ci.callstatus ^= Ue.CIST_LEQ,
            null === n && Pe.luaG_ordererror(e, t, r),
            n ? 0 : 1)
        }
          , je = function(e, t, r) {
            if (t.ttype() !== r.ttype())
                return t.ttnov() !== r.ttnov() || t.ttnov() !== p ? 0 : t.value === r.value ? 1 : 0;
            var n = void 0;
            switch (t.ttype()) {
            case f:
                return 1;
            case l:
                return t.value == r.value ? 1 : 0;
            case c:
            case d:
            case v:
            case i:
                return t.value === r.value ? 1 : 0;
            case h:
            case _:
                return Se(t.tsvalue(), r.tsvalue()) ? 1 : 0;
            case A:
            case L:
                if (t.value === r.value)
                    return 1;
                if (null === e)
                    return 0;
                null === (n = Ie.fasttm(e, t.value.metatable, Ie.TMS.TM_EQ)) && (n = Ie.fasttm(e, r.value.metatable, Ie.TMS.TM_EQ));
                break;
            default:
                return t.value === r.value ? 1 : 0
            }
            if (null === n)
                return 0;
            var a = new Ee.TValue;
            return Ie.luaT_callTM(e, n, t, r, a, 1),
            a.l_isfalse() ? 0 : 1
        }
          , Xe = function(e, t) {
            var r = !1
              , n = ze(e, t < 0 ? 2 : 1);
            if (!1 === n) {
                var a = Je(e);
                if (!1 === a)
                    return !1;
                0 < a ? (n = ge,
                t < 0 && (r = !0)) : (n = Te,
                t >= 0 && (r = !0))
            }
            return {
                stopnow: r,
                ilimit: n
            }
        }
          , ze = function e(t, r) {
            if (t.ttisfloat()) {
                var n = t.value
                  , a = Math.floor(n);
                if (n !== a) {
                    if (0 === r)
                        return !1;
                    r > 1 && (a += 1)
                }
                return xe(a)
            }
            if (t.ttisinteger())
                return t.value;
            if (st(t)) {
                var u = new Ee.TValue;
                if (Ee.luaO_str2num(t.svalue(), u) === t.vslen() + 1)
                    return e(u, r)
            }
            return !1
        }
          , Ye = function(e) {
            return e.ttisinteger() ? e.value : ze(e, 0)
        }
          , Je = function(e) {
            if (e.ttnov() === p)
                return e.value;
            if (st(e)) {
                var t = new Ee.TValue;
                if (Ee.luaO_str2num(e.svalue(), t) === e.vslen() + 1)
                    return t.value
            }
            return !1
        }
          , Ze = function(e, t) {
            return e.value < t.value
        }
          , qe = function(e, t) {
            return e.value <= t.value
        }
          , We = function(e, t) {
            var r = ye(e)
              , n = ye(t);
            return r === n ? 0 : r < n ? -1 : 1
        }
          , Qe = function(e, t, r) {
            var n = void 0;
            switch (r.ttype()) {
            case L:
                var a = r.value;
                if (null !== (n = Ie.fasttm(e, a.metatable, Ie.TMS.TM_LEN)))
                    break;
                return void t.setivalue(Me.luaH_getn(a));
            case h:
            case _:
                return void t.setivalue(r.vslen());
            default:
                (n = Ie.luaT_gettmbyobj(e, r, Ie.TMS.TM_LEN)).ttisnil() && Pe.luaG_typeerror(e, r, g("get length of", !0))
            }
            Ie.luaT_callTM(e, n, r, r, t, 1)
        }
          , $e = Math.imul || function(e, t) {
            var r = 65535 & e
              , n = 65535 & t;
            return r * n + ((e >>> 16 & 65535) * n + r * (t >>> 16 & 65535) << 16 >>> 0) | 0
        }
          , et = function(e, t, r) {
            return 0 === r && Pe.luaG_runerror(e, g("attempt to divide by zero")),
            0 | Math.floor(t / r)
        }
          , tt = function(e, t, r) {
            return 0 === r && Pe.luaG_runerror(e, g("attempt to perform 'n%%0'")),
            t - Math.floor(t / r) * r | 0
        }
          , rt = function(e, t) {
            return t < 0 ? t <= -32 ? 0 : e >>> -t : t >= 32 ? 0 : e << t
        }
          , nt = function(e, t, r, n) {
            var a = e.cache;
            if (null !== a)
                for (var u = e.upvalues, s = u.length, o = 0; o < s; o++) {
                    var l = u[o].instack ? r[n + u[o].idx] : t[u[o].idx];
                    if (a.upvals[o] !== l)
                        return null
                }
            return a
        }
          , at = function(e, t, r, n, a) {
            var u = t.upvalues.length
              , s = t.upvalues
              , o = new Ee.LClosure(e,u);
            o.p = t,
            e.stack[a].setclLvalue(o);
            for (var l = 0; l < u; l++)
                s[l].instack ? o.upvals[l] = me.luaF_findupval(e, n + s[l].idx) : o.upvals[l] = r[s[l].idx];
            t.cache = o
        }
          , ut = function(e) {
            return e.ttisnumber()
        }
          , st = function(e) {
            return e.ttisstring()
        }
          , ot = function(e, t) {
            var r = e.stack[t];
            return !!r.ttisstring() || !!ut(r) && (Ee.luaO_tostring(e, r),
            !0)
        }
          , lt = function(e) {
            return e.ttisstring() && 0 === e.vslen()
        }
          , it = function(e, t, r, n) {
            var a = 0;
            do {
                var u = e.stack[t - r]
                  , s = u.vslen()
                  , o = u.svalue();
                n.set(o, a),
                a += s
            } while (--r > 0)
        }
          , ct = function(e, t) {
            ke(t >= 2);
            do {
                var r = e.top
                  , n = 2;
                if ((e.stack[r - 2].ttisstring() || ut(e.stack[r - 2])) && ot(e, r - 1))
                    if (lt(e.stack[r - 1]))
                        ot(e, r - 2);
                    else if (lt(e.stack[r - 2]))
                        Ee.setobjs2s(e, r - 2, r - 1);
                    else {
                        var a = e.stack[r - 1].vslen();
                        for (n = 1; n < t && ot(e, r - n - 1); n++) {
                            a += e.stack[r - n - 1].vslen()
                        }
                        var u = new Uint8Array(a);
                        it(e, r, n, u);
                        var s = Re(e, u);
                        Ee.setsvalue2s(e, r - n, s)
                    }
                else
                    Ie.luaT_trybinTM(e, e.stack[r - 2], e.stack[r - 1], e.stack[r - 2], Ie.TMS.TM_CONCAT);
                for (t -= n - 1; e.top > r - (n - 1); )
                    delete e.stack[--e.top]
            } while (t > 1)
        }
          , _t = function(e, t, r, n) {
            for (var a = 0; a < 2e3; a++) {
                var u = void 0;
                if (t.ttistable()) {
                    var s = Me.luaH_get(e, t.value, r);
                    if (!s.ttisnil())
                        return void Ee.setobj2s(e, n, s);
                    if (null === (u = Ie.fasttm(e, t.value.metatable, Ie.TMS.TM_INDEX)))
                        return void e.stack[n].setnilvalue()
                } else
                    (u = Ie.luaT_gettmbyobj(e, t, Ie.TMS.TM_INDEX)).ttisnil() && Pe.luaG_typeerror(e, t, g("index", !0));
                if (u.ttisfunction())
                    return void Ie.luaT_callTM(e, u, t, r, e.stack[n], 1);
                t = u
            }
            Pe.luaG_runerror(e, g("'__index' chain too long; possible loop", !0))
        }
          , ft = function(e, t, r, n) {
            for (var a = 0; a < 2e3; a++) {
                var u = void 0;
                if (t.ttistable()) {
                    var s = t.value
                      , o = Me.luaH_set(e, s, r);
                    if (!o.ttisnil() || null === (u = Ie.fasttm(e, s.metatable, Ie.TMS.TM_NEWINDEX)))
                        return n.ttisnil() ? Me.luaH_delete(e, s, r) : o.setfrom(n),
                        void Me.invalidateTMcache(s)
                } else
                    (u = Ie.luaT_gettmbyobj(e, t, Ie.TMS.TM_NEWINDEX)).ttisnil() && Pe.luaG_typeerror(e, t, g("index", !0));
                if (u.ttisfunction())
                    return void Ie.luaT_callTM(e, u, t, r, n, 0);
                t = u
            }
            Pe.luaG_runerror(e, g("'__newindex' chain too long; possible loop", !0))
        };
        e.exports.cvt2str = ut,
        e.exports.cvt2num = st,
        e.exports.luaV_gettable = _t,
        e.exports.luaV_concat = ct,
        e.exports.luaV_div = et,
        e.exports.luaV_equalobj = je,
        e.exports.luaV_execute = function(e) {
            var t = e.ci;
            t.callstatus |= Ue.CIST_FRESH;
            e: for (; ; ) {
                ke(t === e.ci);
                var r = t.func.value
                  , n = r.p.k
                  , o = t.l_base
                  , l = t.l_code[t.l_savedpc++];
                e.hookmask & (a | u) && Pe.luaG_traceexec(e);
                var i = Ce(0, o, l);
                switch (l.opcode) {
                case W:
                    Ee.setobjs2s(e, i, De(0, o, l));
                    break;
                case z:
                    var c = n[l.Bx];
                    Ee.setobj2s(e, i, c);
                    break;
                case Y:
                    ke(t.l_code[t.l_savedpc].opcode === P);
                    var _ = n[t.l_code[t.l_savedpc++].Ax];
                    Ee.setobj2s(e, i, _);
                    break;
                case X:
                    e.stack[i].setbvalue(0 !== l.B),
                    0 !== l.C && t.l_savedpc++;
                    break;
                case J:
                    for (var f = 0; f <= l.B; f++)
                        e.stack[i + f].setnilvalue();
                    break;
                case B:
                    var p = l.B;
                    Ee.setobj2s(e, i, r.upvals[p]);
                    break;
                case G:
                    var v = r.upvals[l.B]
                      , d = Ge(e, o, n, l);
                    _t(e, v, d, i);
                    break;
                case V:
                    var h = e.stack[De(0, o, l)]
                      , L = Ge(e, o, n, l);
                    _t(e, h, L, i);
                    break;
                case se:
                    var A = r.upvals[l.A]
                      , T = Ve(e, o, n, l)
                      , x = Ge(e, o, n, l);
                    ft(e, A, T, x);
                    break;
                case oe:
                    r.upvals[l.B].setfrom(e.stack[i]);
                    break;
                case ue:
                    var b = e.stack[i]
                      , O = Ve(e, o, n, l)
                      , Ae = Ge(e, o, n, l);
                    ft(e, b, O, Ae);
                    break;
                case $:
                    e.stack[i].sethvalue(Me.luaH_new(e));
                    break;
                case ne:
                    var ge = De(0, o, l)
                      , Te = Ge(e, o, n, l);
                    Ee.setobjs2s(e, i + 1, ge),
                    _t(e, e.stack[ge], Te, i);
                    break;
                case E:
                    var xe = Ve(e, o, n, l)
                      , be = Ge(e, o, n, l)
                      , Ne = void 0
                      , Re = void 0;
                    xe.ttisinteger() && be.ttisinteger() ? e.stack[i].setivalue(xe.value + be.value | 0) : !1 !== (Ne = Je(xe)) && !1 !== (Re = Je(be)) ? e.stack[i].setfltvalue(Ne + Re) : Ie.luaT_trybinTM(e, xe, be, e.stack[i], Ie.TMS.TM_ADD);
                    break;
                case ce:
                    var Se = Ve(e, o, n, l)
                      , ye = Ge(e, o, n, l)
                      , ze = void 0
                      , Ze = void 0;
                    Se.ttisinteger() && ye.ttisinteger() ? e.stack[i].setivalue(Se.value - ye.value | 0) : !1 !== (ze = Je(Se)) && !1 !== (Ze = Je(ye)) ? e.stack[i].setfltvalue(ze - Ze) : Ie.luaT_trybinTM(e, Se, ye, e.stack[i], Ie.TMS.TM_SUB);
                    break;
                case Q:
                    var qe = Ve(e, o, n, l)
                      , We = Ge(e, o, n, l)
                      , ut = void 0
                      , st = void 0;
                    qe.ttisinteger() && We.ttisinteger() ? e.stack[i].setivalue($e(qe.value, We.value)) : !1 !== (ut = Je(qe)) && !1 !== (st = Je(We)) ? e.stack[i].setfltvalue(ut * st) : Ie.luaT_trybinTM(e, qe, We, e.stack[i], Ie.TMS.TM_MUL);
                    break;
                case q:
                    var ot = Ve(e, o, n, l)
                      , lt = Ge(e, o, n, l)
                      , it = void 0
                      , pt = void 0;
                    ot.ttisinteger() && lt.ttisinteger() ? e.stack[i].setivalue(tt(e, ot.value, lt.value)) : !1 !== (it = Je(ot)) && !1 !== (pt = Je(lt)) ? e.stack[i].setfltvalue(Oe(e, it, pt)) : Ie.luaT_trybinTM(e, ot, lt, e.stack[i], Ie.TMS.TM_MOD);
                    break;
                case te:
                    var vt, dt = Ve(e, o, n, l), ht = Ge(e, o, n, l), Lt = void 0;
                    !1 !== (vt = Je(dt)) && !1 !== (Lt = Je(ht)) ? e.stack[i].setfltvalue(Math.pow(vt, Lt)) : Ie.luaT_trybinTM(e, dt, ht, e.stack[i], Ie.TMS.TM_POW);
                    break;
                case I:
                    var At, gt = Ve(e, o, n, l), Tt = Ge(e, o, n, l), xt = void 0;
                    !1 !== (At = Je(gt)) && !1 !== (xt = Je(Tt)) ? e.stack[i].setfltvalue(At / xt) : Ie.luaT_trybinTM(e, gt, Tt, e.stack[i], Ie.TMS.TM_DIV);
                    break;
                case K:
                    var bt = Ve(e, o, n, l)
                      , kt = Ge(e, o, n, l)
                      , Ot = void 0
                      , Et = void 0;
                    bt.ttisinteger() && kt.ttisinteger() ? e.stack[i].setivalue(et(e, bt.value, kt.value)) : !1 !== (Ot = Je(bt)) && !1 !== (Et = Je(kt)) ? e.stack[i].setfltvalue(Math.floor(Ot / Et)) : Ie.luaT_trybinTM(e, bt, kt, e.stack[i], Ie.TMS.TM_IDIV);
                    break;
                case m:
                    var mt, Ut = Ve(e, o, n, l), Nt = Ge(e, o, n, l), Rt = void 0;
                    !1 !== (mt = Ye(Ut)) && !1 !== (Rt = Ye(Nt)) ? e.stack[i].setivalue(mt & Rt) : Ie.luaT_trybinTM(e, Ut, Nt, e.stack[i], Ie.TMS.TM_BAND);
                    break;
                case N:
                    var St, yt = Ve(e, o, n, l), wt = Ge(e, o, n, l), It = void 0;
                    !1 !== (St = Ye(yt)) && !1 !== (It = Ye(wt)) ? e.stack[i].setivalue(St | It) : Ie.luaT_trybinTM(e, yt, wt, e.stack[i], Ie.TMS.TM_BOR);
                    break;
                case R:
                    var Mt, Pt = Ve(e, o, n, l), Ct = Ge(e, o, n, l), Dt = void 0;
                    !1 !== (Mt = Ye(Pt)) && !1 !== (Dt = Ye(Ct)) ? e.stack[i].setivalue(Mt ^ Dt) : Ie.luaT_trybinTM(e, Pt, Ct, e.stack[i], Ie.TMS.TM_BXOR);
                    break;
                case le:
                    var Vt, Gt = Ve(e, o, n, l), Bt = Ge(e, o, n, l), Kt = void 0;
                    !1 !== (Vt = Ye(Gt)) && !1 !== (Kt = Ye(Bt)) ? e.stack[i].setivalue(rt(Vt, Kt)) : Ie.luaT_trybinTM(e, Gt, Bt, e.stack[i], Ie.TMS.TM_SHL);
                    break;
                case ie:
                    var Ft, Ht = Ve(e, o, n, l), jt = Ge(e, o, n, l), Xt = void 0;
                    !1 !== (Ft = Ye(Ht)) && !1 !== (Xt = Ye(jt)) ? e.stack[i].setivalue(rt(Ft, -Xt)) : Ie.luaT_trybinTM(e, Ht, jt, e.stack[i], Ie.TMS.TM_SHR);
                    break;
                case he:
                    var zt = e.stack[De(0, o, l)]
                      , Yt = void 0;
                    zt.ttisinteger() ? e.stack[i].setivalue(0 | -zt.value) : !1 !== (Yt = Je(zt)) ? e.stack[i].setfltvalue(-Yt) : Ie.luaT_trybinTM(e, zt, zt, e.stack[i], Ie.TMS.TM_UNM);
                    break;
                case U:
                    var Jt = e.stack[De(0, o, l)];
                    Jt.ttisinteger() ? e.stack[i].setivalue(~Jt.value) : Ie.luaT_trybinTM(e, Jt, Jt, e.stack[i], Ie.TMS.TM_BNOT);
                    break;
                case ee:
                    var Zt = e.stack[De(0, o, l)];
                    e.stack[i].setbvalue(Zt.l_isfalse());
                    break;
                case j:
                    Qe(e, e.stack[i], e.stack[De(0, o, l)]);
                    break;
                case w:
                    var qt = l.B
                      , Wt = l.C;
                    e.top = o + Wt + 1,
                    ct(e, Wt - qt + 1);
                    var Qt = o + qt;
                    Ee.setobjs2s(e, i, Qt),
                    we.adjust_top(e, t.top);
                    break;
                case F:
                    Be(e, t, l, 0);
                    break;
                case M:
                    je(e, Ve(e, o, n, l), Ge(e, o, n, l)) !== l.A ? t.l_savedpc++ : Ke(e, t);
                    break;
                case Z:
                    Fe(e, Ve(e, o, n, l), Ge(e, o, n, l)) !== l.A ? t.l_savedpc++ : Ke(e, t);
                    break;
                case H:
                    He(e, Ve(e, o, n, l), Ge(e, o, n, l)) !== l.A ? t.l_savedpc++ : Ke(e, t);
                    break;
                case fe:
                    (l.C ? e.stack[i].l_isfalse() : !e.stack[i].l_isfalse()) ? t.l_savedpc++ : Ke(e, t);
                    break;
                case pe:
                    var $t = De(0, o, l)
                      , er = e.stack[$t];
                    (l.C ? er.l_isfalse() : !er.l_isfalse()) ? t.l_savedpc++ : (Ee.setobjs2s(e, i, $t),
                    Ke(e, t));
                    break;
                case S:
                    var tr = l.B
                      , rr = l.C - 1;
                    if (0 !== tr && we.adjust_top(e, i + tr),
                    !we.luaD_precall(e, i, rr)) {
                        t = e.ci;
                        continue e
                    }
                    rr >= 0 && we.adjust_top(e, t.top);
                    break;
                case _e:
                    var nr = l.B;
                    if (0 !== nr && we.adjust_top(e, i + nr),
                    !we.luaD_precall(e, i, s)) {
                        var ar = e.ci
                          , ur = ar.previous
                          , sr = ar.func
                          , or = ar.funcOff
                          , lr = ur.funcOff
                          , ir = ar.l_base + sr.value.p.numparams;
                        r.p.p.length > 0 && me.luaF_close(e, ur.l_base);
                        for (var cr = 0; or + cr < ir; cr++)
                            Ee.setobjs2s(e, lr + cr, or + cr);
                        ur.l_base = lr + (ar.l_base - or),
                        ur.top = lr + (e.top - or),
                        we.adjust_top(e, ur.top),
                        ur.l_code = ar.l_code,
                        ur.l_savedpc = ar.l_savedpc,
                        ur.callstatus |= Ue.CIST_TAIL,
                        ur.next = null,
                        t = e.ci = ur,
                        ke(e.top === ur.l_base + e.stack[lr].value.p.maxstacksize);
                        continue e
                    }
                    break;
                case re:
                    r.p.p.length > 0 && me.luaF_close(e, o);
                    var _r = we.luaD_poscall(e, t, i, 0 !== l.B ? l.B - 1 : e.top - i);
                    if (t.callstatus & Ue.CIST_FRESH)
                        return;
                    t = e.ci,
                    _r && we.adjust_top(e, t.top),
                    ke(t.callstatus & Ue.CIST_LUA),
                    ke(t.l_code[t.l_savedpc - 1].opcode === S);
                    continue e;
                case C:
                    if (e.stack[i].ttisinteger()) {
                        var fr = e.stack[i + 2].value
                          , pr = e.stack[i].value + fr | 0
                          , vr = e.stack[i + 1].value;
                        (0 < fr ? pr <= vr : vr <= pr) && (t.l_savedpc += l.sBx,
                        e.stack[i].chgivalue(pr),
                        e.stack[i + 3].setivalue(pr))
                    } else {
                        var dr = e.stack[i + 2].value
                          , hr = e.stack[i].value + dr
                          , Lr = e.stack[i + 1].value;
                        (0 < dr ? hr <= Lr : Lr <= hr) && (t.l_savedpc += l.sBx,
                        e.stack[i].chgfltvalue(hr),
                        e.stack[i + 3].setfltvalue(hr))
                    }
                    break;
                case D:
                    var Ar = e.stack[i]
                      , gr = e.stack[i + 1]
                      , Tr = e.stack[i + 2]
                      , xr = void 0;
                    if (Ar.ttisinteger() && Tr.ttisinteger() && (xr = Xe(gr, Tr.value))) {
                        var br = xr.stopnow ? 0 : Ar.value;
                        gr.value = xr.ilimit,
                        Ar.value = br - Tr.value | 0
                    } else {
                        var kr, Or, Er;
                        !1 === (kr = Je(gr)) && Pe.luaG_runerror(e, g("'for' limit must be a number", !0)),
                        e.stack[i + 1].setfltvalue(kr),
                        !1 === (Or = Je(Tr)) && Pe.luaG_runerror(e, g("'for' step must be a number", !0)),
                        e.stack[i + 2].setfltvalue(Or),
                        !1 === (Er = Je(Ar)) && Pe.luaG_runerror(e, g("'for' initial value must be a number", !0)),
                        e.stack[i].setfltvalue(Er - Or)
                    }
                    t.l_savedpc += l.sBx;
                    break;
                case ve:
                    var mr = i + 3;
                    Ee.setobjs2s(e, mr + 2, i + 2),
                    Ee.setobjs2s(e, mr + 1, i + 1),
                    Ee.setobjs2s(e, mr, i),
                    we.adjust_top(e, mr + 3),
                    we.luaD_call(e, mr, l.C),
                    we.adjust_top(e, t.top),
                    l = t.l_code[t.l_savedpc++],
                    i = Ce(0, o, l),
                    ke(l.opcode === de);
                case de:
                    e.stack[i + 1].ttisnil() || (Ee.setobjs2s(e, i, i + 1),
                    t.l_savedpc += l.sBx);
                    break;
                case ae:
                    var Ur = l.B
                      , Nr = l.C;
                    0 === Ur && (Ur = e.top - i - 1),
                    0 === Nr && (ke(t.l_code[t.l_savedpc].opcode === P),
                    Nr = t.l_code[t.l_savedpc++].Ax);
                    for (var Rr = e.stack[i].value, Sr = (Nr - 1) * k + Ur; Ur > 0; Ur--)
                        Me.luaH_setint(Rr, Sr--, e.stack[i + Ur]);
                    we.adjust_top(e, t.top);
                    break;
                case y:
                    var yr = r.p.p[l.Bx]
                      , wr = nt(yr, r.upvals, e.stack, o);
                    null === wr ? at(e, yr, r.upvals, o, i) : e.stack[i].setclLvalue(wr);
                    break;
                case Le:
                    var Ir = l.B - 1
                      , Mr = o - t.funcOff - r.p.numparams - 1
                      , Pr = void 0;
                    for (Mr < 0 && (Mr = 0),
                    Ir < 0 && (Ir = Mr,
                    we.luaD_checkstack(e, Mr),
                    we.adjust_top(e, i + Mr)),
                    Pr = 0; Pr < Ir && Pr < Mr; Pr++)
                        Ee.setobjs2s(e, i + Pr, o - Mr + Pr);
                    for (; Pr < Ir; Pr++)
                        e.stack[i + Pr].setnilvalue();
                    break;
                case P:
                    throw Error("invalid opcode")
                }
            }
        }
        ,
        e.exports.luaV_finishOp = function(e) {
            var t = e.ci
              , r = t.l_base
              , n = t.l_code[t.l_savedpc - 1]
              , a = n.opcode;
            switch (a) {
            case E:
            case ce:
            case Q:
            case I:
            case K:
            case m:
            case N:
            case R:
            case le:
            case ie:
            case q:
            case te:
            case he:
            case U:
            case j:
            case G:
            case V:
            case ne:
                Ee.setobjs2s(e, r + n.A, e.top - 1),
                delete e.stack[--e.top];
                break;
            case H:
            case Z:
            case M:
                var u = !e.stack[e.top - 1].l_isfalse();
                delete e.stack[--e.top],
                t.callstatus & Ue.CIST_LEQ && (ke(a === H),
                t.callstatus ^= Ue.CIST_LEQ,
                u = !u),
                ke(t.l_code[t.l_savedpc].opcode === F),
                u !== !!n.A && t.l_savedpc++;
                break;
            case w:
                var s = e.top - 1
                  , o = s - 1 - (r + n.B);
                Ee.setobjs2s(e, s - 2, s),
                o > 1 && (e.top = s - 1,
                ct(e, o)),
                Ee.setobjs2s(e, t.l_base + n.A, e.top - 1),
                we.adjust_top(e, t.top);
                break;
            case ve:
                ke(t.l_code[t.l_savedpc].opcode === de),
                we.adjust_top(e, t.top);
                break;
            case S:
                n.C - 1 >= 0 && we.adjust_top(e, t.top)
            }
        }
        ,
        e.exports.luaV_imul = $e,
        e.exports.luaV_lessequal = He,
        e.exports.luaV_lessthan = Fe,
        e.exports.luaV_mod = tt,
        e.exports.luaV_objlen = Qe,
        e.exports.luaV_rawequalobj = function(e, t) {
            return je(null, e, t)
        }
        ,
        e.exports.luaV_shiftl = rt,
        e.exports.luaV_tointeger = ze,
        e.exports.settable = ft,
        e.exports.tointeger = Ye,
        e.exports.tonumber = Je
    }
    , function(e, t, r) {
        "use strict";
        var n = r(0)
          , a = n.constant_types
          , u = a.LUA_TTABLE
          , s = a.LUA_TUSERDATA
          , o = n.to_luastring
          , l = r(2).lua_assert
          , i = r(5)
          , c = r(7)
          , _ = r(10)
          , f = r(8)
          , p = f.luaS_bless
          , v = f.luaS_new
          , d = r(9)
          , h = r(11)
          , L = r(14)
          , A = ["no value", "nil", "boolean", "userdata", "number", "string", "table", "function", "userdata", "thread", "proto"].map(function(e) {
            return o(e)
        })
          , g = function(e) {
            return A[e + 1]
        }
          , T = {
            TM_INDEX: 0,
            TM_NEWINDEX: 1,
            TM_GC: 2,
            TM_MODE: 3,
            TM_LEN: 4,
            TM_EQ: 5,
            TM_ADD: 6,
            TM_SUB: 7,
            TM_MUL: 8,
            TM_MOD: 9,
            TM_POW: 10,
            TM_DIV: 11,
            TM_IDIV: 12,
            TM_BAND: 13,
            TM_BOR: 14,
            TM_BXOR: 15,
            TM_SHL: 16,
            TM_SHR: 17,
            TM_UNM: 18,
            TM_BNOT: 19,
            TM_LT: 20,
            TM_LE: 21,
            TM_CONCAT: 22,
            TM_CALL: 23,
            TM_N: 24
        }
          , x = o("__name", !0)
          , b = function(e, t, r, n, a, u) {
            var s = e.top;
            if (i.pushobj2s(e, t),
            i.pushobj2s(e, r),
            i.pushobj2s(e, n),
            u || i.pushobj2s(e, a),
            e.ci.callstatus & _.CIST_LUA ? c.luaD_call(e, s, u) : c.luaD_callnoyield(e, s, u),
            u) {
                var o = e.stack[e.top - 1];
                delete e.stack[--e.top],
                a.setfrom(o)
            }
        }
          , k = function(e, t, r, n, a) {
            var u = E(e, t, a);
            return u.ttisnil() && (u = E(e, r, a)),
            !u.ttisnil() && (b(e, u, t, r, n, 1),
            !0)
        }
          , O = function(e, t, r) {
            var n = d.luaH_getstr(e, r);
            return l(t <= T.TM_EQ),
            n.ttisnil() ? (e.flags |= 1 << t,
            null) : n
        }
          , E = function(e, t, r) {
            var n = void 0;
            switch (t.ttnov()) {
            case u:
            case s:
                n = t.value.metatable;
                break;
            default:
                n = e.l_G.mt[t.ttnov()]
            }
            return n ? d.luaH_getstr(n, e.l_G.tmname[r]) : i.luaO_nilobject
        };
        e.exports.fasttm = function(e, t, r) {
            return null === t ? null : t.flags & 1 << r ? null : O(t, r, e.l_G.tmname[r])
        }
        ,
        e.exports.TMS = T,
        e.exports.luaT_callTM = b,
        e.exports.luaT_callbinTM = k,
        e.exports.luaT_trybinTM = function(e, t, r, n, a) {
            if (!k(e, t, r, n, a))
                switch (a) {
                case T.TM_CONCAT:
                    return h.luaG_concaterror(e, t, r);
                case T.TM_BAND:
                case T.TM_BOR:
                case T.TM_BXOR:
                case T.TM_SHL:
                case T.TM_SHR:
                case T.TM_BNOT:
                    var u = L.tonumber(t)
                      , s = L.tonumber(r);
                    return !1 !== u && !1 !== s ? h.luaG_tointerror(e, t, r) : h.luaG_opinterror(e, t, r, o("perform bitwise operation on", !0));
                default:
                    return h.luaG_opinterror(e, t, r, o("perform arithmetic on", !0))
                }
        }
        ,
        e.exports.luaT_callorderTM = function(e, t, r, n) {
            var a = new i.TValue;
            return k(e, t, r, a, n) ? !a.l_isfalse() : null
        }
        ,
        e.exports.luaT_gettm = O,
        e.exports.luaT_gettmbyobj = E,
        e.exports.luaT_init = function(e) {
            e.l_G.tmname[T.TM_INDEX] = new v(e,o("__index", !0)),
            e.l_G.tmname[T.TM_NEWINDEX] = new v(e,o("__newindex", !0)),
            e.l_G.tmname[T.TM_GC] = new v(e,o("__gc", !0)),
            e.l_G.tmname[T.TM_MODE] = new v(e,o("__mode", !0)),
            e.l_G.tmname[T.TM_LEN] = new v(e,o("__len", !0)),
            e.l_G.tmname[T.TM_EQ] = new v(e,o("__eq", !0)),
            e.l_G.tmname[T.TM_ADD] = new v(e,o("__add", !0)),
            e.l_G.tmname[T.TM_SUB] = new v(e,o("__sub", !0)),
            e.l_G.tmname[T.TM_MUL] = new v(e,o("__mul", !0)),
            e.l_G.tmname[T.TM_MOD] = new v(e,o("__mod", !0)),
            e.l_G.tmname[T.TM_POW] = new v(e,o("__pow", !0)),
            e.l_G.tmname[T.TM_DIV] = new v(e,o("__div", !0)),
            e.l_G.tmname[T.TM_IDIV] = new v(e,o("__idiv", !0)),
            e.l_G.tmname[T.TM_BAND] = new v(e,o("__band", !0)),
            e.l_G.tmname[T.TM_BOR] = new v(e,o("__bor", !0)),
            e.l_G.tmname[T.TM_BXOR] = new v(e,o("__bxor", !0)),
            e.l_G.tmname[T.TM_SHL] = new v(e,o("__shl", !0)),
            e.l_G.tmname[T.TM_SHR] = new v(e,o("__shr", !0)),
            e.l_G.tmname[T.TM_UNM] = new v(e,o("__unm", !0)),
            e.l_G.tmname[T.TM_BNOT] = new v(e,o("__bnot", !0)),
            e.l_G.tmname[T.TM_LT] = new v(e,o("__lt", !0)),
            e.l_G.tmname[T.TM_LE] = new v(e,o("__le", !0)),
            e.l_G.tmname[T.TM_CONCAT] = new v(e,o("__concat", !0)),
            e.l_G.tmname[T.TM_CALL] = new v(e,o("__call", !0))
        }
        ,
        e.exports.luaT_objtypename = function(e, t) {
            var r = void 0;
            if (t.ttistable() && null !== (r = t.value.metatable) || t.ttisfulluserdata() && null !== (r = t.value.metatable)) {
                var n = d.luaH_getstr(r, p(e, x));
                if (n.ttisstring())
                    return n.svalue()
            }
            return g(t.ttnov())
        }
        ,
        e.exports.ttypename = g
    }
    , function(e, t, r) {
        "use strict";
        var n = r(0).constant_types.LUA_TNIL
          , a = r(5);
        e.exports.MAXUPVAL = 255,
        e.exports.Proto = function e(t) {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this.id = t.l_G.id_counter++,
            this.k = [],
            this.p = [],
            this.code = [],
            this.cache = null,
            this.lineinfo = [],
            this.upvalues = [],
            this.numparams = 0,
            this.is_vararg = !1,
            this.maxstacksize = 0,
            this.locvars = [],
            this.linedefined = 0,
            this.lastlinedefined = 0,
            this.source = null
        }
        ,
        e.exports.luaF_findupval = function(e, t) {
            return e.stack[t]
        }
        ,
        e.exports.luaF_close = function(e, t) {
            for (var r = t; r < e.top; r++) {
                var n = e.stack[r];
                e.stack[r] = new a.TValue(n.type,n.value)
            }
        }
        ,
        e.exports.luaF_getlocalname = function(e, t, r) {
            for (var n = 0; n < e.locvars.length && e.locvars[n].startpc <= r; n++)
                if (r < e.locvars[n].endpc && 0 == --t)
                    return e.locvars[n].varname.getstr();
            return null
        }
        ,
        e.exports.luaF_initupvals = function(e, t) {
            for (var r = 0; r < t.nupvalues; r++)
                t.upvals[r] = new a.TValue(n,null)
        }
        ,
        e.exports.luaF_newLclosure = function(e, t) {
            return new a.LClosure(e,t)
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }();
        function a(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var u = r(2).lua_assert
          , s = function() {
            function e(t, r, n) {
                a(this, e),
                this.L = t,
                u("function" == typeof r, "ZIO requires a reader"),
                this.reader = r,
                this.data = n,
                this.n = 0,
                this.buffer = null,
                this.off = 0
            }
            return n(e, [{
                key: "zgetc",
                value: function() {
                    return this.n-- > 0 ? this.buffer[this.off++] : o(this)
                }
            }]),
            e
        }()
          , o = function(e) {
            var t = e.reader(e.L, e.data);
            if (null === t)
                return -1;
            u(t instanceof Uint8Array, "Should only load binary of array of bytes");
            var r = t.length;
            return 0 === r ? -1 : (e.buffer = t,
            e.off = 0,
            e.n = r - 1,
            e.buffer[e.off++])
        };
        e.exports.EOZ = -1,
        e.exports.luaZ_buffer = function(e) {
            return e.buffer.subarray(0, e.n)
        }
        ,
        e.exports.luaZ_buffremove = function(e, t) {
            e.n -= t
        }
        ,
        e.exports.luaZ_fill = o,
        e.exports.luaZ_read = function(e, t, r, n) {
            for (; n; ) {
                if (0 === e.n) {
                    if (-1 === o(e))
                        return n;
                    e.n++,
                    e.off--
                }
                for (var a = n <= e.n ? n : e.n, u = 0; u < a; u++)
                    t[r++] = e.buffer[e.off++];
                e.n -= a,
                0 === e.n && (e.buffer = null),
                n -= a
            }
            return 0
        }
        ,
        e.exports.luaZ_resetbuffer = function(e) {
            e.n = 0
        }
        ,
        e.exports.luaZ_resizebuffer = function(e, t, r) {
            var n = new Uint8Array(r);
            t.buffer && n.set(t.buffer),
            t.buffer = n
        }
        ,
        e.exports.MBuffer = function e() {
            a(this, e),
            this.buffer = null,
            this.n = 0
        }
        ,
        e.exports.ZIO = s
    }
    , function(e, t, r) {
        "use strict";
        var n = r(0)
          , a = n.LUA_MULTRET
          , u = n.LUA_OPBNOT
          , s = n.LUA_OPEQ
          , o = n.LUA_OPLE
          , l = n.LUA_OPLT
          , i = n.LUA_OPUNM
          , c = n.LUA_REGISTRYINDEX
          , _ = n.LUA_RIDX_GLOBALS
          , f = n.LUA_VERSION_NUM
          , p = n.constant_types
          , v = p.LUA_NUMTAGS
          , d = p.LUA_TBOOLEAN
          , h = p.LUA_TCCL
          , L = p.LUA_TFUNCTION
          , A = p.LUA_TLCF
          , g = p.LUA_TLCL
          , T = p.LUA_TLIGHTUSERDATA
          , x = p.LUA_TLNGSTR
          , b = p.LUA_TNIL
          , k = p.LUA_TNONE
          , O = p.LUA_TNUMFLT
          , E = p.LUA_TNUMINT
          , m = p.LUA_TSHRSTR
          , U = p.LUA_TTABLE
          , N = p.LUA_TTHREAD
          , R = p.LUA_TUSERDATA
          , S = n.thread_status.LUA_OK
          , y = n.from_userstring
          , w = n.to_luastring
          , I = r(2).api_check
          , M = r(11)
          , P = r(7)
          , C = r(36).luaU_dump
          , D = r(16)
          , V = r(5)
          , G = r(10)
          , B = r(8)
          , K = B.luaS_bless
          , F = B.luaS_new
          , H = B.luaS_newliteral
          , j = r(15)
          , X = r(3).LUAI_MAXSTACK
          , z = r(14)
          , Y = r(9)
          , J = r(17).ZIO
          , Z = V.TValue
          , q = V.CClosure
          , W = function(e) {
            e.top++,
            I(e, e.top <= e.ci.top, "stack overflow")
        }
          , Q = function(e, t) {
            I(e, t < e.top - e.ci.funcOff, "not enough elements in the stack")
        }
          , $ = function(e) {
            if (!e)
                throw TypeError("invalid argument")
        }
          , ee = function(e) {
            $("number" == typeof e && (0 | e) === e)
        }
          , te = function(e) {
            return e !== V.luaO_nilobject
        }
          , re = function(e, t) {
            var r = e.ci;
            if (t > 0) {
                var n = r.funcOff + t;
                return I(e, t <= r.top - (r.funcOff + 1), "unacceptable index"),
                n >= e.top ? V.luaO_nilobject : e.stack[n]
            }
            return t > c ? (I(e, 0 !== t && -t <= e.top, "invalid index"),
            e.stack[e.top + t]) : t === c ? e.l_G.l_registry : (I(e, (t = c - t) <= D.MAXUPVAL + 1, "upvalue index too large"),
            r.func.ttislcf() ? V.luaO_nilobject : t <= r.func.value.nupvalues ? r.func.value.upvalue[t - 1] : V.luaO_nilobject)
        }
          , ne = function(e, t) {
            var r = e.ci;
            if (t > 0) {
                var n = r.funcOff + t;
                return I(e, t <= r.top - (r.funcOff + 1), "unacceptable index"),
                n >= e.top ? null : n
            }
            if (t > c)
                return I(e, 0 !== t && -t <= e.top, "invalid index"),
                e.top + t;
            throw Error("attempt to use pseudo-index")
        }
          , ae = function(e, t) {
            var r = e.ci.funcOff
              , n = void 0;
            t >= 0 ? (I(e, t <= e.stack_last - (r + 1), "new top too large"),
            n = r + 1 + t) : (I(e, -(t + 1) <= e.top - (r + 1), "invalid new top"),
            n = e.top + t + 1),
            P.adjust_top(e, n)
        }
          , ue = function(e, t) {
            ae(e, -t - 1)
        }
          , se = function(e, t, r) {
            for (; t < r; t++,
            r--) {
                var n = e.stack[t]
                  , a = new Z(n.type,n.value);
                V.setobjs2s(e, t, r),
                V.setobj2s(e, r, a)
            }
        }
          , oe = function(e, t, r) {
            var n = e.top - 1
              , a = ne(e, t)
              , u = e.stack[a];
            I(e, te(u) && t > c, "index not in the stack"),
            I(e, (r >= 0 ? r : -r) <= n - a + 1, "invalid 'n'");
            var s = r >= 0 ? n - r : a - r - 1;
            se(e, a, s),
            se(e, s + 1, e.top - 1),
            se(e, a, e.top - 1)
        }
          , le = function(e, t, r) {
            var n = re(e, t);
            re(e, r).setfrom(n)
        }
          , ie = function(e, t, r) {
            if ($("function" == typeof t),
            ee(r),
            0 === r)
                e.stack[e.top] = new Z(A,t);
            else {
                Q(e, r),
                I(e, r <= D.MAXUPVAL, "upvalue index too large");
                for (var n = new q(e,t,r), a = 0; a < r; a++)
                    n.upvalue[a].setfrom(e.stack[e.top - r + a]);
                for (var u = 1; u < r; u++)
                    delete e.stack[--e.top];
                r > 0 && --e.top,
                e.stack[e.top].setclCvalue(n)
            }
            W(e)
        }
          , ce = ie
          , _e = function(e, t) {
            ie(e, t, 0)
        }
          , fe = _e
          , pe = function(e, t, r) {
            var n = F(e, y(r));
            Q(e, 1),
            V.pushsvalue2s(e, n),
            I(e, e.top <= e.ci.top, "stack overflow"),
            z.settable(e, t, e.stack[e.top - 1], e.stack[e.top - 2]),
            delete e.stack[--e.top],
            delete e.stack[--e.top]
        }
          , ve = function(e, t) {
            pe(e, Y.luaH_getint(e.l_G.l_registry.value, _), t)
        }
          , de = function(e, t, r) {
            var n = F(e, y(r));
            return V.pushsvalue2s(e, n),
            I(e, e.top <= e.ci.top, "stack overflow"),
            z.luaV_gettable(e, t, e.stack[e.top - 1], e.top - 1),
            e.stack[e.top - 1].ttnov()
        }
          , he = function(e, t, r) {
            var n = re(e, t);
            return ee(r),
            I(e, n.ttistable(), "table expected"),
            V.pushobj2s(e, Y.luaH_getint(n.value, r)),
            I(e, e.top <= e.ci.top, "stack overflow"),
            e.stack[e.top - 1].ttnov()
        }
          , Le = function(e, t, r) {
            var n = new V.TValue(U,Y.luaH_new(e));
            e.stack[e.top] = n,
            W(e)
        }
          , Ae = function(e, t, r) {
            switch (ee(r),
            t.ttype()) {
            case h:
                var n = t.value;
                return 1 <= r && r <= n.nupvalues ? {
                    name: w("", !0),
                    val: n.upvalue[r - 1]
                } : null;
            case g:
                var a = t.value
                  , u = a.p;
                if (!(1 <= r && r <= u.upvalues.length))
                    return null;
                var s = u.upvalues[r - 1].name;
                return {
                    name: s ? s.getstr() : w("(*no name)", !0),
                    val: a.upvals[r - 1]
                };
            default:
                return null
            }
        }
          , ge = function(e, t) {
            var r = re(e, t);
            if (!r.ttisstring()) {
                if (!z.cvt2str(r))
                    return null;
                V.luaO_tostring(e, r)
            }
            return r.svalue()
        }
          , Te = ge
          , xe = function(e, t) {
            return z.tointeger(re(e, t))
        }
          , be = function(e, t) {
            return z.tonumber(re(e, t))
        }
          , ke = new WeakMap
          , Oe = function(e, t) {
            P.luaD_callnoyield(e, t.funcOff, t.nresults)
        }
          , Ee = function(e, t) {
            var r = re(e, t);
            return te(r) ? r.ttnov() : k
        }
          , me = w("?")
          , Ue = function(e, t, r) {
            I(e, r === a || e.ci.top - e.top >= r - t, "results from function overflow current stack size")
        }
          , Ne = function(e, t, r, n, u) {
            I(e, null === u || !(e.ci.callstatus & G.CIST_LUA), "cannot use continuations inside hooks"),
            Q(e, t + 1),
            I(e, e.status === S, "cannot do calls on non-normal thread"),
            Ue(e, t, r);
            var s = e.top - (t + 1);
            null !== u && 0 === e.nny ? (e.ci.c_k = u,
            e.ci.c_ctx = n,
            P.luaD_call(e, s, r)) : P.luaD_callnoyield(e, s, r),
            r === a && e.ci.top < e.top && (e.ci.top = e.top)
        }
          , Re = function(e, t, r, n, u, s) {
            I(e, null === s || !(e.ci.callstatus & G.CIST_LUA), "cannot use continuations inside hooks"),
            Q(e, t + 1),
            I(e, e.status === S, "cannot do calls on non-normal thread"),
            Ue(e, t, r);
            var o = void 0
              , l = void 0;
            l = 0 === n ? 0 : ne(e, n);
            var i = e.top - (t + 1);
            if (null === s || e.nny > 0) {
                var c = {
                    funcOff: i,
                    nresults: r
                };
                o = P.luaD_pcall(e, Oe, c, i, l)
            } else {
                var _ = e.ci;
                _.c_k = s,
                _.c_ctx = u,
                _.extra = i,
                _.c_old_errfunc = e.errfunc,
                e.errfunc = l,
                _.callstatus &= ~G.CIST_OAH | e.allowhook,
                _.callstatus |= G.CIST_YPCALL,
                P.luaD_call(e, i, r),
                _.callstatus &= ~G.CIST_YPCALL,
                e.errfunc = _.c_old_errfunc,
                o = S
            }
            return r === a && e.ci.top < e.top && (e.ci.top = e.top),
            o
        }
          , Se = function(e, t, r) {
            var n = re(e, t);
            I(e, n.ttisLclosure(), "Lua function expected");
            var a = n.value;
            return ee(r),
            I(e, 1 <= r && r <= a.p.upvalues.length, "invalid upvalue index"),
            {
                f: a,
                i: r - 1
            }
        };
        e.exports.api_incr_top = W,
        e.exports.api_checknelems = Q,
        e.exports.lua_absindex = function(e, t) {
            return t > 0 || t <= c ? t : e.top - e.ci.funcOff + t
        }
        ,
        e.exports.lua_arith = function(e, t) {
            t !== i && t !== u ? Q(e, 2) : (Q(e, 1),
            V.pushobj2s(e, e.stack[e.top - 1]),
            I(e, e.top <= e.ci.top, "stack overflow")),
            V.luaO_arith(e, t, e.stack[e.top - 2], e.stack[e.top - 1], e.stack[e.top - 2]),
            delete e.stack[--e.top]
        }
        ,
        e.exports.lua_atpanic = function(e, t) {
            var r = e.l_G.panic;
            return e.l_G.panic = t,
            r
        }
        ,
        e.exports.lua_atnativeerror = function(e, t) {
            var r = e.l_G.atnativeerror;
            return e.l_G.atnativeerror = t,
            r
        }
        ,
        e.exports.lua_call = function(e, t, r) {
            Ne(e, t, r, 0, null)
        }
        ,
        e.exports.lua_callk = Ne,
        e.exports.lua_checkstack = function(e, t) {
            var r = void 0
              , n = e.ci;
            I(e, t >= 0, "negative 'n'"),
            e.stack_last - e.top > t ? r = !0 : e.top + G.EXTRA_STACK > X - t ? r = !1 : (P.luaD_growstack(e, t),
            r = !0);
            return r && n.top < e.top + t && (n.top = e.top + t),
            r
        }
        ,
        e.exports.lua_compare = function(e, t, r, n) {
            var a = re(e, t)
              , u = re(e, r)
              , i = 0;
            if (te(a) && te(u))
                switch (n) {
                case s:
                    i = z.luaV_equalobj(e, a, u);
                    break;
                case l:
                    i = z.luaV_lessthan(e, a, u);
                    break;
                case o:
                    i = z.luaV_lessequal(e, a, u);
                    break;
                default:
                    I(e, !1, "invalid option")
                }
            return i
        }
        ,
        e.exports.lua_concat = function(e, t) {
            Q(e, t),
            t >= 2 ? z.luaV_concat(e, t) : 0 === t && (V.pushsvalue2s(e, K(e, w("", !0))),
            I(e, e.top <= e.ci.top, "stack overflow"))
        }
        ,
        e.exports.lua_copy = le,
        e.exports.lua_createtable = Le,
        e.exports.lua_dump = function(e, t, r, n) {
            Q(e, 1);
            var a = e.stack[e.top - 1];
            return a.ttisLclosure() ? C(e, a.value.p, t, r, n) : 1
        }
        ,
        e.exports.lua_error = function(e) {
            Q(e, 1),
            M.luaG_errormsg(e)
        }
        ,
        e.exports.lua_gc = function() {}
        ,
        e.exports.lua_getallocf = function() {
            return console.warn("lua_getallocf is not available"),
            0
        }
        ,
        e.exports.lua_getextraspace = function() {
            return console.warn("lua_getextraspace is not available"),
            0
        }
        ,
        e.exports.lua_getfield = function(e, t, r) {
            return de(e, re(e, t), r)
        }
        ,
        e.exports.lua_getglobal = function(e, t) {
            return de(e, Y.luaH_getint(e.l_G.l_registry.value, _), t)
        }
        ,
        e.exports.lua_geti = function(e, t, r) {
            var n = re(e, t);
            return ee(r),
            e.stack[e.top] = new Z(E,r),
            W(e),
            z.luaV_gettable(e, n, e.stack[e.top - 1], e.top - 1),
            e.stack[e.top - 1].ttnov()
        }
        ,
        e.exports.lua_getmetatable = function(e, t) {
            var r = re(e, t)
              , n = void 0
              , a = !1;
            switch (r.ttnov()) {
            case U:
            case R:
                n = r.value.metatable;
                break;
            default:
                n = e.l_G.mt[r.ttnov()]
            }
            return null !== n && void 0 !== n && (e.stack[e.top] = new Z(U,n),
            W(e),
            a = !0),
            a
        }
        ,
        e.exports.lua_gettable = function(e, t) {
            var r = re(e, t);
            return z.luaV_gettable(e, r, e.stack[e.top - 1], e.top - 1),
            e.stack[e.top - 1].ttnov()
        }
        ,
        e.exports.lua_gettop = function(e) {
            return e.top - (e.ci.funcOff + 1)
        }
        ,
        e.exports.lua_getupvalue = function(e, t, r) {
            var n = Ae(0, re(e, t), r);
            if (n) {
                var a = n.name
                  , u = n.val;
                return V.pushobj2s(e, u),
                I(e, e.top <= e.ci.top, "stack overflow"),
                a
            }
            return null
        }
        ,
        e.exports.lua_getuservalue = function(e, t) {
            var r = re(e, t);
            I(e, r.ttisfulluserdata(), "full userdata expected");
            var n = r.value.uservalue;
            return e.stack[e.top] = new Z(n.type,n.value),
            W(e),
            e.stack[e.top - 1].ttnov()
        }
        ,
        e.exports.lua_insert = function(e, t) {
            oe(e, t, 1)
        }
        ,
        e.exports.lua_isboolean = function(e, t) {
            return Ee(e, t) === d
        }
        ,
        e.exports.lua_iscfunction = function(e, t) {
            var r = re(e, t);
            return r.ttislcf(r) || r.ttisCclosure()
        }
        ,
        e.exports.lua_isfunction = function(e, t) {
            return Ee(e, t) === L
        }
        ,
        e.exports.lua_isinteger = function(e, t) {
            return re(e, t).ttisinteger()
        }
        ,
        e.exports.lua_islightuserdata = function(e, t) {
            return Ee(e, t) === T
        }
        ,
        e.exports.lua_isnil = function(e, t) {
            return Ee(e, t) === b
        }
        ,
        e.exports.lua_isnone = function(e, t) {
            return Ee(e, t) === k
        }
        ,
        e.exports.lua_isnoneornil = function(e, t) {
            return Ee(e, t) <= 0
        }
        ,
        e.exports.lua_isnumber = function(e, t) {
            return !1 !== z.tonumber(re(e, t))
        }
        ,
        e.exports.lua_isproxy = function(e, t) {
            var r = ke.get(e);
            return !!r && (null === t || t.l_G === r)
        }
        ,
        e.exports.lua_isstring = function(e, t) {
            var r = re(e, t);
            return r.ttisstring() || z.cvt2str(r)
        }
        ,
        e.exports.lua_istable = function(e, t) {
            return re(e, t).ttistable()
        }
        ,
        e.exports.lua_isthread = function(e, t) {
            return Ee(e, t) === N
        }
        ,
        e.exports.lua_isuserdata = function(e, t) {
            var r = re(e, t);
            return r.ttisfulluserdata(r) || r.ttislightuserdata()
        }
        ,
        e.exports.lua_len = function(e, t) {
            var r = re(e, t)
              , n = new Z;
            z.luaV_objlen(e, n, r),
            e.stack[e.top] = n,
            W(e)
        }
        ,
        e.exports.lua_load = function(e, t, r, n, a) {
            n = n ? y(n) : me,
            null !== a && (a = y(a));
            var u = new J(e,t,r)
              , s = P.luaD_protectedparser(e, u, n, a);
            if (s === S) {
                var o = e.stack[e.top - 1].value;
                if (o.nupvalues >= 1) {
                    var l = Y.luaH_getint(e.l_G.l_registry.value, _);
                    o.upvals[0].setfrom(l)
                }
            }
            return s
        }
        ,
        e.exports.lua_newtable = function(e) {
            Le(e)
        }
        ,
        e.exports.lua_newuserdata = function(e, t) {
            var r = function(e, t) {
                return new V.Udata(e,t)
            }(e, t);
            return e.stack[e.top] = new V.TValue(R,r),
            W(e),
            r.data
        }
        ,
        e.exports.lua_next = function(e, t) {
            var r = re(e, t);
            return I(e, r.ttistable(), "table expected"),
            e.stack[e.top] = new Z,
            Y.luaH_next(e, r.value, e.top - 1) ? (W(e),
            1) : (delete e.stack[e.top],
            delete e.stack[--e.top],
            0)
        }
        ,
        e.exports.lua_pcall = function(e, t, r, n) {
            return Re(e, t, r, n, 0, null)
        }
        ,
        e.exports.lua_pcallk = Re,
        e.exports.lua_pop = ue,
        e.exports.lua_pushboolean = function(e, t) {
            e.stack[e.top] = new Z(d,!!t),
            W(e)
        }
        ,
        e.exports.lua_pushcclosure = ie,
        e.exports.lua_pushcfunction = _e,
        e.exports.lua_pushfstring = function(e, t) {
            t = y(t);
            for (var r = arguments.length, n = Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
                n[a - 2] = arguments[a];
            return V.luaO_pushvfstring(e, t, n)
        }
        ,
        e.exports.lua_pushglobaltable = function(e) {
            he(e, c, _)
        }
        ,
        e.exports.lua_pushinteger = function(e, t) {
            ee(t),
            e.stack[e.top] = new Z(E,t),
            W(e)
        }
        ,
        e.exports.lua_pushjsclosure = ce,
        e.exports.lua_pushjsfunction = fe,
        e.exports.lua_pushlightuserdata = function(e, t) {
            e.stack[e.top] = new Z(T,t),
            W(e)
        }
        ,
        e.exports.lua_pushliteral = function(e, t) {
            if (void 0 === t || null === t)
                e.stack[e.top] = new Z(b,null),
                e.top++;
            else {
                $("string" == typeof t);
                var r = H(e, t);
                V.pushsvalue2s(e, r),
                t = r.getstr()
            }
            return I(e, e.top <= e.ci.top, "stack overflow"),
            t
        }
        ,
        e.exports.lua_pushlstring = function(e, t, r) {
            ee(r);
            var n = void 0;
            return 0 === r ? (t = w("", !0),
            n = K(e, t)) : (t = y(t),
            I(e, t.length >= r, "invalid length to lua_pushlstring"),
            n = F(e, t.subarray(0, r))),
            V.pushsvalue2s(e, n),
            I(e, e.top <= e.ci.top, "stack overflow"),
            n.value
        }
        ,
        e.exports.lua_pushnil = function(e) {
            e.stack[e.top] = new Z(b,null),
            W(e)
        }
        ,
        e.exports.lua_pushnumber = function(e, t) {
            $("number" == typeof t),
            e.stack[e.top] = new Z(O,t),
            W(e)
        }
        ,
        e.exports.lua_pushstring = function(e, t) {
            if (void 0 === t || null === t)
                e.stack[e.top] = new Z(b,null),
                e.top++;
            else {
                var r = F(e, y(t));
                V.pushsvalue2s(e, r),
                t = r.getstr()
            }
            return I(e, e.top <= e.ci.top, "stack overflow"),
            t
        }
        ,
        e.exports.lua_pushthread = function(e) {
            return e.stack[e.top] = new Z(N,e),
            W(e),
            e.l_G.mainthread === e
        }
        ,
        e.exports.lua_pushvalue = function(e, t) {
            V.pushobj2s(e, re(e, t)),
            I(e, e.top <= e.ci.top, "stack overflow")
        }
        ,
        e.exports.lua_pushvfstring = function(e, t, r) {
            return t = y(t),
            V.luaO_pushvfstring(e, t, r)
        }
        ,
        e.exports.lua_rawequal = function(e, t, r) {
            var n = re(e, t)
              , a = re(e, r);
            return te(n) && te(a) ? z.luaV_equalobj(null, n, a) : 0
        }
        ,
        e.exports.lua_rawget = function(e, t) {
            var r = re(e, t);
            return I(e, r.ttistable(r), "table expected"),
            V.setobj2s(e, e.top - 1, Y.luaH_get(e, r.value, e.stack[e.top - 1])),
            e.stack[e.top - 1].ttnov()
        }
        ,
        e.exports.lua_rawgeti = he,
        e.exports.lua_rawgetp = function(e, t, r) {
            var n = re(e, t);
            I(e, n.ttistable(), "table expected");
            var a = new Z(T,r);
            return V.pushobj2s(e, Y.luaH_get(e, n.value, a)),
            I(e, e.top <= e.ci.top, "stack overflow"),
            e.stack[e.top - 1].ttnov()
        }
        ,
        e.exports.lua_rawlen = function(e, t) {
            var r = re(e, t);
            switch (r.ttype()) {
            case m:
            case x:
                return r.vslen();
            case R:
                return r.value.len;
            case U:
                return Y.luaH_getn(r.value);
            default:
                return 0
            }
        }
        ,
        e.exports.lua_rawset = function(e, t) {
            Q(e, 2);
            var r = re(e, t);
            I(e, r.ttistable(), "table expected");
            var n = e.stack[e.top - 2]
              , a = e.stack[e.top - 1];
            a.ttisnil() ? Y.luaH_delete(e, r.value, n) : Y.luaH_set(e, r.value, n).setfrom(a);
            Y.invalidateTMcache(r.value),
            delete e.stack[--e.top],
            delete e.stack[--e.top]
        }
        ,
        e.exports.lua_rawseti = function(e, t, r) {
            ee(r),
            Q(e, 1);
            var n = re(e, t);
            I(e, n.ttistable(), "table expected"),
            Y.luaH_setint(n.value, r, e.stack[e.top - 1]),
            delete e.stack[--e.top]
        }
        ,
        e.exports.lua_rawsetp = function(e, t, r) {
            Q(e, 1);
            var n = re(e, t);
            I(e, n.ttistable(), "table expected");
            var a = new Z(T,r)
              , u = e.stack[e.top - 1];
            u.ttisnil() ? Y.luaH_delete(e, n.value, a) : Y.luaH_set(e, n.value, a).setfrom(u);
            delete e.stack[--e.top]
        }
        ,
        e.exports.lua_register = function(e, t, r) {
            _e(e, r),
            ve(e, t)
        }
        ,
        e.exports.lua_remove = function(e, t) {
            oe(e, t, -1),
            ue(e, 1)
        }
        ,
        e.exports.lua_replace = function(e, t) {
            le(e, -1, t),
            ue(e, 1)
        }
        ,
        e.exports.lua_rotate = oe,
        e.exports.lua_setallocf = function() {
            return console.warn("lua_setallocf is not available"),
            0
        }
        ,
        e.exports.lua_setfield = function(e, t, r) {
            pe(e, re(e, t), r)
        }
        ,
        e.exports.lua_setglobal = ve,
        e.exports.lua_seti = function(e, t, r) {
            ee(r),
            Q(e, 1);
            var n = re(e, t);
            e.stack[e.top] = new Z(E,r),
            W(e),
            z.settable(e, n, e.stack[e.top - 1], e.stack[e.top - 2]),
            delete e.stack[--e.top],
            delete e.stack[--e.top]
        }
        ,
        e.exports.lua_setmetatable = function(e, t) {
            Q(e, 1);
            var r = void 0
              , n = re(e, t);
            switch (e.stack[e.top - 1].ttisnil() ? r = null : (I(e, e.stack[e.top - 1].ttistable(), "table expected"),
            r = e.stack[e.top - 1].value),
            n.ttnov()) {
            case R:
            case U:
                n.value.metatable = r;
                break;
            default:
                e.l_G.mt[n.ttnov()] = r
            }
            return delete e.stack[--e.top],
            !0
        }
        ,
        e.exports.lua_settable = function(e, t) {
            Q(e, 2);
            var r = re(e, t);
            z.settable(e, r, e.stack[e.top - 2], e.stack[e.top - 1]),
            delete e.stack[--e.top],
            delete e.stack[--e.top]
        }
        ,
        e.exports.lua_settop = ae,
        e.exports.lua_setupvalue = function(e, t, r) {
            var n = re(e, t);
            Q(e, 1);
            var a = Ae(0, n, r);
            if (a) {
                var u = a.name;
                return a.val.setfrom(e.stack[e.top - 1]),
                delete e.stack[--e.top],
                u
            }
            return null
        }
        ,
        e.exports.lua_setuservalue = function(e, t) {
            Q(e, 1);
            var r = re(e, t);
            I(e, r.ttisfulluserdata(), "full userdata expected"),
            r.value.uservalue.setfrom(e.stack[e.top - 1]),
            delete e.stack[--e.top]
        }
        ,
        e.exports.lua_status = function(e) {
            return e.status
        }
        ,
        e.exports.lua_stringtonumber = function(e, t) {
            var r = new Z
              , n = V.luaO_str2num(t, r);
            return 0 !== n && (e.stack[e.top] = r,
            W(e)),
            n
        }
        ,
        e.exports.lua_toboolean = function(e, t) {
            return !re(e, t).l_isfalse()
        }
        ,
        e.exports.lua_tocfunction = function(e, t) {
            var r = re(e, t);
            return r.ttislcf() || r.ttisCclosure() ? r.value : null
        }
        ,
        e.exports.lua_todataview = function(e, t) {
            var r = ge(e, t);
            return new DataView(r.buffer,r.byteOffset,r.byteLength)
        }
        ,
        e.exports.lua_tointeger = function(e, t) {
            var r = xe(e, t);
            return !1 === r ? 0 : r
        }
        ,
        e.exports.lua_tointegerx = xe,
        e.exports.lua_tojsstring = function(e, t) {
            var r = re(e, t);
            if (!r.ttisstring()) {
                if (!z.cvt2str(r))
                    return null;
                V.luaO_tostring(e, r)
            }
            return r.jsstring()
        }
        ,
        e.exports.lua_tolstring = ge,
        e.exports.lua_tonumber = function(e, t) {
            var r = be(e, t);
            return !1 === r ? 0 : r
        }
        ,
        e.exports.lua_tonumberx = be,
        e.exports.lua_topointer = function(e, t) {
            var r = re(e, t);
            switch (r.ttype()) {
            case U:
            case g:
            case h:
            case A:
            case N:
            case R:
            case T:
                return r.value;
            default:
                return null
            }
        }
        ,
        e.exports.lua_toproxy = function(e, t) {
            var r, n, a, u, s = re(e, t);
            return r = e.l_G,
            n = s.type,
            a = s.value,
            u = function(e) {
                I(e, e instanceof G.lua_State && r === e.l_G, "must be from same global state"),
                e.stack[e.top] = new Z(n,a),
                W(e)
            }
            ,
            ke.set(u, r),
            u
        }
        ,
        e.exports.lua_tostring = Te,
        e.exports.lua_tothread = function(e, t) {
            var r = re(e, t);
            return r.ttisthread() ? r.value : null
        }
        ,
        e.exports.lua_touserdata = function(e, t) {
            var r = re(e, t);
            switch (r.ttnov()) {
            case R:
                return r.value.data;
            case T:
                return r.value;
            default:
                return null
            }
        }
        ,
        e.exports.lua_type = Ee,
        e.exports.lua_typename = function(e, t) {
            return I(e, k <= t && t < v, "invalid tag"),
            j.ttypename(t)
        }
        ,
        e.exports.lua_upvalueid = function(e, t, r) {
            var n = re(e, t);
            switch (n.ttype()) {
            case g:
                var a = Se(e, t, r);
                return a.f.upvals[a.i];
            case h:
                var u = n.value;
                return I(e, r | 0 === r && 1 <= r && r <= u.nupvalues, "invalid upvalue index"),
                u.upvalue[r - 1];
            default:
                return I(e, !1, "closure expected"),
                null
            }
        }
        ,
        e.exports.lua_upvaluejoin = function(e, t, r, n, a) {
            var u = Se(e, t, r)
              , s = Se(e, n, a)
              , o = s.f.upvals[s.i];
            u.f.upvals[u.i] = o
        }
        ,
        e.exports.lua_version = function(e) {
            return null === e ? f : e.l_G.version
        }
        ,
        e.exports.lua_xmove = function(e, t, r) {
            if (e !== t) {
                Q(e, r),
                I(e, e.l_G === t.l_G, "moving among independent states"),
                I(e, t.ci.top - t.top >= r, "stack overflow"),
                e.top -= r;
                for (var n = 0; n < r; n++)
                    t.stack[t.top] = new V.TValue,
                    V.setobj2s(t, t.top, e.stack[e.top + n]),
                    delete e.stack[e.top + n],
                    t.top++
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var a = r(0)
          , u = a.constant_types.LUA_TLNGSTR
          , s = a.thread_status.LUA_ERRSYNTAX
          , o = a.to_luastring
          , l = r(2)
          , i = l.LUA_MINBUFFER
          , c = l.MAX_INT
          , _ = l.lua_assert
          , f = r(11)
          , p = r(7)
          , v = r(31)
          , d = v.lisdigit
          , h = v.lislalnum
          , L = v.lislalpha
          , A = v.lisspace
          , g = v.lisxdigit
          , T = r(5)
          , x = r(8)
          , b = x.luaS_bless
          , k = x.luaS_hash
          , O = x.luaS_hashlongstr
          , E = x.luaS_new
          , m = r(9)
          , U = r(17)
          , N = U.EOZ
          , R = U.luaZ_buffer
          , S = U.luaZ_buffremove
          , y = U.luaZ_resetbuffer
          , w = U.luaZ_resizebuffer
          , I = o("_ENV", !0)
          , M = {
            TK_AND: 257,
            TK_BREAK: 258,
            TK_DO: 259,
            TK_ELSE: 260,
            TK_ELSEIF: 261,
            TK_END: 262,
            TK_FALSE: 263,
            TK_FOR: 264,
            TK_FUNCTION: 265,
            TK_GOTO: 266,
            TK_IF: 267,
            TK_IN: 268,
            TK_LOCAL: 269,
            TK_NIL: 270,
            TK_NOT: 271,
            TK_OR: 272,
            TK_REPEAT: 273,
            TK_RETURN: 274,
            TK_THEN: 275,
            TK_TRUE: 276,
            TK_UNTIL: 277,
            TK_WHILE: 278,
            TK_IDIV: 279,
            TK_CONCAT: 280,
            TK_DOTS: 281,
            TK_EQ: 282,
            TK_GE: 283,
            TK_LE: 284,
            TK_NE: 285,
            TK_SHL: 286,
            TK_SHR: 287,
            TK_DBCOLON: 288,
            TK_EOS: 289,
            TK_FLT: 290,
            TK_INT: 291,
            TK_NAME: 292,
            TK_STRING: 293
        }
          , P = ["and", "break", "do", "else", "elseif", "end", "false", "for", "function", "goto", "if", "in", "local", "nil", "not", "or", "repeat", "return", "then", "true", "until", "while", "//", "..", "...", "==", ">=", "<=", "~=", "<<", ">>", "::", "<eof>", "<number>", "<integer>", "<name>", "<string>"].map(function(e, t) {
            return o(e)
        })
          , C = function e() {
            n(this, e),
            this.r = NaN,
            this.i = NaN,
            this.ts = null
        }
          , D = function e() {
            n(this, e),
            this.token = NaN,
            this.seminfo = new C
        }
          , V = function(e, t) {
            var r = e.buff;
            if (r.n + 1 > r.buffer.length) {
                r.buffer.length >= c / 2 && J(e, o("lexical element too long", !0), 0);
                var n = 2 * r.buffer.length;
                w(e.L, r, n)
            }
            r.buffer[r.n++] = t < 0 ? 255 + t + 1 : t
        }
          , G = function(e, t) {
            if (t < 257)
                return T.luaO_pushfstring(e.L, o("'%c'", !0), t);
            var r = P[t - 257];
            return t < 289 ? T.luaO_pushfstring(e.L, o("'%s'", !0), r) : r
        }
          , B = function(e) {
            return 10 === e.current || 13 === e.current
        }
          , K = function(e) {
            e.current = e.z.zgetc()
        }
          , F = function(e) {
            V(e, e.current),
            K(e)
        }
          , H = function(e, t) {
            var r = e.L
              , n = E(r, t)
              , a = m.luaH_set(r, e.h, new T.TValue(u,n));
            if (a.ttisnil())
                a.setbvalue(!0);
            else {
                var s = e.h.strong.get(O(n));
                _(s.value == a),
                n = s.key.tsvalue()
            }
            return n
        }
          , j = function(e) {
            var t = e.current;
            _(B(e)),
            K(e),
            B(e) && e.current !== t && K(e),
            ++e.linenumber >= c && J(e, o("chunk has too many lines", !0), 0)
        }
          , X = function(e, t) {
            return e.current === t && (K(e),
            !0)
        }
          , z = function(e, t) {
            return (e.current === t[0].charCodeAt(0) || e.current === t[1].charCodeAt(0)) && (F(e),
            !0)
        }
          , Y = function(e, t) {
            var r = "Ee"
              , n = e.current;
            for (_(d(e.current)),
            F(e),
            48 === n && z(e, "xX") && (r = "Pp"); ; )
                if (z(e, r) && z(e, "-+"),
                g(e.current))
                    F(e);
                else {
                    if (46 !== e.current)
                        break;
                    F(e)
                }
            var a = new T.TValue;
            return 0 === T.luaO_str2num(R(e.buff), a) && J(e, o("malformed number", !0), 290),
            a.ttisinteger() ? (t.i = a.value,
            291) : (_(a.ttisfloat()),
            t.r = a.value,
            290)
        }
          , J = function(e, t, r) {
            t = f.luaG_addinfo(e.L, t, e.source, e.linenumber),
            r && T.luaO_pushfstring(e.L, o("%s near %s"), t, function(e, t) {
                switch (t) {
                case 292:
                case 293:
                case 290:
                case 291:
                    return T.luaO_pushfstring(e.L, o("'%s'", !0), R(e.buff));
                default:
                    return G(e, t)
                }
            }(e, r)),
            p.luaD_throw(e.L, s)
        }
          , Z = function(e) {
            var t = 0
              , r = e.current;
            for (_(91 === r || 93 === r),
            F(e); 61 === e.current; )
                F(e),
                t++;
            return e.current === r ? t : -t - 1
        }
          , q = function(e, t, r) {
            var n = e.linenumber;
            F(e),
            B(e) && j(e);
            for (var a = !1; !a; )
                switch (e.current) {
                case N:
                    J(e, o("unfinished long " + (t ? "string" : "comment") + " (starting at line " + n + ")"), 289);
                    break;
                case 93:
                    Z(e) === r && (F(e),
                    a = !0);
                    break;
                case 10:
                case 13:
                    V(e, 10),
                    j(e),
                    t || y(e.buff);
                    break;
                default:
                    t ? F(e) : K(e)
                }
            t && (t.ts = H(e, e.buff.buffer.subarray(2 + r, e.buff.n - (2 + r))))
        }
          , W = function(e, t, r) {
            t || (e.current !== N && F(e),
            J(e, r, 293))
        }
          , Q = function(e) {
            return F(e),
            W(e, g(e.current), o("hexadecimal digit expected", !0)),
            T.luaO_hexavalue(e.current)
        }
          , $ = function(e) {
            var t = Q(e);
            return t = (t << 4) + Q(e),
            S(e.buff, 2),
            t
        }
          , ee = function(e) {
            for (var t = new Uint8Array(T.UTF8BUFFSZ), r = T.luaO_utf8esc(t, function(e) {
                var t = 4;
                F(e),
                W(e, 123 === e.current, o("missing '{'", !0));
                var r = Q(e);
                for (F(e); g(e.current); )
                    t++,
                    r = (r << 4) + T.luaO_hexavalue(e.current),
                    W(e, r <= 1114111, o("UTF-8 value too large", !0)),
                    F(e);
                return W(e, 125 === e.current, o("missing '}'", !0)),
                K(e),
                S(e.buff, t),
                r
            }(e)); r > 0; r--)
                V(e, t[T.UTF8BUFFSZ - r])
        }
          , te = function(e) {
            var t = 0
              , r = void 0;
            for (r = 0; r < 3 && d(e.current); r++)
                t = 10 * t + e.current - 48,
                F(e);
            return W(e, t <= 255, o("decimal escape too large", !0)),
            S(e.buff, r),
            t
        }
          , re = function(e, t, r) {
            for (F(e); e.current !== t; )
                switch (e.current) {
                case N:
                    J(e, o("unfinished string", !0), 289);
                    break;
                case 10:
                case 13:
                    J(e, o("unfinished string", !0), 293);
                    break;
                case 92:
                    F(e);
                    var n = void 0
                      , a = void 0;
                    switch (e.current) {
                    case 97:
                        a = 7,
                        n = "read_save";
                        break;
                    case 98:
                        a = 8,
                        n = "read_save";
                        break;
                    case 102:
                        a = 12,
                        n = "read_save";
                        break;
                    case 110:
                        a = 10,
                        n = "read_save";
                        break;
                    case 114:
                        a = 13,
                        n = "read_save";
                        break;
                    case 116:
                        a = 9,
                        n = "read_save";
                        break;
                    case 118:
                        a = 11,
                        n = "read_save";
                        break;
                    case 120:
                        a = $(e),
                        n = "read_save";
                        break;
                    case 117:
                        ee(e),
                        n = "no_save";
                        break;
                    case 10:
                    case 13:
                        j(e),
                        a = 10,
                        n = "only_save";
                        break;
                    case 92:
                    case 34:
                    case 39:
                        a = e.current,
                        n = "read_save";
                        break;
                    case N:
                        n = "no_save";
                        break;
                    case 122:
                        for (S(e.buff, 1),
                        K(e); A(e.current); )
                            B(e) ? j(e) : K(e);
                        n = "no_save";
                        break;
                    default:
                        W(e, d(e.current), o("invalid escape sequence", !0)),
                        a = te(e),
                        n = "only_save"
                    }
                    "read_save" === n && K(e),
                    "read_save" !== n && "only_save" !== n || (S(e.buff, 1),
                    V(e, a));
                    break;
                default:
                    F(e)
                }
            F(e),
            r.ts = H(e, e.buff.buffer.subarray(1, e.buff.n - 1))
        }
          , ne = Object.create(null);
        P.forEach(function(e, t) {
            return ne[k(e)] = t
        });
        var ae = function(e, t) {
            for (y(e.buff); ; )
                switch (_("number" == typeof e.current),
                e.current) {
                case 10:
                case 13:
                    j(e);
                    break;
                case 32:
                case 12:
                case 9:
                case 11:
                    K(e);
                    break;
                case 45:
                    if (K(e),
                    45 !== e.current)
                        return 45;
                    if (K(e),
                    91 === e.current) {
                        var r = Z(e);
                        if (y(e.buff),
                        r >= 0) {
                            q(e, null, r),
                            y(e.buff);
                            break
                        }
                    }
                    for (; !B(e) && e.current !== N; )
                        K(e);
                    break;
                case 91:
                    var n = Z(e);
                    return n >= 0 ? (q(e, t, n),
                    293) : (-1 !== n && J(e, o("invalid long string delimiter", !0), 293),
                    91);
                case 61:
                    return K(e),
                    X(e, 61) ? 282 : 61;
                case 60:
                    return K(e),
                    X(e, 61) ? 284 : X(e, 60) ? 286 : 60;
                case 62:
                    return K(e),
                    X(e, 61) ? 283 : X(e, 62) ? 287 : 62;
                case 47:
                    return K(e),
                    X(e, 47) ? 279 : 47;
                case 126:
                    return K(e),
                    X(e, 61) ? 285 : 126;
                case 58:
                    return K(e),
                    X(e, 58) ? 288 : 58;
                case 34:
                case 39:
                    return re(e, e.current, t),
                    293;
                case 46:
                    return F(e),
                    X(e, 46) ? X(e, 46) ? 281 : 280 : d(e.current) ? Y(e, t) : 46;
                case 48:
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                    return Y(e, t);
                case N:
                    return 289;
                default:
                    if (L(e.current)) {
                        do {
                            F(e)
                        } while (h(e.current));var a = H(e, R(e.buff));
                        t.ts = a;
                        var u = ne[O(a)];
                        return void 0 !== u && u <= 22 ? u + 257 : 292
                    }
                    var s = e.current;
                    return K(e),
                    s
                }
        };
        e.exports.FIRST_RESERVED = 257,
        e.exports.LUA_ENV = I,
        e.exports.LexState = function e() {
            n(this, e),
            this.current = NaN,
            this.linenumber = NaN,
            this.lastline = NaN,
            this.t = new D,
            this.lookahead = new D,
            this.fs = null,
            this.L = null,
            this.z = null,
            this.buff = null,
            this.h = null,
            this.dyd = null,
            this.source = null,
            this.envn = null
        }
        ,
        e.exports.RESERVED = M,
        e.exports.isreserved = function(e) {
            var t = ne[O(e)];
            return void 0 !== t && t <= 22
        }
        ,
        e.exports.luaX_lookahead = function(e) {
            return _(289 === e.lookahead.token),
            e.lookahead.token = ae(e, e.lookahead.seminfo),
            e.lookahead.token
        }
        ,
        e.exports.luaX_newstring = H,
        e.exports.luaX_next = function(e) {
            e.lastline = e.linenumber,
            289 !== e.lookahead.token ? (e.t.token = e.lookahead.token,
            e.t.seminfo.i = e.lookahead.seminfo.i,
            e.t.seminfo.r = e.lookahead.seminfo.r,
            e.t.seminfo.ts = e.lookahead.seminfo.ts,
            e.lookahead.token = 289) : e.t.token = ae(e, e.t.seminfo)
        }
        ,
        e.exports.luaX_setinput = function(e, t, r, n, a) {
            t.t = {
                token: 0,
                seminfo: new C
            },
            t.L = e,
            t.current = a,
            t.lookahead = {
                token: 289,
                seminfo: new C
            },
            t.z = r,
            t.fs = null,
            t.linenumber = 1,
            t.lastline = 1,
            t.source = n,
            t.envn = b(e, I),
            w(e, t.buff, i)
        }
        ,
        e.exports.luaX_syntaxerror = function(e, t) {
            J(e, t, e.t.token)
        }
        ,
        e.exports.luaX_token2str = G,
        e.exports.luaX_tokens = P
    }
    , function(e, t, r) {
        "use strict";
        /**
@license MIT

Copyright © 2017-2018 Benoit Giannangeli
Copyright © 2017-2018 Daurnimator
Copyright © 1994–2017 Lua.org, PUC-Rio.
*/
        var n = r(6);
        e.exports.FENGARI_AUTHORS = n.FENGARI_AUTHORS,
        e.exports.FENGARI_COPYRIGHT = n.FENGARI_COPYRIGHT,
        e.exports.FENGARI_RELEASE = n.FENGARI_RELEASE,
        e.exports.FENGARI_VERSION = n.FENGARI_VERSION,
        e.exports.FENGARI_VERSION_MAJOR = n.FENGARI_VERSION_MAJOR,
        e.exports.FENGARI_VERSION_MINOR = n.FENGARI_VERSION_MINOR,
        e.exports.FENGARI_VERSION_NUM = n.FENGARI_VERSION_NUM,
        e.exports.FENGARI_VERSION_RELEASE = n.FENGARI_VERSION_RELEASE,
        e.exports.luastring_eq = n.luastring_eq,
        e.exports.luastring_indexOf = n.luastring_indexOf,
        e.exports.luastring_of = n.luastring_of,
        e.exports.to_jsstring = n.to_jsstring,
        e.exports.to_luastring = n.to_luastring,
        e.exports.to_uristring = n.to_uristring;
        var a = r(3)
          , u = r(1)
          , s = r(4)
          , o = r(12);
        e.exports.luaconf = a,
        e.exports.lua = u,
        e.exports.lauxlib = s,
        e.exports.lualib = o
    }
    , function(e, t, r) {
        "use strict";
        var n = r(1)
          , a = n.lua_pushinteger
          , u = n.lua_pushliteral
          , s = n.lua_setfield
          , o = r(4).luaL_newlib
          , l = r(6)
          , i = l.FENGARI_AUTHORS
          , c = l.FENGARI_COPYRIGHT
          , _ = l.FENGARI_RELEASE
          , f = l.FENGARI_VERSION
          , p = l.FENGARI_VERSION_MAJOR
          , v = l.FENGARI_VERSION_MINOR
          , d = l.FENGARI_VERSION_NUM
          , h = l.FENGARI_VERSION_RELEASE
          , L = l.to_luastring;
        e.exports.luaopen_fengari = function(e) {
            return o(e, {}),
            u(e, i),
            s(e, -2, L("AUTHORS")),
            u(e, c),
            s(e, -2, L("COPYRIGHT")),
            u(e, _),
            s(e, -2, L("RELEASE")),
            u(e, f),
            s(e, -2, L("VERSION")),
            u(e, p),
            s(e, -2, L("VERSION_MAJOR")),
            u(e, v),
            s(e, -2, L("VERSION_MINOR")),
            a(e, d),
            s(e, -2, L("VERSION_NUM")),
            u(e, h),
            s(e, -2, L("VERSION_RELEASE")),
            1
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , a = r(3)
          , u = a.LUA_DIRSEP
          , s = a.LUA_EXEC_DIR
          , o = a.LUA_JSPATH_DEFAULT
          , l = a.LUA_PATH_DEFAULT
          , i = a.LUA_PATH_MARK
          , c = a.LUA_PATH_SEP
          , _ = r(1)
          , f = _.LUA_OK
          , p = _.LUA_REGISTRYINDEX
          , v = _.LUA_TNIL
          , d = _.LUA_TTABLE
          , h = _.lua_callk
          , L = _.lua_createtable
          , A = _.lua_getfield
          , g = _.lua_insert
          , T = _.lua_isfunction
          , x = _.lua_isnil
          , b = _.lua_isstring
          , k = _.lua_newtable
          , O = _.lua_pop
          , E = _.lua_pushboolean
          , m = _.lua_pushcclosure
          , U = _.lua_pushcfunction
          , N = _.lua_pushfstring
          , R = _.lua_pushglobaltable
          , S = _.lua_pushlightuserdata
          , y = _.lua_pushliteral
          , w = _.lua_pushlstring
          , I = _.lua_pushnil
          , M = _.lua_pushstring
          , P = _.lua_pushvalue
          , C = _.lua_rawgeti
          , D = _.lua_rawgetp
          , V = _.lua_rawseti
          , G = _.lua_rawsetp
          , B = _.lua_remove
          , K = _.lua_setfield
          , F = _.lua_setmetatable
          , H = _.lua_settop
          , j = _.lua_toboolean
          , X = _.lua_tostring
          , z = _.lua_touserdata
          , Y = _.lua_upvalueindex
          , J = r(4)
          , Z = J.LUA_LOADED_TABLE
          , q = J.LUA_PRELOAD_TABLE
          , W = J.luaL_Buffer
          , Q = J.luaL_addvalue
          , $ = J.luaL_buffinit
          , ee = J.luaL_checkstring
          , te = J.luaL_error
          , re = J.luaL_getsubtable
          , ne = J.luaL_gsub
          , ae = J.luaL_len
          , ue = J.luaL_loadfile
          , se = J.luaL_newlib
          , oe = J.luaL_optstring
          , le = J.luaL_pushresult
          , ie = J.luaL_setfuncs
          , ce = r(12)
          , _e = r(6)
          , fe = _e.luastring_indexOf
          , pe = _e.to_jsstring
          , ve = _e.to_luastring
          , de = _e.to_uristring
          , he = r(20)
          , Le = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : (0,
        eval)("this")
          , Ae = ve("__JSLIBS__")
          , ge = u
          , Te = u
          , xe = ve("luaopen_")
          , be = ve("_")
          , ke = ve("")
          , Oe = void 0;
        Oe = function(e, t, r) {
            t = de(t);
            var a = new XMLHttpRequest;
            if (a.open("GET", t, !1),
            a.send(),
            a.status < 200 || a.status >= 300)
                return M(e, ve(a.status + ": " + a.statusText)),
                null;
            var u = a.response;
            /\/\/[#@] sourceURL=/.test(u) || (u += " //# sourceURL=" + t);
            var s = void 0;
            try {
                s = Function("fengari", u)
            } catch (t) {
                return M(e, ve(t.name + ": " + t.message)),
                null
            }
            var o = s(he);
            return "function" == typeof o || "object" === (void 0 === o ? "undefined" : n(o)) && null !== o ? o : void 0 === o ? Le : (M(e, ve("library returned unexpected type (" + (void 0 === o ? "undefined" : n(o)) + ")")),
            null)
        }
        ;
        var Ee = void 0;
        Ee = function(e) {
            e = de(e);
            var t = new XMLHttpRequest;
            return t.open("GET", e, !1),
            t.send(),
            t.status >= 200 && t.status <= 299
        }
        ;
        var me = function(e, t, r) {
            var n = Re(e, t);
            if (null === n) {
                if (null === (n = Oe(e, t, r[0] === "*".charCodeAt(0))))
                    return 1;
                Se(e, t, n)
            }
            if (r[0] === "*".charCodeAt(0))
                return E(e, 1),
                0;
            var a = function(e, t, r) {
                var n = t[pe(r)];
                return n && "function" == typeof n ? n : (N(e, ve("undefined symbol: %s"), r),
                null)
            }(e, n, r);
            return null === a ? 2 : (U(e, a),
            0)
        }
          , Ue = Le
          , Ne = function(e, t, r, n) {
            var a = "" + r + ce.LUA_VERSUFFIX;
            M(e, ve(a));
            var u = Ue[a];
            void 0 === u && (u = Ue[r]),
            void 0 === u || function(e) {
                A(e, p, ve("LUA_NOENV"));
                var t = j(e, -1);
                return O(e, 1),
                t
            }(e) ? M(e, n) : (u = ne(e, ve(u), ve(c + c, !0), ve(c + pe(ke) + c, !0)),
            ne(e, u, ke, n),
            B(e, -2)),
            K(e, -3, t),
            O(e, 1)
        }
          , Re = function(e, t) {
            D(e, p, Ae),
            A(e, -1, t);
            var r = z(e, -1);
            return O(e, 2),
            r
        }
          , Se = function(e, t, r) {
            D(e, p, Ae),
            S(e, r),
            P(e, -1),
            K(e, -3, t),
            V(e, -2, ae(e, -2) + 1),
            O(e, 1)
        }
          , ye = function(e, t) {
            for (; t[0] === c.charCodeAt(0); )
                t = t.subarray(1);
            if (0 === t.length)
                return null;
            var r = fe(t, c.charCodeAt(0));
            return r < 0 && (r = t.length),
            w(e, t, r),
            t.subarray(r)
        }
          , we = function(e, t, r, n, a) {
            var u = new W;
            for ($(e, u),
            0 !== n[0] && (t = ne(e, t, n, a)); null !== (r = ye(e, r)); ) {
                var s = ne(e, X(e, -1), ve(i, !0), t);
                if (B(e, -2),
                Ee(s))
                    return s;
                N(e, ve("\n\tno file '%s'"), s),
                B(e, -2),
                Q(u)
            }
            return le(u),
            null
        }
          , Ie = function(e, t, r, n) {
            A(e, Y(1), r);
            var a = X(e, -1);
            return null === a && te(e, ve("'package.%s' must be a string"), r),
            we(e, t, a, ve("."), n)
        }
          , Me = function(e, t, r) {
            return t ? (M(e, r),
            2) : te(e, ve("error loading module '%s' from file '%s':\n\t%s"), X(e, 1), r, X(e, -1))
        }
          , Pe = function(e) {
            var t = ee(e, 1)
              , r = Ie(e, t, ve("path", !0), ve(Te, !0));
            return null === r ? 1 : Me(e, ue(e, r) === f, r)
        }
          , Ce = function(e, t, r) {
            var n = void 0;
            r = ne(e, r, ve("."), be);
            var a = fe(r, "-".charCodeAt(0));
            if (a >= 0) {
                n = w(e, r, a),
                n = N(e, ve("%s%s"), xe, n);
                var u = me(e, t, n);
                if (2 !== u)
                    return u;
                r = a + 1
            }
            return n = N(e, ve("%s%s"), xe, r),
            me(e, t, n)
        }
          , De = function(e) {
            var t = ee(e, 1)
              , r = Ie(e, t, ve("jspath", !0), ve(ge, !0));
            return null === r ? 1 : Me(e, 0 === Ce(e, r, t), r)
        }
          , Ve = function(e) {
            var t, r = ee(e, 1), n = fe(r, ".".charCodeAt(0));
            if (n < 0)
                return 0;
            w(e, r, n);
            var a = Ie(e, X(e, -1), ve("jspath", !0), ve(ge, !0));
            return null === a ? 1 : 0 !== (t = Ce(e, a, r)) ? 2 != t ? Me(e, 0, a) : (M(e, ve("\n\tno module '%s' in file '%s'"), r, a),
            1) : (M(e, a),
            2)
        }
          , Ge = function(e) {
            var t = ee(e, 1);
            return A(e, p, q),
            A(e, -1, t) === v && N(e, ve("\n\tno field package.preload['%s']"), t),
            1
        }
          , Be = function e(t, r, n) {
            for (; r === f ? (C(t, 3, n.i) === v && (O(t, 1),
            le(n.msg),
            te(t, ve("module '%s' not found:%s"), n.name, X(t, -1))),
            M(t, n.name),
            h(t, 1, 2, n, e)) : r = f,
            !T(t, -2); n.i++)
                b(t, -2) ? (O(t, 1),
                Q(n.msg)) : O(t, 2);
            return n.k(t, f, n.ctx)
        }
          , Ke = function(e, t, r) {
            return M(e, r),
            g(e, -2),
            h(e, 2, 1, r, Fe),
            Fe(e, f, r)
        }
          , Fe = function(e, t, r) {
            var n = r;
            return x(e, -1) || K(e, 2, n),
            A(e, 2, n) == v && (E(e, 1),
            P(e, -1),
            K(e, 2, n)),
            1
        }
          , He = {
            loadlib: function(e) {
                var t = ee(e, 1)
                  , r = ee(e, 2)
                  , n = me(e, t, r);
                return 0 === n ? 1 : (I(e),
                g(e, -2),
                y(e, 1 === n ? "open" : "init"),
                3)
            },
            searchpath: function(e) {
                return null !== we(e, ee(e, 1), ee(e, 2), oe(e, 3, "."), oe(e, 4, u)) ? 1 : (I(e),
                g(e, -2),
                2)
            }
        }
          , je = {
            require: function(e) {
                var t = ee(e, 1);
                return H(e, 1),
                A(e, p, Z),
                A(e, 2, t),
                j(e, -1) ? 1 : (O(e, 1),
                function(e, t, r, n) {
                    var a = new W;
                    return $(e, a),
                    A(e, Y(1), ve("searchers", !0)) !== d && te(e, ve("'package.searchers' must be a table")),
                    Be(e, f, {
                        name: t,
                        i: 1,
                        msg: a,
                        ctx: r,
                        k: n
                    })
                }(e, t, t, Ke))
            }
        };
        e.exports.luaopen_package = function(e) {
            return function(e) {
                k(e),
                L(e, 0, 1),
                F(e, -2),
                G(e, p, Ae)
            }(e),
            se(e, He),
            function(e) {
                var t = [Ge, Pe, De, Ve, null];
                L(e);
                for (var r = 0; t[r]; r++)
                    P(e, -2),
                    m(e, t[r], 1),
                    V(e, -2, r + 1);
                K(e, -2, ve("searchers", !0))
            }(e),
            Ne(e, ve("path", !0), "LUA_PATH", l),
            Ne(e, ve("jspath", !0), "LUA_JSPATH", o),
            y(e, u + "\n" + c + "\n" + i + "\n" + s + "\n-\n"),
            K(e, -2, ve("config", !0)),
            re(e, p, Z),
            K(e, -2, ve("loaded", !0)),
            re(e, p, q),
            K(e, -2, ve("preload", !0)),
            R(e),
            P(e, -2),
            ie(e, je, 1),
            O(e, 1),
            1
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(1)
          , a = n.LUA_MASKCALL
          , u = n.LUA_MASKCOUNT
          , s = n.LUA_MASKLINE
          , o = n.LUA_MASKRET
          , l = n.LUA_REGISTRYINDEX
          , i = n.LUA_TFUNCTION
          , c = n.LUA_TNIL
          , _ = n.LUA_TTABLE
          , f = n.LUA_TUSERDATA
          , p = n.lua_Debug
          , v = n.lua_call
          , d = n.lua_checkstack
          , h = n.lua_gethook
          , L = n.lua_gethookcount
          , A = n.lua_gethookmask
          , g = n.lua_getinfo
          , T = n.lua_getlocal
          , x = n.lua_getmetatable
          , b = n.lua_getstack
          , k = n.lua_getupvalue
          , O = n.lua_getuservalue
          , E = n.lua_insert
          , m = n.lua_iscfunction
          , U = n.lua_isfunction
          , N = n.lua_isnoneornil
          , R = n.lua_isthread
          , S = n.lua_newtable
          , y = n.lua_pcall
          , w = n.lua_pop
          , I = n.lua_pushboolean
          , M = n.lua_pushfstring
          , P = n.lua_pushinteger
          , C = n.lua_pushlightuserdata
          , D = n.lua_pushliteral
          , V = n.lua_pushnil
          , G = n.lua_pushstring
          , B = n.lua_pushvalue
          , K = n.lua_rawgetp
          , F = n.lua_rawsetp
          , H = n.lua_rotate
          , j = n.lua_setfield
          , X = n.lua_sethook
          , z = n.lua_setlocal
          , Y = n.lua_setmetatable
          , J = n.lua_settop
          , Z = n.lua_setupvalue
          , q = n.lua_setuservalue
          , W = n.lua_tojsstring
          , Q = n.lua_toproxy
          , $ = n.lua_tostring
          , ee = n.lua_tothread
          , te = n.lua_touserdata
          , re = n.lua_type
          , ne = n.lua_upvalueid
          , ae = n.lua_upvaluejoin
          , ue = n.lua_xmove
          , se = r(4)
          , oe = se.luaL_argcheck
          , le = se.luaL_argerror
          , ie = se.luaL_checkany
          , ce = se.luaL_checkinteger
          , _e = se.luaL_checkstring
          , fe = se.luaL_checktype
          , pe = se.luaL_error
          , ve = se.luaL_loadbuffer
          , de = se.luaL_newlib
          , he = se.luaL_optinteger
          , Le = se.luaL_optstring
          , Ae = se.luaL_traceback
          , ge = se.lua_writestringerror
          , Te = r(12)
          , xe = r(6)
          , be = xe.luastring_indexOf
          , ke = xe.to_luastring
          , Oe = function(e, t, r) {
            e === t || d(t, r) || pe(e, ke("stack overflow", !0))
        }
          , Ee = function(e) {
            return R(e, 1) ? {
                arg: 1,
                thread: ee(e, 1)
            } : {
                arg: 0,
                thread: e
            }
        }
          , me = function(e, t, r) {
            G(e, r),
            j(e, -2, t)
        }
          , Ue = function(e, t, r) {
            P(e, r),
            j(e, -2, t)
        }
          , Ne = function(e, t, r) {
            I(e, r),
            j(e, -2, t)
        }
          , Re = function(e, t, r) {
            e == t ? H(e, -2, 1) : ue(t, e, 1),
            j(e, -2, r)
        }
          , Se = function(e, t) {
            var r = ce(e, 2);
            fe(e, 1, i);
            var n = t ? k(e, 1, r) : Z(e, 1, r);
            return null === n ? 0 : (G(e, n),
            E(e, -(t + 1)),
            t + 1)
        }
          , ye = function(e, t, r) {
            var n = ce(e, r);
            return fe(e, t, i),
            oe(e, null !== k(e, t, n), r, "invalid upvalue index"),
            n
        }
          , we = ke("__hooks__", !0)
          , Ie = ["call", "return", "line", "count", "tail call"].map(function(e) {
            return ke(e)
        })
          , Me = function(e, t) {
            K(e, l, we);
            var r = te(e, -1).get(e);
            r && (r(e),
            G(e, Ie[t.event]),
            t.currentline >= 0 ? P(e, t.currentline) : V(e),
            Te.lua_assert(g(e, ke("lS"), t)),
            v(e, 2, 0))
        }
          , Pe = {
            gethook: function(e) {
                var t = Ee(e).thread
                  , r = new Uint8Array(5)
                  , n = A(t)
                  , u = h(t);
                null === u ? V(e) : u !== Me ? D(e, "external hook") : (K(e, l, we),
                te(e, -1).get(t)(e));
                return G(e, function(e, t) {
                    var r = 0;
                    return e & a && (t[r++] = 99),
                    e & o && (t[r++] = 114),
                    e & s && (t[r++] = 108),
                    t.subarray(0, r)
                }(n, r)),
                P(e, L(t)),
                3
            },
            getinfo: function(e) {
                var t = new p
                  , r = Ee(e)
                  , n = r.arg
                  , a = r.thread
                  , u = Le(e, n + 2, "flnStu");
                if (Oe(e, a, 3),
                U(e, n + 1))
                    u = M(e, ke(">%s"), u),
                    B(e, n + 1),
                    ue(e, a, 1);
                else if (!b(a, ce(e, n + 1), t))
                    return V(e),
                    1;
                return g(a, u, t) || le(e, n + 2, "invalid option"),
                S(e),
                be(u, 83) > -1 && (me(e, ke("source", !0), t.source),
                me(e, ke("short_src", !0), t.short_src),
                Ue(e, ke("linedefined", !0), t.linedefined),
                Ue(e, ke("lastlinedefined", !0), t.lastlinedefined),
                me(e, ke("what", !0), t.what)),
                be(u, 108) > -1 && Ue(e, ke("currentline", !0), t.currentline),
                be(u, 117) > -1 && (Ue(e, ke("nups", !0), t.nups),
                Ue(e, ke("nparams", !0), t.nparams),
                Ne(e, ke("isvararg", !0), t.isvararg)),
                be(u, 110) > -1 && (me(e, ke("name", !0), t.name),
                me(e, ke("namewhat", !0), t.namewhat)),
                be(u, 116) > -1 && Ne(e, ke("istailcall", !0), t.istailcall),
                be(u, 76) > -1 && Re(e, a, ke("activelines", !0)),
                be(u, 102) > -1 && Re(e, a, ke("func", !0)),
                1
            },
            getlocal: function(e) {
                var t = Ee(e)
                  , r = t.thread
                  , n = t.arg
                  , a = new p
                  , u = ce(e, n + 2);
                if (U(e, n + 1))
                    return B(e, n + 1),
                    G(e, T(e, null, u)),
                    1;
                var s = ce(e, n + 1);
                if (!b(r, s, a))
                    return le(e, n + 1, "level out of range");
                Oe(e, r, 1);
                var o = T(r, a, u);
                return o ? (ue(r, e, 1),
                G(e, o),
                H(e, -2, 1),
                2) : (V(e),
                1)
            },
            getmetatable: function(e) {
                return ie(e, 1),
                x(e, 1) || V(e),
                1
            },
            getregistry: function(e) {
                return B(e, l),
                1
            },
            getupvalue: function(e) {
                return Se(e, 1)
            },
            getuservalue: function(e) {
                return re(e, 1) !== f ? V(e) : O(e, 1),
                1
            },
            sethook: function(e) {
                var t = void 0
                  , r = void 0
                  , n = void 0
                  , _ = Ee(e)
                  , f = _.thread
                  , p = _.arg;
                if (N(e, p + 1))
                    J(e, p + 1),
                    n = null,
                    t = 0,
                    r = 0;
                else {
                    var v = _e(e, p + 2);
                    fe(e, p + 1, i),
                    r = he(e, p + 3, 0),
                    n = Me,
                    t = function(e, t) {
                        var r = 0;
                        return be(e, 99) > -1 && (r |= a),
                        be(e, 114) > -1 && (r |= o),
                        be(e, 108) > -1 && (r |= s),
                        t > 0 && (r |= u),
                        r
                    }(v, r)
                }
                var d = void 0;
                K(e, l, we) === c ? (d = new WeakMap,
                C(e, d),
                F(e, l, we)) : d = te(e, -1);
                var h = Q(e, p + 1);
                return d.set(f, h),
                X(f, n, t, r),
                0
            },
            setlocal: function(e) {
                var t = Ee(e)
                  , r = t.thread
                  , n = t.arg
                  , a = new p
                  , u = ce(e, n + 1)
                  , s = ce(e, n + 2);
                if (!b(r, u, a))
                    return le(e, n + 1, "level out of range");
                ie(e, n + 3),
                J(e, n + 3),
                Oe(e, r, 1),
                ue(e, r, 1);
                var o = z(r, a, s);
                return null === o && w(r, 1),
                G(e, o),
                1
            },
            setmetatable: function(e) {
                var t = re(e, 2);
                return oe(e, t == c || t == _, 2, "nil or table expected"),
                J(e, 2),
                Y(e, 1),
                1
            },
            setupvalue: function(e) {
                return ie(e, 3),
                Se(e, 0)
            },
            setuservalue: function(e) {
                return fe(e, 1, f),
                ie(e, 2),
                J(e, 2),
                q(e, 1),
                1
            },
            traceback: function(e) {
                var t = Ee(e)
                  , r = t.thread
                  , n = t.arg
                  , a = $(e, n + 1);
                if (null !== a || N(e, n + 1)) {
                    var u = he(e, n + 2, e === r ? 1 : 0);
                    Ae(e, r, a, u)
                } else
                    B(e, n + 1);
                return 1
            },
            upvalueid: function(e) {
                var t = ye(e, 1, 2);
                return C(e, ne(e, 1, t)),
                1
            },
            upvaluejoin: function(e) {
                var t = ye(e, 1, 2)
                  , r = ye(e, 3, 4);
                return oe(e, !m(e, 1), 1, "Lua function expected"),
                oe(e, !m(e, 3), 3, "Lua function expected"),
                ae(e, 1, t, 3, r),
                0
            }
        }
          , Ce = void 0;
        "undefined" != typeof window && (Ce = function() {
            var e = prompt("lua_debug>", "");
            return null !== e ? e : ""
        }
        ),
        Ce && (Pe.debug = function(e) {
            for (; ; ) {
                var t = Ce();
                if ("cont" === t)
                    return 0;
                if (0 !== t.length) {
                    var r = ke(t);
                    (ve(e, r, r.length, ke("=(debug command)", !0)) || y(e, 0, 0, 0)) && ge(W(e, -1), "\n"),
                    J(e, 0)
                }
            }
        }
        );
        e.exports.luaopen_debug = function(e) {
            return de(e, Pe),
            1
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(1)
          , a = n.LUA_OPLT
          , u = n.LUA_TNUMBER
          , s = n.lua_compare
          , o = n.lua_gettop
          , l = n.lua_isinteger
          , i = n.lua_isnoneornil
          , c = n.lua_pushboolean
          , _ = n.lua_pushinteger
          , f = n.lua_pushliteral
          , p = n.lua_pushnil
          , v = n.lua_pushnumber
          , d = n.lua_pushvalue
          , h = n.lua_setfield
          , L = n.lua_settop
          , A = n.lua_tointeger
          , g = n.lua_tointegerx
          , T = n.lua_type
          , x = r(4)
          , b = x.luaL_argcheck
          , k = x.luaL_argerror
          , O = x.luaL_checkany
          , E = x.luaL_checkinteger
          , m = x.luaL_checknumber
          , U = x.luaL_error
          , N = x.luaL_newlib
          , R = x.luaL_optnumber
          , S = r(3)
          , y = S.LUA_MAXINTEGER
          , w = S.LUA_MININTEGER
          , I = S.lua_numbertointeger
          , M = r(6).to_luastring
          , P = void 0
          , C = function() {
            return P = 1103515245 * P + 12345 & 2147483647
        }
          , D = function(e, t) {
            var r = I(t);
            !1 !== r ? _(e, r) : v(e, t)
        }
          , V = {
            abs: function(e) {
                if (l(e, 1)) {
                    var t = A(e, 1);
                    t < 0 && (t = 0 | -t),
                    _(e, t)
                } else
                    v(e, Math.abs(m(e, 1)));
                return 1
            },
            acos: function(e) {
                return v(e, Math.acos(m(e, 1))),
                1
            },
            asin: function(e) {
                return v(e, Math.asin(m(e, 1))),
                1
            },
            atan: function(e) {
                var t = m(e, 1)
                  , r = R(e, 2, 1);
                return v(e, Math.atan2(t, r)),
                1
            },
            ceil: function(e) {
                return l(e, 1) ? L(e, 1) : D(e, Math.ceil(m(e, 1))),
                1
            },
            cos: function(e) {
                return v(e, Math.cos(m(e, 1))),
                1
            },
            deg: function(e) {
                return v(e, m(e, 1) * (180 / Math.PI)),
                1
            },
            exp: function(e) {
                return v(e, Math.exp(m(e, 1))),
                1
            },
            floor: function(e) {
                return l(e, 1) ? L(e, 1) : D(e, Math.floor(m(e, 1))),
                1
            },
            fmod: function(e) {
                if (l(e, 1) && l(e, 2)) {
                    var t = A(e, 2);
                    0 === t ? k(e, 2, "zero") : _(e, A(e, 1) % t | 0)
                } else {
                    var r = m(e, 1)
                      , n = m(e, 2);
                    v(e, r % n)
                }
                return 1
            },
            log: function(e) {
                var t = m(e, 1)
                  , r = void 0;
                if (i(e, 2))
                    r = Math.log(t);
                else {
                    var n = m(e, 2);
                    r = 2 === n ? Math.log2(t) : 10 === n ? Math.log10(t) : Math.log(t) / Math.log(n)
                }
                return v(e, r),
                1
            },
            max: function(e) {
                var t = o(e)
                  , r = 1;
                b(e, t >= 1, 1, "value expected");
                for (var n = 2; n <= t; n++)
                    s(e, r, n, a) && (r = n);
                return d(e, r),
                1
            },
            min: function(e) {
                var t = o(e)
                  , r = 1;
                b(e, t >= 1, 1, "value expected");
                for (var n = 2; n <= t; n++)
                    s(e, n, r, a) && (r = n);
                return d(e, r),
                1
            },
            modf: function(e) {
                if (l(e, 1))
                    L(e, 1),
                    v(e, 0);
                else {
                    var t = m(e, 1)
                      , r = t < 0 ? Math.ceil(t) : Math.floor(t);
                    D(e, r),
                    v(e, t === r ? 0 : t - r)
                }
                return 2
            },
            rad: function(e) {
                return v(e, m(e, 1) * (Math.PI / 180)),
                1
            },
            random: function(e) {
                var t = void 0
                  , r = void 0
                  , n = void 0 === P ? Math.random() : C() / 2147483648;
                switch (o(e)) {
                case 0:
                    return v(e, n),
                    1;
                case 1:
                    t = 1,
                    r = E(e, 1);
                    break;
                case 2:
                    t = E(e, 1),
                    r = E(e, 2);
                    break;
                default:
                    return U(e, "wrong number of arguments")
                }
                return b(e, t <= r, 1, "interval is empty"),
                b(e, t >= 0 || r <= y + t, 1, "interval too large"),
                n *= r - t + 1,
                _(e, Math.floor(n) + t),
                1
            },
            randomseed: function(e) {
                var t;
                return t = m(e, 1),
                0 == (P = 0 | t) && (P = 1),
                C(),
                0
            },
            sin: function(e) {
                return v(e, Math.sin(m(e, 1))),
                1
            },
            sqrt: function(e) {
                return v(e, Math.sqrt(m(e, 1))),
                1
            },
            tan: function(e) {
                return v(e, Math.tan(m(e, 1))),
                1
            },
            tointeger: function(e) {
                var t = g(e, 1);
                return !1 !== t ? _(e, t) : (O(e, 1),
                p(e)),
                1
            },
            type: function(e) {
                return T(e, 1) === u ? l(e, 1) ? f(e, "integer") : f(e, "float") : (O(e, 1),
                p(e)),
                1
            },
            ult: function(e) {
                var t = E(e, 1)
                  , r = E(e, 2);
                return c(e, t >= 0 ? r < 0 || t < r : r < 0 && t < r),
                1
            }
        };
        e.exports.luaopen_math = function(e) {
            return N(e, V),
            v(e, Math.PI),
            h(e, -2, M("pi", !0)),
            v(e, 1 / 0),
            h(e, -2, M("huge", !0)),
            _(e, y),
            h(e, -2, M("maxinteger", !0)),
            _(e, w),
            h(e, -2, M("mininteger", !0)),
            1
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(1)
          , a = n.lua_gettop
          , u = n.lua_pushcfunction
          , s = n.lua_pushfstring
          , o = n.lua_pushinteger
          , l = n.lua_pushnil
          , i = n.lua_pushstring
          , c = n.lua_pushvalue
          , _ = n.lua_setfield
          , f = n.lua_tointeger
          , p = r(4)
          , v = p.luaL_Buffer
          , d = p.luaL_addvalue
          , h = p.luaL_argcheck
          , L = p.luaL_buffinit
          , A = p.luaL_checkinteger
          , g = p.luaL_checkstack
          , T = p.luaL_checkstring
          , x = p.luaL_error
          , b = p.luaL_newlib
          , k = p.luaL_optinteger
          , O = p.luaL_pushresult
          , E = r(6)
          , m = E.luastring_of
          , U = E.to_luastring
          , N = function(e) {
            return 128 === (192 & e)
        }
          , R = function(e, t) {
            return e >= 0 ? e : 0 - e > t ? 0 : t + e + 1
        }
          , S = [255, 127, 2047, 65535]
          , y = function(e, t) {
            var r = e[t]
              , n = 0;
            if (r < 128)
                n = r;
            else {
                for (var a = 0; 64 & r; ) {
                    var u = e[t + ++a];
                    if (128 != (192 & u))
                        return null;
                    n = n << 6 | 63 & u,
                    r <<= 1
                }
                if (n |= (127 & r) << 5 * a,
                a > 3 || n > 1114111 || n <= S[a])
                    return null;
                t += a
            }
            return {
                code: n,
                pos: t + 1
            }
        }
          , w = U("%U")
          , I = function(e, t) {
            var r = A(e, t);
            h(e, 0 <= r && r <= 1114111, t, "value out of range"),
            s(e, w, r)
        }
          , M = function(e) {
            var t = T(e, 1)
              , r = t.length
              , n = f(e, 2) - 1;
            if (n < 0)
                n = 0;
            else if (n < r)
                for (n++; N(t[n]); )
                    n++;
            if (n >= r)
                return 0;
            var a = y(t, n);
            return null === a || N(t[a.pos]) ? x(e, U("invalid UTF-8 code")) : (o(e, n + 1),
            o(e, a.code),
            2)
        }
          , P = {
            char: function(e) {
                var t = a(e);
                if (1 === t)
                    I(e, 1);
                else {
                    var r = new v;
                    L(e, r);
                    for (var n = 1; n <= t; n++)
                        I(e, n),
                        d(r);
                    O(r)
                }
                return 1
            },
            codepoint: function(e) {
                var t = T(e, 1)
                  , r = R(k(e, 2, 1), t.length)
                  , n = R(k(e, 3, r), t.length);
                if (h(e, r >= 1, 2, "out of range"),
                h(e, n <= t.length, 3, "out of range"),
                r > n)
                    return 0;
                if (n - r >= Number.MAX_SAFE_INTEGER)
                    return x(e, "string slice too long");
                var a = n - r + 1;
                for (g(e, a, "string slice too long"),
                a = 0,
                r -= 1; r < n; ) {
                    var u = y(t, r);
                    if (null === u)
                        return x(e, "invalid UTF-8 code");
                    o(e, u.code),
                    r = u.pos,
                    a++
                }
                return a
            },
            codes: function(e) {
                return T(e, 1),
                u(e, M),
                c(e, 1),
                o(e, 0),
                3
            },
            len: function(e) {
                var t = 0
                  , r = T(e, 1)
                  , n = r.length
                  , a = R(k(e, 2, 1), n)
                  , u = R(k(e, 3, -1), n);
                for (h(e, 1 <= a && --a <= n, 2, "initial position out of string"),
                h(e, --u < n, 3, "final position out of string"); a <= u; ) {
                    var s = y(r, a);
                    if (null === s)
                        return l(e),
                        o(e, a + 1),
                        2;
                    a = s.pos,
                    t++
                }
                return o(e, t),
                1
            },
            offset: function(e) {
                var t = T(e, 1)
                  , r = A(e, 2)
                  , n = r >= 0 ? 1 : t.length + 1;
                if (n = R(k(e, 3, n), t.length),
                h(e, 1 <= n && --n <= t.length, 3, "position out of range"),
                0 === r)
                    for (; n > 0 && N(t[n]); )
                        n--;
                else if (N(t[n]) && x(e, "initial position is a continuation byte"),
                r < 0)
                    for (; r < 0 && n > 0; ) {
                        do {
                            n--
                        } while (n > 0 && N(t[n]));r++
                    }
                else
                    for (r--; r > 0 && n < t.length; ) {
                        do {
                            n++
                        } while (N(t[n]));r--
                    }
                return 0 === r ? o(e, n + 1) : l(e),
                1
            }
        }
          , C = m(91, 0, 45, 127, 194, 45, 244, 93, 91, 128, 45, 191, 93, 42);
        e.exports.luaopen_utf8 = function(e) {
            return b(e, P),
            i(e, C),
            _(e, -2, U("charpattern", !0)),
            1
        }
    }
    , function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var a = r(35).sprintf
          , u = r(3)
          , s = u.LUA_INTEGER_FMT
          , o = u.LUA_INTEGER_FRMLEN
          , l = u.LUA_MININTEGER
          , i = u.LUA_NUMBER_FMT
          , c = u.LUA_NUMBER_FRMLEN
          , _ = u.frexp
          , f = u.lua_getlocaledecpoint
          , p = r(1)
          , v = p.LUA_TBOOLEAN
          , d = p.LUA_TFUNCTION
          , h = p.LUA_TNIL
          , L = p.LUA_TNUMBER
          , A = p.LUA_TSTRING
          , g = p.LUA_TTABLE
          , T = p.lua_call
          , x = p.lua_createtable
          , b = p.lua_dump
          , k = p.lua_gettable
          , O = p.lua_gettop
          , E = p.lua_isinteger
          , m = p.lua_isstring
          , U = p.lua_pop
          , N = p.lua_pushcclosure
          , R = p.lua_pushinteger
          , S = p.lua_pushlightuserdata
          , y = p.lua_pushliteral
          , w = p.lua_pushlstring
          , I = p.lua_pushnil
          , M = p.lua_pushnumber
          , P = p.lua_pushstring
          , C = p.lua_pushvalue
          , D = p.lua_remove
          , V = p.lua_setfield
          , G = p.lua_setmetatable
          , B = p.lua_settop
          , K = p.lua_toboolean
          , F = p.lua_tointeger
          , H = p.lua_tonumber
          , j = p.lua_tostring
          , X = p.lua_touserdata
          , z = p.lua_type
          , Y = p.lua_upvalueindex
          , J = r(4)
          , Z = J.luaL_Buffer
          , q = J.luaL_addchar
          , W = J.luaL_addlstring
          , Q = J.luaL_addsize
          , $ = J.luaL_addstring
          , ee = J.luaL_addvalue
          , te = J.luaL_argcheck
          , re = J.luaL_argerror
          , ne = J.luaL_buffinit
          , ae = J.luaL_buffinitsize
          , ue = J.luaL_checkinteger
          , se = J.luaL_checknumber
          , oe = J.luaL_checkstack
          , le = J.luaL_checkstring
          , ie = J.luaL_checktype
          , ce = J.luaL_error
          , _e = J.luaL_newlib
          , fe = J.luaL_optinteger
          , pe = J.luaL_optstring
          , ve = J.luaL_prepbuffsize
          , de = J.luaL_pushresult
          , he = J.luaL_pushresultsize
          , Le = J.luaL_tolstring
          , Ae = J.luaL_typename
          , ge = r(12)
          , Te = r(6)
          , xe = Te.luastring_eq
          , be = Te.luastring_indexOf
          , ke = Te.to_jsstring
          , Oe = Te.to_luastring
          , Ee = "%".charCodeAt(0)
          , me = function(e) {
            var t = be(e, 0);
            return t > -1 ? t : e.length
        }
          , Ue = function(e, t) {
            return e >= 0 ? e : 0 - e > t ? 0 : t + e + 1
        }
          , Ne = function(e, t, r, n) {
            return W(n, t, r),
            0
        }
          , Re = c.length + 1
          , Se = function(e, t, r) {
            var n = function(e) {
                if (Object.is(e, 1 / 0))
                    return Oe("inf");
                if (Object.is(e, -1 / 0))
                    return Oe("-inf");
                if (Number.isNaN(e))
                    return Oe("nan");
                if (0 === e) {
                    var t = a(i + "x0p+0", e);
                    return Object.is(e, -0) && (t = "-" + t),
                    Oe(t)
                }
                var r = ""
                  , n = _(e)
                  , u = n[0]
                  , s = n[1];
                return u < 0 && (r += "-",
                u = -u),
                r += "0x",
                r += (2 * u).toString(16),
                r += a("p%+d", s -= 1),
                Oe(r)
            }(r);
            if (65 === t[Re])
                for (var u = 0; u < n.length; u++) {
                    var s = n[u];
                    s >= 97 && (n[u] = 223 & s)
                }
            else
                97 !== t[Re] && ce(e, Oe("modifiers for format '%%a'/'%%A' not implemented"));
            return n
        }
          , ye = Oe("-+ #0")
          , we = function(e) {
            return 97 <= e && e <= 122 || 65 <= e && e <= 90
        }
          , Ie = function(e) {
            return 48 <= e && e <= 57
        }
          , Me = function(e) {
            return 0 <= e && e <= 31 || 127 === e
        }
          , Pe = function(e) {
            return 33 <= e && e <= 126
        }
          , Ce = function(e) {
            return 97 <= e && e <= 122
        }
          , De = function(e) {
            return 65 <= e && e <= 90
        }
          , Ve = function(e) {
            return 97 <= e && e <= 122 || 65 <= e && e <= 90 || 48 <= e && e <= 57
        }
          , Ge = function(e) {
            return Pe(e) && !Ve(e)
        }
          , Be = function(e) {
            return 32 === e || e >= 9 && e <= 13
        }
          , Ke = function(e) {
            return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102
        }
          , Fe = function(e, t, r) {
            switch (z(e, r)) {
            case A:
                var n = j(e, r);
                !function(e, t, r) {
                    q(e, 34);
                    for (var n = 0; r--; ) {
                        if (34 === t[n] || 92 === t[n] || 10 === t[n])
                            q(e, 92),
                            q(e, t[n]);
                        else if (Me(t[n])) {
                            var a = "" + t[n];
                            Ie(t[n + 1]) && (a = "0".repeat(3 - a.length) + a),
                            $(e, Oe("\\" + a))
                        } else
                            q(e, t[n]);
                        n++
                    }
                    q(e, 34)
                }(t, n, n.length);
                break;
            case L:
                var u = void 0;
                if (E(e, r)) {
                    var i = F(e, r);
                    u = Oe(a(i === l ? "0x%" + o + "x" : s, i))
                } else {
                    var c = H(e, r);
                    (function(e) {
                        if (be(e, 46) < 0) {
                            var t = f()
                              , r = be(e, t);
                            r && (e[r] = 46)
                        }
                    }
                    )(u = Se(e, Oe("%" + o + "a"), c))
                }
                $(t, u);
                break;
            case h:
            case v:
                Le(e, r),
                ee(t);
                break;
            default:
                re(e, r, Oe("value has no literal form"))
            }
        }
          , He = function(e, t, r, n) {
            for (var a = r; 0 !== t[a] && be(ye, t[a]) >= 0; )
                a++;
            a - r >= ye.length && ce(e, Oe("invalid format (repeated flags)")),
            Ie(t[a]) && a++,
            Ie(t[a]) && a++,
            46 === t[a] && (Ie(t[++a]) && a++,
            Ie(t[a]) && a++),
            Ie(t[a]) && ce(e, Oe("invalid format (width or precision too long)")),
            n[0] = 37;
            for (var u = 0; u < a - r + 1; u++)
                n[u + 1] = t[r + u];
            return a
        }
          , je = function(e, t) {
            for (var r = e.length, n = t.length, a = e[r - 1], u = 0; u < n; u++)
                e[u + r - 1] = t[u];
            e[r + n - 1] = a
        }
          , Xe = function e(t) {
            n(this, e),
            this.L = t,
            this.islittle = !0,
            this.maxalign = 1
        }
          , ze = Ie
          , Ye = function(e, t) {
            if (e.off >= e.s.length || !ze(e.s[e.off]))
                return t;
            var r = 0;
            do {
                r = 10 * r + (e.s[e.off++] - 48)
            } while (e.off < e.s.length && ze(e.s[e.off]) && r <= 214748363.8);return r
        }
          , Je = function(e, t, r) {
            var n = Ye(t, r);
            return (n > 16 || n <= 0) && ce(e.L, Oe("integral size (%d) out of limits [1,%d]"), n, 16),
            n
        }
          , Ze = function(e, t) {
            var r = {
                opt: t.s[t.off++],
                size: 0
            };
            switch (r.opt) {
            case 98:
                return r.size = 1,
                r.opt = 0,
                r;
            case 66:
                return r.size = 1,
                r.opt = 1,
                r;
            case 104:
                return r.size = 2,
                r.opt = 0,
                r;
            case 72:
                return r.size = 2,
                r.opt = 1,
                r;
            case 108:
                return r.size = 4,
                r.opt = 0,
                r;
            case 76:
                return r.size = 4,
                r.opt = 1,
                r;
            case 106:
                return r.size = 4,
                r.opt = 0,
                r;
            case 74:
            case 84:
                return r.size = 4,
                r.opt = 1,
                r;
            case 102:
                return r.size = 4,
                r.opt = 2,
                r;
            case 100:
            case 110:
                return r.size = 8,
                r.opt = 2,
                r;
            case 105:
                return r.size = Je(e, t, 4),
                r.opt = 0,
                r;
            case 73:
                return r.size = Je(e, t, 4),
                r.opt = 1,
                r;
            case 115:
                return r.size = Je(e, t, 4),
                r.opt = 4,
                r;
            case 99:
                return r.size = Ye(t, -1),
                -1 === r.size && ce(e.L, Oe("missing size for format option 'c'")),
                r.opt = 3,
                r;
            case 122:
                return r.opt = 5,
                r;
            case 120:
                return r.size = 1,
                r.opt = 6,
                r;
            case 88:
                return r.opt = 7,
                r;
            case 32:
                break;
            case 60:
                e.islittle = !0;
                break;
            case 62:
                e.islittle = !1;
                break;
            case 61:
                e.islittle = !0;
                break;
            case 33:
                e.maxalign = Je(e, t, 8);
                break;
            default:
                ce(e.L, Oe("invalid format option '%c'"), r.opt)
            }
            return r.opt = 8,
            r
        }
          , qe = function(e, t, r) {
            var n = {
                opt: NaN,
                size: NaN,
                ntoalign: NaN
            }
              , a = Ze(e, r);
            n.size = a.size,
            n.opt = a.opt;
            var u = n.size;
            if (7 === n.opt)
                if (r.off >= r.s.length || 0 === r.s[r.off])
                    re(e.L, 1, Oe("invalid next option for option 'X'"));
                else {
                    var s = Ze(e, r);
                    u = s.size,
                    3 !== (s = s.opt) && 0 !== u || re(e.L, 1, Oe("invalid next option for option 'X'"))
                }
            return u <= 1 || 3 === n.opt ? n.ntoalign = 0 : (u > e.maxalign && (u = e.maxalign),
            0 != (u & u - 1) && re(e.L, 1, Oe("format asks for alignment not power of 2")),
            n.ntoalign = u - (t & u - 1) & u - 1),
            n
        }
          , We = function(e, t, r, n, a) {
            var u = ve(e, n);
            u[r ? 0 : n - 1] = 255 & t;
            for (var s = 1; s < n; s++)
                t >>= 8,
                u[r ? s : n - 1 - s] = 255 & t;
            if (a && n > 4)
                for (var o = 4; o < n; o++)
                    u[r ? o : n - 1 - o] = 255;
            Q(e, n)
        }
          , Qe = function(e, t, r, n, a) {
            for (var u = 0, s = n <= 4 ? n : 4, o = s - 1; o >= 0; o--)
                u <<= 8,
                u |= t[r ? o : n - 1 - o];
            if (n < 4) {
                if (a) {
                    var l = 1 << 8 * n - 1;
                    u = (u ^ l) - l
                }
            } else if (n > 4)
                for (var i = !a || u >= 0 ? 0 : 255, c = s; c < n; c++)
                    t[r ? c : n - 1 - c] !== i && ce(e, Oe("%d-byte integer does not fit into Lua Integer"), n);
            return u
        }
          , $e = function(e, t, r, n) {
            ge.lua_assert(t.length >= n);
            for (var a = new DataView(new ArrayBuffer(n)), u = 0; u < n; u++)
                a.setUint8(u, t[u], r);
            return 4 == n ? a.getFloat32(0, r) : a.getFloat64(0, r)
        }
          , et = Oe("^$*+?.([%-")
          , tt = function e(t) {
            n(this, e),
            this.src = null,
            this.src_init = null,
            this.src_end = null,
            this.p = null,
            this.p_end = null,
            this.L = t,
            this.matchdepth = NaN,
            this.level = NaN,
            this.capture = []
        }
          , rt = function(e, t) {
            switch (e.p[t++]) {
            case Ee:
                return t === e.p_end && ce(e.L, Oe("malformed pattern (ends with '%%')")),
                t + 1;
            case 91:
                94 === e.p[t] && t++;
                do {
                    t === e.p_end && ce(e.L, Oe("malformed pattern (missing ']')")),
                    e.p[t++] === Ee && t < e.p_end && t++
                } while (93 !== e.p[t]);return t + 1;
            default:
                return t
            }
        }
          , nt = function(e, t) {
            switch (t) {
            case 97:
                return we(e);
            case 65:
                return !we(e);
            case 99:
                return Me(e);
            case 67:
                return !Me(e);
            case 100:
                return Ie(e);
            case 68:
                return !Ie(e);
            case 103:
                return Pe(e);
            case 71:
                return !Pe(e);
            case 108:
                return Ce(e);
            case 76:
                return !Ce(e);
            case 112:
                return Ge(e);
            case 80:
                return !Ge(e);
            case 115:
                return Be(e);
            case 83:
                return !Be(e);
            case 117:
                return De(e);
            case 85:
                return !De(e);
            case 119:
                return Ve(e);
            case 87:
                return !Ve(e);
            case 120:
                return Ke(e);
            case 88:
                return !Ke(e);
            case 122:
                return 0 === e;
            case 90:
                return 0 !== e;
            default:
                return t === e
            }
        }
          , at = function(e, t, r, n) {
            var a = !0;
            for (94 === e.p[r + 1] && (a = !1,
            r++); ++r < n; )
                if (e.p[r] === Ee) {
                    if (r++,
                    nt(t, e.p[r]))
                        return a
                } else if (45 === e.p[r + 1] && r + 2 < n) {
                    if (r += 2,
                    e.p[r - 2] <= t && t <= e.p[r])
                        return a
                } else if (e.p[r] === t)
                    return a;
            return !a
        }
          , ut = function(e, t, r, n) {
            if (t >= e.src_end)
                return !1;
            var a = e.src[t];
            switch (e.p[r]) {
            case 46:
                return !0;
            case Ee:
                return nt(a, e.p[r + 1]);
            case 91:
                return at(e, a, r, n - 1);
            default:
                return e.p[r] === a
            }
        }
          , st = function(e, t, r) {
            if (r >= e.p_end - 1 && ce(e.L, Oe("malformed pattern (missing arguments to '%%b'")),
            e.src[t] !== e.p[r])
                return null;
            for (var n = e.p[r], a = e.p[r + 1], u = 1; ++t < e.src_end; )
                if (e.src[t] === a) {
                    if (0 == --u)
                        return t + 1
                } else
                    e.src[t] === n && u++;
            return null
        }
          , ot = function(e, t, r, n) {
            for (var a = 0; ut(e, t + a, r, n); )
                a++;
            for (; a >= 0; ) {
                var u = ft(e, t + a, n + 1);
                if (u)
                    return u;
                a--
            }
            return null
        }
          , lt = function(e, t, r, n) {
            for (; ; ) {
                var a = ft(e, t, n + 1);
                if (null !== a)
                    return a;
                if (!ut(e, t, r, n))
                    return null;
                t++
            }
        }
          , it = function(e, t, r, n) {
            var a = e.level;
            a >= 32 && ce(e.L, Oe("too many captures")),
            e.capture[a] = e.capture[a] ? e.capture[a] : {},
            e.capture[a].init = t,
            e.capture[a].len = n,
            e.level = a + 1;
            var u;
            return null === (u = ft(e, t, r)) && e.level--,
            u
        }
          , ct = function(e, t, r) {
            var n = function(e) {
                var t = e.level;
                for (t--; t >= 0; t--)
                    if (-1 === e.capture[t].len)
                        return t;
                return ce(e.L, Oe("invalid pattern capture"))
            }(e);
            e.capture[n].len = t - e.capture[n].init;
            var a;
            return null === (a = ft(e, t, r)) && (e.capture[n].len = -1),
            a
        }
          , _t = function(e, t, r) {
            r = function(e, t) {
                return (t -= 49) < 0 || t >= e.level || -1 === e.capture[t].len ? ce(e.L, Oe("invalid capture index %%%d"), t + 1) : t
            }(e, r);
            var n = e.capture[r].len;
            return e.src_end - t >= n && function(e, t, r, n, a) {
                return xe(e.subarray(t, t + a), r.subarray(n, n + a))
            }(e.src, e.capture[r].init, e.src, t, n) ? t + n : null
        }
          , ft = function e(t, r, n) {
            var a = !1
              , u = !0;
            for (0 == t.matchdepth-- && ce(t.L, Oe("pattern too complex")); u || a; )
                if (u = !1,
                n !== t.p_end)
                    switch (a ? void 0 : t.p[n]) {
                    case 40:
                        r = 41 === t.p[n + 1] ? it(t, r, n + 2, -2) : it(t, r, n + 1, -1);
                        break;
                    case 41:
                        r = ct(t, r, n + 1);
                        break;
                    case 36:
                        if (n + 1 !== t.p_end) {
                            a = !0;
                            break
                        }
                        r = t.src.length - r == 0 ? r : null;
                        break;
                    case Ee:
                        switch (t.p[n + 1]) {
                        case 98:
                            null !== (r = st(t, r, n + 2)) && (n += 4,
                            u = !0);
                            break;
                        case 102:
                            n += 2,
                            91 !== t.p[n] && ce(t.L, Oe("missing '[' after '%%f' in pattern"));
                            var s = rt(t, n)
                              , o = r === t.src_init ? 0 : t.src[r - 1];
                            if (!at(t, o, n, s - 1) && at(t, r === t.src_end ? 0 : t.src[r], n, s - 1)) {
                                n = s,
                                u = !0;
                                break
                            }
                            r = null;
                            break;
                        case 48:
                        case 49:
                        case 50:
                        case 51:
                        case 52:
                        case 53:
                        case 54:
                        case 55:
                        case 56:
                        case 57:
                            null !== (r = _t(t, r, t.p[n + 1])) && (n += 2,
                            u = !0);
                            break;
                        default:
                            a = !0
                        }
                        break;
                    default:
                        a = !1;
                        var l = rt(t, n);
                        if (ut(t, r, n, l))
                            switch (t.p[l]) {
                            case 63:
                                var i;
                                null !== (i = e(t, r + 1, l + 1)) ? r = i : (n = l + 1,
                                u = !0);
                                break;
                            case 43:
                                r++;
                            case 42:
                                r = ot(t, r, n, l);
                                break;
                            case 45:
                                r = lt(t, r, n, l);
                                break;
                            default:
                                r++,
                                n = l,
                                u = !0
                            }
                        else {
                            if (42 === t.p[l] || 63 === t.p[l] || 45 === t.p[l]) {
                                n = l + 1,
                                u = !0;
                                break
                            }
                            r = null
                        }
                    }
            return t.matchdepth++,
            r
        }
          , pt = function(e, t, r, n) {
            if (t >= e.level)
                0 === t ? w(e.L, e.src.subarray(r, n), n - r) : ce(e.L, Oe("invalid capture index %%%d"), t + 1);
            else {
                var a = e.capture[t].len;
                -1 === a && ce(e.L, Oe("unfinished capture")),
                -2 === a ? R(e.L, e.capture[t].init - e.src_init + 1) : w(e.L, e.src.subarray(e.capture[t].init), a)
            }
        }
          , vt = function(e, t, r) {
            var n = 0 === e.level && e.src.subarray(t) ? 1 : e.level;
            oe(e.L, n, "too many captures");
            for (var a = 0; a < n; a++)
                pt(e, a, t, r);
            return n
        }
          , dt = function(e, t, r, n, a, u) {
            e.L = t,
            e.matchdepth = 200,
            e.src = r,
            e.src_init = 0,
            e.src_end = n,
            e.p = a,
            e.p_end = u
        }
          , ht = function(e) {
            e.level = 0,
            ge.lua_assert(200 === e.matchdepth)
        }
          , Lt = function(e, t) {
            var r = le(e, 1)
              , n = le(e, 2)
              , a = r.length
              , u = n.length
              , s = Ue(fe(e, 3, 1), a);
            if (s < 1)
                s = 1;
            else if (s > a + 1)
                return I(e),
                1;
            if (t && (K(e, 4) || function(e, t) {
                for (var r = 0; r < t; r++)
                    if (-1 !== be(et, e[r]))
                        return !1;
                return !0
            }(n, u))) {
                var o = function(e, t, r) {
                    var n = r >>> 0
                      , a = t.length;
                    if (0 === a)
                        return n;
                    for (; -1 !== (n = e.indexOf(t[0], n)); n++)
                        if (xe(e.subarray(n, n + a), t))
                            return n;
                    return -1
                }(r.subarray(s - 1), n, 0);
                if (o > -1)
                    return R(e, s + o),
                    R(e, s + o + u - 1),
                    2
            } else {
                var l = new tt(e)
                  , i = s - 1
                  , c = 94 === n[0];
                c && (n = n.subarray(1),
                u--),
                dt(l, e, r, a, n, u);
                do {
                    var _;
                    if (ht(l),
                    null !== (_ = ft(l, i, 0)))
                        return t ? (R(e, i + 1),
                        R(e, _),
                        vt(l, null, 0) + 2) : vt(l, i, _)
                } while (i++ < l.src_end && !c)
            }
            return I(e),
            1
        }
          , At = function(e) {
            var t = X(e, Y(3));
            t.ms.L = e;
            for (var r = t.src; r <= t.ms.src_end; r++) {
                ht(t.ms);
                var n;
                if (null !== (n = ft(t.ms, r, t.p)) && n !== t.lastmatch)
                    return t.src = t.lastmatch = n,
                    vt(t.ms, r, n)
            }
            return 0
        }
          , gt = function(e, t, r, n, a) {
            var u = e.L;
            switch (a) {
            case d:
                C(u, 3);
                var s = vt(e, r, n);
                T(u, s, 1);
                break;
            case g:
                pt(e, 0, r, n),
                k(u, 3);
                break;
            default:
                return void function(e, t, r, n) {
                    for (var a = e.L, u = j(a, 3), s = u.length, o = 0; o < s; o++)
                        u[o] !== Ee ? q(t, u[o]) : Ie(u[++o]) ? 48 === u[o] ? W(t, e.src.subarray(r, n), n - r) : (pt(e, u[o] - 49, r, n),
                        Le(a, -1),
                        D(a, -2),
                        ee(t)) : (u[o] !== Ee && ce(a, Oe("invalid use of '%c' in replacement string"), Ee),
                        q(t, u[o]))
                }(e, t, r, n)
            }
            K(u, -1) ? m(u, -1) || ce(u, Oe("invalid replacement value (a %s)"), Ae(u, -1)) : (U(u, 1),
            w(u, e.src.subarray(r, n), n - r)),
            ee(t)
        }
          , Tt = {
            byte: function(e) {
                var t = le(e, 1)
                  , r = t.length
                  , n = Ue(fe(e, 2, 1), r)
                  , a = Ue(fe(e, 3, n), r);
                if (n < 1 && (n = 1),
                a > r && (a = r),
                n > a)
                    return 0;
                if (a - n >= Number.MAX_SAFE_INTEGER)
                    return ce(e, "string slice too long");
                var u = a - n + 1;
                oe(e, u, "string slice too long");
                for (var s = 0; s < u; s++)
                    R(e, t[n + s - 1]);
                return u
            },
            char: function(e) {
                for (var t = O(e), r = new Z, n = ae(e, r, t), a = 1; a <= t; a++) {
                    var u = ue(e, a);
                    te(e, u >= 0 && u <= 255, "value out of range"),
                    n[a - 1] = u
                }
                return he(r, t),
                1
            },
            dump: function(e) {
                var t = new Z
                  , r = K(e, 2);
                return ie(e, 1, d),
                B(e, 1),
                ne(e, t),
                0 !== b(e, Ne, t, r) ? ce(e, Oe("unable to dump given function")) : (de(t),
                1)
            },
            find: function(e) {
                return Lt(e, 1)
            },
            format: function(e) {
                var t = O(e)
                  , r = 1
                  , n = le(e, r)
                  , u = 0
                  , s = new Z;
                for (ne(e, s); u < n.length; )
                    if (n[u] !== Ee)
                        q(s, n[u++]);
                    else if (n[++u] === Ee)
                        q(s, n[u++]);
                    else {
                        var l = [];
                        switch (++r > t && re(e, r, Oe("no value")),
                        u = He(e, n, u, l),
                        String.fromCharCode(n[u++])) {
                        case "c":
                            q(s, ue(e, r));
                            break;
                        case "d":
                        case "i":
                        case "o":
                        case "u":
                        case "x":
                        case "X":
                            var i = ue(e, r);
                            je(l, Oe(o, !0)),
                            $(s, Oe(a(String.fromCharCode.apply(String, l), i)));
                            break;
                        case "a":
                        case "A":
                            je(l, Oe(o, !0)),
                            $(s, Se(e, l, se(e, r)));
                            break;
                        case "e":
                        case "E":
                        case "f":
                        case "g":
                        case "G":
                            var c = se(e, r);
                            je(l, Oe(o, !0)),
                            $(s, Oe(a(String.fromCharCode.apply(String, l), c)));
                            break;
                        case "q":
                            Fe(e, s, r);
                            break;
                        case "s":
                            var _ = Le(e, r);
                            l.length <= 2 || 0 === l[2] ? ee(s) : (te(e, _.length === me(_), r, "string contains zeros"),
                            be(l, 46) < 0 && _.length >= 100 ? ee(s) : ($(s, Oe(a(String.fromCharCode.apply(String, l), ke(_)))),
                            U(e, 1)));
                            break;
                        default:
                            return ce(e, Oe("invalid option '%%%c' to 'format'"), n[u - 1])
                        }
                    }
                return de(s),
                1
            },
            gmatch: function(e) {
                var t = le(e, 1)
                  , r = le(e, 2)
                  , a = t.length
                  , u = r.length;
                B(e, 2);
                var s = new function e() {
                    n(this, e),
                    this.src = NaN,
                    this.p = NaN,
                    this.lastmatch = NaN,
                    this.ms = new tt
                }
                ;
                return S(e, s),
                dt(s.ms, e, t, a, r, u),
                s.src = 0,
                s.p = 0,
                s.lastmatch = null,
                N(e, At, 3),
                1
            },
            gsub: function(e) {
                var t = le(e, 1)
                  , r = t.length
                  , n = le(e, 2)
                  , a = n.length
                  , u = null
                  , s = z(e, 3)
                  , o = fe(e, 4, r + 1)
                  , l = 94 === n[0]
                  , i = 0
                  , c = new tt(e)
                  , _ = new Z;
                for (te(e, s === L || s === A || s === d || s === g, 3, "string/function/table expected"),
                ne(e, _),
                l && (n = n.subarray(1),
                a--),
                dt(c, e, t, r, n, a),
                t = 0,
                n = 0; i < o; ) {
                    var f;
                    if (ht(c),
                    null !== (f = ft(c, t, n)) && f !== u)
                        i++,
                        gt(c, _, t, f, s),
                        t = u = f;
                    else {
                        if (!(t < c.src_end))
                            break;
                        q(_, c.src[t++])
                    }
                    if (l)
                        break
                }
                return W(_, c.src.subarray(t, c.src_end), c.src_end - t),
                de(_),
                R(e, i),
                2
            },
            len: function(e) {
                return R(e, le(e, 1).length),
                1
            },
            lower: function(e) {
                for (var t = le(e, 1), r = t.length, n = new Uint8Array(r), a = 0; a < r; a++) {
                    var u = t[a];
                    De(u) && (u |= 32),
                    n[a] = u
                }
                return P(e, n),
                1
            },
            match: function(e) {
                return Lt(e, 0)
            },
            pack: function(e) {
                var t = new Z
                  , r = new Xe(e)
                  , n = {
                    s: le(e, 1),
                    off: 0
                }
                  , a = 1
                  , u = 0;
                for (I(e),
                ne(e, t); n.off < n.s.length; ) {
                    var s = qe(r, u, n)
                      , o = s.opt
                      , l = s.size
                      , i = s.ntoalign;
                    for (u += i + l; i-- > 0; )
                        q(t, 0);
                    switch (a++,
                    o) {
                    case 0:
                        var c = ue(e, a);
                        if (l < 4) {
                            var _ = 1 << 8 * l - 1;
                            te(e, -_ <= c && c < _, a, "integer overflow")
                        }
                        We(t, c, r.islittle, l, c < 0);
                        break;
                    case 1:
                        var f = ue(e, a);
                        l < 4 && te(e, f >>> 0 < 1 << 8 * l, a, "unsigned overflow"),
                        We(t, f >>> 0, r.islittle, l, !1);
                        break;
                    case 2:
                        var p = ve(t, l)
                          , v = se(e, a)
                          , d = new DataView(p.buffer,p.byteOffset,p.byteLength);
                        4 === l ? d.setFloat32(0, v, r.islittle) : d.setFloat64(0, v, r.islittle),
                        Q(t, l);
                        break;
                    case 3:
                        var h = le(e, a)
                          , L = h.length;
                        for (te(e, L <= l, a, "string longer than given size"),
                        W(t, h, L); L++ < l; )
                            q(t, 0);
                        break;
                    case 4:
                        var A = le(e, a)
                          , g = A.length;
                        te(e, l >= 4 || g < 1 << 8 * l, a, "string length does not fit in given size"),
                        We(t, g, r.islittle, l, 0),
                        W(t, A, g),
                        u += g;
                        break;
                    case 5:
                        var T = le(e, a)
                          , x = T.length;
                        te(e, be(T, 0) < 0, a, "strings contains zeros"),
                        W(t, T, x),
                        q(t, 0),
                        u += x + 1;
                        break;
                    case 6:
                        q(t, 0);
                    case 7:
                    case 8:
                        a--
                    }
                }
                return de(t),
                1
            },
            packsize: function(e) {
                for (var t = new Xe(e), r = {
                    s: le(e, 1),
                    off: 0
                }, n = 0; r.off < r.s.length; ) {
                    var a = qe(t, n, r)
                      , u = a.opt
                      , s = a.size
                      , o = a.ntoalign;
                    switch (te(e, n <= 2147483647 - (s += o), 1, "format result too large"),
                    n += s,
                    u) {
                    case 4:
                    case 5:
                        re(e, 1, "variable-length format")
                    }
                }
                return R(e, n),
                1
            },
            rep: function(e) {
                var t = le(e, 1)
                  , r = t.length
                  , n = ue(e, 2)
                  , a = pe(e, 3, "")
                  , u = a.length;
                if (n <= 0)
                    y(e, "");
                else {
                    if (r + u < r || r + u > 2147483647 / n)
                        return ce(e, Oe("resulting string too large"));
                    for (var s = n * r + (n - 1) * u, o = new Z, l = ae(e, o, s), i = 0; n-- > 1; )
                        l.set(t, i),
                        i += r,
                        u > 0 && (l.set(a, i),
                        i += u);
                    l.set(t, i),
                    he(o, s)
                }
                return 1
            },
            reverse: function(e) {
                for (var t = le(e, 1), r = t.length, n = new Uint8Array(r), a = 0; a < r; a++)
                    n[a] = t[r - 1 - a];
                return P(e, n),
                1
            },
            sub: function(e) {
                var t = le(e, 1)
                  , r = t.length
                  , n = Ue(ue(e, 2), r)
                  , a = Ue(fe(e, 3, -1), r);
                return n < 1 && (n = 1),
                a > r && (a = r),
                n <= a ? P(e, t.subarray(n - 1, n - 1 + (a - n + 1))) : y(e, ""),
                1
            },
            unpack: function(e) {
                var t = new Xe(e)
                  , r = {
                    s: le(e, 1),
                    off: 0
                }
                  , n = le(e, 2)
                  , a = n.length
                  , u = Ue(fe(e, 3, 1), a) - 1
                  , s = 0;
                for (te(e, u <= a && u >= 0, 3, "initial position out of string"); r.off < r.s.length; ) {
                    var o = qe(t, u, r)
                      , l = o.opt
                      , i = o.size
                      , c = o.ntoalign;
                    switch (u + c + i > a && re(e, 2, Oe("data string too short")),
                    u += c,
                    oe(e, 2, "too many results"),
                    s++,
                    l) {
                    case 0:
                    case 1:
                        var _ = Qe(e, n.subarray(u), t.islittle, i, 0 === l);
                        R(e, _);
                        break;
                    case 2:
                        var f = $e(0, n.subarray(u), t.islittle, i);
                        M(e, f);
                        break;
                    case 3:
                        P(e, n.subarray(u, u + i));
                        break;
                    case 4:
                        var p = Qe(e, n.subarray(u), t.islittle, i, 0);
                        te(e, u + p + i <= a, 2, "data string too short"),
                        P(e, n.subarray(u + i, u + i + p)),
                        u += p;
                        break;
                    case 5:
                        var v = be(n, 0, u);
                        -1 === v && (v = n.length - u),
                        P(e, n.subarray(u, v)),
                        u = v + 1;
                        break;
                    case 7:
                    case 6:
                    case 8:
                        s--
                    }
                    u += i
                }
                return R(e, u + 1),
                s + 1
            },
            upper: function(e) {
                for (var t = le(e, 1), r = t.length, n = new Uint8Array(r), a = 0; a < r; a++) {
                    var u = t[a];
                    Ce(u) && (u &= 223),
                    n[a] = u
                }
                return P(e, n),
                1
            }
        };
        e.exports.luaopen_string = function(e) {
            return _e(e, Tt),
            function(e) {
                x(e, 0, 1),
                y(e, ""),
                C(e, -2),
                G(e, -2),
                U(e, 1),
                C(e, -2),
                V(e, -2, Oe("__index", !0)),
                U(e, 1)
            }(e),
            1
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(1)
          , a = n.LUA_TNIL
          , u = n.LUA_TTABLE
          , s = (n.lua_close,
        n.lua_createtable)
          , o = n.lua_getfield
          , l = (n.lua_isboolean,
        n.lua_isnoneornil)
          , i = n.lua_pop
          , c = (n.lua_pushboolean,
        n.lua_pushfstring)
          , _ = n.lua_pushinteger
          , f = (n.lua_pushliteral,
        n.lua_pushnil,
        n.lua_pushnumber)
          , p = (n.lua_pushstring,
        n.lua_setfield)
          , v = n.lua_settop
          , d = (n.lua_toboolean,
        n.lua_tointegerx)
          , h = r(4)
          , L = h.luaL_Buffer
          , A = h.luaL_addchar
          , g = h.luaL_addstring
          , T = h.luaL_argerror
          , x = h.luaL_buffinit
          , b = h.luaL_checkinteger
          , k = (h.luaL_checkstring,
        h.luaL_checktype)
          , O = h.luaL_error
          , E = (h.luaL_execresult,
        h.luaL_fileresult,
        h.luaL_newlib)
          , m = (h.luaL_optinteger,
        h.luaL_optlstring)
          , U = (h.luaL_optstring,
        h.luaL_pushresult)
          , N = r(6)
          , R = N.luastring_eq
          , S = (N.to_jsstring,
        N.to_luastring)
          , y = S("aAbBcCdDeFhHIjklmMnpPrRStTuUwWxXyYzZ%")
          , w = function(e, t, r) {
            _(e, r),
            p(e, -2, S(t, !0))
        }
          , I = function(e, t, r) {
            w(e, "sec", r ? t.getUTCSeconds() : t.getSeconds()),
            w(e, "min", r ? t.getUTCMinutes() : t.getMinutes()),
            w(e, "hour", r ? t.getUTCHours() : t.getHours()),
            w(e, "day", r ? t.getUTCDate() : t.getDate()),
            w(e, "month", (r ? t.getUTCMonth() : t.getMonth()) + 1),
            w(e, "year", r ? t.getUTCFullYear() : t.getFullYear()),
            w(e, "wday", (r ? t.getUTCDay() : t.getDay()) + 1),
            w(e, "yday", Math.floor((t - new Date(t.getFullYear(),0,0)) / 864e5))
        }
          , M = Number.MAX_SAFE_INTEGER / 2
          , P = function(e, t, r, n) {
            var u = o(e, -1, S(t, !0))
              , s = d(e, -1);
            if (!1 === s) {
                if (u !== a)
                    return O(e, S("field '%s' is not an integer"), t);
                if (r < 0)
                    return O(e, S("field '%s' missing in date table"), t);
                s = r
            } else {
                if (!(-M <= s && s <= M))
                    return O(e, S("field '%s' is out-of-bound"), t);
                s -= n
            }
            return i(e, 1),
            s
        }
          , C = {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(function(e) {
                return S(e)
            }),
            shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(function(e) {
                return S(e)
            }),
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(function(e) {
                return S(e)
            }),
            shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(function(e) {
                return S(e)
            }),
            AM: S("AM"),
            PM: S("PM"),
            am: S("am"),
            pm: S("pm"),
            formats: {
                c: S("%a %b %e %H:%M:%S %Y"),
                D: S("%m/%d/%y"),
                F: S("%Y-%m-%d"),
                R: S("%H:%M"),
                r: S("%I:%M:%S %p"),
                T: S("%H:%M:%S"),
                X: S("%T"),
                x: S("%D")
            }
        }
          , D = function(e, t) {
            var r = e.getDay();
            "monday" === t && (0 === r ? r = 6 : r--);
            var n = (e - new Date(e.getFullYear(),0,1)) / 864e5;
            return Math.floor((n + 7 - r) / 7)
        }
          , V = function(e, t, r) {
            t < 10 && A(e, r),
            g(e, S(String(t)))
        }
          , G = function(e, t, r) {
            for (var n = y, a = 0, u = 1; a < n.length && u <= t.length - r; a += u)
                if (n[a] === "|".charCodeAt(0))
                    u++;
                else if (R(t.subarray(r, r + u), n.subarray(a, a + u)))
                    return u;
            T(e, 1, c(e, S("invalid conversion specifier '%%%s'"), t))
        }
          , B = function(e, t) {
            return b(e, t)
        }
          , K = {
            date: function(e) {
                var t = m(e, 1, "%c")
                  , r = l(e, 2) ? new Date : new Date(1e3 * B(e, 2))
                  , n = !1
                  , a = 0;
                if (t[a] === "!".charCodeAt(0) && (n = !0,
                a++),
                t[a] === "*".charCodeAt(0) && t[a + 1] === "t".charCodeAt(0))
                    s(e, 0, 9),
                    I(e, r, n);
                else {
                    new Uint8Array(4)[0] = "%".charCodeAt(0);
                    var u = new L;
                    x(e, u),
                    function e(t, r, n, a) {
                        for (var u = 0; u < n.length; )
                            if (37 !== n[u])
                                A(r, n[u++]);
                            else {
                                var s = G(t, n, ++u);
                                switch (n[u]) {
                                case 37:
                                    A(r, 37);
                                    break;
                                case 65:
                                    g(r, C.days[a.getDay()]);
                                    break;
                                case 66:
                                    g(r, C.months[a.getMonth()]);
                                    break;
                                case 67:
                                    V(r, Math.floor(a.getFullYear() / 100), 48);
                                    break;
                                case 68:
                                    e(t, r, C.formats.D, a);
                                    break;
                                case 70:
                                    e(t, r, C.formats.F, a);
                                    break;
                                case 72:
                                    V(r, a.getHours(), 48);
                                    break;
                                case 73:
                                    V(r, (a.getHours() + 11) % 12 + 1, 48);
                                    break;
                                case 77:
                                    V(r, a.getMinutes(), 48);
                                    break;
                                case 80:
                                    g(r, a.getHours() < 12 ? C.am : C.pm);
                                    break;
                                case 82:
                                    e(t, r, C.formats.R, a);
                                    break;
                                case 83:
                                    V(r, a.getSeconds(), 48);
                                    break;
                                case 84:
                                    e(t, r, C.formats.T, a);
                                    break;
                                case 85:
                                    V(r, D(a, "sunday"), 48);
                                    break;
                                case 87:
                                    V(r, D(a, "monday"), 48);
                                    break;
                                case 88:
                                    e(t, r, C.formats.X, a);
                                    break;
                                case 89:
                                    g(r, S(String(a.getFullYear())));
                                    break;
                                case 90:
                                    var o = a.toString().match(/\(([\w\s]+)\)/);
                                    o && g(r, S(o[1]));
                                    break;
                                case 97:
                                    g(r, C.shortDays[a.getDay()]);
                                    break;
                                case 98:
                                case 104:
                                    g(r, C.shortMonths[a.getMonth()]);
                                    break;
                                case 99:
                                    e(t, r, C.formats.c, a);
                                    break;
                                case 100:
                                    V(r, a.getDate(), 48);
                                    break;
                                case 101:
                                    V(r, a.getDate(), 32);
                                    break;
                                case 106:
                                    var l = Math.floor((a - new Date(a.getFullYear(),0,1)) / 864e5);
                                    l < 100 && (l < 10 && A(r, 48),
                                    A(r, 48)),
                                    g(r, S(String(l)));
                                    break;
                                case 107:
                                    V(r, a.getHours(), 32);
                                    break;
                                case 108:
                                    V(r, (a.getHours() + 11) % 12 + 1, 32);
                                    break;
                                case 109:
                                    V(r, a.getMonth() + 1, 48);
                                    break;
                                case 110:
                                    A(r, 10);
                                    break;
                                case 112:
                                    g(r, a.getHours() < 12 ? C.AM : C.PM);
                                    break;
                                case 114:
                                    e(t, r, C.formats.r, a);
                                    break;
                                case 115:
                                    g(r, S(String(Math.floor(a / 1e3))));
                                    break;
                                case 116:
                                    A(r, 8);
                                    break;
                                case 117:
                                    var i = a.getDay();
                                    g(r, S(String(0 === i ? 7 : i)));
                                    break;
                                case 119:
                                    g(r, S(String(a.getDay())));
                                    break;
                                case 120:
                                    e(t, r, C.formats.x, a);
                                    break;
                                case 121:
                                    V(r, a.getFullYear() % 100, 48);
                                    break;
                                case 122:
                                    var c = a.getTimezoneOffset();
                                    c > 0 ? A(r, 45) : (c = -c,
                                    A(r, 43)),
                                    V(r, Math.floor(c / 60), 48),
                                    V(r, c % 60, 48)
                                }
                                u += s
                            }
                    }(e, u, t, r),
                    U(u)
                }
                return 1
            },
            difftime: function(e) {
                var t = B(e, 1)
                  , r = B(e, 2);
                return f(e, t - r),
                1
            },
            time: function(e) {
                var t = void 0;
                return l(e, 1) ? t = new Date : (k(e, 1, u),
                v(e, 1),
                t = new Date(P(e, "year", -1, 0),P(e, "month", -1, 1),P(e, "day", -1, 0),P(e, "hour", 12, 0),P(e, "min", 0, 0),P(e, "sec", 0, 0)),
                I(e, t)),
                _(e, Math.floor(t / 1e3)),
                1
            }
        };
        K.clock = function(e) {
            return f(e, performance.now() / 1e3),
            1
        }
        ;
        e.exports.luaopen_os = function(e) {
            return E(e, K),
            1
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(3).LUA_MAXINTEGER
          , a = r(1)
          , u = a.LUA_OPEQ
          , s = a.LUA_OPLT
          , o = a.LUA_TFUNCTION
          , l = a.LUA_TNIL
          , i = a.LUA_TTABLE
          , c = a.lua_call
          , _ = a.lua_checkstack
          , f = a.lua_compare
          , p = a.lua_createtable
          , v = a.lua_geti
          , d = a.lua_getmetatable
          , h = a.lua_gettop
          , L = a.lua_insert
          , A = a.lua_isnil
          , g = a.lua_isnoneornil
          , T = a.lua_isstring
          , x = a.lua_pop
          , b = a.lua_pushinteger
          , k = a.lua_pushnil
          , O = a.lua_pushstring
          , E = a.lua_pushvalue
          , m = a.lua_rawget
          , U = a.lua_setfield
          , N = a.lua_seti
          , R = a.lua_settop
          , S = a.lua_toboolean
          , y = a.lua_type
          , w = r(4)
          , I = w.luaL_Buffer
          , M = w.luaL_addlstring
          , P = w.luaL_addvalue
          , C = w.luaL_argcheck
          , D = w.luaL_buffinit
          , V = w.luaL_checkinteger
          , G = w.luaL_checktype
          , B = w.luaL_error
          , K = w.luaL_len
          , F = w.luaL_newlib
          , H = w.luaL_opt
          , j = w.luaL_optinteger
          , X = w.luaL_optlstring
          , z = w.luaL_pushresult
          , Y = w.luaL_typename
          , J = r(12)
          , Z = r(6).to_luastring
          , q = function(e, t, r) {
            return O(e, t),
            m(e, -r) !== l
        }
          , W = function(e, t, r) {
            if (y(e, t) !== i) {
                var n = 1;
                !d(e, t) || 1 & r && !q(e, Z("__index", !0), ++n) || 2 & r && !q(e, Z("__newindex", !0), ++n) || 4 & r && !q(e, Z("__len", !0), ++n) ? G(e, t, i) : x(e, n)
            }
        }
          , Q = function(e, t, r) {
            return W(e, t, 4 | r),
            K(e, t)
        }
          , $ = function(e, t, r) {
            v(e, 1, r),
            T(e, -1) || B(e, Z("invalid value (%s) at index %d in table for 'concat'"), Y(e, -1), r),
            P(t)
        }
          , ee = function(e, t, r) {
            N(e, 1, t),
            N(e, 1, r)
        }
          , te = function(e, t, r) {
            if (A(e, 2))
                return f(e, t, r, s);
            E(e, 2),
            E(e, t - 1),
            E(e, r - 2),
            c(e, 2, 1);
            var n = S(e, -1);
            return x(e, 1),
            n
        }
          , re = function(e, t, r) {
            for (var n = t, a = r - 1; ; ) {
                for (; v(e, 1, ++n),
                te(e, -1, -2); )
                    n == r - 1 && B(e, Z("invalid order function for sorting")),
                    x(e, 1);
                for (; v(e, 1, --a),
                te(e, -3, -1); )
                    a < n && B(e, Z("invalid order function for sorting")),
                    x(e, 1);
                if (a < n)
                    return x(e, 1),
                    ee(e, r - 1, n),
                    n;
                ee(e, n, a)
            }
        }
          , ne = function(e, t, r) {
            var n = Math.floor((t - e) / 4)
              , a = r % (2 * n) + (e + n);
            return J.lua_assert(e + n <= a && a <= t - n),
            a
        }
          , ae = {
            concat: function(e) {
                var t = Q(e, 1, 1)
                  , r = X(e, 2, "")
                  , n = r.length
                  , a = j(e, 3, 1);
                t = j(e, 4, t);
                var u = new I;
                for (D(e, u); a < t; a++)
                    $(e, u, a),
                    M(u, r, n);
                return a === t && $(e, u, a),
                z(u),
                1
            },
            insert: function(e) {
                var t = Q(e, 1, 3) + 1
                  , r = void 0;
                switch (h(e)) {
                case 2:
                    r = t;
                    break;
                case 3:
                    r = V(e, 2),
                    C(e, 1 <= r && r <= t, 2, "position out of bounds");
                    for (var n = t; n > r; n--)
                        v(e, 1, n - 1),
                        N(e, 1, n);
                    break;
                default:
                    return B(e, "wrong number of arguments to 'insert'")
                }
                return N(e, 1, r),
                0
            },
            move: function(e) {
                var t = V(e, 2)
                  , r = V(e, 3)
                  , a = V(e, 4)
                  , s = g(e, 5) ? 1 : 5;
                if (W(e, 1, 1),
                W(e, s, 2),
                r >= t) {
                    C(e, t > 0 || r < n + t, 3, "too many elements to move");
                    var o = r - t + 1;
                    if (C(e, a <= n - o + 1, 4, "destination wrap around"),
                    a > r || a <= t || 1 !== s && 1 !== f(e, 1, s, u))
                        for (var l = 0; l < o; l++)
                            v(e, 1, t + l),
                            N(e, s, a + l);
                    else
                        for (var i = o - 1; i >= 0; i--)
                            v(e, 1, t + i),
                            N(e, s, a + i)
                }
                return E(e, s),
                1
            },
            pack: function(e) {
                var t = h(e);
                p(e, t, 1),
                L(e, 1);
                for (var r = t; r >= 1; r--)
                    N(e, 1, r);
                return b(e, t),
                U(e, 1, Z("n")),
                1
            },
            remove: function(e) {
                var t = Q(e, 1, 3)
                  , r = j(e, 2, t);
                for (r !== t && C(e, 1 <= r && r <= t + 1, 1, "position out of bounds"),
                v(e, 1, r); r < t; r++)
                    v(e, 1, r + 1),
                    N(e, 1, r);
                return k(e),
                N(e, 1, r),
                1
            },
            sort: function(e) {
                var t = Q(e, 1, 3);
                return t > 1 && (C(e, t < n, 1, "array too big"),
                g(e, 2) || G(e, 2, o),
                R(e, 2),
                function e(t, r, n, a) {
                    for (; r < n; ) {
                        if (v(t, 1, r),
                        v(t, 1, n),
                        te(t, -1, -2) ? ee(t, r, n) : x(t, 2),
                        n - r == 1)
                            return;
                        var u = void 0;
                        if (u = n - r < 100 || 0 === a ? Math.floor((r + n) / 2) : ne(r, n, a),
                        v(t, 1, u),
                        v(t, 1, r),
                        te(t, -2, -1) ? ee(t, u, r) : (x(t, 1),
                        v(t, 1, n),
                        te(t, -1, -2) ? ee(t, u, n) : x(t, 2)),
                        n - r == 2)
                            return;
                        v(t, 1, u),
                        E(t, -1),
                        v(t, 1, n - 1),
                        ee(t, u, n - 1);
                        var s = void 0;
                        (u = re(t, r, n)) - r < n - u ? (e(t, r, u - 1, a),
                        s = u - r,
                        r = u + 1) : (e(t, u + 1, n, a),
                        s = n - u,
                        n = u - 1),
                        (n - r) / 128 > s && (a = Math.floor(1 * Math.random() << 32))
                    }
                }(e, 1, t, 0)),
                0
            },
            unpack: function(e) {
                var t = j(e, 2, 1)
                  , r = H(e, V, 3, K(e, 1));
                if (t > r)
                    return 0;
                var n = r - t;
                if (n >= Number.MAX_SAFE_INTEGER || !_(e, ++n))
                    return B(e, Z("too many results to unpack"));
                for (; t < r; t++)
                    v(e, 1, t);
                return v(e, 1, r),
                n
            }
        };
        e.exports.luaopen_table = function(e) {
            return F(e, ae),
            1
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(1)
          , a = n.LUA_OK
          , u = n.LUA_TFUNCTION
          , s = n.LUA_TSTRING
          , o = n.LUA_YIELD
          , l = n.lua_Debug
          , i = n.lua_checkstack
          , c = n.lua_concat
          , _ = n.lua_error
          , f = n.lua_getstack
          , p = n.lua_gettop
          , v = n.lua_insert
          , d = n.lua_isyieldable
          , h = n.lua_newthread
          , L = n.lua_pop
          , A = n.lua_pushboolean
          , g = n.lua_pushcclosure
          , T = n.lua_pushliteral
          , x = n.lua_pushthread
          , b = n.lua_pushvalue
          , k = n.lua_resume
          , O = n.lua_status
          , E = n.lua_tothread
          , m = n.lua_type
          , U = n.lua_upvalueindex
          , N = n.lua_xmove
          , R = n.lua_yield
          , S = r(4)
          , y = S.luaL_argcheck
          , w = S.luaL_checktype
          , I = S.luaL_newlib
          , M = S.luaL_where
          , P = function(e) {
            var t = E(e, 1);
            return y(e, t, 1, "thread expected"),
            t
        }
          , C = function(e, t, r) {
            if (!i(t, r))
                return T(e, "too many arguments to resume"),
                -1;
            if (O(t) === a && 0 === p(t))
                return T(e, "cannot resume dead coroutine"),
                -1;
            N(e, t, r);
            var n = k(t, e, r);
            if (n === a || n === o) {
                var u = p(t);
                return i(e, u + 1) ? (N(t, e, u),
                u) : (L(t, u),
                T(e, "too many results to resume"),
                -1)
            }
            return N(t, e, 1),
            -1
        }
          , D = function(e) {
            var t = E(e, U(1))
              , r = C(e, t, p(e));
            return r < 0 ? (m(e, -1) === s && (M(e, 1),
            v(e, -2),
            c(e, 2)),
            _(e)) : r
        }
          , V = function(e) {
            w(e, 1, u);
            var t = h(e);
            return b(e, 1),
            N(e, t, 1),
            1
        }
          , G = {
            create: V,
            isyieldable: function(e) {
                return A(e, d(e)),
                1
            },
            resume: function(e) {
                var t = P(e)
                  , r = C(e, t, p(e) - 1);
                return r < 0 ? (A(e, 0),
                v(e, -2),
                2) : (A(e, 1),
                v(e, -(r + 1)),
                r + 1)
            },
            running: function(e) {
                return A(e, x(e)),
                2
            },
            status: function(e) {
                var t = P(e);
                if (e === t)
                    T(e, "running");
                else
                    switch (O(t)) {
                    case o:
                        T(e, "suspended");
                        break;
                    case a:
                        var r = new l;
                        f(t, 0, r) > 0 ? T(e, "normal") : 0 === p(t) ? T(e, "dead") : T(e, "suspended");
                        break;
                    default:
                        T(e, "dead")
                    }
                return 1
            },
            wrap: function(e) {
                return V(e),
                g(e, D, 1),
                1
            },
            yield: function(e) {
                return R(e, p(e))
            }
        };
        e.exports.luaopen_coroutine = function(e) {
            return I(e, G),
            1
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }();
        function a(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var u = r(0)
          , s = u.LUA_MULTRET
          , o = u.to_luastring
          , l = r(38)
          , i = l.BinOpr
          , c = i.OPR_ADD
          , _ = i.OPR_AND
          , f = i.OPR_BAND
          , p = i.OPR_BOR
          , v = i.OPR_BXOR
          , d = i.OPR_CONCAT
          , h = i.OPR_DIV
          , L = i.OPR_EQ
          , A = i.OPR_GE
          , g = i.OPR_GT
          , T = i.OPR_IDIV
          , x = i.OPR_LE
          , b = i.OPR_LT
          , k = i.OPR_MOD
          , O = i.OPR_MUL
          , E = i.OPR_NE
          , m = i.OPR_NOBINOPR
          , U = i.OPR_OR
          , N = i.OPR_POW
          , R = i.OPR_SHL
          , S = i.OPR_SHR
          , y = i.OPR_SUB
          , w = l.UnOpr
          , I = w.OPR_BNOT
          , M = w.OPR_LEN
          , P = w.OPR_MINUS
          , C = w.OPR_NOT
          , D = w.OPR_NOUNOPR
          , V = l.NO_JUMP
          , G = l.getinstruction
          , B = l.luaK_checkstack
          , K = l.luaK_codeABC
          , F = l.luaK_codeABx
          , H = l.luaK_codeAsBx
          , j = l.luaK_codek
          , X = l.luaK_concat
          , z = l.luaK_dischargevars
          , Y = l.luaK_exp2RK
          , J = l.luaK_exp2anyreg
          , Z = l.luaK_exp2anyregup
          , q = l.luaK_exp2nextreg
          , W = l.luaK_exp2val
          , Q = l.luaK_fixline
          , $ = l.luaK_getlabel
          , ee = l.luaK_goiffalse
          , te = l.luaK_goiftrue
          , re = l.luaK_indexed
          , ne = l.luaK_infix
          , ae = l.luaK_intK
          , ue = l.luaK_jump
          , se = l.luaK_jumpto
          , oe = l.luaK_nil
          , le = l.luaK_patchclose
          , ie = l.luaK_patchlist
          , ce = l.luaK_patchtohere
          , _e = l.luaK_posfix
          , fe = l.luaK_prefix
          , pe = l.luaK_reserveregs
          , ve = l.luaK_ret
          , de = l.luaK_self
          , he = l.luaK_setlist
          , Le = l.luaK_setmultret
          , Ae = l.luaK_setoneret
          , ge = l.luaK_setreturns
          , Te = l.luaK_storevar
          , xe = l.luaK_stringK
          , be = r(7)
          , ke = r(16)
          , Oe = r(19)
          , Ee = r(2)
          , me = Ee.LUAI_MAXCCALLS
          , Ue = Ee.MAX_INT
          , Ne = Ee.lua_assert
          , Re = r(5)
          , Se = r(13)
          , ye = Se.OpCodesI
          , we = ye.OP_CALL
          , Ie = ye.OP_CLOSURE
          , Me = ye.OP_FORLOOP
          , Pe = ye.OP_FORPREP
          , Ce = ye.OP_GETUPVAL
          , De = ye.OP_MOVE
          , Ve = ye.OP_NEWTABLE
          , Ge = ye.OP_SETTABLE
          , Be = ye.OP_TAILCALL
          , Ke = ye.OP_TFORCALL
          , Fe = ye.OP_TFORLOOP
          , He = ye.OP_VARARG
          , je = Se.LFIELDS_PER_FLUSH
          , Xe = Se.SETARG_B
          , ze = Se.SETARG_C
          , Ye = Se.SET_OPCODE
          , Je = r(8)
          , Ze = Je.luaS_eqlngstr
          , qe = Je.luaS_new
          , We = Je.luaS_newliteral
          , Qe = r(9)
          , $e = ke.Proto
          , et = Oe.RESERVED
          , tt = function(e) {
            return e === at.VCALL || e === at.VVARARG
        }
          , rt = function(e, t) {
            return Ze(e, t)
        }
          , nt = function e() {
            a(this, e),
            this.previous = null,
            this.firstlabel = NaN,
            this.firstgoto = NaN,
            this.nactvar = NaN,
            this.upval = NaN,
            this.isloop = NaN
        }
          , at = {
            VVOID: 0,
            VNIL: 1,
            VTRUE: 2,
            VFALSE: 3,
            VK: 4,
            VKFLT: 5,
            VKINT: 6,
            VNONRELOC: 7,
            VLOCAL: 8,
            VUPVAL: 9,
            VINDEXED: 10,
            VJMP: 11,
            VRELOCABLE: 12,
            VCALL: 13,
            VVARARG: 14
        }
          , ut = function() {
            function e() {
                a(this, e),
                this.k = NaN,
                this.u = {
                    ival: NaN,
                    nval: NaN,
                    info: NaN,
                    ind: {
                        idx: NaN,
                        t: NaN,
                        vt: NaN
                    }
                },
                this.t = NaN,
                this.f = NaN
            }
            return n(e, [{
                key: "to",
                value: function(e) {
                    this.k = e.k,
                    this.u = e.u,
                    this.t = e.t,
                    this.f = e.f
                }
            }]),
            e
        }()
          , st = function e() {
            a(this, e),
            this.f = null,
            this.prev = null,
            this.ls = null,
            this.bl = null,
            this.pc = NaN,
            this.lasttarget = NaN,
            this.jpc = NaN,
            this.nk = NaN,
            this.np = NaN,
            this.firstlocal = NaN,
            this.nlocvars = NaN,
            this.nactvar = NaN,
            this.nups = NaN,
            this.freereg = NaN
        }
          , ot = function e() {
            a(this, e),
            this.arr = [],
            this.n = NaN,
            this.size = NaN
        }
          , lt = function(e, t) {
            e.t.token = 0,
            Oe.luaX_syntaxerror(e, t)
        }
          , it = function(e, t) {
            Oe.luaX_syntaxerror(e, Re.luaO_pushfstring(e.L, o("%s expected", !0), Oe.luaX_token2str(e, t)))
        }
          , ct = function(e, t, r, n) {
            t > r && function(e, t, r) {
                var n = e.ls.L
                  , a = e.f.linedefined
                  , u = 0 === a ? o("main function", !0) : Re.luaO_pushfstring(n, o("function at line %d", !0), a)
                  , s = Re.luaO_pushfstring(n, o("too many %s (limit is %d) in %s", !0), r, t, u);
                Oe.luaX_syntaxerror(e.ls, s)
            }(e, r, n)
        }
          , _t = function(e, t) {
            return e.t.token === t && (Oe.luaX_next(e),
            !0)
        }
          , ft = function(e, t) {
            e.t.token !== t && it(e, t)
        }
          , pt = function(e, t) {
            ft(e, t),
            Oe.luaX_next(e)
        }
          , vt = function(e, t, r) {
            t || Oe.luaX_syntaxerror(e, r)
        }
          , dt = function(e, t, r, n) {
            _t(e, t) || (n === e.linenumber ? it(e, t) : Oe.luaX_syntaxerror(e, Re.luaO_pushfstring(e.L, o("%s expected (to close %s at line %d)"), Oe.luaX_token2str(e, t), Oe.luaX_token2str(e, r), n)))
        }
          , ht = function(e) {
            ft(e, et.TK_NAME);
            var t = e.t.seminfo.ts;
            return Oe.luaX_next(e),
            t
        }
          , Lt = function(e, t, r) {
            e.f = e.t = V,
            e.k = t,
            e.u.info = r
        }
          , At = function(e, t, r) {
            Lt(t, at.VK, xe(e.fs, r))
        }
          , gt = function(e, t) {
            At(e, t, ht(e))
        }
          , Tt = function(e, t) {
            var r = e.fs
              , n = e.dyd
              , u = function(e, t) {
                var r = e.fs
                  , n = r.f;
                return n.locvars[r.nlocvars] = new Re.LocVar,
                n.locvars[r.nlocvars].varname = t,
                r.nlocvars++
            }(e, t);
            ct(r, n.actvar.n + 1 - r.firstlocal, 200, o("local variables", !0)),
            n.actvar.arr[n.actvar.n] = new function e() {
                a(this, e),
                this.idx = NaN
            }
            ,
            n.actvar.arr[n.actvar.n].idx = u,
            n.actvar.n++
        }
          , xt = function(e, t) {
            Tt(e, Oe.luaX_newstring(e, o(t, !0)))
        }
          , bt = function(e, t) {
            var r = e.ls.dyd.actvar.arr[e.firstlocal + t].idx;
            return Ne(r < e.nlocvars),
            e.f.locvars[r]
        }
          , kt = function(e, t) {
            var r = e.fs;
            for (r.nactvar = r.nactvar + t; t; t--)
                bt(r, r.nactvar - t).startpc = r.pc
        }
          , Ot = function(e, t, r) {
            var n = e.f;
            return ct(e, e.nups + 1, ke.MAXUPVAL, o("upvalues", !0)),
            n.upvalues[e.nups] = {
                instack: r.k === at.VLOCAL,
                idx: r.u.info,
                name: t
            },
            e.nups++
        }
          , Et = function e(t, r, n, a) {
            if (null === t)
                Lt(n, at.VVOID, 0);
            else {
                var u = function(e, t) {
                    for (var r = e.nactvar - 1; r >= 0; r--)
                        if (rt(t, bt(e, r).varname))
                            return r;
                    return -1
                }(t, r);
                if (u >= 0)
                    Lt(n, at.VLOCAL, u),
                    a || function(e, t) {
                        for (var r = e.bl; r.nactvar > t; )
                            r = r.previous;
                        r.upval = 1
                    }(t, u);
                else {
                    var s = function(e, t) {
                        for (var r = e.f.upvalues, n = 0; n < e.nups; n++)
                            if (rt(r[n].name, t))
                                return n;
                        return -1
                    }(t, r);
                    if (s < 0) {
                        if (e(t.prev, r, n, 0),
                        n.k === at.VVOID)
                            return;
                        s = Ot(t, r, n)
                    }
                    Lt(n, at.VUPVAL, s)
                }
            }
        }
          , mt = function(e, t) {
            var r = ht(e)
              , n = e.fs;
            if (Et(n, r, t, 1),
            t.k === at.VVOID) {
                var a = new ut;
                Et(n, e.envn, t, 1),
                Ne(t.k !== at.VVOID),
                At(e, a, r),
                re(n, t, a)
            }
        }
          , Ut = function(e, t, r, n) {
            var a = e.fs
              , u = t - r;
            if (tt(n.k))
                ++u < 0 && (u = 0),
                ge(a, n, u),
                u > 1 && pe(a, u - 1);
            else if (n.k !== at.VVOID && q(a, n),
            u > 0) {
                var s = a.freereg;
                pe(a, u),
                oe(a, s, u)
            }
            r > t && (e.fs.freereg -= r - t)
        }
          , Nt = function(e) {
            var t = e.L;
            ++t.nCcalls,
            ct(e.fs, t.nCcalls, me, o("JS levels", !0))
        }
          , Rt = function(e) {
            return e.L.nCcalls--
        }
          , St = function(e, t, r) {
            var n = e.fs
              , a = e.dyd.gt
              , u = a.arr[t];
            if (Ne(rt(u.name, r.name)),
            u.nactvar < r.nactvar) {
                var s = bt(n, u.nactvar).varname
                  , l = Re.luaO_pushfstring(e.L, o("<goto %s> at line %d jumps into the scope of local '%s'"), u.name.getstr(), u.line, s.getstr());
                lt(e, l)
            }
            ie(n, u.pc, r.pc);
            for (var i = t; i < a.n - 1; i++)
                a.arr[i] = a.arr[i + 1];
            a.n--
        }
          , yt = function(e, t) {
            for (var r = e.fs.bl, n = e.dyd, a = n.gt.arr[t], u = r.firstlabel; u < n.label.n; u++) {
                var s = n.label.arr[u];
                if (rt(s.name, a.name))
                    return a.nactvar > s.nactvar && (r.upval || n.label.n > r.firstlabel) && le(e.fs, a.pc, s.nactvar),
                    St(e, t, s),
                    !0
            }
            return !1
        }
          , wt = function(e, t, r, n, u) {
            var s = t.n;
            return t.arr[s] = new function e() {
                a(this, e),
                this.name = null,
                this.pc = NaN,
                this.line = NaN,
                this.nactvar = NaN
            }
            ,
            t.arr[s].name = r,
            t.arr[s].line = n,
            t.arr[s].nactvar = e.fs.nactvar,
            t.arr[s].pc = u,
            t.n = s + 1,
            s
        }
          , It = function(e, t) {
            for (var r = e.dyd.gt, n = e.fs.bl.firstgoto; n < r.n; )
                rt(r.arr[n].name, t.name) ? St(e, n, t) : n++
        }
          , Mt = function(e, t, r) {
            t.isloop = r,
            t.nactvar = e.nactvar,
            t.firstlabel = e.ls.dyd.label.n,
            t.firstgoto = e.ls.dyd.gt.n,
            t.upval = 0,
            t.previous = e.bl,
            e.bl = t,
            Ne(e.freereg === e.nactvar)
        }
          , Pt = function(e, t, r) {
            t.prev = e.fs,
            t.ls = e,
            e.fs = t,
            t.pc = 0,
            t.lasttarget = 0,
            t.jpc = V,
            t.freereg = 0,
            t.nk = 0,
            t.np = 0,
            t.nups = 0,
            t.nlocvars = 0,
            t.nactvar = 0,
            t.firstlocal = e.dyd.actvar.n,
            t.bl = null;
            var n = new $e(e.L);
            (n = t.f).source = e.source,
            n.maxstacksize = 2,
            Mt(t, r, !1)
        }
          , Ct = function(e) {
            var t = e.bl
              , r = e.ls;
            if (t.previous && t.upval) {
                var n = ue(e);
                le(e, n, t.nactvar),
                ce(e, n)
            }
            t.isloop && function(e) {
                var t = We(e.L, "break")
                  , r = wt(e, e.dyd.label, t, 0, e.fs.pc);
                It(e, e.dyd.label.arr[r])
            }(r),
            e.bl = t.previous,
            function(e, t) {
                for (e.ls.dyd.actvar.n -= e.nactvar - t; e.nactvar > t; )
                    bt(e, --e.nactvar).endpc = e.pc
            }(e, t.nactvar),
            Ne(t.nactvar === e.nactvar),
            e.freereg = e.nactvar,
            r.dyd.label.n = t.firstlabel,
            t.previous ? function(e, t) {
                for (var r = t.firstgoto, n = e.ls.dyd.gt; r < n.n; ) {
                    var a = n.arr[r];
                    a.nactvar > t.nactvar && (t.upval && le(e, a.pc, t.nactvar),
                    a.nactvar = t.nactvar),
                    yt(e.ls, r) || r++
                }
            }(e, t) : t.firstgoto < r.dyd.gt.n && function(e, t) {
                var r = Oe.isreserved(t.name) ? "<%s> at line %d not inside a loop" : "no visible label '%s' for <goto> at line %d";
                r = Re.luaO_pushfstring(e.L, o(r), t.name.getstr(), t.line),
                lt(e, r)
            }(r, r.dyd.gt.arr[t.firstgoto])
        }
          , Dt = function(e) {
            var t = e.fs;
            ve(t, 0, 0),
            Ct(t),
            Ne(null === t.bl),
            e.fs = t.prev
        }
          , Vt = function(e, t) {
            switch (e.t.token) {
            case et.TK_ELSE:
            case et.TK_ELSEIF:
            case et.TK_END:
            case et.TK_EOS:
                return !0;
            case et.TK_UNTIL:
                return t;
            default:
                return !1
            }
        }
          , Gt = function(e) {
            for (; !Vt(e, 1); ) {
                if (e.t.token === et.TK_RETURN)
                    return void _r(e);
                _r(e)
            }
        }
          , Bt = function(e, t) {
            var r = e.fs
              , n = new ut;
            Z(r, t),
            Oe.luaX_next(e),
            gt(e, n),
            re(r, t, n)
        }
          , Kt = function(e, t) {
            Oe.luaX_next(e),
            $t(e, t),
            W(e.fs, t),
            pt(e, 93)
        }
          , Ft = function(e, t) {
            var r = e.fs
              , n = e.fs.freereg
              , a = new ut
              , u = new ut;
            e.t.token === et.TK_NAME ? (ct(r, t.nh, Ue, o("items in a constructor", !0)),
            gt(e, a)) : Kt(e, a),
            t.nh++,
            pt(e, 61);
            var s = Y(r, a);
            $t(e, u),
            K(r, Ge, t.t.u.info, s, Y(r, u)),
            r.freereg = n
        }
          , Ht = function(e, t) {
            t.v.k !== at.VVOID && (q(e, t.v),
            t.v.k = at.VVOID,
            t.tostore === je && (he(e, t.t.u.info, t.na, t.tostore),
            t.tostore = 0))
        }
          , jt = function(e, t) {
            $t(e, t.v),
            ct(e.fs, t.na, Ue, o("items in a constructor", !0)),
            t.na++,
            t.tostore++
        }
          , Xt = function(e, t) {
            switch (e.t.token) {
            case et.TK_NAME:
                61 !== Oe.luaX_lookahead(e) ? jt(e, t) : Ft(e, t);
                break;
            case 91:
                Ft(e, t);
                break;
            default:
                jt(e, t)
            }
        }
          , zt = function(e, t) {
            var r = e.fs
              , n = e.linenumber
              , u = K(r, Ve, 0, 0, 0)
              , o = new function e() {
                a(this, e),
                this.v = new ut,
                this.t = new ut,
                this.nh = NaN,
                this.na = NaN,
                this.tostore = NaN
            }
            ;
            o.na = o.nh = o.tostore = 0,
            o.t = t,
            Lt(t, at.VRELOCABLE, u),
            Lt(o.v, at.VVOID, 0),
            q(e.fs, t),
            pt(e, 123);
            do {
                if (Ne(o.v.k === at.VVOID || o.tostore > 0),
                125 === e.t.token)
                    break;
                Ht(r, o),
                Xt(e, o)
            } while (_t(e, 44) || _t(e, 59));dt(e, 125, 123, n),
            function(e, t) {
                0 !== t.tostore && (tt(t.v.k) ? (Le(e, t.v),
                he(e, t.t.u.info, t.na, s),
                t.na--) : (t.v.k !== at.VVOID && q(e, t.v),
                he(e, t.t.u.info, t.na, t.tostore)))
            }(r, o),
            Xe(r.f.code[u], Re.luaO_int2fb(o.na)),
            ze(r.f.code[u], Re.luaO_int2fb(o.nh))
        }
          , Yt = function(e, t, r, n) {
            var a = new st
              , u = new nt;
            a.f = function(e) {
                var t = e.L
                  , r = new $e(t)
                  , n = e.fs;
                return n.f.p[n.np++] = r,
                r
            }(e),
            a.f.linedefined = n,
            Pt(e, a, u),
            pt(e, 40),
            r && (xt(e, "self"),
            kt(e, 1)),
            function(e) {
                var t = e.fs
                  , r = t.f
                  , n = 0;
                if (r.is_vararg = !1,
                41 !== e.t.token)
                    do {
                        switch (e.t.token) {
                        case et.TK_NAME:
                            Tt(e, ht(e)),
                            n++;
                            break;
                        case et.TK_DOTS:
                            Oe.luaX_next(e),
                            r.is_vararg = !0;
                            break;
                        default:
                            Oe.luaX_syntaxerror(e, o("<name> or '...' expected", !0))
                        }
                    } while (!r.is_vararg && _t(e, 44));kt(e, n),
                r.numparams = t.nactvar,
                pe(t, t.nactvar)
            }(e),
            pt(e, 41),
            Gt(e),
            a.f.lastlinedefined = e.linenumber,
            dt(e, et.TK_END, et.TK_FUNCTION, n),
            function(e, t) {
                var r = e.fs.prev;
                Lt(t, at.VRELOCABLE, F(r, Ie, 0, r.np - 1)),
                q(r, t)
            }(e, t),
            Dt(e)
        }
          , Jt = function(e, t) {
            var r = 1;
            for ($t(e, t); _t(e, 44); )
                q(e.fs, t),
                $t(e, t),
                r++;
            return r
        }
          , Zt = function(e, t, r) {
            var n = e.fs
              , a = new ut;
            switch (e.t.token) {
            case 40:
                Oe.luaX_next(e),
                41 === e.t.token ? a.k = at.VVOID : (Jt(e, a),
                Le(n, a)),
                dt(e, 41, 40, r);
                break;
            case 123:
                zt(e, a);
                break;
            case et.TK_STRING:
                At(e, a, e.t.seminfo.ts),
                Oe.luaX_next(e);
                break;
            default:
                Oe.luaX_syntaxerror(e, o("function arguments expected", !0))
            }
            Ne(t.k === at.VNONRELOC);
            var u = void 0
              , l = t.u.info;
            tt(a.k) ? u = s : (a.k !== at.VVOID && q(n, a),
            u = n.freereg - (l + 1)),
            Lt(t, at.VCALL, K(n, we, l, u + 1, 2)),
            Q(n, r),
            n.freereg = l + 1
        }
          , qt = function(e, t) {
            var r = e.fs
              , n = e.linenumber;
            for (!function(e, t) {
                switch (e.t.token) {
                case 40:
                    var r = e.linenumber;
                    return Oe.luaX_next(e),
                    $t(e, t),
                    dt(e, 41, 40, r),
                    void z(e.fs, t);
                case et.TK_NAME:
                    return void mt(e, t);
                default:
                    Oe.luaX_syntaxerror(e, o("unexpected symbol", !0))
                }
            }(e, t); ; )
                switch (e.t.token) {
                case 46:
                    Bt(e, t);
                    break;
                case 91:
                    var a = new ut;
                    Z(r, t),
                    Kt(e, a),
                    re(r, t, a);
                    break;
                case 58:
                    var u = new ut;
                    Oe.luaX_next(e),
                    gt(e, u),
                    de(r, t, u),
                    Zt(e, t, n);
                    break;
                case 40:
                case et.TK_STRING:
                case 123:
                    q(r, t),
                    Zt(e, t, n);
                    break;
                default:
                    return
                }
        }
          , Wt = [{
            left: 10,
            right: 10
        }, {
            left: 10,
            right: 10
        }, {
            left: 11,
            right: 11
        }, {
            left: 11,
            right: 11
        }, {
            left: 14,
            right: 13
        }, {
            left: 11,
            right: 11
        }, {
            left: 11,
            right: 11
        }, {
            left: 6,
            right: 6
        }, {
            left: 4,
            right: 4
        }, {
            left: 5,
            right: 5
        }, {
            left: 7,
            right: 7
        }, {
            left: 7,
            right: 7
        }, {
            left: 9,
            right: 8
        }, {
            left: 3,
            right: 3
        }, {
            left: 3,
            right: 3
        }, {
            left: 3,
            right: 3
        }, {
            left: 3,
            right: 3
        }, {
            left: 3,
            right: 3
        }, {
            left: 3,
            right: 3
        }, {
            left: 2,
            right: 2
        }, {
            left: 1,
            right: 1
        }]
          , Qt = function e(t, r, n) {
            Nt(t);
            var a = function(e) {
                switch (e) {
                case et.TK_NOT:
                    return C;
                case 45:
                    return P;
                case 126:
                    return I;
                case 35:
                    return M;
                default:
                    return D
                }
            }(t.t.token);
            if (a !== D) {
                var u = t.linenumber;
                Oe.luaX_next(t),
                e(t, r, 12),
                fe(t.fs, a, r, u)
            } else
                !function(e, t) {
                    switch (e.t.token) {
                    case et.TK_FLT:
                        Lt(t, at.VKFLT, 0),
                        t.u.nval = e.t.seminfo.r;
                        break;
                    case et.TK_INT:
                        Lt(t, at.VKINT, 0),
                        t.u.ival = e.t.seminfo.i;
                        break;
                    case et.TK_STRING:
                        At(e, t, e.t.seminfo.ts);
                        break;
                    case et.TK_NIL:
                        Lt(t, at.VNIL, 0);
                        break;
                    case et.TK_TRUE:
                        Lt(t, at.VTRUE, 0);
                        break;
                    case et.TK_FALSE:
                        Lt(t, at.VFALSE, 0);
                        break;
                    case et.TK_DOTS:
                        var r = e.fs;
                        vt(e, r.f.is_vararg, o("cannot use '...' outside a vararg function", !0)),
                        Lt(t, at.VVARARG, K(r, He, 0, 1, 0));
                        break;
                    case 123:
                        return void zt(e, t);
                    case et.TK_FUNCTION:
                        return Oe.luaX_next(e),
                        void Yt(e, t, 0, e.linenumber);
                    default:
                        return void qt(e, t)
                    }
                    Oe.luaX_next(e)
                }(t, r);
            for (var s = function(e) {
                switch (e) {
                case 43:
                    return c;
                case 45:
                    return y;
                case 42:
                    return O;
                case 37:
                    return k;
                case 94:
                    return N;
                case 47:
                    return h;
                case et.TK_IDIV:
                    return T;
                case 38:
                    return f;
                case 124:
                    return p;
                case 126:
                    return v;
                case et.TK_SHL:
                    return R;
                case et.TK_SHR:
                    return S;
                case et.TK_CONCAT:
                    return d;
                case et.TK_NE:
                    return E;
                case et.TK_EQ:
                    return L;
                case 60:
                    return b;
                case et.TK_LE:
                    return x;
                case 62:
                    return g;
                case et.TK_GE:
                    return A;
                case et.TK_AND:
                    return _;
                case et.TK_OR:
                    return U;
                default:
                    return m
                }
            }(t.t.token); s !== m && Wt[s].left > n; ) {
                var l = new ut
                  , i = t.linenumber;
                Oe.luaX_next(t),
                ne(t.fs, s, r);
                var w = e(t, l, Wt[s].right);
                _e(t.fs, s, r, l, i),
                s = w
            }
            return Rt(t),
            s
        }
          , $t = function(e, t) {
            Qt(e, t, 0)
        }
          , er = function(e) {
            var t = e.fs
              , r = new nt;
            Mt(t, r, 0),
            Gt(e),
            Ct(t)
        }
          , tr = function e() {
            a(this, e),
            this.prev = null,
            this.v = new ut
        }
          , rr = function e(t, r, n) {
            var a, u = new ut;
            if (vt(t, (a = r.v.k,
            at.VLOCAL <= a && a <= at.VINDEXED), o("syntax error", !0)),
            _t(t, 44)) {
                var s = new tr;
                s.prev = r,
                qt(t, s.v),
                s.v.k !== at.VINDEXED && function(e, t, r) {
                    for (var n = e.fs, a = n.freereg, u = !1; t; t = t.prev)
                        t.v.k === at.VINDEXED && (t.v.u.ind.vt === r.k && t.v.u.ind.t === r.u.info && (u = !0,
                        t.v.u.ind.vt = at.VLOCAL,
                        t.v.u.ind.t = a),
                        r.k === at.VLOCAL && t.v.u.ind.idx === r.u.info && (u = !0,
                        t.v.u.ind.idx = a));
                    if (u) {
                        var s = r.k === at.VLOCAL ? De : Ce;
                        K(n, s, a, r.u.info, 0),
                        pe(n, 1)
                    }
                }(t, r, s.v),
                ct(t.fs, n + t.L.nCcalls, me, o("JS levels", !0)),
                e(t, s, n + 1)
            } else {
                pt(t, 61);
                var l = Jt(t, u);
                if (l === n)
                    return Ae(t.fs, u),
                    void Te(t.fs, r.v, u);
                Ut(t, n, l, u)
            }
            Lt(u, at.VNONRELOC, t.fs.freereg - 1),
            Te(t.fs, r.v, u)
        }
          , nr = function(e) {
            var t = new ut;
            return $t(e, t),
            t.k === at.VNIL && (t.k = at.VFALSE),
            te(e.fs, t),
            t.f
        }
          , ar = function(e, t) {
            var r = e.linenumber
              , n = void 0;
            _t(e, et.TK_GOTO) ? n = ht(e) : (Oe.luaX_next(e),
            n = We(e.L, "break"));
            var a = wt(e, e.dyd.gt, n, r, t);
            yt(e, a)
        }
          , ur = function(e, t, r) {
            var n, a = e.fs, u = e.dyd.label;
            !function(e, t, r) {
                for (var n = e.bl.firstlabel; n < t.n; n++)
                    if (rt(r, t.arr[n].name)) {
                        var a = Re.luaO_pushfstring(e.ls.L, o("label '%s' already defined on line %d", !0), r.getstr(), t.arr[n].line);
                        lt(e.ls, a)
                    }
            }(a, u, t),
            pt(e, et.TK_DBCOLON),
            n = wt(e, u, t, r, $(a)),
            function(e) {
                for (; 59 === e.t.token || e.t.token === et.TK_DBCOLON; )
                    _r(e)
            }(e),
            Vt(e, 0) && (u.arr[n].nactvar = a.bl.nactvar),
            It(e, u.arr[n])
        }
          , sr = function(e) {
            var t = new ut;
            return $t(e, t),
            q(e.fs, t),
            Ne(t.k === at.VNONRELOC),
            t.u.info
        }
          , or = function(e, t, r, n, a) {
            var u = new nt
              , s = e.fs
              , o = void 0;
            kt(e, 3),
            pt(e, et.TK_DO);
            var l = a ? H(s, Pe, t, V) : ue(s);
            Mt(s, u, 0),
            kt(e, n),
            pe(s, n),
            er(e),
            Ct(s),
            ce(s, l),
            a ? o = H(s, Me, t, V) : (K(s, Ke, t, 0, n),
            Q(s, r),
            o = H(s, Fe, t + 2, V)),
            ie(s, o, l + 1),
            Q(s, r)
        }
          , lr = function(e, t) {
            var r = e.fs
              , n = new nt;
            Mt(r, n, 1),
            Oe.luaX_next(e);
            var a = ht(e);
            switch (e.t.token) {
            case 61:
                !function(e, t, r) {
                    var n = e.fs
                      , a = n.freereg;
                    xt(e, "(for index)"),
                    xt(e, "(for limit)"),
                    xt(e, "(for step)"),
                    Tt(e, t),
                    pt(e, 61),
                    sr(e),
                    pt(e, 44),
                    sr(e),
                    _t(e, 44) ? sr(e) : (j(n, n.freereg, ae(n, 1)),
                    pe(n, 1)),
                    or(e, a, r, 1, 1)
                }(e, a, t);
                break;
            case 44:
            case et.TK_IN:
                !function(e, t) {
                    var r = e.fs
                      , n = new ut
                      , a = 4
                      , u = r.freereg;
                    for (xt(e, "(for generator)"),
                    xt(e, "(for state)"),
                    xt(e, "(for control)"),
                    Tt(e, t); _t(e, 44); )
                        Tt(e, ht(e)),
                        a++;
                    pt(e, et.TK_IN);
                    var s = e.linenumber;
                    Ut(e, 3, Jt(e, n), n),
                    B(r, 3),
                    or(e, u, s, a - 3, 0)
                }(e, a);
                break;
            default:
                Oe.luaX_syntaxerror(e, o("'=' or 'in' expected", !0))
            }
            dt(e, et.TK_END, et.TK_FOR, t),
            Ct(r)
        }
          , ir = function(e, t) {
            var r = new nt
              , n = e.fs
              , a = new ut
              , u = void 0;
            if (Oe.luaX_next(e),
            $t(e, a),
            pt(e, et.TK_THEN),
            e.t.token === et.TK_GOTO || e.t.token === et.TK_BREAK) {
                for (ee(e.fs, a),
                Mt(n, r, !1),
                ar(e, a.t); _t(e, 59); )
                    ;
                if (Vt(e, 0))
                    return Ct(n),
                    t;
                u = ue(n)
            } else
                te(e.fs, a),
                Mt(n, r, !1),
                u = a.f;
            return Gt(e),
            Ct(n),
            e.t.token !== et.TK_ELSE && e.t.token !== et.TK_ELSEIF || (t = X(n, t, ue(n))),
            ce(n, u),
            t
        }
          , cr = function(e, t) {
            var r = new ut
              , n = new ut;
            Oe.luaX_next(e);
            var a = function(e, t) {
                var r = 0;
                for (mt(e, t); 46 === e.t.token; )
                    Bt(e, t);
                return 58 === e.t.token && (r = 1,
                Bt(e, t)),
                r
            }(e, r);
            Yt(e, n, a, t),
            Te(e.fs, r, n),
            Q(e.fs, t)
        }
          , _r = function(e) {
            var t = e.linenumber;
            switch (Nt(e),
            e.t.token) {
            case 59:
                Oe.luaX_next(e);
                break;
            case et.TK_IF:
                !function(e, t) {
                    var r = e.fs
                      , n = V;
                    for (n = ir(e, n); e.t.token === et.TK_ELSEIF; )
                        n = ir(e, n);
                    _t(e, et.TK_ELSE) && er(e),
                    dt(e, et.TK_END, et.TK_IF, t),
                    ce(r, n)
                }(e, t);
                break;
            case et.TK_WHILE:
                !function(e, t) {
                    var r = e.fs
                      , n = new nt;
                    Oe.luaX_next(e);
                    var a = $(r)
                      , u = nr(e);
                    Mt(r, n, 1),
                    pt(e, et.TK_DO),
                    er(e),
                    se(r, a),
                    dt(e, et.TK_END, et.TK_WHILE, t),
                    Ct(r),
                    ce(r, u)
                }(e, t);
                break;
            case et.TK_DO:
                Oe.luaX_next(e),
                er(e),
                dt(e, et.TK_END, et.TK_DO, t);
                break;
            case et.TK_FOR:
                lr(e, t);
                break;
            case et.TK_REPEAT:
                !function(e, t) {
                    var r = e.fs
                      , n = $(r)
                      , a = new nt
                      , u = new nt;
                    Mt(r, a, 1),
                    Mt(r, u, 0),
                    Oe.luaX_next(e),
                    Gt(e),
                    dt(e, et.TK_UNTIL, et.TK_REPEAT, t);
                    var s = nr(e);
                    u.upval && le(r, s, u.nactvar),
                    Ct(r),
                    ie(r, s, n),
                    Ct(r)
                }(e, t);
                break;
            case et.TK_FUNCTION:
                cr(e, t);
                break;
            case et.TK_LOCAL:
                Oe.luaX_next(e),
                _t(e, et.TK_FUNCTION) ? function(e) {
                    var t = new ut
                      , r = e.fs;
                    Tt(e, ht(e)),
                    kt(e, 1),
                    Yt(e, t, 0, e.linenumber),
                    bt(r, t.u.info).startpc = r.pc
                }(e) : function(e) {
                    var t = 0
                      , r = void 0
                      , n = new ut;
                    do {
                        Tt(e, ht(e)),
                        t++
                    } while (_t(e, 44));_t(e, 61) ? r = Jt(e, n) : (n.k = at.VVOID,
                    r = 0),
                    Ut(e, t, r, n),
                    kt(e, t)
                }(e);
                break;
            case et.TK_DBCOLON:
                Oe.luaX_next(e),
                ur(e, ht(e), t);
                break;
            case et.TK_RETURN:
                Oe.luaX_next(e),
                function(e) {
                    var t = e.fs
                      , r = new ut
                      , n = void 0
                      , a = void 0;
                    Vt(e, 1) || 59 === e.t.token ? n = a = 0 : (a = Jt(e, r),
                    tt(r.k) ? (Le(t, r),
                    r.k === at.VCALL && 1 === a && (Ye(G(t, r), Be),
                    Ne(G(t, r).A === t.nactvar)),
                    n = t.nactvar,
                    a = s) : 1 === a ? n = J(t, r) : (q(t, r),
                    n = t.nactvar,
                    Ne(a === t.freereg - n))),
                    ve(t, n, a),
                    _t(e, 59)
                }(e);
                break;
            case et.TK_BREAK:
            case et.TK_GOTO:
                ar(e, ue(e.fs));
                break;
            default:
                !function(e) {
                    var t = e.fs
                      , r = new tr;
                    qt(e, r.v),
                    61 === e.t.token || 44 === e.t.token ? (r.prev = null,
                    rr(e, r, 1)) : (vt(e, r.v.k === at.VCALL, o("syntax error", !0)),
                    ze(G(t, r.v), 1))
                }(e)
            }
            Ne(e.fs.f.maxstacksize >= e.fs.freereg && e.fs.freereg >= e.fs.nactvar),
            e.fs.freereg = e.fs.nactvar,
            Rt(e)
        };
        e.exports.Dyndata = function e() {
            a(this, e),
            this.actvar = {
                arr: [],
                n: NaN,
                size: NaN
            },
            this.gt = new ot,
            this.label = new ot
        }
        ,
        e.exports.expkind = at,
        e.exports.expdesc = ut,
        e.exports.luaY_parser = function(e, t, r, n, a, u) {
            var s, o, l, i, c = new Oe.LexState, _ = new st, f = ke.luaF_newLclosure(e, 1);
            return be.luaD_inctop(e),
            e.stack[e.top - 1].setclLvalue(f),
            c.h = Qe.luaH_new(e),
            be.luaD_inctop(e),
            e.stack[e.top - 1].sethvalue(c.h),
            _.f = f.p = new $e(e),
            _.f.source = qe(e, a),
            c.buff = r,
            c.dyd = n,
            n.actvar.n = n.gt.n = n.label.n = 0,
            Oe.luaX_setinput(e, c, t, _.f.source, u),
            s = c,
            o = _,
            l = new nt,
            i = new ut,
            Pt(s, o, l),
            o.f.is_vararg = !0,
            Lt(i, at.VLOCAL, 0),
            Ot(o, s.envn, i),
            Oe.luaX_next(s),
            Gt(s),
            ft(s, et.TK_EOS),
            Dt(s),
            Ne(!_.prev && 1 === _.nups && !c.fs),
            Ne(0 === n.actvar.n && 0 === n.gt.n && 0 === n.label.n),
            delete e.stack[--e.top],
            f
        }
        ,
        e.exports.vkisinreg = function(e) {
            return e === at.VNONRELOC || e === at.VLOCAL
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = (0,
        r(0).luastring_of)(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 4, 4, 4, 4, 4, 4, 4, 21, 21, 21, 21, 21, 21, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 5, 4, 21, 21, 21, 21, 21, 21, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        e.exports.lisdigit = function(e) {
            return 0 != (2 & n[e + 1])
        }
        ,
        e.exports.lislalnum = function(e) {
            return 0 != (3 & n[e + 1])
        }
        ,
        e.exports.lislalpha = function(e) {
            return 0 != (1 & n[e + 1])
        }
        ,
        e.exports.lisprint = function(e) {
            return 0 != (4 & n[e + 1])
        }
        ,
        e.exports.lisspace = function(e) {
            return 0 != (8 & n[e + 1])
        }
        ,
        e.exports.lisxdigit = function(e) {
            return 0 != (16 & n[e + 1])
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , a = r(20)
          , u = a.lua
          , s = a.lauxlib
          , o = a.lualib
          , l = a.to_luastring
          , i = u.LUA_MULTRET
          , c = u.LUA_OK
          , _ = u.LUA_REGISTRYINDEX
          , f = u.LUA_RIDX_MAINTHREAD
          , p = u.LUA_TBOOLEAN
          , v = u.LUA_TFUNCTION
          , d = u.LUA_TLIGHTUSERDATA
          , h = u.LUA_TNIL
          , L = u.LUA_TNONE
          , A = u.LUA_TNUMBER
          , g = u.LUA_TSTRING
          , T = u.LUA_TTABLE
          , x = u.LUA_TTHREAD
          , b = u.LUA_TUSERDATA
          , k = u.lua_atnativeerror
          , O = u.lua_call
          , E = u.lua_getfield
          , m = u.lua_gettable
          , U = u.lua_gettop
          , N = u.lua_isnil
          , R = u.lua_isproxy
          , S = u.lua_newuserdata
          , y = u.lua_pcall
          , w = u.lua_pop
          , I = u.lua_pushboolean
          , M = u.lua_pushcfunction
          , P = u.lua_pushinteger
          , C = u.lua_pushlightuserdata
          , D = u.lua_pushliteral
          , V = u.lua_pushnil
          , G = u.lua_pushnumber
          , B = u.lua_pushstring
          , K = u.lua_pushvalue
          , F = u.lua_rawgeti
          , H = u.lua_rawgetp
          , j = u.lua_rawsetp
          , X = u.lua_rotate
          , z = u.lua_setfield
          , Y = u.lua_settable
          , J = u.lua_settop
          , Z = u.lua_toboolean
          , q = u.lua_tojsstring
          , W = u.lua_tonumber
          , Q = u.lua_toproxy
          , $ = u.lua_tothread
          , ee = u.lua_touserdata
          , te = u.lua_type
          , re = s.luaL_argerror
          , ne = s.luaL_checkany
          , ae = s.luaL_checkoption
          , ue = s.luaL_checkstack
          , se = s.luaL_checkudata
          , oe = s.luaL_error
          , le = s.luaL_getmetafield
          , ie = s.luaL_newlib
          , ce = s.luaL_newmetatable
          , _e = s.luaL_requiref
          , fe = s.luaL_setfuncs
          , pe = s.luaL_setmetatable
          , ve = s.luaL_testudata
          , de = s.luaL_tolstring
          , he = o.luaopen_base;
        var Le = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : (0,
        eval)("this")
          , Ae = void 0
          , ge = void 0
          , Te = void 0;
        if ("undefined" != typeof Reflect)
            Ae = Reflect.apply,
            ge = Reflect.construct,
            Te = Reflect.deleteProperty;
        else {
            var xe = Function.apply
              , be = Function.bind;
            Ae = function(e, t, r) {
                return xe.call(e, t, r)
            }
            ,
            ge = function(e, t) {
                switch (t.length) {
                case 0:
                    return new e;
                case 1:
                    return new e(t[0]);
                case 2:
                    return new e(t[0],t[1]);
                case 3:
                    return new e(t[0],t[1],t[2]);
                case 4:
                    return new e(t[0],t[1],t[2],t[3])
                }
                var r = [null];
                return r.push.apply(r, t),
                new (be.apply(e, r))
            }
            ,
            Te = Function("t", "k", "delete t[k]")
        }
        var ke = String.prototype.concat.bind("")
          , Oe = function(e) {
            return "object" === (void 0 === e ? "undefined" : n(e)) ? null !== e : "function" == typeof e
        }
          , Ee = l("js object")
          , me = function(e, t) {
            var r = ve(e, t, Ee);
            return r ? r.data : void 0
        }
          , Ue = function(e, t) {
            return se(e, t, Ee).data
        }
          , Ne = function(e, t) {
            S(e).data = t,
            pe(e, Ee)
        }
          , Re = function(e) {
            F(e, _, f);
            var t = $(e, -1);
            return w(e, 1),
            t
        }
          , Se = new WeakMap
          , ye = function(e, t) {
            switch (void 0 === t ? "undefined" : n(t)) {
            case "undefined":
                V(e);
                break;
            case "number":
                G(e, t);
                break;
            case "string":
                B(e, l(t));
                break;
            case "boolean":
                I(e, t);
                break;
            case "symbol":
                C(e, t);
                break;
            case "function":
                if (R(t, e)) {
                    t(e);
                    break
                }
            case "object":
                if (null === t) {
                    if (H(e, _, null) !== b)
                        throw Error("js library not loaded into lua_State");
                    break
                }
            default:
                var r = Se.get(Re(e));
                if (!r)
                    throw Error("js library not loaded into lua_State");
                var a = r.get(t);
                a ? a(e) : (Ne(e, t),
                a = Q(e, -1),
                r.set(t, a))
            }
        }
          , we = function(e) {
            var t = ee(e, 1);
            return ye(e, t),
            1
        }
          , Ie = function(e, t) {
            switch (te(e, t)) {
            case L:
            case h:
                return;
            case p:
                return Z(e, t);
            case d:
                return ee(e, t);
            case A:
                return W(e, t);
            case g:
                return q(e, t);
            case b:
                var r = me(e, t);
                if (void 0 !== r)
                    return r;
            case T:
            case v:
            case x:
            default:
                return He(e, Q(e, t))
            }
        }
          , Me = function(e, t) {
            var r = y(e, t, 1, 0)
              , n = Ie(e, -1);
            switch (w(e, 1),
            r) {
            case c:
                return n;
            default:
                throw n
            }
        }
          , Pe = function(e, t, r, n, a) {
            if (!Oe(n))
                throw new TypeError("`args` argument must be an object");
            var u = +n.length;
            u >= 0 || (u = 0),
            ue(e, 2 + u, null);
            var s = U(e);
            t(e),
            ye(e, r);
            for (var o = 0; o < u; o++)
                ye(e, n[o]);
            switch (y(e, 1 + u, a, 0)) {
            case c:
                for (var l = U(e) - s, i = new Array(l), _ = 0; _ < l; _++)
                    i[_] = Ie(e, s + _ + 1);
                return J(e, s),
                i;
            default:
                var f = Ie(e, -1);
                throw J(e, s),
                f
            }
        }
          , Ce = function(e) {
            return m(e, 1),
            1
        }
          , De = function(e, t, r) {
            return ue(e, 3, null),
            M(e, Ce),
            t(e),
            ye(e, r),
            Me(e, 2)
        }
          , Ve = function(e, t, r) {
            switch (ue(e, 3, null),
            M(e, Ce),
            t(e),
            ye(e, r),
            y(e, 2, 1, 0)) {
            case c:
                var n = N(e, -1);
                return w(e, 1),
                !n;
            default:
                var a = Ie(e, -1);
                throw w(e, 1),
                a
            }
        }
          , Ge = function(e, t, r, n) {
            switch (ue(e, 4, null),
            M(e, function(e) {
                return Y(e, 1),
                0
            }),
            t(e),
            ye(e, r),
            ye(e, n),
            y(e, 3, 0, 0)) {
            case c:
                return;
            default:
                var a = Ie(e, -1);
                throw w(e, 1),
                a
            }
        }
          , Be = function(e, t, r) {
            switch (ue(e, 4, null),
            M(e, function(e) {
                return Y(e, 1),
                0
            }),
            t(e),
            ye(e, r),
            V(e),
            y(e, 3, 0, 0)) {
            case c:
                return;
            default:
                var n = Ie(e, -1);
                throw w(e, 1),
                n
            }
        }
          , Ke = function(e, t) {
            return ue(e, 2, null),
            M(e, function(e) {
                return de(e, 1),
                1
            }),
            t(e),
            Me(e, 1)
        }
          , Fe = function() {
            var e = this.L;
            ue(e, 3, null);
            var t = U(e);
            switch (this.iter(e),
            this.state(e),
            this.last(e),
            y(e, 2, i, 0)) {
            case c:
                this.last = Q(e, t + 1);
                var r = void 0;
                if (N(e, -1))
                    r = {
                        done: !0,
                        value: void 0
                    };
                else {
                    for (var n = U(e) - t, a = new Array(n), u = 0; u < n; u++)
                        a[u] = Ie(e, t + u + 1);
                    r = {
                        done: !1,
                        value: a
                    }
                }
                return J(e, t),
                r;
            default:
                var s = Ie(e, -1);
                throw w(e, 1),
                s
            }
        }
          , He = function(e, t) {
            var r = Re(e)
              , n = function() {
                return Pe(r, t, this, arguments, 1)[0]
            };
            n.apply = function(e, n) {
                return Pe(r, t, e, n, 1)[0]
            }
            ,
            n.invoke = function(e, n) {
                return Pe(r, t, e, n, i)
            }
            ,
            n.get = function(e) {
                return De(r, t, e)
            }
            ,
            n.has = function(e) {
                return Ve(r, t, e)
            }
            ,
            n.set = function(e, n) {
                return Ge(r, t, e, n)
            }
            ,
            n.delete = function(e) {
                return Be(r, t, e)
            }
            ,
            n.toString = function() {
                return Ke(r, t)
            }
            ,
            "function" == typeof Symbol && (n[Symbol.toStringTag] = "Fengari object",
            n[Symbol.iterator] = function() {
                return function(e, t) {
                    switch (ue(e, 1, null),
                    M(e, function(e) {
                        return _e(e, l("_G"), he, 0),
                        E(e, -1, l("pairs")),
                        t(e),
                        O(e, 1, 3),
                        3
                    }),
                    y(e, 0, 3, 0)) {
                    case c:
                        var r = Q(e, -3)
                          , n = Q(e, -2)
                          , a = Q(e, -1);
                        return w(e, 3),
                        {
                            L: e,
                            iter: r,
                            state: n,
                            last: a,
                            next: Fe
                        };
                    default:
                        var u = Ie(e, -1);
                        throw w(e, 1),
                        u
                    }
                }(r, t)
            }
            ,
            Symbol.toPrimitive && (n[Symbol.toPrimitive] = function(e) {
                if ("string" === e)
                    return Ke(r, t)
            }
            ));
            var a = Se.get(r);
            if (!a)
                throw Error("js library not loaded into lua_State");
            return a.set(n, t),
            n
        }
          , je = {
            new: function(e) {
                for (var t = Ie(e, 1), r = U(e) - 1, n = new Array(r), a = 0; a < r; a++)
                    n[a] = Ie(e, a + 2);
                return ye(e, ge(t, n)),
                1
            },
            tonumber: function(e) {
                var t = Ie(e, 1);
                return G(e, +t),
                1
            },
            tostring: function(e) {
                var t = Ie(e, 1);
                return D(e, ke(t)),
                1
            },
            instanceof: function(e) {
                var t = Ie(e, 1)
                  , r = Ie(e, 2);
                return I(e, t instanceof r),
                1
            },
            typeof: function e(t) {
                var r = Ie(t, 1);
                return D(t, void 0 === r ? "undefined" : e(r)),
                1
            }
        };
        if ("function" == typeof Symbol && Symbol.iterator) {
            var Xe = function(e) {
                var t = Ie(e, 1).next();
                return t.done ? 0 : (ye(e, t.value),
                1)
            };
            je.of = function(e) {
                var t = function(e, t) {
                    var r = Ue(e, t)
                      , n = r[Symbol.iterator];
                    n || re(e, t, l("object not iterable"));
                    var a = Ae(n, r, []);
                    return Oe(a) || re(e, t, l("Result of the Symbol.iterator method is not an object")),
                    a
                }(e, 1);
                return M(e, Xe),
                ye(e, t),
                2
            }
        }
        if ("function" == typeof Proxy && "function" == typeof Symbol) {
            var ze = Symbol("lua_State")
              , Ye = Symbol("fengari-proxy")
              , Je = {
                apply: function(e, t, r) {
                    return Pe(e[ze], e[Ye], t, r, 1)[0]
                },
                construct: function(e, t) {
                    var r = e[ze]
                      , n = e[Ye]
                      , a = t.length;
                    ue(r, 2 + a, null),
                    n(r);
                    var u = U(r);
                    if (le(r, u, l("construct")) === h)
                        throw w(r, 1),
                        new TypeError("not a constructor");
                    X(r, u, 1);
                    for (var s = 0; s < a; s++)
                        ye(r, t[s]);
                    return Me(r, 1 + a)
                },
                defineProperty: function(e, t, r) {
                    var n = e[ze]
                      , a = e[Ye];
                    return ue(n, 4, null),
                    a(n),
                    le(n, -1, l("defineProperty")) === h ? (w(n, 1),
                    !1) : (X(n, -2, 1),
                    ye(n, t),
                    ye(n, r),
                    Me(n, 3))
                },
                deleteProperty: function(e, t) {
                    return Be(e[ze], e[Ye], t)
                },
                get: function(e, t) {
                    return De(e[ze], e[Ye], t)
                },
                getOwnPropertyDescriptor: function(e, t) {
                    var r = e[ze]
                      , n = e[Ye];
                    if (ue(r, 3, null),
                    n(r),
                    le(r, -1, l("getOwnPropertyDescriptor")) !== h)
                        return X(r, -2, 1),
                        ye(r, t),
                        Me(r, 2);
                    w(r, 1)
                },
                getPrototypeOf: function(e) {
                    var t = e[ze]
                      , r = e[Ye];
                    return ue(t, 2, null),
                    r(t),
                    le(t, -1, l("getPrototypeOf")) === h ? (w(t, 1),
                    null) : (X(t, -2, 1),
                    Me(t, 1))
                },
                has: function(e, t) {
                    return Ve(e[ze], e[Ye], t)
                },
                ownKeys: function(e) {
                    var t = e[ze]
                      , r = e[Ye];
                    if (ue(t, 2, null),
                    r(t),
                    le(t, -1, l("ownKeys")) === h)
                        throw w(t, 1),
                        Error("ownKeys unknown for fengari object");
                    return X(t, -2, 1),
                    Me(t, 1)
                },
                set: function(e, t, r) {
                    return Ge(e[ze], e[Ye], t, r),
                    !0
                },
                setPrototypeOf: function(e, t) {
                    var r = e[ze]
                      , n = e[Ye];
                    return ue(r, 3, null),
                    n(r),
                    le(r, -1, l("setPrototypeOf")) === h ? (w(r, 1),
                    !1) : (X(r, -2, 1),
                    ye(r, t),
                    Me(r, 2))
                }
            }
              , Ze = Function("return ()=>void 0;")
              , qe = function(e, t, r) {
                var n, a = Re(e), u = void 0;
                switch (r) {
                case "function":
                    delete (n = function() {}
                    .bind()).length,
                    delete n.name,
                    u = n;
                    break;
                case "arrow_function":
                    u = function() {
                        var e = Ze();
                        return delete e.length,
                        delete e.name,
                        e
                    }();
                    break;
                case "object":
                    u = {};
                    break;
                default:
                    throw TypeError("invalid type to createproxy")
                }
                return u[Ye] = t,
                u[ze] = a,
                new Proxy(u,Je)
            }
              , We = ["function", "arrow_function", "object"]
              , Qe = We.map(function(e) {
                return l(e)
            });
            je.createproxy = function(e) {
                ne(e, 1);
                var t = We[ae(e, 2, Qe[0], Qe)]
                  , r = qe(e, Q(e, 1), t);
                return ye(e, r),
                1
            }
        }
        var $e = {
            __index: function(e) {
                var t = Ue(e, 1)
                  , r = Ie(e, 2);
                return ye(e, t[r]),
                1
            },
            __newindex: function(e) {
                var t = Ue(e, 1)
                  , r = Ie(e, 2)
                  , n = Ie(e, 3);
                return void 0 === n ? Te(t, r) : t[r] = n,
                0
            },
            __tostring: function(e) {
                var t = Ue(e, 1)
                  , r = ke(t);
                return B(e, l(r)),
                1
            },
            __call: function(e) {
                var t = Ue(e, 1)
                  , r = U(e) - 1
                  , n = void 0
                  , a = new Array(Math.max(0, r - 1));
                if (r > 0 && (n = Ie(e, 2),
                r-- > 0))
                    for (var u = 0; u < r; u++)
                        a[u] = Ie(e, u + 3);
                return ye(e, Ae(t, n, a)),
                1
            },
            __pairs: function(e) {
                var t = Ue(e, 1)
                  , r = void 0
                  , n = void 0
                  , a = void 0
                  , u = void 0;
                if ("function" != typeof Symbol || void 0 === (r = t[Symbol.for("__pairs")]))
                    n = function(e) {
                        if (!(this.index >= this.keys.length)) {
                            var t = this.keys[this.index++];
                            return [t, this.object[t]]
                        }
                    }
                    ,
                    a = {
                        object: t,
                        keys: Object.keys(t),
                        index: 0
                    };
                else {
                    var s = Ae(r, t, []);
                    void 0 === s && oe(e, l("bad '__pairs' result (object with keys 'iter', 'state', 'first' expected)")),
                    void 0 === (n = s.iter) && oe(e, l("bad '__pairs' result (object.iter is missing)")),
                    a = s.state,
                    u = s.first
                }
                return M(e, function() {
                    var t = Ie(e, 1)
                      , r = Ie(e, 2)
                      , a = Ae(n, t, [r]);
                    if (void 0 === a)
                        return 0;
                    Array.isArray(a) || oe(e, l("bad iterator result (Array or undefined expected)")),
                    ue(e, a.length, null);
                    for (var u = 0; u < a.length; u++)
                        ye(e, a[u]);
                    return a.length
                }),
                ye(e, a),
                ye(e, u),
                3
            },
            __len: function(e) {
                var t = Ue(e, 1)
                  , r = void 0
                  , n = void 0;
                return n = "function" != typeof Symbol || void 0 === (r = t[Symbol.for("__len")]) ? t.length : Ae(r, t, []),
                ye(e, n),
                1
            }
        };
        e.exports.FENGARI_INTEROP_VERSION = "0.1",
        e.exports.FENGARI_INTEROP_VERSION_NUM = 1,
        e.exports.FENGARI_INTEROP_RELEASE = "0.1.2",
        e.exports.checkjs = Ue,
        e.exports.testjs = me,
        e.exports.pushjs = Ne,
        e.exports.push = ye,
        e.exports.tojs = Ie,
        e.exports.luaopen_js = function(e) {
            return Se.set(Re(e), new WeakMap),
            k(e, we),
            ie(e, je),
            D(e, "0.1"),
            z(e, -2, l("_VERSION")),
            P(e, 1),
            z(e, -2, l("_VERSION_NUM")),
            D(e, "0.1.2"),
            z(e, -2, l("_RELEASE")),
            ce(e, Ee),
            fe(e, $e, 0),
            w(e, 1),
            Ne(e, null),
            K(e, -1),
            j(e, _, null),
            z(e, -2, l("null")),
            ye(e, Le),
            z(e, -2, l("global")),
            1
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(1)
          , a = n.LUA_MULTRET
          , u = n.LUA_OK
          , s = n.LUA_TFUNCTION
          , o = n.LUA_TNIL
          , l = n.LUA_TNONE
          , i = n.LUA_TNUMBER
          , c = n.LUA_TSTRING
          , _ = n.LUA_TTABLE
          , f = n.LUA_VERSION
          , p = n.LUA_YIELD
          , v = n.lua_call
          , d = n.lua_callk
          , h = n.lua_concat
          , L = n.lua_error
          , A = n.lua_getglobal
          , g = n.lua_geti
          , T = n.lua_getmetatable
          , x = n.lua_gettop
          , b = n.lua_insert
          , k = n.lua_isnil
          , O = n.lua_isnone
          , E = n.lua_isstring
          , m = n.lua_load
          , U = n.lua_next
          , N = n.lua_pcallk
          , R = n.lua_pop
          , S = n.lua_pushboolean
          , y = n.lua_pushcfunction
          , w = n.lua_pushglobaltable
          , I = n.lua_pushinteger
          , M = n.lua_pushliteral
          , P = n.lua_pushnil
          , C = n.lua_pushstring
          , D = n.lua_pushvalue
          , V = n.lua_rawequal
          , G = n.lua_rawget
          , B = n.lua_rawlen
          , K = n.lua_rawset
          , F = n.lua_remove
          , H = n.lua_replace
          , j = n.lua_rotate
          , X = n.lua_setfield
          , z = n.lua_setmetatable
          , Y = n.lua_settop
          , J = n.lua_setupvalue
          , Z = n.lua_stringtonumber
          , q = n.lua_toboolean
          , W = n.lua_tolstring
          , Q = n.lua_tostring
          , $ = n.lua_type
          , ee = n.lua_typename
          , te = r(4)
          , re = te.luaL_argcheck
          , ne = te.luaL_checkany
          , ae = te.luaL_checkinteger
          , ue = te.luaL_checkoption
          , se = te.luaL_checkstack
          , oe = te.luaL_checktype
          , le = te.luaL_error
          , ie = te.luaL_getmetafield
          , ce = te.luaL_loadbufferx
          , _e = te.luaL_loadfile
          , fe = te.luaL_loadfilex
          , pe = te.luaL_optinteger
          , ve = te.luaL_optstring
          , de = te.luaL_setfuncs
          , he = te.luaL_tolstring
          , Le = te.luaL_where
          , Ae = r(6)
          , ge = Ae.to_jsstring
          , Te = Ae.to_luastring
          , xe = void 0
          , be = void 0;
        if ("function" == typeof TextDecoder) {
            var ke = ""
              , Oe = new TextDecoder("utf-8");
            xe = function(e) {
                ke += Oe.decode(e, {
                    stream: !0
                })
            }
            ;
            var Ee = new Uint8Array(0);
            be = function() {
                ke += Oe.decode(Ee),
                ke = ke.replace(/not /g, "!"),
                console.log(ke),
                ke = ""
            }
        } else {
            var me = [];
            xe = function(e) {
                try {
                    e = ge(e)
                } catch (r) {
                    var t = new Uint8Array(e.length);
                    t.set(e),
                    e = t
                }
                me.push(e)
            }
            ,
            be = function() {
                console.log.apply(console.log, me),
                me = []
            }
        }
        var Ue = ["stop", "restart", "collect", "count", "step", "setpause", "setstepmul", "isrunning"].map(function(e) {
            return Te(e)
        })
          , Ne = function(e) {
            return oe(e, 1, _),
            Y(e, 2),
            U(e, 1) ? 2 : (P(e),
            1)
        }
          , Re = function(e) {
            var t = ae(e, 2) + 1;
            return I(e, t),
            g(e, 1, t) === o ? 1 : 2
        }
          , Se = function(e) {
            var t = pe(e, 2, 1);
            return Y(e, 1),
            $(e, 1) === c && t > 0 && (Le(e, t),
            D(e, 1),
            h(e, 2)),
            L(e)
        }
          , ye = function(e, t, r) {
            return t !== u && t !== p ? (S(e, 0),
            D(e, -2),
            2) : x(e) - r
        }
          , we = function(e, t, r) {
            return t === u ? (0 !== r && (D(e, r),
            J(e, -2, 1) || R(e, 1)),
            1) : (P(e),
            b(e, -2),
            2)
        }
          , Ie = function(e, t) {
            return se(e, 2, "too many nested functions"),
            D(e, 1),
            v(e, 0, 1),
            k(e, -1) ? (R(e, 1),
            null) : (E(e, -1) || le(e, Te("reader function must return a string")),
            H(e, 5),
            Q(e, 5))
        }
          , Me = function(e, t, r) {
            return x(e) - 1
        }
          , Pe = {
            assert: function(e) {
                return q(e, 1) ? x(e) : (ne(e, 1),
                F(e, 1),
                M(e, "assertion failed!"),
                Y(e, 1),
                Se(e))
            },
            collectgarbage: function(e) {
                ue(e, 1, "collect", Ue),
                pe(e, 2, 0),
                le(e, Te("lua_gc not implemented"))
            },
            dofile: function(e) {
                var t = ve(e, 1, null);
                return Y(e, 1),
                _e(e, t) !== u ? L(e) : (d(e, 0, a, 0, Me),
                Me(e))
            },
            error: Se,
            getmetatable: function(e) {
                return ne(e, 1),
                T(e, 1) ? (ie(e, 1, Te("__metatable", !0)),
                1) : (P(e),
                1)
            },
            ipairs: function(e) {
                return ne(e, 1),
                y(e, Re),
                D(e, 1),
                I(e, 0),
                3
            },
            load: function(e) {
                var t = Q(e, 1)
                  , r = ve(e, 3, "bt")
                  , n = O(e, 4) ? 0 : 4
                  , a = void 0;
                if (null !== t) {
                    var u = ve(e, 2, t);
                    a = ce(e, t, t.length, u, r)
                } else {
                    var o = ve(e, 2, "=(load)");
                    oe(e, 1, s),
                    Y(e, 5),
                    a = m(e, Ie, null, o, r)
                }
                return we(e, a, n)
            },
            loadfile: function(e) {
                var t = ve(e, 1, null)
                  , r = ve(e, 2, null)
                  , n = O(e, 3) ? 0 : 3
                  , a = fe(e, t, r);
                return we(e, a, n)
            },
            next: Ne,
            pairs: function(e) {
                return function(e, t, r, n) {
                    return ne(e, 1),
                    ie(e, 1, t) === o ? (y(e, n),
                    D(e, 1),
                    r ? I(e, 0) : P(e)) : (D(e, 1),
                    v(e, 1, 3)),
                    3
                }(e, Te("__pairs", !0), 0, Ne)
            },
            pcall: function(e) {
                ne(e, 1),
                S(e, 1),
                b(e, 1);
                var t = N(e, x(e) - 2, a, 0, 0, ye);
                return ye(e, t, 0)
            },
            print: function(e) {
                var t = x(e);
                A(e, Te("tostring", !0));
                for (var r = 1; r <= t; r++) {
                    D(e, -1),
                    D(e, r),
                    v(e, 1, 1);
                    var n = W(e, -1);
                    if (null === n)
                        return le(e, Te("'tostring' must return a string to 'print'"));
                    r > 1 && xe(Te("\t")),
                    xe(n),
                    R(e, 1)
                }
                return be(),
                0
            },
            rawequal: function(e) {
                return ne(e, 1),
                ne(e, 2),
                S(e, V(e, 1, 2)),
                1
            },
            rawget: function(e) {
                return oe(e, 1, _),
                ne(e, 2),
                Y(e, 2),
                G(e, 1),
                1
            },
            rawlen: function(e) {
                var t = $(e, 1);
                return re(e, t === _ || t === c, 1, "table or string expected"),
                I(e, B(e, 1)),
                1
            },
            rawset: function(e) {
                return oe(e, 1, _),
                ne(e, 2),
                ne(e, 3),
                Y(e, 3),
                K(e, 1),
                1
            },
            select: function(e) {
                var t = x(e);
                if ($(e, 1) === c && 35 === Q(e, 1)[0])
                    return I(e, t - 1),
                    1;
                var r = ae(e, 1);
                return r < 0 ? r = t + r : r > t && (r = t),
                re(e, 1 <= r, 1, "index out of range"),
                t - r
            },
            setmetatable: function(e) {
                var t = $(e, 2);
                return oe(e, 1, _),
                re(e, t === o || t === _, 2, "nil or table expected"),
                ie(e, 1, Te("__metatable", !0)) !== o ? le(e, Te("cannot change a protected metatable")) : (Y(e, 2),
                z(e, 1),
                1)
            },
            tonumber: function(e) {
                if ($(e, 2) <= 0) {
                    if (ne(e, 1),
                    $(e, 1) === i)
                        return Y(e, 1),
                        1;
                    var t = Q(e, 1);
                    if (null !== t && Z(e, t) === t.length + 1)
                        return 1
                } else {
                    var r = ae(e, 2);
                    oe(e, 1, c);
                    var n = Q(e, 1);
                    re(e, 2 <= r && r <= 36, 2, "base out of range");
                    var a = function(e, t) {
                        try {
                            e = ge(e)
                        } catch (e) {
                            return null
                        }
                        var r = /^[\t\v\f \n\r]*([+-]?)0*([0-9A-Za-z]+)[\t\v\f \n\r]*$/.exec(e);
                        if (!r)
                            return null;
                        var n = parseInt(r[1] + r[2], t);
                        return isNaN(n) ? null : 0 | n
                    }(n, r);
                    if (null !== a)
                        return I(e, a),
                        1
                }
                return P(e),
                1
            },
            tostring: function(e) {
                return ne(e, 1),
                he(e, 1),
                1
            },
            type: function(e) {
                var t = $(e, 1);
                return re(e, t !== l, 1, "value expected"),
                C(e, ee(e, t)),
                1
            },
            xpcall: function(e) {
                var t = x(e);
                oe(e, 2, s),
                S(e, 1),
                D(e, 1),
                j(e, 3, 2);
                var r = N(e, t - 2, a, 2, 2, ye);
                return ye(e, r, 2)
            }
        };
        e.exports.luaopen_base = function(e) {
            return w(e),
            de(e, Pe, 0),
            D(e, -1),
            X(e, -2, Te("_G")),
            M(e, f),
            X(e, -2, Te("_VERSION")),
            1
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(1).lua_pop
          , a = r(4).luaL_requiref
          , u = r(6).to_luastring
          , s = {};
        e.exports.luaL_openlibs = function(e) {
            for (var t in s)
                a(e, u(t), s[t], 1),
                n(e, 1)
        }
        ;
        var o = r(12)
          , l = r(33).luaopen_base
          , i = r(29).luaopen_coroutine
          , c = r(23).luaopen_debug
          , _ = r(24).luaopen_math
          , f = r(22).luaopen_package
          , p = r(27).luaopen_os
          , v = r(26).luaopen_string
          , d = r(28).luaopen_table
          , h = r(25).luaopen_utf8;
        s._G = l,
        s[o.LUA_LOADLIBNAME] = f,
        s[o.LUA_COLIBNAME] = i,
        s[o.LUA_TABLIBNAME] = d,
        s[o.LUA_OSLIBNAME] = p,
        s[o.LUA_STRLIBNAME] = v,
        s[o.LUA_MATHLIBNAME] = _,
        s[o.LUA_UTF8LIBNAME] = h,
        s[o.LUA_DBLIBNAME] = c;
        var L = r(21).luaopen_fengari;
        s[o.LUA_FENGARILIBNAME] = L
    }
    , function(e, t, r) {
        "use strict";
        var n;
        !function() {
            var a = {
                not_string: /[^s]/,
                not_bool: /[^t]/,
                not_type: /[^T]/,
                not_primitive: /[^v]/,
                number: /[diefg]/,
                numeric_arg: /[bcdiefguxX]/,
                json: /[j]/,
                not_json: /[^j]/,
                text: /^[^\x25]+/,
                modulo: /^\x25{2}/,
                placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
                key: /^([a-z_][a-z_\d]*)/i,
                key_access: /^\.([a-z_][a-z_\d]*)/i,
                index_access: /^\[(\d+)\]/,
                sign: /^[\+\-]/
            };
            function u(e) {
                return function(e, t) {
                    var r, n, s, o, l, i, c, _, f, p = 1, v = e.length, d = "";
                    for (n = 0; n < v; n++)
                        if ("string" == typeof e[n])
                            d += e[n];
                        else if (Array.isArray(e[n])) {
                            if ((o = e[n])[2])
                                for (r = t[p],
                                s = 0; s < o[2].length; s++) {
                                    if (!r.hasOwnProperty(o[2][s]))
                                        throw new Error(u('[sprintf] property "%s" does not exist', o[2][s]));
                                    r = r[o[2][s]]
                                }
                            else
                                r = o[1] ? t[o[1]] : t[p++];
                            if (a.not_type.test(o[8]) && a.not_primitive.test(o[8]) && r instanceof Function && (r = r()),
                            a.numeric_arg.test(o[8]) && "number" != typeof r && isNaN(r))
                                throw new TypeError(u("[sprintf] expecting number but found %T", r));
                            switch (a.number.test(o[8]) && (_ = r >= 0),
                            o[8]) {
                            case "b":
                                r = parseInt(r, 10).toString(2);
                                break;
                            case "c":
                                r = String.fromCharCode(parseInt(r, 10));
                                break;
                            case "d":
                            case "i":
                                r = parseInt(r, 10);
                                break;
                            case "j":
                                r = JSON.stringify(r, null, o[6] ? parseInt(o[6]) : 0);
                                break;
                            case "e":
                                r = o[7] ? parseFloat(r).toExponential(o[7]) : parseFloat(r).toExponential();
                                break;
                            case "f":
                                r = o[7] ? parseFloat(r).toFixed(o[7]) : parseFloat(r);
                                break;
                            case "g":
                                r = o[7] ? String(Number(r.toPrecision(o[7]))) : parseFloat(r);
                                break;
                            case "o":
                                r = (parseInt(r, 10) >>> 0).toString(8);
                                break;
                            case "s":
                                r = String(r),
                                r = o[7] ? r.substring(0, o[7]) : r;
                                break;
                            case "t":
                                r = String(!!r),
                                r = o[7] ? r.substring(0, o[7]) : r;
                                break;
                            case "T":
                                r = Object.prototype.toString.call(r).slice(8, -1).toLowerCase(),
                                r = o[7] ? r.substring(0, o[7]) : r;
                                break;
                            case "u":
                                r = parseInt(r, 10) >>> 0;
                                break;
                            case "v":
                                r = r.valueOf(),
                                r = o[7] ? r.substring(0, o[7]) : r;
                                break;
                            case "x":
                                r = (parseInt(r, 10) >>> 0).toString(16);
                                break;
                            case "X":
                                r = (parseInt(r, 10) >>> 0).toString(16).toUpperCase()
                            }
                            a.json.test(o[8]) ? d += r : (!a.number.test(o[8]) || _ && !o[3] ? f = "" : (f = _ ? "+" : "-",
                            r = r.toString().replace(a.sign, "")),
                            i = o[4] ? "0" === o[4] ? "0" : o[4].charAt(1) : " ",
                            c = o[6] - (f + r).length,
                            l = o[6] && c > 0 ? i.repeat(c) : "",
                            d += o[5] ? f + r + l : "0" === i ? f + l + r : l + f + r)
                        }
                    return d
                }(function(e) {
                    if (o[e])
                        return o[e];
                    var t, r = e, n = [], u = 0;
                    for (; r; ) {
                        if (null !== (t = a.text.exec(r)))
                            n.push(t[0]);
                        else if (null !== (t = a.modulo.exec(r)))
                            n.push("%");
                        else {
                            if (null === (t = a.placeholder.exec(r)))
                                throw new SyntaxError("[sprintf] unexpected placeholder");
                            if (t[2]) {
                                u |= 1;
                                var s = []
                                  , l = t[2]
                                  , i = [];
                                if (null === (i = a.key.exec(l)))
                                    throw new SyntaxError("[sprintf] failed to parse named argument key");
                                for (s.push(i[1]); "" !== (l = l.substring(i[0].length)); )
                                    if (null !== (i = a.key_access.exec(l)))
                                        s.push(i[1]);
                                    else {
                                        if (null === (i = a.index_access.exec(l)))
                                            throw new SyntaxError("[sprintf] failed to parse named argument key");
                                        s.push(i[1])
                                    }
                                t[2] = s
                            } else
                                u |= 2;
                            if (3 === u)
                                throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                            n.push(t)
                        }
                        r = r.substring(t[0].length)
                    }
                    return o[e] = n
                }(e), arguments)
            }
            function s(e, t) {
                return u.apply(null, [e].concat(t || []))
            }
            var o = Object.create(null);
            t.sprintf = u,
            t.vsprintf = s,
            "undefined" != typeof window && (window.sprintf = u,
            window.vsprintf = s,
            void 0 === (n = function() {
                return {
                    sprintf: u,
                    vsprintf: s
                }
            }
            .call(t, r, t, e)) || (e.exports = n))
        }()
    }
    , function(e, t, r) {
        "use strict";
        var n = r(0)
          , a = n.LUA_SIGNATURE
          , u = n.LUA_VERSION_MAJOR
          , s = n.LUA_VERSION_MINOR
          , o = n.constant_types
          , l = o.LUA_TBOOLEAN
          , i = o.LUA_TLNGSTR
          , c = o.LUA_TNIL
          , _ = o.LUA_TNUMFLT
          , f = o.LUA_TNUMINT
          , p = o.LUA_TSHRSTR
          , v = n.luastring_of
          , d = v(25, 147, 13, 10, 26, 10)
          , h = 16 * Number(u) + Number(s)
          , L = function e() {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this.L = null,
            this.write = null,
            this.data = null,
            this.strip = NaN,
            this.status = NaN
        }
          , A = function(e, t, r) {
            0 === r.status && t > 0 && (r.status = r.writer(r.L, e, t, r.data))
        }
          , g = function(e, t) {
            A(v(e), 1, t)
        }
          , T = function(e, t) {
            var r = new ArrayBuffer(4);
            new DataView(r).setInt32(0, e, !0);
            var n = new Uint8Array(r);
            A(n, 4, t)
        }
          , x = function(e, t) {
            var r = new ArrayBuffer(4);
            new DataView(r).setInt32(0, e, !0);
            var n = new Uint8Array(r);
            A(n, 4, t)
        }
          , b = function(e, t) {
            var r = new ArrayBuffer(8);
            new DataView(r).setFloat64(0, e, !0);
            var n = new Uint8Array(r);
            A(n, 8, t)
        }
          , k = function(e, t) {
            if (null === e)
                g(0, t);
            else {
                var r = e.tsslen() + 1
                  , n = e.getstr();
                r < 255 ? g(r, t) : (g(255, t),
                x(r, t)),
                A(n, r - 1, t)
            }
        }
          , O = function(e, t) {
            var r = e.p.length;
            T(r, t);
            for (var n = 0; n < r; n++)
                E(e.p[n], e.source, t)
        }
          , E = function(e, t, r) {
            r.strip || e.source === t ? k(null, r) : k(e.source, r),
            T(e.linedefined, r),
            T(e.lastlinedefined, r),
            g(e.numparams, r),
            g(e.is_vararg ? 1 : 0, r),
            g(e.maxstacksize, r),
            function(e, t) {
                var r = e.code.map(function(e) {
                    return e.code
                });
                T(r.length, t);
                for (var n = 0; n < r.length; n++)
                    T(r[n], t)
            }(e, r),
            function(e, t) {
                var r = e.k.length;
                T(r, t);
                for (var n = 0; n < r; n++) {
                    var a = e.k[n];
                    switch (g(a.ttype(), t),
                    a.ttype()) {
                    case c:
                        break;
                    case l:
                        g(a.value ? 1 : 0, t);
                        break;
                    case _:
                        b(a.value, t);
                        break;
                    case f:
                        x(a.value, t);
                        break;
                    case p:
                    case i:
                        k(a.tsvalue(), t)
                    }
                }
            }(e, r),
            function(e, t) {
                var r = e.upvalues.length;
                T(r, t);
                for (var n = 0; n < r; n++)
                    g(e.upvalues[n].instack ? 1 : 0, t),
                    g(e.upvalues[n].idx, t)
            }(e, r),
            O(e, r),
            function(e, t) {
                var r = t.strip ? 0 : e.lineinfo.length;
                T(r, t);
                for (var n = 0; n < r; n++)
                    T(e.lineinfo[n], t);
                r = t.strip ? 0 : e.locvars.length,
                T(r, t);
                for (var a = 0; a < r; a++)
                    k(e.locvars[a].varname, t),
                    T(e.locvars[a].startpc, t),
                    T(e.locvars[a].endpc, t);
                r = t.strip ? 0 : e.upvalues.length,
                T(r, t);
                for (var u = 0; u < r; u++)
                    k(e.upvalues[u].name, t)
            }(e, r)
        };
        e.exports.luaU_dump = function(e, t, r, n, u) {
            var s = new L;
            return s.L = e,
            s.writer = r,
            s.data = n,
            s.strip = u,
            s.status = 0,
            function(e) {
                A(a, a.length, e),
                g(h, e),
                g(0, e),
                A(d, d.length, e),
                g(4, e),
                g(4, e),
                g(4, e),
                g(4, e),
                g(8, e),
                x(22136, e),
                b(370.5, e)
            }(s),
            g(t.upvalues.length, s),
            E(t, null, s),
            s.status
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }();
        var a = r(0)
          , u = a.LUA_SIGNATURE
          , s = a.constant_types
          , o = s.LUA_TBOOLEAN
          , l = s.LUA_TLNGSTR
          , i = s.LUA_TNIL
          , c = s.LUA_TNUMFLT
          , _ = s.LUA_TNUMINT
          , f = s.LUA_TSHRSTR
          , p = a.thread_status.LUA_ERRSYNTAX
          , v = a.is_luastring
          , d = a.luastring_eq
          , h = a.to_luastring
          , L = r(7)
          , A = r(16)
          , g = r(5)
          , T = r(13)
          , x = T.MAXARG_sBx
          , b = T.POS_A
          , k = T.POS_Ax
          , O = T.POS_B
          , E = T.POS_Bx
          , m = T.POS_C
          , U = T.POS_OP
          , N = T.SIZE_A
          , R = T.SIZE_Ax
          , S = T.SIZE_B
          , y = T.SIZE_Bx
          , w = T.SIZE_C
          , I = T.SIZE_OP
          , M = r(2).lua_assert
          , P = r(8).luaS_bless
          , C = r(17)
          , D = C.luaZ_read
          , V = C.ZIO
          , G = [25, 147, 13, 10, 26, 10]
          , B = function() {
            function e(t, r, n) {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.intSize = 4,
                this.size_tSize = 4,
                this.instructionSize = 4,
                this.integerSize = 4,
                this.numberSize = 8,
                M(r instanceof V, "BytecodeParser only operates on a ZIO"),
                M(v(n)),
                64 === n[0] || 61 === n[0] ? this.name = n.subarray(1) : n[0] == u[0] ? this.name = h("binary string", !0) : this.name = n,
                this.L = t,
                this.Z = r,
                this.arraybuffer = new ArrayBuffer(Math.max(this.intSize, this.size_tSize, this.instructionSize, this.integerSize, this.numberSize)),
                this.dv = new DataView(this.arraybuffer),
                this.u8 = new Uint8Array(this.arraybuffer)
            }
            return n(e, [{
                key: "read",
                value: function(e) {
                    var t = new Uint8Array(e);
                    return 0 !== D(this.Z, t, 0, e) && this.error("truncated"),
                    t
                }
            }, {
                key: "readByte",
                value: function() {
                    return 0 !== D(this.Z, this.u8, 0, 1) && this.error("truncated"),
                    this.u8[0]
                }
            }, {
                key: "readInteger",
                value: function() {
                    return 0 !== D(this.Z, this.u8, 0, this.integerSize) && this.error("truncated"),
                    this.dv.getInt32(0, !0)
                }
            }, {
                key: "readSize_t",
                value: function() {
                    return this.readInteger()
                }
            }, {
                key: "readInt",
                value: function() {
                    return 0 !== D(this.Z, this.u8, 0, this.intSize) && this.error("truncated"),
                    this.dv.getInt32(0, !0)
                }
            }, {
                key: "readNumber",
                value: function() {
                    return 0 !== D(this.Z, this.u8, 0, this.numberSize) && this.error("truncated"),
                    this.dv.getFloat64(0, !0)
                }
            }, {
                key: "readString",
                value: function() {
                    var e = Math.max(this.readByte() - 1, 0);
                    return e + 1 === 255 && (e = this.readSize_t() - 1),
                    0 === e ? null : P(this.L, this.read(e))
                }
            }, {
                key: "readInstruction",
                value: function() {
                    return 0 !== D(this.Z, this.u8, 0, this.instructionSize) && this.error("truncated"),
                    this.dv.getUint32(0, !0)
                }
            }, {
                key: "readCode",
                value: function(t) {
                    for (var r = this.readInt(), n = e, a = 0; a < r; a++) {
                        var u = this.readInstruction();
                        t.code[a] = {
                            code: u,
                            opcode: u >> U & n.MASK1(I, 0),
                            A: u >> b & n.MASK1(N, 0),
                            B: u >> O & n.MASK1(S, 0),
                            C: u >> m & n.MASK1(w, 0),
                            Bx: u >> E & n.MASK1(y, 0),
                            Ax: u >> k & n.MASK1(R, 0),
                            sBx: (u >> E & n.MASK1(y, 0)) - x
                        }
                    }
                }
            }, {
                key: "readUpvalues",
                value: function(e) {
                    for (var t = this.readInt(), r = 0; r < t; r++)
                        e.upvalues[r] = {
                            name: null,
                            instack: this.readByte(),
                            idx: this.readByte()
                        }
                }
            }, {
                key: "readConstants",
                value: function(e) {
                    for (var t = this.readInt(), r = 0; r < t; r++) {
                        var n = this.readByte();
                        switch (n) {
                        case i:
                            e.k.push(new g.TValue(i,null));
                            break;
                        case o:
                            e.k.push(new g.TValue(o,0 !== this.readByte()));
                            break;
                        case c:
                            e.k.push(new g.TValue(c,this.readNumber()));
                            break;
                        case _:
                            e.k.push(new g.TValue(_,this.readInteger()));
                            break;
                        case f:
                        case l:
                            e.k.push(new g.TValue(l,this.readString()));
                            break;
                        default:
                            this.error("unrecognized constant '" + n + "'")
                        }
                    }
                }
            }, {
                key: "readProtos",
                value: function(e) {
                    for (var t = this.readInt(), r = 0; r < t; r++)
                        e.p[r] = new A.Proto(this.L),
                        this.readFunction(e.p[r], e.source)
                }
            }, {
                key: "readDebug",
                value: function(e) {
                    for (var t = this.readInt(), r = 0; r < t; r++)
                        e.lineinfo[r] = this.readInt();
                    t = this.readInt();
                    for (var n = 0; n < t; n++)
                        e.locvars[n] = {
                            varname: this.readString(),
                            startpc: this.readInt(),
                            endpc: this.readInt()
                        };
                    t = this.readInt();
                    for (var a = 0; a < t; a++)
                        e.upvalues[a].name = this.readString()
                }
            }, {
                key: "readFunction",
                value: function(e, t) {
                    e.source = this.readString(),
                    null === e.source && (e.source = t),
                    e.linedefined = this.readInt(),
                    e.lastlinedefined = this.readInt(),
                    e.numparams = this.readByte(),
                    e.is_vararg = 0 !== this.readByte(),
                    e.maxstacksize = this.readByte(),
                    this.readCode(e),
                    this.readConstants(e),
                    this.readUpvalues(e),
                    this.readProtos(e),
                    this.readDebug(e)
                }
            }, {
                key: "checkliteral",
                value: function(e, t) {
                    var r = this.read(e.length);
                    d(r, e) || this.error(t)
                }
            }, {
                key: "checkHeader",
                value: function() {
                    this.checkliteral(u.subarray(1), "not a"),
                    83 !== this.readByte() && this.error("version mismatch in"),
                    0 !== this.readByte() && this.error("format mismatch in"),
                    this.checkliteral(G, "corrupted"),
                    this.intSize = this.readByte(),
                    this.size_tSize = this.readByte(),
                    this.instructionSize = this.readByte(),
                    this.integerSize = this.readByte(),
                    this.numberSize = this.readByte(),
                    this.checksize(this.intSize, 4, "int"),
                    this.checksize(this.size_tSize, 4, "size_t"),
                    this.checksize(this.instructionSize, 4, "instruction"),
                    this.checksize(this.integerSize, 4, "integer"),
                    this.checksize(this.numberSize, 8, "number"),
                    22136 !== this.readInteger() && this.error("endianness mismatch in"),
                    370.5 !== this.readNumber() && this.error("float format mismatch in")
                }
            }, {
                key: "error",
                value: function(e) {
                    g.luaO_pushfstring(this.L, h("%s: %s precompiled chunk"), this.name, h(e)),
                    L.luaD_throw(this.L, p)
                }
            }, {
                key: "checksize",
                value: function(e, t, r) {
                    e !== t && this.error(r + " size mismatch in")
                }
            }], [{
                key: "MASK1",
                value: function(e, t) {
                    return ~(-1 << e) << t
                }
            }, {
                key: "MASK0",
                value: function(t, r) {
                    return ~e.MASK1(t, r)
                }
            }]),
            e
        }();
        e.exports.luaU_undump = function(e, t, r) {
            var n = new B(e,t,r);
            n.checkHeader();
            var a = A.luaF_newLclosure(e, n.readByte());
            return L.luaD_inctop(e),
            e.stack[e.top - 1].setclLvalue(a),
            a.p = new A.Proto(e),
            n.readFunction(a.p, null),
            M(a.nupvalues === a.p.upvalues.length),
            a
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(0)
          , a = n.LUA_MULTRET
          , u = n.LUA_OPADD
          , s = n.LUA_OPBAND
          , o = n.LUA_OPBNOT
          , l = n.LUA_OPBOR
          , i = n.LUA_OPBXOR
          , c = n.LUA_OPDIV
          , _ = n.LUA_OPIDIV
          , f = n.LUA_OPMOD
          , p = n.LUA_OPSHL
          , v = n.LUA_OPSHR
          , d = n.LUA_OPUNM
          , h = n.constant_types
          , L = h.LUA_TBOOLEAN
          , A = h.LUA_TLIGHTUSERDATA
          , g = h.LUA_TLNGSTR
          , T = h.LUA_TNIL
          , x = h.LUA_TNUMFLT
          , b = h.LUA_TNUMINT
          , k = h.LUA_TTABLE
          , O = n.to_luastring
          , E = r(2).lua_assert
          , m = r(19)
          , U = r(5)
          , N = r(13)
          , R = r(30)
          , S = r(9)
          , y = r(14)
          , w = N.OpCodesI
          , I = U.TValue
          , M = {
            OPR_ADD: 0,
            OPR_SUB: 1,
            OPR_MUL: 2,
            OPR_MOD: 3,
            OPR_POW: 4,
            OPR_DIV: 5,
            OPR_IDIV: 6,
            OPR_BAND: 7,
            OPR_BOR: 8,
            OPR_BXOR: 9,
            OPR_SHL: 10,
            OPR_SHR: 11,
            OPR_CONCAT: 12,
            OPR_EQ: 13,
            OPR_LT: 14,
            OPR_LE: 15,
            OPR_NE: 16,
            OPR_GT: 17,
            OPR_GE: 18,
            OPR_AND: 19,
            OPR_OR: 20,
            OPR_NOBINOPR: 21
        }
          , P = {
            OPR_MINUS: 0,
            OPR_BNOT: 1,
            OPR_NOT: 2,
            OPR_LEN: 3,
            OPR_NOUNOPR: 4
        }
          , C = function(e) {
            return e.t !== e.f
        }
          , D = function(e, t) {
            var r = R.expkind;
            if (C(e))
                return !1;
            switch (e.k) {
            case r.VKINT:
                return !t || new I(b,e.u.ival);
            case r.VKFLT:
                return !t || new I(x,e.u.nval);
            default:
                return !1
            }
        }
          , V = function(e, t, r) {
            var n = void 0
              , a = t + r - 1;
            if (e.pc > e.lasttarget && (n = e.f.code[e.pc - 1]).opcode === w.OP_LOADNIL) {
                var u = n.A
                  , s = u + n.B;
                if (u <= t && t <= s + 1 || t <= u && u <= a + 1)
                    return u < t && (t = u),
                    s > a && (a = s),
                    N.SETARG_A(n, t),
                    void N.SETARG_B(n, a - t)
            }
            ee(e, w.OP_LOADNIL, t, r - 1, 0)
        }
          , G = function(e, t) {
            return e.f.code[t.u.info]
        }
          , B = function(e, t) {
            var r = e.f.code[t].sBx;
            return -1 === r ? -1 : t + 1 + r
        }
          , K = function(e, t, r) {
            var n = e.f.code[t]
              , a = r - (t + 1);
            E(-1 !== r),
            Math.abs(a) > N.MAXARG_sBx && m.luaX_syntaxerror(e.ls, O("control structure too long", !0)),
            N.SETARG_sBx(n, a)
        }
          , F = function(e, t, r) {
            if (-1 === r)
                return t;
            if (-1 === t)
                t = r;
            else {
                for (var n = t, a = B(e, n); -1 !== a; )
                    a = B(e, n = a);
                K(e, n, r)
            }
            return t
        }
          , H = function(e) {
            var t = e.jpc;
            e.jpc = -1;
            var r = re(e, w.OP_JMP, 0, -1);
            return r = F(e, r, t)
        }
          , j = function(e, t, r, n, a) {
            return ee(e, t, r, n, a),
            H(e)
        }
          , X = function(e) {
            return e.lasttarget = e.pc,
            e.pc
        }
          , z = function(e, t) {
            return t >= 1 && N.testTMode(e.f.code[t - 1].opcode) ? t - 1 : t
        }
          , Y = function(e, t) {
            return e.f.code[z(e, t)]
        }
          , J = function(e, t, r) {
            var n = z(e, t)
              , a = e.f.code[n];
            return a.opcode === w.OP_TESTSET && (r !== N.NO_REG && r !== a.B ? N.SETARG_A(a, r) : e.f.code[n] = N.CREATE_ABC(w.OP_TEST, a.B, 0, a.C),
            !0)
        }
          , Z = function(e, t) {
            for (; -1 !== t; t = B(e, t))
                J(e, t, N.NO_REG)
        }
          , q = function(e, t, r, n, a) {
            for (; -1 !== t; ) {
                var u = B(e, t);
                J(e, t, n) ? K(e, t, r) : K(e, t, a),
                t = u
            }
        }
          , W = function(e, t) {
            X(e),
            e.jpc = F(e, e.jpc, t)
        }
          , Q = function(e, t, r) {
            r === e.pc ? W(e, t) : (E(r < e.pc),
            q(e, t, r, N.NO_REG, r))
        }
          , $ = function(e, t) {
            var r = e.f;
            return function(e) {
                q(e, e.jpc, e.pc, N.NO_REG, e.pc),
                e.jpc = -1
            }(e),
            r.code[e.pc] = t,
            r.lineinfo[e.pc] = e.ls.lastline,
            e.pc++
        }
          , ee = function(e, t, r, n, a) {
            return E(N.getOpMode(t) === N.iABC),
            E(N.getBMode(t) !== N.OpArgN || 0 === n),
            E(N.getCMode(t) !== N.OpArgN || 0 === a),
            E(r <= N.MAXARG_A && n <= N.MAXARG_B && a <= N.MAXARG_C),
            $(e, N.CREATE_ABC(t, r, n, a))
        }
          , te = function(e, t, r, n) {
            return E(N.getOpMode(t) === N.iABx || N.getOpMode(t) === N.iAsBx),
            E(N.getCMode(t) === N.OpArgN),
            E(r <= N.MAXARG_A && n <= N.MAXARG_Bx),
            $(e, N.CREATE_ABx(t, r, n))
        }
          , re = function(e, t, r, n) {
            return te(e, t, r, n + N.MAXARG_sBx)
        }
          , ne = function(e, t) {
            return E(t <= N.MAXARG_Ax),
            $(e, N.CREATE_Ax(w.OP_EXTRAARG, t))
        }
          , ae = function(e, t, r) {
            if (r <= N.MAXARG_Bx)
                return te(e, w.OP_LOADK, t, r);
            var n = te(e, w.OP_LOADKX, t, 0);
            return ne(e, r),
            n
        }
          , ue = function(e, t) {
            var r = e.freereg + t;
            r > e.f.maxstacksize && (r >= 255 && m.luaX_syntaxerror(e.ls, O("function or expression needs too many registers", !0)),
            e.f.maxstacksize = r)
        }
          , se = function(e, t) {
            ue(e, t),
            e.freereg += t
        }
          , oe = function(e, t) {
            !N.ISK(t) && t >= e.nactvar && (e.freereg--,
            E(t === e.freereg))
        }
          , le = function(e, t) {
            t.k === R.expkind.VNONRELOC && oe(e, t.u.info)
        }
          , ie = function(e, t, r) {
            var n = t.k === R.expkind.VNONRELOC ? t.u.info : -1
              , a = r.k === R.expkind.VNONRELOC ? r.u.info : -1;
            n > a ? (oe(e, n),
            oe(e, a)) : (oe(e, a),
            oe(e, n))
        }
          , ce = function(e, t, r) {
            var n = e.f
              , a = S.luaH_set(e.L, e.ls.h, t);
            if (a.ttisinteger()) {
                var u = a.value;
                if (u < e.nk && n.k[u].ttype() === r.ttype() && n.k[u].value === r.value)
                    return u
            }
            var s = e.nk;
            return a.setivalue(s),
            n.k[s] = r,
            e.nk++,
            s
        }
          , _e = function(e, t) {
            var r = new I(A,t)
              , n = new I(b,t);
            return ce(e, r, n)
        }
          , fe = function(e, t) {
            var r = new I(x,t);
            return ce(e, r, r)
        }
          , pe = function(e, t) {
            var r = new I(L,t);
            return ce(e, r, r)
        }
          , ve = function(e, t, r) {
            var n = R.expkind;
            if (t.k === n.VCALL)
                N.SETARG_C(G(e, t), r + 1);
            else if (t.k === n.VVARARG) {
                var u = G(e, t);
                N.SETARG_B(u, r + 1),
                N.SETARG_A(u, e.freereg),
                se(e, 1)
            } else
                E(r === a)
        }
          , de = function(e, t) {
            var r = R.expkind;
            t.k === r.VCALL ? (E(2 === G(e, t).C),
            t.k = r.VNONRELOC,
            t.u.info = G(e, t).A) : t.k === r.VVARARG && (N.SETARG_B(G(e, t), 2),
            t.k = r.VRELOCABLE)
        }
          , he = function(e, t) {
            var r = R.expkind;
            switch (t.k) {
            case r.VLOCAL:
                t.k = r.VNONRELOC;
                break;
            case r.VUPVAL:
                t.u.info = ee(e, w.OP_GETUPVAL, 0, t.u.info, 0),
                t.k = r.VRELOCABLE;
                break;
            case r.VINDEXED:
                var n = void 0;
                oe(e, t.u.ind.idx),
                t.u.ind.vt === r.VLOCAL ? (oe(e, t.u.ind.t),
                n = w.OP_GETTABLE) : (E(t.u.ind.vt === r.VUPVAL),
                n = w.OP_GETTABUP),
                t.u.info = ee(e, n, 0, t.u.ind.t, t.u.ind.idx),
                t.k = r.VRELOCABLE;
                break;
            case r.VVARARG:
            case r.VCALL:
                de(e, t)
            }
        }
          , Le = function(e, t, r, n) {
            return X(e),
            ee(e, w.OP_LOADBOOL, t, r, n)
        }
          , Ae = function(e, t, r) {
            var n = R.expkind;
            switch (he(e, t),
            t.k) {
            case n.VNIL:
                V(e, r, 1);
                break;
            case n.VFALSE:
            case n.VTRUE:
                ee(e, w.OP_LOADBOOL, r, t.k === n.VTRUE, 0);
                break;
            case n.VK:
                ae(e, r, t.u.info);
                break;
            case n.VKFLT:
                ae(e, r, fe(e, t.u.nval));
                break;
            case n.VKINT:
                ae(e, r, _e(e, t.u.ival));
                break;
            case n.VRELOCABLE:
                var a = G(e, t);
                N.SETARG_A(a, r);
                break;
            case n.VNONRELOC:
                r !== t.u.info && ee(e, w.OP_MOVE, r, t.u.info, 0);
                break;
            default:
                return void E(t.k === n.VJMP)
            }
            t.u.info = r,
            t.k = n.VNONRELOC
        }
          , ge = function(e, t) {
            t.k !== R.expkind.VNONRELOC && (se(e, 1),
            Ae(e, t, e.freereg - 1))
        }
          , Te = function(e, t) {
            for (; -1 !== t; t = B(e, t)) {
                if (Y(e, t).opcode !== w.OP_TESTSET)
                    return !0
            }
            return !1
        }
          , xe = function(e, t, r) {
            var n = R.expkind;
            if (Ae(e, t, r),
            t.k === n.VJMP && (t.t = F(e, t.t, t.u.info)),
            C(t)) {
                var a, u = -1, s = -1;
                if (Te(e, t.t) || Te(e, t.f)) {
                    var o = t.k === n.VJMP ? -1 : H(e);
                    u = Le(e, r, 0, 1),
                    s = Le(e, r, 1, 0),
                    W(e, o)
                }
                a = X(e),
                q(e, t.f, a, r, u),
                q(e, t.t, a, r, s)
            }
            t.f = t.t = -1,
            t.u.info = r,
            t.k = n.VNONRELOC
        }
          , be = function(e, t) {
            he(e, t),
            le(e, t),
            se(e, 1),
            xe(e, t, e.freereg - 1)
        }
          , ke = function(e, t) {
            if (he(e, t),
            t.k === R.expkind.VNONRELOC) {
                if (!C(t))
                    return t.u.info;
                if (t.u.info >= e.nactvar)
                    return xe(e, t, t.u.info),
                    t.u.info
            }
            return be(e, t),
            t.u.info
        }
          , Oe = function(e, t) {
            C(t) ? ke(e, t) : he(e, t)
        }
          , Ee = function(e, t) {
            var r = R.expkind
              , n = !1;
            switch (Oe(e, t),
            t.k) {
            case r.VTRUE:
                t.u.info = pe(e, !0),
                n = !0;
                break;
            case r.VFALSE:
                t.u.info = pe(e, !1),
                n = !0;
                break;
            case r.VNIL:
                t.u.info = function(e) {
                    var t = new I(T,null)
                      , r = new I(k,e.ls.h);
                    return ce(e, r, t)
                }(e),
                n = !0;
                break;
            case r.VKINT:
                t.u.info = _e(e, t.u.ival),
                n = !0;
                break;
            case r.VKFLT:
                t.u.info = fe(e, t.u.nval),
                n = !0;
                break;
            case r.VK:
                n = !0
            }
            return n && (t.k = r.VK,
            t.u.info <= N.MAXINDEXRK) ? N.RKASK(t.u.info) : ke(e, t)
        }
          , me = function(e, t) {
            var r = Y(e, t.u.info);
            E(N.testTMode(r.opcode) && r.opcode !== w.OP_TESTSET && r.opcode !== w.OP_TEST),
            N.SETARG_A(r, !r.A)
        }
          , Ue = function(e, t, r) {
            if (t.k === R.expkind.VRELOCABLE) {
                var n = G(e, t);
                if (n.opcode === w.OP_NOT)
                    return e.pc--,
                    j(e, w.OP_TEST, n.B, 0, !r)
            }
            return ge(e, t),
            le(e, t),
            j(e, w.OP_TESTSET, N.NO_REG, t.u.info, r)
        }
          , Ne = function(e, t) {
            var r = R.expkind
              , n = void 0;
            switch (he(e, t),
            t.k) {
            case r.VJMP:
                me(e, t),
                n = t.u.info;
                break;
            case r.VK:
            case r.VKFLT:
            case r.VKINT:
            case r.VTRUE:
                n = -1;
                break;
            default:
                n = Ue(e, t, 0)
            }
            t.f = F(e, t.f, n),
            W(e, t.t),
            t.t = -1
        }
          , Re = function(e, t) {
            var r = R.expkind
              , n = void 0;
            switch (he(e, t),
            t.k) {
            case r.VJMP:
                n = t.u.info;
                break;
            case r.VNIL:
            case r.VFALSE:
                n = -1;
                break;
            default:
                n = Ue(e, t, 1)
            }
            t.t = F(e, t.t, n),
            W(e, t.f),
            t.f = -1
        }
          , Se = function(e, t, r) {
            var n, a = R.expkind, u = void 0;
            if (!(n = D(t, !0)) || !(u = D(r, !0)) || !function(e, t, r) {
                switch (e) {
                case s:
                case l:
                case i:
                case p:
                case v:
                case o:
                    return !1 !== y.tointeger(t) && !1 !== y.tointeger(r);
                case c:
                case _:
                case f:
                    return 0 !== r.value;
                default:
                    return 1
                }
            }(e, n, u))
                return 0;
            var d = new I;
            if (U.luaO_arith(null, e, n, u, d),
            d.ttisinteger())
                t.k = a.VKINT,
                t.u.ival = d.value;
            else {
                var h = d.value;
                if (isNaN(h) || 0 === h)
                    return !1;
                t.k = a.VKFLT,
                t.u.nval = h
            }
            return !0
        }
          , ye = function(e, t, r, n, a) {
            var u = Ee(e, n)
              , s = Ee(e, r);
            ie(e, r, n),
            r.u.info = ee(e, t, 0, s, u),
            r.k = R.expkind.VRELOCABLE,
            we(e, a)
        }
          , we = function(e, t) {
            e.f.lineinfo[e.pc - 1] = t
        };
        e.exports.BinOpr = M,
        e.exports.NO_JUMP = -1,
        e.exports.UnOpr = P,
        e.exports.getinstruction = G,
        e.exports.luaK_checkstack = ue,
        e.exports.luaK_code = $,
        e.exports.luaK_codeABC = ee,
        e.exports.luaK_codeABx = te,
        e.exports.luaK_codeAsBx = re,
        e.exports.luaK_codek = ae,
        e.exports.luaK_concat = F,
        e.exports.luaK_dischargevars = he,
        e.exports.luaK_exp2RK = Ee,
        e.exports.luaK_exp2anyreg = ke,
        e.exports.luaK_exp2anyregup = function(e, t) {
            (t.k !== R.expkind.VUPVAL || C(t)) && ke(e, t)
        }
        ,
        e.exports.luaK_exp2nextreg = be,
        e.exports.luaK_exp2val = Oe,
        e.exports.luaK_fixline = we,
        e.exports.luaK_getlabel = X,
        e.exports.luaK_goiffalse = Re,
        e.exports.luaK_goiftrue = Ne,
        e.exports.luaK_indexed = function(e, t, r) {
            var n = R.expkind;
            E(!C(t) && (R.vkisinreg(t.k) || t.k === n.VUPVAL)),
            t.u.ind.t = t.u.info,
            t.u.ind.idx = Ee(e, r),
            t.u.ind.vt = t.k === n.VUPVAL ? n.VUPVAL : n.VLOCAL,
            t.k = n.VINDEXED
        }
        ,
        e.exports.luaK_infix = function(e, t, r) {
            switch (t) {
            case M.OPR_AND:
                Ne(e, r);
                break;
            case M.OPR_OR:
                Re(e, r);
                break;
            case M.OPR_CONCAT:
                be(e, r);
                break;
            case M.OPR_ADD:
            case M.OPR_SUB:
            case M.OPR_MUL:
            case M.OPR_DIV:
            case M.OPR_IDIV:
            case M.OPR_MOD:
            case M.OPR_POW:
            case M.OPR_BAND:
            case M.OPR_BOR:
            case M.OPR_BXOR:
            case M.OPR_SHL:
            case M.OPR_SHR:
                D(r, !1) || Ee(e, r);
                break;
            default:
                Ee(e, r)
            }
        }
        ,
        e.exports.luaK_intK = _e,
        e.exports.luaK_jump = H,
        e.exports.luaK_jumpto = function(e, t) {
            return Q(e, H(e), t)
        }
        ,
        e.exports.luaK_nil = V,
        e.exports.luaK_numberK = fe,
        e.exports.luaK_patchclose = function(e, t, r) {
            for (r++; -1 !== t; t = B(e, t)) {
                var n = e.f.code[t];
                E(n.opcode === w.OP_JMP && (0 === n.A || n.A >= r)),
                N.SETARG_A(n, r)
            }
        }
        ,
        e.exports.luaK_patchlist = Q,
        e.exports.luaK_patchtohere = W,
        e.exports.luaK_posfix = function(e, t, r, n, a) {
            var s = R.expkind;
            switch (t) {
            case M.OPR_AND:
                E(-1 === r.t),
                he(e, n),
                n.f = F(e, n.f, r.f),
                r.to(n);
                break;
            case M.OPR_OR:
                E(-1 === r.f),
                he(e, n),
                n.t = F(e, n.t, r.t),
                r.to(n);
                break;
            case M.OPR_CONCAT:
                Oe(e, n);
                var o = G(e, n);
                n.k === s.VRELOCABLE && o.opcode === w.OP_CONCAT ? (E(r.u.info === o.B - 1),
                le(e, r),
                N.SETARG_B(o, r.u.info),
                r.k = s.VRELOCABLE,
                r.u.info = n.u.info) : (be(e, n),
                ye(e, w.OP_CONCAT, r, n, a));
                break;
            case M.OPR_ADD:
            case M.OPR_SUB:
            case M.OPR_MUL:
            case M.OPR_DIV:
            case M.OPR_IDIV:
            case M.OPR_MOD:
            case M.OPR_POW:
            case M.OPR_BAND:
            case M.OPR_BOR:
            case M.OPR_BXOR:
            case M.OPR_SHL:
            case M.OPR_SHR:
                Se(t + u, r, n) || ye(e, t + w.OP_ADD, r, n, a);
                break;
            case M.OPR_EQ:
            case M.OPR_LT:
            case M.OPR_LE:
            case M.OPR_NE:
            case M.OPR_GT:
            case M.OPR_GE:
                !function(e, t, r, n) {
                    var a = R.expkind
                      , u = void 0;
                    r.k === a.VK ? u = N.RKASK(r.u.info) : (E(r.k === a.VNONRELOC),
                    u = r.u.info);
                    var s = Ee(e, n);
                    switch (ie(e, r, n),
                    t) {
                    case M.OPR_NE:
                        r.u.info = j(e, w.OP_EQ, 0, u, s);
                        break;
                    case M.OPR_GT:
                    case M.OPR_GE:
                        var o = t - M.OPR_NE + w.OP_EQ;
                        r.u.info = j(e, o, 1, s, u);
                        break;
                    default:
                        var l = t - M.OPR_EQ + w.OP_EQ;
                        r.u.info = j(e, l, 1, u, s)
                    }
                    r.k = a.VJMP
                }(e, t, r, n)
            }
            return r
        }
        ,
        e.exports.luaK_prefix = function(e, t, r, n) {
            var a = new R.expdesc;
            switch (a.k = R.expkind.VKINT,
            a.u.ival = a.u.nval = a.u.info = 0,
            a.t = -1,
            a.f = -1,
            t) {
            case P.OPR_MINUS:
            case P.OPR_BNOT:
                if (Se(t + d, r, a))
                    break;
            case P.OPR_LEN:
                !function(e, t, r, n) {
                    var a = ke(e, r);
                    le(e, r),
                    r.u.info = ee(e, t, 0, a, 0),
                    r.k = R.expkind.VRELOCABLE,
                    we(e, n)
                }(e, t + w.OP_UNM, r, n);
                break;
            case P.OPR_NOT:
                !function(e, t) {
                    var r = R.expkind;
                    switch (he(e, t),
                    t.k) {
                    case r.VNIL:
                    case r.VFALSE:
                        t.k = r.VTRUE;
                        break;
                    case r.VK:
                    case r.VKFLT:
                    case r.VKINT:
                    case r.VTRUE:
                        t.k = r.VFALSE;
                        break;
                    case r.VJMP:
                        me(e, t);
                        break;
                    case r.VRELOCABLE:
                    case r.VNONRELOC:
                        ge(e, t),
                        le(e, t),
                        t.u.info = ee(e, w.OP_NOT, 0, t.u.info, 0),
                        t.k = r.VRELOCABLE
                    }
                    var n = t.f;
                    t.f = t.t,
                    t.t = n,
                    Z(e, t.f),
                    Z(e, t.t)
                }(e, r)
            }
        }
        ,
        e.exports.luaK_reserveregs = se,
        e.exports.luaK_ret = function(e, t, r) {
            ee(e, w.OP_RETURN, t, r + 1, 0)
        }
        ,
        e.exports.luaK_self = function(e, t, r) {
            ke(e, t);
            var n = t.u.info;
            le(e, t),
            t.u.info = e.freereg,
            t.k = R.expkind.VNONRELOC,
            se(e, 2),
            ee(e, w.OP_SELF, t.u.info, n, Ee(e, r)),
            le(e, r)
        }
        ,
        e.exports.luaK_setlist = function(e, t, r, n) {
            var u = (r - 1) / N.LFIELDS_PER_FLUSH + 1
              , s = n === a ? 0 : n;
            E(0 !== n && n <= N.LFIELDS_PER_FLUSH),
            u <= N.MAXARG_C ? ee(e, w.OP_SETLIST, t, s, u) : u <= N.MAXARG_Ax ? (ee(e, w.OP_SETLIST, t, s, 0),
            ne(e, u)) : m.luaX_syntaxerror(e.ls, O("constructor too long", !0)),
            e.freereg = t + 1
        }
        ,
        e.exports.luaK_setmultret = function(e, t) {
            ve(e, t, a)
        }
        ,
        e.exports.luaK_setoneret = de,
        e.exports.luaK_setreturns = ve,
        e.exports.luaK_storevar = function(e, t, r) {
            var n = R.expkind;
            switch (t.k) {
            case n.VLOCAL:
                return le(e, r),
                void xe(e, r, t.u.info);
            case n.VUPVAL:
                var a = ke(e, r);
                ee(e, w.OP_SETUPVAL, a, t.u.info, 0);
                break;
            case n.VINDEXED:
                var u = t.u.ind.vt === n.VLOCAL ? w.OP_SETTABLE : w.OP_SETTABUP
                  , s = Ee(e, r);
                ee(e, u, t.u.ind.t, t.u.ind.idx, s)
            }
            le(e, r)
        }
        ,
        e.exports.luaK_stringK = function(e, t) {
            var r = new I(g,t);
            return ce(e, r, r)
        }
    }
    , function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.L = t.interop = t.lualib = t.lauxlib = t.lua = t.to_uristring = t.to_luastring = t.to_jsstring = t.luastring_of = t.luastring_indexOf = t.luastring_eq = t.FENGARI_VERSION_RELEASE = t.FENGARI_VERSION_NUM = t.FENGARI_VERSION_MINOR = t.FENGARI_VERSION_MAJOR = t.FENGARI_VERSION = t.FENGARI_RELEASE = t.FENGARI_COPYRIGHT = t.FENGARI_AUTHORS = void 0,
        t.load = function(e, t) {
            if ("string" == typeof e)
                e = (0,
                n.to_luastring)(e);
            else if (!(e instanceof Uint8Array))
                throw new TypeError("expects an array of bytes or javascript string");
            t = t ? (0,
            n.to_luastring)(t) : null;
            var r = b(R, e, null, t)
              , a = void 0;
            a = r === s ? new SyntaxError(x(R, -1)) : N(R, -1);
            if (h(R, 1),
            r !== o)
                throw a;
            return a
        }
        ;
        var n = r(20)
          , a = function(e) {
            if (e && e.__esModule)
                return e;
            var t = {};
            if (null != e)
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t.default = e,
            t
        }(r(32));
        var u = n.lua.LUA_ERRRUN
          , s = n.lua.LUA_ERRSYNTAX
          , o = n.lua.LUA_OK
          , l = n.lua.LUA_VERSION_MAJOR
          , i = n.lua.LUA_VERSION_MINOR
          , c = n.lua.lua_Debug
          , _ = n.lua.lua_getinfo
          , f = n.lua.lua_getstack
          , p = n.lua.lua_gettop
          , v = n.lua.lua_insert
          , d = n.lua.lua_pcall
          , h = n.lua.lua_pop
          , L = n.lua.lua_pushcfunction
          , A = n.lua.lua_pushstring
          , g = n.lua.lua_remove
          , T = n.lua.lua_setglobal
          , x = n.lua.lua_tojsstring
          , b = n.lauxlib.luaL_loadbuffer
          , k = n.lauxlib.luaL_newstate
          , O = n.lauxlib.luaL_requiref
          , E = a.checkjs
          , m = a.luaopen_js
          , U = a.push
          , N = a.tojs;
        t.FENGARI_AUTHORS = n.FENGARI_AUTHORS,
        t.FENGARI_COPYRIGHT = n.FENGARI_COPYRIGHT,
        t.FENGARI_RELEASE = n.FENGARI_RELEASE,
        t.FENGARI_VERSION = n.FENGARI_VERSION,
        t.FENGARI_VERSION_MAJOR = n.FENGARI_VERSION_MAJOR,
        t.FENGARI_VERSION_MINOR = n.FENGARI_VERSION_MINOR,
        t.FENGARI_VERSION_NUM = n.FENGARI_VERSION_NUM,
        t.FENGARI_VERSION_RELEASE = n.FENGARI_VERSION_RELEASE,
        t.luastring_eq = n.luastring_eq,
        t.luastring_indexOf = n.luastring_indexOf,
        t.luastring_of = n.luastring_of,
        t.to_jsstring = n.to_jsstring,
        t.to_luastring = n.to_luastring,
        t.to_uristring = n.to_uristring,
        t.lua = n.lua,
        t.lauxlib = n.lauxlib,
        t.lualib = n.lualib,
        t.interop = a;
        var R = t.L = k();
        if (n.lualib.luaL_openlibs(R),
        O(R, (0,
        n.to_luastring)("js"), m, 1),
        h(R, 1),
        A(R, (0,
        n.to_luastring)(n.FENGARI_COPYRIGHT)),
        T(R, (0,
        n.to_luastring)("_COPYRIGHT")),
        "undefined" != typeof document && document instanceof HTMLDocument) {
            var S = function(e) {
                var t = new c;
                return f(e, 2, t) && _(e, (0,
                n.to_luastring)("Sl"), t),
                U(e, new ErrorEvent("error",{
                    bubbles: !0,
                    cancelable: !0,
                    message: x(e, 1),
                    error: N(e, 1),
                    filename: t.short_src ? (0,
                    n.to_jsstring)(t.short_src) : void 0,
                    lineno: t.currentline > 0 ? t.currentline : void 0
                })),
                1
            }
              , y = function(e, t, r) {
                var n = b(R, t, null, r)
                  , a = void 0;
                if (n === s) {
                    var l = x(R, -1)
                      , i = e.src ? e.src : document.location
                      , c = new SyntaxError(l,i,void 0);
                    a = new ErrorEvent("error",{
                        message: l,
                        error: c,
                        filename: i,
                        lineno: void 0
                    })
                } else if (n === o) {
                    var _ = p(R);
                    L(R, S),
                    v(R, _),
                    Object.defineProperty(document, "currentScript", {
                        value: e,
                        configurable: !0
                    }),
                    n = d(R, 0, 0, _),
                    delete document.currentScript,
                    g(R, _),
                    n === u && (a = E(R, -1))
                }
                n !== o && (void 0 === a && (a = new ErrorEvent("error",{
                    message: x(R, -1),
                    error: N(R, -1)
                })),
                h(R, 1),
                window.dispatchEvent(a) && console.error("uncaught exception", a.error))
            }
              , w = function(e, t, r) {
                if (e.status >= 200 && e.status < 300) {
                    var a = e.response;
                    a = "string" == typeof a ? (0,
                    n.to_luastring)(e.response) : new Uint8Array(a),
                    y(t, a, r)
                } else
                    t.dispatchEvent(new Event("error"))
            }
              , I = /^(.*?\/.*?)([\t ]*;.*)?$/
              , M = /^(\d+)\.(\d+)$/
              , P = function(e) {
                if ("SCRIPT" === e.tagName) {
                    var t = I.exec(e.type);
                    if (t) {
                        var r = t[1];
                        if ("application/lua" === r || "text/lua" === r) {
                            if (e.hasAttribute("lua-version")) {
                                var a = M.exec(e.getAttribute("lua-version"));
                                if (!a || a[1] !== l || a[2] !== i)
                                    return
                            }
                            !function(e) {
                                if (e.src) {
                                    var t = (0,
                                    n.to_luastring)("@" + e.src);
                                    if ("complete" === document.readyState || e.async)
                                        if ("function" == typeof fetch)
                                            fetch(e.src, {
                                                method: "GET",
                                                credentials: function(e) {
                                                    switch (e) {
                                                    case "anonymous":
                                                        return "omit";
                                                    case "use-credentials":
                                                        return "include";
                                                    default:
                                                        return "same-origin"
                                                    }
                                                }(e.crossorigin),
                                                redirect: "follow",
                                                integrity: e.integrity
                                            }).then(function(e) {
                                                if (e.ok)
                                                    return e.arrayBuffer();
                                                throw new Error("unable to fetch")
                                            }).then(function(r) {
                                                var n = new Uint8Array(r);
                                                y(e, n, t)
                                            }).catch(function(t) {
                                                e.dispatchEvent(new Event("error"))
                                            });
                                        else {
                                            var r = new XMLHttpRequest;
                                            r.open("GET", e.src, !0),
                                            r.responseType = "arraybuffer",
                                            r.onreadystatechange = function() {
                                                4 === r.readyState && w(r, e, t)
                                            }
                                            ,
                                            r.send()
                                        }
                                    else {
                                        var a = new XMLHttpRequest;
                                        a.open("GET", e.src, !1),
                                        a.send(),
                                        w(a, e, t)
                                    }
                                } else {
                                    var u = (0,
                                    n.to_luastring)(e.innerHTML)
                                      , s = e.id ? (0,
                                    n.to_luastring)("=" + e.id) : u;
                                    y(e, u, s)
                                }
                            }(e)
                        }
                    }
                }
            };
            "undefined" != typeof MutationObserver ? new MutationObserver(function(e, t) {
                for (var r = 0; r < e.length; r++)
                    for (var n = e[r], a = 0; a < n.addedNodes.length; a++)
                        P(n.addedNodes[a])
            }
            ).observe(document, {
                childList: !0,
                subtree: !0
            }) : console.warn && console.warn("fengari-web: MutationObserver not found; lua script tags will not be run when inserted");
            Array.prototype.forEach.call(document.querySelectorAll('script[type^="application/lua"], script[type^="text/lua"]'), P)
        }
    }
    ])
});
