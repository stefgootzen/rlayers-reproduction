(this["webpackJsonprlayers-test"]=this["webpackJsonprlayers-test"]||[]).push([[0],{284:function(e,t,n){},287:function(e,t,n){"use strict";n.r(t);var c=n(35),r=n.n(c),i=n(173),a=n.n(i),d=n(57),j=n(14),s=n(1),l=(n(228),n(53)),o=n(39),u=(n(284),n(59)),b=n(21),O=function(){var e=Object(c.useState)({center:Object(s.d)([9.5,51.3]),zoom:8}),t=Object(j.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)([]),a=Object(j.a)(i,2),u=a[0],O=a[1],h=Object(c.useState)([]),m=Object(j.a)(h,2),x=m[0],f=m[1];return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("h1",{children:"Example with ROverlay (crashes)"}),Object(b.jsxs)(l.RMap,{initial:n,view:[n,r],className:"map",children:[Object(b.jsx)(l.ROSM,{}),Object(b.jsx)(l.RLayerVector,{zIndex:10,children:u.map((function(e){return Object(b.jsx)(l.RFeature,{geometry:new o.a(Object(s.d)([e.longitude,e.latitude])),children:Object(b.jsx)(l.ROverlay,{children:Object(b.jsx)("div",{children:e.id})})},e.id)}))})]}),Object(b.jsxs)("div",{children:[u.map((function(e){return Object(b.jsxs)("div",{children:[e.id,Object(b.jsx)("button",{onClick:function(){return O(u.filter((function(t){return t!==e})))},children:"Remove"})]},e.id)})),Object(b.jsx)("button",{onClick:function(){return O((function(e){return[].concat(Object(d.a)(e),[{id:Math.random(),longitude:9+Math.random(),latitude:50.8+Math.random()}])}))},children:"Add"})]}),Object(b.jsx)("h1",{children:"Example without ROverlay (works)"}),Object(b.jsxs)(l.RMap,{initial:n,view:[n,r],className:"map",children:[Object(b.jsx)(l.ROSM,{}),Object(b.jsx)(l.RLayerVector,{zIndex:10,children:x.map((function(e){return Object(b.jsx)(l.RFeature,{geometry:new o.a(Object(s.d)([e.longitude,e.latitude]))},e.id)}))})]}),Object(b.jsxs)("div",{children:[x.map((function(e){return Object(b.jsxs)("div",{children:[e.id,Object(b.jsx)("button",{onClick:function(){return f(x.filter((function(t){return t!==e})))},children:"Remove"})]},e.id)})),Object(b.jsx)("button",{onClick:function(){return f((function(e){return[].concat(Object(d.a)(e),[{id:Math.random(),longitude:9+Math.random(),latitude:50.8+Math.random()}])}))},children:"Add"})]})]})},h={"Arc de Triomphe":[2.295,48.8737],"Place d'Italie":[2.355,48.831],Bastille:[2.369,48.853],"Tour Eiffel":[2.294,48.858],Montmartre:[2.342,48.887]},m=0;function x(){var e=r.a.useState((function(){return Object.keys(h).map((function(e){return new u.a({geometry:new o.a(Object(s.d)(h[e])),name:e,uid:m++})}))})),t=Object(j.a)(e,2),n=t[0],c=t[1],i=r.a.useRef();return Object(b.jsxs)(r.a.Fragment,{children:[Object(b.jsxs)("h1",{children:["Example from ",Object(b.jsx)("a",{href:"https://mmomtchev.github.io/rlayers/#/add_delete",children:"https://mmomtchev.github.io/rlayers/#/add_delete"})," with added ROverlay (crashes)"]}),Object(b.jsxs)(l.RMap,{className:"map",initial:{center:Object(s.d)([2.364,48.82]),zoom:11},onClick:function(e){var t=e.map.getCoordinateFromPixel(e.pixel);n.push(new u.a({geometry:new o.a(t),uid:m++})),c(Object(d.a)(n))},children:[Object(b.jsx)(l.ROSM,{}),Object(b.jsxs)(l.RLayerVector,{ref:i,children:[Object(b.jsx)(l.RStyle.RStyle,{children:Object(b.jsx)(l.RStyle.RCircle,{radius:3,children:Object(b.jsx)(l.RStyle.RFill,{color:"red"})})}),n.map((function(e){return Object(b.jsx)(l.RFeature,{feature:e,onClick:function(e){var t=n.findIndex((function(t){return t.get("uid")===e.target.get("uid")}));if(t>=0)return n.splice(t,1),c(Object(d.a)(n)),!1},children:Object(b.jsx)(l.ROverlay,{children:Object(b.jsx)("div",{children:e.get("uid")})})},e.get("uid"))}))]})]}),Object(b.jsx)("div",{className:"mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow",children:Object(b.jsx)("p",{children:"Click an empty space to add a monument or click a monument to delete it."})})]})}a.a.render(Object(b.jsxs)(r.a.StrictMode,{children:[Object(b.jsx)(O,{}),Object(b.jsx)(x,{})]}),document.getElementById("root"))}},[[287,1,2]]]);
//# sourceMappingURL=main.9456b5d3.chunk.js.map