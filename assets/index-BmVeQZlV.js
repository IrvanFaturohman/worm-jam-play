(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(t){"@babel/helpers - typeof";return e=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},e(t)}function t(t,n){if(e(t)!=`object`||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var i=r.call(t,n||`default`);if(e(i)!=`object`)return i;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(n===`string`?String:Number)(t)}function n(n){var r=t(n,`string`);return e(r)==`symbol`?r:r+``}function r(e,t,r){return(t=n(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var i=2147483647,a=[[0,1],[1,0],[0,-1],[-1,0]],o=function(e){return e[e.Head=0]=`Head`,e[e.Tail=1]=`Tail`,e}({}),s=function(e){return e[e.Active=0]=`Active`,e[e.Won=1]=`Won`,e[e.Lost=2]=`Lost`,e}({}),c=function(e){return e[e.Ok=0]=`Ok`,e[e.SessionNotActive=1]=`SessionNotActive`,e[e.UnknownCat=2]=`UnknownCat`,e[e.Removed=3]=`Removed`,e[e.OutOfBounds=4]=`OutOfBounds`,e[e.BlockedCell=5]=`BlockedCell`,e[e.NotAdjacent=6]=`NotAdjacent`,e[e.OccupiedByOtherCat=7]=`OccupiedByOtherCat`,e[e.OccupiedByOwnBody=8]=`OccupiedByOwnBody`,e[e.Frozen=9]=`Frozen`,e[e.BowRestricted=10]=`BowRestricted`,e}({}),l=class e{constructor(e){r(this,`lv`,void 0),r(this,`w`,void 0),r(this,`h`,void 0),r(this,`cats`,void 0),r(this,`gates`,void 0),r(this,`hideHammered`,void 0),r(this,`lockOpen`,void 0),r(this,`status`,0),r(this,`remaining`,void 0),r(this,`armed`,!1),r(this,`frozen`,0),r(this,`usedBooster`,!1),r(this,`accepted`,0),r(this,`voidSet`,void 0),r(this,`wallSet`,void 0),r(this,`defCells`,void 0),r(this,`hideCells`,void 0),r(this,`lockCells`,void 0),this.lv=e,this.w=e.w,this.h=e.h,this.voidSet=new Set(e.voids),this.wallSet=new Set(e.walls),this.defCells=e.cats.map(e=>new Set(e.cells)),this.hideCells=e.hide.map(t=>{let n=new Set;for(let r=t.y;r<t.y+t.h;r++)for(let i=t.x;i<t.x+t.w;i++)n.add(r*e.w+i);return n}),this.lockCells=e.locks.map(e=>new Set(e.cells)),this.cats=e.cats.map(e=>({cells:e.cells.slice(),color:e.color,outer:e.outer??null,drinks:0,removed:!1,iceBroken:!1})),this.gates=e.gates.map(e=>({units:e.queue.map(e=>({color:e,owner:-1,order:i})),used:0,iceBroken:!1})),e.plan&&e.plan.forEach(([e,t,n,r],i)=>{let a=this.gates[n]?.units[r];a&&e!==void 0&&(a.owner=e*2+t,a.order=i)}),this.hideHammered=e.hide.map(()=>!1),this.lockOpen=e.locks.map(()=>null),this.remaining=e.time}xy(e){return[e%this.w,Math.floor(e/this.w)]}cell(e,t){return e>=0&&e<this.w&&t>=0&&t<this.h?t*this.w+e:null}contains(e){return e>=0&&e<this.w*this.h&&!this.voidSet.has(e)}isWall(e){return this.wallSet.has(e)}isVoid(e){return this.voidSet.has(e)}head(e){let t=this.cats[e].cells;return t[t.length-1]}tail(e){return this.cats[e].cells[0]}catAt(e){for(let t=0;t<this.cats.length;t++)if(!this.cats[t].removed&&this.cats[t].cells.includes(e))return t;return-1}stage(e){return+(this.lv.cats[e].outer!==void 0&&this.cats[e].outer===null)}completed(){let e=0;return this.cats.forEach((t,n)=>{let r=this.lv.cats[n].outer!==void 0;t.removed?e+=r?2:1:r&&t.outer===null&&(e+=1)}),e}collectedKeys(e){let t=0;return this.cats.forEach((n,r)=>{let i=this.lv.cats[r];i.key===e&&(n.removed||i.outer!==void 0&&n.outer===null)&&t++}),t}lockRemaining(e){let t=this.lv.locks[e],n=0;for(let r=0;r<e;r++)this.lv.locks[r].key===t.key&&(n+=this.lv.locks[r].count);return Math.max(0,t.count-Math.max(0,this.collectedKeys(t.key)-n))}lockOpenStage(e,t){return this.lockRemaining(e)>0?i:this.lockOpen[e]??t}intersects(e,t){for(let n of t)if(e.has(n))return!0;return!1}featureStart(e,t=this.completed()){let n=[...e],r=0;return this.lockCells.forEach((e,i)=>{this.intersects(e,n)&&(r=Math.max(r,this.lockOpenStage(i,t)))}),this.lv.hide.forEach((e,t)=>{!e.grid&&!this.hideHammered[t]&&this.intersects(this.hideCells[t],n)&&(r=Math.max(r,e.count))}),r}featureProgress(e,t=this.completed()){let n=this.featureStart(e,t);return n===i?0:Math.max(0,t-n)}catIce(e,t=this.completed()){return this.cats[e].iceBroken?0:Math.max(0,(this.lv.cats[e].ice??0)-this.featureProgress(this.defCells[e],t))}catBow(e,t=this.completed()){return Math.max(0,(this.lv.cats[e].bow??0)-this.featureProgress(this.defCells[e],t))}catHidden(e,t=this.completed()){return Math.max(0,(this.lv.cats[e].hidden??0)-this.featureProgress(this.defCells[e],t))}gateIce(e,t=this.completed()){return this.gates[e].iceBroken?0:Math.max(0,(this.lv.gates[e].ice??0)-t)}hideRemaining(e,t=this.completed()){if(this.hideHammered[e])return 0;let n=this.lv.hide[e],r=n.grid?this.featureProgress([n.y*this.w+n.x],t):t;return Math.max(0,n.count-r)}covered(e,t=this.completed()){for(let n=0;n<this.lv.hide.length;n++)if(this.hideCells[n].has(e)&&this.hideRemaining(n,t)>0)return!0;for(let t=0;t<this.lv.locks.length;t++)if(this.lockCells[t].has(e)&&this.lockRemaining(t)>0)return!0;return!1}catCovered(e,t=this.completed()){return this.cats[e].cells.some(e=>this.covered(e,t))}validateMove(e,t,n){if(this.status!==0)return 1;let r=this.cats[e];if(!r)return 2;if(r.removed)return 3;let i=this.completed();if(this.catIce(e,i)>0)return 9;if(this.catCovered(e,i))return 5;if(!this.contains(n))return 4;if(this.isWall(n)||this.covered(n,i))return 5;let a=r.cells.length,o=t===0?r.cells[a-1]:r.cells[0],[s,c]=this.xy(o),[l,u]=this.xy(n),d=l-s,f=u-c;if(Math.abs(d)+Math.abs(f)!==1)return 6;if(this.catBow(e,i)>=1&&!this.bowAllows(e,d,f))return 10;let p=this.catAt(n);if(p>=0&&p!==e)return 7;if(p===e){let e=t===0?r.cells[0]:r.cells[a-1];if(!(a>=3&&n===e))return 8}return 0}bowAllows(e,t,n){let[r,i]=this.xy(this.head(e)),[a,o]=this.xy(this.tail(e));return(r-a)*n===(i-o)*t}tryMove(e,t,n){let r=this.validateMove(e,t,n);if(r!==0)return r;let i=this.cats[e].cells;return t===0?(i.shift(),i.push(n)):(i.pop(),i.unshift(n)),this.accepted++,r}routeStep(e,t,n,r){let o=this.cats[e],s=o.cells.length,c=this.completed(),l=t===0?o.cells[s-1]:o.cells[0],u=t===0?o.cells[0]:o.cells[s-1],d=this.catBow(e,c)>=1,[f,p]=this.xy(this.head(e)),[m,h]=this.xy(this.tail(e)),g=new Map;o.cells.forEach((e,n)=>g.set(e,t===0?n+1:s-n));let _=(t,n)=>{if(!this.contains(t)||this.isWall(t)||this.covered(t,c))return!1;let r=this.catAt(t);return r>=0&&r!==e?!1:r===e?s===2&&n===1&&t===u?!1:(g.get(t)??i)<=n:!0},v=new Map,y=new Map([[l,0]]),b=[l],x=e=>{let[t,i]=this.xy(e);return(t-n)**2+(i-r)**2},S=l,C=x(l);for(;b.length;){let e=b.shift(),t=y.get(e),[n,r]=this.xy(e);for(let[i,o]of a){if(d&&(f-m)*o!==(p-h)*i)continue;let a=this.cell(n+i,r+o);if(a===null||y.has(a)||!_(a,t+1))continue;y.set(a,t+1),v.set(a,t===0?a:v.get(e)),b.push(a);let s=x(a);s<C&&(C=s,S=a)}}return S===l?null:v.get(S)}canDrinkReason(e){if(this.status!==0)return 1;let t=this.cats[e];if(!t)return 2;if(t.removed)return 3;let n=this.completed();return this.catIce(e,n)>0?8:this.catHidden(e,n)>0?9:this.catCovered(e,n)?5:t.drinks>=t.cells.length?4:0}tryDrink(e){let t=this.canDrinkReason(e);if(t!==0)return t;let n=this.cats[e],r=this.completed(),i=5,a=-1;for(let e=0;e<this.lv.gates.length;e++){if(!n.cells.includes(this.lv.gates[e].cell))continue;let t=this.gates[e],o;if(this.gateIce(e,r)>0)o=8;else if(t.used>=t.units.length)o=6;else if(t.units[t.used].color!==n.color)o=7;else{a=e;break}i===5&&(i=o)}if(a<0)return i;let o=this.gates[a],s=n.cells.length,c=0;for(;c<s-n.drinks&&o.used+c<o.units.length&&o.units[o.used+c].color===n.color;)c++;let l=o.used;this.consumeOwnership(e,a,c),n.drinks+=c,o.used+=c;let u=!1,d=!1;return n.drinks>=s&&(d=n.outer!==null,this.removeFullCat(e),u=!0),this.accepted++,this.checkWin(),{gate:a,amount:c,fromUsed:l,finished:u,switchedToOuter:d}}removeFullCat(e){let t=this.cats[e];t.outer===null?t.removed=!0:(t.color=t.outer,t.outer=null,t.drinks=0);let n=this.completed();for(let e=0;e<this.lv.locks.length;e++)this.lockOpen[e]===null&&this.lockRemaining(e)===0&&(this.lockOpen[e]=n)}checkWin(){this.status===0&&this.cats.every(e=>e.removed)&&(this.status=1)}get remainingCats(){return this.cats.filter(e=>!e.removed).length}consumeOwnership(e,t,n){let r=e*2+this.stage(e),i=this.gates[t];for(let e=i.used;e<i.used+n;e++){let t=i.units[e];if(t.owner===r)continue;let a=t.owner,o=null;for(let e of this.gates)for(let a=e.used;a<e.units.length;a++){let s=e.units[a];e===i&&a<i.used+n||s.owner===r&&s.color===t.color&&(!o||s.order<o.order)&&(o=s)}if(o){let e=o.order;o.owner=a,o.order=t.order,t.order=e}t.owner=r}}moveToPoured(e){let t=this.gates.map(()=>0);e.sort((e,t)=>e.g-t.g||this.gates[e.g].units.indexOf(e.u)-this.gates[t.g].units.indexOf(t.u));for(let{g:n,u:r}of e){let e=this.gates[n],i=e.units.indexOf(r);e.units.splice(i,1),e.units.splice(e.used,0,r),e.used++,t[n]++}return t}drainGatesPick(e,t,n){let r=[],i=Math.max(0,...this.gates.map(e=>e.units.length));for(let a=0;a<i&&r.length<t;a++)for(let i=0;i<this.gates.length&&r.length<t;i++){let t=this.gates[i],o=t.units[t.used+a];o&&o.color===e&&!n.has(o)&&(r.push({g:i,u:o}),n.add(o))}return r}drainCatWater(e,t,n,r){if(r<=0)return this.gates.map(()=>0);let i=e*2+t,a=[];this.gates.forEach((e,t)=>{for(let r=e.used;r<e.units.length;r++){let o=e.units[r];o.owner===i&&o.color===n&&a.push({g:t,u:o})}}),a.sort((e,t)=>e.u.order-t.u.order);let o=a.slice(0,r);return o.length<r&&o.push(...this.drainGatesPick(n,r-o.length,new Set(o.map(e=>e.u)))),this.moveToPoured(o)}canPawHammerCat(e){let t=this.cats[e];return this.status===0&&!!t&&!t.removed&&this.catIce(e)===0&&!this.catCovered(e)&&t.cells.length>2}pawHammerCat(e,t){if(!this.canPawHammerCat(e))return null;let n=this.cats[e],r=n.cells.length,i=this.drainCatWater(e,this.stage(e),n.color,r-Math.max(n.drinks,2));return n.outer!==null&&this.drainCatWater(e,1,n.outer,r-2).forEach((e,t)=>i[t]+=e),n.cells=t===0?n.cells.slice(r-2):n.cells.slice(0,2),n.drinks=Math.min(n.drinks,2),n.drinks===2&&this.removeFullCat(e),this.usedBooster=!0,this.checkWin(),i}pawHammerCatIce(e){return this.status!==0||this.cats[e].removed||this.catCovered(e)||this.catIce(e)<1?!1:(this.cats[e].iceBroken=!0,this.usedBooster=!0,!0)}pawHammerGateIce(e){return this.status!==0||this.gateIce(e)<1?!1:(this.gates[e].iceBroken=!0,this.usedBooster=!0,!0)}pawHammerHideBox(e){return this.status!==0||this.hideRemaining(e)<1?!1:(this.hideHammered[e]=!0,this.usedBooster=!0,!0)}frozenClock(){return this.status!==0||this.frozen>0?!1:(this.frozen=e.FROZEN_SECONDS,this.usedBooster=!0,!0)}canMagicPump(e){let t=this.cats[e];return this.status===0&&!!t&&!t.removed&&this.catIce(e)===0&&this.catHidden(e)===0&&!this.catCovered(e)}magicPump(e){if(!this.canMagicPump(e))return null;let t=this.cats[e].color,n=this.completed(),r=this.cats.map((e,t)=>t).filter(e=>{let r=this.cats[e];return!r.removed&&r.color===t&&this.catIce(e,n)===0&&this.catHidden(e,n)===0&&!this.catCovered(e,n)}).map(e=>{let t=this.cats[e],n=this.drainCatWater(e,this.stage(e),t.color,t.cells.length-t.drinks);return t.drinks=t.cells.length,this.removeFullCat(e),{cat:e,drained:n}});return this.usedBooster=!0,this.checkWin(),r}armCountdown(){this.armed=!0}advance(e){if(this.status!==0||!this.armed)return;let t=e;if(this.frozen>0){let e=Math.min(this.frozen,t);this.frozen-=e,t-=e}this.remaining=Math.max(0,this.remaining-t),this.remaining<=0&&(this.status=2)}revive(){this.status===2&&(this.remaining=e.REVIVE_SECONDS,this.status=0)}};r(l,`FROZEN_SECONDS`,10),r(l,`REVIVE_SECONDS`,60);var u=JSON.parse(`[{"n":1,"w":4,"h":6,"time":180,"scale":1.15,"voids":[3,2,1,0],"walls":[],"cats":[{"color":2,"cells":[4,8,12]},{"color":5,"cells":[5,9,13]},{"color":4,"cells":[6,10,14]},{"color":8,"cells":[7,11,15]}],"gates":[{"cell":20,"out":[0,1],"queue":[8,8,8]},{"cell":21,"out":[0,1],"queue":[4,4,4]},{"cell":22,"out":[0,1],"queue":[5,5,5]},{"cell":23,"out":[0,1],"queue":[2,2,2]}],"hide":[],"locks":[],"plan":[[0,0,3,0],[0,0,3,1],[0,0,3,2],[1,0,2,0],[1,0,2,1],[1,0,2,2],[2,0,1,0],[2,0,1,1],[2,0,1,2],[3,0,0,0],[3,0,0,1],[3,0,0,2]],"mech":["voids"]},{"n":2,"w":6,"h":6,"time":180,"scale":1.25,"voids":[],"walls":[],"cats":[{"color":2,"cells":[19,13]},{"color":4,"cells":[8,9]},{"color":2,"cells":[16,22]},{"color":4,"cells":[26,27]},{"color":5,"cells":[14,20]},{"color":5,"cells":[15,21]}],"gates":[{"cell":33,"out":[0,1],"queue":[5,5,5,5]},{"cell":12,"out":[-1,0],"queue":[2,2,2,2]},{"cell":17,"out":[1,0],"queue":[4,4,4,4]}],"hide":[],"locks":[],"plan":[[0,0,1,0],[0,0,1,1],[1,0,2,0],[1,0,2,1],[2,0,1,2],[2,0,1,3],[3,0,2,2],[3,0,2,3],[4,0,0,0],[4,0,0,1],[5,0,0,2],[5,0,0,3]],"mech":[]},{"n":3,"w":6,"h":6,"time":180,"scale":1.149999976158142,"voids":[],"walls":[],"cats":[{"color":4,"cells":[12,13,14,15,16,17]},{"color":5,"cells":[0,6]},{"color":5,"cells":[1,7]},{"color":5,"cells":[2,8]},{"color":2,"cells":[3,9]},{"color":2,"cells":[4,10]},{"color":2,"cells":[5,11]}],"gates":[{"cell":34,"out":[0,1],"queue":[2,2,2,2,2,2]},{"cell":31,"out":[0,1],"queue":[5,5,5,5,5,5]},{"cell":3,"out":[0,-1],"queue":[4,4,4,4,4,4]}],"hide":[],"locks":[],"plan":[[1,0,1,0],[1,0,1,1],[2,0,1,2],[2,0,1,3],[3,0,1,4],[3,0,1,5],[5,0,0,0],[5,0,0,1],[4,0,0,2],[4,0,0,3],[0,0,2,0],[0,0,2,1],[0,0,2,2],[0,0,2,3],[0,0,2,4],[0,0,2,5],[6,0,0,4],[6,0,0,5]],"mech":[]},{"n":4,"w":5,"h":6,"time":180,"scale":1.149999976158142,"voids":[],"walls":[],"cats":[{"color":5,"cells":[0,1,2]},{"color":0,"cells":[5,6,7]},{"color":4,"cells":[10,11,12]},{"color":2,"cells":[15,16,17]},{"color":1,"cells":[20,21,22]},{"color":6,"cells":[25,26,27]},{"color":8,"cells":[23,28]},{"color":8,"cells":[14,19]},{"color":8,"cells":[3,8]},{"color":11,"cells":[13,18]},{"color":11,"cells":[24,29]},{"color":11,"cells":[4,9]}],"gates":[{"cell":28,"out":[0,1],"queue":[8,8,8,8,8,8]},{"cell":4,"out":[0,-1],"queue":[11,11,11,11,11,11]},{"cell":24,"out":[1,0],"queue":[1,1,1,6,6,6]},{"cell":19,"out":[1,0],"queue":[2,2,2]},{"cell":14,"out":[1,0],"queue":[4,4,4]},{"cell":9,"out":[1,0],"queue":[0,0,0,5,5,5]}],"hide":[],"locks":[],"plan":[[6,0,0,0],[6,0,0,1],[11,0,1,0],[11,0,1,1],[1,0,5,0],[1,0,5,1],[1,0,5,2],[0,0,5,3],[0,0,5,4],[0,0,5,5],[4,0,2,0],[4,0,2,1],[4,0,2,2],[5,0,2,3],[5,0,2,4],[5,0,2,5],[9,0,1,2],[9,0,1,3],[10,0,1,4],[10,0,1,5],[7,0,0,2],[7,0,0,3],[2,0,4,0],[2,0,4,1],[2,0,4,2],[3,0,3,0],[3,0,3,1],[3,0,3,2],[8,0,0,4],[8,0,0,5]],"mech":["multiLayerGate"]},{"n":5,"w":5,"h":9,"time":180,"scale":1.149999976158142,"voids":[],"walls":[43,38,33,28,41,36,31,16,26,11,1,18,8,3,13,6],"cats":[{"color":1,"cells":[44,39]},{"color":1,"cells":[34,29]},{"color":1,"cells":[0,5]},{"color":1,"cells":[10,15]},{"color":4,"cells":[40,35]},{"color":4,"cells":[30,25]},{"color":4,"cells":[19,14]},{"color":4,"cells":[9,4]},{"color":2,"cells":[42,37]},{"color":2,"cells":[32,27]},{"color":2,"cells":[2,7]},{"color":2,"cells":[12,17]},{"color":0,"cells":[22,23,24]},{"color":0,"cells":[20,21]}],"gates":[{"cell":24,"out":[1,0],"queue":[0,0,0,0,0]},{"cell":40,"out":[0,1],"queue":[4,4,4,4,1,1,1,1]},{"cell":4,"out":[0,-1],"queue":[1,1,1,1,2,2,2,2]},{"cell":0,"out":[0,-1],"queue":[2,2,2,2,4,4,4,4]}],"hide":[],"locks":[],"plan":[[4,0,1,0],[4,0,1,1],[5,0,1,2],[5,0,1,3],[12,0,0,0],[12,0,0,1],[12,0,0,2],[13,0,0,3],[13,0,0,4],[3,0,1,4],[3,0,1,5],[2,0,1,6],[2,0,1,7],[9,0,3,0],[9,0,3,1],[11,0,3,2],[11,0,3,3],[6,0,3,4],[6,0,3,5],[7,0,3,6],[7,0,3,7],[1,0,2,0],[1,0,2,1],[0,0,2,2],[0,0,2,3],[8,0,2,4],[8,0,2,5],[10,0,2,6],[10,0,2,7]],"mech":["walls","multiLayerGate"]},{"n":6,"w":4,"h":6,"time":150,"scale":1.149999976158142,"voids":[],"walls":[],"cats":[{"color":4,"cells":[20,21]},{"color":4,"cells":[22,23]},{"color":4,"cells":[16,17]},{"color":4,"cells":[18,19]},{"color":5,"cells":[12,8]},{"color":5,"cells":[13,9]},{"color":5,"cells":[4,0]},{"color":5,"cells":[5,1]},{"color":1,"cells":[10,14]},{"color":1,"cells":[11,15]},{"color":1,"cells":[2,6]},{"color":1,"cells":[3,7]}],"gates":[{"cell":23,"out":[0,1],"queue":[4,4,4,4,4,4,4,4]},{"cell":20,"out":[0,1],"queue":[5,5,5,5,5,5,5,5],"ice":4},{"cell":1,"out":[0,-1],"queue":[1,1,1,1,1,1,1,1],"ice":8}],"hide":[],"locks":[],"plan":[[1,0,0,0],[1,0,0,1],[0,0,0,2],[0,0,0,3],[2,0,0,4],[2,0,0,5],[3,0,0,6],[3,0,0,7],[4,0,1,0],[4,0,1,1],[5,0,1,2],[5,0,1,3],[6,0,1,4],[6,0,1,5],[7,0,1,6],[7,0,1,7],[8,0,2,0],[8,0,2,1],[9,0,2,2],[9,0,2,3],[10,0,2,4],[10,0,2,5],[11,0,2,6],[11,0,2,7]],"mech":["gateIce"]},{"n":7,"w":6,"h":7,"time":150,"scale":1.149999976158142,"voids":[24,18,12,19,25,26,20,13,14],"walls":[],"cats":[{"color":8,"cells":[27,28,29]},{"color":8,"cells":[21,22,23]},{"color":8,"cells":[15,16,17]},{"color":4,"cells":[36,30]},{"color":4,"cells":[38,32]},{"color":4,"cells":[40,34]},{"color":6,"cells":[35,41]},{"color":6,"cells":[33,39]},{"color":6,"cells":[31,37]},{"color":0,"cells":[0,6]},{"color":0,"cells":[2,8]},{"color":0,"cells":[4,10]},{"color":2,"cells":[11,5]},{"color":2,"cells":[9,3]},{"color":2,"cells":[7,1]}],"gates":[{"cell":23,"out":[1,0],"queue":[8,8,8,8,8,8,8,8,8]},{"cell":5,"out":[0,-1],"queue":[0,0,0,0,0,0],"ice":3},{"cell":41,"out":[0,1],"queue":[4,4,4,4,4,4],"ice":6},{"cell":21,"out":[-1,0],"queue":[2,2,2,2,2,2,6,6,6,6,6,6],"ice":9}],"hide":[],"locks":[],"plan":[[1,0,0,0],[1,0,0,1],[1,0,0,2],[0,0,0,3],[0,0,0,4],[0,0,0,5],[2,0,0,6],[2,0,0,7],[2,0,0,8],[11,0,1,0],[11,0,1,1],[10,0,1,2],[10,0,1,3],[9,0,1,4],[9,0,1,5],[5,0,2,0],[5,0,2,1],[4,0,2,2],[4,0,2,3],[3,0,2,4],[3,0,2,5],[12,0,3,0],[12,0,3,1],[13,0,3,2],[13,0,3,3],[14,0,3,4],[14,0,3,5],[6,0,3,6],[6,0,3,7],[7,0,3,8],[7,0,3,9],[8,0,3,10],[8,0,3,11]],"mech":["voids","multiLayerGate","gateIce"]},{"n":8,"w":6,"h":9,"time":150,"scale":1.149999976158142,"voids":[51,52,53,47,46,45,41,39,40,12,13,8,6,0,1,7,14,2],"walls":[43,10],"cats":[{"color":1,"cells":[42,48]},{"color":1,"cells":[38,44]},{"color":6,"cells":[50,49]},{"color":6,"cells":[37,36]},{"color":2,"cells":[30,31]},{"color":2,"cells":[34,35]},{"color":2,"cells":[18,19]},{"color":2,"cells":[22,23]},{"color":1,"cells":[32,33]},{"color":1,"cells":[20,21]},{"color":8,"cells":[24,25,26,27,28,29]},{"color":1,"cells":[16,17]},{"color":1,"cells":[3,4]},{"color":6,"cells":[15,9]},{"color":6,"cells":[11,5]}],"gates":[{"cell":35,"out":[0,1],"queue":[2,2,2,2,2,2,2,2]},{"cell":48,"out":[0,1],"queue":[1,1,1,1,1,1,1,1]},{"cell":29,"out":[1,0],"queue":[8,8,8,8,8,8,1,1,1,1],"ice":2},{"cell":5,"out":[0,-1],"queue":[6,6,6,6,6,6,6,6],"ice":9}],"hide":[],"locks":[],"plan":[[0,0,1,0],[0,0,1,1],[5,0,0,0],[5,0,0,1],[10,0,2,0],[10,0,2,1],[10,0,2,2],[10,0,2,3],[10,0,2,4],[10,0,2,5],[4,0,0,2],[4,0,0,3],[6,0,0,4],[6,0,0,5],[7,0,0,6],[7,0,0,7],[8,0,2,6],[8,0,2,7],[9,0,2,8],[9,0,2,9],[1,0,1,2],[1,0,1,3],[11,0,1,4],[11,0,1,5],[14,0,3,0],[14,0,3,1],[12,0,1,6],[12,0,1,7],[13,0,3,2],[13,0,3,3],[3,0,3,4],[3,0,3,5],[2,0,3,6],[2,0,3,7]],"mech":["voids","walls","multiLayerGate","gateIce"]},{"n":9,"w":6,"h":10,"time":150,"scale":1.149999976158142,"voids":[23,28,22,17,10,11,5,16,29,4],"walls":[],"cats":[{"color":8,"cells":[48,54]},{"color":8,"cells":[36,42]},{"color":8,"cells":[24,30]},{"color":8,"cells":[50,56]},{"color":8,"cells":[38,44]},{"color":8,"cells":[26,32]},{"color":4,"cells":[49,55]},{"color":4,"cells":[37,43]},{"color":4,"cells":[25,31]},{"color":4,"cells":[51,57]},{"color":4,"cells":[39,45]},{"color":4,"cells":[27,33]},{"color":2,"cells":[58,59]},{"color":0,"cells":[52,53]},{"color":0,"cells":[40,41]},{"color":2,"cells":[46,47]},{"color":2,"cells":[34,35]},{"color":0,"cells":[19,13,7,1,0,6,12,18]},{"color":2,"cells":[20,14,8,2,3,9,15,21]}],"gates":[{"cell":54,"out":[0,1],"queue":[8,8,8,8,8,8,8,8,8,8,8,8]},{"cell":56,"out":[0,1],"queue":[4,4,4,4,4,4,4,4,4,4,4,4],"ice":6},{"cell":58,"out":[0,1],"queue":[2,2,2,2,2,2],"ice":12},{"cell":35,"out":[0,-1],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2],"ice":14}],"hide":[],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[1,0,0,2],[1,0,0,3],[2,0,0,4],[2,0,0,5],[3,0,0,6],[3,0,0,7],[4,0,0,8],[4,0,0,9],[5,0,0,10],[5,0,0,11],[6,0,1,0],[6,0,1,1],[9,0,1,2],[9,0,1,3],[7,0,1,4],[7,0,1,5],[10,0,1,6],[10,0,1,7],[8,0,1,8],[8,0,1,9],[11,0,1,10],[11,0,1,11],[12,0,2,0],[12,0,2,1],[15,0,2,2],[15,0,2,3],[16,0,2,4],[16,0,2,5],[13,0,3,0],[13,0,3,1],[14,0,3,2],[14,0,3,3],[17,0,3,4],[17,0,3,5],[17,0,3,6],[17,0,3,7],[17,0,3,8],[17,0,3,9],[17,0,3,10],[17,0,3,11],[18,0,3,12],[18,0,3,13],[18,0,3,14],[18,0,3,15],[18,0,3,16],[18,0,3,17],[18,0,3,18],[18,0,3,19]],"mech":["voids","multiLayerGate","gateIce"]},{"n":10,"w":4,"h":8,"time":120,"scale":1.149999976158142,"voids":[],"walls":[],"cats":[{"color":0,"cells":[30,31]},{"color":0,"cells":[28,29]},{"color":2,"cells":[25,24],"ice":2},{"color":2,"cells":[27,26],"ice":2},{"color":0,"cells":[20,21],"ice":4},{"color":0,"cells":[22,23],"ice":4},{"color":2,"cells":[17,13,12,16],"ice":6},{"color":0,"cells":[18,14,15,19],"ice":7},{"color":2,"cells":[10,6,2,3,7,11],"ice":8},{"color":0,"cells":[9,5,1,0,4,8],"ice":9}],"gates":[{"cell":31,"out":[0,1],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"cell":28,"out":[0,1],"queue":[2,2,2,2,2,2,2,2,2,2,2,2,2,2]}],"hide":[],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[1,0,0,2],[1,0,0,3],[2,0,1,0],[2,0,1,1],[3,0,1,2],[3,0,1,3],[4,0,0,4],[4,0,0,5],[5,0,0,6],[5,0,0,7],[6,0,1,4],[6,0,1,5],[6,0,1,6],[6,0,1,7],[7,0,0,8],[7,0,0,9],[7,0,0,10],[7,0,0,11],[8,0,1,8],[8,0,1,9],[8,0,1,10],[8,0,1,11],[8,0,1,12],[8,0,1,13],[9,0,0,12],[9,0,0,13],[9,0,0,14],[9,0,0,15],[9,0,0,16],[9,0,0,17]],"mech":["catIce"]},{"n":12,"w":6,"h":8,"time":120,"scale":1.149999976158142,"voids":[],"walls":[25,22],"cats":[{"color":5,"cells":[31,37,43]},{"color":5,"cells":[15,14,20,26]},{"color":5,"cells":[1,7,13]},{"color":1,"cells":[32,33,27,21]},{"color":1,"cells":[46,40,34]},{"color":1,"cells":[16,10,4]},{"color":8,"cells":[39,45,44,38],"ice":10},{"color":8,"cells":[5,11,17],"ice":8},{"color":8,"cells":[19,18,24],"ice":2},{"color":4,"cells":[47,41,35],"ice":6},{"color":4,"cells":[0,6,12],"ice":8},{"color":4,"cells":[28,29,23],"ice":2},{"color":4,"cells":[9,3,2,8],"ice":10},{"color":8,"cells":[42,36,30],"ice":6}],"gates":[{"cell":43,"out":[0,1],"queue":[5,5,5,5,5,5,5,5,5,5]},{"cell":4,"out":[0,-1],"queue":[1,1,1,1,1,1,1,1,1,1]},{"cell":29,"out":[1,0],"queue":[4,4,4,4,4,4,4,4,4,4],"ice":2},{"cell":18,"out":[-1,0],"queue":[8,8,8,8,8,8,8,8,8,8,8,8,8,4,4,4],"ice":6}],"hide":[],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[0,0,0,2],[5,0,1,0],[5,0,1,1],[5,0,1,2],[11,0,2,0],[11,0,2,1],[11,0,2,2],[1,0,0,3],[1,0,0,4],[1,0,0,5],[1,0,0,6],[3,0,1,3],[3,0,1,4],[3,0,1,5],[3,0,1,6],[2,0,0,7],[2,0,0,8],[2,0,0,9],[8,0,3,0],[8,0,3,1],[8,0,3,2],[4,0,1,7],[4,0,1,8],[4,0,1,9],[9,0,2,3],[9,0,2,4],[9,0,2,5],[13,0,3,3],[13,0,3,4],[13,0,3,5],[6,0,3,6],[6,0,3,7],[6,0,3,8],[6,0,3,9],[7,0,3,10],[7,0,3,11],[7,0,3,12],[10,0,3,13],[10,0,3,14],[10,0,3,15],[12,0,2,6],[12,0,2,7],[12,0,2,8],[12,0,2,9]],"mech":["walls","multiLayerGate","gateIce","catIce"]},{"n":13,"w":6,"h":9,"time":120,"scale":1.149999976158142,"voids":[],"walls":[46,43,31,34],"cats":[{"color":6,"cells":[42,48]},{"color":6,"cells":[30,36]},{"color":6,"cells":[47,53]},{"color":6,"cells":[35,41]},{"color":6,"cells":[38,37]},{"color":6,"cells":[52,51]},{"color":8,"cells":[50,49]},{"color":8,"cells":[40,39]},{"color":4,"cells":[45,44]},{"color":4,"cells":[33,32]},{"color":4,"cells":[18,24],"ice":6},{"color":8,"cells":[6,12],"ice":6},{"color":4,"cells":[23,29],"ice":6},{"color":8,"cells":[11,17],"ice":6},{"color":4,"cells":[1,0],"ice":6},{"color":4,"cells":[5,4],"ice":6},{"color":8,"cells":[3,2],"ice":6},{"color":6,"cells":[28,27,26,25,19,20,21,22],"ice":16},{"color":8,"cells":[13,14,15,16,10,9,8,7],"ice":16}],"gates":[{"cell":5,"out":[0,-1],"queue":[8,8,8,8,8,8,8,8,4,4,4],"ice":6},{"cell":0,"out":[0,-1],"queue":[4,4,4,4,4,4,4,4,4,8,8,8,8,8,8,8,8,8,8],"ice":6},{"cell":48,"out":[0,1],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]}],"hide":[],"locks":[],"plan":[[0,0,2,0],[0,0,2,1],[1,0,2,2],[1,0,2,3],[4,0,2,4],[4,0,2,5],[5,0,2,6],[5,0,2,7],[2,0,2,8],[2,0,2,9],[3,0,2,10],[3,0,2,11],[14,0,1,0],[14,0,1,1],[13,0,0,0],[13,0,0,1],[16,0,0,2],[16,0,0,3],[11,0,0,4],[11,0,0,5],[10,0,1,2],[10,0,1,3],[15,0,1,4],[15,0,1,5],[12,0,1,6],[12,0,1,7],[7,0,0,6],[7,0,0,7],[8,0,0,8],[8,0,0,9],[9,0,0,10],[9,0,1,8],[17,0,2,12],[17,0,2,13],[17,0,2,14],[17,0,2,15],[17,0,2,16],[17,0,2,17],[17,0,2,18],[17,0,2,19],[18,0,1,9],[18,0,1,10],[18,0,1,11],[18,0,1,12],[18,0,1,13],[18,0,1,14],[18,0,1,15],[18,0,1,16],[6,0,1,17],[6,0,1,18]],"mech":["walls","multiLayerGate","gateIce","catIce"]},{"n":14,"w":7,"h":8,"time":105,"scale":1.149999976158142,"voids":[],"walls":[],"cats":[{"color":3,"cells":[48,55]},{"color":3,"cells":[46,53]},{"color":3,"cells":[44,51]},{"color":3,"cells":[42,49]},{"color":4,"cells":[47,54]},{"color":4,"cells":[45,52]},{"color":4,"cells":[43,50]},{"color":4,"cells":[5,12]},{"color":4,"cells":[3,10]},{"color":4,"cells":[1,8]},{"color":3,"cells":[6,13]},{"color":3,"cells":[4,11]},{"color":3,"cells":[2,9]},{"color":3,"cells":[0,7]},{"color":8,"cells":[29,36,37,38,39,40,33,26,19,18,17,16,15,22],"ice":15},{"color":8,"cells":[25,32,31,30,23,24],"ice":16},{"color":1,"cells":[20,27,34,41],"ice":4},{"color":1,"cells":[14,21,28,35],"ice":5}],"gates":[{"cell":55,"out":[0,1],"queue":[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]},{"cell":49,"out":[0,1],"queue":[4,4,4,4,4,4,4,4,4,4,4,4],"ice":5},{"cell":3,"out":[0,-1],"queue":[1,1,1,1,1,1,1,1],"ice":12},{"cell":52,"out":[0,1],"queue":[8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],"ice":15}],"hide":[],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[1,0,0,2],[1,0,0,3],[2,0,0,4],[2,0,0,5],[3,0,0,6],[3,0,0,7],[10,0,0,8],[10,0,0,9],[4,0,1,0],[4,0,1,1],[6,0,1,2],[6,0,1,3],[5,0,1,4],[5,0,1,5],[7,0,1,6],[7,0,1,7],[11,0,0,10],[11,0,0,11],[8,0,1,8],[8,0,1,9],[12,0,0,12],[12,0,0,13],[16,0,2,0],[16,0,2,1],[16,0,2,2],[16,0,2,3],[9,0,1,10],[9,0,1,11],[13,0,0,14],[13,0,0,15],[14,0,3,0],[14,0,3,1],[14,0,3,2],[14,0,3,3],[14,0,3,4],[14,0,3,5],[14,0,3,6],[14,0,3,7],[14,0,3,8],[14,0,3,9],[14,0,3,10],[14,0,3,11],[14,0,3,12],[14,0,3,13],[15,0,3,14],[15,0,3,15],[15,0,3,16],[15,0,3,17],[15,0,3,18],[15,0,3,19],[17,0,2,4],[17,0,2,5],[17,0,2,6],[17,0,2,7]],"mech":["gateIce","catIce"]},{"n":15,"w":6,"h":9,"time":120,"scale":1.149999976158142,"voids":[47,48,42,53,41,35,36,30,24,29,23,18,17,12],"walls":[],"cats":[{"color":2,"cells":[6,7]},{"color":2,"cells":[2,3]},{"color":2,"cells":[10,11]},{"color":5,"cells":[9,8]},{"color":5,"cells":[1,0]},{"color":4,"cells":[5,4]},{"color":4,"cells":[14,13]},{"color":0,"cells":[16,15]},{"color":5,"cells":[26,20],"ice":5},{"color":5,"cells":[39,33],"ice":5},{"color":4,"cells":[45,44],"ice":5},{"color":0,"cells":[38,32],"ice":5},{"color":4,"cells":[27,21],"ice":5},{"color":8,"cells":[34,28,22],"ice":14},{"color":8,"cells":[50,49],"ice":7},{"color":2,"cells":[40,46],"ice":7},{"color":2,"cells":[43,37],"ice":7},{"color":8,"cells":[52,51],"ice":7},{"color":8,"cells":[31,25,19],"ice":14}],"gates":[{"cell":0,"out":[-1,0],"queue":[5,5,5,5,5,5,5,5]},{"cell":11,"out":[1,0],"queue":[2,2,2,2,2,2,2,2,2,2],"ice":1},{"cell":50,"out":[0,1],"queue":[4,4,4,4,4,4,4,4],"ice":7},{"cell":51,"out":[0,1],"queue":[0,0,0],"ice":10},{"cell":2,"out":[0,-1],"queue":[8,8,8,8,8,8,8,8,8,8,0],"ice":14}],"hide":[],"locks":[],"plan":[[4,0,0,0],[4,0,0,1],[2,0,1,0],[2,0,1,1],[1,0,1,2],[1,0,1,3],[0,0,1,4],[0,0,1,5],[3,0,0,2],[3,0,0,3],[8,0,0,4],[8,0,0,5],[9,0,0,6],[9,0,0,7],[10,0,2,0],[10,0,2,1],[5,0,2,2],[5,0,2,3],[6,0,2,4],[6,0,2,5],[12,0,2,6],[12,0,2,7],[15,0,1,6],[15,0,1,7],[16,0,1,8],[16,0,1,9],[11,0,3,0],[11,0,3,1],[7,0,3,2],[13,0,4,0],[13,0,4,1],[13,0,4,2],[14,0,4,3],[14,0,4,4],[18,0,4,5],[18,0,4,6],[18,0,4,7],[17,0,4,8],[17,0,4,9],[7,0,4,10]],"mech":["voids","multiLayerGate","gateIce","catIce"]},{"n":16,"w":6,"h":7,"time":120,"scale":1.149999976158142,"voids":[29,23,24,18,12,17,40,41,37,36,0,1,4,5],"walls":[],"cats":[{"color":4,"cells":[38,32,31,30]},{"color":3,"cells":[39,33,34,35]},{"color":6,"cells":[2,8,7,6]},{"color":2,"cells":[3,9,10,11]},{"color":3,"cells":[13,19,25],"outer":2},{"color":4,"cells":[14,20,26],"outer":6},{"color":1,"cells":[15,21,27],"outer":0},{"color":2,"cells":[16,22,28],"outer":3}],"gates":[{"cell":30,"out":[-1,0],"queue":[4,4,4,4,4,4,4]},{"cell":38,"out":[0,1],"queue":[3,3,3,3,3,3,3,3,3,3],"ice":2},{"cell":6,"out":[-1,0],"queue":[6,6,6,6,6,6,6]},{"cell":2,"out":[0,-1],"queue":[2,2,2,2,2,2,2,2,2,2],"ice":2},{"cell":35,"out":[1,0],"queue":[0,0,0],"ice":10},{"cell":11,"out":[1,0],"queue":[1,1,1],"ice":9}],"hide":[],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[0,0,0,2],[0,0,0,3],[2,0,2,0],[2,0,2,1],[2,0,2,2],[2,0,2,3],[1,0,1,0],[1,0,1,1],[1,0,1,2],[1,0,1,3],[3,0,3,0],[3,0,3,1],[3,0,3,2],[3,0,3,3],[4,0,1,4],[4,0,1,5],[4,0,1,6],[4,1,3,4],[4,1,3,5],[4,1,3,6],[5,0,0,4],[5,0,0,5],[5,0,0,6],[5,1,2,4],[5,1,2,5],[5,1,2,6],[7,0,3,7],[7,0,3,8],[7,0,3,9],[6,0,5,0],[6,0,5,1],[6,0,5,2],[6,1,4,0],[6,1,4,1],[6,1,4,2],[7,1,1,7],[7,1,1,8],[7,1,1,9]],"mech":["voids","gateIce","nested"]},{"n":17,"w":6,"h":10,"time":120,"scale":1.149999976158142,"voids":[23,16,22,21,15,17,44,42,43,37,38,36],"walls":[],"cats":[{"color":1,"cells":[48,54]},{"color":6,"cells":[49,55]},{"color":4,"cells":[56,57,58,59],"outer":1},{"color":4,"cells":[50,51,52,53]},{"color":2,"cells":[27,33,39,45],"outer":6},{"color":4,"cells":[28,34,40,46]},{"color":6,"cells":[29,35,41,47],"outer":4},{"color":6,"cells":[32,31,30]},{"color":6,"cells":[26,25,24]},{"color":1,"cells":[18,19,20]},{"color":1,"cells":[12,13,14]},{"color":2,"cells":[6,7,8,9,10,11]},{"color":2,"cells":[0,1,2,3,4,5],"outer":6}],"gates":[{"cell":53,"out":[1,0],"queue":[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]},{"cell":30,"out":[-1,0],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],"ice":3},{"cell":11,"out":[1,0],"queue":[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],"ice":7},{"cell":1,"out":[0,-1],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,6,6,6],"ice":12}],"hide":[],"locks":[],"plan":[[3,0,0,0],[3,0,0,1],[3,0,0,2],[3,0,0,3],[2,0,0,4],[2,0,0,5],[2,0,0,6],[2,0,0,7],[5,0,0,8],[5,0,0,9],[5,0,0,10],[5,0,0,11],[7,0,1,0],[7,0,1,1],[7,0,1,2],[8,0,1,3],[8,0,1,4],[8,0,1,5],[6,0,1,6],[6,0,1,7],[6,0,1,8],[6,0,1,9],[6,1,0,12],[6,1,0,13],[6,1,0,14],[6,1,0,15],[11,0,2,0],[11,0,2,1],[11,0,2,2],[11,0,2,3],[11,0,2,4],[11,0,2,5],[12,0,2,6],[12,0,2,7],[12,0,2,8],[12,0,2,9],[12,0,2,10],[12,0,2,11],[1,0,1,10],[1,0,1,11],[12,1,1,12],[12,1,1,13],[12,1,1,14],[12,1,1,15],[12,1,1,16],[12,1,1,17],[4,0,2,12],[4,0,2,13],[4,0,2,14],[4,0,2,15],[9,0,3,0],[9,0,3,1],[9,0,3,2],[10,0,3,3],[10,0,3,4],[10,0,3,5],[4,1,1,18],[0,0,3,6],[0,0,3,7],[2,1,3,8],[2,1,3,9],[2,1,3,10],[2,1,3,11],[4,1,3,12],[4,1,3,13],[4,1,3,14]],"mech":["voids","multiLayerGate","gateIce","nested"]},{"n":18,"w":6,"h":7,"time":120,"scale":1.149999976158142,"voids":[33,27],"walls":[],"cats":[{"color":1,"cells":[12,6,0],"outer":5},{"color":1,"cells":[13,7,1]},{"color":1,"cells":[14,8],"outer":2},{"color":1,"cells":[16,10]},{"color":1,"cells":[4,5]},{"color":4,"cells":[9,15]},{"color":4,"cells":[2,3]},{"color":0,"cells":[11,17]},{"color":0,"cells":[36,30,24,18],"ice":5},{"color":0,"cells":[41,35,29,23],"ice":5},{"color":4,"cells":[37,31,25,19],"outer":2,"ice":5},{"color":2,"cells":[32,38,39],"outer":5,"ice":5},{"color":2,"cells":[21,22,28],"outer":4,"ice":5},{"color":5,"cells":[40,34],"ice":5},{"color":5,"cells":[26,20],"ice":5}],"gates":[{"cell":5,"out":[1,0],"queue":[1,1,1,1,1,1,1,1,1,1,1,1]},{"cell":0,"out":[-1,0],"queue":[4,4,4,4,4,4,4,4,4,4,4],"ice":5},{"cell":37,"out":[0,1],"queue":[0,0,0,0,0,0,0,0,0,0],"ice":8},{"cell":40,"out":[0,1],"queue":[5,5,5,5,5,5,5,5],"ice":11},{"cell":3,"out":[0,-1],"queue":[2,2,2,2,2,2,2,2,2,2,2,2,5,5],"ice":14}],"hide":[],"locks":[],"plan":[[4,0,0,0],[4,0,0,1],[3,0,0,2],[3,0,0,3],[2,0,0,4],[2,0,0,5],[1,0,0,6],[1,0,0,7],[1,0,0,8],[0,0,0,9],[0,0,0,10],[0,0,0,11],[5,0,1,0],[5,0,1,1],[6,0,1,2],[6,0,1,3],[10,0,1,4],[10,0,1,5],[10,0,1,6],[10,0,1,7],[8,0,2,0],[8,0,2,1],[8,0,2,2],[8,0,2,3],[7,0,2,4],[7,0,2,5],[9,0,2,6],[9,0,2,7],[9,0,2,8],[9,0,2,9],[13,0,3,0],[13,0,3,1],[0,1,3,2],[0,1,3,3],[0,1,3,4],[14,0,3,5],[14,0,3,6],[2,1,4,0],[2,1,4,1],[10,1,4,2],[10,1,4,3],[10,1,4,4],[10,1,4,5],[12,0,4,6],[12,0,4,7],[12,0,4,8],[12,1,1,8],[12,1,1,9],[12,1,1,10],[11,0,4,9],[11,0,4,10],[11,0,4,11],[11,1,4,12],[11,1,4,13],[11,1,3,7]],"mech":["voids","multiLayerGate","gateIce","catIce","nested"]},{"n":19,"w":6,"h":8,"time":80,"scale":1.149999976158142,"voids":[32,26,21,15],"walls":[],"cats":[{"color":8,"cells":[36,42]},{"color":8,"cells":[38,44]},{"color":8,"cells":[40,46]},{"color":5,"cells":[41,47]},{"color":5,"cells":[39,45]},{"color":5,"cells":[37,43]},{"color":8,"cells":[6,0]},{"color":8,"cells":[8,2]},{"color":8,"cells":[10,4]},{"color":5,"cells":[11,5]},{"color":5,"cells":[9,3]},{"color":5,"cells":[7,1]},{"color":2,"cells":[19,13],"ice":6},{"color":2,"cells":[29,35],"ice":6},{"color":2,"cells":[27,33],"ice":6},{"color":1,"cells":[34,28],"ice":6},{"color":1,"cells":[20,14],"ice":6},{"color":1,"cells":[18,12],"ice":6},{"color":4,"cells":[23,22,16,17],"ice":10},{"color":4,"cells":[30,31,25,24],"ice":10}],"gates":[{"cell":0,"out":[0,-1],"queue":[1,1,1,1,1,1],"ice":6},{"cell":2,"out":[0,-1],"queue":[8,8,8,8,8,8,8,8,8,8,8,8]},{"cell":45,"out":[0,1],"queue":[5,5,5,5,5,5,5,5,5,5,5,5]},{"cell":47,"out":[0,1],"queue":[2,2,2,2,2,2],"ice":6},{"cell":18,"out":[-1,0],"queue":[4,4,4,4,4,4,4,4],"ice":18}],"hide":[],"locks":[],"plan":[[4,0,2,0],[4,0,2,1],[7,0,1,0],[7,0,1,1],[5,0,2,2],[5,0,2,3],[8,0,1,2],[8,0,1,3],[3,0,2,4],[3,0,2,5],[6,0,1,4],[6,0,1,5],[13,0,3,0],[13,0,3,1],[17,0,0,0],[17,0,0,1],[14,0,3,2],[14,0,3,3],[16,0,0,2],[16,0,0,3],[9,0,2,6],[9,0,2,7],[2,0,1,6],[2,0,1,7],[0,0,1,8],[0,0,1,9],[1,0,1,10],[1,0,1,11],[10,0,2,8],[10,0,2,9],[15,0,0,4],[15,0,0,5],[11,0,2,10],[11,0,2,11],[12,0,3,4],[12,0,3,5],[19,0,4,0],[19,0,4,1],[19,0,4,2],[19,0,4,3],[18,0,4,4],[18,0,4,5],[18,0,4,6],[18,0,4,7]],"mech":["voids","gateIce","catIce"]},{"n":20,"w":6,"h":9,"time":120,"scale":1.149999976158142,"voids":[],"walls":[30,31,32,44,43,42,23,22,10,11,21,9],"cats":[{"color":1,"cells":[48,49]},{"color":1,"cells":[52,53]},{"color":1,"cells":[38,39]},{"color":6,"cells":[51,50]},{"color":6,"cells":[37,36]},{"color":6,"cells":[41,40]},{"color":8,"cells":[45,46,47],"outer":0},{"color":8,"cells":[33,34,35]},{"color":4,"cells":[20,19,18],"ice":5},{"color":4,"cells":[17,16],"ice":5},{"color":4,"cells":[13,12],"outer":2,"ice":5},{"color":1,"cells":[15,14],"ice":5},{"color":4,"cells":[8,7,6],"outer":1,"ice":5},{"color":2,"cells":[3,2],"ice":8},{"color":6,"cells":[5,4],"ice":8},{"color":6,"cells":[1,0],"ice":8},{"color":2,"cells":[29,28,27,26,25,24],"ice":13}],"gates":[{"cell":36,"out":[-1,0],"queue":[6,6,6,6,6,6,6,6,6,6]},{"cell":35,"out":[1,0],"queue":[8,8,8,8,8,8]},{"cell":18,"out":[-1,0],"queue":[4,4,4,4,4,4,4,4,4,4],"ice":5},{"cell":0,"out":[-1,0],"queue":[2,2,2,2,1,1,1,1,1,1,1,1,1,1,1],"ice":8},{"cell":51,"out":[0,1],"queue":[0,0,0,2,2,2,2,2,2],"ice":11}],"hide":[],"locks":[],"plan":[[4,0,0,0],[4,0,0,1],[7,0,1,0],[7,0,1,1],[7,0,1,2],[6,0,1,3],[6,0,1,4],[6,0,1,5],[5,0,0,2],[5,0,0,3],[3,0,0,4],[3,0,0,5],[8,0,2,0],[8,0,2,1],[8,0,2,2],[10,0,2,3],[10,0,2,4],[12,0,2,5],[12,0,2,6],[12,0,2,7],[13,0,3,0],[13,0,3,1],[10,1,3,2],[10,1,3,3],[11,0,3,4],[11,0,3,5],[12,1,3,6],[12,1,3,7],[12,1,3,8],[6,1,4,0],[6,1,4,1],[6,1,4,2],[9,0,2,8],[9,0,2,9],[16,0,4,3],[16,0,4,4],[16,0,4,5],[16,0,4,6],[16,0,4,7],[16,0,4,8],[15,0,0,6],[15,0,0,7],[1,0,3,9],[1,0,3,10],[2,0,3,11],[2,0,3,12],[14,0,0,8],[14,0,0,9],[0,0,3,13],[0,0,3,14]],"mech":["walls","multiLayerGate","gateIce","catIce","nested"]},{"n":21,"w":6,"h":7,"time":120,"scale":1.149999976158142,"voids":[],"walls":[28,31],"cats":[{"color":4,"cells":[6,0]},{"color":4,"cells":[13,12]},{"color":4,"cells":[15,14]},{"color":4,"cells":[17,16]},{"color":4,"cells":[5,11]},{"color":6,"cells":[7,8]},{"color":6,"cells":[9,10]},{"color":1,"cells":[1,2]},{"color":1,"cells":[3,4]},{"color":2,"cells":[22,23,29]},{"color":8,"cells":[35,41]},{"color":8,"cells":[33,39]},{"color":6,"cells":[34,40]},{"color":6,"cells":[32,38]},{"color":0,"cells":[25,24,30,36,37]},{"color":1,"cells":[20,26,27,21],"ice":4},{"color":2,"cells":[19,18]}],"gates":[{"cell":35,"out":[1,0],"queue":[6,6,6,6,6,6,6,6],"ice":5},{"cell":0,"out":[0,-1],"queue":[4,4,4,4,4,4,4,4,4,4]},{"cell":41,"out":[0,1],"queue":[0,0,0,0,0,2,2,2,2,2],"ice":12},{"cell":36,"out":[0,1],"queue":[1,1,1,1,1,1,1,1,8,8,8,8],"ice":9}],"hide":[{"x":0,"y":3,"w":6,"h":4,"count":5,"grid":false}],"locks":[],"plan":[[0,0,1,0],[0,0,1,1],[1,0,1,2],[1,0,1,3],[2,0,1,4],[2,0,1,5],[3,0,1,6],[3,0,1,7],[4,0,1,8],[4,0,1,9],[12,0,0,0],[12,0,0,1],[13,0,0,2],[13,0,0,3],[6,0,0,4],[6,0,0,5],[5,0,0,6],[5,0,0,7],[15,0,3,0],[15,0,3,1],[15,0,3,2],[15,0,3,3],[7,0,3,4],[7,0,3,5],[8,0,3,6],[8,0,3,7],[10,0,3,8],[10,0,3,9],[11,0,3,10],[11,0,3,11],[14,0,2,0],[14,0,2,1],[14,0,2,2],[14,0,2,3],[14,0,2,4],[9,0,2,5],[9,0,2,6],[9,0,2,7],[16,0,2,8],[16,0,2,9]],"mech":["walls","multiLayerGate","gateIce","catIce","hideBox"]},{"n":22,"w":6,"h":9,"time":120,"scale":1.149999976158142,"voids":[35,29,23,30,24,18],"walls":[],"cats":[{"color":1,"cells":[31,32],"outer":4},{"color":1,"cells":[21,22],"outer":2},{"color":8,"cells":[33,34]},{"color":8,"cells":[19,20]},{"color":6,"cells":[27,28]},{"color":6,"cells":[25,26],"outer":2},{"color":6,"cells":[3,9,15]},{"color":8,"cells":[5,11,17],"outer":4},{"color":1,"cells":[4,10,16]},{"color":1,"cells":[48,49,50],"outer":6},{"color":6,"cells":[42,43,44],"outer":2},{"color":4,"cells":[36,37,38]},{"color":2,"cells":[0,6,12,13,14]},{"color":8,"cells":[8,7,1,2]},{"color":8,"cells":[41,47,53,52,51]},{"color":2,"cells":[46,45,39,40]}],"gates":[{"cell":28,"out":[1,0],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,6]},{"cell":25,"out":[-1,0],"queue":[8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],"ice":6},{"cell":5,"out":[0,-1],"queue":[1,1,1,1,1,1,1,1,1,1],"ice":3},{"cell":53,"out":[1,0],"queue":[4,4,4,4,4,4,4,4,2,2,2],"ice":14},{"cell":0,"out":[-1,0],"queue":[2,2,2,2,2,2,2,2,2,2,2,2,2]}],"hide":[{"x":3,"y":6,"w":3,"h":3,"count":11,"grid":false},{"x":0,"y":0,"w":3,"h":3,"count":11,"grid":false},{"x":3,"y":0,"w":3,"h":3,"count":2,"grid":false},{"x":0,"y":6,"w":3,"h":3,"count":8,"grid":false}],"locks":[],"plan":[[4,0,0,0],[4,0,0,1],[5,0,0,2],[5,0,0,3],[6,0,0,4],[6,0,0,5],[6,0,0,6],[8,0,2,0],[8,0,2,1],[8,0,2,2],[1,0,2,3],[1,0,2,4],[0,0,2,5],[0,0,2,6],[3,0,1,0],[3,0,1,1],[2,0,1,2],[2,0,1,3],[7,0,1,4],[7,0,1,5],[7,0,1,6],[10,0,0,7],[10,0,0,8],[10,0,0,9],[9,0,2,7],[9,0,2,8],[9,0,2,9],[12,0,4,0],[12,0,4,1],[12,0,4,2],[12,0,4,3],[12,0,4,4],[5,1,4,5],[5,1,4,6],[1,1,4,7],[1,1,4,8],[10,1,4,9],[10,1,4,10],[10,1,4,11],[13,0,1,7],[13,0,1,8],[13,0,1,9],[13,0,1,10],[15,0,4,12],[14,0,1,11],[14,0,1,12],[14,0,1,13],[14,0,1,14],[14,0,1,15],[11,0,3,0],[11,0,3,1],[11,0,3,2],[0,1,3,3],[0,1,3,4],[7,1,3,5],[7,1,3,6],[7,1,3,7],[9,1,0,10],[9,1,0,11],[9,1,0,12],[15,0,3,8],[15,0,3,9],[15,0,3,10]],"mech":["voids","multiLayerGate","gateIce","nested","hideBox"]},{"n":23,"w":6,"h":8,"time":135,"scale":1.149999976158142,"voids":[],"walls":[],"cats":[{"color":2,"cells":[18,12]},{"color":2,"cells":[23,17]},{"color":8,"cells":[20,19]},{"color":8,"cells":[6,0]},{"color":8,"cells":[10,4]},{"color":4,"cells":[22,21]},{"color":4,"cells":[8,2]},{"color":4,"cells":[11,5]},{"color":11,"cells":[9,3]},{"color":11,"cells":[7,1]},{"color":6,"cells":[16,15,14,13],"ice":21},{"color":1,"cells":[44,38,32,26],"outer":3},{"color":5,"cells":[45,39,33,27],"outer":1},{"color":6,"cells":[46,40,34,28]},{"color":3,"cells":[43,37,31,25]},{"color":3,"cells":[47,41]},{"color":3,"cells":[30,24],"outer":5},{"color":1,"cells":[35,29],"outer":8},{"color":1,"cells":[42,36]}],"gates":[{"cell":0,"out":[0,-1],"queue":[8,8,8,8,8,8,8,8]},{"cell":11,"out":[1,0],"queue":[1,1,1,1,1,1,1,1,1,1,1,1]},{"cell":47,"out":[0,1],"queue":[2,2,2,2]},{"cell":42,"out":[0,1],"queue":[6,6,6,6,6,6,6,6],"ice":20},{"cell":5,"out":[0,-1],"queue":[11,11,11,11]},{"cell":6,"out":[-1,0],"queue":[3,3,3,3,3,3,3,3,3,3,3,3,5,5,5,5,5,5],"ice":14},{"cell":44,"out":[0,1],"queue":[4,4,4,4,4,4],"ice":8}],"hide":[{"x":0,"y":4,"w":6,"h":4,"count":5,"grid":false}],"locks":[],"plan":[[3,0,0,0],[3,0,0,1],[8,0,4,0],[8,0,4,1],[9,0,4,2],[9,0,4,3],[2,0,0,2],[2,0,0,3],[4,0,0,4],[4,0,0,5],[17,0,1,0],[17,0,1,1],[1,0,2,0],[1,0,2,1],[17,1,0,6],[17,1,0,7],[11,0,1,2],[11,0,1,3],[11,0,1,4],[11,0,1,5],[0,0,2,2],[0,0,2,3],[7,0,6,0],[7,0,6,1],[5,0,6,2],[5,0,6,3],[6,0,6,4],[6,0,6,5],[18,0,1,6],[18,0,1,7],[11,1,5,0],[11,1,5,1],[11,1,5,2],[11,1,5,3],[14,0,5,4],[14,0,5,5],[14,0,5,6],[14,0,5,7],[15,0,5,8],[15,0,5,9],[16,0,5,10],[16,0,5,11],[16,1,5,12],[16,1,5,13],[12,0,5,14],[12,0,5,15],[12,0,5,16],[12,0,5,17],[12,1,1,8],[12,1,1,9],[12,1,1,10],[12,1,1,11],[10,0,3,0],[10,0,3,1],[10,0,3,2],[10,0,3,3],[13,0,3,4],[13,0,3,5],[13,0,3,6],[13,0,3,7]],"mech":["multiLayerGate","gateIce","catIce","nested","hideBox"]},{"n":24,"w":7,"h":9,"time":170,"scale":1.149999976158142,"voids":[],"walls":[35,50,59,54,41,25,26,11,12,23,22,8,9],"cats":[{"color":1,"cells":[49,56]},{"color":1,"cells":[44,51]},{"color":1,"cells":[46,53]},{"color":1,"cells":[55,62]},{"color":1,"cells":[29,36],"outer":0},{"color":8,"cells":[30,37],"outer":1},{"color":1,"cells":[3,10],"outer":5},{"color":4,"cells":[31,38],"outer":5},{"color":4,"cells":[24,17],"outer":5},{"color":2,"cells":[14,21,28],"outer":0},{"color":4,"cells":[0,7],"outer":0},{"color":8,"cells":[16,15]},{"color":2,"cells":[2,1],"outer":5},{"color":8,"cells":[58,57],"outer":0},{"color":8,"cells":[60,61],"outer":5},{"color":2,"cells":[52,45]},{"color":4,"cells":[48,47]},{"color":4,"cells":[42,43]},{"color":8,"cells":[4,5,6,13],"outer":1},{"color":1,"cells":[18,19,20,27],"outer":8},{"color":8,"cells":[39,40]},{"color":1,"cells":[32,33,34]}],"gates":[{"cell":62,"out":[1,0],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},{"cell":34,"out":[1,0],"queue":[8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,1,1,1,1,1],"ice":5},{"cell":56,"out":[-1,0],"queue":[2,2,2,2,2,2,2],"ice":21},{"cell":1,"out":[0,-1],"queue":[4,4,4,4,4,4,4,4,4,4],"ice":16},{"cell":28,"out":[-1,0],"queue":[5,5,5,5,5,5,5,5,5,5],"ice":25},{"cell":5,"out":[0,-1],"queue":[0,0,0,0,0,0,0,0,0],"ice":30}],"hide":[{"x":4,"y":0,"w":3,"h":6,"count":4,"grid":false},{"x":0,"y":0,"w":4,"h":6,"count":8,"grid":false}],"locks":[],"plan":[[3,0,0,0],[3,0,0,1],[2,0,0,2],[2,0,0,3],[1,0,0,4],[1,0,0,5],[0,0,0,6],[0,0,0,7],[21,0,0,8],[21,0,0,9],[21,0,0,10],[13,0,1,0],[13,0,1,1],[20,0,1,2],[20,0,1,3],[14,0,1,4],[14,0,1,5],[19,0,0,11],[19,0,0,12],[19,0,0,13],[19,0,0,14],[18,0,1,6],[18,0,1,7],[18,0,1,8],[18,0,1,9],[19,1,1,10],[19,1,1,11],[19,1,1,12],[19,1,1,13],[18,1,0,15],[18,1,0,16],[18,1,0,17],[18,1,0,18],[6,0,0,19],[11,0,1,14],[11,0,1,15],[5,0,1,16],[5,0,1,17],[5,1,1,18],[5,1,1,19],[4,0,1,20],[4,0,1,21],[10,0,3,0],[10,0,3,1],[6,0,1,22],[8,0,3,2],[8,0,3,3],[7,0,3,4],[7,0,3,5],[16,0,3,6],[16,0,3,7],[17,0,3,8],[17,0,3,9],[9,0,2,0],[9,0,2,1],[9,0,2,2],[15,0,2,3],[15,0,2,4],[12,0,2,5],[12,0,2,6],[7,1,4,0],[7,1,4,1],[6,1,4,2],[6,1,4,3],[8,1,4,4],[8,1,4,5],[12,1,4,6],[12,1,4,7],[14,1,4,8],[14,1,4,9],[4,1,5,0],[4,1,5,1],[9,1,5,2],[9,1,5,3],[9,1,5,4],[10,1,5,5],[10,1,5,6],[13,1,5,7],[13,1,5,8]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox"]},{"n":25,"w":8,"h":10,"time":160,"scale":1.149999976158142,"voids":[],"walls":[63,62,61,58,57,56,43,42,41,40,47,46,45,30,28,29,31,26,25,24,10,9,8,15,14,13],"cats":[{"color":6,"cells":[64,72]},{"color":6,"cells":[66,74]},{"color":6,"cells":[68,76]},{"color":6,"cells":[70,78]},{"color":2,"cells":[65,73]},{"color":2,"cells":[67,75]},{"color":0,"cells":[69,77]},{"color":0,"cells":[71,79]},{"color":2,"cells":[48,49],"outer":4},{"color":2,"cells":[50,51],"outer":3},{"color":6,"cells":[55,54,53],"outer":8},{"color":0,"cells":[32,33]},{"color":0,"cells":[16,17,18],"outer":8},{"color":2,"cells":[37,36]},{"color":2,"cells":[39,38],"outer":3},{"color":3,"cells":[23,22],"outer":4},{"color":3,"cells":[21,20],"outer":0},{"color":6,"cells":[0,1]},{"color":4,"cells":[3,2]},{"color":4,"cells":[7,6]},{"color":8,"cells":[5,4]},{"color":6,"cells":[12,11],"ice":15},{"color":2,"cells":[19,27],"ice":13},{"color":6,"cells":[34,35],"ice":9},{"color":0,"cells":[44,52],"ice":7},{"color":8,"cells":[60,59],"ice":4}],"gates":[{"cell":72,"out":[0,1],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]},{"cell":71,"out":[1,0],"queue":[2,2,2,2,2,2,2,2,2,2,2,2,2,2],"ice":4},{"cell":39,"out":[1,0],"queue":[0,0,0,0,0,0,0,0,0,3,3,0,0,0,0],"ice":10},{"cell":0,"out":[0,-1],"queue":[3,3,3,3,3,3,6,6],"ice":16},{"cell":16,"out":[-1,0],"queue":[8,8,8,8,8,8,8,8,8,8],"ice":25},{"cell":48,"out":[-1,0],"queue":[4,4,4,4,4,4,4,4],"ice":28}],"hide":[],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[1,0,0,2],[1,0,0,3],[2,0,0,4],[2,0,0,5],[3,0,0,6],[3,0,0,7],[5,0,1,0],[5,0,1,1],[4,0,1,2],[4,0,1,3],[9,0,1,4],[9,0,1,5],[10,0,0,8],[10,0,0,9],[10,0,0,10],[8,0,1,6],[8,0,1,7],[13,0,1,8],[13,0,1,9],[14,0,1,10],[14,0,1,11],[6,0,2,0],[6,0,2,1],[24,0,2,2],[24,0,2,3],[7,0,2,4],[7,0,2,5],[11,0,2,6],[11,0,2,7],[23,0,0,11],[23,0,0,12],[12,0,2,8],[21,0,0,13],[21,0,0,14],[9,1,2,9],[9,1,2,10],[12,0,2,11],[12,0,2,12],[22,0,1,12],[22,0,1,13],[16,0,3,0],[16,0,3,1],[15,0,3,2],[15,0,3,3],[16,1,2,13],[16,1,2,14],[14,1,3,4],[14,1,3,5],[17,0,3,6],[17,0,3,7],[10,1,4,0],[10,1,4,1],[10,1,4,2],[20,0,4,3],[20,0,4,4],[25,0,4,5],[25,0,4,6],[12,1,4,7],[12,1,4,8],[12,1,4,9],[8,1,5,0],[8,1,5,1],[15,1,5,2],[15,1,5,3],[18,0,5,4],[18,0,5,5],[19,0,5,6],[19,0,5,7]],"mech":["walls","multiLayerGate","gateIce","catIce","nested"]},{"n":26,"w":7,"h":9,"time":160,"scale":1.149999976158142,"voids":[],"walls":[19,17,15,49,51,53,55,40,33,38,31,36,29],"cats":[{"color":4,"cells":[14,7,0],"outer":6},{"color":4,"cells":[8,1]},{"color":4,"cells":[16,9,2],"outer":0},{"color":4,"cells":[18,11,4],"outer":3},{"color":4,"cells":[12,5]},{"color":4,"cells":[20,13,6],"outer":1},{"color":4,"cells":[23,24,25]},{"color":2,"cells":[21,22]},{"color":2,"cells":[26,27]},{"color":2,"cells":[10,3],"outer":1},{"color":4,"cells":[48,41,34],"outer":6},{"color":4,"cells":[42,35,28],"outer":3},{"color":4,"cells":[56,57]},{"color":3,"cells":[32,39,46],"outer":0},{"color":3,"cells":[30,37,44],"outer":6},{"color":0,"cells":[58,59,60]},{"color":0,"cells":[61,62]},{"color":1,"cells":[43,50]},{"color":1,"cells":[47,54],"outer":8},{"color":2,"cells":[45,52]}],"gates":[{"cell":1,"out":[0,-1],"queue":[4,4,4,4,4,4,4,4,4,4,4,4,4]},{"cell":5,"out":[0,-1],"queue":[4,4,4,4,4,4,4,4,4,4,4,4]},{"cell":59,"out":[0,1],"queue":[3,3,3,3,3,3,3,3,3,3,3,3]},{"cell":62,"out":[1,0],"queue":[0,0,0,0,0,0,0,0,0,0,0,4,4]},{"cell":61,"out":[0,1],"queue":[1,1,1,1,1,1,1,1,1],"ice":20},{"cell":27,"out":[1,0],"queue":[2,2,2,2,2,2,2,2]},{"cell":57,"out":[0,1],"queue":[6,6,6,6,6,6,6,6,6,8,8],"ice":26}],"hide":[{"x":0,"y":4,"w":7,"h":5,"count":9,"grid":false}],"locks":[],"plan":[[1,0,0,0],[1,0,0,1],[0,0,0,2],[0,0,0,3],[0,0,0,4],[4,0,1,0],[4,0,1,1],[3,0,1,2],[3,0,1,3],[3,0,1,4],[8,0,5,0],[8,0,5,1],[2,0,0,5],[2,0,0,6],[2,0,0,7],[5,0,1,5],[5,0,1,6],[5,0,1,7],[9,0,5,2],[9,0,5,3],[6,0,0,8],[6,0,0,9],[6,0,0,10],[16,0,3,0],[16,0,3,1],[15,0,3,2],[15,0,3,3],[15,0,3,4],[13,0,2,0],[13,0,2,1],[13,0,2,2],[14,0,2,3],[14,0,2,4],[14,0,2,5],[11,0,0,11],[11,0,0,12],[11,0,1,8],[13,1,3,5],[13,1,3,6],[13,1,3,7],[7,0,5,4],[7,0,5,5],[19,0,5,6],[19,0,5,7],[3,1,2,6],[3,1,2,7],[3,1,2,8],[10,0,1,9],[10,0,1,10],[10,0,1,11],[2,1,3,8],[2,1,3,9],[2,1,3,10],[12,0,3,11],[12,0,3,12],[17,0,4,0],[17,0,4,1],[18,0,4,2],[18,0,4,3],[11,1,2,9],[11,1,2,10],[11,1,2,11],[5,1,4,4],[5,1,4,5],[5,1,4,6],[9,1,4,7],[9,1,4,8],[0,1,6,0],[0,1,6,1],[0,1,6,2],[14,1,6,3],[14,1,6,4],[14,1,6,5],[10,1,6,6],[10,1,6,7],[10,1,6,8],[18,1,6,9],[18,1,6,10]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox"]},{"n":27,"w":7,"h":9,"time":100,"scale":1.149999976158142,"voids":[62,55,48,56,49,42,20,13,6,14,7,0],"walls":[],"cats":[{"color":6,"cells":[50,57]},{"color":6,"cells":[51,58]},{"color":6,"cells":[29,36,43],"outer":8},{"color":6,"cells":[16,23,30]},{"color":6,"cells":[1,8],"outer":3},{"color":4,"cells":[37,44],"outer":3},{"color":4,"cells":[15,22]},{"color":4,"cells":[2,9]},{"color":4,"cells":[53,60]},{"color":4,"cells":[54,61]},{"color":4,"cells":[33,40,47],"outer":3},{"color":4,"cells":[18,25,32]},{"color":4,"cells":[5,12],"outer":3},{"color":6,"cells":[39,46],"outer":8},{"color":6,"cells":[19,26]},{"color":6,"cells":[4,11]},{"color":8,"cells":[3,10,17,24,31,38,45,52,59]},{"color":2,"cells":[21,28,35]},{"color":1,"cells":[41,34,27]}],"gates":[{"cell":57,"out":[0,1],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,4,4]},{"cell":61,"out":[0,1],"queue":[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,6]},{"cell":54,"out":[1,0],"queue":[8,8,8,8,8,8,8,8,3,3,3],"ice":16},{"cell":50,"out":[-1,0],"queue":[3,3,3,3,3,3,8,8,8,8,8,8],"ice":17},{"cell":34,"out":[1,0],"queue":[1,1,1]},{"cell":28,"out":[-1,0],"queue":[2,2,2]}],"hide":[{"x":3,"y":0,"w":1,"h":9,"count":12,"grid":false},{"x":4,"y":0,"w":2,"h":9,"count":5,"grid":false},{"x":1,"y":0,"w":2,"h":9,"count":2,"grid":false}],"locks":[],"plan":[[17,0,5,0],[17,0,5,1],[17,0,5,2],[18,0,4,0],[18,0,4,1],[18,0,4,2],[0,0,0,0],[0,0,0,1],[1,0,0,2],[1,0,0,3],[2,0,0,4],[2,0,0,5],[2,0,0,6],[9,0,1,0],[9,0,1,1],[8,0,1,2],[8,0,1,3],[10,0,1,4],[10,0,1,5],[10,0,1,6],[3,0,0,7],[3,0,0,8],[3,0,0,9],[4,0,0,10],[4,0,0,11],[11,0,1,7],[11,0,1,8],[11,0,1,9],[12,0,1,10],[12,0,1,11],[13,0,0,12],[13,0,0,13],[5,0,1,12],[5,0,1,13],[6,0,1,14],[14,0,0,14],[14,0,0,15],[6,0,0,16],[7,0,0,17],[7,0,0,18],[4,1,3,0],[4,1,3,1],[5,1,3,2],[5,1,3,3],[12,1,3,4],[12,1,3,5],[2,1,3,6],[2,1,3,7],[2,1,3,8],[15,0,1,15],[15,0,1,16],[16,0,2,0],[16,0,2,1],[16,0,2,2],[16,0,2,3],[16,0,2,4],[16,0,2,5],[16,0,2,6],[16,0,2,7],[16,0,3,9],[10,1,2,8],[10,1,2,9],[10,1,2,10],[13,1,3,10],[13,1,3,11]],"mech":["voids","multiLayerGate","gateIce","nested","hideBox"]},{"n":28,"w":6,"h":8,"time":150,"scale":1.149999976158142,"voids":[],"walls":[27,24,8,15],"cats":[{"color":6,"cells":[18,12],"outer":4},{"color":6,"cells":[21,22],"outer":3},{"color":2,"cells":[19,20]},{"color":2,"cells":[17,23]},{"color":2,"cells":[3,4]},{"color":8,"cells":[5,11]},{"color":1,"cells":[6,0]},{"color":3,"cells":[1,2]},{"color":2,"cells":[40,34,28],"outer":5},{"color":1,"cells":[39,33]},{"color":1,"cells":[37,31,25],"outer":4},{"color":8,"cells":[43,44]},{"color":8,"cells":[47,41,35,29],"outer":4},{"color":6,"cells":[7,13,14],"outer":5},{"color":1,"cells":[9,10,16],"outer":6},{"color":4,"cells":[38,32,26],"outer":5,"ice":14},{"color":4,"cells":[42,36,30],"ice":10},{"color":5,"cells":[45,46],"ice":14}],"gates":[{"cell":0,"out":[0,-1],"queue":[1,1,1,1,1,1,1,1,1,1]},{"cell":23,"out":[1,0],"queue":[2,2,2,2,2,2,2,2,2]},{"cell":5,"out":[0,-1],"queue":[6,6,6,6,6,6,6,6,6,6],"ice":6},{"cell":18,"out":[-1,0],"queue":[8,8,8,8,8,8,8,8],"ice":9},{"cell":43,"out":[0,1],"queue":[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],"ice":16},{"cell":47,"out":[0,1],"queue":[5,5,5,5,5,5,5,5,5,5,5,3,3,3,3],"ice":13}],"hide":[{"x":0,"y":4,"w":3,"h":4,"count":4,"grid":false},{"x":3,"y":4,"w":2,"h":4,"count":3,"grid":false},{"x":5,"y":4,"w":1,"h":4,"count":12,"grid":false},{"x":1,"y":1,"w":4,"h":2,"count":10,"grid":false}],"locks":[],"plan":[[3,0,1,0],[3,0,1,1],[6,0,0,0],[6,0,0,1],[2,0,1,2],[2,0,1,3],[8,0,1,4],[8,0,1,5],[8,0,1,6],[10,0,0,2],[10,0,0,3],[10,0,0,4],[4,0,1,7],[4,0,1,8],[1,0,2,0],[1,0,2,1],[0,0,2,2],[0,0,2,3],[9,0,0,5],[9,0,0,6],[5,0,3,0],[5,0,3,1],[13,0,2,4],[13,0,2,5],[13,0,2,6],[14,0,0,7],[14,0,0,8],[14,0,0,9],[14,1,2,7],[14,1,2,8],[14,1,2,9],[12,0,3,2],[12,0,3,3],[12,0,3,4],[12,0,3,5],[8,1,5,0],[8,1,5,1],[8,1,5,2],[13,1,5,3],[13,1,5,4],[13,1,5,5],[16,0,4,0],[16,0,4,1],[16,0,4,2],[17,0,5,6],[17,0,5,7],[0,1,4,3],[0,1,4,4],[10,1,4,5],[10,1,4,6],[10,1,4,7],[12,1,4,8],[12,1,4,9],[12,1,4,10],[12,1,4,11],[15,0,4,12],[15,0,4,13],[15,0,4,14],[15,1,5,8],[15,1,5,9],[15,1,5,10],[1,1,5,11],[1,1,5,12],[7,0,5,13],[7,0,5,14],[11,0,3,6],[11,0,3,7]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox"]},{"n":29,"w":7,"h":9,"time":120,"scale":1.149999976158142,"voids":[],"walls":[54,47,40,33,38,31,50,43,36,29,19,12,15,8],"cats":[{"color":0,"cells":[57,56]},{"color":0,"cells":[62,61]},{"color":0,"cells":[42,49],"outer":3},{"color":2,"cells":[28,35]},{"color":2,"cells":[23,24],"outer":0},{"color":2,"cells":[25,26]},{"color":2,"cells":[20,27]},{"color":2,"cells":[6,13],"outer":6},{"color":3,"cells":[60,59,58],"outer":8},{"color":3,"cells":[21,22],"outer":8},{"color":2,"cells":[55,48]},{"color":2,"cells":[39,32],"outer":3},{"color":0,"cells":[46,53],"outer":1},{"color":0,"cells":[44,51],"outer":4},{"color":0,"cells":[34,41],"outer":3},{"color":4,"cells":[37,30],"outer":6},{"color":1,"cells":[45,52]},{"color":1,"cells":[7,14],"outer":4},{"color":8,"cells":[9,16],"outer":6},{"color":8,"cells":[5,4],"outer":4},{"color":0,"cells":[10,17]},{"color":2,"cells":[11,18]},{"color":2,"cells":[1,0]},{"color":6,"cells":[3,2]}],"gates":[{"cell":56,"out":[-1,0],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"cell":27,"out":[1,0],"queue":[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]},{"cell":59,"out":[0,1],"queue":[1,1,1,1,1,1,8,8,8,8,8,8],"ice":15},{"cell":62,"out":[1,0],"queue":[4,4,4,4,4,4,4,4,8,8,8],"ice":20},{"cell":21,"out":[-1,0],"queue":[3,3,3,3,3,3,3,3,3,3,3],"ice":24},{"cell":3,"out":[0,-1],"queue":[6,6,6,6,6,6,6,6,2,2,2],"ice":28}],"hide":[{"x":1,"y":4,"w":6,"h":4,"count":4,"grid":false},{"x":0,"y":0,"w":6,"h":3,"count":12,"grid":false}],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[2,0,0,2],[2,0,0,3],[6,0,1,0],[6,0,1,1],[5,0,1,2],[5,0,1,3],[7,0,1,4],[7,0,1,5],[4,0,1,6],[4,0,1,7],[11,0,1,8],[11,0,1,9],[10,0,1,10],[10,0,1,11],[13,0,0,4],[13,0,0,5],[12,0,0,6],[12,0,0,7],[3,0,1,12],[3,0,1,13],[1,0,0,8],[1,0,0,9],[21,0,1,14],[14,0,0,10],[14,0,0,11],[4,1,0,12],[4,1,0,13],[20,0,0,14],[20,0,0,15],[12,1,2,0],[12,1,2,1],[16,0,2,2],[16,0,2,3],[17,0,2,4],[17,0,2,5],[18,0,2,6],[18,0,2,7],[19,0,2,8],[19,0,2,9],[13,1,3,0],[13,1,3,1],[17,1,3,2],[17,1,3,3],[15,0,3,4],[15,0,3,5],[19,1,3,6],[19,1,3,7],[11,1,4,0],[11,1,4,1],[2,1,4,2],[2,1,4,3],[8,0,4,4],[8,0,4,5],[8,0,4,6],[8,1,2,10],[8,1,2,11],[8,1,3,8],[23,0,5,0],[23,0,5,1],[18,1,5,2],[18,1,5,3],[7,1,5,4],[7,1,5,5],[14,1,4,7],[14,1,4,8],[15,1,5,6],[15,1,5,7],[22,0,5,8],[22,0,5,9],[9,0,4,9],[9,0,4,10],[21,0,5,10],[9,1,3,9],[9,1,3,10]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox"]},{"n":30,"w":7,"h":9,"time":180,"scale":1.149999976158142,"voids":[],"walls":[51,46,30,25,9,15,33],"cats":[{"color":4,"cells":[58,59]},{"color":4,"cells":[53,60]},{"color":4,"cells":[38,45,52],"outer":1},{"color":4,"cells":[24,31]},{"color":4,"cells":[16,23]},{"color":4,"cells":[11,18]},{"color":2,"cells":[37,44],"outer":3},{"color":2,"cells":[32,39],"outer":0},{"color":2,"cells":[17,10],"outer":1},{"color":2,"cells":[2,3,4]},{"color":6,"cells":[62,61],"outer":5},{"color":6,"cells":[20,19],"outer":8},{"color":6,"cells":[13,12]},{"color":6,"cells":[6,5],"outer":5},{"color":6,"cells":[56,57],"outer":5},{"color":6,"cells":[42,43],"outer":8},{"color":6,"cells":[35,36]},{"color":1,"cells":[34,41,40],"outer":8},{"color":3,"cells":[55,54],"ice":23},{"color":1,"cells":[0,1],"outer":8},{"color":1,"cells":[14,21,22],"outer":0},{"color":8,"cells":[48,47]},{"color":2,"cells":[28,29],"ice":23},{"color":3,"cells":[49,50],"ice":23},{"color":3,"cells":[7,8],"ice":23},{"color":3,"cells":[27,26],"ice":23}],"gates":[{"cell":4,"out":[0,-1],"queue":[2,2,2,2,2,2,2,2,2,2,2],"ice":3},{"cell":48,"out":[1,0],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,6,6],"ice":11},{"cell":42,"out":[-1,0],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,1],"ice":16},{"cell":20,"out":[1,0],"queue":[5,5,5,5,5,5],"ice":22},{"cell":14,"out":[-1,0],"queue":[3,3,3,3,3,3,3,3,3,3],"ice":20},{"cell":2,"out":[0,-1],"queue":[0,0,0,0,0,8,8,8,8,8,8,8,8,8,8,8],"ice":5},{"cell":59,"out":[0,1],"queue":[4,4,4,4,4,4,4,4,4,4,4,4,4]}],"hide":[{"x":0,"y":0,"w":2,"h":9,"count":10,"grid":false},{"x":5,"y":0,"w":2,"h":9,"count":10,"grid":false}],"locks":[],"plan":[[0,0,6,0],[0,0,6,1],[1,0,6,2],[1,0,6,3],[2,0,6,4],[2,0,6,5],[2,0,6,6],[9,0,0,0],[9,0,0,1],[9,0,0,2],[8,0,0,3],[8,0,0,4],[4,0,6,7],[4,0,6,8],[7,0,0,5],[7,0,0,6],[7,1,5,0],[7,1,5,1],[6,0,0,7],[6,0,0,8],[5,0,6,9],[5,0,6,10],[3,0,6,11],[3,0,6,12],[16,0,1,0],[16,0,1,1],[15,0,1,2],[15,0,1,3],[11,0,1,4],[11,0,1,5],[13,0,1,6],[13,0,1,7],[12,0,1,8],[12,0,1,9],[2,1,2,0],[2,1,2,1],[2,1,2,2],[17,0,2,3],[17,0,2,4],[17,0,2,5],[10,0,1,10],[10,0,1,11],[8,1,2,6],[8,1,2,7],[20,0,2,8],[20,0,2,9],[20,0,2,10],[6,1,4,0],[6,1,4,1],[13,1,3,0],[13,1,3,1],[20,1,5,2],[20,1,5,3],[20,1,5,4],[11,1,5,5],[11,1,5,6],[17,1,5,7],[17,1,5,8],[17,1,5,9],[15,1,5,10],[15,1,5,11],[10,1,3,2],[10,1,3,3],[14,0,1,12],[14,0,1,13],[14,1,3,4],[14,1,3,5],[21,0,5,12],[21,0,5,13],[19,0,2,11],[19,0,2,12],[19,1,5,14],[19,1,5,15],[24,0,4,2],[24,0,4,3],[22,0,0,9],[22,0,0,10],[23,0,4,4],[23,0,4,5],[25,0,4,6],[25,0,4,7],[18,0,4,8],[18,0,4,9]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox"]},{"n":31,"w":7,"h":10,"time":170,"scale":1.149999976158142,"voids":[],"walls":[32,30,28,34,47,54,68,59,52,43,45,50,64,17,10,3,19,20,15,14],"cats":[{"color":6,"cells":[63,56]},{"color":6,"cells":[58,57]},{"color":6,"cells":[67,66,65],"outer":8},{"color":6,"cells":[61,60]},{"color":6,"cells":[69,62]},{"color":6,"cells":[49,42,35],"outer":0},{"color":6,"cells":[37,44,51],"outer":4},{"color":6,"cells":[39,46,53],"outer":3},{"color":6,"cells":[55,48,41],"outer":0},{"color":6,"cells":[29,36]},{"color":6,"cells":[31,38]},{"color":6,"cells":[33,40]},{"color":2,"cells":[22,21]},{"color":2,"cells":[25,24,23],"outer":1},{"color":2,"cells":[27,26]},{"color":2,"cells":[2,9,16],"outer":8},{"color":2,"cells":[4,11,18],"outer":3},{"color":2,"cells":[7,8],"outer":3},{"color":2,"cells":[0,1]},{"color":2,"cells":[13,12],"outer":8},{"color":2,"cells":[6,5]}],"gates":[{"cell":56,"out":[-1,0],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]},{"cell":21,"out":[-1,0],"queue":[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]},{"cell":41,"out":[1,0],"queue":[4,4,4],"ice":23},{"cell":27,"out":[1,0],"queue":[0,0,0,0,0,0,1,1,1],"ice":21},{"cell":65,"out":[0,1],"queue":[8,8,8,8,8,8,8,8],"ice":26},{"cell":67,"out":[0,1],"queue":[3,3,3,3,3,3,3,3],"ice":25}],"hide":[],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[1,0,0,2],[1,0,0,3],[2,0,0,4],[2,0,0,5],[2,0,0,6],[12,0,1,0],[12,0,1,1],[13,0,1,2],[13,0,1,3],[13,0,1,4],[5,0,0,7],[5,0,0,8],[5,0,0,9],[6,0,0,10],[6,0,0,11],[6,0,0,12],[9,0,0,13],[9,0,0,14],[10,0,0,15],[10,0,0,16],[7,0,0,17],[7,0,0,18],[7,0,0,19],[15,0,1,5],[15,0,1,6],[15,0,1,7],[14,0,1,8],[14,0,1,9],[16,0,1,10],[16,0,1,11],[16,0,1,12],[19,0,1,13],[19,0,1,14],[17,0,1,15],[17,0,1,16],[18,0,1,17],[18,0,1,18],[20,0,1,19],[20,0,1,20],[3,0,0,20],[3,0,0,21],[4,0,0,22],[4,0,0,23],[8,0,0,24],[8,0,0,25],[8,0,0,26],[11,0,0,27],[11,0,0,28],[8,1,3,0],[8,1,3,1],[8,1,3,2],[5,1,3,3],[5,1,3,4],[5,1,3,5],[6,1,2,0],[6,1,2,1],[6,1,2,2],[13,1,3,6],[13,1,3,7],[13,1,3,8],[7,1,5,0],[7,1,5,1],[7,1,5,2],[2,1,4,0],[2,1,4,1],[2,1,4,2],[19,1,4,3],[19,1,4,4],[16,1,5,3],[16,1,5,4],[16,1,5,5],[15,1,4,5],[15,1,4,6],[15,1,4,7],[17,1,5,6],[17,1,5,7]],"mech":["walls","multiLayerGate","gateIce","nested"]},{"n":32,"w":6,"h":11,"time":160,"scale":1.149999976158142,"voids":[],"walls":[58,59,55,54,23,4,1,18],"cats":[{"color":4,"cells":[61,60]},{"color":4,"cells":[63,62]},{"color":4,"cells":[65,64],"outer":3},{"color":4,"cells":[51,57]},{"color":4,"cells":[49,48]},{"color":4,"cells":[32,38,44],"outer":0},{"color":1,"cells":[50,56]},{"color":1,"cells":[52,53],"outer":0},{"color":1,"cells":[42,36,30],"outer":8},{"color":1,"cells":[24,25],"outer":3},{"color":1,"cells":[26,27]},{"color":1,"cells":[28,29]},{"color":8,"cells":[33,39,45],"outer":3},{"color":2,"cells":[35,41,47],"outer":0},{"color":0,"cells":[13,19]},{"color":8,"cells":[7,8]},{"color":8,"cells":[9,10],"outer":3},{"color":4,"cells":[16,22]},{"color":2,"cells":[5,11,17],"outer":6},{"color":6,"cells":[2,3]},{"color":3,"cells":[0,6,12],"outer":0},{"color":6,"cells":[21,15,14,20]},{"color":6,"cells":[34,40,46],"ice":30},{"color":8,"cells":[31,37,43],"ice":30}],"gates":[{"cell":60,"out":[-1,0],"queue":[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]},{"cell":6,"out":[-1,0],"queue":[2,2,2,2,2,2]},{"cell":11,"out":[1,0],"queue":[3,3,3,3,3,3,3,3,3,3,3,3]},{"cell":29,"out":[1,0],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,1],"ice":6},{"cell":65,"out":[1,0],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,0],"ice":17},{"cell":36,"out":[-1,0],"queue":[6,6,6,6,6,6,6,6,6,6,6,6],"ice":20},{"cell":47,"out":[1,0],"queue":[8,8,8,8,8,8,8,8,8,8,8,8,8],"ice":24}],"hide":[{"x":0,"y":0,"w":6,"h":4,"count":12,"grid":false}],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[1,0,0,2],[1,0,0,3],[2,0,0,4],[2,0,0,5],[3,0,0,6],[3,0,0,7],[4,0,0,8],[4,0,0,9],[5,0,0,10],[5,0,0,11],[5,0,0,12],[11,0,3,0],[11,0,3,1],[10,0,3,2],[10,0,3,3],[8,0,3,4],[8,0,3,5],[8,0,3,6],[9,0,3,7],[9,0,3,8],[7,0,3,9],[7,0,3,10],[6,0,3,11],[6,0,3,12],[13,0,1,0],[13,0,1,1],[13,0,1,2],[9,1,2,0],[9,1,2,1],[20,0,2,2],[20,0,2,3],[20,0,2,4],[18,0,1,3],[18,0,1,4],[18,0,1,5],[2,1,2,5],[2,1,2,6],[5,1,4,0],[5,1,4,1],[5,1,4,2],[14,0,4,3],[14,0,4,4],[7,1,4,5],[7,1,4,6],[20,1,4,7],[20,1,4,8],[20,1,4,9],[13,1,4,10],[13,1,4,11],[13,1,4,12],[17,0,0,13],[17,0,0,14],[18,1,5,0],[18,1,5,1],[18,1,5,2],[8,1,6,0],[8,1,6,1],[8,1,6,2],[16,0,6,3],[16,0,6,4],[19,0,5,3],[19,0,5,4],[21,0,5,5],[21,0,5,6],[21,0,5,7],[21,0,5,8],[16,1,2,7],[16,1,2,8],[12,0,6,5],[12,0,6,6],[12,0,6,7],[12,1,2,9],[12,1,2,10],[12,1,2,11],[15,0,6,8],[15,0,6,9],[23,0,6,10],[23,0,6,11],[23,0,6,12],[22,0,5,9],[22,0,5,10],[22,0,5,11]],"mech":["walls","gateIce","catIce","nested","hideBox"]},{"n":33,"w":6,"h":12,"time":150,"scale":1.0499999523162842,"voids":[6,0,66,67,68,69,70,71,65,64,63,61,60,62,59,53],"walls":[22,26,19,34,38,57,51,55,49,10,4,8,2],"cats":[{"color":4,"cells":[7,1],"outer":6},{"color":4,"cells":[9,3]},{"color":4,"cells":[11,5],"outer":1},{"color":2,"cells":[17,23,29]},{"color":2,"cells":[14,13]},{"color":0,"cells":[16,15]},{"color":0,"cells":[12,18],"outer":10},{"color":4,"cells":[24,25]},{"color":6,"cells":[27,28]},{"color":1,"cells":[21,20]},{"color":4,"cells":[42,36,30],"outer":8},{"color":6,"cells":[37,43]},{"color":6,"cells":[46,45,44],"outer":8},{"color":2,"cells":[31,32,33],"outer":8},{"color":1,"cells":[40,39]},{"color":0,"cells":[35,41,47],"outer":4},{"color":8,"cells":[54,48]},{"color":2,"cells":[56,50],"outer":10},{"color":0,"cells":[58,52]}],"gates":[{"cell":5,"out":[0,-1],"queue":[4,4]},{"cell":3,"out":[0,-1],"queue":[4,4]},{"cell":1,"out":[0,-1],"queue":[4,4]},{"cell":29,"out":[1,0],"queue":[2,2,2,4,4,4,4,4,4,4,4]},{"cell":24,"out":[-1,0],"queue":[2,2,2,2,2,2,2]},{"cell":42,"out":[-1,0],"queue":[6,6,6,6,6,6,6,6,6],"ice":7},{"cell":58,"out":[0,1],"queue":[0,0,0,0,0,0,0,0,0,8,8,8,8,8,8],"ice":10},{"cell":47,"out":[1,0],"queue":[10,10,10,10,8,8,8,8,8],"ice":14},{"cell":11,"out":[1,0],"queue":[1,1,1,1,1,1],"ice":19}],"hide":[{"x":0,"y":2,"w":6,"h":3,"count":3,"grid":false},{"x":0,"y":5,"w":6,"h":3,"count":6,"grid":false},{"x":0,"y":8,"w":5,"h":2,"count":8,"grid":false}],"locks":[],"plan":[[0,0,2,0],[0,0,2,1],[1,0,1,0],[1,0,1,1],[2,0,0,0],[2,0,0,1],[3,0,3,0],[3,0,3,1],[3,0,3,2],[4,0,4,0],[4,0,4,1],[7,0,3,3],[7,0,3,4],[13,0,4,2],[13,0,4,3],[13,0,4,4],[11,0,5,0],[11,0,5,1],[12,0,5,2],[12,0,5,3],[12,0,5,4],[10,0,3,5],[10,0,3,6],[10,0,3,7],[18,0,6,0],[18,0,6,1],[15,0,6,2],[15,0,6,3],[15,0,6,4],[15,1,3,8],[15,1,3,9],[15,1,3,10],[0,1,5,5],[0,1,5,6],[17,0,4,5],[17,0,4,6],[17,1,7,0],[17,1,7,1],[8,0,5,7],[8,0,5,8],[5,0,6,5],[5,0,6,6],[6,0,6,7],[6,0,6,8],[2,1,8,0],[2,1,8,1],[6,1,7,2],[6,1,7,3],[10,1,7,4],[10,1,7,5],[10,1,7,6],[12,1,7,7],[12,1,7,8],[12,1,6,9],[13,1,6,10],[13,1,6,11],[13,1,6,12],[9,0,8,2],[9,0,8,3],[14,0,8,4],[14,0,8,5],[16,0,6,13],[16,0,6,14]],"mech":["voids","walls","multiLayerGate","gateIce","nested","hideBox"]},{"n":34,"w":7,"h":10,"time":170,"scale":1.149999976158142,"voids":[],"walls":[52,45,61,57,40,25,23,36,10,12,8,3],"cats":[{"color":1,"cells":[63,64]},{"color":1,"cells":[59,66]},{"color":1,"cells":[44,51],"outer":5},{"color":0,"cells":[58,65]},{"color":0,"cells":[42,49,56],"outer":8},{"color":0,"cells":[60,67]},{"color":0,"cells":[69,68],"outer":2},{"color":0,"cells":[46,53],"outer":4},{"color":3,"cells":[47,54]},{"color":3,"cells":[48,55,62],"outer":5},{"color":3,"cells":[43,50]},{"color":4,"cells":[21,28,35],"outer":2},{"color":4,"cells":[30,37]},{"color":0,"cells":[24,31,38],"outer":2},{"color":0,"cells":[22,29]},{"color":0,"cells":[27,34,41],"outer":8},{"color":2,"cells":[32,39]},{"color":8,"cells":[26,33]},{"color":1,"cells":[0,7,14],"outer":8},{"color":8,"cells":[6,13,20]},{"color":0,"cells":[19,18,17,16,15],"outer":1},{"color":0,"cells":[1,2,9],"outer":3},{"color":2,"cells":[5,4,11],"outer":5}],"gates":[{"cell":65,"out":[0,1],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"cell":35,"out":[-1,0],"queue":[4,4,4,4,4,4,4]},{"cell":20,"out":[1,0],"queue":[8,8,8,8,8,8,8,8,8,8,8,8,8,8]},{"cell":62,"out":[1,0],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,1,1],"ice":7},{"cell":41,"out":[1,0],"queue":[5,5,5,5,5,5,5,5,2,2,2],"ice":26},{"cell":1,"out":[0,-1],"queue":[3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2],"ice":23}],"hide":[{"x":0,"y":3,"w":7,"h":3,"count":5,"grid":false},{"x":0,"y":0,"w":7,"h":3,"count":8,"grid":false}],"locks":[],"plan":[[3,0,0,0],[3,0,0,1],[5,0,0,2],[5,0,0,3],[6,0,0,4],[6,0,0,5],[7,0,0,6],[7,0,0,7],[4,0,0,8],[4,0,0,9],[4,0,0,10],[11,0,1,0],[11,0,1,1],[11,0,1,2],[12,0,1,3],[12,0,1,4],[0,0,3,0],[0,0,3,1],[19,0,2,0],[19,0,2,1],[19,0,2,2],[17,0,2,3],[17,0,2,4],[1,0,3,2],[1,0,3,3],[7,1,1,5],[7,1,1,6],[15,0,0,11],[15,0,0,12],[15,0,0,13],[15,1,2,5],[15,1,2,6],[15,1,2,7],[4,1,2,8],[4,1,2,9],[4,1,2,10],[13,0,0,14],[13,0,0,15],[13,0,0,16],[2,0,3,4],[2,0,3,5],[14,0,0,17],[14,0,0,18],[20,0,0,19],[20,0,0,20],[20,0,0,21],[20,0,0,22],[20,0,0,23],[18,0,3,6],[18,0,3,7],[18,0,3,8],[18,1,2,11],[18,1,2,12],[18,1,2,13],[20,1,3,9],[20,1,3,10],[20,1,3,11],[20,1,3,12],[20,1,3,13],[21,0,0,24],[21,0,0,25],[21,0,0,26],[8,0,5,0],[8,0,5,1],[9,0,5,2],[9,0,5,3],[9,0,5,4],[10,0,5,5],[10,0,5,6],[2,1,4,0],[2,1,4,1],[9,1,4,2],[9,1,4,3],[9,1,4,4],[21,1,5,7],[21,1,5,8],[21,1,5,9],[22,0,5,10],[22,0,5,11],[22,0,5,12],[22,1,4,5],[22,1,4,6],[22,1,4,7],[6,1,5,13],[6,1,5,14],[11,1,4,8],[11,1,4,9],[11,1,4,10],[16,0,5,15],[16,0,5,16],[13,1,5,17],[13,1,5,18],[13,1,5,19]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox"]},{"n":35,"w":7,"h":9,"time":150,"scale":1.149999976158142,"voids":[],"walls":[52,31,10,54,47,15,8,50,43,29,33,36,19,12,26],"cats":[{"color":2,"cells":[49,56]},{"color":2,"cells":[60,61,62],"outer":3},{"color":2,"cells":[34,27,20],"outer":3},{"color":2,"cells":[13,6]},{"color":8,"cells":[2,1,0]},{"color":8,"cells":[22,21]},{"color":8,"cells":[41,40]},{"color":0,"cells":[57,58,59]},{"color":4,"cells":[55,48],"outer":2},{"color":6,"cells":[28,35,42],"outer":1},{"color":4,"cells":[7,14],"outer":6},{"color":3,"cells":[5,4,3],"outer":8},{"color":1,"cells":[44,51]},{"color":1,"cells":[45,46,53],"outer":3},{"color":1,"cells":[17,16,9],"outer":4},{"color":1,"cells":[18,11]},{"color":6,"cells":[23,30],"outer":3},{"color":0,"cells":[37,38]},{"color":0,"cells":[25,24]},{"color":4,"cells":[32,39],"outer":0}],"gates":[{"cell":6,"out":[1,0],"queue":[2,2,2,2,2,2,2,2,2,2,2,2]},{"cell":0,"out":[-1,0],"queue":[8,8,8,8,8,8,8,8,8,8],"ice":2},{"cell":59,"out":[0,1],"queue":[0,0,0,0,0,0,0,0,0],"ice":4},{"cell":49,"out":[-1,0],"queue":[6,6,6,6,6,6,6,3,3,3,3,3,3],"ice":14},{"cell":55,"out":[1,0],"queue":[4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3],"ice":17},{"cell":35,"out":[-1,0],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,1],"ice":10}],"hide":[{"x":2,"y":1,"w":3,"h":7,"count":4,"grid":false}],"locks":[],"plan":[[3,0,0,0],[3,0,0,1],[2,0,0,2],[2,0,0,3],[2,0,0,4],[4,0,1,0],[4,0,1,1],[4,0,1,2],[5,0,1,3],[5,0,1,4],[7,0,2,0],[7,0,2,1],[7,0,2,2],[17,0,2,3],[17,0,2,4],[18,0,2,5],[18,0,2,6],[6,0,1,5],[6,0,1,6],[1,0,0,5],[1,0,0,6],[1,0,0,7],[0,0,0,8],[0,0,0,9],[12,0,5,0],[12,0,5,1],[13,0,5,2],[13,0,5,3],[13,0,5,4],[14,0,5,5],[14,0,5,6],[14,0,5,7],[15,0,5,8],[15,0,5,9],[16,0,3,0],[16,0,3,1],[9,0,3,2],[9,0,3,3],[9,0,3,4],[9,1,5,10],[9,1,5,11],[9,1,5,12],[8,0,4,0],[8,0,4,1],[8,1,0,10],[8,1,0,11],[10,0,4,2],[10,0,4,3],[14,1,4,4],[14,1,4,5],[14,1,4,6],[19,0,4,7],[19,0,4,8],[10,1,3,5],[10,1,3,6],[1,1,3,7],[1,1,3,8],[1,1,3,9],[2,1,3,10],[2,1,3,11],[2,1,3,12],[19,1,2,7],[19,1,2,8],[13,1,4,9],[13,1,4,10],[13,1,4,11],[16,1,4,12],[16,1,4,13],[11,0,4,14],[11,0,4,15],[11,0,4,16],[11,1,1,7],[11,1,1,8],[11,1,1,9]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox"]},{"n":36,"w":6,"h":7,"time":120,"scale":1.149999976158142,"voids":[],"walls":[],"cats":[{"color":10,"cells":[18,24,30,36],"outer":0},{"color":5,"cells":[19,25,31,37]},{"color":3,"cells":[20,26,32,38],"outer":0},{"color":2,"cells":[21,27,33,39]},{"color":0,"cells":[22,28,34,40],"outer":5},{"color":3,"cells":[23,29,35,41]},{"color":2,"cells":[10,9,8,7]},{"color":10,"cells":[3,4,5]},{"color":5,"cells":[2,1,0]}],"gates":[{"cell":5,"out":[1,0],"queue":[10,10,10,10,10,10,10]},{"cell":0,"out":[-1,0],"queue":[5,5,5,5,5,5,5,5,5,5,5]},{"cell":41,"out":[1,0],"queue":[0,0,0,0,0,0,0,0,0,0,0,0],"ice":8},{"cell":36,"out":[-1,0],"queue":[3,3,3,3,3,3,3,3],"ice":5},{"cell":3,"out":[0,-1],"queue":[2,2,2,2,2,2,2,2],"ice":4}],"hide":[{"x":1,"y":2,"w":1,"h":1,"count":10,"grid":true},{"x":2,"y":2,"w":1,"h":1,"count":10,"grid":true},{"x":3,"y":2,"w":1,"h":1,"count":10,"grid":true},{"x":4,"y":2,"w":1,"h":1,"count":10,"grid":true},{"x":5,"y":2,"w":1,"h":1,"count":3,"grid":true},{"x":5,"y":1,"w":1,"h":1,"count":3,"grid":true},{"x":0,"y":2,"w":1,"h":1,"count":2,"grid":true},{"x":0,"y":1,"w":1,"h":1,"count":2,"grid":true},{"x":0,"y":3,"w":6,"h":4,"count":2,"grid":false}],"locks":[],"plan":[[7,0,0,0],[7,0,0,1],[7,0,0,2],[8,0,1,0],[8,0,1,1],[8,0,1,2],[0,0,0,3],[0,0,0,4],[0,0,0,5],[0,0,0,6],[1,0,1,3],[1,0,1,4],[1,0,1,5],[1,0,1,6],[6,0,4,0],[6,0,4,1],[6,0,4,2],[6,0,4,3],[2,0,3,0],[2,0,3,1],[2,0,3,2],[2,0,3,3],[3,0,4,4],[3,0,4,5],[3,0,4,6],[3,0,4,7],[5,0,3,4],[5,0,3,5],[5,0,3,6],[5,0,3,7],[0,1,2,0],[0,1,2,1],[0,1,2,2],[0,1,2,3],[2,1,2,4],[2,1,2,5],[2,1,2,6],[2,1,2,7],[4,0,2,8],[4,0,2,9],[4,0,2,10],[4,0,2,11],[4,1,1,7],[4,1,1,8],[4,1,1,9],[4,1,1,10]],"mech":["gateIce","nested","hideBox","hideGrid"]},{"n":37,"w":7,"h":11,"time":120,"scale":1.149999976158142,"voids":[76,75,69,71,63,70,64,68,8,0,7,1,12,13,6,5],"walls":[35,36,37,38,23,24,10,39,66,51,26,19,53],"cats":[{"color":0,"cells":[22,29,30,31],"outer":8},{"color":0,"cells":[14,21,28],"outer":3},{"color":1,"cells":[16,17]},{"color":1,"cells":[18,11],"outer":2},{"color":1,"cells":[4,3]},{"color":1,"cells":[2,9],"outer":8},{"color":2,"cells":[73,72]},{"color":2,"cells":[60,67,74],"outer":6},{"color":6,"cells":[65,58]},{"color":1,"cells":[46,45,52],"outer":4},{"color":6,"cells":[61,62]},{"color":6,"cells":[34,41]},{"color":1,"cells":[20,27],"outer":3},{"color":1,"cells":[55,48]},{"color":8,"cells":[42,49,56],"outer":4},{"color":4,"cells":[43,50,57],"outer":8}],"gates":[{"cell":3,"out":[0,-1],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},{"cell":62,"out":[1,0],"queue":[6,6,6,6,6,6,6,6,6]},{"cell":73,"out":[0,1],"queue":[2,2,2,2,2,2,2]},{"cell":56,"out":[-1,0],"queue":[8,8,8,8,8,8,8,8,8,8,8,8],"ice":18},{"cell":28,"out":[-1,0],"queue":[4,4,4,4,4,4,4,4,4,3,3,3,3,3],"ice":16},{"cell":4,"out":[1,0],"queue":[0,0,0,0,0,0,0],"ice":4}],"hide":[{"x":4,"y":4,"w":1,"h":1,"count":4,"grid":true},{"x":4,"y":3,"w":1,"h":1,"count":4,"grid":true},{"x":1,"y":2,"w":1,"h":1,"count":5,"grid":true},{"x":3,"y":8,"w":1,"h":1,"count":4,"grid":true},{"x":2,"y":6,"w":1,"h":1,"count":6,"grid":true},{"x":5,"y":6,"w":1,"h":1,"count":4,"grid":true},{"x":5,"y":5,"w":1,"h":1,"count":5,"grid":true},{"x":5,"y":4,"w":1,"h":1,"count":5,"grid":true},{"x":5,"y":7,"w":1,"h":1,"count":6,"grid":true},{"x":5,"y":2,"w":2,"h":7,"count":7,"grid":false},{"x":2,"y":6,"w":3,"h":5,"count":6,"grid":false},{"x":0,"y":6,"w":2,"h":3,"count":12,"grid":false}],"locks":[],"plan":null,"mech":["voids","walls","multiLayerGate","gateIce","nested","hideBox","hideGrid"]},{"n":38,"w":5,"h":9,"time":110,"scale":1.149999976158142,"voids":[],"walls":[],"cats":[{"color":6,"cells":[27,32,37,42],"outer":8},{"color":5,"cells":[38,39,44],"outer":0},{"color":5,"cells":[33,34,29]},{"color":1,"cells":[23,22,21]},{"color":2,"cells":[15,10,11],"outer":8},{"color":6,"cells":[13,12,17],"outer":3},{"color":8,"cells":[19,14,9,4],"outer":3},{"color":1,"cells":[0,5,6]},{"color":0,"cells":[8,7,2],"outer":1},{"color":7,"cells":[30,31,26]},{"color":0,"cells":[40,35,36],"outer":2}],"gates":[{"cell":29,"out":[1,0],"queue":[5,5,5,5,5,5]},{"cell":25,"out":[-1,0],"queue":[0,0,0,0,0,0,0,0,0],"ice":2},{"cell":14,"out":[1,0],"queue":[1,1,1,1,1,1,1,1,1],"ice":4},{"cell":2,"out":[0,-1],"queue":[6,6,6,6,6,6,6],"ice":6},{"cell":19,"out":[1,0],"queue":[2,2,2,2,2,2],"ice":8},{"cell":10,"out":[-1,0],"queue":[3,3,3,3,3,3,3,7,7,7],"ice":9},{"cell":42,"out":[0,1],"queue":[8,8,8,8,8,8,8,8,8,8,8],"ice":13}],"hide":[{"x":3,"y":8,"w":1,"h":1,"count":2,"grid":true},{"x":3,"y":5,"w":1,"h":1,"count":2,"grid":true},{"x":0,"y":4,"w":1,"h":1,"count":11,"grid":true},{"x":1,"y":3,"w":1,"h":1,"count":11,"grid":true},{"x":4,"y":4,"w":1,"h":1,"count":11,"grid":true},{"x":1,"y":0,"w":1,"h":1,"count":11,"grid":true},{"x":3,"y":0,"w":1,"h":1,"count":11,"grid":true},{"x":3,"y":3,"w":1,"h":1,"count":1,"grid":true},{"x":0,"y":0,"w":5,"h":5,"count":3,"grid":false},{"x":1,"y":8,"w":1,"h":1,"count":11,"grid":true},{"x":0,"y":5,"w":2,"h":4,"count":2,"grid":false}],"locks":[],"plan":[[2,0,0,0],[2,0,0,1],[2,0,0,2],[1,0,0,3],[1,0,0,4],[1,0,0,5],[10,0,1,0],[10,0,1,1],[10,0,1,2],[1,1,1,3],[1,1,1,4],[1,1,1,5],[3,0,2,0],[3,0,2,1],[3,0,2,2],[7,0,2,3],[7,0,2,4],[7,0,2,5],[5,0,3,0],[5,0,3,1],[5,0,3,2],[8,0,1,6],[8,0,1,7],[8,0,1,8],[8,1,2,6],[8,1,2,7],[8,1,2,8],[10,1,4,0],[10,1,4,1],[10,1,4,2],[5,1,5,0],[5,1,5,1],[5,1,5,2],[4,0,4,3],[4,0,4,4],[4,0,4,5],[0,0,3,3],[0,0,3,4],[0,0,3,5],[0,0,3,6],[6,0,6,0],[6,0,6,1],[6,0,6,2],[6,0,6,3],[6,1,5,3],[6,1,5,4],[6,1,5,5],[6,1,5,6],[0,1,6,4],[0,1,6,5],[0,1,6,6],[0,1,6,7],[4,1,6,8],[4,1,6,9],[4,1,6,10],[9,0,5,7],[9,0,5,8],[9,0,5,9]],"mech":["multiLayerGate","gateIce","nested","hideBox","hideGrid"]},{"n":39,"w":7,"h":8,"time":110,"scale":1.149999976158142,"voids":[],"walls":[24,23,44],"cats":[{"color":0,"cells":[0,7,14,15,22,21]},{"color":2,"cells":[2,1,8]},{"color":6,"cells":[6,13,20,27],"outer":2},{"color":4,"cells":[19,12,5],"outer":3},{"color":5,"cells":[3,4,11],"outer":4},{"color":1,"cells":[16,17,18,25,26],"outer":4},{"color":5,"cells":[36,35,28]},{"color":1,"cells":[45,52,51,50,43,42,49],"outer":6},{"color":6,"cells":[41,48,55,54]},{"color":0,"cells":[37,30,31,38,39,40],"outer":4},{"color":2,"cells":[47,46,53],"ice":3},{"color":5,"cells":[32,33,34],"ice":8}],"gates":[{"cell":2,"out":[0,-1],"queue":[2,2,2,2,2,2,2,2,2,2]},{"cell":4,"out":[0,-1],"queue":[5,5,5,5,5,5,5,5,5],"ice":1},{"cell":20,"out":[1,0],"queue":[0,0,0,0,0,0,0,0,0,0,0,0],"ice":2},{"cell":14,"out":[-1,0],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],"ice":5},{"cell":35,"out":[-1,0],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,3,3,3],"ice":7},{"cell":52,"out":[0,1],"queue":[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],"ice":12}],"hide":[{"x":2,"y":1,"w":1,"h":1,"count":2,"grid":true},{"x":3,"y":1,"w":1,"h":1,"count":2,"grid":true},{"x":1,"y":4,"w":1,"h":1,"count":7,"grid":true},{"x":0,"y":4,"w":7,"h":4,"count":3,"grid":false}],"locks":[],"plan":[[1,0,0,0],[1,0,0,1],[1,0,0,2],[4,0,1,0],[4,0,1,1],[4,0,1,2],[0,0,2,0],[0,0,2,1],[0,0,2,2],[0,0,2,3],[0,0,2,4],[0,0,2,5],[6,0,1,3],[6,0,1,4],[6,0,1,5],[9,0,2,6],[9,0,2,7],[9,0,2,8],[9,0,2,9],[9,0,2,10],[9,0,2,11],[8,0,3,0],[8,0,3,1],[8,0,3,2],[8,0,3,3],[2,0,3,4],[2,0,3,5],[2,0,3,6],[2,0,3,7],[5,0,4,0],[5,0,4,1],[5,0,4,2],[5,0,4,3],[5,0,4,4],[2,1,0,3],[2,1,0,4],[2,1,0,5],[2,1,0,6],[7,0,4,5],[7,0,4,6],[7,0,4,7],[7,0,4,8],[7,0,4,9],[7,0,4,10],[7,0,4,11],[7,1,3,8],[7,1,3,9],[7,1,3,10],[7,1,3,11],[7,1,3,12],[7,1,3,13],[7,1,3,14],[10,0,0,7],[10,0,0,8],[10,0,0,9],[5,1,5,0],[5,1,5,1],[5,1,5,2],[5,1,5,3],[5,1,5,4],[9,1,5,5],[9,1,5,6],[9,1,5,7],[9,1,5,8],[9,1,5,9],[9,1,5,10],[3,0,5,11],[3,0,5,12],[3,0,5,13],[3,1,4,12],[3,1,4,13],[3,1,4,14],[4,1,5,14],[4,1,5,15],[4,1,5,16],[11,0,1,6],[11,0,1,7],[11,0,1,8]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid"]},{"n":40,"w":6,"h":8,"time":110,"scale":1.149999976158142,"voids":[],"walls":[16,10],"cats":[{"color":6,"cells":[42,36,30,24],"outer":3},{"color":6,"cells":[2,8,14,20],"outer":4},{"color":0,"cells":[44,38,32,26],"outer":2},{"color":0,"cells":[0,6,12,18]},{"color":4,"cells":[43,37,31],"outer":3},{"color":10,"cells":[1,7,13],"outer":6},{"color":6,"cells":[45,46,47,41]},{"color":10,"cells":[34,35,29,28,27,33,39]},{"color":3,"cells":[23,17,11,5,4,3,9,15,21,22],"outer":2}],"gates":[{"cell":18,"out":[-1,0],"queue":[0,0,0,0,0,0,0,0]},{"cell":12,"out":[-1,0],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],"ice":1},{"cell":42,"out":[-1,0],"queue":[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2]},{"cell":41,"out":[1,0],"queue":[4,4,4,4,4,4,4,2,2,2,2,2,2,2,2,2,2],"ice":4},{"cell":17,"out":[1,0],"queue":[10,10,10,10,10,10,10,10,10,10],"ice":9}],"hide":[{"x":1,"y":4,"w":1,"h":1,"count":4,"grid":true},{"x":1,"y":3,"w":1,"h":1,"count":3,"grid":true},{"x":4,"y":6,"w":1,"h":1,"count":7,"grid":true},{"x":3,"y":0,"w":3,"h":4,"count":7,"grid":false},{"x":3,"y":4,"w":3,"h":4,"count":4,"grid":false}],"locks":[],"plan":[[3,0,0,0],[3,0,0,1],[3,0,0,2],[3,0,0,3],[0,0,1,0],[0,0,1,1],[0,0,1,2],[0,0,1,3],[0,1,2,0],[0,1,2,1],[0,1,2,2],[0,1,2,3],[1,0,1,4],[1,0,1,5],[1,0,1,6],[1,0,1,7],[2,0,0,4],[2,0,0,5],[2,0,0,6],[2,0,0,7],[4,0,3,0],[4,0,3,1],[4,0,3,2],[6,0,1,8],[6,0,1,9],[6,0,1,10],[6,0,1,11],[4,1,2,4],[4,1,2,5],[4,1,2,6],[1,1,3,3],[1,1,3,4],[1,1,3,5],[1,1,3,6],[2,1,3,7],[2,1,3,8],[2,1,3,9],[2,1,3,10],[8,0,2,7],[8,0,2,8],[8,0,2,9],[8,0,2,10],[8,0,2,11],[8,0,2,12],[8,0,2,13],[8,0,2,14],[8,0,2,15],[8,0,2,16],[5,0,4,0],[5,0,4,1],[5,0,4,2],[8,1,2,17],[8,1,2,18],[8,1,2,19],[8,1,2,20],[5,1,1,12],[5,1,1,13],[5,1,1,14],[7,0,4,3],[7,0,4,4],[7,0,4,5],[7,0,4,6],[7,0,4,7],[7,0,4,8],[7,0,4,9],[8,1,3,11],[8,1,3,12],[8,1,3,13],[8,1,3,14],[8,1,3,15],[8,1,3,16]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox","hideGrid"]},{"n":41,"w":6,"h":8,"time":100,"scale":1.149999976158142,"voids":[41,47,35,12,6,0],"walls":[],"cats":[{"color":5,"cells":[33,34,40],"outer":2},{"color":0,"cells":[23,29,28]},{"color":4,"cells":[17,16,22,21],"outer":2},{"color":5,"cells":[11,5,4,10],"outer":10},{"color":4,"cells":[2,1,7],"outer":2},{"color":0,"cells":[8,9,3],"outer":3},{"color":8,"cells":[14,13,19,18,24],"ice":10},{"color":0,"cells":[26,25,31],"outer":5,"ice":3},{"color":4,"cells":[30,36,42,43,37],"outer":3,"ice":2},{"color":5,"cells":[38,44,45,46],"outer":10,"ice":2}],"gates":[{"cell":23,"out":[1,0],"queue":[0,0,0,0,0,0,0,0,0],"ice":1},{"cell":40,"out":[1,0],"queue":[5,5,5,5,5,5,5,5,5,5,5,5,5,5]},{"cell":5,"out":[1,0],"queue":[10,10,10,10,10,10,10,10],"ice":6},{"cell":11,"out":[1,0],"queue":[4,4,4,4,4,4,4,4,4,4,4,4],"ice":9},{"cell":44,"out":[0,1],"queue":[2,2,2,2,2,2,2,2,2,2],"ice":10},{"cell":18,"out":[-1,0],"queue":[8,8,8,8,8,3,3,3,3,3,3,3,3],"ice":12}],"hide":[{"x":3,"y":2,"w":1,"h":1,"count":12,"grid":true},{"x":2,"y":3,"w":1,"h":1,"count":12,"grid":true},{"x":2,"y":5,"w":1,"h":1,"count":12,"grid":true},{"x":3,"y":4,"w":1,"h":1,"count":3,"grid":true},{"x":3,"y":6,"w":1,"h":1,"count":2,"grid":true},{"x":1,"y":0,"w":5,"h":2,"count":4,"grid":false}],"locks":[],"plan":[[0,0,1,0],[0,0,1,1],[0,0,1,2],[1,0,0,0],[1,0,0,1],[1,0,0,2],[9,0,1,3],[9,0,1,4],[9,0,1,5],[9,0,1,6],[7,0,0,3],[7,0,0,4],[7,0,0,5],[7,1,1,7],[7,1,1,8],[7,1,1,9],[3,0,1,10],[3,0,1,11],[3,0,1,12],[3,0,1,13],[3,1,2,0],[3,1,2,1],[3,1,2,2],[3,1,2,3],[9,1,2,4],[9,1,2,5],[9,1,2,6],[9,1,2,7],[5,0,0,6],[5,0,0,7],[5,0,0,8],[2,0,3,0],[2,0,3,1],[2,0,3,2],[2,0,3,3],[0,1,4,0],[0,1,4,1],[0,1,4,2],[2,1,4,3],[2,1,4,4],[2,1,4,5],[2,1,4,6],[4,0,3,4],[4,0,3,5],[4,0,3,6],[4,1,4,7],[4,1,4,8],[4,1,4,9],[6,0,5,0],[6,0,5,1],[6,0,5,2],[6,0,5,3],[6,0,5,4],[5,1,5,5],[5,1,5,6],[5,1,5,7],[8,0,3,7],[8,0,3,8],[8,0,3,9],[8,0,3,10],[8,0,3,11],[8,1,5,8],[8,1,5,9],[8,1,5,10],[8,1,5,11],[8,1,5,12]],"mech":["voids","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid"]},{"n":42,"w":7,"h":8,"time":120,"scale":1.149999976158142,"voids":[42,49],"walls":[],"cats":[{"color":10,"cells":[43,50,51]},{"color":6,"cells":[45,52,53,46],"outer":4},{"color":7,"cells":[36,35,28]},{"color":2,"cells":[32,31,38,37,30]},{"color":10,"cells":[48,55,54],"outer":0},{"color":7,"cells":[41,40,47],"outer":2},{"color":0,"cells":[27,34,33]},{"color":10,"cells":[20,19,26],"outer":4},{"color":2,"cells":[13,6,5,12]},{"color":0,"cells":[15,14,21,22]},{"color":10,"cells":[23,24,25,18],"outer":6},{"color":4,"cells":[17,10,9,16],"outer":2},{"color":6,"cells":[2,1,8,7,0]},{"color":0,"cells":[3,4,11]}],"gates":[{"cell":28,"out":[-1,0],"queue":[7,7,7,7,7,7]},{"cell":51,"out":[0,1],"queue":[10,10,10,10,10,10,10,10,10,10,10,10,10],"ice":1},{"cell":55,"out":[1,0],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,0],"ice":5},{"cell":6,"out":[1,0],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,6],"ice":9},{"cell":14,"out":[-1,0],"queue":[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],"ice":11},{"cell":2,"out":[0,-1],"queue":[4,4,4,4,4,4,4,4,4,4,4],"ice":14}],"hide":[{"x":2,"y":6,"w":1,"h":1,"count":17,"grid":true},{"x":4,"y":5,"w":1,"h":1,"count":17,"grid":true},{"x":1,"y":4,"w":1,"h":1,"count":2,"grid":true},{"x":0,"y":0,"w":5,"h":4,"count":4,"grid":false},{"x":5,"y":0,"w":2,"h":8,"count":2,"grid":false}],"locks":[],"plan":[[2,0,0,0],[2,0,0,1],[2,0,0,2],[0,0,1,0],[0,0,1,1],[0,0,1,2],[4,0,1,3],[4,0,1,4],[4,0,1,5],[5,0,0,3],[5,0,0,4],[5,0,0,5],[10,0,1,6],[10,0,1,7],[10,0,1,8],[10,0,1,9],[4,1,2,0],[4,1,2,1],[4,1,2,2],[6,0,2,3],[6,0,2,4],[6,0,2,5],[7,0,1,10],[7,0,1,11],[7,0,1,12],[13,0,2,6],[13,0,2,7],[13,0,2,8],[12,0,3,0],[12,0,3,1],[12,0,3,2],[12,0,3,3],[12,0,3,4],[9,0,2,9],[9,0,2,10],[9,0,2,11],[9,0,2,12],[1,0,3,5],[1,0,3,6],[1,0,3,7],[1,0,3,8],[3,0,4,0],[3,0,4,1],[3,0,4,2],[3,0,4,3],[3,0,4,4],[5,1,4,5],[5,1,4,6],[5,1,4,7],[1,1,5,0],[1,1,5,1],[1,1,5,2],[1,1,5,3],[8,0,4,8],[8,0,4,9],[8,0,4,10],[8,0,4,11],[11,0,5,4],[11,0,5,5],[11,0,5,6],[11,0,5,7],[11,1,4,12],[11,1,4,13],[11,1,4,14],[11,1,4,15],[7,1,5,8],[7,1,5,9],[7,1,5,10],[10,1,3,9],[10,1,3,10],[10,1,3,11],[10,1,3,12]],"mech":["voids","gateIce","nested","hideBox","hideGrid"]},{"n":43,"w":6,"h":7,"time":130,"scale":1.149999976158142,"voids":[],"walls":[16,12,41,40,37],"cats":[{"color":3,"cells":[20,19,18]},{"color":0,"cells":[14,15,21]},{"color":6,"cells":[22,23,17]},{"color":4,"cells":[36,30,24],"outer":7},{"color":7,"cells":[31,25,26]},{"color":0,"cells":[34,33,39,38,32],"outer":3},{"color":1,"cells":[27,28,29,35],"outer":3},{"color":1,"cells":[6,0,1,7,8,2,3,9,10,4,5,11]}],"gates":[{"cell":23,"out":[1,0],"queue":[0,0,0,0,0,0,0,0]},{"cell":17,"out":[1,0],"queue":[6,6,6]},{"cell":35,"out":[1,0],"queue":[4,4,4],"ice":3},{"cell":30,"out":[-1,0],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"ice":4},{"cell":1,"out":[0,-1],"queue":[3,3,3,3,3,3,3,3,3,3,3,3,7,7,7,7,7,7],"ice":6}],"hide":[{"x":1,"y":2,"w":1,"h":1,"count":5,"grid":true},{"x":0,"y":4,"w":6,"h":3,"count":2,"grid":false},{"x":0,"y":0,"w":6,"h":2,"count":4,"grid":false}],"locks":[],"plan":[[2,0,1,0],[2,0,1,1],[2,0,1,2],[1,0,0,0],[1,0,0,1],[1,0,0,2],[5,0,0,3],[5,0,0,4],[5,0,0,5],[5,0,0,6],[5,0,0,7],[3,0,2,0],[3,0,2,1],[3,0,2,2],[6,0,3,0],[6,0,3,1],[6,0,3,2],[6,0,3,3],[7,0,3,4],[7,0,3,5],[7,0,3,6],[7,0,3,7],[7,0,3,8],[7,0,3,9],[7,0,3,10],[7,0,3,11],[7,0,3,12],[7,0,3,13],[7,0,3,14],[7,0,3,15],[0,0,4,0],[0,0,4,1],[0,0,4,2],[5,1,4,3],[5,1,4,4],[5,1,4,5],[5,1,4,6],[5,1,4,7],[6,1,4,8],[6,1,4,9],[6,1,4,10],[6,1,4,11],[3,1,4,12],[3,1,4,13],[3,1,4,14],[4,0,4,15],[4,0,4,16],[4,0,4,17]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox","hideGrid"]},{"n":44,"w":7,"h":9,"time":130,"scale":1.149999976158142,"voids":[62,56,0,6],"walls":[],"cats":[{"color":4,"cells":[57,58,51]},{"color":6,"cells":[52,59,60],"outer":1},{"color":6,"cells":[61,54,55,48],"outer":2},{"color":6,"cells":[50,49,42]},{"color":6,"cells":[43,44,45],"outer":8},{"color":4,"cells":[47,46,53]},{"color":3,"cells":[32,39,38]},{"color":1,"cells":[41,40,33]},{"color":6,"cells":[34,27,26]},{"color":8,"cells":[25,24,31],"ice":1},{"color":4,"cells":[14,21,22],"outer":3},{"color":6,"cells":[15,16,23],"outer":2},{"color":8,"cells":[7,8,9]},{"color":4,"cells":[29,28,35]},{"color":1,"cells":[30,37,36]},{"color":6,"cells":[18,17,10]},{"color":2,"cells":[19,20,13,12,11]},{"color":3,"cells":[5,4,3,2,1],"ice":11}],"gates":[{"cell":42,"out":[-1,0],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]},{"cell":34,"out":[1,0],"queue":[4,4,4,4,4,4,4,4,4,4,4,4],"ice":3},{"cell":57,"out":[0,1],"queue":[3,3,3,3,3,3,3,3,3,3,3],"ice":11},{"cell":61,"out":[0,1],"queue":[1,1,1,1,1,1,1,1,1],"ice":14},{"cell":14,"out":[-1,0],"queue":[2,2,2,2,2,2,2,2,2,2,2,2],"ice":17},{"cell":4,"out":[0,-1],"queue":[8,8,8,8,8,8,8,8,8],"ice":17}],"hide":[{"x":0,"y":4,"w":3,"h":2,"count":9,"grid":false},{"x":3,"y":1,"w":4,"h":2,"count":9,"grid":false},{"x":3,"y":3,"w":4,"h":3,"count":3,"grid":false},{"x":0,"y":1,"w":3,"h":3,"count":7,"grid":false}],"locks":[],"plan":[[3,0,0,0],[3,0,0,1],[3,0,0,2],[4,0,0,3],[4,0,0,4],[4,0,0,5],[1,0,0,6],[1,0,0,7],[1,0,0,8],[2,0,0,9],[2,0,0,10],[2,0,0,11],[2,0,0,12],[5,0,1,0],[5,0,1,1],[5,0,1,2],[0,0,1,3],[0,0,1,4],[0,0,1,5],[8,0,0,13],[8,0,0,14],[8,0,0,15],[11,0,0,16],[11,0,0,17],[11,0,0,18],[10,0,1,6],[10,0,1,7],[10,0,1,8],[13,0,1,9],[13,0,1,10],[13,0,1,11],[15,0,0,19],[15,0,0,20],[15,0,0,21],[10,1,2,0],[10,1,2,1],[10,1,2,2],[6,0,2,3],[6,0,2,4],[6,0,2,5],[17,0,2,6],[17,0,2,7],[17,0,2,8],[17,0,2,9],[17,0,2,10],[1,1,3,0],[1,1,3,1],[1,1,3,2],[7,0,3,3],[7,0,3,4],[7,0,3,5],[14,0,3,6],[14,0,3,7],[14,0,3,8],[11,1,4,0],[11,1,4,1],[11,1,4,2],[12,0,5,0],[12,0,5,1],[12,0,5,2],[2,1,4,3],[2,1,4,4],[2,1,4,5],[2,1,4,6],[4,1,5,3],[4,1,5,4],[4,1,5,5],[16,0,4,7],[16,0,4,8],[16,0,4,9],[16,0,4,10],[16,0,4,11],[9,0,5,6],[9,0,5,7],[9,0,5,8]],"mech":["voids","gateIce","catIce","nested","hideBox"]},{"n":45,"w":6,"h":10,"time":130,"scale":1.149999976158142,"voids":[],"walls":[16,17,13,12],"cats":[{"color":4,"cells":[1,0,6]},{"color":1,"cells":[11,5,4]},{"color":0,"cells":[19,18,24]},{"color":3,"cells":[30,31,32]},{"color":3,"cells":[23,29,35,34]},{"color":7,"cells":[21,20,26,25]},{"color":2,"cells":[22,28,27,33],"ice":1},{"color":2,"cells":[50,56,55,54]},{"color":6,"cells":[37,36,42],"outer":4},{"color":6,"cells":[47,46,52]},{"color":3,"cells":[51,57,58,59,53],"outer":0},{"color":7,"cells":[41,40,39,45]},{"color":6,"cells":[2,8,7],"outer":2,"ice":5},{"color":7,"cells":[10,9,3],"ice":9},{"color":0,"cells":[44,43,49,48],"outer":1}],"gates":[{"cell":18,"out":[-1,0],"queue":[3,3,3,3,3,3,3,3,3,3,3,3],"ice":2},{"cell":6,"out":[-1,0],"queue":[4,4,4,4,4,4]},{"cell":11,"out":[1,0],"queue":[1,1,1,1,1,1,1],"ice":1},{"cell":30,"out":[-1,0],"queue":[2,2,2,2,2,2,2,2,2,2,2],"ice":7},{"cell":59,"out":[1,0],"queue":[6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7],"ice":9},{"cell":1,"out":[0,-1],"queue":[0,0,0,0,0,0,0,0,0,0,0,0],"ice":5}],"hide":[{"x":2,"y":2,"w":1,"h":1,"count":2,"grid":true},{"x":3,"y":2,"w":1,"h":1,"count":2,"grid":true},{"x":2,"y":6,"w":1,"h":1,"count":5,"grid":true},{"x":0,"y":3,"w":6,"h":3,"count":2,"grid":false},{"x":0,"y":6,"w":6,"h":4,"count":4,"grid":false}],"locks":[],"plan":[[0,0,1,0],[0,0,1,1],[0,0,1,2],[1,0,2,0],[1,0,2,1],[1,0,2,2],[3,0,0,0],[3,0,0,1],[3,0,0,2],[4,0,0,3],[4,0,0,4],[4,0,0,5],[4,0,0,6],[10,0,0,7],[10,0,0,8],[10,0,0,9],[10,0,0,10],[10,0,0,11],[10,1,5,0],[10,1,5,1],[10,1,5,2],[10,1,5,3],[10,1,5,4],[2,0,5,5],[2,0,5,6],[2,0,5,7],[6,0,3,0],[6,0,3,1],[6,0,3,2],[6,0,3,3],[7,0,3,4],[7,0,3,5],[7,0,3,6],[7,0,3,7],[8,0,4,0],[8,0,4,1],[8,0,4,2],[14,0,5,8],[14,0,5,9],[14,0,5,10],[14,0,5,11],[9,0,4,3],[9,0,4,4],[9,0,4,5],[14,1,2,3],[14,1,2,4],[14,1,2,5],[14,1,2,6],[12,0,4,6],[12,0,4,7],[12,0,4,8],[8,1,1,3],[8,1,1,4],[8,1,1,5],[12,1,3,8],[12,1,3,9],[12,1,3,10],[5,0,4,9],[5,0,4,10],[5,0,4,11],[5,0,4,12],[11,0,4,13],[11,0,4,14],[11,0,4,15],[11,0,4,16],[13,0,4,17],[13,0,4,18],[13,0,4,19]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid"]},{"n":46,"w":6,"h":9,"time":140,"scale":1.149999976158142,"voids":[],"walls":[45,19,13],"cats":[{"color":8,"cells":[10,4,5]},{"color":1,"cells":[28,22,16]},{"color":7,"cells":[11,17,23],"outer":1},{"color":4,"cells":[29,35,34]},{"color":8,"cells":[41,40,46]},{"color":0,"cells":[47,53,52],"outer":2},{"color":7,"cells":[44,50,51]},{"color":2,"cells":[49,48,42],"outer":0},{"color":2,"cells":[21,27,33],"ice":4},{"color":0,"cells":[25,24,30,31]},{"color":7,"cells":[20,26,32],"outer":0},{"color":7,"cells":[7,6,12,18],"outer":4},{"color":2,"cells":[0,1,2,8,14]},{"color":0,"cells":[3,9,15],"ice":9},{"color":4,"cells":[36,37,43],"ice":11}],"gates":[{"cell":5,"out":[0,-1],"queue":[8,8,8,7,7,7,8,8,8,7,7,7,7,7,7,7,7,7,7]},{"cell":42,"out":[-1,0],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"ice":5},{"cell":35,"out":[1,0],"queue":[2,2,2,2,2,2,2,2,2,2,2,2,2,2],"ice":9},{"cell":47,"out":[1,0],"queue":[4,4,4,4,4,4,4,4,4,4],"ice":13},{"cell":51,"out":[0,1],"queue":[1,1,1,1,1,1],"ice":13}],"hide":[{"x":2,"y":6,"w":1,"h":1,"count":1,"grid":true},{"x":3,"y":6,"w":1,"h":1,"count":1,"grid":true},{"x":4,"y":6,"w":2,"h":3,"count":2,"grid":false},{"x":0,"y":6,"w":4,"h":3,"count":3,"grid":false},{"x":0,"y":0,"w":3,"h":6,"count":4,"grid":false}],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[0,0,0,2],[2,0,0,3],[2,0,0,4],[2,0,0,5],[4,0,0,6],[4,0,0,7],[4,0,0,8],[6,0,0,9],[6,0,0,10],[6,0,0,11],[10,0,0,12],[10,0,0,13],[10,0,0,14],[5,0,1,0],[5,0,1,1],[5,0,1,2],[9,0,1,3],[9,0,1,4],[9,0,1,5],[9,0,1,6],[10,1,1,7],[10,1,1,8],[10,1,1,9],[11,0,0,15],[11,0,0,16],[11,0,0,17],[11,0,0,18],[5,1,2,0],[5,1,2,1],[5,1,2,2],[8,0,2,3],[8,0,2,4],[8,0,2,5],[7,0,2,6],[7,0,2,7],[7,0,2,8],[7,1,1,10],[7,1,1,11],[7,1,1,12],[1,0,4,0],[1,0,4,1],[1,0,4,2],[2,1,4,3],[2,1,4,4],[2,1,4,5],[3,0,3,0],[3,0,3,1],[3,0,3,2],[11,1,3,3],[11,1,3,4],[11,1,3,5],[11,1,3,6],[12,0,2,9],[12,0,2,10],[12,0,2,11],[12,0,2,12],[12,0,2,13],[14,0,3,7],[14,0,3,8],[14,0,3,9],[13,0,1,13],[13,0,1,14],[13,0,1,15]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid"]},{"n":47,"w":8,"h":10,"time":135,"scale":1.149999976158142,"voids":[7,15,6,14,8,1,9,0],"walls":[37,36,33,25],"cats":[{"color":0,"cells":[74,73,72],"outer":5},{"color":4,"cells":[66,67,75]},{"color":2,"cells":[68,69,77,76]},{"color":7,"cells":[61,60,59,58]},{"color":4,"cells":[57,56,64,65],"ice":2},{"color":4,"cells":[44,45,53,52]},{"color":2,"cells":[51,50,42,43],"outer":0},{"color":1,"cells":[78,70,62,54],"outer":7},{"color":4,"cells":[79,71,63,55]},{"color":4,"cells":[18,19,27,26,34,35],"outer":1},{"color":1,"cells":[21,20,28,29],"outer":0},{"color":5,"cells":[12,11,3,2,10]},{"color":2,"cells":[4,5,13]},{"color":0,"cells":[17,16,24,32],"outer":5},{"color":7,"cells":[41,40,48,49]},{"color":7,"cells":[38,39,47,46]},{"color":0,"cells":[22,23,31,30]}],"gates":[{"cell":40,"out":[-1,0],"queue":[2,2,2,2,2,2,2,2,2,2,2,5,5,5,5,5],"ice":7},{"cell":72,"out":[-1,0],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"ice":1},{"cell":3,"out":[0,-1],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,5,5,5,5,5,5,5],"ice":11},{"cell":71,"out":[1,0],"queue":[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],"ice":11},{"cell":75,"out":[0,1],"queue":[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]}],"hide":[{"x":0,"y":2,"w":2,"h":5,"count":6,"grid":false},{"x":2,"y":5,"w":4,"h":2,"count":3,"grid":false},{"x":6,"y":6,"w":2,"h":4,"count":4,"grid":false},{"x":6,"y":2,"w":2,"h":4,"count":11,"grid":false},{"x":2,"y":0,"w":4,"h":5,"count":5,"grid":false}],"locks":[],"plan":[[1,0,4,0],[1,0,4,1],[1,0,4,2],[0,0,1,0],[0,0,1,1],[0,0,1,2],[4,0,4,3],[4,0,4,4],[4,0,4,5],[4,0,4,6],[5,0,4,7],[5,0,4,8],[5,0,4,9],[5,0,4,10],[8,0,4,11],[8,0,4,12],[8,0,4,13],[8,0,4,14],[9,0,4,15],[9,0,4,16],[9,0,4,17],[9,0,4,18],[9,0,4,19],[9,0,4,20],[13,0,1,3],[13,0,1,4],[13,0,1,5],[13,0,1,6],[6,0,0,0],[6,0,0,1],[6,0,0,2],[6,0,0,3],[2,0,0,4],[2,0,0,5],[2,0,0,6],[2,0,0,7],[6,1,1,7],[6,1,1,8],[6,1,1,9],[6,1,1,10],[12,0,0,8],[12,0,0,9],[12,0,0,10],[11,0,0,11],[11,0,0,12],[11,0,0,13],[11,0,0,14],[11,0,0,15],[9,1,2,0],[9,1,2,1],[9,1,2,2],[9,1,2,3],[9,1,2,4],[9,1,2,5],[10,0,2,6],[10,0,2,7],[10,0,2,8],[10,0,2,9],[10,1,1,11],[10,1,1,12],[10,1,1,13],[10,1,1,14],[14,0,3,0],[14,0,3,1],[14,0,3,2],[14,0,3,3],[7,0,2,10],[7,0,2,11],[7,0,2,12],[7,0,2,13],[15,0,3,4],[15,0,3,5],[15,0,3,6],[15,0,3,7],[3,0,3,8],[3,0,3,9],[3,0,3,10],[3,0,3,11],[7,1,3,12],[7,1,3,13],[7,1,3,14],[7,1,3,15],[16,0,2,14],[16,0,2,15],[16,0,2,16],[16,0,1,15],[13,1,2,17],[13,1,2,18],[13,1,2,19],[13,1,2,20],[0,1,2,21],[0,1,2,22],[0,1,2,23]],"mech":["voids","walls","multiLayerGate","gateIce","catIce","nested","hideBox"]},{"n":48,"w":7,"h":9,"time":140,"scale":1.149999976158142,"voids":[],"walls":[43,15],"cats":[{"color":3,"cells":[58,57,56,49,50]},{"color":2,"cells":[62,61,60,59]},{"color":4,"cells":[41,48,55,54]},{"color":3,"cells":[28,35,42],"outer":0},{"color":1,"cells":[21,14,7],"outer":4},{"color":1,"cells":[0,1,8]},{"color":2,"cells":[2,3,4],"outer":3},{"color":7,"cells":[5,6,13,12]},{"color":2,"cells":[34,27,20]},{"color":1,"cells":[30,31,24],"outer":4},{"color":1,"cells":[18,25,32],"outer":0},{"color":2,"cells":[40,33,26],"outer":7,"ice":6},{"color":7,"cells":[45,44,37],"outer":3,"ice":7},{"color":7,"cells":[22,29,36],"outer":3,"ice":14},{"color":3,"cells":[38,39,46],"ice":10},{"color":3,"cells":[17,16,23],"ice":12}],"gates":[{"cell":0,"out":[-1,0],"queue":[1,1,1,1,1,1,1,1,1,1,1,1]},{"cell":4,"out":[0,-1],"queue":[2,2,2,2,2,2,2,2,2,2,2,2,2],"ice":2},{"cell":13,"out":[1,0],"queue":[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],"ice":8},{"cell":58,"out":[0,1],"queue":[7,7,7,7,7,7,7,7,7,7,7,7,7,0,0],"ice":11},{"cell":49,"out":[-1,0],"queue":[4,4,4,4,4,4,4,4,4,4,0,0,0,0],"ice":16}],"hide":[{"x":2,"y":7,"w":1,"h":1,"count":13,"grid":true},{"x":3,"y":7,"w":1,"h":1,"count":13,"grid":true},{"x":4,"y":7,"w":1,"h":1,"count":13,"grid":true},{"x":5,"y":6,"w":1,"h":1,"count":6,"grid":true},{"x":5,"y":2,"w":1,"h":1,"count":6,"grid":true},{"x":2,"y":1,"w":1,"h":1,"count":3,"grid":true},{"x":3,"y":1,"w":1,"h":1,"count":3,"grid":true},{"x":4,"y":1,"w":1,"h":1,"count":4,"grid":true},{"x":2,"y":2,"w":3,"h":5,"count":4,"grid":false}],"locks":[],"plan":[[5,0,0,0],[5,0,0,1],[5,0,0,2],[4,0,0,3],[4,0,0,4],[4,0,0,5],[6,0,1,0],[6,0,1,1],[6,0,1,2],[8,0,1,3],[8,0,1,4],[8,0,1,5],[10,0,0,6],[10,0,0,7],[10,0,0,8],[9,0,0,9],[9,0,0,10],[9,0,0,11],[11,0,1,6],[11,0,1,7],[11,0,1,8],[1,0,1,9],[1,0,1,10],[1,0,1,11],[1,0,1,12],[6,1,2,0],[6,1,2,1],[6,1,2,2],[0,0,2,3],[0,0,2,4],[0,0,2,5],[0,0,2,6],[0,0,2,7],[3,0,2,8],[3,0,2,9],[3,0,2,10],[7,0,3,0],[7,0,3,1],[7,0,3,2],[7,0,3,3],[11,1,3,4],[11,1,3,5],[11,1,3,6],[12,0,3,7],[12,0,3,8],[12,0,3,9],[13,0,3,10],[13,0,3,11],[13,0,3,12],[13,1,2,11],[13,1,2,12],[13,1,2,13],[2,0,4,0],[2,0,4,1],[2,0,4,2],[2,0,4,3],[3,1,3,13],[3,1,3,14],[4,1,4,4],[4,1,4,5],[4,1,4,6],[9,1,4,7],[9,1,4,8],[9,1,4,9],[3,1,4,10],[15,0,2,14],[15,0,2,15],[15,0,2,16],[12,1,2,17],[12,1,2,18],[12,1,2,19],[14,0,2,20],[14,0,2,21],[14,0,2,22],[10,1,4,11],[10,1,4,12],[10,1,4,13]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid"]},{"n":49,"w":6,"h":8,"time":120,"scale":1.149999976158142,"voids":[],"walls":[31,19,13,7,1,27,21,3,9],"cats":[{"color":2,"cells":[43,42,36],"outer":4},{"color":0,"cells":[18,24,30],"outer":3},{"color":2,"cells":[0,6,12]},{"color":1,"cells":[40,39,38,44]},{"color":0,"cells":[41,47,46,45],"outer":2},{"color":4,"cells":[32,26,20],"outer":3},{"color":7,"cells":[2,8,14]},{"color":7,"cells":[28,34,33]},{"color":4,"cells":[35,29,23],"outer":6},{"color":0,"cells":[10,16,22]},{"color":1,"cells":[4,5,11,17],"outer":6}],"gates":[{"cell":44,"out":[0,1],"queue":[1,1,1,1,1,1,1,1,7,7,7]},{"cell":41,"out":[1,0],"queue":[0,0,0,0,0,0,0,0,0,0],"ice":1},{"cell":0,"out":[-1,0],"queue":[4,4,4,4,4,4,4,4,4,7,7,7],"ice":4},{"cell":2,"out":[0,-1],"queue":[3,3,3,3,3,3],"ice":6},{"cell":17,"out":[1,0],"queue":[2,2,2,2,2,2,2,2,2,2],"ice":9},{"cell":47,"out":[0,1],"queue":[6,6,6,6,6,6,6],"ice":15}],"hide":[{"x":1,"y":6,"w":1,"h":1,"count":2,"grid":true},{"x":1,"y":4,"w":1,"h":1,"count":5,"grid":true},{"x":3,"y":2,"w":1,"h":1,"count":7,"grid":true},{"x":2,"y":0,"w":4,"h":6,"count":3,"grid":false}],"locks":[],"plan":[[3,0,0,0],[3,0,0,1],[3,0,0,2],[3,0,0,3],[4,0,1,0],[4,0,1,1],[4,0,1,2],[4,0,1,3],[1,0,1,4],[1,0,1,5],[1,0,1,6],[9,0,1,7],[9,0,1,8],[9,0,1,9],[10,0,0,4],[10,0,0,5],[10,0,0,6],[10,0,0,7],[6,0,0,8],[6,0,0,9],[6,0,0,10],[1,1,3,0],[1,1,3,1],[1,1,3,2],[5,0,2,0],[5,0,2,1],[5,0,2,2],[5,1,3,3],[5,1,3,4],[5,1,3,5],[2,0,4,0],[2,0,4,1],[2,0,4,2],[0,0,4,3],[0,0,4,4],[0,0,4,5],[0,1,2,3],[0,1,2,4],[0,1,2,5],[4,1,4,6],[4,1,4,7],[4,1,4,8],[4,1,4,9],[8,0,2,6],[8,0,2,7],[8,0,2,8],[7,0,2,9],[7,0,2,10],[7,0,2,11],[10,1,5,0],[10,1,5,1],[10,1,5,2],[10,1,5,3],[8,1,5,4],[8,1,5,5],[8,1,5,6]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox","hideGrid"]},{"n":50,"w":6,"h":10,"time":130,"scale":1.149999976158142,"voids":[],"walls":[48,50,36,31,21],"cats":[{"color":4,"cells":[54,55,56],"outer":7},{"color":0,"cells":[57,58,59]},{"color":4,"cells":[46,52,51]},{"color":5,"cells":[41,47,53]},{"color":4,"cells":[42,43,49],"ice":3},{"color":0,"cells":[37,38,44],"outer":3,"ice":3},{"color":1,"cells":[27,28,34],"ice":5},{"color":7,"cells":[22,23,29],"outer":0,"ice":5},{"color":1,"cells":[25,19,20],"ice":6},{"color":0,"cells":[14,13,12,18,24,30],"outer":3,"ice":8},{"color":3,"cells":[2,1,0,6],"ice":9},{"color":4,"cells":[5,4,3,9,8,7],"outer":1,"ice":11},{"color":4,"cells":[15,16,17,11,10],"ice":16},{"color":5,"cells":[32,33,39],"ice":16}],"gates":[{"cell":59,"out":[1,0],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"cell":41,"out":[1,0],"queue":[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],"ice":1},{"cell":23,"out":[1,0],"queue":[5,5,5,5,5,5],"ice":5},{"cell":42,"out":[-1,0],"queue":[3,3,3,3,3,3,3,3,3,3,3,3,3],"ice":14},{"cell":30,"out":[-1,0],"queue":[7,7,7,7,7,7],"ice":9},{"cell":56,"out":[0,1],"queue":[1,1,1,1,1,1,1,1,1,1,1,1],"ice":6}],"hide":[{"x":3,"y":7,"w":1,"h":1,"count":3,"grid":true},{"x":4,"y":6,"w":1,"h":1,"count":5,"grid":true},{"x":5,"y":5,"w":1,"h":1,"count":9,"grid":true},{"x":2,"y":4,"w":1,"h":1,"count":6,"grid":true}],"locks":[],"plan":[[1,0,0,0],[1,0,0,1],[1,0,0,2],[2,0,1,0],[2,0,1,1],[2,0,1,2],[0,0,1,3],[0,0,1,4],[0,0,1,5],[5,0,0,3],[5,0,0,4],[5,0,0,5],[4,0,1,6],[4,0,1,7],[4,0,1,8],[3,0,2,0],[3,0,2,1],[3,0,2,2],[6,0,5,0],[6,0,5,1],[6,0,5,2],[8,0,5,3],[8,0,5,4],[8,0,5,5],[9,0,0,6],[9,0,0,7],[9,0,0,8],[9,0,0,9],[9,0,0,10],[9,0,0,11],[7,0,4,0],[7,0,4,1],[7,0,4,2],[7,1,0,12],[7,1,0,13],[7,1,0,14],[0,1,4,3],[0,1,4,4],[0,1,4,5],[11,0,1,9],[11,0,1,10],[11,0,1,11],[11,0,1,12],[11,0,1,13],[11,0,1,14],[11,1,5,6],[11,1,5,7],[11,1,5,8],[11,1,5,9],[11,1,5,10],[11,1,5,11],[5,1,3,0],[5,1,3,1],[5,1,3,2],[9,1,3,3],[9,1,3,4],[9,1,3,5],[9,1,3,6],[9,1,3,7],[9,1,3,8],[13,0,2,3],[13,0,2,4],[13,0,2,5],[12,0,1,15],[12,0,1,16],[12,0,1,17],[12,0,1,18],[12,0,1,19],[10,0,3,9],[10,0,3,10],[10,0,3,11],[10,0,3,12]],"mech":["walls","gateIce","catIce","nested","hideGrid"]},{"n":51,"w":6,"h":9,"time":100,"scale":1.149999976158142,"voids":[],"walls":[],"cats":[{"color":1,"cells":[36,42,48],"bow":10},{"color":1,"cells":[38,44,50],"bow":12},{"color":5,"cells":[37,43,49],"bow":12},{"color":5,"cells":[46,47,53,52,51,45]},{"color":4,"cells":[41,40,39],"bow":7},{"color":0,"cells":[33,34,35],"bow":10},{"color":0,"cells":[30,31,32],"bow":10},{"color":2,"cells":[29,28,27],"bow":10},{"color":2,"cells":[26,25,24],"bow":10},{"color":5,"cells":[19,13,7],"bow":12},{"color":1,"cells":[20,14,8],"bow":12},{"color":1,"cells":[18,12,6],"bow":10},{"color":4,"cells":[23,22,21],"bow":5},{"color":5,"cells":[16,17,11,10,9,15]},{"color":4,"cells":[0,1,2],"bow":2},{"color":4,"cells":[3,4,5],"bow":2}],"gates":[{"cell":30,"out":[-1,0],"queue":[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],"ice":10},{"cell":24,"out":[-1,0],"queue":[1,1,1,1,1,1,1,1,1,1,1,1],"ice":8},{"cell":35,"out":[1,0],"queue":[0,0,0,0,0,0],"ice":5},{"cell":29,"out":[1,0],"queue":[2,2,2,2,2,2],"ice":3},{"cell":5,"out":[1,0],"queue":[4,4,4,4,4,4]},{"cell":18,"out":[-1,0],"queue":[4,4,4,4,4,4],"ice":2}],"hide":[],"locks":[],"plan":null,"mech":["gateIce","bow"]},{"n":52,"w":7,"h":10,"time":175,"scale":1.149999976158142,"voids":[63,56,69,62,35,28,0,7,6,13,34,41,40,33,36,29],"walls":[],"cats":[{"color":4,"cells":[46,45,44,43],"outer":3,"bow":10},{"color":4,"cells":[22,23,24,25],"outer":6,"bow":11},{"color":1,"cells":[30,37]},{"color":6,"cells":[31,38]},{"color":1,"cells":[32,39]},{"color":0,"cells":[21,14,15,8]},{"color":1,"cells":[42,49,50,57]},{"color":5,"cells":[26,27]},{"color":3,"cells":[3,4],"bow":5},{"color":6,"cells":[54,61,68]},{"color":6,"cells":[51,58,65]},{"color":3,"cells":[67,66],"bow":6},{"color":5,"cells":[55,48]},{"color":1,"cells":[52,53,60],"ice":7},{"color":2,"cells":[5,12,19]},{"color":2,"cells":[2,9,16]},{"color":5,"cells":[17,18],"ice":8}],"gates":[{"cell":5,"out":[0,-1],"queue":[5,5,1,1,1,1,2,2,5,5,3,3,3,3,3,3,3,3]},{"cell":1,"out":[0,-1],"queue":[6,6,0,0,0,6,6,6,6,6]},{"cell":66,"out":[0,1],"queue":[2,2,2,2,0,4,4,4,4],"ice":6},{"cell":49,"out":[-1,0],"queue":[4,4,4,4,1,1,1,6,6,6,6,6],"ice":8},{"cell":55,"out":[1,0],"queue":[1,1,1,1,5,5],"ice":7}],"hide":[{"x":2,"y":7,"w":4,"h":3,"count":5,"grid":false}],"locks":[],"plan":[[7,0,0,0],[7,0,0,1],[3,0,1,0],[3,0,1,1],[5,0,1,2],[5,0,1,3],[5,0,1,4],[2,0,0,2],[2,0,0,3],[4,0,0,4],[4,0,0,5],[15,0,0,6],[15,0,0,7],[12,0,0,8],[12,0,0,9],[8,0,0,10],[8,0,0,11],[9,0,1,5],[9,0,1,6],[9,0,1,7],[10,0,1,8],[10,0,1,9],[14,0,2,0],[14,0,2,1],[14,0,2,2],[6,0,4,0],[6,0,4,1],[6,0,4,2],[6,0,4,3],[16,0,4,4],[16,0,4,5],[0,0,3,0],[0,0,3,1],[0,0,3,2],[0,0,3,3],[15,0,2,3],[0,1,0,12],[0,1,0,13],[0,1,0,14],[0,1,0,15],[13,0,3,4],[13,0,3,5],[13,0,3,6],[5,0,2,4],[1,0,2,5],[1,0,2,6],[1,0,2,7],[1,0,2,8],[1,1,3,7],[1,1,3,8],[1,1,3,9],[1,1,3,10],[10,0,3,11],[11,0,0,16],[11,0,0,17]],"mech":["voids","multiLayerGate","gateIce","catIce","nested","hideBox","bow"]},{"n":53,"w":6,"h":9,"time":165,"scale":1.149999976158142,"voids":[],"walls":[7,13,43,42,44,32,31,30,46,47,34,35],"cats":[{"color":2,"cells":[48,49,50]},{"color":3,"cells":[53,52]},{"color":4,"cells":[40,41]},{"color":5,"cells":[38,37,36]},{"color":1,"cells":[51,45,39,33],"bow":10},{"color":2,"cells":[29,28,27],"outer":6},{"color":0,"cells":[14,20,26]},{"color":0,"cells":[21,22,23],"bow":8},{"color":3,"cells":[11,5]},{"color":4,"cells":[12,6]},{"color":3,"cells":[1,0],"bow":5},{"color":4,"cells":[8,2]},{"color":3,"cells":[9,10],"outer":6},{"color":4,"cells":[3,4]},{"color":5,"cells":[15,16,17]},{"color":1,"cells":[25,24,18]}],"gates":[{"cell":5,"out":[0,-1],"queue":[3,3,5,5,4,4,3,3,2,2,2,6,6,6,6,6]},{"cell":0,"out":[0,-1],"queue":[4,4,5,5,5,5,2,2,2,0,0,0],"ice":4},{"cell":48,"out":[0,1],"queue":[0,0,4,4,4,4,1,1,1,1]},{"cell":53,"out":[0,1],"queue":[0,3,3,3,3,1,1,1]}],"hide":[{"x":0,"y":5,"w":6,"h":4,"count":6,"grid":false},{"x":0,"y":0,"w":3,"h":5,"count":3,"grid":false}],"locks":[],"plan":[[8,0,0,0],[8,0,0,1],[14,0,0,2],[14,0,0,3],[13,0,0,4],[13,0,0,5],[12,0,0,6],[12,0,0,7],[5,0,0,8],[5,0,0,9],[5,0,0,10],[5,1,0,11],[5,1,0,12],[5,1,0,13],[12,1,0,14],[12,1,0,15],[9,0,1,0],[9,0,1,1],[14,0,1,2],[6,0,3,0],[3,0,1,3],[3,0,1,4],[3,0,1,5],[6,0,2,0],[6,0,2,1],[2,0,2,2],[2,0,2,3],[1,0,3,1],[1,0,3,2],[0,0,1,6],[0,0,1,7],[0,0,1,8],[7,0,1,9],[7,0,1,10],[7,0,1,11],[10,0,3,3],[10,0,3,4],[15,0,3,5],[15,0,3,6],[15,0,3,7],[11,0,2,4],[11,0,2,5],[4,0,2,6],[4,0,2,7],[4,0,2,8],[4,0,2,9]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox","bow"]},{"n":54,"w":6,"h":8,"time":130,"scale":1.149999976158142,"voids":[],"walls":[10,40,6,24],"cats":[{"color":1,"cells":[8,7,13,12,18],"ice":5},{"color":1,"cells":[2,1,0],"outer":4},{"color":1,"cells":[46,47,41],"outer":6},{"color":3,"cells":[27,21,15]},{"color":4,"cells":[4,3,9]},{"color":6,"cells":[35,34],"outer":3},{"color":0,"cells":[17,11],"outer":6},{"color":2,"cells":[19,20,14]},{"color":3,"cells":[16,22,23]},{"color":0,"cells":[29,28]},{"color":0,"cells":[30,31,25]},{"color":5,"cells":[45,44,43,42]},{"color":2,"cells":[38,37,36]},{"color":5,"cells":[26,32,33]}],"gates":[{"cell":18,"out":[-1,0],"queue":[2,2,2,2,3,3,3,3,2,2,1,1,1,1,1,1]},{"cell":3,"out":[0,-1],"queue":[6,6,6,6,5,5,5,5,5,5,5,1,1,1],"ice":1},{"cell":23,"out":[1,0],"queue":[0,0,3,3,0,0,0,0,0,3,3,1,1]},{"cell":45,"out":[0,1],"queue":[4,4,4,4,4,4,6,6,6]}],"hide":[{"x":0,"y":6,"w":6,"h":2,"count":7,"grid":false}],"locks":[],"plan":[[9,0,2,0],[9,0,2,1],[3,0,2,2],[3,0,2,3],[6,0,2,4],[6,0,2,5],[6,1,1,0],[6,1,1,1],[10,0,2,6],[10,0,2,7],[10,0,2,8],[8,0,2,9],[8,0,2,10],[1,0,2,11],[1,0,2,12],[5,0,1,2],[5,0,1,3],[7,0,0,0],[7,0,0,1],[7,0,0,2],[13,0,1,4],[13,0,1,5],[13,0,1,6],[12,0,0,3],[3,0,0,4],[5,1,0,5],[5,1,0,6],[8,0,0,7],[11,0,1,7],[11,0,1,8],[11,0,1,9],[11,0,1,10],[0,0,1,11],[0,0,1,12],[0,0,1,13],[12,0,0,8],[12,0,0,9],[0,0,0,10],[0,0,0,11],[1,0,0,12],[1,1,3,0],[1,1,3,1],[1,1,3,2],[2,0,0,13],[2,0,0,14],[2,0,0,15],[4,0,3,3],[4,0,3,4],[4,0,3,5],[2,1,3,6],[2,1,3,7],[2,1,3,8]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox"]},{"n":55,"w":7,"h":11,"time":150,"scale":1.149999976158142,"voids":[35,42,43,44,36,37,38,45,46,47,48,39,40,41],"walls":[],"cats":[{"color":5,"cells":[70,71,72,73]},{"color":8,"cells":[74,75]},{"color":3,"cells":[76,69,68]},{"color":1,"cells":[62,55]},{"color":8,"cells":[54,61]},{"color":5,"cells":[3,10,17,24],"bow":7},{"color":4,"cells":[0,7,14]},{"color":8,"cells":[1,8]},{"color":4,"cells":[29,22,15]},{"color":8,"cells":[28,21]},{"color":1,"cells":[30,23]},{"color":3,"cells":[11,12,13]},{"color":6,"cells":[6,5,4]},{"color":6,"cells":[19,26,33]},{"color":3,"cells":[20,27,34]},{"color":5,"cells":[66,59,60,67],"ice":5},{"color":1,"cells":[63,64],"bow":3},{"color":1,"cells":[65,58],"bow":4},{"color":1,"cells":[50,51,52]},{"color":6,"cells":[56,49]},{"color":1,"cells":[31,32,25]},{"color":1,"cells":[9,2]}],"gates":[{"cell":76,"out":[0,1],"queue":[8,8,1,1,6,6,5,5,5,8,8]},{"cell":1,"out":[0,-1],"queue":[8,8,8,8,3,3,3,3,6,6,6,1,1,1,1]},{"cell":70,"out":[0,1],"queue":[1,1,1,5,1,1,1,1,3,3,3,5,5,5,5],"ice":6},{"cell":34,"out":[1,0],"queue":[1,1,1,3,3,4,4,4,4,4,4,5,5,5,5,6,6,6],"ice":8}],"hide":[{"x":0,"y":0,"w":7,"h":5,"count":4,"grid":false}],"locks":[],"plan":[[1,0,0,0],[1,0,0,1],[3,0,0,2],[3,0,0,3],[19,0,0,4],[19,0,0,5],[0,0,0,6],[0,0,0,7],[0,0,0,8],[4,0,0,9],[4,0,0,10],[7,0,1,0],[7,0,1,1],[9,0,1,2],[9,0,1,3],[16,0,2,0],[16,0,2,1],[18,0,2,2],[15,0,2,3],[18,0,2,4],[18,0,2,5],[17,0,2,6],[17,0,2,7],[2,0,2,8],[2,0,2,9],[2,0,2,10],[15,0,2,11],[15,0,2,12],[15,0,2,13],[0,0,2,14],[11,0,1,4],[11,0,1,5],[11,0,1,6],[14,0,1,7],[20,0,3,0],[20,0,3,1],[20,0,3,2],[12,0,1,8],[12,0,1,9],[12,0,1,10],[21,0,1,11],[21,0,1,12],[10,0,1,13],[10,0,1,14],[14,0,3,3],[14,0,3,4],[6,0,3,5],[6,0,3,6],[6,0,3,7],[8,0,3,8],[8,0,3,9],[8,0,3,10],[5,0,3,11],[5,0,3,12],[5,0,3,13],[5,0,3,14],[13,0,3,15],[13,0,3,16],[13,0,3,17]],"mech":["voids","multiLayerGate","gateIce","catIce","hideBox","bow"]},{"n":56,"w":8,"h":10,"time":145,"scale":1.149999976158142,"voids":[75,76,67,68,59,60,2,10,18,26,29,21,13,5,0,1,6,7],"walls":[],"cats":[{"color":5,"cells":[42,43,44,45],"ice":11},{"color":5,"cells":[12,11,3,4]},{"color":6,"cells":[8,9]},{"color":8,"cells":[16,17]},{"color":6,"cells":[24,25]},{"color":8,"cells":[32,33]},{"color":6,"cells":[40,41]},{"color":8,"cells":[47,46]},{"color":6,"cells":[39,38]},{"color":8,"cells":[31,30]},{"color":6,"cells":[23,22]},{"color":8,"cells":[15,14]},{"color":1,"cells":[64,72,73,74]},{"color":3,"cells":[56,57,58,66]},{"color":3,"cells":[77,69,61,62]},{"color":1,"cells":[78,79,71,63]},{"color":4,"cells":[35,27,19]},{"color":1,"cells":[20,28,36]},{"color":5,"cells":[48,49],"bow":12},{"color":2,"cells":[55,54],"bow":11},{"color":4,"cells":[52,51]}],"gates":[{"cell":8,"out":[0,-1],"queue":[8,8,8,8,3,3,3,3,8,8,8,8,8,8,5,5,5,5]},{"cell":15,"out":[0,-1],"queue":[6,6,6,6,1,1,1,1,6,6,6,6,6,6]},{"cell":78,"out":[0,1],"queue":[5,5,4,4,4,4,4,1,1,1,1,1,1,1],"ice":8},{"cell":73,"out":[0,1],"queue":[3,3,3,3,2,2,5,5,5,5],"ice":10}],"hide":[{"x":3,"y":0,"w":2,"h":5,"count":7,"grid":false},{"x":0,"y":7,"w":3,"h":3,"count":4,"grid":false},{"x":5,"y":7,"w":3,"h":3,"count":4,"grid":false}],"locks":[],"plan":[[10,0,1,0],[10,0,1,1],[8,0,1,2],[8,0,1,3],[3,0,0,0],[3,0,0,1],[5,0,0,2],[5,0,0,3],[13,0,0,4],[13,0,0,5],[13,0,0,6],[13,0,0,7],[15,0,1,4],[15,0,1,5],[15,0,1,6],[15,0,1,7],[7,0,0,8],[7,0,0,9],[6,0,1,8],[6,0,1,9],[4,0,1,10],[4,0,1,11],[2,0,1,12],[2,0,1,13],[11,0,0,10],[11,0,0,11],[9,0,0,12],[9,0,0,13],[0,0,0,14],[0,0,0,15],[0,0,0,16],[0,0,0,17],[14,0,3,0],[14,0,3,1],[14,0,3,2],[14,0,3,3],[19,0,3,4],[19,0,3,5],[18,0,3,6],[18,0,3,7],[1,0,3,8],[1,0,3,9],[1,0,2,0],[1,0,2,1],[20,0,2,2],[20,0,2,3],[16,0,2,4],[16,0,2,5],[16,0,2,6],[17,0,2,7],[17,0,2,8],[17,0,2,9],[12,0,2,10],[12,0,2,11],[12,0,2,12],[12,0,2,13]],"mech":["voids","multiLayerGate","gateIce","catIce","hideBox","bow"]},{"n":57,"w":6,"h":10,"time":170,"scale":1.149999976158142,"voids":[36,30,24,41,35,29],"walls":[],"cats":[{"color":5,"cells":[20,14,15,21],"ice":12},{"color":2,"cells":[50,44,45,51],"ice":7},{"color":8,"cells":[25,31,37],"bow":10},{"color":5,"cells":[28,34,40],"bow":9},{"color":2,"cells":[43,42,48,54]},{"color":3,"cells":[49,55,56]},{"color":8,"cells":[52,58,57]},{"color":3,"cells":[46,47,53,59]},{"color":2,"cells":[39,38]},{"color":8,"cells":[32,33]},{"color":2,"cells":[27,26]},{"color":4,"cells":[12,13]},{"color":4,"cells":[23,22]},{"color":1,"cells":[17,16]},{"color":1,"cells":[18,19]},{"color":5,"cells":[7,8,9,10],"bow":12},{"color":6,"cells":[6,0,1]},{"color":6,"cells":[11,5,4]},{"color":1,"cells":[2,3]}],"gates":[{"cell":23,"out":[1,0],"queue":[4,4,1,1,1,1,6,6,3,3,3,2,2,2,2,2]},{"cell":31,"out":[-1,0],"queue":[4,4,1,1],"ice":3},{"cell":2,"out":[0,-1],"queue":[2,2,2,2,8,8,3,3,3,3,5,5,5,2,2,2],"ice":5},{"cell":57,"out":[0,1],"queue":[6,6,6,6,5,5,5,5,5,5,5,5,8,8,8,8,8,8]}],"hide":[{"x":1,"y":4,"w":4,"h":3,"count":3,"grid":false},{"x":0,"y":7,"w":6,"h":3,"count":8,"grid":false}],"locks":[],"plan":[[12,0,0,0],[12,0,0,1],[13,0,0,2],[13,0,0,3],[18,0,0,4],[18,0,0,5],[16,0,0,6],[16,0,0,7],[11,0,1,0],[11,0,1,1],[14,0,1,2],[14,0,1,3],[10,0,2,0],[10,0,2,1],[8,0,2,2],[8,0,2,3],[9,0,2,4],[9,0,2,5],[5,0,2,6],[5,0,2,7],[5,0,2,8],[17,0,3,0],[17,0,3,1],[17,0,3,2],[16,0,3,3],[7,0,0,8],[7,0,0,9],[7,0,0,10],[4,0,0,11],[4,0,0,12],[4,0,0,13],[4,0,0,14],[3,0,3,4],[3,0,3,5],[3,0,3,6],[0,0,3,7],[0,0,3,8],[0,0,3,9],[0,0,3,10],[15,0,3,11],[7,0,2,9],[1,0,0,15],[15,0,2,10],[15,0,2,11],[15,0,2,12],[6,0,3,12],[6,0,3,13],[6,0,3,14],[1,0,2,13],[1,0,2,14],[1,0,2,15],[2,0,3,15],[2,0,3,16],[2,0,3,17]],"mech":["voids","multiLayerGate","gateIce","catIce","hideBox","bow"]},{"n":58,"w":7,"h":11,"time":155,"scale":1.149999976158142,"voids":[49,42,43,55,54,48,21,14,15,27,20,19,56,62,61,69,76],"walls":[],"cats":[{"color":5,"cells":[22,29,36,35,28],"ice":8},{"color":2,"cells":[26,33,40,41,34],"ice":10},{"color":3,"cells":[7,8,1,0]},{"color":5,"cells":[13,12,5,6]},{"color":4,"cells":[2,9]},{"color":5,"cells":[3,10]},{"color":4,"cells":[4,11]},{"color":1,"cells":[45,38,31,24],"bow":5},{"color":3,"cells":[16,17,18],"outer":0},{"color":2,"cells":[23,30,37]},{"color":6,"cells":[25,32,39]},{"color":1,"cells":[57,58,59,60]},{"color":5,"cells":[70,63]},{"color":4,"cells":[64,71]},{"color":5,"cells":[72,65]},{"color":4,"cells":[66,73]},{"color":5,"cells":[74,67]},{"color":4,"cells":[68,75]},{"color":6,"cells":[44,51,52,53,46]}],"gates":[{"cell":47,"out":[1,0],"queue":[4,4,2,2,4,4,4,4,1,1,5,5,5,5,2,2,2,2,2,2]},{"cell":70,"out":[0,1],"queue":[5,5,5,5,5,5,3]},{"cell":75,"out":[0,1],"queue":[3,3,6,6,6,6,6,5,3,3,3,3]},{"cell":3,"out":[0,-1],"queue":[0,0,0,1,1,1,1,1,1,5,5,5,5,5,5,4,4,4,4,6,6,6]}],"hide":[{"x":2,"y":3,"w":3,"h":5,"count":3,"grid":false},{"x":0,"y":0,"w":7,"h":2,"count":9,"grid":false}],"locks":[],"plan":[[12,0,1,0],[12,0,1,1],[14,0,1,2],[14,0,1,3],[16,0,1,4],[16,0,1,5],[15,0,0,0],[15,0,0,1],[9,0,0,2],[9,0,0,3],[17,0,0,4],[17,0,0,5],[13,0,0,6],[13,0,0,7],[11,0,0,8],[11,0,0,9],[8,0,1,6],[8,0,2,0],[8,0,2,1],[18,0,2,2],[18,0,2,3],[18,0,2,4],[18,0,2,5],[18,0,2,6],[0,0,2,7],[0,0,0,10],[0,0,0,11],[0,0,0,12],[0,0,0,13],[9,0,0,14],[1,0,0,15],[1,0,0,16],[1,0,0,17],[1,0,0,18],[1,0,0,19],[2,0,2,8],[2,0,2,9],[2,0,2,10],[2,0,2,11],[8,1,3,0],[8,1,3,1],[8,1,3,2],[7,0,3,3],[7,0,3,4],[7,0,3,5],[7,0,3,6],[11,0,3,7],[11,0,3,8],[5,0,3,9],[5,0,3,10],[3,0,3,11],[3,0,3,12],[3,0,3,13],[3,0,3,14],[6,0,3,15],[6,0,3,16],[4,0,3,17],[4,0,3,18],[10,0,3,19],[10,0,3,20],[10,0,3,21]],"mech":["voids","multiLayerGate","catIce","nested","hideBox","bow"]},{"n":59,"w":7,"h":9,"time":165,"scale":1.149999976158142,"voids":[],"walls":[51,28,29,31,32,10,3,19,47],"cats":[{"color":1,"cells":[6,13,20,27]},{"color":1,"cells":[25,18,11,12]},{"color":0,"cells":[5,4]},{"color":6,"cells":[34,33,40],"outer":5},{"color":3,"cells":[24,23,30],"ice":6},{"color":6,"cells":[22,15,8,1]},{"color":2,"cells":[0,7,14,21],"outer":0},{"color":4,"cells":[41,48]},{"color":2,"cells":[55,62]},{"color":4,"cells":[61,60]},{"color":3,"cells":[53,52]},{"color":2,"cells":[58,59]},{"color":6,"cells":[35,36,43,50]},{"color":0,"cells":[56,49,42]},{"color":2,"cells":[44,37]},{"color":3,"cells":[2,9,16],"ice":7},{"color":5,"cells":[39,38,45,46]}],"gates":[{"cell":58,"out":[0,1],"queue":[2,2,2,2,2,2,6,6,6,2,2,2,2,1,1,1,1]},{"cell":34,"out":[1,0],"queue":[0,0,0,3,3,1,1,1,1],"ice":4},{"cell":2,"out":[0,-1],"queue":[4,4,4,4,3,3,3,3,3,3,5,5,5,6,6,6,6,6]},{"cell":21,"out":[-1,0],"queue":[0,0,0,0,0,0,5,5,5,5,6,6,6],"ice":8}],"hide":[{"x":0,"y":5,"w":2,"h":4,"count":4,"grid":false},{"x":0,"y":0,"w":2,"h":4,"count":6,"grid":false},{"x":4,"y":0,"w":3,"h":4,"count":9,"grid":false},{"x":2,"y":5,"w":3,"h":3,"count":1,"grid":false},{"x":5,"y":4,"w":2,"h":3,"count":3,"grid":false}],"locks":[],"plan":[[11,0,0,0],[11,0,0,1],[8,0,0,2],[8,0,0,3],[14,0,0,4],[14,0,0,5],[3,0,0,6],[3,0,0,7],[3,0,0,8],[13,0,1,0],[13,0,1,1],[13,0,1,2],[10,0,1,3],[10,0,1,4],[6,0,0,9],[6,0,0,10],[6,0,0,11],[6,0,0,12],[9,0,2,0],[9,0,2,1],[6,1,3,0],[6,1,3,1],[6,1,3,2],[6,1,3,3],[0,0,1,5],[0,0,1,6],[0,0,1,7],[0,0,1,8],[1,0,0,13],[1,0,0,14],[1,0,0,15],[1,0,0,16],[2,0,3,4],[2,0,3,5],[3,1,3,6],[3,1,3,7],[3,1,3,8],[16,0,3,9],[5,0,3,10],[5,0,3,11],[5,0,3,12],[7,0,2,2],[7,0,2,3],[4,0,2,4],[4,0,2,5],[4,0,2,6],[15,0,2,7],[15,0,2,8],[15,0,2,9],[16,0,2,10],[16,0,2,11],[16,0,2,12],[5,0,2,13],[12,0,2,14],[12,0,2,15],[12,0,2,16],[12,0,2,17]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox"]},{"n":60,"w":6,"h":11,"time":155,"scale":1.149999976158142,"voids":[],"walls":[58,52,13,16,49,38,27],"cats":[{"color":5,"cells":[30,31,32],"bow":8},{"color":5,"cells":[2,8,14]},{"color":1,"cells":[62,56,50]},{"color":1,"cells":[47,46,45],"bow":10},{"color":4,"cells":[4,10]},{"color":4,"cells":[5,11,17]},{"color":4,"cells":[22,28]},{"color":6,"cells":[23,29]},{"color":6,"cells":[3,9]},{"color":5,"cells":[15,21]},{"color":3,"cells":[55,61]},{"color":2,"cells":[54,60]},{"color":3,"cells":[42,48]},{"color":8,"cells":[44,43]},{"color":3,"cells":[20,26,25]},{"color":2,"cells":[19,18,24]},{"color":2,"cells":[1,7]},{"color":4,"cells":[0,6,12],"outer":0},{"color":6,"cells":[51,57,63],"bow":8},{"color":2,"cells":[64,65]},{"color":2,"cells":[59,53]},{"color":6,"cells":[41,40,39]},{"color":2,"cells":[35,34,33]},{"color":8,"cells":[36,37]}],"gates":[{"cell":60,"out":[0,1],"queue":[2,2,8,8,8,8,2,2,2,2,1,1,4,4,4,4,4,4,4]},{"cell":35,"out":[1,0],"queue":[3,3,3,3,0,0,0,5,5,5,5,6,2,2,2,2],"ice":5},{"cell":0,"out":[0,-1],"queue":[6,6,6,6,6,1,1,1,1,5,5,5,5]},{"cell":5,"out":[0,-1],"queue":[4,4,4,6,6,6,6,3,3,3,2,2,2,2]}],"hide":[{"x":3,"y":5,"w":3,"h":6,"count":3,"grid":false},{"x":0,"y":0,"w":3,"h":6,"count":7,"grid":false},{"x":3,"y":0,"w":3,"h":5,"count":8,"grid":false}],"locks":[],"plan":[[11,0,0,0],[11,0,0,1],[13,0,0,2],[13,0,0,3],[23,0,0,4],[23,0,0,5],[19,0,0,6],[19,0,0,7],[20,0,0,8],[20,0,0,9],[2,0,0,10],[2,0,0,11],[12,0,1,0],[12,0,1,1],[10,0,1,2],[10,0,1,3],[17,0,0,12],[17,0,0,13],[17,0,0,14],[5,0,3,0],[5,0,3,1],[5,0,3,2],[7,0,3,3],[7,0,3,4],[8,0,3,5],[8,0,3,6],[14,0,3,7],[14,0,3,8],[14,0,3,9],[15,0,3,10],[15,0,3,11],[15,0,3,12],[16,0,3,13],[4,0,0,15],[4,0,0,16],[6,0,0,17],[6,0,0,18],[17,1,1,4],[17,1,1,5],[17,1,1,6],[0,0,1,7],[0,0,1,8],[0,0,1,9],[9,0,1,10],[18,0,1,11],[22,0,1,12],[22,0,1,13],[22,0,1,14],[16,0,1,15],[21,0,2,0],[21,0,2,1],[21,0,2,2],[18,0,2,3],[18,0,2,4],[2,0,2,5],[3,0,2,6],[3,0,2,7],[3,0,2,8],[1,0,2,9],[1,0,2,10],[1,0,2,11],[9,0,2,12]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox","bow"]},{"n":61,"w":8,"h":10,"time":115,"scale":1.149999976158142,"voids":[],"walls":[49,25,17,62,54,30],"cats":[{"color":5,"cells":[43,35,36,44],"ice":5},{"color":0,"cells":[64,72]},{"color":1,"cells":[48,56]},{"color":3,"cells":[16,24,32,40]},{"color":6,"cells":[0,8]},{"color":0,"cells":[33,41]},{"color":5,"cells":[45,53,52]},{"color":4,"cells":[59,60]},{"color":5,"cells":[68,67,75,76]},{"color":6,"cells":[34,26,27]},{"color":3,"cells":[18,19,20,21],"ice":7},{"color":4,"cells":[63,71,79]},{"color":2,"cells":[39,47,55]},{"color":4,"cells":[23,31]},{"color":6,"cells":[6,14,22]},{"color":2,"cells":[57,65]},{"color":2,"cells":[12,11,3,4]},{"color":1,"cells":[7,15]},{"color":1,"cells":[70,78]},{"color":1,"cells":[38,46]}],"gates":[{"cell":78,"out":[0,1],"queue":[1,1,4,4,4,4,4]},{"cell":6,"out":[0,-1],"queue":[1,1,0,0,0,0,6,5,5,5,5,5,5,5],"ice":2},{"cell":73,"out":[0,1],"queue":[2,2,1,1,3,3,3,6,6,2,2,2,2,2,2,2,3,3,3,3,3]},{"cell":0,"out":[0,-1],"queue":[1,1,4,4,6,6,6,6,6,5,5,5,5],"ice":7}],"hide":[{"x":0,"y":0,"w":2,"h":10,"count":4,"grid":false},{"x":2,"y":3,"w":4,"h":4,"count":7,"grid":false},{"x":2,"y":7,"w":4,"h":3,"count":10,"grid":false},{"x":2,"y":0,"w":4,"h":3,"count":11,"grid":false}],"locks":[],"plan":[[18,0,0,0],[18,0,0,1],[11,0,0,2],[11,0,0,3],[11,0,0,4],[17,0,1,0],[17,0,1,1],[13,0,0,5],[13,0,0,6],[15,0,2,0],[15,0,2,1],[2,0,2,2],[2,0,2,3],[3,0,2,4],[3,0,2,5],[3,0,2,6],[4,0,2,7],[4,0,2,8],[12,0,2,9],[12,0,2,10],[12,0,2,11],[1,0,1,2],[1,0,1,3],[19,0,3,0],[19,0,3,1],[7,0,3,2],[7,0,3,3],[9,0,3,4],[9,0,3,5],[9,0,3,6],[14,0,3,7],[14,0,3,8],[16,0,2,12],[16,0,2,13],[16,0,2,14],[16,0,2,15],[3,0,2,16],[5,0,1,4],[5,0,1,5],[14,0,1,6],[0,0,3,9],[0,0,3,10],[0,0,3,11],[0,0,3,12],[6,0,1,7],[6,0,1,8],[6,0,1,9],[10,0,2,17],[10,0,2,18],[10,0,2,19],[10,0,2,20],[8,0,1,10],[8,0,1,11],[8,0,1,12],[8,0,1,13]],"mech":["walls","multiLayerGate","gateIce","catIce","hideBox"]},{"n":62,"w":7,"h":9,"time":140,"scale":1.149999976158142,"voids":[7,8,9,13,12,11,21,22,23,27,25,26,35,37,36,41,39,40,49,51,50,53,55,54],"walls":[],"cats":[{"color":4,"cells":[56,57,58],"outer":5},{"color":8,"cells":[62,61,60],"outer":3},{"color":1,"cells":[42,43,44]},{"color":3,"cells":[48,47,46]},{"color":8,"cells":[28,29,30]},{"color":5,"cells":[34,33,32]},{"color":4,"cells":[14,15,16]},{"color":1,"cells":[20,19,18]},{"color":3,"cells":[0,1,2]},{"color":4,"cells":[6,5,4]},{"color":8,"cells":[3,10]},{"color":5,"cells":[17,24]},{"color":4,"cells":[31,38]},{"color":5,"cells":[45,52]}],"gates":[{"cell":59,"out":[0,1],"queue":[5,5,3,3,3,3,5,5,1,1,1]},{"cell":3,"out":[0,-1],"queue":[1,1,1,5,5,5,5,5,5,8,8,8,8,8],"ice":3},{"cell":28,"out":[-1,0],"queue":[4,4,4,3,3,3,3,3],"ice":5},{"cell":34,"out":[1,0],"queue":[8,8,8,4,4,4,4,4,4,4,4],"ice":7}],"hide":[],"locks":[],"plan":[[13,0,0,0],[13,0,0,1],[3,0,0,2],[3,0,0,3],[3,0,0,4],[8,0,0,5],[5,0,0,6],[5,0,0,7],[2,0,0,8],[2,0,0,9],[2,0,0,10],[7,0,1,0],[7,0,1,1],[7,0,1,2],[5,0,1,3],[11,0,1,4],[11,0,1,5],[12,0,2,0],[12,0,2,1],[0,0,2,2],[8,0,2,3],[8,0,2,4],[4,0,3,0],[4,0,3,1],[4,0,3,2],[0,0,3,3],[0,0,3,4],[0,1,1,6],[0,1,1,7],[0,1,1,8],[10,0,1,9],[10,0,1,10],[6,0,3,5],[6,0,3,6],[6,0,3,7],[9,0,3,8],[9,0,3,9],[9,0,3,10],[1,0,1,11],[1,0,1,12],[1,0,1,13],[1,1,2,5],[1,1,2,6],[1,1,2,7]],"mech":["voids","multiLayerGate","gateIce","nested"]},{"n":63,"w":8,"h":10,"time":135,"scale":1.149999976158142,"voids":[39,38,37,36,44,45,46,47,74,66,65,57,56,64,73,72,58,16,17,18,10,2,1,9,8,0],"walls":[69,20,12,22,14,4,6],"cats":[{"color":5,"cells":[3,11,19]},{"color":3,"cells":[5,13,21]},{"color":5,"cells":[7,15,23]},{"color":6,"cells":[59,60],"outer":1},{"color":1,"cells":[24,32,40]},{"color":3,"cells":[25,26,27]},{"color":2,"cells":[31,30]},{"color":2,"cells":[29,28]},{"color":1,"cells":[33,41,49,48],"ice":9},{"color":6,"cells":[50,51]},{"color":1,"cells":[42,43]},{"color":6,"cells":[34,35]},{"color":1,"cells":[67,75,76]},{"color":0,"cells":[52,53,61]},{"color":0,"cells":[79,78,77]},{"color":4,"cells":[71,70]},{"color":1,"cells":[63,62]},{"color":4,"cells":[55,54]}],"gates":[{"cell":79,"out":[0,1],"queue":[4,4,4,4,6,6,6,6,6,6,5,5,5,5,5,3,3,3,3]},{"cell":24,"out":[-1,0],"queue":[2,2,2,2,0,0,0,5,0,0,0],"ice":5},{"cell":7,"out":[0,-1],"queue":[1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1]}],"hide":[{"x":3,"y":0,"w":5,"h":3,"count":7,"grid":false},{"x":0,"y":3,"w":4,"h":4,"count":3,"grid":false}],"locks":[],"plan":[[15,0,0,0],[15,0,0,1],[17,0,0,2],[17,0,0,3],[3,0,0,4],[3,0,0,5],[9,0,0,6],[9,0,0,7],[11,0,0,8],[11,0,0,9],[6,0,1,0],[6,0,1,1],[7,0,1,2],[7,0,1,3],[13,0,1,4],[13,0,1,5],[13,0,1,6],[0,0,1,7],[0,0,0,10],[0,0,0,11],[14,0,1,8],[14,0,1,9],[14,0,1,10],[2,0,0,12],[2,0,0,13],[2,0,0,14],[3,1,2,0],[3,1,2,1],[4,0,2,2],[4,0,2,3],[4,0,2,4],[8,0,2,5],[8,0,2,6],[8,0,2,7],[5,0,0,15],[5,0,0,16],[5,0,0,17],[1,0,0,18],[1,0,2,8],[1,0,2,9],[8,0,2,10],[10,0,2,11],[10,0,2,12],[12,0,2,13],[12,0,2,14],[12,0,2,15],[16,0,2,16],[16,0,2,17]],"mech":["voids","walls","multiLayerGate","gateIce","catIce","nested","hideBox"]},{"n":64,"w":7,"h":10,"time":165,"scale":1.149999976158142,"voids":[56,69,62,63,0,7,6],"walls":[44,51,18,25],"cats":[{"color":5,"cells":[52,53,46],"ice":3},{"color":5,"cells":[17,16,23],"ice":3},{"color":3,"cells":[24,31,38,45]},{"color":5,"cells":[32,39]},{"color":5,"cells":[30,37]},{"color":6,"cells":[61,60,59,58,57]},{"color":8,"cells":[68,67,66]},{"color":2,"cells":[65,64]},{"color":8,"cells":[22,21,14,15]},{"color":2,"cells":[29,28]},{"color":4,"cells":[36,35]},{"color":2,"cells":[43,42]},{"color":4,"cells":[50,49]},{"color":3,"cells":[8,9,10,11,12,13],"ice":9},{"color":2,"cells":[1,2]},{"color":8,"cells":[3,4,5]},{"color":6,"cells":[54,55,48,47]},{"color":4,"cells":[40,41]},{"color":2,"cells":[33,34]},{"color":4,"cells":[26,27]},{"color":2,"cells":[19,20]}],"gates":[{"cell":28,"out":[-1,0],"queue":[2,2,2,2,8,8,8,4,4,2,2,2,2,2,2,3,3,3,3,3,2,2]},{"cell":27,"out":[1,0],"queue":[4,4,8,8,4,4,4,4,5,5,5,5,5,5]},{"cell":3,"out":[0,-1],"queue":[6,6,6,6,6,6,8,8,8,8,8]},{"cell":66,"out":[0,1],"queue":[5,5,5,5,3,3,3,3,3,6,6,6]}],"hide":[{"x":2,"y":2,"w":3,"h":6,"count":11,"grid":false},{"x":5,"y":2,"w":2,"h":6,"count":3,"grid":false}],"locks":[],"plan":[[9,0,0,0],[9,0,0,1],[11,0,0,2],[11,0,0,3],[8,0,0,4],[8,0,0,5],[8,0,0,6],[10,0,0,7],[10,0,0,8],[19,0,1,0],[19,0,1,1],[7,0,0,9],[7,0,0,10],[6,0,1,2],[6,0,1,3],[17,0,1,4],[17,0,1,5],[12,0,1,6],[12,0,1,7],[18,0,0,11],[18,0,0,12],[20,0,0,13],[20,0,0,14],[13,0,0,15],[13,0,0,16],[13,0,0,17],[13,0,0,18],[13,0,0,19],[14,0,0,20],[14,0,0,21],[5,0,2,0],[5,0,2,1],[5,0,2,2],[5,0,2,3],[5,0,2,4],[16,0,2,5],[15,0,2,6],[15,0,2,7],[15,0,2,8],[3,0,1,8],[3,0,1,9],[4,0,3,0],[4,0,3,1],[0,0,3,2],[0,0,3,3],[0,0,1,10],[1,0,1,11],[1,0,1,12],[1,0,1,13],[2,0,3,4],[2,0,3,5],[2,0,3,6],[2,0,3,7],[6,0,2,9],[13,0,3,8],[8,0,2,10],[16,0,3,9],[16,0,3,10],[16,0,3,11]],"mech":["voids","walls","multiLayerGate","catIce","hideBox"]},{"n":65,"w":7,"h":10,"time":140,"scale":1.149999976158142,"voids":[66,65,67,58,59,60,51,52,53],"walls":[15,16,9,19,18],"cats":[{"color":3,"cells":[38,31,24,17,10],"ice":10},{"color":2,"cells":[6,13,12]},{"color":2,"cells":[14,21,22]},{"color":5,"cells":[20,27,26]},{"color":8,"cells":[23,30,29]},{"color":4,"cells":[25,32,33]},{"color":2,"cells":[28,35,36],"ice":5},{"color":5,"cells":[34,41,40],"ice":8},{"color":6,"cells":[37,44]},{"color":4,"cells":[39,46]},{"color":6,"cells":[43,42],"bow":10},{"color":1,"cells":[49,50]},{"color":6,"cells":[57,56]},{"color":1,"cells":[63,64]},{"color":4,"cells":[48,47]},{"color":2,"cells":[54,55]},{"color":4,"cells":[62,61]},{"color":2,"cells":[68,69]},{"color":3,"cells":[2,3],"bow":10},{"color":0,"cells":[0,7,8],"outer":5}],"gates":[{"cell":45,"out":[0,1],"queue":[4,4,6,6,2,2,1,1,1,1,5,5,5]},{"cell":3,"out":[0,-1],"queue":[6,6,4,4,4,4,4,6,6],"ice":6},{"cell":27,"out":[1,0],"queue":[0,0,0,2,2,2,2,2,2,2,2,8,8,8,5,5,5,5,5,5,3,3],"ice":7},{"cell":35,"out":[-1,0],"queue":[3,3,3,3,3,4,4,2,2,2],"ice":8}],"hide":[{"x":0,"y":6,"w":2,"h":4,"count":3,"grid":false},{"x":5,"y":6,"w":2,"h":4,"count":2,"grid":false},{"x":1,"y":0,"w":5,"h":1,"count":5,"grid":false}],"locks":[],"plan":[[9,0,0,0],[9,0,0,1],[8,0,0,2],[8,0,0,3],[15,0,0,4],[15,0,0,5],[11,0,0,6],[11,0,0,7],[13,0,0,8],[13,0,0,9],[3,0,0,10],[3,0,0,11],[3,0,0,12],[12,0,1,0],[12,0,1,1],[19,0,2,0],[19,0,2,1],[19,0,2,2],[1,0,2,3],[1,0,2,4],[1,0,2,5],[6,0,2,6],[6,0,2,7],[6,0,2,8],[0,0,3,0],[0,0,3,1],[0,0,3,2],[0,0,3,3],[0,0,3,4],[5,0,3,5],[5,0,3,6],[2,0,2,9],[2,0,2,10],[5,0,1,2],[2,0,3,7],[4,0,2,11],[4,0,2,12],[4,0,2,13],[7,0,2,14],[7,0,2,15],[7,0,2,16],[19,1,2,17],[19,1,2,18],[19,1,2,19],[18,0,2,20],[18,0,2,21],[14,0,1,3],[14,0,1,4],[16,0,1,5],[16,0,1,6],[10,0,1,7],[10,0,1,8],[17,0,3,8],[17,0,3,9]],"mech":["voids","walls","multiLayerGate","gateIce","catIce","nested","hideBox","bow"]},{"n":66,"w":8,"h":12,"time":155,"scale":1.149999976158142,"voids":[0,2,4,5,6,7,3,1,40,48,55,47,54,46,49,41,51,43,52,44],"walls":[81,83,67,65,78,25,26,29,30],"cats":[{"color":8,"cells":[22,21,20,28,36,37,38,39,31,23,15,14,13,12]},{"color":5,"cells":[11,10,9,8]},{"color":1,"cells":[34,33,32,24,16,17,18,19,27,35]},{"color":4,"cells":[88,89]},{"color":3,"cells":[90,91]},{"color":3,"cells":[72,73]},{"color":4,"cells":[74,75]},{"color":4,"cells":[56,57]},{"color":3,"cells":[58,59],"bow":10},{"color":1,"cells":[93,94,95],"outer":0},{"color":2,"cells":[87,86,85]},{"color":2,"cells":[79,71]},{"color":4,"cells":[77,69]},{"color":6,"cells":[63,62,61]},{"color":5,"cells":[92,84,76],"bow":6},{"color":5,"cells":[60,68]},{"color":5,"cells":[42,50]},{"color":5,"cells":[45,53],"outer":6}],"gates":[{"cell":88,"out":[0,1],"queue":[4,4,4,4,5,5,5,5,1,1,1,8,8,8,1,1,1,1,1]},{"cell":95,"out":[0,1],"queue":[5,5,4,4,2,2,2,8,8,8,8,8,8,8,8,8,8,8,1,1,1,1,1],"ice":5},{"cell":9,"out":[0,-1],"queue":[3,3,3,3,6,6,6,6,6,2,2,0,0,0]},{"cell":14,"out":[0,-1],"queue":[3,3,4,4,5,5,5,5,5,5,5]}],"hide":[{"x":0,"y":1,"w":8,"h":4,"count":8,"grid":false},{"x":4,"y":7,"w":4,"h":5,"count":3,"grid":false}],"locks":[],"plan":[[3,0,0,0],[3,0,0,1],[6,0,0,2],[6,0,0,3],[16,0,0,4],[16,0,0,5],[15,0,0,6],[15,0,0,7],[9,0,0,8],[9,0,0,9],[9,0,0,10],[17,0,1,0],[17,0,1,1],[12,0,1,2],[12,0,1,3],[10,0,1,4],[10,0,1,5],[10,0,1,6],[5,0,2,0],[5,0,2,1],[0,0,1,7],[0,0,1,8],[0,0,1,9],[0,0,1,10],[0,0,1,11],[0,0,1,12],[0,0,1,13],[0,0,1,14],[0,0,1,15],[0,0,1,16],[0,0,1,17],[2,0,1,18],[2,0,1,19],[2,0,1,20],[2,0,1,21],[2,0,1,22],[4,0,3,0],[4,0,3,1],[0,0,0,11],[0,0,0,12],[0,0,0,13],[2,0,0,14],[2,0,0,15],[2,0,0,16],[2,0,0,17],[2,0,0,18],[7,0,3,2],[7,0,3,3],[1,0,3,4],[1,0,3,5],[1,0,3,6],[1,0,3,7],[8,0,2,2],[8,0,2,3],[13,0,2,4],[13,0,2,5],[13,0,2,6],[14,0,3,8],[14,0,3,9],[14,0,3,10],[17,1,2,7],[17,1,2,8],[11,0,2,9],[11,0,2,10],[9,1,2,11],[9,1,2,12],[9,1,2,13]],"mech":["voids","walls","multiLayerGate","gateIce","nested","hideBox","bow"]},{"n":67,"w":6,"h":8,"time":160,"scale":1.149999976158142,"voids":[],"walls":[],"cats":[{"color":1,"cells":[38,32,26,20,14,8,2],"ice":10},{"color":5,"cells":[27,28,29]},{"color":5,"cells":[23,22,21]},{"color":4,"cells":[11,10,9]},{"color":0,"cells":[3,4,5]},{"color":4,"cells":[0,1]},{"color":2,"cells":[7,6]},{"color":5,"cells":[12,13]},{"color":4,"cells":[19,18]},{"color":2,"cells":[24,25]},{"color":4,"cells":[36,37]},{"color":4,"cells":[43,42]},{"color":3,"cells":[45,46,47]},{"color":3,"cells":[41,40,39]},{"color":6,"cells":[34,35],"ice":8},{"color":6,"cells":[16,17],"ice":11}],"gates":[{"cell":42,"out":[0,1],"queue":[4,4,2,2,2,2,3,3,5,5,5,5,5,5,5,5,1,1,1,1]},{"cell":47,"out":[0,1],"queue":[4,4,4,4,4,4,6,6,6,6]},{"cell":1,"out":[0,-1],"queue":[4,4,4,3,3,3,3,1,1,1,0,0,0],"ice":8}],"hide":[{"x":0,"y":5,"w":1,"h":1,"count":1,"grid":true},{"x":1,"y":5,"w":1,"h":1,"count":2,"grid":true},{"x":3,"y":5,"w":1,"h":1,"count":7,"grid":true},{"x":3,"y":2,"w":1,"h":1,"count":10,"grid":true},{"x":2,"y":7,"w":1,"h":1,"count":3,"grid":true}],"locks":[],"plan":[[11,0,0,0],[11,0,0,1],[9,0,0,2],[9,0,0,3],[6,0,0,4],[6,0,0,5],[12,0,0,6],[12,0,0,7],[7,0,0,8],[7,0,0,9],[8,0,1,0],[8,0,1,1],[5,0,1,2],[5,0,1,3],[10,0,1,4],[10,0,1,5],[1,0,0,10],[1,0,0,11],[1,0,0,12],[2,0,0,13],[2,0,0,14],[2,0,0,15],[14,0,1,6],[14,0,1,7],[0,0,0,16],[0,0,0,17],[0,0,0,18],[0,0,0,19],[3,0,2,0],[3,0,2,1],[3,0,2,2],[12,0,2,3],[13,0,2,4],[13,0,2,5],[13,0,2,6],[0,0,2,7],[0,0,2,8],[0,0,2,9],[4,0,2,10],[4,0,2,11],[4,0,2,12],[15,0,1,8],[15,0,1,9]],"mech":["multiLayerGate","gateIce","catIce","hideGrid"]},{"n":68,"w":8,"h":9,"time":155,"scale":1.149999976158142,"voids":[],"walls":[56,57,8,9,32,33,35,36,69,61,53,4,12,38,39],"cats":[{"color":2,"cells":[5,6,7],"ice":5},{"color":5,"cells":[15,14,13],"outer":6},{"color":4,"cells":[29,21]},{"color":4,"cells":[22,30]},{"color":1,"cells":[31,23]},{"color":8,"cells":[66,67,59,51],"outer":0},{"color":4,"cells":[68,60],"outer":6},{"color":1,"cells":[43,42,50,49,48]},{"color":3,"cells":[64,65]},{"color":6,"cells":[28,27,19,11]},{"color":4,"cells":[2,3]},{"color":2,"cells":[0,1]},{"color":1,"cells":[26,25,24,16]},{"color":3,"cells":[44,45]},{"color":4,"cells":[46,47]},{"color":0,"cells":[63,55]},{"color":0,"cells":[62,54]},{"color":4,"cells":[70,71]}],"gates":[{"cell":47,"out":[1,0],"queue":[4,4,4,4,4,4,5,5,5]},{"cell":68,"out":[0,1],"queue":[1,1,2,2,2,2,2,6,6,6,6,6,6,6]},{"cell":65,"out":[0,1],"queue":[8,8,8,8,6,6,3,3,3,3,1,1,1,0,0,0,0]},{"cell":1,"out":[0,-1],"queue":[4,4,4,4,4,4,0,0,0,0,1,1,1,1,1,1]}],"hide":[{"x":4,"y":6,"w":1,"h":1,"count":2,"grid":true},{"x":2,"y":7,"w":1,"h":1,"count":5,"grid":true},{"x":2,"y":1,"w":1,"h":1,"count":5,"grid":true},{"x":4,"y":2,"w":1,"h":1,"count":5,"grid":true},{"x":2,"y":4,"w":1,"h":1,"count":5,"grid":true},{"x":5,"y":4,"w":1,"h":1,"count":3,"grid":true},{"x":0,"y":5,"w":4,"h":4,"count":5,"grid":false},{"x":0,"y":0,"w":5,"h":4,"count":8,"grid":false},{"x":5,"y":0,"w":3,"h":4,"count":3,"grid":false},{"x":0,"y":5,"w":1,"h":1,"count":5,"grid":true},{"x":1,"y":5,"w":1,"h":1,"count":5,"grid":true}],"locks":[],"plan":[[14,0,0,0],[14,0,0,1],[17,0,0,2],[17,0,0,3],[6,0,0,4],[6,0,0,5],[1,0,0,6],[1,0,0,7],[1,0,0,8],[4,0,1,0],[4,0,1,1],[5,0,2,0],[5,0,2,1],[5,0,2,2],[5,0,2,3],[6,1,2,4],[6,1,2,5],[8,0,2,6],[8,0,2,7],[13,0,2,8],[13,0,2,9],[7,0,2,10],[7,0,2,11],[7,0,2,12],[5,1,2,13],[5,1,2,14],[5,1,2,15],[5,1,2,16],[10,0,3,0],[10,0,3,1],[2,0,3,2],[2,0,3,3],[11,0,1,2],[11,0,1,3],[0,0,1,4],[0,0,1,5],[0,0,1,6],[1,1,1,7],[1,1,1,8],[1,1,1,9],[3,0,3,4],[3,0,3,5],[9,0,1,10],[9,0,1,11],[9,0,1,12],[9,0,1,13],[15,0,3,6],[15,0,3,7],[16,0,3,8],[16,0,3,9],[12,0,3,10],[12,0,3,11],[12,0,3,12],[12,0,3,13],[7,0,3,14],[7,0,3,15]],"mech":["walls","multiLayerGate","catIce","nested","hideBox","hideGrid"]},{"n":69,"w":8,"h":10,"time":155,"scale":1.149999976158142,"voids":[75,59,51,43,35,36,28,20,3,38,39,32,24,31,33],"walls":[18,60,63],"cats":[{"color":6,"cells":[48,40,41,49,50,42]},{"color":6,"cells":[26,27,19,11,10,2],"ice":3},{"color":4,"cells":[17,16]},{"color":6,"cells":[9,8]},{"color":1,"cells":[1,0]},{"color":11,"cells":[56,57,58]},{"color":4,"cells":[72,64]},{"color":5,"cells":[73,65]},{"color":5,"cells":[74,66]},{"color":3,"cells":[68,76,77,69]},{"color":4,"cells":[78,70]},{"color":5,"cells":[79,71]},{"color":4,"cells":[4,5]},{"color":5,"cells":[6,7]},{"color":5,"cells":[30,29],"outer":0},{"color":1,"cells":[13,14,15],"outer":0},{"color":1,"cells":[23,22,21]},{"color":3,"cells":[62,54,46]},{"color":11,"cells":[61,53,45]},{"color":5,"cells":[44,52]},{"color":4,"cells":[47,55]}],"gates":[{"cell":0,"out":[0,-1],"queue":[1,1,4,4,4,4,5,5,5,5,11,11,1,1,1,4,4,4,4]},{"cell":7,"out":[0,-1],"queue":[5,5,5,5,11,6,6,6,6,6,0,0,0,0,0],"ice":2},{"cell":74,"out":[0,1],"queue":[4,4,3,3,6,6,6,6,6,5,5,5,5],"ice":5},{"cell":79,"out":[0,1],"queue":[1,1,1,6,6,6,6,3,3,3,3,3,11,11,11],"ice":10}],"hide":[{"x":5,"y":4,"w":1,"h":1,"count":13,"grid":true},{"x":4,"y":1,"w":1,"h":1,"count":4,"grid":true},{"x":3,"y":8,"w":1,"h":1,"count":9,"grid":true},{"x":2,"y":4,"w":1,"h":1,"count":5,"grid":true},{"x":0,"y":5,"w":3,"h":5,"count":5,"grid":false},{"x":4,"y":5,"w":4,"h":5,"count":9,"grid":false}],"locks":[],"plan":[[4,0,0,0],[4,0,0,1],[2,0,0,2],[2,0,0,3],[13,0,1,0],[13,0,1,1],[14,0,1,2],[14,0,1,3],[12,0,0,4],[12,0,0,5],[6,0,2,0],[6,0,2,1],[7,0,0,6],[7,0,0,7],[8,0,0,8],[8,0,0,9],[5,0,0,10],[5,0,0,11],[15,0,0,12],[15,0,0,13],[15,0,0,14],[9,0,2,2],[9,0,2,3],[0,0,2,4],[0,0,2,5],[0,0,2,6],[0,0,2,7],[0,0,2,8],[5,0,1,4],[1,0,1,5],[1,0,1,6],[1,0,1,7],[1,0,1,8],[1,0,1,9],[14,1,1,10],[14,1,1,11],[15,1,1,12],[15,1,1,13],[15,1,1,14],[11,0,2,9],[11,0,2,10],[19,0,2,11],[19,0,2,12],[16,0,3,0],[16,0,3,1],[16,0,3,2],[0,0,3,3],[1,0,3,4],[3,0,3,5],[3,0,3,6],[17,0,3,7],[17,0,3,8],[17,0,3,9],[9,0,3,10],[9,0,3,11],[18,0,3,12],[18,0,3,13],[18,0,3,14],[20,0,0,15],[20,0,0,16],[10,0,0,17],[10,0,0,18]],"mech":["voids","walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid"]},{"n":70,"w":7,"h":12,"time":145,"scale":1.149999976158142,"voids":[77,78,70,83,82,76,0,1,7,6,5,13,42,35,48,41,24,52],"walls":[10,66,73,37,39],"cats":[{"color":1,"cells":[43,44],"bow":6},{"color":1,"cells":[2,9,8],"outer":0},{"color":2,"cells":[4,11,12]},{"color":5,"cells":[58,51],"bow":5},{"color":5,"cells":[60,53],"bow":5},{"color":4,"cells":[46,47]},{"color":5,"cells":[50,49,56]},{"color":8,"cells":[54,55,62]},{"color":8,"cells":[69,68,67]},{"color":4,"cells":[71,72]},{"color":4,"cells":[75,74]},{"color":0,"cells":[79,80,81]},{"color":5,"cells":[16,23]},{"color":5,"cells":[18,25]},{"color":5,"cells":[36,29]},{"color":5,"cells":[40,33]},{"color":3,"cells":[22,15,14]},{"color":3,"cells":[26,19,20]},{"color":4,"cells":[27,34]},{"color":4,"cells":[21,28]}],"gates":[{"cell":28,"out":[-1,0],"queue":[4,4,5,5,5,5,4,4,8,8,8]},{"cell":34,"out":[1,0],"queue":[1,1,1,3,3,3],"ice":2},{"cell":4,"out":[0,-1],"queue":[5,5,5,5,4,4,4,4,8,8,8,4,4,5,5,5,5],"ice":6},{"cell":79,"out":[0,1],"queue":[5,5,5,1,1,0,0,0,0,0,0,2,2,2,3,3,3],"ice":1}],"hide":[{"x":2,"y":4,"w":1,"h":1,"count":10,"grid":true},{"x":4,"y":4,"w":1,"h":1,"count":10,"grid":true},{"x":3,"y":0,"w":1,"h":1,"count":4,"grid":true},{"x":3,"y":8,"w":1,"h":1,"count":10,"grid":true},{"x":1,"y":8,"w":1,"h":1,"count":10,"grid":true},{"x":5,"y":8,"w":1,"h":1,"count":10,"grid":true},{"x":4,"y":7,"w":3,"h":3,"count":8,"grid":false},{"x":3,"y":2,"w":1,"h":1,"count":2,"grid":true},{"x":0,"y":7,"w":3,"h":3,"count":10,"grid":false},{"x":3,"y":6,"w":1,"h":1,"count":2,"grid":true},{"x":3,"y":5,"w":1,"h":1,"count":5,"grid":true},{"x":3,"y":4,"w":1,"h":1,"count":10,"grid":true},{"x":1,"y":4,"w":5,"h":3,"count":5,"grid":false}],"locks":[],"plan":[[19,0,0,0],[19,0,0,1],[12,0,0,2],[12,0,0,3],[13,0,0,4],[13,0,0,5],[18,0,0,6],[18,0,0,7],[1,0,1,0],[1,0,1,1],[1,0,1,2],[17,0,1,3],[17,0,1,4],[17,0,1,5],[15,0,2,0],[15,0,2,1],[14,0,2,2],[14,0,2,3],[5,0,2,4],[5,0,2,5],[7,0,0,8],[7,0,0,9],[7,0,0,10],[10,0,2,6],[10,0,2,7],[8,0,2,8],[8,0,2,9],[8,0,2,10],[3,0,3,0],[3,0,3,1],[4,0,3,2],[9,0,2,11],[9,0,2,12],[4,0,2,13],[0,0,3,3],[0,0,3,4],[11,0,3,5],[11,0,3,6],[11,0,3,7],[6,0,2,14],[6,0,2,15],[6,0,2,16],[1,1,3,8],[1,1,3,9],[1,1,3,10],[2,0,3,11],[2,0,3,12],[2,0,3,13],[16,0,3,14],[16,0,3,15],[16,0,3,16]],"mech":["voids","walls","multiLayerGate","gateIce","nested","hideBox","hideGrid","bow"]},{"n":71,"w":7,"h":12,"time":165,"scale":1.149999976158142,"voids":[78,71,70,77,5,12,13,6],"walls":[24,59,60,53,23,30],"cats":[{"color":0,"cells":[35,36,37],"bow":10},{"color":0,"cells":[48,47,46],"bow":14},{"color":5,"cells":[67,66,73,72]},{"color":1,"cells":[79,80,81]},{"color":4,"cells":[7,14,15,16]},{"color":1,"cells":[0,1,2]},{"color":4,"cells":[21,28]},{"color":4,"cells":[22,29]},{"color":6,"cells":[42,49]},{"color":6,"cells":[56,63]},{"color":3,"cells":[31,32,25,26,19]},{"color":4,"cells":[39,40]},{"color":6,"cells":[41,34],"outer":0},{"color":4,"cells":[20,27]},{"color":3,"cells":[54,61,68]},{"color":1,"cells":[55,62,69]},{"color":6,"cells":[83,82]},{"color":4,"cells":[76,75],"outer":0},{"color":5,"cells":[43,44,51]}],"gates":[{"cell":83,"out":[0,1],"queue":[6,6,6,6,1,1,1,6,6,6,6]},{"cell":20,"out":[1,0],"queue":[4,4,3,3,3,4,4,4,4,4]},{"cell":21,"out":[-1,0],"queue":[0,0,0,0,4,4,4,1,1,5,5,5]},{"cell":2,"out":[0,-1],"queue":[4,4,4,4,3,3,3,3,3,5,5,5,5]},{"cell":63,"out":[-1,0],"queue":[0,0,0,0,0,0,1,1,1,1],"ice":12}],"hide":[{"x":3,"y":5,"w":1,"h":1,"count":5,"grid":true},{"x":3,"y":6,"w":1,"h":1,"count":2,"grid":true},{"x":2,"y":9,"w":1,"h":1,"count":1,"grid":true},{"x":4,"y":2,"w":1,"h":1,"count":4,"grid":true},{"x":1,"y":1,"w":1,"h":1,"count":2,"grid":true},{"x":4,"y":10,"w":1,"h":1,"count":7,"grid":true},{"x":1,"y":7,"w":1,"h":1,"count":5,"grid":true},{"x":5,"y":4,"w":1,"h":1,"count":7,"grid":true},{"x":5,"y":7,"w":2,"h":5,"count":2,"grid":false},{"x":0,"y":3,"w":3,"h":7,"count":6,"grid":false},{"x":0,"y":0,"w":5,"h":3,"count":10,"grid":false}],"locks":[],"plan":[[13,0,1,0],[13,0,1,1],[10,0,1,2],[10,0,1,3],[10,0,1,4],[11,0,1,5],[11,0,1,6],[16,0,0,0],[16,0,0,1],[17,0,1,7],[17,0,1,8],[12,0,0,2],[12,0,0,3],[3,0,0,4],[3,0,0,5],[3,0,0,6],[8,0,0,7],[8,0,0,8],[9,0,0,9],[9,0,0,10],[6,0,1,9],[17,1,2,0],[17,1,2,1],[12,1,2,2],[12,1,2,3],[4,0,2,4],[4,0,2,5],[4,0,2,6],[4,0,3,0],[5,0,2,7],[5,0,2,8],[7,0,3,1],[7,0,3,2],[2,0,2,9],[2,0,2,10],[2,0,2,11],[6,0,3,3],[10,0,3,4],[10,0,3,5],[1,0,4,0],[1,0,4,1],[1,0,4,2],[14,0,3,6],[14,0,3,7],[14,0,3,8],[2,0,3,9],[0,0,4,3],[0,0,4,4],[0,0,4,5],[5,0,4,6],[18,0,3,10],[18,0,3,11],[18,0,3,12],[15,0,4,7],[15,0,4,8],[15,0,4,9]],"mech":["voids","walls","multiLayerGate","gateIce","nested","hideBox","hideGrid","bow"]},{"n":72,"w":6,"h":11,"time":175,"scale":1.149999976158142,"voids":[53,46,47,40,41,35,34,28,29,22,23,17,0,6,12,60,54,48],"walls":[],"cats":[{"color":8,"cells":[3,4,5]},{"color":6,"cells":[11,10,9,8],"outer":1},{"color":4,"cells":[7,1,2],"ice":9},{"color":4,"cells":[36,37,31,25,24]},{"color":5,"cells":[13,19,20],"outer":1},{"color":2,"cells":[43,49,50]},{"color":3,"cells":[62,61,55],"ice":7},{"color":8,"cells":[56,57,58,59],"outer":0},{"color":6,"cells":[63,64,65]},{"color":3,"cells":[32,26,27]},{"color":3,"cells":[38,39,33]},{"color":5,"cells":[15,16],"bow":5},{"color":2,"cells":[44,45],"bow":7}],"gates":[{"cell":16,"out":[1,0],"queue":[8,8,8,2,2,2]},{"cell":45,"out":[1,0],"queue":[6,6,6,5,5,5,6,6,6,6,4,4,4,4],"ice":1},{"cell":63,"out":[0,1],"queue":[3,3,3,3,3,3,3,1,1,1,1,1,1,1],"ice":5},{"cell":3,"out":[0,-1],"queue":[3,3,4,4,4,0,0,0,0,2,2],"ice":5},{"cell":30,"out":[-1,0],"queue":[4,5,5,8,8,8,8],"ice":7}],"hide":[{"x":2,"y":4,"w":2,"h":3,"count":5,"grid":false}],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[0,0,0,2],[8,0,1,0],[8,0,1,1],[8,0,1,2],[5,0,0,3],[5,0,0,4],[5,0,0,5],[4,0,1,3],[4,0,1,4],[4,0,1,5],[1,0,1,6],[1,0,1,7],[1,0,1,8],[1,0,1,9],[9,0,3,0],[9,0,3,1],[3,0,3,2],[3,0,3,3],[3,0,3,4],[3,0,1,10],[3,0,1,11],[9,0,2,0],[6,0,2,1],[6,0,2,2],[6,0,2,3],[10,0,2,4],[10,0,2,5],[10,0,2,6],[1,1,2,7],[1,1,2,8],[1,1,2,9],[1,1,2,10],[2,0,1,12],[2,0,1,13],[2,0,4,0],[4,1,2,11],[4,1,2,12],[4,1,2,13],[11,0,4,1],[11,0,4,2],[7,0,4,3],[7,0,4,4],[7,0,4,5],[7,0,4,6],[7,1,3,5],[7,1,3,6],[7,1,3,7],[7,1,3,8],[12,0,3,9],[12,0,3,10]],"mech":["voids","multiLayerGate","gateIce","catIce","nested","hideBox","bow"]},{"n":73,"w":6,"h":12,"time":140,"scale":1.149999976158142,"voids":[],"walls":[2,8,29,28,27,26,42,43,44,45,47],"cats":[{"color":1,"cells":[12,13,14,15,16],"bow":8},{"color":0,"cells":[0,6]},{"color":0,"cells":[1,7]},{"color":5,"cells":[9,10]},{"color":5,"cells":[3,4]},{"color":0,"cells":[36,30,24,18]},{"color":3,"cells":[38,39,33,32],"outer":0},{"color":1,"cells":[40,41,35,34]},{"color":4,"cells":[21,20]},{"color":2,"cells":[69,70,71]},{"color":5,"cells":[57,58,59]},{"color":2,"cells":[51,52,53]},{"color":5,"cells":[66,67]},{"color":4,"cells":[60,61]},{"color":5,"cells":[55,54]},{"color":4,"cells":[49,48]}],"gates":[{"cell":67,"out":[0,1],"queue":[5,5,5,5,3,3,3,3,4,4,1,1,1,1]},{"cell":53,"out":[1,0],"queue":[4,4,4,4,0,0,0,0,2,2]},{"cell":1,"out":[0,-1],"queue":[5,5,5,5,2,2,2,2],"ice":5},{"cell":36,"out":[-1,0],"queue":[0,0,0,0,0,0,0,0,1,1,1,1,1,5,5,5],"ice":10}],"hide":[{"x":5,"y":0,"w":1,"h":1,"count":2,"grid":true},{"x":5,"y":1,"w":1,"h":1,"count":2,"grid":true},{"x":5,"y":2,"w":1,"h":1,"count":1,"grid":true},{"x":5,"y":3,"w":1,"h":1,"count":2,"grid":true},{"x":4,"y":3,"w":1,"h":1,"count":2,"grid":true},{"x":1,"y":3,"w":1,"h":1,"count":2,"grid":true},{"x":1,"y":4,"w":1,"h":1,"count":10,"grid":true},{"x":1,"y":5,"w":1,"h":1,"count":1,"grid":true},{"x":1,"y":6,"w":1,"h":1,"count":10,"grid":true},{"x":4,"y":7,"w":1,"h":1,"count":4,"grid":true},{"x":3,"y":10,"w":1,"h":1,"count":10,"grid":true},{"x":5,"y":10,"w":1,"h":1,"count":10,"grid":true},{"x":4,"y":10,"w":1,"h":1,"count":10,"grid":true},{"x":2,"y":11,"w":1,"h":1,"count":3,"grid":true},{"x":2,"y":9,"w":1,"h":1,"count":2,"grid":true},{"x":2,"y":8,"w":1,"h":1,"count":5,"grid":true},{"x":2,"y":10,"w":1,"h":1,"count":4,"grid":true},{"x":0,"y":3,"w":6,"h":4,"count":4,"grid":false},{"x":0,"y":0,"w":6,"h":3,"count":6,"grid":false}],"locks":[],"plan":[[12,0,0,0],[12,0,0,1],[14,0,0,2],[14,0,0,3],[15,0,1,0],[15,0,1,1],[13,0,1,2],[13,0,1,3],[6,0,0,4],[6,0,0,5],[6,0,0,6],[6,0,0,7],[6,1,1,4],[6,1,1,5],[6,1,1,6],[6,1,1,7],[11,0,1,8],[11,0,1,9],[8,0,0,8],[8,0,0,9],[7,0,0,10],[7,0,0,11],[7,0,0,12],[7,0,0,13],[3,0,2,0],[3,0,2,1],[10,0,2,2],[10,0,2,3],[11,0,2,4],[2,0,3,0],[2,0,3,1],[5,0,3,2],[5,0,3,3],[5,0,3,4],[5,0,3,5],[1,0,3,6],[1,0,3,7],[9,0,2,5],[9,0,2,6],[9,0,2,7],[0,0,3,8],[0,0,3,9],[0,0,3,10],[0,0,3,11],[0,0,3,12],[10,0,3,13],[4,0,3,14],[4,0,3,15]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox","hideGrid","bow"]},{"n":74,"w":7,"h":10,"time":145,"scale":1.149999976158142,"voids":[66,63,64,65,67,68,69],"walls":[52,59,17,10],"cats":[{"color":2,"cells":[46,45,44,43],"bow":10},{"color":6,"cells":[36,29,22],"bow":8},{"color":4,"cells":[16,9,2]},{"color":4,"cells":[1,8,15]},{"color":0,"cells":[0,7]},{"color":8,"cells":[14,21]},{"color":8,"cells":[50,57]},{"color":4,"cells":[51,58]},{"color":4,"cells":[4,11,18]},{"color":6,"cells":[34,27]},{"color":2,"cells":[19,20]},{"color":6,"cells":[12,13]},{"color":5,"cells":[5,6]},{"color":3,"cells":[61,62]},{"color":3,"cells":[54,55,48]},{"color":2,"cells":[23,24,25],"bow":7},{"color":5,"cells":[26,33,40,47],"bow":9},{"color":1,"cells":[35,42]},{"color":1,"cells":[49,56]},{"color":1,"cells":[53,60]}],"gates":[{"cell":6,"out":[0,-1],"queue":[2,2,1,1,1,1,1,1],"ice":3},{"cell":0,"out":[0,-1],"queue":[8,8,3,3,3],"ice":2},{"cell":62,"out":[0,1],"queue":[3,3,0,0,4,4,4,4,4,2,2,2,2,2]},{"cell":56,"out":[0,1],"queue":[8,8,6,6,2,2,5,5,5],"ice":1},{"cell":35,"out":[-1,0],"queue":[4,4,4,4,4,4,5,5,5,6,6,6,6,6],"ice":8}],"hide":[{"x":0,"y":4,"w":1,"h":1,"count":10,"grid":true},{"x":6,"y":5,"w":1,"h":1,"count":10,"grid":true},{"x":3,"y":0,"w":1,"h":1,"count":10,"grid":true},{"x":2,"y":4,"w":3,"h":2,"count":4,"grid":false}],"locks":[],"plan":[[13,0,2,0],[13,0,2,1],[6,0,3,0],[6,0,3,1],[5,0,1,0],[5,0,1,1],[10,0,0,0],[10,0,0,1],[19,0,0,2],[19,0,0,3],[4,0,2,2],[4,0,2,3],[8,0,2,4],[8,0,2,5],[8,0,2,6],[2,0,2,7],[2,0,2,8],[15,0,2,9],[15,0,2,10],[15,0,2,11],[3,0,4,0],[3,0,4,1],[3,0,4,2],[14,0,1,2],[14,0,1,3],[14,0,1,4],[0,0,2,12],[0,0,2,13],[2,0,4,3],[17,0,0,4],[17,0,0,5],[7,0,4,4],[7,0,4,5],[1,0,3,2],[1,0,3,3],[12,0,4,6],[12,0,4,7],[16,0,4,8],[18,0,0,6],[18,0,0,7],[1,0,4,9],[0,0,3,4],[0,0,3,5],[9,0,4,10],[9,0,4,11],[11,0,4,12],[11,0,4,13],[16,0,3,6],[16,0,3,7],[16,0,3,8]],"mech":["voids","walls","multiLayerGate","gateIce","hideBox","hideGrid","bow"]},{"n":75,"w":7,"h":11,"time":145,"scale":1.149999976158142,"voids":[6,13,12,5,4,11,18,25,26,27,20,19,70,63],"walls":[39,15,1,65,58,68,61],"cats":[{"color":5,"cells":[34,41]},{"color":3,"cells":[33,40]},{"color":5,"cells":[32,31,30],"bow":10},{"color":5,"cells":[48,47]},{"color":5,"cells":[46,45,44],"bow":10},{"color":4,"cells":[38,37]},{"color":6,"cells":[29,28]},{"color":4,"cells":[43,42]},{"color":1,"cells":[21,14]},{"color":4,"cells":[7,0]},{"color":2,"cells":[9,8],"outer":8},{"color":4,"cells":[2,3]},{"color":6,"cells":[17,16]},{"color":2,"cells":[22,23,24],"outer":8},{"color":1,"cells":[67,66,59,60],"ice":5},{"color":1,"cells":[72,73,74]},{"color":0,"cells":[57,64,71]},{"color":3,"cells":[75,76,69]},{"color":1,"cells":[49,50]},{"color":0,"cells":[51,52,53]},{"color":1,"cells":[54,55]}],"gates":[{"cell":3,"out":[0,-1],"queue":[4,4,4,4,2,2,2,2,2,5,5,5,5,1,1,1,1,1,1]},{"cell":21,"out":[-1,0],"queue":[4,4,4,4,3,3,3,3,3,5,5,5,5,5,5],"ice":5},{"cell":74,"out":[0,1],"queue":[0,0,0,8,8,8,8,8],"ice":9},{"cell":55,"out":[1,0],"queue":[1,1,1,1,1,1,1,0,0,0,6,6,6,6],"ice":10}],"hide":[{"x":1,"y":5,"w":1,"h":1,"count":10,"grid":true},{"x":0,"y":4,"w":7,"h":4,"count":4,"grid":false},{"x":1,"y":8,"w":6,"h":3,"count":8,"grid":false},{"x":3,"y":1,"w":1,"h":1,"count":1,"grid":true}],"locks":[],"plan":[[11,0,0,0],[11,0,0,1],[9,0,0,2],[9,0,0,3],[10,0,0,4],[10,0,0,5],[13,0,0,6],[13,0,0,7],[13,0,0,8],[3,0,0,9],[3,0,0,10],[0,0,0,11],[0,0,0,12],[20,0,0,13],[20,0,0,14],[8,0,0,15],[8,0,0,16],[5,0,1,0],[5,0,1,1],[7,0,1,2],[7,0,1,3],[1,0,1,4],[1,0,1,5],[15,0,3,0],[15,0,3,1],[15,0,3,2],[16,0,2,0],[16,0,2,1],[16,0,2,2],[10,1,2,3],[10,1,2,4],[13,1,2,5],[13,1,2,6],[13,1,2,7],[14,0,3,3],[14,0,3,4],[14,0,3,5],[14,0,3,6],[17,0,1,6],[17,0,1,7],[17,0,1,8],[2,0,1,9],[2,0,1,10],[2,0,1,11],[4,0,1,12],[4,0,1,13],[4,0,1,14],[19,0,3,7],[19,0,3,8],[19,0,3,9],[6,0,3,10],[6,0,3,11],[12,0,3,12],[12,0,3,13],[18,0,0,17],[18,0,0,18]],"mech":["voids","walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid","bow"]},{"n":76,"w":8,"h":10,"time":145,"scale":1.149999976158142,"voids":[],"walls":[1,9,3,11,6,14,25,26,27,28,30,31,58,59,60,61,63,62,43,45],"cats":[{"color":3,"cells":[8,0]},{"color":0,"cells":[2,10,18]},{"color":2,"cells":[4,12,20]},{"color":0,"cells":[21,13,5]},{"color":2,"cells":[7,15,23]},{"color":8,"cells":[55,54,53,52]},{"color":2,"cells":[44,36]},{"color":4,"cells":[37,38]},{"color":8,"cells":[46,47,39]},{"color":6,"cells":[66,67,68,69,70,71,79,78,77,76,75,74]},{"color":3,"cells":[72,73]},{"color":5,"cells":[64,56]},{"color":4,"cells":[57,65]},{"color":4,"cells":[48,40,32]},{"color":5,"cells":[49,41]},{"color":2,"cells":[50,51]},{"color":4,"cells":[42,34,35]},{"color":2,"cells":[16,24]}],"gates":[{"cell":73,"out":[0,1],"queue":[4,4,2,2,6,6,6,2,2,2,2,2,2,2]},{"cell":2,"out":[0,-1],"queue":[2,2,2,6,6,6,6,6,6,3,3,3,3,8,8,8]},{"cell":39,"out":[1,0],"queue":[4,4,5,5,5,5,0,0,6,6,6]},{"cell":32,"out":[-1,0],"queue":[8,8,8,8,0,0,0,0]},{"cell":7,"out":[0,-1],"queue":[4,4,4,4,4,4]}],"hide":[{"x":5,"y":3,"w":1,"h":1,"count":4,"grid":true},{"x":3,"y":2,"w":1,"h":1,"count":2,"grid":true},{"x":1,"y":2,"w":1,"h":1,"count":1,"grid":true},{"x":6,"y":2,"w":1,"h":1,"count":3,"grid":true},{"x":2,"y":7,"w":6,"h":3,"count":10,"grid":false},{"x":1,"y":0,"w":7,"h":3,"count":5,"grid":false},{"x":2,"y":4,"w":6,"h":3,"count":2,"grid":false}],"locks":[],"plan":[[12,0,0,0],[12,0,0,1],[17,0,0,2],[17,0,0,3],[7,0,2,0],[7,0,2,1],[5,0,3,0],[5,0,3,1],[5,0,3,2],[5,0,3,3],[14,0,2,2],[14,0,2,3],[11,0,2,4],[11,0,2,5],[3,0,2,6],[3,0,2,7],[1,0,3,4],[1,0,3,5],[1,0,3,6],[2,0,1,0],[2,0,1,1],[2,0,1,2],[3,0,3,7],[13,0,4,0],[13,0,4,1],[13,0,4,2],[9,0,0,4],[9,0,0,5],[9,0,0,6],[16,0,4,3],[16,0,4,4],[16,0,4,5],[15,0,0,7],[15,0,0,8],[6,0,0,9],[6,0,0,10],[9,0,2,8],[9,0,2,9],[9,0,2,10],[9,0,1,3],[9,0,1,4],[9,0,1,5],[9,0,1,6],[9,0,1,7],[9,0,1,8],[0,0,1,9],[0,0,1,10],[10,0,1,11],[10,0,1,12],[8,0,1,13],[8,0,1,14],[8,0,1,15],[4,0,0,11],[4,0,0,12],[4,0,0,13]],"mech":["walls","multiLayerGate","hideBox","hideGrid"]},{"n":77,"w":6,"h":10,"time":1450,"scale":1.149999976158142,"voids":[],"walls":[48,53,44,45,30,32,33,35,19,22,21,6,8,9,10],"cats":[{"color":5,"cells":[43,37,38,39,40,46]},{"color":2,"cells":[54,55,56]},{"color":2,"cells":[59,58,57]},{"color":3,"cells":[34,28],"outer":0},{"color":8,"cells":[24,25,31]},{"color":4,"cells":[27,26]},{"color":8,"cells":[20,14,15]},{"color":2,"cells":[3,2]},{"color":4,"cells":[29,23]},{"color":3,"cells":[16,17]},{"color":6,"cells":[0,1]},{"color":2,"cells":[13,7]},{"color":6,"cells":[18,12],"outer":2},{"color":1,"cells":[11,5,4]}],"gates":[{"cell":1,"out":[0,-1],"queue":[6,6,6,6,0,0,5,5,5,4,4,4,4]},{"cell":29,"out":[1,0],"queue":[3,3,3,3,2,2,2],"ice":1},{"cell":24,"out":[-1,0],"queue":[1,1,1,2,2,2,5,5,5,2,2,2]},{"cell":57,"out":[0,1],"queue":[8,8,8,8,8,8,2,2,2]}],"hide":[{"x":2,"y":1,"w":2,"h":5,"count":2,"grid":false},{"x":0,"y":6,"w":6,"h":4,"count":8,"grid":false}],"locks":[],"plan":[[10,0,0,0],[10,0,0,1],[3,0,1,0],[3,0,1,1],[9,0,1,2],[9,0,1,3],[12,0,0,2],[12,0,0,3],[7,0,1,4],[7,0,1,5],[11,0,1,6],[13,0,2,0],[13,0,2,1],[13,0,2,2],[11,0,2,3],[3,1,0,4],[3,1,0,5],[0,0,0,6],[0,0,0,7],[0,0,0,8],[6,0,3,0],[6,0,3,1],[6,0,3,2],[5,0,0,9],[5,0,0,10],[8,0,0,11],[8,0,0,12],[4,0,3,3],[4,0,3,4],[4,0,3,5],[1,0,3,6],[1,0,3,7],[1,0,3,8],[12,1,2,4],[12,1,2,5],[0,0,2,6],[0,0,2,7],[0,0,2,8],[2,0,2,9],[2,0,2,10],[2,0,2,11]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox"]},{"n":78,"w":7,"h":9,"time":130,"scale":1.149999976158142,"voids":[],"walls":[8,15,10,12,19,29,36,31,24,33,40,50,54],"cats":[{"color":0,"cells":[0,7,14],"outer":7},{"color":8,"cells":[6,13,20],"outer":7},{"color":1,"cells":[2,1]},{"color":1,"cells":[4,5]},{"color":3,"cells":[16,9]},{"color":3,"cells":[18,11]},{"color":0,"cells":[23,22,21],"outer":2},{"color":0,"cells":[28,35]},{"color":0,"cells":[37,30],"outer":5},{"color":8,"cells":[25,26,27],"outer":2},{"color":8,"cells":[41,34]},{"color":8,"cells":[39,32],"outer":2},{"color":5,"cells":[42,43,44],"bow":5},{"color":6,"cells":[48,47,46],"bow":6},{"color":4,"cells":[49,56]},{"color":1,"cells":[57,58,51]},{"color":5,"cells":[59,60,53]},{"color":4,"cells":[55,62]}],"gates":[{"cell":35,"out":[-1,0],"queue":[0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,2]},{"cell":41,"out":[1,0],"queue":[8,8,8,8,8,8,8,8,8,8,3,3,3,3]},{"cell":4,"out":[0,-1],"queue":[7,7,7,7,7,7,4,4,4,4,5,5,5,5,5,6,6,6],"ice":8},{"cell":59,"out":[0,1],"queue":[5,5,5,2,2,2,1,1,1],"ice":9}],"hide":[{"x":3,"y":7,"w":1,"h":1,"count":2,"grid":true},{"x":3,"y":6,"w":1,"h":1,"count":2,"grid":true},{"x":3,"y":5,"w":1,"h":1,"count":4,"grid":true},{"x":3,"y":0,"w":1,"h":1,"count":4,"grid":true},{"x":3,"y":2,"w":1,"h":1,"count":2,"grid":true},{"x":5,"y":8,"w":1,"h":1,"count":2,"grid":true},{"x":0,"y":0,"w":7,"h":3,"count":4,"grid":false},{"x":0,"y":6,"w":7,"h":3,"count":8,"grid":false}],"locks":[],"plan":[[7,0,0,0],[7,0,0,1],[10,0,1,0],[10,0,1,1],[6,0,0,2],[6,0,0,3],[6,0,0,4],[9,0,1,2],[9,0,1,3],[9,0,1,4],[0,0,0,5],[0,0,0,6],[0,0,0,7],[1,0,1,5],[1,0,1,6],[1,0,1,7],[8,0,0,8],[8,0,0,9],[2,0,0,10],[2,0,0,11],[0,1,2,0],[0,1,2,1],[0,1,2,2],[16,0,3,0],[16,0,3,1],[16,0,3,2],[9,1,3,3],[9,1,3,4],[9,1,3,5],[15,0,3,6],[15,0,3,7],[15,0,3,8],[1,1,2,3],[1,1,2,4],[1,1,2,5],[11,0,1,8],[11,0,1,9],[3,0,0,12],[3,0,0,13],[6,1,0,14],[6,1,0,15],[6,1,0,16],[11,1,0,17],[11,1,0,18],[4,0,1,10],[4,0,1,11],[5,0,1,12],[5,0,1,13],[14,0,2,6],[14,0,2,7],[17,0,2,8],[17,0,2,9],[8,1,2,10],[8,1,2,11],[12,0,2,12],[12,0,2,13],[12,0,2,14],[13,0,2,15],[13,0,2,16],[13,0,2,17]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox","hideGrid","bow"]},{"n":79,"w":6,"h":9,"time":175,"scale":1.149999976158142,"voids":[],"walls":[2,8,14,20,39,45],"cats":[{"color":2,"cells":[25,26,27,28],"bow":10},{"color":2,"cells":[38,44,50],"bow":8},{"color":1,"cells":[51,52,53]},{"color":0,"cells":[48,49]},{"color":1,"cells":[42,43]},{"color":0,"cells":[36,37]},{"color":1,"cells":[21,22,23],"outer":3},{"color":3,"cells":[5,11,17]},{"color":6,"cells":[15,16]},{"color":4,"cells":[10,9]},{"color":4,"cells":[3,4]},{"color":6,"cells":[40,46],"bow":7},{"color":5,"cells":[41,47]},{"color":3,"cells":[33,34],"bow":4},{"color":3,"cells":[35,29]},{"color":1,"cells":[31,32],"bow":4},{"color":1,"cells":[24,30]},{"color":6,"cells":[18,12,6,0,1,7,13,19]}],"gates":[{"cell":4,"out":[0,-1],"queue":[4,4,1,1,1]},{"cell":41,"out":[1,0],"queue":[0,0,0,0,4,4,6,6,6,6,6,6,6]},{"cell":12,"out":[-1,0],"queue":[5,5,1,1,1,1,1,1,1]},{"cell":50,"out":[0,1],"queue":[1,1,3,3,3,3,3,2,2,2,2,2],"ice":2},{"cell":42,"out":[-1,0],"queue":[2,2,3,3,3,3,3,6,6,6,6,6],"ice":8}],"hide":[{"x":3,"y":6,"w":3,"h":3,"count":3,"grid":false},{"x":0,"y":0,"w":2,"h":4,"count":7,"grid":false}],"locks":[],"plan":[[10,0,0,0],[10,0,0,1],[6,0,0,2],[6,0,0,3],[6,0,0,4],[4,0,3,0],[4,0,3,1],[3,0,1,0],[3,0,1,1],[5,0,1,2],[5,0,1,3],[13,0,3,2],[13,0,3,3],[9,0,1,4],[9,0,1,5],[14,0,3,4],[14,0,3,5],[1,0,4,0],[1,0,4,1],[8,0,1,6],[8,0,1,7],[6,1,3,6],[1,0,3,7],[6,1,4,2],[6,1,4,3],[7,0,4,4],[7,0,4,5],[7,0,4,6],[11,0,1,8],[11,0,1,9],[0,0,3,8],[0,0,3,9],[0,0,3,10],[0,0,3,11],[17,0,1,10],[17,0,1,11],[17,0,1,12],[12,0,2,0],[12,0,2,1],[15,0,2,2],[15,0,2,3],[16,0,2,4],[16,0,2,5],[17,0,4,7],[17,0,4,8],[17,0,4,9],[17,0,4,10],[17,0,4,11],[2,0,2,6],[2,0,2,7],[2,0,2,8]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox","bow"]},{"n":80,"w":9,"h":12,"time":125,"scale":1.149999976158142,"voids":[99,100,101,90,81,105,87,88,97,106,96,98,89,107,18,19,20,11,2,1,10,9,0,6,7,8,17,26],"walls":[83,64,55,37,46,70,61,43,24,49,40,67,76,52,94,13],"cats":[{"color":8,"cells":[74,73,72]},{"color":4,"cells":[78,79,80]},{"color":4,"cells":[33,34,35]},{"color":8,"cells":[29,28,27]},{"color":0,"cells":[44,53]},{"color":0,"cells":[62,71]},{"color":5,"cells":[42,51]},{"color":5,"cells":[60,69]},{"color":4,"cells":[36,45]},{"color":4,"cells":[54,63]},{"color":1,"cells":[38,47]},{"color":1,"cells":[56,65]},{"color":1,"cells":[93,102]},{"color":5,"cells":[103,104,95]},{"color":5,"cells":[84,85,86]},{"color":1,"cells":[12,21]},{"color":1,"cells":[22,23,14]},{"color":3,"cells":[3,4,5]},{"color":0,"cells":[75,66,57,58,59,68,77]},{"color":5,"cells":[48,39,30,31,32,41,50]}],"gates":[{"cell":63,"out":[-1,0],"queue":[4,4,1,1,3,3,3]},{"cell":71,"out":[1,0],"queue":[0,0,5,5,8,8,1,1,1,1,0,0,0,0,0]},{"cell":4,"out":[0,-1],"queue":[1,1,1,1,1,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5]},{"cell":103,"out":[0,1],"queue":[8,8,8,8,0,0,0,0,5,5,5,5,5,5,5]}],"hide":[{"x":3,"y":0,"w":3,"h":12,"count":4,"grid":false},{"x":1,"y":9,"w":2,"h":2,"count":5,"grid":false},{"x":6,"y":1,"w":2,"h":2,"count":5,"grid":false}],"locks":[],"plan":[[5,0,1,0],[5,0,1,1],[9,0,0,0],[9,0,0,1],[11,0,0,2],[11,0,0,3],[7,0,1,2],[7,0,1,3],[16,0,2,0],[16,0,2,1],[16,0,2,2],[15,0,2,3],[15,0,2,4],[2,0,2,5],[2,0,2,6],[2,0,2,7],[0,0,3,0],[0,0,3,1],[0,0,3,2],[3,0,3,3],[1,0,2,8],[1,0,2,9],[1,0,2,10],[17,0,0,4],[17,0,0,5],[17,0,0,6],[8,0,2,11],[8,0,2,12],[19,0,2,13],[19,0,2,14],[19,0,2,15],[19,0,2,16],[19,0,2,17],[19,0,2,18],[19,0,2,19],[6,0,2,20],[3,0,1,4],[3,0,1,5],[10,0,1,6],[10,0,1,7],[12,0,1,8],[12,0,1,9],[4,0,1,10],[4,0,1,11],[18,0,1,12],[18,0,1,13],[18,0,1,14],[18,0,3,4],[18,0,3,5],[18,0,3,6],[18,0,3,7],[13,0,3,8],[13,0,3,9],[13,0,3,10],[14,0,3,11],[14,0,3,12],[14,0,3,13],[6,0,3,14]],"mech":["voids","walls","multiLayerGate","hideBox"]},{"n":81,"w":6,"h":8,"time":160,"scale":1.149999976158142,"voids":[],"walls":[25,28,14,15,31,34],"cats":[{"color":5,"cells":[42,43],"key":3},{"color":8,"cells":[36,37,38,39,40,41],"outer":0},{"color":2,"cells":[44,45],"key":3},{"color":4,"cells":[46,47],"key":3},{"color":4,"cells":[18,19,20]},{"color":4,"cells":[21,22,23]},{"color":2,"cells":[30,24]},{"color":3,"cells":[32,26]},{"color":2,"cells":[33,27]},{"color":3,"cells":[35,29]},{"color":1,"cells":[6,7,8,9,10,11]},{"color":5,"cells":[0,1]},{"color":8,"cells":[2,3],"key":5},{"color":5,"cells":[4,5]},{"color":3,"cells":[12,13],"key":5},{"color":2,"cells":[16,17],"key":5}],"gates":[{"cell":47,"out":[0,1],"queue":[4,4,2,2,5,5,8,8,8,8,8,8,8,8,4,4,4,4,4,4]},{"cell":24,"out":[-1,0],"queue":[3,3,3,3,1,1,1],"ice":4},{"cell":0,"out":[0,-1],"queue":[5,5,1,1,1,0,0,0,3,3],"ice":6},{"cell":23,"out":[1,0],"queue":[0,0,0,5,5,2,2,2,2,2,2],"ice":5}],"hide":[{"x":0,"y":4,"w":6,"h":2,"count":4,"grid":false},{"x":0,"y":0,"w":6,"h":3,"count":1,"grid":false}],"locks":[{"key":3,"count":3,"cells":[36,37,38,39,40,41]},{"key":5,"count":3,"cells":[18,19,20]}],"plan":[[3,0,0,0],[3,0,0,1],[2,0,0,2],[2,0,0,3],[0,0,0,4],[0,0,0,5],[1,0,0,6],[1,0,0,7],[1,0,0,8],[1,0,0,9],[1,0,0,10],[1,0,0,11],[7,0,1,0],[7,0,1,1],[9,0,1,2],[9,0,1,3],[11,0,2,0],[11,0,2,1],[10,0,2,2],[10,0,2,3],[10,0,2,4],[1,1,3,0],[1,1,3,1],[1,1,3,2],[13,0,3,3],[13,0,3,4],[15,0,3,5],[15,0,3,6],[8,0,3,7],[8,0,3,8],[6,0,3,9],[6,0,3,10],[10,0,1,4],[10,0,1,5],[10,0,1,6],[12,0,0,12],[12,0,0,13],[1,1,2,5],[1,1,2,6],[1,1,2,7],[14,0,2,8],[14,0,2,9],[4,0,0,14],[4,0,0,15],[4,0,0,16],[5,0,0,17],[5,0,0,18],[5,0,0,19]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox","key","lockBox"]},{"n":82,"w":6,"h":11,"time":145,"scale":1.149999976158142,"voids":[],"walls":[58,59],"cats":[{"color":8,"cells":[63,57,51,45,39],"bow":10},{"color":8,"cells":[2,8,14,20,26],"bow":10},{"color":5,"cells":[46,47]},{"color":6,"cells":[60,54,48,42,36],"ice":5},{"color":11,"cells":[61,55],"ice":3},{"color":11,"cells":[62,56,50],"ice":2},{"color":3,"cells":[49,43]},{"color":3,"cells":[37,38]},{"color":4,"cells":[25,24]},{"color":6,"cells":[18,19],"key":2},{"color":4,"cells":[12,13],"outer":6,"key":5},{"color":6,"cells":[7,6],"key":2},{"color":4,"cells":[0,1],"key":5},{"color":4,"cells":[3,9,15]},{"color":4,"cells":[16,10,4,5,11]},{"color":11,"cells":[40,41]},{"color":11,"cells":[53,52]},{"color":4,"cells":[64,65]},{"color":2,"cells":[28,22]},{"color":4,"cells":[32,33]},{"color":2,"cells":[27,21]}],"gates":[{"cell":0,"out":[0,-1],"queue":[4,4,4,4,2,2,3,3,11,11,8,8,8,8,8]},{"cell":3,"out":[0,-1],"queue":[6,6,3,3,11,11,8,8,8,8,8],"ice":2},{"cell":53,"out":[1,0],"queue":[4,4,6,6,6,6],"ice":4},{"cell":62,"out":[0,1],"queue":[2,2,4,4,4,4,4,4,6,6,6,6,6],"ice":6},{"cell":30,"out":[-1,0],"queue":[5,5,11,11,11,11,11,4,4,4,4,4,4],"ice":10}],"hide":[{"x":1,"y":5,"w":1,"h":1,"count":15,"grid":true},{"x":2,"y":7,"w":1,"h":1,"count":8,"grid":true},{"x":4,"y":5,"w":1,"h":1,"count":15,"grid":true},{"x":5,"y":5,"w":1,"h":1,"count":15,"grid":true},{"x":5,"y":4,"w":1,"h":1,"count":5,"grid":true},{"x":5,"y":3,"w":1,"h":1,"count":2,"grid":true},{"x":5,"y":2,"w":1,"h":1,"count":2,"grid":true},{"x":3,"y":6,"w":3,"h":5,"count":4,"grid":false},{"x":0,"y":6,"w":3,"h":5,"count":5,"grid":false}],"locks":[{"key":2,"count":2,"cells":[46,47]},{"key":5,"count":2,"cells":[4,5,10,11,16]}],"plan":[[12,0,0,0],[12,0,0,1],[10,0,0,2],[10,0,0,3],[11,0,1,0],[11,0,1,1],[20,0,0,4],[20,0,0,5],[17,0,2,0],[17,0,2,1],[7,0,1,2],[7,0,1,3],[15,0,1,4],[15,0,1,5],[0,0,1,6],[0,0,1,7],[0,0,1,8],[0,0,1,9],[0,0,1,10],[10,1,2,2],[10,1,2,3],[18,0,3,0],[18,0,3,1],[14,0,3,2],[14,0,3,3],[14,0,3,4],[14,0,3,5],[14,0,3,6],[3,0,2,4],[3,0,2,5],[8,0,3,7],[3,0,3,8],[3,0,3,9],[3,0,3,10],[9,0,3,11],[9,0,3,12],[2,0,4,0],[2,0,4,1],[4,0,4,2],[4,0,4,3],[5,0,4,4],[5,0,4,5],[5,0,4,6],[13,0,4,7],[13,0,4,8],[13,0,4,9],[19,0,4,10],[19,0,4,11],[6,0,0,6],[6,0,0,7],[8,0,4,12],[16,0,0,8],[16,0,0,9],[1,0,0,10],[1,0,0,11],[1,0,0,12],[1,0,0,13],[1,0,0,14]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid","bow","key","lockBox"]},{"n":83,"w":6,"h":10,"time":155,"scale":1.149999976158142,"voids":[],"walls":[19,13,16,22,32,33,49,43,52,46],"cats":[{"color":2,"cells":[36,37,38,44,50,56]},{"color":5,"cells":[26,27,28],"bow":3},{"color":6,"cells":[42,48],"outer":3},{"color":6,"cells":[54,55],"outer":3},{"color":4,"cells":[57,58]},{"color":4,"cells":[59,53]},{"color":4,"cells":[47,41]},{"color":0,"cells":[20,21]},{"color":11,"cells":[8,9,15]},{"color":0,"cells":[2,3]},{"color":11,"cells":[24,18,12],"outer":8},{"color":6,"cells":[7,6]},{"color":6,"cells":[1,0]},{"color":2,"cells":[34,40]},{"color":2,"cells":[39,45]}],"gates":[{"cell":0,"out":[0,-1],"queue":[6,6,3,3],"ice":5},{"cell":59,"out":[0,1],"queue":[4,4,4,4,6,6,6,6,4,4,0,0,0]},{"cell":54,"out":[0,1],"queue":[11,11,11,0,5,5,5],"ice":7},{"cell":5,"out":[0,-1],"queue":[2,2,2,2,8,8,8,6,6,3,3],"ice":8},{"cell":24,"out":[-1,0],"queue":[2,2,2,2,2,2,11,11,11],"ice":10}],"hide":[{"x":0,"y":5,"w":1,"h":1,"count":15,"grid":true},{"x":3,"y":8,"w":1,"h":1,"count":15,"grid":true},{"x":2,"y":2,"w":1,"h":1,"count":5,"grid":true},{"x":5,"y":3,"w":1,"h":1,"count":11,"grid":true},{"x":5,"y":5,"w":1,"h":1,"count":5,"grid":true},{"x":0,"y":0,"w":2,"h":5,"count":5,"grid":false},{"x":2,"y":0,"w":4,"h":5,"count":7,"grid":false}],"locks":[],"plan":[[5,0,1,0],[5,0,1,1],[4,0,1,2],[4,0,1,3],[3,0,1,4],[3,0,1,5],[2,0,1,6],[2,0,1,7],[6,0,1,8],[6,0,1,9],[12,0,0,0],[12,0,0,1],[3,1,0,2],[3,1,0,3],[10,0,2,0],[10,0,2,1],[10,0,2,2],[7,0,2,3],[14,0,3,0],[14,0,3,1],[0,0,3,2],[0,0,3,3],[7,0,1,10],[1,0,2,4],[1,0,2,5],[1,0,2,6],[0,0,4,0],[0,0,4,1],[0,0,4,2],[0,0,4,3],[10,1,3,4],[10,1,3,5],[10,1,3,6],[9,0,1,11],[9,0,1,12],[11,0,3,7],[11,0,3,8],[13,0,4,4],[13,0,4,5],[2,1,3,9],[2,1,3,10],[8,0,4,6],[8,0,4,7],[8,0,4,8]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox","hideGrid","bow"]},{"n":84,"w":7,"h":11,"time":140,"scale":1.149999976158142,"voids":[],"walls":[14,15,20,19,17,16,56,58,57,62,61,47,33,34,29,43,42,45,31,71,1],"cats":[{"color":6,"cells":[22,21,28,35,36],"outer":3},{"color":1,"cells":[49,50]},{"color":6,"cells":[54,55,48,41,40],"outer":8},{"color":0,"cells":[26,27]},{"color":6,"cells":[44,51],"outer":1},{"color":2,"cells":[52,53,46,39],"outer":5},{"color":3,"cells":[38,37,30,23,24],"outer":5},{"color":8,"cells":[25,32],"outer":0},{"color":2,"cells":[6,13]},{"color":0,"cells":[12,5],"key":3},{"color":2,"cells":[11,4]},{"color":0,"cells":[3,10],"key":3},{"color":2,"cells":[9,2]},{"color":1,"cells":[8,7,0]},{"color":2,"cells":[69,76]},{"color":1,"cells":[75,68]},{"color":2,"cells":[67,74]},{"color":1,"cells":[73,66]},{"color":2,"cells":[65,72]},{"color":4,"cells":[64,63,70]}],"gates":[{"cell":6,"out":[0,-1],"queue":[2,2,2,2,2,1,1,2,6,6,2,2,2,2,5,6,6,6,6,6],"ice":3},{"cell":72,"out":[0,1],"queue":[2,2,2,4,4,2,2,2,8,8,3,3,3,3,0,0,1,1,1,1]},{"cell":41,"out":[1,0],"queue":[1,1,1,1,1,3,3,3,3,3,3],"ice":10},{"cell":49,"out":[-1,0],"queue":[0,0,0,0,0,0]},{"cell":7,"out":[-1,0],"queue":[5,5,5,5,5,5,5,5],"ice":3},{"cell":76,"out":[1,0],"queue":[8,8,8,8,8,6,6,6,6,6,4],"ice":14}],"hide":[{"x":4,"y":8,"w":1,"h":1,"count":15,"grid":true},{"x":3,"y":8,"w":1,"h":1,"count":5,"grid":true},{"x":4,"y":2,"w":1,"h":1,"count":6,"grid":true},{"x":2,"y":3,"w":3,"h":5,"count":6,"grid":false},{"x":5,"y":3,"w":2,"h":5,"count":8,"grid":false},{"x":0,"y":3,"w":2,"h":5,"count":12,"grid":false}],"locks":[{"key":3,"count":2,"cells":[21,22,28,35,36]}],"plan":[[18,0,1,0],[18,0,1,1],[16,0,1,2],[19,0,1,3],[19,0,1,4],[16,0,1,5],[14,0,1,6],[14,0,1,7],[8,0,0,0],[8,0,0,1],[10,0,0,2],[10,0,0,3],[12,0,0,4],[13,0,0,5],[13,0,0,6],[12,0,0,7],[4,0,0,8],[4,0,0,9],[7,0,1,8],[7,0,1,9],[5,0,0,10],[5,0,0,11],[5,0,0,12],[5,0,0,13],[5,1,0,14],[6,0,1,10],[6,0,1,11],[6,0,1,12],[6,0,1,13],[7,1,1,14],[7,1,1,15],[15,0,1,16],[15,0,1,17],[17,0,1,18],[17,0,1,19],[4,1,2,0],[4,1,2,1],[1,0,2,2],[1,0,2,3],[3,0,3,0],[3,0,3,1],[13,0,2,4],[2,0,0,15],[2,0,0,16],[2,0,0,17],[2,0,0,18],[2,0,0,19],[6,0,2,5],[2,1,5,0],[2,1,5,1],[2,1,5,2],[2,1,5,3],[2,1,5,4],[9,0,3,2],[9,0,3,3],[11,0,3,4],[11,0,3,5],[5,1,4,0],[5,1,4,1],[5,1,4,2],[6,1,4,3],[6,1,4,4],[6,1,4,5],[6,1,4,6],[6,1,4,7],[0,0,5,5],[0,0,5,6],[0,0,5,7],[0,0,5,8],[0,0,5,9],[0,1,2,6],[0,1,2,7],[0,1,2,8],[0,1,2,9],[0,1,2,10],[19,0,5,10]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox","hideGrid","key","lockBox"]},{"n":85,"w":7,"h":10,"time":175,"scale":1.149999976158142,"voids":[],"walls":[8,15,26,47,40,54,61,57,43,50],"cats":[{"color":6,"cells":[27,20,19,18,17,16,9,2,1]},{"color":1,"cells":[22,23,24],"ice":10},{"color":8,"cells":[33,34,41,48,55,62,69,68]},{"color":1,"cells":[13,6]},{"color":1,"cells":[4,5]},{"color":4,"cells":[3,10,11]},{"color":0,"cells":[63,56,49]},{"color":3,"cells":[42,35,36]},{"color":1,"cells":[28,29]},{"color":5,"cells":[58,65],"outer":2},{"color":0,"cells":[51,52,53],"outer":4},{"color":4,"cells":[60,67]},{"color":4,"cells":[37,44],"bow":5},{"color":5,"cells":[39,46],"outer":2,"bow":5},{"color":3,"cells":[30,31,32],"outer":2}],"gates":[{"cell":66,"out":[0,1],"queue":[4,4,5,5,0,0,0,3,3,3,4,4,4,1,1,6,6,6,6,6]},{"cell":14,"out":[-1,0],"queue":[4,4,4,4,4,8,8,8,8,5,5,1,1],"ice":5},{"cell":48,"out":[1,0],"queue":[2,2,2,2,0,0,0,8,8,8,8]},{"cell":3,"out":[0,-1],"queue":[1,1,1,1,1,3,3,3,2,2,2,6,6,6,6],"ice":10}],"hide":[{"x":3,"y":5,"w":1,"h":1,"count":10,"grid":true},{"x":3,"y":6,"w":1,"h":1,"count":10,"grid":true},{"x":3,"y":8,"w":1,"h":1,"count":10,"grid":true},{"x":5,"y":1,"w":1,"h":1,"count":10,"grid":true},{"x":5,"y":4,"w":2,"h":6,"count":6,"grid":false},{"x":0,"y":4,"w":2,"h":6,"count":10,"grid":false},{"x":0,"y":0,"w":7,"h":4,"count":4,"grid":false}],"locks":[],"plan":[[11,0,0,0],[11,0,0,1],[9,0,0,2],[9,0,0,3],[10,0,0,4],[10,0,0,5],[10,0,0,6],[14,0,0,7],[14,0,0,8],[14,0,0,9],[10,1,0,10],[10,1,0,11],[10,1,0,12],[3,0,0,13],[3,0,0,14],[14,1,2,0],[14,1,2,1],[14,1,2,2],[9,1,2,3],[5,0,1,0],[5,0,1,1],[5,0,1,2],[0,0,0,15],[0,0,0,16],[0,0,0,17],[0,0,0,18],[0,0,0,19],[12,0,1,3],[12,0,1,4],[2,0,1,5],[2,0,1,6],[2,0,1,7],[2,0,1,8],[13,0,1,9],[13,0,1,10],[4,0,3,0],[4,0,3,1],[8,0,3,2],[8,0,3,3],[6,0,2,4],[6,0,2,5],[6,0,2,6],[2,0,2,7],[2,0,2,8],[2,0,2,9],[2,0,2,10],[1,0,1,11],[1,0,1,12],[1,0,3,4],[7,0,3,5],[7,0,3,6],[7,0,3,7],[9,1,3,8],[13,1,3,9],[13,1,3,10],[0,0,3,11],[0,0,3,12],[0,0,3,13],[0,0,3,14]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid","bow"]},{"n":86,"w":8,"h":10,"time":140,"scale":1.149999976158142,"voids":[],"walls":[75,60,59,51,43,44,36,28,20,4,26,18,41,40,63,46,47,22],"cats":[{"color":4,"cells":[72,64],"outer":1},{"color":4,"cells":[73,65],"outer":8},{"color":4,"cells":[74,66]},{"color":4,"cells":[56,48,49,57,58,50],"outer":7},{"color":1,"cells":[69,77,76,68],"outer":8},{"color":1,"cells":[78,70],"outer":4},{"color":1,"cells":[79,71],"outer":4},{"color":1,"cells":[61,62],"outer":7},{"color":1,"cells":[52,53]},{"color":1,"cells":[54,55]},{"color":2,"cells":[33,32],"outer":1},{"color":2,"cells":[25,24]},{"color":2,"cells":[16,17,9,8],"outer":8},{"color":2,"cells":[1,0],"outer":5},{"color":2,"cells":[3,2]},{"color":2,"cells":[34,35,27,19,11,10]},{"color":5,"cells":[37,29,21],"outer":2},{"color":5,"cells":[38,30]},{"color":5,"cells":[39,31,23],"outer":7},{"color":5,"cells":[13,5,6,14,15,7],"outer":8}],"gates":[{"cell":56,"out":[-1,0],"queue":[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]},{"cell":55,"out":[1,0],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},{"cell":7,"out":[0,-1],"queue":[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]},{"cell":24,"out":[-1,0],"queue":[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]},{"cell":78,"out":[0,1],"queue":[7,7,7,7,7,7,7,8,8,8,8],"ice":28},{"cell":31,"out":[1,0],"queue":[8,8,8,8,8,8,8,8,8,8,8,8,7,7,7,7],"ice":24}],"hide":[{"x":3,"y":8,"w":1,"h":1,"count":20,"grid":true},{"x":2,"y":5,"w":1,"h":1,"count":14,"grid":true},{"x":5,"y":5,"w":1,"h":1,"count":10,"grid":true},{"x":4,"y":1,"w":1,"h":1,"count":18,"grid":true}],"locks":[],"plan":[[3,0,0,0],[3,0,0,1],[3,0,0,2],[3,0,0,3],[3,0,0,4],[3,0,0,5],[9,0,1,0],[9,0,1,1],[11,0,3,0],[11,0,3,1],[19,0,2,0],[19,0,2,1],[19,0,2,2],[19,0,2,3],[19,0,2,4],[19,0,2,5],[10,0,3,2],[10,0,3,3],[7,0,1,2],[7,0,1,3],[12,0,3,4],[12,0,3,5],[12,0,3,6],[12,0,3,7],[8,0,1,4],[8,0,1,5],[4,0,1,6],[4,0,1,7],[4,0,1,8],[4,0,1,9],[5,0,1,10],[5,0,1,11],[15,0,3,8],[15,0,3,9],[15,0,3,10],[15,0,3,11],[15,0,3,12],[15,0,3,13],[14,0,3,14],[14,0,3,15],[13,0,3,16],[13,0,3,17],[6,0,1,12],[6,0,1,13],[0,0,0,6],[0,0,0,7],[1,0,0,8],[1,0,0,9],[2,0,0,10],[2,0,0,11],[18,0,2,6],[18,0,2,7],[18,0,2,8],[16,0,2,9],[16,0,2,10],[16,0,2,11],[17,0,2,12],[17,0,2,13],[5,1,0,12],[5,1,0,13],[6,1,0,14],[6,1,0,15],[0,1,1,14],[0,1,1,15],[13,1,2,14],[13,1,2,15],[12,1,5,0],[12,1,5,1],[12,1,5,2],[12,1,5,3],[19,1,5,4],[19,1,5,5],[19,1,5,6],[19,1,5,7],[19,1,5,8],[19,1,5,9],[16,1,3,18],[16,1,3,19],[16,1,3,20],[4,1,5,10],[4,1,5,11],[18,1,5,12],[18,1,5,13],[18,1,5,14],[7,1,4,0],[7,1,4,1],[3,1,4,2],[3,1,4,3],[3,1,4,4],[3,1,4,5],[3,1,4,6],[3,1,5,15],[1,1,4,7],[1,1,4,8],[10,1,1,16],[10,1,1,17],[4,1,4,9],[4,1,4,10]],"mech":["walls","multiLayerGate","gateIce","nested","hideGrid"]},{"n":87,"w":7,"h":12,"time":160,"scale":1.0499999523162842,"voids":[48,47,46,45,44,43,42,35,37,38,36,39,40,41],"walls":[],"cats":[{"color":8,"cells":[32,25,18],"outer":3},{"color":8,"cells":[33,26],"outer":3},{"color":8,"cells":[34,27,20],"outer":3},{"color":8,"cells":[19,12,5],"outer":3},{"color":8,"cells":[11,4]},{"color":8,"cells":[13,6]},{"color":7,"cells":[15,22,29],"outer":6},{"color":7,"cells":[23,30]},{"color":7,"cells":[2,9,16],"outer":6},{"color":7,"cells":[1,8],"outer":6},{"color":7,"cells":[0,7,14],"outer":6},{"color":7,"cells":[21,28]},{"color":6,"cells":[3,10,17,24,31],"outer":3,"ice":20},{"color":4,"cells":[82,83]},{"color":4,"cells":[54,55]},{"color":4,"cells":[71,70]},{"color":4,"cells":[57,56]},{"color":11,"cells":[75,76]},{"color":11,"cells":[61,62]},{"color":11,"cells":[78,77]},{"color":11,"cells":[50,49]},{"color":10,"cells":[68,69]},{"color":10,"cells":[64,63]},{"color":10,"cells":[73,74,81,80,79,72,65,66,67],"ice":13},{"color":10,"cells":[59,58,51],"ice":4},{"color":10,"cells":[52,53,60],"ice":4}],"gates":[{"cell":83,"out":[1,0],"queue":[4,4,4,4,4,4,4,4,10]},{"cell":49,"out":[-1,0],"queue":[11,11,11,11,11,11,11,11,10]},{"cell":80,"out":[0,1],"queue":[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],"ice":30},{"cell":6,"out":[1,0],"queue":[8,8,8,8,8,8,8,8,3,8,8,8,8,8,8,8]},{"cell":28,"out":[-1,0],"queue":[7,7,7,7,7,7,7,7,7,7,6,7,7,7,7,7]},{"cell":34,"out":[1,0],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,3,3,3,3,3,3],"ice":20},{"cell":0,"out":[-1,0],"queue":[3,3,3,3,3,3,3,3,3,6,6,6],"ice":20}],"hide":[{"x":0,"y":7,"w":7,"h":5,"count":12,"grid":false}],"locks":[],"plan":[[5,0,3,0],[5,0,3,1],[11,0,4,0],[11,0,4,1],[2,0,3,2],[2,0,3,3],[2,0,3,4],[6,0,4,2],[6,0,4,3],[6,0,4,4],[3,0,3,5],[3,0,3,6],[3,0,3,7],[3,1,3,8],[10,0,4,5],[10,0,4,6],[10,0,4,7],[7,0,4,8],[7,0,4,9],[6,1,4,10],[8,0,4,11],[8,0,4,12],[8,0,4,13],[4,0,3,9],[4,0,3,10],[0,0,3,11],[0,0,3,12],[0,0,3,13],[9,0,4,14],[9,0,4,15],[1,0,3,14],[1,0,3,15],[13,0,0,0],[13,0,0,1],[20,0,1,0],[20,0,1,1],[19,0,1,2],[19,0,1,3],[14,0,0,2],[14,0,0,3],[18,0,1,4],[18,0,1,5],[17,0,1,6],[17,0,1,7],[16,0,0,4],[16,0,0,5],[15,0,0,6],[15,0,0,7],[21,0,0,8],[24,0,1,8],[12,0,5,0],[12,0,5,1],[12,0,5,2],[12,0,5,3],[12,0,5,4],[8,1,5,5],[8,1,5,6],[8,1,5,7],[6,1,5,8],[6,1,5,9],[10,1,5,10],[10,1,5,11],[0,1,6,0],[0,1,6,1],[0,1,6,2],[1,1,6,3],[1,1,6,4],[2,1,6,5],[2,1,6,6],[2,1,6,7],[3,1,6,8],[3,1,5,12],[9,1,6,9],[9,1,6,10],[10,1,6,11],[12,1,5,13],[12,1,5,14],[12,1,5,15],[12,1,5,16],[12,1,5,17],[23,0,2,0],[23,0,2,1],[23,0,2,2],[23,0,2,3],[23,0,2,4],[23,0,2,5],[23,0,2,6],[23,0,2,7],[23,0,2,8],[21,0,2,9],[22,0,2,10],[22,0,2,11],[24,0,2,12],[24,0,2,13],[25,0,2,14],[25,0,2,15],[25,0,2,16]],"mech":["voids","multiLayerGate","gateIce","catIce","nested","hideBox"]},{"n":88,"w":6,"h":10,"time":110,"scale":1.149999976158142,"voids":[],"walls":[],"cats":[{"color":11,"cells":[17,23,29,35,41,47,53,59],"outer":2},{"color":11,"cells":[28,34,40,46,52,58]},{"color":11,"cells":[39,45,51,57]},{"color":11,"cells":[50,56]},{"color":1,"cells":[42,36,30,24,18,12,6,0],"outer":4},{"color":1,"cells":[31,25,19,13,7,1]},{"color":1,"cells":[20,14,8,2]},{"color":1,"cells":[9,3]},{"color":5,"cells":[49,55,54,48],"ice":8},{"color":5,"cells":[5,11,10,4],"ice":8},{"color":5,"cells":[27,33,32,26],"ice":8},{"color":8,"cells":[43,37,38,44],"ice":10},{"color":8,"cells":[21,15,16,22],"ice":10}],"gates":[{"cell":56,"out":[0,1],"queue":[11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11]},{"cell":29,"out":[1,0],"queue":[5,5,5,5,5,5,5,5,5,5,8,8]},{"cell":24,"out":[-1,0],"queue":[8,8,8,8,8,8,5,5]},{"cell":3,"out":[0,-1],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},{"cell":59,"out":[1,0],"queue":[2,2,2,2,2,2,2,2],"ice":14},{"cell":0,"out":[-1,0],"queue":[4,4,4,4,4,4,4,4],"ice":13}],"hide":[],"locks":[],"plan":[[3,0,0,0],[3,0,0,1],[7,0,3,0],[7,0,3,1],[2,0,0,2],[2,0,0,3],[2,0,0,4],[2,0,0,5],[6,0,3,2],[6,0,3,3],[6,0,3,4],[6,0,3,5],[1,0,0,6],[1,0,0,7],[1,0,0,8],[1,0,0,9],[1,0,0,10],[1,0,0,11],[5,0,3,6],[5,0,3,7],[5,0,3,8],[5,0,3,9],[5,0,3,10],[5,0,3,11],[0,0,0,12],[0,0,0,13],[0,0,0,14],[0,0,0,15],[0,0,0,16],[0,0,0,17],[0,0,0,18],[0,0,0,19],[4,0,3,12],[4,0,3,13],[4,0,3,14],[4,0,3,15],[4,0,3,16],[4,0,3,17],[4,0,3,18],[4,0,3,19],[8,0,1,0],[8,0,1,1],[8,0,1,2],[8,0,1,3],[9,0,1,4],[9,0,1,5],[9,0,1,6],[9,0,1,7],[10,0,1,8],[10,0,1,9],[11,0,1,10],[11,0,1,11],[11,0,2,0],[11,0,2,1],[12,0,2,2],[12,0,2,3],[12,0,2,4],[12,0,2,5],[10,0,2,6],[10,0,2,7],[4,1,5,0],[4,1,5,1],[4,1,5,2],[4,1,5,3],[4,1,5,4],[4,1,5,5],[4,1,5,6],[4,1,5,7],[0,1,4,0],[0,1,4,1],[0,1,4,2],[0,1,4,3],[0,1,4,4],[0,1,4,5],[0,1,4,6],[0,1,4,7]],"mech":["multiLayerGate","gateIce","catIce","nested"]},{"n":89,"w":8,"h":11,"time":120,"scale":1.149999976158142,"voids":[40,56,48,32,24,16,8,0,57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2],"walls":[12,4,37,38,39,53,55,79,77,78,54],"cats":[{"color":6,"cells":[3,11,19],"outer":2},{"color":6,"cells":[13,5]},{"color":6,"cells":[30,22]},{"color":6,"cells":[15,7],"outer":2},{"color":1,"cells":[21,29],"outer":2},{"color":1,"cells":[6,14]},{"color":1,"cells":[23,31]},{"color":2,"cells":[43,35,27]},{"color":1,"cells":[51,59]},{"color":0,"cells":[83,75,67]},{"color":2,"cells":[87,86,85]},{"color":3,"cells":[71,70,69],"outer":0},{"color":1,"cells":[63,62,61],"outer":4},{"color":3,"cells":[47,46,45],"outer":0},{"color":3,"cells":[73,74,82,81,80,72,64,65,66],"outer":4,"ice":17},{"color":1,"cells":[76,84],"ice":4}],"gates":[{"cell":5,"out":[0,-1],"queue":[6,6,6,6,6,6,6,6,6]},{"cell":3,"out":[0,-1],"queue":[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],"ice":15},{"cell":84,"out":[0,1],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,1,4,4]},{"cell":63,"out":[1,0],"queue":[2,2,2,2,2,2,2,2,2,2,0,0,0,2,2,2],"ice":9},{"cell":64,"out":[-1,0],"queue":[0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4],"ice":17}],"hide":[{"x":4,"y":8,"w":1,"h":1,"count":3,"grid":true},{"x":4,"y":7,"w":1,"h":1,"count":4,"grid":true},{"x":4,"y":6,"w":1,"h":1,"count":5,"grid":true},{"x":4,"y":4,"w":1,"h":1,"count":6,"grid":true},{"x":4,"y":3,"w":1,"h":1,"count":2,"grid":true},{"x":4,"y":2,"w":1,"h":1,"count":1,"grid":true},{"x":4,"y":5,"w":1,"h":1,"count":6,"grid":true},{"x":5,"y":5,"w":3,"h":6,"count":8,"grid":false}],"locks":[],"plan":[[1,0,0,0],[1,0,0,1],[3,0,0,2],[3,0,0,3],[2,0,0,4],[2,0,0,5],[0,0,0,6],[0,0,0,7],[0,0,0,8],[15,0,2,0],[15,0,2,1],[8,0,2,2],[8,0,2,3],[4,0,2,4],[4,0,2,5],[6,0,2,6],[6,0,2,7],[12,0,2,8],[12,0,2,9],[12,0,2,10],[3,1,3,0],[3,1,3,1],[0,1,3,2],[0,1,3,3],[0,1,3,4],[4,1,3,5],[4,1,3,6],[7,0,3,7],[7,0,3,8],[7,0,3,9],[9,0,3,10],[9,0,3,11],[9,0,3,12],[10,0,3,13],[10,0,3,14],[10,0,3,15],[13,0,1,0],[13,0,1,1],[13,0,1,2],[5,0,2,11],[5,0,2,12],[12,1,2,13],[12,1,2,14],[14,0,1,3],[14,0,1,4],[14,0,1,5],[14,0,1,6],[14,0,1,7],[14,0,1,8],[14,0,1,9],[14,0,1,10],[14,0,1,11],[13,1,4,0],[13,1,4,1],[13,1,4,2],[11,0,1,12],[11,0,1,13],[11,0,1,14],[11,1,4,3],[11,1,4,4],[11,1,4,5],[12,1,4,6],[14,1,4,7],[14,1,4,8],[14,1,4,9],[14,1,4,10],[14,1,4,11],[14,1,4,12],[14,1,4,13],[14,1,4,14],[14,1,4,15]],"mech":["voids","walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid"]},{"n":90,"w":8,"h":11,"time":130,"scale":1.149999976158142,"voids":[7,6,0],"walls":[14,30,38,37,36,41,33,84,75,68,18,12],"cats":[{"color":1,"cells":[39,31]},{"color":1,"cells":[15,23]},{"color":6,"cells":[46,47]},{"color":6,"cells":[44,45],"outer":2},{"color":6,"cells":[52,53,54,55],"outer":3},{"color":1,"cells":[32,40,48],"outer":2},{"color":4,"cells":[8,16,24],"outer":3},{"color":4,"cells":[34,42]},{"color":3,"cells":[50,49]},{"color":8,"cells":[63,62,61],"bow":10},{"color":8,"cells":[56,57,58],"bow":10},{"color":6,"cells":[67,66,65],"outer":4},{"color":6,"cells":[81,80]},{"color":6,"cells":[76,77,85]},{"color":6,"cells":[79,71],"outer":4},{"color":0,"cells":[64,72]},{"color":2,"cells":[83,82,74]},{"color":0,"cells":[86,87]},{"color":0,"cells":[69,70]},{"color":8,"cells":[35,43,51],"ice":15},{"color":2,"cells":[11,10,2]},{"color":1,"cells":[4,5,13]},{"color":1,"cells":[1,9]},{"color":4,"cells":[20,21]},{"color":4,"cells":[17,25,26,27]},{"color":2,"cells":[28,29]}],"gates":[{"cell":47,"out":[1,0],"queue":[6,6,6,6,6,6,6,6]},{"cell":85,"out":[0,1],"queue":[6,6,6,6,6,8,8,8,8,8,8,8,2,2,2,2,2,2,2,2,2,2]},{"cell":80,"out":[-1,0],"queue":[6,6,6,6,6]},{"cell":81,"out":[0,1],"queue":[1,1,1,1,1,1,1,4,4,4,1,1,1,1,1],"ice":9},{"cell":4,"out":[0,-1],"queue":[4,4,4,4,4,4,4,4,8,8,4,4,4,4,4],"ice":23},{"cell":48,"out":[-1,0],"queue":[3,3,3,3,3,3,3,3,3],"ice":7},{"cell":79,"out":[1,0],"queue":[0,0,0,0,0,0,2,2,2],"ice":14}],"hide":[{"x":4,"y":7,"w":1,"h":1,"count":3,"grid":true},{"x":3,"y":7,"w":1,"h":1,"count":3,"grid":true},{"x":6,"y":2,"w":1,"h":1,"count":12,"grid":true},{"x":6,"y":9,"w":1,"h":1,"count":8,"grid":true},{"x":1,"y":9,"w":1,"h":1,"count":3,"grid":true},{"x":3,"y":2,"w":1,"h":1,"count":5,"grid":true},{"x":3,"y":0,"w":1,"h":1,"count":3,"grid":true},{"x":0,"y":8,"w":8,"h":3,"count":3,"grid":false},{"x":1,"y":0,"w":5,"h":4,"count":18,"grid":false}],"locks":[],"plan":[[2,0,0,0],[2,0,0,1],[3,0,0,2],[3,0,0,3],[4,0,0,4],[4,0,0,5],[4,0,0,6],[4,0,0,7],[12,0,2,0],[12,0,2,1],[13,0,1,0],[13,0,1,1],[13,0,1,2],[14,0,1,3],[14,0,1,4],[11,0,2,2],[11,0,2,3],[11,0,2,4],[8,0,5,0],[8,0,5,1],[4,1,5,2],[4,1,5,3],[4,1,5,4],[4,1,5,5],[5,0,3,0],[5,0,3,1],[5,0,3,2],[9,0,1,5],[9,0,1,6],[9,0,1,7],[10,0,1,8],[10,0,1,9],[10,0,1,10],[0,0,3,3],[0,0,3,4],[1,0,3,5],[1,0,3,6],[11,1,3,7],[11,1,3,8],[11,1,3,9],[17,0,6,0],[17,0,6,1],[18,0,6,2],[18,0,6,3],[15,0,6,4],[15,0,6,5],[5,1,6,6],[5,1,6,7],[5,1,6,8],[19,0,1,11],[3,1,1,12],[3,1,1,13],[16,0,1,14],[16,0,1,15],[16,0,1,16],[21,0,3,10],[21,0,3,11],[21,0,3,12],[20,0,1,17],[20,0,1,18],[20,0,1,19],[6,0,4,0],[6,0,4,1],[6,0,4,2],[6,1,5,6],[6,1,5,7],[6,1,5,8],[7,0,4,3],[7,0,4,4],[22,0,3,13],[22,0,3,14],[23,0,4,5],[23,0,4,6],[24,0,4,7],[25,0,1,20],[25,0,1,21],[19,0,4,8],[19,0,4,9],[24,0,4,10],[24,0,4,11],[24,0,4,12],[14,1,4,13],[14,1,4,14]],"mech":["voids","walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid","bow"]},{"n":91,"w":6,"h":12,"time":120,"scale":0.9599999785423279,"voids":[41,40,38,36,37,39,33,32,31,30,34,35,7,19],"walls":[16,70,58,52],"cats":[{"color":1,"cells":[24,18],"outer":6},{"color":1,"cells":[26,25],"outer":6},{"color":1,"cells":[8,14,20],"outer":4},{"color":1,"cells":[0,6],"outer":4},{"color":1,"cells":[2,1],"outer":6},{"color":5,"cells":[3,9,15,21,27]},{"color":4,"cells":[28,22],"key":5},{"color":4,"cells":[29,23],"outer":0,"key":5},{"color":4,"cells":[10,4],"outer":0},{"color":1,"cells":[13,12]},{"color":4,"cells":[11,5]},{"color":7,"cells":[65,71]},{"color":7,"cells":[51,57]},{"color":8,"cells":[69,63]},{"color":8,"cells":[53,59]},{"color":10,"cells":[68,62,56,50,44,45,46,47]},{"color":0,"cells":[49,48],"key":2},{"color":0,"cells":[61,60],"key":2},{"color":2,"cells":[66,67]},{"color":2,"cells":[54,55]},{"color":2,"cells":[42,43]}],"gates":[{"cell":24,"out":[-1,0],"queue":[0,0,0,0],"ice":16},{"cell":5,"out":[1,0],"queue":[4,4,4,4,4,4,4,4,4,4,4,4,4]},{"cell":23,"out":[1,0],"queue":[6,6,6,6,6,6,5,5,5,5,5],"ice":20},{"cell":48,"out":[-1,0],"queue":[0,0,0,0]},{"cell":71,"out":[0,1],"queue":[7,7,7,7,10,10]},{"cell":67,"out":[0,1],"queue":[10,10,10,10,10,10],"ice":18},{"cell":47,"out":[1,0],"queue":[8,8,8,8],"ice":8},{"cell":66,"out":[-1,0],"queue":[2,2,2,2,2,2],"ice":15},{"cell":12,"out":[-1,0],"queue":[1,1,1,1,1,1,1,1,1,1,1,1,1]}],"hide":[{"x":5,"y":2,"w":1,"h":1,"count":2,"grid":true},{"x":4,"y":10,"w":1,"h":1,"count":10,"grid":true},{"x":3,"y":8,"w":3,"h":4,"count":9,"grid":false},{"x":4,"y":0,"w":2,"h":5,"count":6,"grid":false},{"x":0,"y":7,"w":2,"h":5,"count":10,"grid":false}],"locks":[{"key":2,"count":2,"cells":[3,9,15,21,27]},{"key":5,"count":2,"cells":[44,45,46,47,50,56,62,68]}],"plan":[[9,0,8,0],[9,0,8,1],[0,0,8,2],[0,0,8,3],[3,0,8,4],[3,0,8,5],[4,0,8,6],[4,0,8,7],[2,0,8,8],[2,0,8,9],[2,0,8,10],[1,0,8,11],[1,0,8,12],[10,0,1,0],[10,0,1,1],[8,0,1,2],[8,0,1,3],[7,0,1,4],[7,0,1,5],[11,0,4,0],[11,0,4,1],[16,0,3,0],[16,0,3,1],[17,0,3,2],[17,0,3,3],[6,0,1,6],[6,0,1,7],[14,0,6,0],[14,0,6,1],[3,1,1,8],[3,1,1,9],[18,0,7,0],[18,0,7,1],[19,0,7,2],[19,0,7,3],[2,1,1,10],[2,1,1,11],[2,1,1,12],[15,0,5,0],[15,0,5,1],[15,0,5,2],[15,0,5,3],[15,0,5,4],[15,0,5,5],[20,0,7,4],[20,0,7,5],[13,0,6,2],[13,0,6,3],[12,0,4,2],[12,0,4,3],[15,0,4,4],[15,0,4,5],[8,1,0,0],[8,1,0,1],[7,1,0,2],[7,1,0,3],[0,1,2,0],[0,1,2,1],[1,1,2,2],[1,1,2,3],[4,1,2,4],[4,1,2,5],[5,0,2,6],[5,0,2,7],[5,0,2,8],[5,0,2,9],[5,0,2,10]],"mech":["voids","walls","multiLayerGate","gateIce","nested","hideBox","hideGrid","key","lockBox"]},{"n":92,"w":6,"h":11,"time":130,"scale":1.0499999523162842,"voids":[],"walls":[13,7,16,10],"cats":[{"color":2,"cells":[12,18]},{"color":2,"cells":[5,11]},{"color":5,"cells":[19,20]},{"color":5,"cells":[17,23]},{"color":5,"cells":[3,4]},{"color":5,"cells":[0,6]},{"color":1,"cells":[21,22]},{"color":1,"cells":[2,1],"outer":0},{"color":8,"cells":[9,15],"outer":0},{"color":8,"cells":[8,14]},{"color":4,"cells":[28,27,26]},{"color":4,"cells":[31,32,33]},{"color":2,"cells":[34,35]},{"color":5,"cells":[25,24]},{"color":6,"cells":[58,52,51,57,56,50,49,55],"ice":4},{"color":3,"cells":[64,65]},{"color":0,"cells":[59,53]},{"color":3,"cells":[47,41,40]},{"color":0,"cells":[38,39,45]},{"color":3,"cells":[44,43]},{"color":0,"cells":[36,42]},{"color":3,"cells":[48,54]},{"color":0,"cells":[60,61]}],"gates":[{"cell":23,"out":[1,0],"queue":[5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6]},{"cell":18,"out":[-1,0],"queue":[2,2,2,2,2,2,1,1],"ice":5},{"cell":0,"out":[-1,0],"queue":[1,1],"ice":15},{"cell":5,"out":[1,0],"queue":[4,4,4,4,4,4],"ice":9},{"cell":64,"out":[0,1],"queue":[3,3,3,3,3,3,3,3,3,8,8,8,8]},{"cell":61,"out":[0,1],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,0]}],"hide":[{"x":0,"y":5,"w":1,"h":1,"count":5,"grid":true},{"x":5,"y":4,"w":1,"h":1,"count":5,"grid":true},{"x":0,"y":4,"w":6,"h":2,"count":4,"grid":false},{"x":1,"y":6,"w":1,"h":1,"count":2,"grid":true},{"x":4,"y":7,"w":1,"h":1,"count":3,"grid":true},{"x":2,"y":10,"w":1,"h":1,"count":4,"grid":true},{"x":3,"y":10,"w":1,"h":1,"count":4,"grid":true},{"x":0,"y":6,"w":6,"h":5,"count":9,"grid":false}],"locks":[],"plan":[[3,0,0,0],[3,0,0,1],[2,0,0,2],[2,0,0,3],[4,0,0,4],[4,0,0,5],[5,0,0,6],[5,0,0,7],[13,0,0,8],[13,0,0,9],[0,0,1,0],[0,0,1,1],[12,0,1,2],[12,0,1,3],[1,0,1,4],[1,0,1,5],[7,0,1,6],[7,0,1,7],[10,0,3,0],[10,0,3,1],[10,0,3,2],[11,0,3,3],[11,0,3,4],[11,0,3,5],[15,0,4,0],[15,0,4,1],[22,0,5,0],[22,0,5,1],[16,0,5,2],[16,0,5,3],[17,0,4,2],[17,0,4,3],[17,0,4,4],[14,0,0,10],[14,0,0,11],[14,0,0,12],[14,0,0,13],[14,0,0,14],[14,0,0,15],[14,0,0,16],[14,0,0,17],[18,0,5,4],[18,0,5,5],[18,0,5,6],[19,0,4,5],[19,0,4,6],[20,0,5,7],[20,0,5,8],[21,0,4,7],[21,0,4,8],[9,0,4,9],[9,0,4,10],[7,1,5,9],[7,1,5,10],[6,0,2,0],[6,0,2,1],[8,0,4,11],[8,0,4,12],[8,1,5,11],[8,1,5,12]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid"]},{"n":93,"w":6,"h":11,"time":135,"scale":1.0499999523162842,"voids":[47,41,35,29,23,42,36,30,24,18],"walls":[43,46],"cats":[{"color":11,"cells":[61,60]},{"color":11,"cells":[48,54],"outer":0},{"color":11,"cells":[49,55],"outer":3},{"color":11,"cells":[62,56,50],"outer":1},{"color":11,"cells":[63,57]},{"color":11,"cells":[64,58],"outer":3},{"color":11,"cells":[65,59,53],"outer":0},{"color":11,"cells":[52,51]},{"color":0,"cells":[32,38,44]},{"color":3,"cells":[31,37]},{"color":3,"cells":[34,40]},{"color":4,"cells":[45,39,33]},{"color":8,"cells":[19,25]},{"color":8,"cells":[22,28]},{"color":11,"cells":[20,26]},{"color":11,"cells":[21,27]},{"color":4,"cells":[12,13,14]},{"color":2,"cells":[17,16,15]},{"color":1,"cells":[1,0,6]},{"color":1,"cells":[2,3,4]},{"color":0,"cells":[5,11,10]},{"color":4,"cells":[7,8,9]}],"gates":[{"cell":60,"out":[-1,0],"queue":[11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11]},{"cell":31,"out":[-1,0],"queue":[1,1,1,1,1,1,1,1],"ice":9},{"cell":3,"out":[0,-1],"queue":[3,3,3,3,3,3,3,3,4,4],"ice":11},{"cell":11,"out":[1,0],"queue":[8,8,8,8,11,11,1],"ice":15},{"cell":62,"out":[0,1],"queue":[0,0,0,0,0,0,0,0,4,4],"ice":18},{"cell":34,"out":[1,0],"queue":[2,2,2,0,0,0,4,4,4,4,4],"ice":20}],"hide":[{"x":1,"y":3,"w":4,"h":5,"count":8,"grid":false},{"x":0,"y":0,"w":6,"h":3,"count":10,"grid":false}],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[1,0,0,2],[1,0,0,3],[2,0,0,4],[2,0,0,5],[3,0,0,6],[3,0,0,7],[3,0,0,8],[4,0,0,9],[4,0,0,10],[7,0,0,11],[7,0,0,12],[5,0,0,13],[5,0,0,14],[6,0,0,15],[6,0,0,16],[6,0,0,17],[14,0,0,18],[14,0,0,19],[3,1,1,0],[3,1,1,1],[3,1,1,2],[18,0,1,3],[18,0,1,4],[18,0,1,5],[19,0,1,6],[19,0,1,7],[9,0,2,0],[9,0,2,1],[2,1,2,2],[2,1,2,3],[10,0,2,4],[10,0,2,5],[5,1,2,6],[5,1,2,7],[11,0,2,8],[11,0,2,9],[13,0,3,0],[13,0,3,1],[12,0,3,2],[12,0,3,3],[15,0,3,4],[15,0,3,5],[8,0,4,0],[8,0,4,1],[8,0,4,2],[6,1,4,3],[6,1,4,4],[6,1,4,5],[1,1,4,6],[1,1,4,7],[17,0,5,0],[17,0,5,1],[17,0,5,2],[11,0,4,8],[16,0,4,9],[20,0,5,3],[20,0,5,4],[20,0,5,5],[16,0,5,6],[16,0,5,7],[19,0,3,6],[21,0,5,8],[21,0,5,9],[21,0,5,10]],"mech":["voids","walls","multiLayerGate","gateIce","nested","hideBox"]},{"n":94,"w":6,"h":10,"time":90,"scale":1.149999976158142,"voids":[],"walls":[34,28,19,14,9],"cats":[{"color":2,"cells":[42,48],"outer":1},{"color":2,"cells":[44,50]},{"color":2,"cells":[46,52]},{"color":8,"cells":[53,47]},{"color":8,"cells":[51,45],"outer":1},{"color":8,"cells":[49,43]},{"color":0,"cells":[59,58,57,56,55,54]},{"color":4,"cells":[37,38,39],"bow":5},{"color":4,"cells":[30,31,32],"bow":5},{"color":11,"cells":[3,4,10]},{"color":1,"cells":[5,11]},{"color":5,"cells":[15,16]},{"color":11,"cells":[17,23,22]},{"color":1,"cells":[29,35]},{"color":6,"cells":[41,40]},{"color":8,"cells":[27,26,20]},{"color":5,"cells":[25,24]},{"color":1,"cells":[18,12,13]},{"color":8,"cells":[0,6]},{"color":5,"cells":[8,7,1],"outer":2}],"gates":[{"cell":47,"out":[1,0],"queue":[8,8,8,8,8,8,6,6,5,5]},{"cell":30,"out":[-1,0],"queue":[11,11,11,11,11,11,8,8,8,8,8,4,4,4],"ice":4},{"cell":23,"out":[1,0],"queue":[0,0,0,5,5,5,5,5,2,2,2,2,2,2,2,2,2],"ice":7},{"cell":1,"out":[0,-1],"queue":[1,1,1,1,1,1,1,1,1],"ice":12},{"cell":55,"out":[0,1],"queue":[0,0,0,4,4,4],"ice":18},{"cell":58,"out":[0,1],"queue":[1,1],"ice":20}],"hide":[{"x":3,"y":3,"w":1,"h":1,"count":2,"grid":true},{"x":2,"y":0,"w":1,"h":1,"count":7,"grid":true},{"x":3,"y":5,"w":1,"h":1,"count":1,"grid":true},{"x":0,"y":6,"w":1,"h":1,"count":1,"grid":true},{"x":0,"y":0,"w":6,"h":7,"count":3,"grid":false}],"locks":[],"plan":[[3,0,0,0],[3,0,0,1],[4,0,0,2],[4,0,0,3],[5,0,0,4],[5,0,0,5],[14,0,0,6],[14,0,0,7],[16,0,0,8],[16,0,0,9],[12,0,1,0],[12,0,1,1],[12,0,1,2],[9,0,1,3],[9,0,1,4],[9,0,1,5],[15,0,1,6],[15,0,1,7],[15,0,1,8],[18,0,1,9],[18,0,1,10],[7,0,1,11],[7,0,1,12],[7,0,1,13],[6,0,2,0],[6,0,2,1],[6,0,2,2],[11,0,2,3],[11,0,2,4],[19,0,2,5],[19,0,2,6],[19,0,2,7],[10,0,3,0],[10,0,3,1],[13,0,3,2],[13,0,3,3],[19,1,2,8],[19,1,2,9],[19,1,2,10],[2,0,2,11],[2,0,2,12],[17,0,3,4],[17,0,3,5],[17,0,3,6],[0,0,2,13],[0,0,2,14],[4,1,3,7],[4,1,3,8],[6,0,4,0],[6,0,4,1],[6,0,4,2],[0,1,5,0],[0,1,5,1],[8,0,4,3],[8,0,4,4],[8,0,4,5],[1,0,2,15],[1,0,2,16]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox","hideGrid","bow"]},{"n":95,"w":8,"h":10,"time":120,"scale":1.149999976158142,"voids":[],"walls":[74,66,50,35,33,17,19],"cats":[{"color":0,"cells":[73,72,64,65,57,56],"outer":1},{"color":0,"cells":[67,75],"key":5},{"color":0,"cells":[70,78]},{"color":4,"cells":[76,68]},{"color":4,"cells":[77,69]},{"color":4,"cells":[79,71]},{"color":10,"cells":[63,62,61,60,59,58]},{"color":4,"cells":[41,40,32],"outer":0},{"color":3,"cells":[25,24]},{"color":3,"cells":[9,8,16],"outer":0},{"color":7,"cells":[3,2,1,0],"ice":14},{"color":1,"cells":[43,42,34],"outer":0},{"color":3,"cells":[27,26],"outer":2},{"color":2,"cells":[11,10,18],"key":3},{"color":7,"cells":[36,37,38,39]},{"color":3,"cells":[44,52]},{"color":3,"cells":[46,54]},{"color":6,"cells":[53,45],"key":5},{"color":6,"cells":[55,47],"key":5},{"color":6,"cells":[22,23],"key":2},{"color":6,"cells":[13,12],"key":2},{"color":8,"cells":[21,20,28,29]},{"color":8,"cells":[14,15,7,6]},{"color":7,"cells":[30,31]},{"color":7,"cells":[5,4]}],"gates":[{"cell":24,"out":[-1,0],"queue":[3,3,3,3,3,3,3,3,3,3,3]},{"cell":47,"out":[1,0],"queue":[6,6,6,6,6,6,6,6]},{"cell":78,"out":[0,1],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,10,10,10]},{"cell":56,"out":[-1,0],"queue":[2,2,2,2,2]},{"cell":15,"out":[1,0],"queue":[1,1,1,1,1,1,1,1,1]},{"cell":0,"out":[-1,0],"queue":[7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8]},{"cell":75,"out":[0,1],"queue":[4,4,4,4,4,4,4,4,4,0,0,0,0,0],"ice":7}],"hide":[{"x":0,"y":6,"w":1,"h":1,"count":3,"grid":true},{"x":1,"y":6,"w":1,"h":1,"count":6,"grid":true},{"x":3,"y":6,"w":1,"h":1,"count":6,"grid":true},{"x":4,"y":5,"w":4,"h":2,"count":2,"grid":false},{"x":0,"y":0,"w":4,"h":7,"count":4,"grid":false},{"x":4,"y":0,"w":4,"h":4,"count":14,"grid":false}],"locks":[{"key":5,"count":3,"cells":[56,57,64,65,72,73]},{"key":3,"count":1,"cells":[36,37,38,39]},{"key":2,"count":2,"cells":[58,59,60,61,62,63]}],"plan":[[2,0,2,0],[2,0,2,1],[1,0,2,2],[1,0,2,3],[18,0,1,0],[18,0,1,1],[17,0,1,2],[17,0,1,3],[8,0,0,0],[8,0,0,1],[9,0,0,2],[9,0,0,3],[9,0,0,4],[12,0,0,5],[12,0,0,6],[3,0,6,0],[3,0,6,1],[4,0,6,2],[4,0,6,3],[5,0,6,4],[5,0,6,5],[12,1,3,0],[12,1,3,1],[15,0,0,7],[15,0,0,8],[16,0,0,9],[16,0,0,10],[13,0,3,2],[13,0,3,3],[13,0,3,4],[19,0,1,4],[19,0,1,5],[20,0,1,6],[20,0,1,7],[11,0,4,0],[11,0,4,1],[11,0,4,2],[11,1,2,4],[11,1,2,5],[11,1,2,6],[10,0,5,0],[10,0,5,1],[10,0,5,2],[10,0,5,3],[24,0,5,4],[24,0,5,5],[14,0,5,6],[14,0,5,7],[14,0,5,8],[14,0,5,9],[23,0,5,10],[23,0,5,11],[7,0,6,6],[7,0,6,7],[7,0,6,8],[7,1,6,9],[7,1,6,10],[7,1,6,11],[21,0,5,12],[21,0,5,13],[21,0,5,14],[21,0,5,15],[22,0,5,16],[22,0,5,17],[22,0,5,18],[22,0,5,19],[0,0,2,7],[0,0,2,8],[0,0,2,9],[0,0,2,10],[0,0,2,11],[0,0,2,12],[0,1,4,3],[0,1,4,4],[0,1,4,5],[0,1,4,6],[0,1,4,7],[0,1,4,8],[9,1,2,13],[9,1,6,12],[9,1,6,13],[6,0,2,14],[6,0,2,15],[6,0,2,16],[6,0,2,17],[6,0,2,18],[6,0,2,19]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid","key","lockBox"]},{"n":96,"w":7,"h":11,"time":180,"scale":1.100000023841858,"voids":[],"walls":[19,26,12,23,16,2,37,38,51,52,49,47,40,68,61,66,65],"cats":[{"color":6,"cells":[3,4,5,6],"outer":1},{"color":6,"cells":[13,20]},{"color":6,"cells":[27,34]},{"color":6,"cells":[0,7,14,21],"outer":4,"key":2},{"color":6,"cells":[15,22]},{"color":7,"cells":[30,31,32,33],"bow":15},{"color":8,"cells":[1,8]},{"color":2,"cells":[25,18,11],"outer":3},{"color":0,"cells":[24,17,10]},{"color":8,"cells":[55,48]},{"color":6,"cells":[69,62],"outer":4},{"color":0,"cells":[64,63,56,57],"outer":3},{"color":0,"cells":[58,59,60,53,46,45,44],"outer":4},{"color":6,"cells":[35,42,43,36],"key":2},{"color":4,"cells":[76,75,74,73,72,71,70],"outer":3}],"gates":[{"cell":34,"out":[1,0],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,4,4]},{"cell":13,"out":[1,0],"queue":[8,8,8,8],"ice":5},{"cell":42,"out":[-1,0],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6],"ice":9},{"cell":56,"out":[-1,0],"queue":[2,2,2,3,3,3,3,1,1,1,1],"ice":12},{"cell":4,"out":[0,-1],"queue":[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,7,7,7,7],"ice":13},{"cell":74,"out":[0,1],"queue":[3,3,3,3,3,3,3,3,3,3],"ice":18}],"hide":[{"x":2,"y":1,"w":1,"h":1,"count":4,"grid":true},{"x":1,"y":4,"w":1,"h":1,"count":4,"grid":true},{"x":0,"y":4,"w":1,"h":1,"count":4,"grid":true},{"x":6,"y":5,"w":1,"h":1,"count":2,"grid":true},{"x":4,"y":9,"w":1,"h":1,"count":3,"grid":true},{"x":1,"y":7,"w":1,"h":1,"count":5,"grid":true},{"x":5,"y":7,"w":1,"h":1,"count":3,"grid":true},{"x":4,"y":5,"w":1,"h":1,"count":3,"grid":true},{"x":0,"y":5,"w":6,"h":5,"count":5,"grid":false}],"locks":[{"key":2,"count":2,"cells":[70,71,72,73,74,75,76]}],"plan":[[2,0,0,0],[2,0,0,1],[1,0,0,2],[1,0,0,3],[0,0,0,4],[0,0,0,5],[0,0,0,6],[0,0,0,7],[10,0,0,8],[10,0,0,9],[4,0,0,10],[4,0,0,11],[9,0,1,0],[9,0,1,1],[6,0,1,2],[6,0,1,3],[3,0,0,12],[3,0,0,13],[3,0,0,14],[3,0,0,15],[13,0,0,16],[10,1,0,17],[10,1,0,18],[3,1,0,19],[12,0,2,0],[12,0,2,1],[12,0,2,2],[12,0,2,3],[12,0,2,4],[12,0,2,5],[12,0,2,6],[11,0,2,7],[11,0,2,8],[11,0,2,9],[11,0,2,10],[8,0,2,11],[8,0,2,12],[8,0,2,13],[13,0,2,14],[13,0,2,15],[13,0,2,16],[3,1,4,0],[3,1,4,1],[3,1,4,2],[12,1,4,3],[12,1,4,4],[12,1,4,5],[12,1,4,6],[12,1,4,7],[12,1,4,8],[12,1,4,9],[7,0,3,0],[7,0,3,1],[7,0,3,2],[7,1,3,3],[7,1,3,4],[7,1,3,5],[11,1,3,6],[14,0,4,10],[14,0,4,11],[14,0,4,12],[14,0,4,13],[14,0,4,14],[14,0,4,15],[14,0,4,16],[11,1,5,0],[11,1,5,1],[11,1,5,2],[14,1,5,3],[14,1,5,4],[14,1,5,5],[14,1,5,6],[14,1,5,7],[14,1,5,8],[14,1,5,9],[0,1,3,7],[0,1,3,8],[0,1,3,9],[0,1,3,10],[5,0,4,17],[5,0,4,18],[5,0,4,19],[5,0,4,20]],"mech":["walls","multiLayerGate","gateIce","nested","hideBox","hideGrid","bow","key","lockBox"]},{"n":97,"w":7,"h":10,"time":180,"scale":1.149999976158142,"voids":[63,56,49,42,35,36,64,57,50,43,29,28],"walls":[58,59,61,62,45,47,48,30,32,34,33,44],"cats":[{"color":2,"cells":[66,65]},{"color":2,"cells":[69,68,67],"outer":8},{"color":1,"cells":[51,52],"outer":4},{"color":1,"cells":[53,54,55]},{"color":0,"cells":[41,40,39],"outer":4},{"color":0,"cells":[38,37]},{"color":4,"cells":[26,25,18,11],"outer":0},{"color":3,"cells":[20,27]},{"color":3,"cells":[4,5],"outer":6},{"color":4,"cells":[12,19],"outer":6},{"color":4,"cells":[6,13]},{"color":8,"cells":[22,21]},{"color":10,"cells":[3,10,17,24,23,16,9,2],"ice":2},{"color":2,"cells":[15,14]},{"color":8,"cells":[8,7]},{"color":2,"cells":[1,0]}],"gates":[{"cell":65,"out":[-1,0],"queue":[2,2,2,2,2,2,2,2,2]},{"cell":55,"out":[1,0],"queue":[1,1,1,1,1],"ice":2},{"cell":37,"out":[-1,0],"queue":[0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4],"ice":4},{"cell":27,"out":[1,0],"queue":[3,3,3,3],"ice":6},{"cell":21,"out":[-1,0],"queue":[8,8,8,8,8,8,8,10,10,4,4],"ice":8},{"cell":69,"out":[1,0],"queue":[6,6,6,6],"ice":18},{"cell":51,"out":[-1,0],"queue":[0,0,0,0,10,10,10,10,10,10],"ice":13}],"hide":[{"x":4,"y":8,"w":1,"h":1,"count":13,"grid":true},{"x":4,"y":6,"w":1,"h":1,"count":13,"grid":true},{"x":3,"y":4,"w":1,"h":1,"count":10,"grid":true},{"x":4,"y":0,"w":3,"h":4,"count":6,"grid":false},{"x":0,"y":0,"w":4,"h":4,"count":8,"grid":false}],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[1,0,0,2],[1,0,0,3],[1,0,0,4],[3,0,1,0],[3,0,1,1],[3,0,1,2],[2,0,1,3],[2,0,1,4],[5,0,2,0],[5,0,2,1],[4,0,2,2],[4,0,2,3],[4,0,2,4],[4,1,2,5],[4,1,2,6],[4,1,2,7],[7,0,3,0],[7,0,3,1],[11,0,4,0],[11,0,4,1],[14,0,4,2],[14,0,4,3],[6,0,2,8],[6,0,2,9],[6,0,2,10],[6,0,2,11],[8,0,3,2],[8,0,3,3],[10,0,2,12],[10,0,2,13],[2,1,2,14],[2,1,2,15],[6,1,6,0],[6,1,6,1],[6,1,6,2],[6,1,6,3],[12,0,6,4],[12,0,6,5],[12,0,6,6],[12,0,6,7],[12,0,6,8],[12,0,6,9],[1,1,4,4],[1,1,4,5],[1,1,4,6],[12,0,4,7],[12,0,4,8],[9,0,4,9],[9,0,4,10],[9,1,5,0],[9,1,5,1],[13,0,0,5],[13,0,0,6],[8,1,5,2],[8,1,5,3],[15,0,0,7],[15,0,0,8]],"mech":["voids","walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid"]},{"n":98,"w":7,"h":11,"time":110,"scale":1.100000023841858,"voids":[71,70,63,64,65,72,4,11,12,5,6,13],"walls":[75,68,54,61,58,51,22,8,1,15,25,40,36,18],"cats":[{"color":3,"cells":[66,73]},{"color":3,"cells":[53,60],"outer":4},{"color":3,"cells":[76,69],"outer":4},{"color":1,"cells":[74,67]},{"color":1,"cells":[59,52]},{"color":1,"cells":[62,55]},{"color":1,"cells":[42,35,28],"outer":4},{"color":1,"cells":[34,41,48],"outer":4},{"color":2,"cells":[44,45,46],"outer":8,"bow":10},{"color":2,"cells":[32,31,30],"outer":8,"bow":10},{"color":0,"cells":[39,38,37]},{"color":8,"cells":[50,49,56,57],"ice":10},{"color":8,"cells":[26,19,20,27],"ice":10},{"color":1,"cells":[14,21]},{"color":3,"cells":[0,7]},{"color":4,"cells":[2,9,16]},{"color":0,"cells":[23,24,17]},{"color":2,"cells":[3,10]}],"gates":[{"cell":73,"out":[0,1],"queue":[3,3,3,3,3,3,3,3]},{"cell":55,"out":[1,0],"queue":[1,1,1,1,1,1,1]},{"cell":21,"out":[-1,0],"queue":[1,1,1,1,1,1,1]},{"cell":76,"out":[0,1],"queue":[8,8,8,8,8,8,8,8,8,8,8],"ice":17},{"cell":3,"out":[0,-1],"queue":[2,2,2,2,2,2,2,2,8,8,8],"ice":19},{"cell":49,"out":[-1,0],"queue":[0,0,0,0,0,0],"ice":15},{"cell":56,"out":[0,1],"queue":[4,4,4,4,4,4,4,4,4,4,4,4,4]}],"hide":[{"x":1,"y":6,"w":1,"h":1,"count":2,"grid":true},{"x":5,"y":6,"w":1,"h":1,"count":2,"grid":true},{"x":5,"y":4,"w":1,"h":1,"count":2,"grid":true},{"x":1,"y":4,"w":1,"h":1,"count":2,"grid":true},{"x":2,"y":0,"w":2,"h":4,"count":12,"grid":false},{"x":0,"y":4,"w":7,"h":3,"count":4,"grid":false}],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[5,0,1,0],[5,0,1,1],[13,0,2,0],[13,0,2,1],[1,0,0,2],[1,0,0,3],[6,0,2,2],[6,0,2,3],[6,0,2,4],[7,0,1,2],[7,0,1,3],[7,0,1,4],[4,0,1,5],[4,0,1,6],[2,0,0,4],[2,0,0,5],[3,0,2,5],[3,0,2,6],[14,0,0,6],[14,0,0,7],[6,1,6,0],[6,1,6,1],[6,1,6,2],[1,1,6,3],[1,1,6,4],[2,1,6,5],[2,1,6,6],[7,1,6,7],[7,1,6,8],[7,1,6,9],[15,0,6,10],[15,0,6,11],[15,0,6,12],[10,0,5,0],[10,0,5,1],[10,0,5,2],[16,0,5,3],[16,0,5,4],[16,0,5,5],[12,0,3,0],[12,0,3,1],[12,0,3,2],[12,0,3,3],[11,0,3,4],[11,0,3,5],[11,0,3,6],[11,0,3,7],[17,0,4,0],[17,0,4,1],[8,0,4,2],[8,0,4,3],[8,0,4,4],[8,1,3,8],[8,1,3,9],[8,1,3,10],[9,0,4,5],[9,0,4,6],[9,0,4,7],[9,1,4,8],[9,1,4,9],[9,1,4,10]],"mech":["voids","walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid","bow"]},{"n":99,"w":8,"h":9,"time":170,"scale":1.149999976158142,"voids":[],"walls":[4,36,62,46,30,14,34,33,52,68],"cats":[{"color":0,"cells":[13,5]},{"color":0,"cells":[28,20,12],"outer":8},{"color":0,"cells":[27,19]},{"color":2,"cells":[29,21]},{"color":2,"cells":[11,3]},{"color":2,"cells":[15,7,6],"outer":3},{"color":0,"cells":[31,23],"outer":4},{"color":0,"cells":[47,39,38],"outer":4},{"color":3,"cells":[55,63,71,70],"outer":6},{"color":0,"cells":[24,16,8,0,1,2],"outer":6},{"color":2,"cells":[66,65,64,56,48,40],"outer":6},{"color":4,"cells":[42,50,58,57],"ice":16},{"color":6,"cells":[26,18,10,9],"ice":16},{"color":8,"cells":[41,49]},{"color":8,"cells":[25,17]},{"color":8,"cells":[67,59,60],"outer":3},{"color":8,"cells":[44,43,51]},{"color":6,"cells":[69,61]},{"color":6,"cells":[45,53],"outer":3}],"gates":[{"cell":5,"out":[0,-1],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"cell":3,"out":[0,-1],"queue":[2,2,2,2,2,2,2,2,2,2,2]},{"cell":55,"out":[1,0],"queue":[8,8,8,8,8,8,8,2,2,8,8,8,8,8,8],"ice":9},{"cell":67,"out":[0,1],"queue":[3,3,3,3,3,3,3,3,3,3],"ice":14},{"cell":69,"out":[0,1],"queue":[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],"ice":17},{"cell":48,"out":[-1,0],"queue":[4,4,4,4,4,4,4,4,4,6,6,6,6,6,6,3,3],"ice":22}],"hide":[{"x":3,"y":4,"w":1,"h":1,"count":13,"grid":true},{"x":5,"y":4,"w":1,"h":1,"count":7,"grid":true},{"x":6,"y":6,"w":1,"h":1,"count":15,"grid":true},{"x":6,"y":2,"w":1,"h":1,"count":15,"grid":true},{"x":0,"y":4,"w":1,"h":1,"count":3,"grid":true},{"x":3,"y":5,"w":3,"h":4,"count":12,"grid":false},{"x":6,"y":0,"w":2,"h":9,"count":5,"grid":false},{"x":0,"y":0,"w":3,"h":9,"count":8,"grid":false}],"locks":[],"plan":[[0,0,0,0],[0,0,0,1],[1,0,0,2],[1,0,0,3],[1,0,0,4],[4,0,1,0],[4,0,1,1],[3,0,1,2],[3,0,1,3],[2,0,0,5],[2,0,0,6],[6,0,0,7],[6,0,0,8],[5,0,1,4],[5,0,1,5],[5,0,1,6],[7,0,0,9],[7,0,0,10],[7,0,0,11],[9,0,0,12],[9,0,0,13],[9,0,0,14],[9,0,0,15],[9,0,0,16],[9,0,0,17],[1,1,2,0],[1,1,2,1],[1,1,2,2],[14,0,2,3],[14,0,2,4],[10,0,1,7],[10,0,1,8],[10,0,1,9],[10,0,1,10],[13,0,2,5],[13,0,2,6],[10,0,2,7],[10,0,2,8],[15,0,2,9],[15,0,2,10],[15,0,2,11],[8,0,3,0],[8,0,3,1],[8,0,3,2],[8,0,3,3],[5,1,3,4],[5,1,3,5],[5,1,3,6],[15,1,3,7],[15,1,3,8],[15,1,3,9],[17,0,4,0],[17,0,4,1],[8,1,4,2],[8,1,4,3],[8,1,4,4],[8,1,4,5],[18,0,4,6],[18,0,4,7],[16,0,2,12],[16,0,2,13],[16,0,2,14],[10,1,4,8],[10,1,4,9],[10,1,4,10],[10,1,4,11],[10,1,4,12],[10,1,4,13],[6,1,5,0],[6,1,5,1],[9,1,4,14],[9,1,4,15],[9,1,4,16],[9,1,4,17],[7,1,5,2],[7,1,5,3],[7,1,5,4],[11,0,5,5],[11,0,5,6],[11,0,5,7],[11,0,5,8],[12,0,5,9],[12,0,5,10],[12,0,5,11],[12,0,5,12],[9,1,5,13],[9,1,5,14],[18,1,5,15],[18,1,5,16]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid"]},{"n":100,"w":8,"h":8,"time":120,"scale":1.149999976158142,"voids":[],"walls":[5,21,37],"cats":[{"color":8,"cells":[14,15]},{"color":8,"cells":[30,31]},{"color":8,"cells":[46,47]},{"color":0,"cells":[39,38]},{"color":0,"cells":[23,22]},{"color":0,"cells":[7,6]},{"color":2,"cells":[61,62,63]},{"color":1,"cells":[60,59]},{"color":1,"cells":[52,51]},{"color":4,"cells":[58,57,56]},{"color":6,"cells":[44,43]},{"color":1,"cells":[4,3,11,12]},{"color":2,"cells":[20,28,36],"outer":4},{"color":0,"cells":[35,27,19],"outer":4},{"color":6,"cells":[53,54,55],"ice":14},{"color":6,"cells":[50,49,48],"ice":14},{"color":5,"cells":[41,40,32,24],"outer":8},{"color":5,"cells":[1,2,10,18],"outer":8},{"color":8,"cells":[42,34,33],"outer":5},{"color":8,"cells":[0,8,9],"outer":5},{"color":0,"cells":[26,25,17,16]}],"gates":[{"cell":0,"out":[-1,0],"queue":[5,5,5,5,5,5,8,8,5,5,4,4],"ice":13},{"cell":7,"out":[1,0],"queue":[0,0,0,0,0,0,0,0,0,0,0,0,0]},{"cell":63,"out":[1,0],"queue":[2,2,2,2,2,2],"ice":3},{"cell":56,"out":[-1,0],"queue":[8,8,8,8,8,8,4,4,4,4,4,4,4,8,8,8,8,8,8,8,8,8,8,8,8],"ice":6},{"cell":60,"out":[0,1],"queue":[1,1,1,1,1,1,5,5,5,5,5,5,6,6,1,1],"ice":18},{"cell":3,"out":[0,-1],"queue":[6,6,6,6,6,6],"ice":15}],"hide":[{"x":5,"y":5,"w":1,"h":1,"count":4,"grid":true},{"x":5,"y":3,"w":1,"h":1,"count":4,"grid":true},{"x":5,"y":1,"w":1,"h":1,"count":4,"grid":true},{"x":0,"y":0,"w":3,"h":6,"count":11,"grid":false},{"x":0,"y":6,"w":8,"h":2,"count":3,"grid":false},{"x":3,"y":0,"w":2,"h":6,"count":3,"grid":false}],"locks":[],"plan":[[5,0,1,0],[5,0,1,1],[4,0,1,2],[4,0,1,3],[3,0,1,4],[3,0,1,5],[6,0,2,0],[6,0,2,1],[6,0,2,2],[13,0,1,6],[13,0,1,7],[13,0,1,8],[12,0,2,3],[12,0,2,4],[12,0,2,5],[2,0,3,0],[2,0,3,1],[0,0,3,2],[0,0,3,3],[1,0,3,4],[1,0,3,5],[9,0,3,6],[9,0,3,7],[9,0,3,8],[12,1,3,9],[12,1,3,10],[12,1,3,11],[13,1,3,12],[20,0,1,9],[20,0,1,10],[20,0,1,11],[20,0,1,12],[18,0,3,13],[18,0,3,14],[18,0,3,15],[17,0,0,0],[17,0,0,1],[17,0,0,2],[17,0,0,3],[16,0,0,4],[16,0,0,5],[19,0,0,6],[19,0,0,7],[16,0,0,8],[16,0,0,9],[10,0,5,0],[10,0,5,1],[13,1,0,10],[13,1,0,11],[14,0,5,2],[14,0,5,3],[14,0,5,4],[7,0,4,0],[7,0,4,1],[8,0,4,2],[8,0,4,3],[11,0,4,4],[11,0,4,5],[15,0,5,5],[16,1,3,16],[16,1,3,17],[16,1,3,18],[16,1,3,19],[17,1,3,20],[17,1,3,21],[17,1,3,22],[17,1,3,23],[19,0,3,24],[18,1,4,6],[18,1,4,7],[18,1,4,8],[19,1,4,9],[19,1,4,10],[19,1,4,11],[15,0,4,12],[15,0,4,13],[11,0,4,14],[11,0,4,15]],"mech":["walls","multiLayerGate","gateIce","catIce","nested","hideBox","hideGrid"]}]`),d=u.length,f=[`orange`,`cyan`,`green`,`purple`,`yellow`,`red`,`pink`,`black`,`white`,`turquoise`,`periwinkle`,`brown`];function p(e,t,n=Math.random){if(e<=d)return u[e-1];for(;;){let e=u[49+Math.floor(n()*(d-50+1))];if(e.n!==t)return e}}var m,h,g,_,v,y,b,x,S,C=1e3,w=1001,T=1002,E=1003,D=1004,O=1005,k=1006,A=1007,j=1008,M=1009,ee=1010,te=1011,ne=1012,N=1013,re=1014,ie=1015,ae=1016,oe=1017,se=1018,ce=1020,le=35902,P=35899,ue=1021,de=1022,fe=1023,pe=1026,me=1027,he=1028,ge=1029,_e=1030,ve=1031,ye=1033,be=33776,xe=33777,Se=33778,Ce=33779,we=35840,Te=35841,Ee=35842,De=35843,Oe=36196,ke=37492,Ae=37496,je=37488,Me=37489,Ne=37490,Pe=37491,F=37808,Fe=37809,Ie=37810,Le=37811,I=37812,Re=37813,L=37814,R=37815,ze=37816,Be=37817,Ve=37818,He=37819,Ue=37820,We=37821,Ge=36492,Ke=36494,qe=36495,Je=36283,Ye=36284,Xe=36285,Ze=36286,Qe=2300,$e=2301,et=2302,tt=2303,nt=2400,rt=2401,it=2402,at=3200,ot=`srgb`,st=`srgb-linear`,ct=`linear`,lt=`srgb`,ut=7680,dt=35044,ft=`300 es`,pt=2e3;function mt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function ht(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function gt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function _t(){let e=gt(`canvas`);return e.style.display=`block`,e}var vt={};function yt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function bt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function z(...e){e=bt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function B(...e){e=bt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function xt(...e){let t=e.join(` `);t in vt||(vt[t]=!0,z(...e))}function St(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Ct={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},wt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Tt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Et=Math.PI/180,Dt=180/Math.PI;function Ot(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Tt[e&255]+Tt[e>>8&255]+Tt[e>>16&255]+Tt[e>>24&255]+`-`+Tt[t&255]+Tt[t>>8&255]+`-`+Tt[t>>16&15|64]+Tt[t>>24&255]+`-`+Tt[n&63|128]+Tt[n>>8&255]+`-`+Tt[n>>16&255]+Tt[n>>24&255]+Tt[r&255]+Tt[r>>8&255]+Tt[r>>16&255]+Tt[r>>24&255]).toLowerCase()}function V(e,t,n){return Math.max(t,Math.min(n,e))}function kt(e,t){return(e%t+t)%t}function At(e,t,n){return(1-n)*e+n*t}function jt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Mt(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Nt(e,t){if(t.constructor===Float32Array)return e;let n=Mt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function Pt(e,t){if(t.constructor===Float32Array)return e;let n=Mt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}b=Symbol.iterator;var H=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[b](){yield this.x,yield this.y}};m=H,m.prototype.isVector2=!0;var Ft=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:z(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(V(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};x=Symbol.iterator;var U=class{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Lt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Lt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return It.copy(this).projectOnVector(e),this.sub(It)}reflect(e){return this.sub(It.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[x](){yield this.x,yield this.y,yield this.z}};h=U,h.prototype.isVector3=!0;var It=new U,Lt=new Ft,W=class{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return xt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Rt.makeScale(e,t)),this}rotate(e){return xt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Rt.makeRotation(-e)),this}translate(e,t){return xt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Rt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};g=W,g.prototype.isMatrix3=!0;var Rt=new W,zt=new W().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bt=new W().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vt(){let e={enabled:!0,workingColorSpace:st,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Ht(e.r),e.g=Ht(e.g),e.b=Ht(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Ut(e.r),e.g=Ut(e.g),e.b=Ut(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?ct:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[st]:{primaries:t,whitePoint:r,transfer:ct,toXYZ:zt,fromXYZ:Bt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ot},outputColorSpaceConfig:{drawingBufferColorSpace:ot}},[ot]:{primaries:t,whitePoint:r,transfer:lt,toXYZ:zt,fromXYZ:Bt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ot}}}),e}var G=Vt();function Ht(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Ut(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Wt,Gt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Wt===void 0&&(Wt=gt(`canvas`)),Wt.width=e.width,Wt.height=e.height;let t=Wt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Wt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=gt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Ht(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Ht(t[e]/255)*255):t[e]=Ht(t[e]);return{data:t,width:e.width,height:e.height}}return z(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Kt=0,qt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Kt++}),this.uuid=Ot(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Jt(r[t].image)):e.push(Jt(r[t]))}else e=Jt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Jt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Gt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(z(`Texture: Unable to serialize Texture.`),{})}var Yt=0,Xt=new U,Zt=class e extends wt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=w,i=w,a=k,o=j,s=fe,c=M,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yt++}),this.uuid=Ot(),this.name=``,this.source=new qt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new W,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Xt).x}get height(){return this.source.getSize(Xt).y}get depth(){return this.source.getSize(Xt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){z(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?z(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case C:e.x-=Math.floor(e.x);break;case w:e.x=e.x<0?0:1;break;case T:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case C:e.y-=Math.floor(e.y);break;case w:e.y=e.y<0?0:1;break;case T:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Zt.DEFAULT_IMAGE=null,Zt.DEFAULT_MAPPING=300,Zt.DEFAULT_ANISOTROPY=1,S=Symbol.iterator;var K=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this.w=V(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this.w=V(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[S](){yield this.x,yield this.y,yield this.z,yield this.w}};_=K,_.prototype.isVector4=!0;var Qt=class extends wt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:k,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new K(0,0,e,t),this.scissorTest=!1,this.viewport=new K(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new Zt({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:k,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new qt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},$t=class extends Qt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},en=class extends Zt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=E,this.minFilter=E,this.wrapR=w,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},tn=class extends Zt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=E,this.minFilter=E,this.wrapR=w,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},nn=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/rn.setFromMatrixColumn(e,0).length(),i=1/rn.setFromMatrixColumn(e,1).length(),a=1/rn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(on,e,sn)}lookAt(e,t,n){let r=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),cn.crossVectors(n,un),cn.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),cn.crossVectors(n,un)),cn.normalize(),ln.crossVectors(un,cn),r[0]=cn.x,r[4]=ln.x,r[8]=un.x,r[1]=cn.y,r[5]=ln.y,r[9]=un.y,r[2]=cn.z,r[6]=ln.z,r[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],ee=r[3],te=r[7],ne=r[11],N=r[15];return i[0]=a*x+o*T+s*k+c*ee,i[4]=a*S+o*E+s*A+c*te,i[8]=a*C+o*D+s*j+c*ne,i[12]=a*w+o*O+s*M+c*N,i[1]=l*x+u*T+d*k+f*ee,i[5]=l*S+u*E+d*A+f*te,i[9]=l*C+u*D+d*j+f*ne,i[13]=l*w+u*O+d*M+f*N,i[2]=p*x+m*T+h*k+g*ee,i[6]=p*S+m*E+h*A+g*te,i[10]=p*C+m*D+h*j+g*ne,i[14]=p*w+m*O+h*M+g*N,i[3]=_*x+v*T+y*k+b*ee,i[7]=_*S+v*E+y*A+b*te,i[11]=_*C+v*D+y*j+b*ne,i[15]=_*w+v*O+y*M+b*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=rn.set(r[0],r[1],r[2]).length(),o=rn.set(r[4],r[5],r[6]).length(),s=rn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),an.copy(this);let c=1/a,l=1/o,u=1/s;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=l,an.elements[5]*=l,an.elements[6]*=l,an.elements[8]*=u,an.elements[9]*=u,an.elements[10]*=u,t.setFromRotationMatrix(an),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=pt,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=pt,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};v=nn,v.prototype.isMatrix4=!0;var rn=new U,an=new nn,on=new U(0,0,0),sn=new U(1,1,1),cn=new U,ln=new U,un=new U,dn=new nn,fn=new Ft,pn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(V(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-V(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(V(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-V(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(V(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-V(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:z(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return dn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(dn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fn.setFromEuler(this),this.setFromQuaternion(fn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};pn.DEFAULT_ORDER=`XYZ`;var mn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},hn=0,gn=new U,_n=new Ft,vn=new nn,yn=new U,bn=new U,xn=new U,Sn=new Ft,Cn=new U(1,0,0),wn=new U(0,1,0),Tn=new U(0,0,1),En={type:`added`},Dn={type:`removed`},On={type:`childadded`,child:null},kn={type:`childremoved`,child:null},An=class e extends wt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hn++}),this.uuid=Ot(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new U,n=new pn,r=new Ft,i=new U(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new nn},normalMatrix:{value:new W}}),this.matrix=new nn,this.matrixWorld=new nn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _n.setFromAxisAngle(e,t),this.quaternion.multiply(_n),this}rotateOnWorldAxis(e,t){return _n.setFromAxisAngle(e,t),this.quaternion.premultiply(_n),this}rotateX(e){return this.rotateOnAxis(Cn,e)}rotateY(e){return this.rotateOnAxis(wn,e)}rotateZ(e){return this.rotateOnAxis(Tn,e)}translateOnAxis(e,t){return gn.copy(e).applyQuaternion(this.quaternion),this.position.add(gn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Cn,e)}translateY(e){return this.translateOnAxis(wn,e)}translateZ(e){return this.translateOnAxis(Tn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yn.copy(e):yn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),bn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(bn,yn,this.up):vn.lookAt(yn,bn,this.up),this.quaternion.setFromRotationMatrix(vn),r&&(vn.extractRotation(r.matrixWorld),_n.setFromRotationMatrix(vn),this.quaternion.premultiply(_n.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(B(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(En),On.child=e,this.dispatchEvent(On),On.child=null):B(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dn),kn.child=e,this.dispatchEvent(kn),kn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(En),On.child=e,this.dispatchEvent(On),On.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bn,e,xn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bn,Sn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};An.DEFAULT_UP=new U(0,1,0),An.DEFAULT_MATRIX_AUTO_UPDATE=!0,An.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var jn=class extends An{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Mn={type:`move`},Nn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Mn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new jn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Pn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fn={h:0,s:0,l:0},In={h:0,s:0,l:0};function Ln(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var q=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,G.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=G.workingColorSpace){return this.r=e,this.g=t,this.b=n,G.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=G.workingColorSpace){if(e=kt(e,1),t=V(t,0,1),n=V(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Ln(i,r,e+1/3),this.g=Ln(i,r,e),this.b=Ln(i,r,e-1/3)}return G.colorSpaceToWorking(this,r),this}setStyle(e,t=ot){function n(t){t!==void 0&&parseFloat(t)<1&&z(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:z(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);z(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ot){let n=Pn[e.toLowerCase()];return n===void 0?z(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ht(e.r),this.g=Ht(e.g),this.b=Ht(e.b),this}copyLinearToSRGB(e){return this.r=Ut(e.r),this.g=Ut(e.g),this.b=Ut(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ot){return G.workingToColorSpace(Rn.copy(this),e),Math.round(V(Rn.r*255,0,255))*65536+Math.round(V(Rn.g*255,0,255))*256+Math.round(V(Rn.b*255,0,255))}getHexString(e=ot){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=G.workingColorSpace){G.workingToColorSpace(Rn.copy(this),t);let n=Rn.r,r=Rn.g,i=Rn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=G.workingColorSpace){return G.workingToColorSpace(Rn.copy(this),t),e.r=Rn.r,e.g=Rn.g,e.b=Rn.b,e}getStyle(e=ot){G.workingToColorSpace(Rn.copy(this),e);let t=Rn.r,n=Rn.g,r=Rn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Fn),this.setHSL(Fn.h+e,Fn.s+t,Fn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Fn),e.getHSL(In);let n=At(Fn.h,In.h,t),r=At(Fn.s,In.s,t),i=At(Fn.l,In.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Rn=new q;q.NAMES=Pn;var zn=class extends An{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pn,this.environmentIntensity=1,this.environmentRotation=new pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Bn=new U,Vn=new U,Hn=new U,Un=new U,Wn=new U,Gn=new U,Kn=new U,qn=new U,Jn=new U,Yn=new U,Xn=new K,Zn=new K,Qn=new K,$n=class e{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Bn.subVectors(e,t),r.cross(Bn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Bn.subVectors(r,t),Vn.subVectors(n,t),Hn.subVectors(e,t);let a=Bn.dot(Bn),o=Bn.dot(Vn),s=Bn.dot(Hn),c=Vn.dot(Vn),l=Vn.dot(Hn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Un)!==null&&Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Un)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Un.x),s.addScaledVector(a,Un.y),s.addScaledVector(o,Un.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Xn.setScalar(0),Zn.setScalar(0),Qn.setScalar(0),Xn.fromBufferAttribute(e,t),Zn.fromBufferAttribute(e,n),Qn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Xn,i.x),a.addScaledVector(Zn,i.y),a.addScaledVector(Qn,i.z),a}static isFrontFacing(e,t,n,r){return Bn.subVectors(n,t),Vn.subVectors(e,t),Bn.cross(Vn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),Bn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Wn.subVectors(r,n),Gn.subVectors(i,n),qn.subVectors(e,n);let s=Wn.dot(qn),c=Gn.dot(qn);if(s<=0&&c<=0)return t.copy(n);Jn.subVectors(e,r);let l=Wn.dot(Jn),u=Gn.dot(Jn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(Wn,a);Yn.subVectors(e,i);let f=Wn.dot(Yn),p=Gn.dot(Yn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Gn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Kn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Kn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Wn,a).addScaledVector(Gn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},er=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=nr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,nr):nr.fromBufferAttribute(r,t),nr.applyMatrix4(e.matrixWorld),this.expandByPoint(nr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),rr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),rr.copy(e.boundingBox)),rr.applyMatrix4(e.matrixWorld),this.union(rr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nr),nr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ur),dr.subVectors(this.max,ur),ir.subVectors(e.a,ur),ar.subVectors(e.b,ur),or.subVectors(e.c,ur),sr.subVectors(ar,ir),cr.subVectors(or,ar),lr.subVectors(ir,or);let t=[0,-sr.z,sr.y,0,-cr.z,cr.y,0,-lr.z,lr.y,sr.z,0,-sr.x,cr.z,0,-cr.x,lr.z,0,-lr.x,-sr.y,sr.x,0,-cr.y,cr.x,0,-lr.y,lr.x,0];return!mr(t,ir,ar,or,dr)||(t=[1,0,0,0,1,0,0,0,1],!mr(t,ir,ar,or,dr))?!1:(fr.crossVectors(sr,cr),t=[fr.x,fr.y,fr.z],mr(t,ir,ar,or,dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(tr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),tr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),tr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),tr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),tr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),tr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),tr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),tr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(tr)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},tr=[new U,new U,new U,new U,new U,new U,new U,new U],nr=new U,rr=new er,ir=new U,ar=new U,or=new U,sr=new U,cr=new U,lr=new U,ur=new U,dr=new U,fr=new U,pr=new U;function mr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){pr.fromArray(e,a);let o=i.x*Math.abs(pr.x)+i.y*Math.abs(pr.y)+i.z*Math.abs(pr.z),s=t.dot(pr),c=n.dot(pr),l=r.dot(pr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var hr=gr();function gr(){let e=new ArrayBuffer(4),t=new Float32Array(e),n=new Uint32Array(e),r=new Uint32Array(512),i=new Uint32Array(512);for(let e=0;e<256;++e){let t=e-127;t<-27?(r[e]=0,r[e|256]=32768,i[e]=24,i[e|256]=24):t<-14?(r[e]=1024>>-t-14,r[e|256]=1024>>-t-14|32768,i[e]=-t-1,i[e|256]=-t-1):t<=15?(r[e]=t+15<<10,r[e|256]=t+15<<10|32768,i[e]=13,i[e|256]=13):t<128?(r[e]=31744,r[e|256]=64512,i[e]=24,i[e|256]=24):(r[e]=31744,r[e|256]=64512,i[e]=13,i[e|256]=13)}let a=new Uint32Array(2048),o=new Uint32Array(64),s=new Uint32Array(64);for(let e=1;e<1024;++e){let t=e<<13,n=0;for(;!(t&8388608);)t<<=1,n-=8388608;t&=-8388609,n+=947912704,a[e]=t|n}for(let e=1024;e<2048;++e)a[e]=939524096+(e-1024<<13);for(let e=1;e<31;++e)o[e]=e<<23;o[31]=1199570944,o[32]=2147483648;for(let e=33;e<63;++e)o[e]=2147483648+(e-32<<23);o[63]=3347054592;for(let e=1;e<64;++e)e!==32&&(s[e]=1024);return{floatView:t,uint32View:n,baseTable:r,shiftTable:i,mantissaTable:a,exponentTable:o,offsetTable:s}}function _r(e){Math.abs(e)>65504&&z(`DataUtils.toHalfFloat(): Value out of range.`),e=V(e,-65504,65504),hr.floatView[0]=e;let t=hr.uint32View[0],n=t>>23&511;return hr.baseTable[n]+((t&8388607)>>hr.shiftTable[n])}function vr(e){let t=e>>10;return hr.uint32View[0]=hr.mantissaTable[hr.offsetTable[t]+(e&1023)]+hr.exponentTable[t],hr.floatView[0]}var yr=class{static toHalfFloat(e){return _r(e)}static fromHalfFloat(e){return vr(e)}},br=new U,xr=new H,Sr=0,Cr=class extends wt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=dt,this.updateRanges=[],this.gpuType=ie,this.version=0,this._normalizationScale=e===void 0?void 0:Mt(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)xr.fromBufferAttribute(this,t),xr.applyMatrix3(e),this.setXY(t,xr.x,xr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix3(e),this.setXYZ(t,br.x,br.y,br.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix4(e),this.setXYZ(t,br.x,br.y,br.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyNormalMatrix(e),this.setXYZ(t,br.x,br.y,br.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.transformDirection(e),this.setXYZ(t,br.x,br.y,br.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?Nt(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Pt(e,this.array):Math.round(e*t)}},wr=class extends Cr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Tr=class extends Cr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Er=class extends Cr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Dr=new er,Or=new U,kr=new U,Ar=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Dr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Or.subVectors(e,this.center);let t=Or.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Or,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(kr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Or.copy(e.center).add(kr)),this.expandByPoint(Or.copy(e.center).sub(kr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},jr=0,Mr=new nn,Nr=new An,Pr=new U,Fr=new er,Ir=new er,Lr=new U,Rr=class e extends wt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jr++}),this.uuid=Ot(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(mt(e)?Tr:wr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new W().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Mr.makeRotationFromQuaternion(e),this.applyMatrix4(Mr),this}rotateX(e){return Mr.makeRotationX(e),this.applyMatrix4(Mr),this}rotateY(e){return Mr.makeRotationY(e),this.applyMatrix4(Mr),this}rotateZ(e){return Mr.makeRotationZ(e),this.applyMatrix4(Mr),this}translate(e,t,n){return Mr.makeTranslation(e,t,n),this.applyMatrix4(Mr),this}scale(e,t,n){return Mr.makeScale(e,t,n),this.applyMatrix4(Mr),this}lookAt(e){return Nr.lookAt(e),Nr.updateMatrix(),this.applyMatrix4(Nr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pr).negate(),this.translate(Pr.x,Pr.y,Pr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Er(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&z(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new er);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)B(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Fr.setFromBufferAttribute(n),this.morphTargetsRelative?(Lr.addVectors(this.boundingBox.min,Fr.min),this.boundingBox.expandByPoint(Lr),Lr.addVectors(this.boundingBox.max,Fr.max),this.boundingBox.expandByPoint(Lr)):(this.boundingBox.expandByPoint(Fr.min),this.boundingBox.expandByPoint(Fr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&B(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ar);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)B(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new U,1/0);else if(e){let n=this.boundingSphere.center;if(Fr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ir.setFromBufferAttribute(n),this.morphTargetsRelative?(Lr.addVectors(Fr.min,Ir.min),Fr.expandByPoint(Lr),Lr.addVectors(Fr.max,Ir.max),Fr.expandByPoint(Lr)):(Fr.expandByPoint(Ir.min),Fr.expandByPoint(Ir.max))}Fr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Lr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Lr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Lr.fromBufferAttribute(a,t),o&&(Pr.fromBufferAttribute(e,t),Lr.add(Pr)),r=Math.max(r,n.distanceToSquared(Lr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&B(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){B(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Cr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new U,s[e]=new U;let l=new U,u=new U,d=new U,f=new H,p=new H,m=new H,h=new U,g=new U;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new U,b=new U,x=new U,S=new U;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Cr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new U,i=new U,a=new U,o=new U,s=new U,c=new U,l=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lr.fromBufferAttribute(e,t),Lr.normalize(),e.setXYZ(t,Lr.x,Lr.y,Lr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Cr(a,r,i)}if(this.index===null)return z(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},zr=new U,Br=new U,Vr=new W,Hr=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=zr.subVectors(n,t).cross(Br.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(zr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Vr.getNormalMatrix(e),r=this.coplanarPoint(zr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ur=0,Wr=class extends wt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ur++}),this.uuid=Ot(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new q(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ut,this.stencilZFail=ut,this.stencilZPass=ut,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){z(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?z(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new q().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Hr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new H().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new H().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Gr=new U,Kr=new U,qr=new U,Jr=new U,Yr=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Gr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gr.copy(this.origin).addScaledVector(this.direction,t),Gr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Kr.copy(e).add(t).multiplyScalar(.5),qr.copy(t).sub(e).normalize(),Jr.copy(this.origin).sub(Kr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(qr),o=Jr.dot(this.direction),s=-Jr.dot(qr),c=Jr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Kr).addScaledVector(qr,d),f}intersectSphere(e,t){if(e.radius<0)return null;Gr.subVectors(e.center,this.origin);let n=Gr.dot(this.direction),r=Gr.dot(Gr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Gr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,ee;if(y>=b&&y>=x?(w=s,D=u,A=p,ee=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,ee=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,ee=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let te=S/w,ne=C/w,N=1/w,re=T-te*D,ie=E-ne*D,ae=O-te*A,oe=k-ne*A,se=j-te*ee,ce=M-ne*ee,le=se*oe-ce*ae,P=re*ce-ie*se,ue=ae*ie-oe*re;if(r){if(le<0||P<0||ue<0)return null}else if((le<0||P<0||ue<0)&&(le>0||P>0||ue>0))return null;let de=le+P+ue;if(de===0)return null;let fe=N*(le*D+P*A+ue*ee);return(de>0?fe<0:fe>0)?null:this.at(fe/de,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Xr=class extends Wr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Zr=new nn,Qr=new Yr,$r=new Ar,ei=new U,ti=new U,ni=new U,ri=new U,ii=new U,ai=new U,oi=new U,si=new U,J=class extends An{constructor(e=new Rr,t=new Xr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){ai.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(ii.fromBufferAttribute(s,e),a?ai.addScaledVector(ii,r):ai.addScaledVector(ii.sub(t),r))}t.add(ai)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(i),Qr.copy(e.ray).recast(e.near),$r.containsPoint(Qr.origin)===!1&&(Qr.intersectSphere($r,ei)===null||Qr.origin.distanceToSquared(ei)>(e.far-e.near)**2)||(Zr.copy(i).invert(),Qr.copy(e.ray).applyMatrix4(Zr),(n.boundingBox===null||Qr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Qr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=li(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=li(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=li(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=li(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function ci(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;si.copy(s),si.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(si);return l<n.near||l>n.far?null:{distance:l,point:si.clone(),object:e}}function li(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,ti),e.getVertexPosition(c,ni),e.getVertexPosition(l,ri);let u=ci(e,t,n,r,ti,ni,ri,oi);if(u){let e=new U;$n.getBarycoord(oi,ti,ni,ri,e),i&&(u.uv=$n.getInterpolatedAttribute(i,s,c,l,e,new H)),a&&(u.uv1=$n.getInterpolatedAttribute(a,s,c,l,e,new H)),o&&(u.normal=$n.getInterpolatedAttribute(o,s,c,l,e,new U),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new U,materialIndex:0};$n.getNormal(ti,ni,ri,t.normal),u.face=t,u.barycoord=e}return u}var ui=class extends Zt{constructor(e=null,t=1,n=1,r,i,a,o,s,c=E,l=E,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},di=new Ar,fi=new H(.5,.5),pi=new U,mi=class{constructor(e=new Hr,t=new Hr,n=new Hr,r=new Hr,i=new Hr,a=new Hr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=pt,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(di)}intersectsSprite(e){return di.center.set(0,0,0),di.radius=.7071067811865476+fi.distanceTo(e.center),di.applyMatrix4(e.matrixWorld),this.intersectsSphere(di)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(pi.x=r.normal.x>0?e.max.x:e.min.x,pi.y=r.normal.y>0?e.max.y:e.min.y,pi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(pi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},hi=new nn,gi=class e{constructor(){this.coordinateSystem=pt,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];hi.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new mi),n[e].setFromProjectionMatrix(hi,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new mi),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},_i=class extends Wr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new q(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},vi=new nn,yi=new Yr,bi=new Ar,xi=new U,Si=class extends An{constructor(e=new Rr,t=new _i){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),bi.copy(n.boundingSphere),bi.applyMatrix4(r),bi.radius+=i,e.ray.intersectsSphere(bi)===!1)return;vi.copy(r).invert(),yi.copy(e.ray).applyMatrix4(vi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);xi.fromBufferAttribute(l,n),Ci(xi,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)xi.fromBufferAttribute(l,a),Ci(xi,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Ci(e,t,n,r,i,a,o){let s=yi.distanceSqToPoint(e);if(s<n){let n=new U;yi.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var wi=class extends Zt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ti=class extends Zt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ei=class extends Zt{constructor(e,t,n=re,r,i,a,o=E,s=E,c,l=pe,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new qt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Di=class extends Ei{constructor(e,t=re,n=301,r,i,a=E,o=E,s,c=pe){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Oi=class extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ki=class e extends Rr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Er(c,3)),this.setAttribute(`normal`,new Er(l,3)),this.setAttribute(`uv`,new Er(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new U;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ai=class e extends Rr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Er(p,3)),this.setAttribute(`normal`,new Er(m,3)),this.setAttribute(`uv`,new Er(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function ji(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Ni(i))i.isRenderTargetTexture?(z(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Ni(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Mi(e){let t={};for(let n=0;n<e.length;n++){let r=ji(e[n]);for(let e in r)t[e]=r[e]}return t}function Ni(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Pi(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Fi(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:G.workingColorSpace}var Ii={clone:ji,merge:Mi},Li=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ri=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,zi=class extends Wr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Li,this.fragmentShader=Ri,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ji(e.uniforms),this.uniformsGroups=Pi(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new q().setHex(r.value);break;case`v2`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new K().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new nn().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Bi=class extends zi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Vi=class extends Wr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=at,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Hi=class extends Wr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ui(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Wi(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Gi=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Ki=class extends Gi{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:nt,endingEnd:nt}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case rt:i=e,o=2*t-n;break;case it:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case rt:a=e,s=2*n-t;break;case it:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},qi=class extends Gi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Ji=class extends Gi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Yi=class extends Gi{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Qi(n,t,g,y,r);i[p]=Xi(x,o,_,b,m)}return i}};function Xi(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Zi(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Qi(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Xi(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Zi(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var $i=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Ui(t,this.TimeBufferType),this.values=Ui(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ui(e.times,Array),values:Ui(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Wi(e.settings)&&(n.settings={inTangents:Ui(e.settings.inTangents,Array),outTangents:Ui(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ji(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new qi(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ki(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Yi(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Qe:t=this.InterpolantFactoryMethodDiscrete;break;case $e:t=this.InterpolantFactoryMethodLinear;break;case et:t=this.InterpolantFactoryMethodSmooth;break;case tt:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return z(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Qe;case this.InterpolantFactoryMethodLinear:return $e;case this.InterpolantFactoryMethodSmooth:return et;case this.InterpolantFactoryMethodBezier:return tt}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;Wi(this.settings)&&(ea(this.settings.inTangents,e),ea(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Wi(this.settings)&&(ta(this.settings.inTangents,e),ta(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(B(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(B(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){B(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){B(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&ht(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){B(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===et,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Wi(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function ea(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function ta(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}$i.prototype.ValueTypeName=``,$i.prototype.TimeBufferType=Float32Array,$i.prototype.ValueBufferType=Float32Array,$i.prototype.DefaultInterpolation=$e;var na=class extends $i{constructor(e,t,n){super(e,t,n)}};na.prototype.ValueTypeName=`bool`,na.prototype.ValueBufferType=Array,na.prototype.DefaultInterpolation=Qe,na.prototype.InterpolantFactoryMethodLinear=void 0,na.prototype.InterpolantFactoryMethodSmooth=void 0;var ra=class extends $i{constructor(e,t,n,r){super(e,t,n,r)}};ra.prototype.ValueTypeName=`color`;var ia=class extends $i{constructor(e,t,n,r){super(e,t,n,r)}};ia.prototype.ValueTypeName=`number`;var aa=class extends Gi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Ft.slerpFlat(i,0,a,c-o,a,c,s);return i}},oa=class extends $i{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new aa(this.times,this.values,this.getValueSize(),e)}};oa.prototype.ValueTypeName=`quaternion`,oa.prototype.InterpolantFactoryMethodSmooth=void 0;var sa=class extends $i{constructor(e,t,n){super(e,t,n)}};sa.prototype.ValueTypeName=`string`,sa.prototype.ValueBufferType=Array,sa.prototype.DefaultInterpolation=Qe,sa.prototype.InterpolantFactoryMethodLinear=void 0,sa.prototype.InterpolantFactoryMethodSmooth=void 0;var ca=class extends $i{constructor(e,t,n,r){super(e,t,n,r)}};ca.prototype.ValueTypeName=`vector`;var la={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(ua(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!ua(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function ua(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var da=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},fa=class{constructor(e){this.manager=e===void 0?da:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},this.priority=`auto`,this.cache=`default`,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};fa.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var pa=new WeakMap,ma=class extends fa{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=la.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=pa.get(a);e===void 0&&(e=[],pa.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=gt(`img`);function s(){l(),t&&t(this);let n=pa.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}pa.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),la.remove(`image:${e}`);let n=pa.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}pa.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),la.add(`image:${e}`,o),i.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}},ha=class extends fa{constructor(e){super(e)}load(e,t,n,r){let i=new Zt,a=new ma(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},ga=new U,_a=new Ft,va=new U,ya=class extends An{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new nn,this.projectionMatrix=new nn,this.projectionMatrixInverse=new nn,this.coordinateSystem=pt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ga,_a,va),va.x===1&&va.y===1&&va.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,_a,va.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ga,_a,va),va.x===1&&va.y===1&&va.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,_a,va.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ba=new U,xa=new H,Sa=new H,Ca=class extends ya{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Dt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Et*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Dt*2*Math.atan(Math.tan(Et*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ba.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ba.x,ba.y).multiplyScalar(-e/ba.z),ba.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ba.x,ba.y).multiplyScalar(-e/ba.z)}getViewSize(e,t){return this.getViewBounds(e,xa,Sa),t.subVectors(Sa,xa)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Et*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},wa=class extends ya{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ta=-90,Ea=1,Da=class extends An{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ca(Ta,Ea,e,t);r.layers=this.layers,this.add(r);let i=new Ca(Ta,Ea,e,t);i.layers=this.layers,this.add(i);let a=new Ca(Ta,Ea,e,t);a.layers=this.layers,this.add(a);let o=new Ca(Ta,Ea,e,t);o.layers=this.layers,this.add(o);let s=new Ca(Ta,Ea,e,t);s.layers=this.layers,this.add(s);let c=new Ca(Ta,Ea,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Oa=class extends Ca{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},ka=`\\[\\]\\.:\\/`,Aa=RegExp(`[\\[\\]\\.:\\/]`,`g`),ja=`[^\\[\\]\\.:\\/]`,Ma=`[^`+ka.replace(`\\.`,``)+`]`,Na=`((?:WC+[\\/:])*)`.replace(`WC`,ja),Pa=`(WCOD+)?`.replace(`WCOD`,Ma),Fa=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,ja),Ia=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,ja),La=RegExp(`^`+Na+Pa+Fa+Ia+`$`),Ra=[`material`,`materials`,`bones`,`map`],za=class{constructor(e,t,n){let r=n||Ba.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ba=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Aa,``)}static parseTrackName(e){let t=La.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Ra.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){z(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){B(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){B(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){B(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){B(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){B(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;B(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ba.Composite=za,Ba.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ba.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ba.prototype.GetterByBindingType=[Ba.prototype._getValue_direct,Ba.prototype._getValue_array,Ba.prototype._getValue_arrayElement,Ba.prototype._getValue_toArray],Ba.prototype.SetterByBindingTypeAndVersioning=[[Ba.prototype._setValue_direct,Ba.prototype._setValue_direct_setNeedsUpdate,Ba.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ba.prototype._setValue_array,Ba.prototype._setValue_array_setNeedsUpdate,Ba.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ba.prototype._setValue_arrayElement,Ba.prototype._setValue_arrayElement_setNeedsUpdate,Ba.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ba.prototype._setValue_fromArray,Ba.prototype._setValue_fromArray_setNeedsUpdate,Ba.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],y=class{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},y.prototype.isMatrix2=!0;function Va(e,t,n,r){let i=Ha(r);switch(n){case ue:return e*t;case he:return e*t/i.components*i.byteLength;case ge:return e*t/i.components*i.byteLength;case _e:return e*t*2/i.components*i.byteLength;case ve:return e*t*2/i.components*i.byteLength;case de:return e*t*3/i.components*i.byteLength;case fe:return e*t*4/i.components*i.byteLength;case ye:return e*t*4/i.components*i.byteLength;case be:case xe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Se:case Ce:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Te:case De:return Math.max(e,16)*Math.max(t,8)/4;case we:case Ee:return Math.max(e,8)*Math.max(t,8)/2;case Oe:case ke:case je:case Me:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ae:case Ne:case Pe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case F:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Fe:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Ie:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Le:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case I:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Re:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case L:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case R:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ze:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Be:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ve:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case He:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ue:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case We:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ge:case Ke:case qe:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Je:case Ye:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Xe:case Ze:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Ha(e){switch(e){case M:case ee:return{byteLength:1,components:1};case ne:case te:case ae:return{byteLength:2,components:1};case oe:case se:return{byteLength:2,components:4};case re:case N:case ie:return{byteLength:4,components:1};case le:case P:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?z(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function Ua(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Wa(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Y={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},X={common:{diffuse:{value:new q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new W}},envmap:{envMap:{value:null},envMapRotation:{value:new W},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new W}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new W}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new W},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new W},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new W},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new W}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new W}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new W}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0},uvTransform:{value:new W}},sprite:{diffuse:{value:new q(16777215)},opacity:{value:1},center:{value:new H(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}}},Ga={basic:{uniforms:Mi([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:Y.meshbasic_vert,fragmentShader:Y.meshbasic_frag},lambert:{uniforms:Mi([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new q(0)},envMapIntensity:{value:1}}]),vertexShader:Y.meshlambert_vert,fragmentShader:Y.meshlambert_frag},phong:{uniforms:Mi([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new q(0)},specular:{value:new q(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Y.meshphong_vert,fragmentShader:Y.meshphong_frag},standard:{uniforms:Mi([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag},toon:{uniforms:Mi([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new q(0)}}]),vertexShader:Y.meshtoon_vert,fragmentShader:Y.meshtoon_frag},matcap:{uniforms:Mi([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:Y.meshmatcap_vert,fragmentShader:Y.meshmatcap_frag},points:{uniforms:Mi([X.points,X.fog]),vertexShader:Y.points_vert,fragmentShader:Y.points_frag},dashed:{uniforms:Mi([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Y.linedashed_vert,fragmentShader:Y.linedashed_frag},depth:{uniforms:Mi([X.common,X.displacementmap]),vertexShader:Y.depth_vert,fragmentShader:Y.depth_frag},normal:{uniforms:Mi([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:Y.meshnormal_vert,fragmentShader:Y.meshnormal_frag},sprite:{uniforms:Mi([X.sprite,X.fog]),vertexShader:Y.sprite_vert,fragmentShader:Y.sprite_frag},background:{uniforms:{uvTransform:{value:new W},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Y.background_vert,fragmentShader:Y.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new W}},vertexShader:Y.backgroundCube_vert,fragmentShader:Y.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Y.cube_vert,fragmentShader:Y.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Y.equirect_vert,fragmentShader:Y.equirect_frag},distance:{uniforms:Mi([X.common,X.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Y.distance_vert,fragmentShader:Y.distance_frag},shadow:{uniforms:Mi([X.lights,X.fog,{color:{value:new q(0)},opacity:{value:1}}]),vertexShader:Y.shadow_vert,fragmentShader:Y.shadow_frag}};Ga.physical={uniforms:Mi([Ga.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new W},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new W},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new W},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new W},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new W},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new W},sheen:{value:0},sheenColor:{value:new q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new W},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new W},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new W},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new W},attenuationDistance:{value:0},attenuationColor:{value:new q(0)},specularColor:{value:new q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new W},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new W},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new W}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag};var Ka={r:0,b:0,g:0},qa=new nn,Ja=new W;Ja.set(-1,0,0,0,1,0,0,0,1);function Ya(e,t,n,r,i,a){let o=new q(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new J(new ki(1,1,1),new zi({name:`BackgroundCubeMaterial`,uniforms:ji(Ga.backgroundCube.uniforms),vertexShader:Ga.backgroundCube.vertexShader,fragmentShader:Ga.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(qa.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ja),l.material.toneMapped=G.getTransfer(i.colorSpace)!==lt,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new J(new Ai(2,2),new zi({name:`BackgroundMaterial`,uniforms:ji(Ga.background.uniforms),vertexShader:Ga.background.vertexShader,fragmentShader:Ga.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=G.getTransfer(i.colorSpace)!==lt,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Ka,Fi(e)),n.buffers.color.setClear(Ka.r,Ka.g,Ka.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Xa(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Za(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Qa(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(z(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&z(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&z(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function $a(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Hr,s=new W,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var eo=class extends $t{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new wi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ki(5,5,5),i=new zi({name:`CubemapFromEquirect`,uniforms:ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new J(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=k),new Da(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},to=256,no=3,ro=20,io=256,ao=16,oo=3,so=new U,co=new q,lo=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Da(1,10,null),this._boxMesh=new J(new ki(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=so}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(co));let h=new Da(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_o(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=go(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(to,jt(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?to:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=uo(e,!1,!1),n=Math.log2(e)-no;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=uo(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=_o()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=go()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=po(),this._integrationMaterial=mo());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/ao);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-oo)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(io*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=ho());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function uo(e,t,n){return new eo(e,{minFilter:j,generateMipmaps:t,type:ae,colorSpace:st,depthBuffer:n})}function fo(e,t,n){return new zi({name:e,uniforms:t,vertexShader:Y.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function po(){return fo(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${io}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function mo(){return fo(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:ao}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function ho(){return fo(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${ro}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function go(){return fo(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function _o(){return fo(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function vo(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new eo(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new lo(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new lo(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function yo(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&xt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function bo(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?Tr:wr)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function xo(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function So(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:B(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Co(e,t,n){let r=new WeakMap,i=new K;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new en(h,p,m,u);g.type=ie,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new H(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function wo(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var To={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Eo(e,t,n,r,i,a){let o=new $t(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new Rr;u.setAttribute(`position`,new Er([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new Er([0,2,0,0,2,0],2));let d=new Bi({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new J(u,d),p=new wa(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new $t(t,n,{type:ae,depthBuffer:!1,stencilBuffer:!1}),c=new $t(t,n,{type:ae,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new Ei(t,n),a===!0&&(l.format=me,l.type=ce)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},G.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=To[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var Do=new Zt,Oo=new Ei(1,1),ko=new Di(1),Ao=new en,jo=new tn,Mo=new wi,No=[],Po=[],Fo=new Float32Array(16),Io=new Float32Array(9),Lo=new Float32Array(4);function Ro(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=No[i];if(a===void 0&&(a=new Float32Array(i),No[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function zo(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Bo(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Vo(e,t){let n=Po[t];n===void 0&&(n=new Int32Array(t),Po[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Ho(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Uo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(zo(n,t))return;e.uniform2fv(this.addr,t),Bo(n,t)}}function Wo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(zo(n,t))return;e.uniform3fv(this.addr,t),Bo(n,t)}}function Go(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(zo(n,t))return;e.uniform4fv(this.addr,t),Bo(n,t)}}function Ko(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(zo(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Bo(n,t)}else{if(zo(n,r))return;Lo.set(r),e.uniformMatrix2fv(this.addr,!1,Lo),Bo(n,r)}}function qo(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(zo(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Bo(n,t)}else{if(zo(n,r))return;Io.set(r),e.uniformMatrix3fv(this.addr,!1,Io),Bo(n,r)}}function Jo(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(zo(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Bo(n,t)}else{if(zo(n,r))return;Fo.set(r),e.uniformMatrix4fv(this.addr,!1,Fo),Bo(n,r)}}function Yo(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Xo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(zo(n,t))return;e.uniform2iv(this.addr,t),Bo(n,t)}}function Zo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(zo(n,t))return;e.uniform3iv(this.addr,t),Bo(n,t)}}function Qo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(zo(n,t))return;e.uniform4iv(this.addr,t),Bo(n,t)}}function $o(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function es(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(zo(n,t))return;e.uniform2uiv(this.addr,t),Bo(n,t)}}function ts(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(zo(n,t))return;e.uniform3uiv(this.addr,t),Bo(n,t)}}function ns(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(zo(n,t))return;e.uniform4uiv(this.addr,t),Bo(n,t)}}function rs(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function is(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?rs(Oo):Do,n.setTexture2D(t||a,i)}function as(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||jo,i)}function os(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?rs(ko):Mo,n.setTextureCube(t||a,i)}function ss(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Ao,i)}function cs(e){switch(e){case 5126:return Ho;case 35664:return Uo;case 35665:return Wo;case 35666:return Go;case 35674:return Ko;case 35675:return qo;case 35676:return Jo;case 5124:case 35670:return Yo;case 35667:case 35671:return Xo;case 35668:case 35672:return Zo;case 35669:case 35673:return Qo;case 5125:return $o;case 36294:return es;case 36295:return ts;case 36296:return ns;case 35678:case 36198:case 36298:case 36306:case 35682:return is;case 35679:case 36299:case 36307:return as;case 35680:case 36300:case 36308:case 36293:return os;case 36289:case 36303:case 36311:case 36292:return ss}}function ls(e,t){e.uniform1fv(this.addr,t)}function us(e,t){let n=Ro(t,this.size,2);e.uniform2fv(this.addr,n)}function ds(e,t){let n=Ro(t,this.size,3);e.uniform3fv(this.addr,n)}function fs(e,t){let n=Ro(t,this.size,4);e.uniform4fv(this.addr,n)}function ps(e,t){let n=Ro(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ms(e,t){let n=Ro(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function hs(e,t){let n=Ro(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function gs(e,t){e.uniform1iv(this.addr,t)}function _s(e,t){e.uniform2iv(this.addr,t)}function vs(e,t){e.uniform3iv(this.addr,t)}function ys(e,t){e.uniform4iv(this.addr,t)}function bs(e,t){e.uniform1uiv(this.addr,t)}function xs(e,t){e.uniform2uiv(this.addr,t)}function Ss(e,t){e.uniform3uiv(this.addr,t)}function Cs(e,t){e.uniform4uiv(this.addr,t)}function ws(e,t,n){let r=this.cache,i=t.length,a=Vo(n,i);zo(r,a)||(e.uniform1iv(this.addr,a),Bo(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?rs(Oo):Do;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Ts(e,t,n){let r=this.cache,i=t.length,a=Vo(n,i);zo(r,a)||(e.uniform1iv(this.addr,a),Bo(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||jo,a[e])}function Es(e,t,n){let r=this.cache,i=t.length,a=Vo(n,i);zo(r,a)||(e.uniform1iv(this.addr,a),Bo(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?rs(ko):Mo;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function Ds(e,t,n){let r=this.cache,i=t.length,a=Vo(n,i);zo(r,a)||(e.uniform1iv(this.addr,a),Bo(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Ao,a[e])}function Os(e){switch(e){case 5126:return ls;case 35664:return us;case 35665:return ds;case 35666:return fs;case 35674:return ps;case 35675:return ms;case 35676:return hs;case 5124:case 35670:return gs;case 35667:case 35671:return _s;case 35668:case 35672:return vs;case 35669:case 35673:return ys;case 5125:return bs;case 36294:return xs;case 36295:return Ss;case 36296:return Cs;case 35678:case 36198:case 36298:case 36306:case 35682:return ws;case 35679:case 36299:case 36307:return Ts;case 35680:case 36300:case 36308:case 36293:return Es;case 36289:case 36303:case 36311:case 36292:return Ds}}var ks=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=cs(t.type)}},As=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Os(t.type)}},js=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Ms=/(\w+)(\])?(\[|\.)?/g;function Ns(e,t){e.seq.push(t),e.map[t.id]=t}function Ps(e,t,n){let r=e.name,i=r.length;for(Ms.lastIndex=0;;){let a=Ms.exec(r),o=Ms.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Ns(n,l===void 0?new ks(s,e,t):new As(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new js(s),Ns(n,e)),n=e}}}var Fs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Ps(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Is(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Ls=37297,Rs=0;function zs(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Bs=new W;function Vs(e){G._getMatrix(Bs,G.workingColorSpace,e);let t=`mat3( ${Bs.elements.map(e=>e.toFixed(4))} )`;switch(G.getTransfer(e)){case ct:return[t,`LinearTransferOETF`];case lt:return[t,`sRGBTransferOETF`];default:return z(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Hs(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+zs(e.getShaderSource(t),r)}return i}function Us(e,t){let n=Vs(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Ws={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Gs(e,t){let n=Ws[t];return n===void 0?(z(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Ks=new U;function qs(){return G.getLuminanceCoefficients(Ks),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Ks.x.toFixed(4)}, ${Ks.y.toFixed(4)}, ${Ks.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Js(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Zs).join(`
`)}function Ys(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Xs(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Zs(e){return e!==``}function Qs(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function $s(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ec=/^[ \t]*#include +<([\w\d./]+)>/gm;function tc(e){return e.replace(ec,nc)}function nc(e,t){let n=Y[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return tc(n)}var rc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ic(e){return e.replace(rc,ac)}function ac(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function oc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var sc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function cc(e){return sc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var lc={302:`ENVMAP_MODE_REFRACTION`};function uc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:lc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var dc={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function fc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:dc[e.combine]||`ENVMAP_BLENDING_NONE`}function pc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=cc(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=uc(n),d=fc(n),f=Js(n),p=Ys(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Zs).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Zs).join(`
`),g.length>0&&(g+=`
`)):(h=[oc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Zs).join(`
`),g=[oc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Y.tonemapping_pars_fragment,n.toneMapping===0?``:Gs(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Y.colorspace_pars_fragment,Us(`linearToOutputTexel`,n.outputColorSpace),qs(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Zs).join(`
`)),o=tc(o),o=Qs(o,n),o=$s(o,n),s=tc(s),s=Qs(s,n),s=$s(s,n),o=ic(o),s=ic(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=Is(i,i.VERTEX_SHADER,v),x=Is(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Hs(i,b,`vertex`),n=Hs(i,x,`fragment`);B(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):z(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new Fs(i,m),w=Xs(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,Ls)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Rs++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var mc=0,hc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new gc(e),t.set(e,n)),n}},gc=class{constructor(e){this.id=mc++,this.code=e,this.usedTimes=0}};function _c(e){return e===1030||e===37490||e===36285}function vc(e,t,n,r,i,a){let o=new mn,s=new hc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&z(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=Ga[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=m.isInstancedMesh===!0,ee=m.isBatchedMesh===!0,te=!!i.map,ne=!!i.matcap,N=!!b,re=N&&b.isPMREMTexture===!0,ie=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,se=!!i.normalMap,ce=!!i.displacementMap,le=!!i.emissiveMap,P=!!i.metalnessMap,ue=!!i.roughnessMap,de=i.anisotropy>0,fe=i.clearcoat>0,pe=i.diffuseRoughness>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=de&&!!i.anisotropyMap,be=fe&&!!i.clearcoatMap,xe=fe&&!!i.clearcoatNormalMap,Se=fe&&!!i.clearcoatRoughnessMap,Ce=pe&&!!i.diffuseRoughnessMap,we=ge&&!!i.iridescenceMap,Te=ge&&!!i.iridescenceThicknessMap,Ee=_e&&!!i.sheenColorMap,De=_e&&!!i.sheenRoughnessMap,Oe=!!i.specularMap,ke=!!i.specularColorMap,Ae=!!i.specularIntensityMap,je=ve&&!!i.transmissionMap,Me=ve&&!!i.thicknessMap,Ne=!!i.gradientMap,Pe=!!i.alphaMap,F=i.alphaTest>0,Fe=!!i.alphaHash,Ie=!!i.extensions,Le=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Le=e.toneMapping);let I=re?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Re={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:ee,batchingColor:ee&&m._colorsTexture!==null,instancing:M,instancingColor:M&&m.instanceColor!==null,instancingMorph:M&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:G.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:te,matcap:ne,envMap:N,envMapMode:N&&b.mapping,envMapPMREM:re,envMapMaxLod:re?I.length-1:null,envMapSize:re?I[0].width:null,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:ce,emissiveMap:le,normalMapObjectSpace:se&&i.normalMapType===1,normalMapTangentSpace:se&&i.normalMapType===0,packedNormalMap:se&&i.normalMapType===0&&_c(i.normalMap.format),metalnessMap:P,roughnessMap:ue,anisotropy:de,anisotropyMap:ye,clearcoat:fe,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,diffuseRoughness:pe,diffuseRoughnessMap:Ce,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:we,iridescenceThicknessMap:Te,sheen:_e,sheenColorMap:Ee,sheenRoughnessMap:De,specularMap:Oe,specularColorMap:ke,specularIntensityMap:Ae,transmission:ve,transmissionMap:je,thicknessMap:Me,gradientMap:Ne,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Pe,alphaTest:F,alphaHash:Fe,combine:i.combine,mapUv:te&&p(i.map.channel),aoMapUv:ie&&p(i.aoMap.channel),lightMapUv:ae&&p(i.lightMap.channel),bumpMapUv:oe&&p(i.bumpMap.channel),normalMapUv:se&&p(i.normalMap.channel),displacementMapUv:ce&&p(i.displacementMap.channel),emissiveMapUv:le&&p(i.emissiveMap.channel),metalnessMapUv:P&&p(i.metalnessMap.channel),roughnessMapUv:ue&&p(i.roughnessMap.channel),anisotropyMapUv:ye&&p(i.anisotropyMap.channel),clearcoatMapUv:be&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:Ce&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:we&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:De&&p(i.sheenRoughnessMap.channel),specularMapUv:Oe&&p(i.specularMap.channel),specularColorMapUv:ke&&p(i.specularColorMap.channel),specularIntensityMapUv:Ae&&p(i.specularIntensityMap.channel),transmissionMapUv:je&&p(i.transmissionMap.channel),thicknessMapUv:Me&&p(i.thicknessMap.channel),alphaMapUv:Pe&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(se||de),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(te||Pe),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&se===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Le,decodeVideoTexture:te&&i.map.isVideoTexture===!0&&G.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&G.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ie&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ie&&i.extensions.multiDraw===!0||ee)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Re.vertexUv1s=c.has(1),Re.vertexUv2s=c.has(2),Re.vertexUv3s=c.has(3),c.clear(),Re}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=Ga[t];n=Ii.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new pc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function yc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function bc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function xc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Sc(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||bc),r.length>1&&r.sort(t||xc),i.length>1&&i.sort(t||xc)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Cc(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Sc,e.set(t,[i])):n>=r.length?(i=new Sc,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function wc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new U,color:new q};break;case`SpotLight`:n={position:new U,direction:new U,color:new q,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new U,color:new q,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new U,skyColor:new q,groundColor:new q};break;case`RectAreaLight`:n={color:new q,position:new U,halfWidth:new U,halfHeight:new U}}return e[t.id]=n,n}}}function Tc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Ec=0;function Dc(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Oc(e){let t=new wc,n=Tc(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new U);let i=new U,a=new nn,o=new nn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Dc);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Ec++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function kc(e){let t=new Oc(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Ac(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new kc(e),t.set(n,[a])):r>=i.length?(a=new kc(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var jc=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mc=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Nc=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],Pc=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Fc=new nn,Ic=new U,Lc=new U;function Rc(e,t,n){let r=new mi,i=new H,a=new H,o=new K,s=new Vi,c=new Hi,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new zi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:jc,fragmentShader:Mc}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Rr;m.setAttribute(`position`,new Cr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new J(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(z(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){z(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){z(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new $t(i.x,i.y,{format:_e,type:ae,minFilter:k,magFilter:k,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Ei(i.x,i.y,ie),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=pe,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=E,d.map.depthTexture.magFilter=E}else l.isPointLight?(d.map=new eo(i.x),d.map.depthTexture=new Di(i.x,re)):(d.map=new $t(i.x,i.y),d.map.depthTexture=new Ei(i.x,i.y,re)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=pe,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=k,d.map.depthTexture.magFilter=k):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=E,d.map.depthTexture.magFilter=E);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let _=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Ic.setFromMatrixPosition(l.matrixWorld),e.position.copy(Ic),Lc.copy(e.position),Lc.add(Nc[t]),e.up.copy(Pc[t]),e.lookAt(Lc),e.updateMatrixWorld(),n.makeTranslation(-Ic.x,-Ic.y,-Ic.z),Fc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Fc,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,_,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new $t(i.x,i.y,{format:_e,type:ae}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=y(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)b(l[e],i,a,o,s,c)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function zc(e,t){function n(){let t=!1,n=new K,r=null,i=new K(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?P(e.DEPTH_TEST):ue(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Ct[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?P(e.STENCIL_TEST):ue(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ee=!1,te=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),ee=te>=2):(te=parseFloat(/^WebGL (\d)/.exec(ne)[1]),ee=te>=1);let N=null,re={},ie=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new K().fromArray(ie),se=new K().fromArray(ae);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),P(e.DEPTH_TEST),o.setFunc(3),ve(!1),ye(1),P(e.CULL_FACE),ge(0);function P(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ue(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function de(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function fe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function pe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let me={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};me[103]=e.MIN,me[104]=e.MAX;let he={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ge(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ue(e.BLEND),g=!1);else if(g===!1&&(P(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:B(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:B(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:B(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:B(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a=a||n,o=o||r,s=s||i,(n!==v||a!==x)&&(e.blendEquationSeparate(me[n],me[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(he[r],he[i],he[o],he[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function _e(t,n){t.side===2?ue(e.CULL_FACE):P(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ve(r),t.blending===1&&t.transparent===!1?ge(0):ge(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),xe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?P(e.SAMPLE_ALPHA_TO_COVERAGE):ue(e.SAMPLE_ALPHA_TO_COVERAGE)}function ve(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ye(t){t===0?ue(e.CULL_FACE):(P(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function be(t){t!==k&&(ee&&e.lineWidth(t),k=t)}function xe(t,n,r){t?(P(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ue(e.POLYGON_OFFSET_FILL)}function Se(t){t?P(e.SCISSOR_TEST):ue(e.SCISSOR_TEST)}function Ce(t){t===void 0&&(t=e.TEXTURE0+M-1),N!==t&&(e.activeTexture(t),N=t)}function we(t,n,r){r===void 0&&(r=N===null?e.TEXTURE0+M-1:N);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(N!==r&&(e.activeTexture(r),N=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Te(){let t=re[N];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function De(){try{e.compressedTexImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Oe(){try{e.texSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function ke(){try{e.texSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Me(){try{e.texStorage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ne(){try{e.texStorage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Pe(){try{e.texImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function F(){try{e.texImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Fe(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ie(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Le(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function I(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function Re(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function L(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function R(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},N=null,re={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,oe.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:P,disable:ue,bindFramebuffer:de,drawBuffers:fe,useProgram:pe,setBlending:ge,setMaterial:_e,setFlipSided:ve,setCullFace:ye,setLineWidth:be,setPolygonOffset:xe,setScissorTest:Se,activeTexture:Ce,bindTexture:we,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:De,texImage2D:Pe,texImage3D:F,pixelStorei:Ie,getParameter:Fe,updateUBOMapping:Re,uniformBlockBinding:L,texStorage2D:Me,texStorage3D:Ne,texSubImage2D:Oe,texSubImage3D:ke,compressedTexSubImage2D:Ae,compressedTexSubImage3D:je,scissor:Le,viewport:I,reset:R}}function Bc(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new H,u=new WeakMap,d=new Set,f,p=new WeakMap,m=new Set,h=new FinalizationRegistry(e=>m.delete(e)),g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function _(e,t){return g?new OffscreenCanvas(e,t):gt(`canvas`)}function v(e,t,n){let r=1,i=R(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=_(n,a));let o=t?_(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),z(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&z(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];z(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||z(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?ct:G.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function M(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,z(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function ee(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function te(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function ne(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function N(e){ie(e.target)}function re(e){ae(e.target)}function ie(e){e.removeEventListener(`dispose`,N),ne(e),se(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function ae(e){e.removeEventListener(`dispose`,re),ne(e),le(e)}function oe(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?ae(t):ie(t))}m.clear(),d.clear()}function se(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&ce(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function ce(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function le(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&ie(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let P=0;function ue(){P=0}function de(){return P}function fe(e){P=e}function pe(){let e=P;return e>=i.maxTextures&&z(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),P+=1,e}function he(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ge(t,i){let a=r.get(t);if(t.isVideoTexture&&Re(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)z(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)z(`WebGLRenderer: Texture marked for update but image is incomplete`);else{De(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function _e(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?De(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function ve(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?De(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ye(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?Oe(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let be={[C]:e.REPEAT,[w]:e.CLAMP_TO_EDGE,[T]:e.MIRRORED_REPEAT},xe={[E]:e.NEAREST,[D]:e.NEAREST_MIPMAP_NEAREST,[O]:e.NEAREST_MIPMAP_LINEAR,[k]:e.LINEAR,[A]:e.LINEAR_MIPMAP_NEAREST,[j]:e.LINEAR_MIPMAP_LINEAR},Se={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function Ce(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&z(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,be[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,be[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,be[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,xe[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,xe[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,Se[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function we(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,N),te(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=he(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&ce(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function Te(e,t,n){return Math.floor(Math.floor(e/n)/t)}function Ee(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=Te(n.start,r.width,4),c=Te(t.start,r.width,4);n.start<=i+1&&a===c&&Te(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function De(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=we(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=G.getPrimaries(G.workingColorSpace),r=o.colorSpace===``?null:G.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=v(o.image,!1,i.maxTextureSize);t=L(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=S(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);Ce(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,x=f.__version===void 0||l===!0,C=u.dataReady,w=ee(o,t);if(o.isDepthTexture)m=M(o.format===me,o.type),x&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&x&&n.texStorage2D(e.TEXTURE_2D,w,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?C&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(x&&n.texStorage2D(e.TEXTURE_2D,w,m,t.width,t.height),C&&Ee(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,w,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(C){if(o.layerUpdates.size>0){let t=Va(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?C&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&x&&n.texStorage2D(e.TEXTURE_2D,w,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?C&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?C&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,w,m,t.width,t.height,t.depth),C){if(o.layerUpdates.size>0){let i=Va(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(x&&n.texStorage3D(e.TEXTURE_3D,w,m,t.width,t.height,t.depth),C&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(x){if(_)n.texStorage2D(e.TEXTURE_2D,w,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<w;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&x){let t=R(g[0]);n.texStorage2D(e.TEXTURE_2D,w,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?C&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(x){let r=R(t);n.texStorage2D(e.TEXTURE_2D,w,m,r.width,r.height)}C&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);y(o)&&o.mipmapsAutoUpdate===!0&&b(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Oe(t,o,s){if(o.image.length!==6)return;let c=we(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=G.getPrimaries(G.workingColorSpace),r=o.colorSpace===``?null:G.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=v(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=L(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),x=S(o.internalFormat,g,_,o.normalized,o.colorSpace),C=o.isVideoTexture!==!0,w=u.__version===void 0||c===!0,T=l.dataReady,E=ee(o,h);Ce(e.TEXTURE_CUBE_MAP,o);let D;if(o.isDepthTexture){if(x=M(o.format===me,o.type),w){if(C)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,x,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,h.width,h.height,0,g,_,null)}}else if(f){C&&w&&n.texStorage2D(e.TEXTURE_CUBE_MAP,E,x,h.width,h.height);for(let t=0;t<6;t++){D=m[t].mipmaps;for(let r=0;r<D.length;r++){let i=D[r];o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,g,_,i.data):g===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,i.data)}}}else{if(D=o.mipmaps,C&&w){D.length>0&&E++;let t=R(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,E,x,t.width,t.height)}for(let t=0;t<6;t++)if(p){C?T&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<D.length;r++){let i=D[r].image[t].image;C?T&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,i.width,i.height,0,g,_,i.data)}}else{C?T&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,g,_,m[t]);for(let r=0;r<D.length;r++){let i=D[r];C?T&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,g,_,i.image[t])}}}y(o)&&o.mipmapsAutoUpdate===!0&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ke(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=S(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),I(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Le(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ae(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=M(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;I(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Le(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Le(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=S(o.internalFormat,c,l,o.normalized,o.colorSpace);I(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Le(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Le(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function je(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?ye(i.depthTexture,0):ge(i.depthTexture,0);let u=c.__webglTexture,d=Le(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)I(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)I(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Me(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)je(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?je(i.__webglFramebuffer[0],t,0):je(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Ae(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Ae(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ne(t,n,i){let a=r.get(t);n!==void 0&&ke(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Me(t)}function Pe(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,re),te(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&I(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=S(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Le(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),Ae(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),Ce(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ke(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ke(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(i)?b(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),Ce(c,a),ke(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),y(a)&&b(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),Ce(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ke(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ke(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);y(i)?b(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&Me(t)}function F(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(y(a)&&a.mipmapsAutoUpdate===!0){let t=x(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),b(t),n.unbindTexture()}}}let Fe=[];function Ie(t){if(t.samples>0){if(I(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Fe.length=0,Fe.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&Fe.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Fe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Le(e){return Math.min(i.maxSamples,e.samples)}function I(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Re(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function L(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(G.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&z(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):B(`WebGLTextures: Unsupported texture color space:`,n)),t}function R(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=pe,this.resetTextureUnits=ue,this.getTextureUnits=de,this.setTextureUnits=fe,this.setTexture2D=ge,this.setTexture2DArray=_e,this.setTexture3D=ve,this.setTextureCube=ye,this.rebindTextures=Ne,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=Ie,this.setupDepthRenderbuffer=Me,this.setupFrameBufferTexture=ke,this.useMultisampledRTT=I,this.dispose=oe}function Vc(e,t){function n(n,r=``){let i,a=G.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Hc=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Uc=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Wc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Oi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new zi({vertexShader:Hc,fragmentShader:Uc,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new J(new Ai(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Gc=class extends wt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Wc,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new H,C=null,w=null,T=new Ca;T.viewport=new K;let E=new Ca;E.viewport=new K;let D=[T,E],O=new Oa,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Nn,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Nn,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Nn,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,te);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,oe.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,te),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?me:pe,a=_.stencil?ce:re);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new $t(d.textureWidth,d.textureHeight,{format:fe,type:M,depthTexture:new Ei(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new $t(f.framebufferWidth,f.framebufferHeight,{format:fe,type:M,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),oe.setContext(r),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function te(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}function ne(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;ne(O,i);for(let e=0;e<a.length;e++)ne(a[e],i);O.projectionMatrix.copy(T.projectionMatrix),O.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),N(e,O,i)};function N(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Dt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let ie=null;function ae(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Ca,o.layers.enable(n),o.viewport=new K,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Oi,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ie&&ie(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let oe=new Ua;oe.setAnimationLoop(ae),this.setAnimationLoop=function(e){ie=e},this.dispose=function(){}}},Kc=new nn,qc=new W;qc.set(-1,0,0,0,1,0,0,0,1);function Jc(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Fi(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Kc.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(qc),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Yc(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?z(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):z(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var Xc=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Zc=null;function Qc(){return Zc===null&&(Zc=new ui(Xc,16,16,_e,ae),Zc.name=`DFG_LUT`,Zc.minFilter=k,Zc.magFilter=k,Zc.wrapS=w,Zc.wrapT=w,Zc.generateMipmaps=!1,Zc.needsUpdate=!0),Zc}var $c=class{constructor(e={}){let{canvas:t=_t(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=M}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([ye,ve,ge]),g=new Set([M,re,ne,ce,oe,se]),_=new Uint32Array(4),v=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=ot;let ee=0,te=0,N=null,ie=-1,le=null,P=new K,ue=new K,de=null,fe=new q(0),pe=0,me=t.width,he=t.height,_e=1,be=null,xe=null,Se=new K(0,0,me,he),Ce=new K(0,0,me,he),we=!1,Te=new mi,Ee=new gi,De=!1,Oe=!1,ke=new nn,Ae=new U,je=new K,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ne=!1;function Pe(){return N===null?_e:1}let F=n;function Fe(e,n){return t.getContext(e,n)}let Ie,Le,I,Re,L,R,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,it,!1),t.addEventListener(`webglcontextrestored`,at,!1),t.addEventListener(`webglcontextcreationerror`,st,!1),F===null){let t=`webgl2`;if(F=Fe(t,e),F===null)throw Fe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}nt()}catch(e){throw t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,st,!1),B(`WebGLRenderer: `+e.message),e}function nt(){Ie=new yo(F),Ie.init(),$e=new Vc(F,Ie),Le=new Qa(F,Ie,e,$e),I=new zc(F,Ie),Le.reversedDepthBuffer&&d&&I.buffers.depth.setReversed(!0),O=F.createFramebuffer(),k=F.createFramebuffer(),A=F.createFramebuffer(),Re=new So(F),L=new yc,R=new Bc(F,Ie,I,L,Le,$e,Re),ze=new vo(T),Be=new Wa(F),et=new Xa(F,Be),Ve=new bo(F,Be,Re,et),He=new wo(F,Ve,Be,et,Re),Xe=new Co(F,Le,R),qe=new $a(L),Ue=new vc(T,ze,Ie,Le,et,qe),We=new Jc(T,L),Ge=new Cc,Ke=new Ac(Ie),Ye=new Ya(T,ze,I,He,p,s),Je=new Rc(T,He,Le),tt=new Yc(F,Re,Le,I),Ze=new Za(F,Ie,Re),Qe=new xo(F,Ie,Re),Re.programs=Ue.programs,T.capabilities=Le,T.extensions=Ie,T.properties=L,T.renderLists=Ge,T.shadowMap=Je,T.state=I,T.info=Re}m!==1009&&(w=new Eo(m,t.width,t.height,o,r,i));let rt=new Gc(T,F);this.xr=rt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return _e},this.setPixelRatio=function(e){e!==void 0&&(_e=e,this.setSize(me,he,!1))},this.getSize=function(e){return e.set(me,he)},this.setSize=function(e,n,r=!0){rt.isPresenting?z(`WebGLRenderer: Can't change size while VR device is presenting.`):(me=e,he=n,t.width=Math.floor(e*_e),t.height=Math.floor(n*_e),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(me*_e,he*_e).floor()},this.setDrawingBufferSize=function(e,n,r){me=e,he=n,_e=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)B(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){z(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(P)},this.getViewport=function(e){return e.copy(Se)},this.setViewport=function(e,t,n,r){e.isVector4?Se.set(e.x,e.y,e.z,e.w):Se.set(e,t,n,r),I.viewport(P.copy(Se).multiplyScalar(Pe()).round())},this.getScissor=function(e){return e.copy(Ce)},this.setScissor=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),I.scissor(ue.copy(Ce).multiplyScalar(Pe()).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(e){I.setScissorTest(we=e)},this.setOpaqueSort=function(e){be=e},this.setTransparentSort=function(e){xe=e},this.getClearColor=function(e){return e.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Ye.getClearColor(),r=Ye.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,F.clearBufferuiv(F.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,F.clearBufferiv(F.COLOR,0,v))}else r|=F.COLOR_BUFFER_BIT}t&&(r|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&F.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,st,!1),Ye.dispose(),Ge.dispose(),Ke.dispose(),R.dispose(),L.dispose(),ze.dispose(),He.dispose(),Ve.dispose(),et.dispose(),tt.dispose(),Ue.dispose(),rt.dispose(),rt.removeEventListener(`sessionstart`,ht),rt.removeEventListener(`sessionend`,gt),vt.stop()};function it(e){e.preventDefault(),yt(`WebGLRenderer: Context Lost.`),E=!0}function at(){yt(`WebGLRenderer: Context Restored.`),E=!1;let e=Re.autoReset,t=Je.enabled,n=Je.autoUpdate,r=Je.needsUpdate,i=Je.type;nt(),Re.autoReset=e,Je.enabled=t,Je.autoUpdate=n,Je.needsUpdate=r,Je.type=i}function st(e){B(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ct(e){let t=e.target;t.removeEventListener(`dispose`,ct),lt(t)}function lt(e){ut(e),L.remove(e)}function ut(e){let t=L.get(e).programs;t!==void 0&&(t.forEach(function(e){Ue.releaseProgram(e)}),e.isShaderMaterial&&Ue.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Me);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=At(e,t,n,r,i);I.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ve.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;et.setup(i,r,s,n,c);let h,g=Ze;if(c!==null&&(h=Be.get(c),g=Qe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(I.setLineWidth(r.wireframeLinewidth*Pe()),g.setMode(F.LINES)):g.setMode(F.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),I.setLineWidth(e*Pe()),i.isLineSegments?g.setMode(F.LINES):i.isLineLoop?g.setMode(F.LINE_LOOP):g.setMode(F.LINE_STRIP)}else i.isPoints?g.setMode(F.POINTS):i.isSprite&&g.setMode(F.TRIANGLES);if(i.isBatchedMesh){if(Ie.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Be.get(c).bytesPerElement:1,o=L.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(F,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function dt(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),De===!0&&qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Dt(e,t,r),e.side=0,e.needsUpdate=!0,Dt(e,t,r),e.side=2):Dt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Ke.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),Oe=this.localClippingEnabled,De=qe.init(this.clippingPlanes,Oe),De===!0&&qe.setGlobalState(this.clippingPlanes,t),D!==null&&Je.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];dt(o,n,t,e),r.add(o)}else dt(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=L.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Ie.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ft=null;function mt(e){ft&&ft(e)}function ht(){vt.stop()}function gt(){vt.start()}let vt=new Ua;vt.setAnimationLoop(mt),typeof self<`u`&&vt.setContext(self),this.setAnimationLoop=function(e){ft=e,rt.setAnimationLoop(e),e===null?vt.stop():vt.start()},rt.addEventListener(`sessionstart`,ht),rt.addEventListener(`sessionend`,gt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){B(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=rt.enabled===!0&&rt.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(t),t=rt.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Ke.get(e,C.length),x.init(t),x.state.textureUnits=R.getTextureUnits(),C.push(x),ke.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?Ee.setFromArrayCamera(t):Te.setFromProjectionMatrix(ke,pt,t.reversedDepth),Oe=this.localClippingEnabled,De=qe.init(this.clippingPlanes,Oe),b=Ge.get(e,S.length),b.init(),S.push(b),this.info.render.frame++,rt.enabled===!0&&rt.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&bt(e,t,-1/0,T.sortObjects)}bt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(be,xe),Ne=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,Ne&&Ye.addToRenderList(b,e),this.info.autoReset===!0&&this.info.reset(),De===!0&&qe.beginShadows();let i=x.state.shadowsArray;if(Je.render(i,e,t),De===!0&&qe.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Ct(n,r,e,a)}Ne&&Ye.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];xt(b,e,n,n.viewport)}}else r.length>0&&Ct(n,r,e,t),Ne&&Ye.render(e),xt(b,e,t)}N!==null&&te===0&&(R.updateMultisampleRenderTarget(N),R.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),et.resetDefaultState(),ie=-1,le=null,C.pop(),C.length>0?(x=C[C.length-1],R.setTextureUnits(x.state.textureUnits),De===!0&&qe.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function bt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?Ee:Te;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&je.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ke);let i=He.update(e),a=e.material;a.visible&&b.push(e,i,a,n,je.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?Ee:Te;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=He.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),je.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),je.copy(e.boundingSphere.center)),je.applyMatrix4(e.matrixWorld).applyMatrix4(ke)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,je.z,s,t)}}else a.visible&&b.push(e,i,a,n,je.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)bt(i[e],t,n,r)}function xt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),De===!0&&qe.setGlobalState(T.clippingPlanes,n),r&&I.viewport(P.copy(r)),i.length>0&&wt(i,t,n),a.length>0&&wt(a,t,n),o.length>0&&wt(o,t,n),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function Ct(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Ie.has(`EXT_color_buffer_half_float`)||Ie.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new $t(1,1,{generateMipmaps:!0,type:e?ae:M,minFilter:j,samples:Math.max(4,Le.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:G.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||P;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(fe),pe=T.getClearAlpha(),pe<1&&T.setClearColor(16777215,.5),T.clear(),Ne&&Ye.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),De===!0&&qe.setGlobalState(T.clippingPlanes,r),wt(e,n,r),R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a),Ie.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Tt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(fe,pe),d!==void 0&&(r.viewport=d),T.toneMapping=u}function wt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Tt(o,t,n,s,l,c)}}function Tt(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function Et(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function Dt(e,t,n){t.isScene!==!0&&(t=Me);let r=L.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ue.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ue.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ze.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ct),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return kt(e,s),d}else s.uniforms=Ue.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ue.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=qe.uniform),kt(e,s),r.needsLights=Mt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=Et(x.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function Ot(e,t,n,r,i){let a=L.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=Dt(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function V(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Fs.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function kt(e,t){let n=L.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function At(e,t,n,r,i){t.isScene!==!0&&(t=Me),R.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:G.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ze.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=L.get(r),b=x.state.lights;if(De===!0&&(Oe===!0||e!==le)){let t=e===le&&r.id===ie;qe.setState(r,e,t)}let S=!1,C=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==b.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?S=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==qe.numPlanes||v.numIntersection!==qe.numIntersection)?S=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===Et(x.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(C=!0):S=!0:S=!0:(S=!0,v.__version=r.version);let w=v.currentProgram;(S===!0||C===!0)&&(w=C===!0?Ot(r,t,i,s,h):Dt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,w,v));let E=!1,O=!1,k=!1,A=w.getUniforms(),j=v.uniforms;if(I.useProgram(w.program)&&(E=!0,O=!0,k=!0),r.id!==ie&&(ie=r.id,O=!0),E||le!==e){I.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),A.setValue(F,`projectionMatrix`,e.projectionMatrix),A.setValue(F,`viewMatrix`,e.matrixWorldInverse);let t=A.map.cameraPosition;t!==void 0&&t.setValue(F,Ae.setFromMatrixPosition(e.matrixWorld)),Le.logarithmicDepthBuffer&&A.setValue(F,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&A.setValue(F,`isOrthographic`,e.isOrthographicCamera===!0),le!==e&&(le=e,O=!0,k=!0)}if(v.needsLights&&(b.state.sunShadowMap.length>0&&A.setValue(F,`sunShadowMap`,b.state.sunShadowMap,R),b.state.directionalShadowMap.length>0&&A.setValue(F,`directionalShadowMap`,b.state.directionalShadowMap,R),b.state.spotShadowMap.length>0&&A.setValue(F,`spotShadowMap`,b.state.spotShadowMap,R),b.state.pointShadowMap.length>0&&A.setValue(F,`pointShadowMap`,b.state.pointShadowMap,R)),i.isSkinnedMesh){A.setOptional(F,i,`bindMatrix`),A.setOptional(F,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),A.setValue(F,`boneTexture`,e.boneTexture,R))}i.isBatchedMesh&&(A.setOptional(F,i,`batchingTexture`),A.setValue(F,`batchingTexture`,i._matricesTexture,R),A.setOptional(F,i,`batchingIdTexture`),A.setValue(F,`batchingIdTexture`,i._indirectTexture,R),A.setOptional(F,i,`batchingColorTexture`),i._colorsTexture!==null&&A.setValue(F,`batchingColorTexture`,i._colorsTexture,R));let M=n.morphAttributes;if((M.position!==void 0||M.normal!==void 0||M.color!==void 0)&&Xe.update(i,n,w),(O||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,A.setValue(F,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=Qc()),O){if(A.setValue(F,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&jt(j,k),a&&r.fog===!0&&We.refreshFogUniforms(j,a),We.refreshMaterialUniforms(j,r,_e,he,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=y,t=0;for(let n of x.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;j.probesSH.value=e.textures,j.probesMin.value=e.min,j.probesMax.value=e.max,j.probesResolution.value=e.resolution}Fs.upload(F,V(v),j,R)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Fs.upload(F,V(v),j,R),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&A.setValue(F,`center`,i.center),A.setValue(F,`modelViewMatrix`,i.modelViewMatrix),A.setValue(F,`normalMatrix`,i.normalMatrix),A.setValue(F,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];tt.update(n,w),tt.bind(n,w)}}return w}function jt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Mt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ee},this.getActiveMipmapLevel=function(){return te},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=L.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),L.get(e.texture).__webglTexture=t,L.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=L.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,ee=t,te=n;let r=null,i=!1,a=!1;if(e){let o=L.get(e);if(o.__useDefaultFramebuffer!==void 0){I.bindFramebuffer(F.FRAMEBUFFER,o.__webglFramebuffer),P.copy(e.viewport),ue.copy(e.scissor),de=e.scissorTest,I.viewport(P),I.scissor(ue),I.setScissorTest(de),ie=-1;return}if(o.__webglFramebuffer===void 0)R.setupRenderTarget(e);else if(o.__hasExternalTextures)R.rebindTextures(e,L.get(e.texture).__webglTexture,L.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&L.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);R.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=L.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&R.useMultisampledRTT(e)===!1?L.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,P.copy(e.viewport),ue.copy(e.scissor),de=e.scissorTest}else P.copy(Se).multiplyScalar(_e).floor(),ue.copy(Ce).multiplyScalar(_e).floor(),de=we;if(n!==0&&(r=O),I.bindFramebuffer(F.FRAMEBUFFER,r)&&I.drawBuffers(e,r),I.viewport(P),I.scissor(ue),I.setScissorTest(de),i){let r=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=L.get(e.textures[t]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,t.__webglTexture,n)}ie=-1};function Nt(e){let t=L.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Le.textureFormatReadable(e.format),t.__typeReadable=Le.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){I.bindFramebuffer(F.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let u=Nt(o);if(u.__formatReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&F.readPixels(t,n,r,i,$e.convert(c),$e.convert(l),a)}finally{let e=N===null?null:L.get(N).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){I.bindFramebuffer(F.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let d=Nt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.bufferData(F.PIXEL_PACK_BUFFER,a.byteLength,F.STREAM_READ),F.readPixels(t,n,r,i,$e.convert(l),$e.convert(u),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let p=N===null?null:L.get(N).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,p);let m=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await St(F,m,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,a),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(f),F.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;R.setTexture2D(e,0),F.copyTexSubImage2D(F.TEXTURE_2D,n,0,0,o,s,i,a),I.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=$e.convert(t.format),_=$e.convert(t.type),v;t.isData3DTexture?(R.setTexture3D(t,0),v=F.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(R.setTexture2DArray(t,0),v=F.TEXTURE_2D_ARRAY):(R.setTexture2D(t,0),v=F.TEXTURE_2D),I.activeTexture(F.TEXTURE0),I.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,t.flipY),I.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),I.pixelStorei(F.UNPACK_ALIGNMENT,t.unpackAlignment);let y=I.getParameter(F.UNPACK_ROW_LENGTH),b=I.getParameter(F.UNPACK_IMAGE_HEIGHT),x=I.getParameter(F.UNPACK_SKIP_PIXELS),S=I.getParameter(F.UNPACK_SKIP_ROWS),C=I.getParameter(F.UNPACK_SKIP_IMAGES);I.pixelStorei(F.UNPACK_ROW_LENGTH,h.width),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,h.height),I.pixelStorei(F.UNPACK_SKIP_PIXELS,l),I.pixelStorei(F.UNPACK_SKIP_ROWS,u),I.pixelStorei(F.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=L.get(e),r=L.get(t),h=L.get(n.__renderTarget),g=L.get(r.__renderTarget);I.bindFramebuffer(F.READ_FRAMEBUFFER,h.__webglFramebuffer),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(e).__webglTexture,i,d+n),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(t).__webglTexture,a,m+n)),F.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,F.DEPTH_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||L.has(e)){let n=L.get(e),r=L.get(t);I.bindFramebuffer(F.READ_FRAMEBUFFER,k),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,n.__webglTexture,i),T?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,r.__webglTexture,a),i===0?T?F.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):F.copyTexSubImage2D(v,a,f,p,l,u,o,s):F.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,F.COLOR_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?F.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h);I.pixelStorei(F.UNPACK_ROW_LENGTH,y),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,b),I.pixelStorei(F.UNPACK_SKIP_PIXELS,x),I.pixelStorei(F.UNPACK_SKIP_ROWS,S),I.pixelStorei(F.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&F.generateMipmap(v),I.unbindTexture()},this.initRenderTarget=function(e){L.get(e).__webglFramebuffer===void 0&&R.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?R.setTextureCube(e,0):e.isData3DTexture?R.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?R.setTexture2DArray(e,0):R.setTexture2D(e,0),I.unbindTexture()},this.resetState=function(){ee=0,te=0,N=null,I.reset(),et.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return pt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=G._getDrawingBufferColorSpace(e),t.unpackColorSpace=G._getUnpackColorSpace()}},el=new ha,tl=new Map;function nl(e){return`./`+e}function rl(e){let t=tl.get(e);return t||(t=el.load(nl(e)),t.colorSpace=ot,t.anisotropy=4,tl.set(e,t)),t}function il(e,t,n,r){let i=tl.get(e);if(!i){let a=document.createElement(`canvas`);a.width=t,a.height=n,r(a.getContext(`2d`)),i=new Ti(a),i.colorSpace=ot,tl.set(e,i)}return i}var al=new Map,ol=new ha;function sl(e,t=!1){let n=al.get(e);return n||(n=ol.load(nl(e)),n.colorSpace=``,t&&(n.wrapS=n.wrapT=C),al.set(e,n)),n}var cl=e=>{let t=new q;return t.setHex(parseInt(e.slice(1),16),st),t},ll={0:{water:`#FF5E24`,foam:`#FF8561`,top:`#E54514`,stream:`#D9430D`},1:{water:`#1EA7F5`,foam:`#6FD0FF`,top:`#0B7CC0`,stream:`#0B86D0`},2:{water:`#1BCA00`,foam:`#37C034`,top:`#057303`,stream:`#0E6700`},3:{water:`#8A33EE`,foam:`#8A5EF1`,top:`#420CBE`,stream:`#5610A6`},4:{water:`#FFCD24`,foam:`#D1C295`,top:`#A67F10`,stream:`#AB870C`},5:{water:`#E73546`,foam:`#F1777A`,top:`#AD2023`,stream:`#DD2234`},6:{water:`#FF49AE`,foam:`#FF72C1`,top:`#BE1E77`,stream:`#C8237D`},7:{water:`#3A3D45`,foam:`#6B7080`,top:`#22252B`,stream:`#292B30`},8:{water:`#E8EEF8`,foam:`#FFFFFF`,top:`#B8C2D2`,stream:`#C9D3E0`},9:{water:`#3AB978`,foam:`#7EEC9F`,top:`#267D41`,stream:`#0D7B45`},10:{water:`#6E8AFF`,foam:`#9DB0FF`,top:`#3F57D0`,stream:`#4A64E0`},11:{water:`#84422B`,foam:`#7D4F43`,top:`#3F180D`,stream:`#481F11`}};function ul(e){let t=ll[e]??ll[8];return{water:cl(t.water),foam:cl(t.foam),top:cl(t.top),stream:cl(t.stream)}}var dl=`
vec2 sg_dir(vec2 p){ p = mod(p, 289.0); float x = mod((34.0 * p.x + 1.0) * p.x, 289.0) + p.y; x = mod((34.0 * x + 1.0) * x, 289.0);
  x = fract(x / 41.0) * 2.0 - 1.0; return normalize(vec2(x - floor(x + 0.5), abs(x) - 0.5)); }
float sg_noise(vec2 uv, float scale){ vec2 p = uv * scale; vec2 ip = floor(p); vec2 fp = fract(p);
  float d00 = dot(sg_dir(ip), fp); float d01 = dot(sg_dir(ip + vec2(0.0, 1.0)), fp - vec2(0.0, 1.0));
  float d10 = dot(sg_dir(ip + vec2(1.0, 0.0)), fp - vec2(1.0, 0.0)); float d11 = dot(sg_dir(ip + vec2(1.0, 1.0)), fp - vec2(1.0, 1.0));
  fp = fp * fp * fp * (fp * (fp * 6.0 - 15.0) + 10.0);
  return mix(mix(d00, d01, fp.y), mix(d10, d11, fp.y), fp.x) + 0.5; }`,fl=.4,pl=.576,ml=.44,hl=64,gl=`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,_l=`
uniform sampler2D uTube; uniform sampler2D uGloss; uniform sampler2D uBubble;
uniform vec3 uColors[${hl}]; uniform float uCount; uniform float uUsed; uniform float uLen; uniform float uTime;
uniform float uFade; uniform float uGlassLen;
varying vec2 vUv;
float hash(float n){ return fract(sin(n * 127.1) * 43758.5453); }
void main(){
  float x = (vUv.x - 0.5) * ${pl.toFixed(3)};        // across, cells
  float y = vUv.y * uLen;                                  // along, from the mouth outward
  // glass: tube.png cross-section (sampled mid-height), alpha as in the sprite
  // Water Out's glass is "only slightly brighter than the background" on its light-blue board [V]; our background is
  // dark, so the glass keeps its rim/shading but at low opacity [own].
  // glass length = initial content + 0.4 (sprPipe.size.y = L + 0.4 at init, never shrinks) [C InitPipeAndMask], round end
  float gh = ${(pl/2).toFixed(3)};
  if (y > uGlassLen - gh && length(vec2(x, y - (uGlassLen - gh))) > gh) discard;
  vec4 glass = texture2D(uTube, vec2(vUv.x, 0.5));
  vec3 col = glass.rgb; float a = glass.a * 0.28;
  // water column: remaining units laid from the mouth outward; uUsed animates when a cat drinks (slide toward mouth)
  float hw = ${(ml/2).toFixed(3)};
  float colLen = max(0.0, uCount - uUsed) * ${fl.toFixed(3)};
  float ax = abs(x);
  if (ax < hw && colLen > 0.0) {
    // rounded far end (water_end cap): circle of radius hw at the end of the column
    float endY = colLen;
    bool inside = y < endY - hw || length(vec2(x, y - (endY - hw))) < hw || (colLen < 2.0 * hw && y < endY);
    if (inside && y >= 0.0) {
      float idx = floor(y / ${fl.toFixed(3)} + uUsed);
      vec3 w = uColors[int(clamp(idx, 0.0, 63.0))];
      // one soft highlight band ~30% from the left + slightly darker edges [V 04_water_motion]
      float band = exp(-pow((x / hw + 0.4) / 0.22, 2.0));
      vec3 c = mix(w, mix(w, vec3(1.0), 0.38), band);
      c *= 1.0 - 0.12 * smoothstep(0.6, 1.0, ax / hw);
      // bubble rings drifting away from the board (Mat_Bubble additive, alpha 0.6, size 0.08-0.16)
      for (int k = 0; k < 3; k++) {
        float lane = float(k);
        float speed = 0.8 + 0.4 * hash(lane + 3.0);
        float yy = y - uTime * speed * 0.8 + lane * 0.37;
        float cell = floor(yy / 0.55);
        float h = hash(cell * 3.1 + lane * 17.0);
        if (h > 0.45) continue;
        vec2 bc = vec2((hash(cell + lane * 7.3) - 0.5) * (hw * 1.4), (cell + 0.5) * 0.55);
        float r = 0.04 + 0.04 * hash(cell * 1.7 + lane);
        vec2 q = (vec2(x, yy) - bc) / (2.0 * r) + 0.5;
        if (q.x > 0.0 && q.x < 1.0 && q.y > 0.0 && q.y < 1.0) c += texture2D(uBubble, q).rgb * texture2D(uBubble, q).a * 0.6;
      }
      col = c; a = 1.0;
    }
  }
  // gloss strip (tube light.png, alpha 0.749) over glass and water
  float gx = (x + 0.12) / 0.09;
  if (abs(gx) < 1.0) { vec4 g = texture2D(uGloss, vec2(gx * 0.5 + 0.5, 0.5)); float ga = g.a * 0.749 * (a > 0.99 ? 1.0 : 0.45); col = mix(col, g.rgb, ga); a = max(a, ga); }
  gl_FragColor = vec4(col, a * uFade);
}`;function vl(e){let t=sl(`cwj/wo/tube.png`),n=sl(`cwj/wo/tube_light.png`),r=sl(`cwj/wo/bubble_0.png`);return new zi({vertexShader:gl,fragmentShader:_l,transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{uTube:{value:t},uGloss:{value:n},uBubble:{value:r},uColors:{value:Array.from({length:hl},()=>new q)},uCount:{value:0},uUsed:{value:0},uLen:{value:e},uTime:{value:0},uFade:{value:1},uGlassLen:{value:e}}})}function yl(e,t){let n=e.uniforms.uColors.value;t.slice(0,hl).forEach((e,t)=>n[t].copy(ul(e).water)),e.uniforms.uCount.value=Math.min(t.length,hl),e.uniforms.uGlassLen.value=t.length*fl+.4*.8}function bl(e){let t=[[0,1],[.35,1.6],[.7,-.65],[1,0]];for(let n=0;n<3;n++)if(e<=t[n+1][0]){let r=(e-t[n][0])/(t[n+1][0]-t[n][0]),i=r*r*(3-2*r);return t[n][1]+(t[n+1][1]-t[n][1])*i}return 0}var xl=.0712,Sl=.4,Cl=e=>1-(1-e)*(1-e),wl=`
uniform float uTime;
varying vec2 vUv;
${dl}
void main(){
  vUv = uv;
  float n = sg_noise(uv + 0.2 * uTime, 5.0);
  vec3 p = position + vec3(normal.xy * (2.0 * n - 1.0) * 0.04, 0.0);   // DistortionVertex 0.04 [D]
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`,Tl=`
uniform vec3 uBase; uniform float uDis; uniform float uRev; uniform float uTime; uniform sampler2D uNormal;
varying vec2 vUv;
${dl}
void main(){
  vec2 ws = vec2(0.0, -0.2);                                   // _WaterSpeed [D]
  float N = sg_noise(vUv + uTime * ws, 16.0);
  float v = (1.0 - vUv.y) * ((1.0 - vUv.y) + N);
  if (v >= 2.0 * uRev || !(v >= 2.0 * uDis)) discard;         // head grows from uv.y 0, tail leaves from uv.y 0 [C]
  // glints: two scrolling normal-map samples (tiling 0.31 / 0.155), masked by noise^3.56 (_NormalSpeed (0,-0.61))
  vec3 n1 = texture2D(uNormal, vUv * 0.31 + 0.1 * uTime).xyz * 2.0 - 1.0;
  vec3 n2 = texture2D(uNormal, vUv * 0.155 - 0.02 * uTime).xyz * 2.0 - 1.0;
  vec3 n = normalize(vec3((n1.xy + n2.xy) * 8.88, 1.0));
  float mask = pow(clamp(sg_noise(vUv + uTime * vec2(0.0, -0.61), 10.0), 0.0, 1.0), 3.56);
  vec3 h = normalize(vec3(0.0, 0.1736, 0.9848) + vec3(0.0, 0.0, 1.0));
  float spec = pow(max(dot(n, h), 0.0), 24.0) * mask * 0.9;   // [U] approximates NHxRoughness LUT + SpecCube
  // tube cross-section: across = vUv.x (0..1), flattened tube seen from the front
  float across = abs(vUv.x - 0.5) * 2.0;
  vec3 col = uBase * (1.0 - 0.18 * across * across) + vec3(spec);
  gl_FragColor = vec4(col, 1.0);
}`,El=class{constructor(e,t=.3,n){r(this,`width`,void 0),r(this,`mesh`,void 0),r(this,`mat`,void 0),r(this,`color`,-1),this.width=t,this.mat=new zi({vertexShader:wl,fragmentShader:Tl,transparent:!0,depthTest:!1,depthWrite:!1,side:2,uniforms:{uBase:{value:n??ul(e).stream.clone().lerp(ul(e).water,.5)},uDis:{value:1},uRev:{value:1},uTime:{value:0},uNormal:{value:sl(`cwj/wo/IKT4l.png`,!0)}}}),this.mesh=new J(new Rr,this.mat),this.mesh.renderOrder=605}setPath(e,t,n){let r=n?[t[0],e[1]]:[e[0],t[1]],i=[],a=[],o=[],s=[],c=n=>{let i=1-n;return[i*i*e[0]+2*i*n*r[0]+n*n*t[0],i*i*e[1]+2*i*n*r[1]+n*n*t[1]]};for(let e=0;e<=24;e++){let t=e/24,n=c(t),r=c(Math.max(0,t-.01)),l=c(Math.min(1,t+.01)),u=l[0]-r[0],d=l[1]-r[1],f=Math.hypot(u,d)||1;u/=f,d/=f;let p=-d,m=u,h=this.width/2;if(i.push(n[0]+p*h,n[1]+m*h,0,n[0]-p*h,n[1]-m*h,0),a.push(p,m,0,-p,-m,0),o.push(0,t,1,t),e<24){let t=e*2;s.push(t,t+1,t+2,t+1,t+3,t+2)}}let l=new Rr;l.setAttribute(`position`,new Er(i,3)),l.setAttribute(`normal`,new Er(a,3)),l.setAttribute(`uv`,new Er(o,2)),l.setIndex(s),this.mesh.geometry.dispose(),this.mesh.geometry=l}setPolyline(e){if(e.length<3){this.setPath(e[0],e[e.length-1],!0);return}let t=[],n=(e,t)=>[(e[0]+t[0])/2,(e[1]+t[1])/2];t.push(e[0]);for(let r=1;r<e.length-1;r++){let i=r===1?e[0]:n(e[r-1],e[r]),a=e[r],o=r===e.length-2?e[r+1]:n(e[r],e[r+1]);for(let e=1;e<=12;e++){let n=e/12,r=1-n;t.push([r*r*i[0]+2*r*n*a[0]+n*n*o[0],r*r*i[1]+2*r*n*a[1]+n*n*o[1]])}}t.push(e[e.length-1]);let r=[0];for(let e=1;e<t.length;e++)r.push(r[e-1]+Math.hypot(t[e][0]-t[e-1][0],t[e][1]-t[e-1][1]));let i=r[r.length-1]||1,a=[],o=[],s=[],c=[];t.forEach((e,n)=>{let l=t[Math.max(0,n-1)],u=t[Math.min(t.length-1,n+1)],d=u[0]-l[0],f=u[1]-l[1],p=Math.hypot(d,f)||1;d/=p,f/=p;let m=-f,h=d,g=this.width/2,_=r[n]/i;if(a.push(e[0]+m*g,e[1]+h*g,0,e[0]-m*g,e[1]-h*g,0),o.push(m,h,0,-m,-h,0),s.push(0,_,1,_),n<t.length-1){let e=n*2;c.push(e,e+1,e+2,e+1,e+3,e+2)}});let l=new Rr;l.setAttribute(`position`,new Er(a,3)),l.setAttribute(`normal`,new Er(o,3)),l.setAttribute(`uv`,new Er(s,2)),l.setIndex(c),this.mesh.geometry.dispose(),this.mesh.geometry=l}set(e,t,n){let r=.2,i=Math.max(0,t-.4),a=this.mat.uniforms;a.uTime.value=n,e<r?(a.uDis.value=1-Cl(e/r),a.uRev.value=1):e<r+i?(a.uDis.value=0,a.uRev.value=1):(a.uDis.value=0,a.uRev.value=1-Cl(Math.min(1,(e-r-i)/r))),this.mesh.visible=e<2*r+i}phase(e,t,n){let r=this.mat.uniforms;r.uTime.value=n,r.uDis.value=e,r.uRev.value=t,this.mesh.visible=t>.001}showFull(e){let t=this.mat.uniforms;t.uTime.value=e,t.uDis.value=0,t.uRev.value=1,this.mesh.visible=!0}static total(e){return .4+Math.max(0,e-.4)}dispose(){this.mesh.geometry.dispose(),this.mat.dispose()}},Dl=`\r
\r
\r
\r
\r
	uniform vec4                _BaseColor;\r
	uniform vec4                _EdgeColor;\r
	uniform vec4                _HighlightColor;\r
	uniform float                _Radius;\r
	uniform float                _Bevel;\r
	uniform float                _FlatTile;\r
	uniform float                _TileSheen;\r
	uniform vec4                _AlternateColor;\r
	uniform float                _ArrivalFlash;\r
	uniform float                _OccupiedPress;\r
\r
in highp  vec2 vs_TEXCOORD0;\r
in highp  float vs_TEXCOORD1;\r
vec4 SV_Target0;\r
vec4 u_xlat0;\r
ivec2 u_xlati0;\r
vec4 u_xlat1;\r
bool u_xlatb1;\r
vec2 u_xlat2;\r
vec4 u_xlat3;\r
ivec2 u_xlati3;\r
vec4 u_xlat4;\r
vec3 u_xlat5;\r
float u_xlat6;\r
ivec3 u_xlati6;\r
vec3 u_xlat7;\r
bool u_xlatb7;\r
vec2 u_xlat10;\r
bool u_xlatb10;\r
float u_xlat11;\r
float u_xlat15;\r
float u_xlat16;\r
void unity_main()\r
{\r
    u_xlat0.xy = vs_TEXCOORD0.xy + vec2(-0.5, -0.5);\r
    u_xlat10.x = (-_Radius) + 0.5;\r
    u_xlat10.xy = (-u_xlat10.xx) + abs(u_xlat0.xy);\r
    u_xlat1.xy = max(u_xlat10.xy, vec2(0.0, 0.0));\r
    u_xlat11 = dot(u_xlat1.xy, u_xlat1.xy);\r
    u_xlat11 = sqrt(u_xlat11);\r
    u_xlat16 = max(u_xlat10.y, u_xlat10.x);\r
    u_xlat2.x = min(u_xlat16, 0.0);\r
    u_xlat11 = u_xlat11 + u_xlat2.x;\r
    u_xlat11 = u_xlat11 + (-_Radius);\r
    u_xlat2.x = dFdx(u_xlat11);\r
    u_xlat7.x = dFdy(u_xlat11);\r
    u_xlat2.x = abs(u_xlat7.x) + abs(u_xlat2.x);\r
    u_xlat2.x = u_xlat2.x * 1.5;\r
    u_xlat2.x = max(u_xlat2.x, 0.00100000005);\r
    u_xlat7.x = u_xlat2.x + u_xlat2.x;\r
    u_xlat2.x = u_xlat11 + u_xlat2.x;\r
    u_xlat7.x = float(1.0) / u_xlat7.x;\r
    u_xlat2.x = u_xlat7.x * u_xlat2.x;\r
    u_xlat2.x = clamp(u_xlat2.x, 0.0, 1.0);\r
    u_xlat7.x = u_xlat2.x * -2.0 + 3.0;\r
    u_xlat2.x = u_xlat2.x * u_xlat2.x;\r
    u_xlat2.xy = (-u_xlat7.xx) * u_xlat2.xx + vec2(1.0, 0.99000001);\r
    u_xlatb7 = u_xlat2.y<0.0;\r
    if(u_xlatb7){discard;}\r
    u_xlat11 = max((-u_xlat11), 0.0);\r
    u_xlatb7 = 0.5<_FlatTile;\r
    if(u_xlatb7){\r
        u_xlatb7 = vs_TEXCOORD1>=0.5;\r
        u_xlat7.x = u_xlatb7 ? 1.0 : float(0.0);\r
        u_xlat3.xyz = (-_BaseColor.xyz) + _AlternateColor.xyz;\r
        u_xlat7.xyz = u_xlat7.xxx * u_xlat3.xyz + _BaseColor.xyz;\r
        u_xlat1.xy = u_xlat1.xy + vec2(9.99999975e-06, 9.99999975e-06);\r
        u_xlat3.x = dot(u_xlat1.xy, u_xlat1.xy);\r
        u_xlat3.x = inversesqrt(u_xlat3.x);\r
        u_xlat1.xy = u_xlat1.xy * u_xlat3.xx;\r
        u_xlati3.xy = ivec2(uvec2(lessThan(vec4(0.0, 0.0, 0.0, 0.0), u_xlat0.xyxx).xy) * 0xFFFFFFFFu);\r
        u_xlati0.xy = ivec2(uvec2(lessThan(u_xlat0.xyxx, vec4(0.0, 0.0, 0.0, 0.0)).xy) * 0xFFFFFFFFu);\r
        u_xlati0.xy = (-u_xlati3.xy) + u_xlati0.xy;\r
        u_xlat0.xy = vec2(u_xlati0.xy);\r
        u_xlat0.xy = u_xlat0.xy * u_xlat1.xy;\r
        u_xlatb1 = u_xlat16<0.0;\r
        u_xlatb10 = u_xlat10.y<u_xlat10.x;\r
        u_xlat3 = vs_TEXCOORD0.xyxy + vec4(-0.5, -0.5, -0.300000012, -0.75999999);\r
        u_xlati6.xz = ivec2(uvec2(lessThan(vec4(0.0, 0.0, 0.0, 0.0), u_xlat3.xxyy).xz) * 0xFFFFFFFFu);\r
        u_xlati3.xy = ivec2(uvec2(lessThan(u_xlat3.xyxx, vec4(0.0, 0.0, 0.0, 0.0)).xy) * 0xFFFFFFFFu);\r
        u_xlati6.xz = (-u_xlati6.xz) + u_xlati3.xy;\r
        u_xlat4.y = float(0.0);\r
        u_xlat4.z = float(0.0);\r
        u_xlat4.xw = vec2(u_xlati6.xz);\r
        u_xlat10.xy = (bool(u_xlatb10)) ? u_xlat4.xy : u_xlat4.zw;\r
        u_xlat0.xy = (bool(u_xlatb1)) ? u_xlat10.xy : u_xlat0.xy;\r
        u_xlat10.x = max(_Bevel, 0.0149999997);\r
        u_xlat10.x = float(1.0) / u_xlat10.x;\r
        u_xlat10.x = u_xlat10.x * u_xlat11;\r
        u_xlat10.x = min(u_xlat10.x, 1.0);\r
        u_xlat15 = u_xlat10.x * -2.0 + 3.0;\r
        u_xlat10.x = u_xlat10.x * u_xlat10.x;\r
        u_xlat10.x = (-u_xlat15) * u_xlat10.x + 1.0;\r
        u_xlat15 = dot(u_xlat0.xy, vec2(-0.566528797, 0.824041903));\r
        u_xlat15 = clamp(u_xlat15, 0.0, 1.0);\r
        u_xlat0.x = dot(u_xlat0.xy, vec2(0.371390671, -0.928476691));\r
        u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);\r
        u_xlat5.x = vs_TEXCOORD0.y * 0.0649999976 + 0.939999998;\r
        u_xlat1.xyw = u_xlat5.xxx * u_xlat7.xyz;\r
        u_xlat0.x = u_xlat0.x * 0.280000001 + 0.319999993;\r
        u_xlat0.x = u_xlat0.x * u_xlat10.x;\r
        u_xlat7.xyz = (-u_xlat7.xyz) * u_xlat5.xxx + _EdgeColor.xyz;\r
        u_xlat1.xyw = u_xlat0.xxx * u_xlat7.xyz + u_xlat1.xyw;\r
        u_xlat0.x = u_xlat15 * u_xlat10.x;\r
        u_xlat0.x = u_xlat0.x * 0.230000004;\r
        u_xlat5.xyz = (-u_xlat1.xyw) + _HighlightColor.xyz;\r
        u_xlat0.xyz = u_xlat0.xxx * u_xlat5.xyz + u_xlat1.xyw;\r
        u_xlat1.xy = u_xlat3.zw * vec2(2.5, 3.0);\r
        u_xlat15 = dot(u_xlat1.xy, u_xlat1.xy);\r
        u_xlat15 = u_xlat15 * -1.44269502;\r
        u_xlat15 = exp2(u_xlat15);\r
        u_xlat1.xyw = vec3(u_xlat15) * _HighlightColor.xyz;\r
        u_xlat1.xyw = u_xlat1.xyw * vec3(vec3(_TileSheen, _TileSheen, _TileSheen));\r
        u_xlat0.xyz = u_xlat1.xyw * vec3(0.119999997, 0.119999997, 0.119999997) + u_xlat0.xyz;\r
    } else {\r
        u_xlat15 = float(1.0) / _Bevel;\r
        u_xlat15 = u_xlat15 * u_xlat11;\r
        u_xlat15 = clamp(u_xlat15, 0.0, 1.0);\r
        u_xlat1.x = u_xlat15 * -2.0 + 3.0;\r
        u_xlat15 = u_xlat15 * u_xlat15;\r
        u_xlat6 = u_xlat15 * u_xlat1.x;\r
        u_xlat16 = vs_TEXCOORD0.y + -0.449999988;\r
        u_xlat16 = u_xlat16 * 2.20000005;\r
        u_xlat16 = clamp(u_xlat16, 0.0, 1.0);\r
        u_xlat15 = (-u_xlat1.x) * u_xlat15 + 1.0;\r
        u_xlat1.x = u_xlat15 * u_xlat16;\r
        u_xlat1.x = u_xlat1.x * 0.800000012;\r
        u_xlat16 = (-vs_TEXCOORD0.y) + 0.540000021;\r
        u_xlat16 = u_xlat16 + u_xlat16;\r
        u_xlat16 = clamp(u_xlat16, 0.0, 1.0);\r
        u_xlat15 = u_xlat15 * u_xlat16;\r
        u_xlat7.xyz = _BaseColor.xyz + (-_EdgeColor.xyz);\r
        u_xlat7.xyz = vec3(u_xlat6) * u_xlat7.xyz + _EdgeColor.xyz;\r
        u_xlat3.xyz = (-u_xlat7.xyz) + _HighlightColor.xyz;\r
        u_xlat1.xyw = u_xlat1.xxx * u_xlat3.xyz + u_xlat7.xyz;\r
        u_xlat15 = u_xlat15 * 0.349999994;\r
        u_xlat7.xyz = (-u_xlat1.xyw) + _EdgeColor.xyz;\r
        u_xlat1.xyw = vec3(u_xlat15) * u_xlat7.xyz + u_xlat1.xyw;\r
        u_xlat7.xy = vec2(u_xlat11) + vec2(-0.0900000036, -0.239999995);\r
        u_xlat7.xy = u_xlat7.xy * vec2(6.66666698, 7.14285707);\r
        u_xlat7.xy = clamp(u_xlat7.xy, 0.0, 1.0);\r
        u_xlat3.xy = u_xlat7.xy * vec2(-2.0, -2.0) + vec2(3.0, 3.0);\r
        u_xlat7.xy = u_xlat7.xy * u_xlat7.xy;\r
        u_xlat15 = u_xlat7.x * u_xlat3.x;\r
        u_xlat7.x = (-u_xlat3.y) * u_xlat7.y + 1.0;\r
        u_xlat15 = u_xlat15 * u_xlat7.x;\r
        u_xlat7.xyz = vec3(u_xlat15) * _HighlightColor.xyz;\r
        u_xlat0.xyz = u_xlat7.xyz * vec3(0.100000001, 0.100000001, 0.100000001) + u_xlat1.xyw;\r
    }\r
    u_xlat15 = u_xlat11 * 15.3846159;\r
    u_xlat15 = min(u_xlat15, 1.0);\r
    u_xlat1.x = u_xlat15 * -2.0 + 3.0;\r
    u_xlat15 = u_xlat15 * u_xlat15;\r
    u_xlat15 = (-u_xlat1.x) * u_xlat15 + 1.0;\r
    u_xlat1.x = vs_TEXCOORD0.y * 1.39999998;\r
    u_xlat1.x = clamp(u_xlat1.x, 0.0, 1.0);\r
    u_xlat15 = u_xlat15 * u_xlat1.x;\r
    u_xlat15 = u_xlat15 * 0.239999995 + 0.0549999997;\r
    u_xlat15 = (-_OccupiedPress) * u_xlat15 + 1.0;\r
    u_xlat1.xyz = vec3(u_xlat15) * u_xlat0.xyz;\r
    u_xlat16 = _ArrivalFlash;\r
    u_xlat16 = clamp(u_xlat16, 0.0, 1.0);\r
    u_xlat16 = u_xlat16 * 0.280000001;\r
    u_xlat0.xyz = (-u_xlat0.xyz) * vec3(u_xlat15) + vec3(0.779999971, 0.829999983, 1.0);\r
    u_xlat0.xyz = vec3(u_xlat16) * u_xlat0.xyz + u_xlat1.xyz;\r
    u_xlat0.w = u_xlat2.x * _BaseColor.w;\r
    SV_Target0 = u_xlat0;\r
    return;\r
}\r
\r

#ifndef POST_HOOK
#define POST_HOOK
#endif
layout(location = 0) out highp vec4 cwjFragColor;
void main() { unity_main(); POST_HOOK cwjFragColor = linearToOutputTexel(SV_Target0); }
`,Ol=`\r
\r
\r
\r
uniform 	vec2 _GlobalMipBias;\r
\r
	uniform vec4                _Distance_TexelSize;\r
	uniform vec4                _Span;\r
	uniform vec4                _BaseColor;\r
	uniform vec4                _EdgeColor;\r
	uniform vec4                _HighlightColor;\r
	uniform vec4                _ShadowColor;\r
	uniform float                _Bevel;\r
	uniform float                _Height;\r
	uniform float                _Gloss;\r
	uniform float                _ShadowSoftness;\r
	uniform float                _ObstacleLayer;\r
	uniform float                _SourceRow;\r
\r
uniform mediump sampler2D _Distance;\r
in highp  vec2 vs_TEXCOORD0;\r
vec4 SV_Target0;\r
vec3 u_xlat0;\r
mediump vec2 u_xlat16_0;\r
vec4 u_xlat1;\r
mediump vec2 u_xlat16_1;\r
vec4 u_xlat2;\r
mediump vec4 u_xlat16_2;\r
vec4 u_xlat3;\r
mediump vec2 u_xlat16_3;\r
ivec2 u_xlati3;\r
uvec4 u_xlatu3;\r
bool u_xlatb3;\r
vec3 u_xlat4;\r
vec3 u_xlat5;\r
vec3 u_xlat6;\r
mediump vec2 u_xlat16_6;\r
vec3 u_xlat7;\r
float u_xlat8;\r
float u_xlat9;\r
mediump vec2 u_xlat16_9;\r
vec2 u_xlat12;\r
mediump vec2 u_xlat16_12;\r
vec2 u_xlat13;\r
mediump vec2 u_xlat16_13;\r
float u_xlat14;\r
mediump vec2 u_xlat16_14;\r
bool u_xlatb14;\r
float u_xlat15;\r
ivec2 u_xlati15;\r
float u_xlat18;\r
float u_xlat19;\r
float u_xlat20;\r
bool u_xlatb20;\r
void unity_main()\r
{\r
    u_xlat0.x = float(0.0);\r
    u_xlat12.y = float(0.0);\r
    u_xlat0.y = _Height;\r
    u_xlat0.xy = u_xlat0.xy / _Span.xy;\r
    u_xlat1.xy = (-u_xlat0.xy) + vs_TEXCOORD0.xy;\r
    u_xlat16_13.xy = texture(_Distance, u_xlat1.xy, _GlobalMipBias.x).xy;\r
    u_xlat19 = (-u_xlat16_13.x) + u_xlat16_13.y;\r
    u_xlat13.x = _ObstacleLayer * u_xlat19 + u_xlat16_13.x;\r
    u_xlat19 = dFdx(u_xlat13.x);\r
    u_xlat2.x = dFdy(u_xlat13.x);\r
    u_xlat19 = abs(u_xlat19) + abs(u_xlat2.x);\r
    u_xlat13.y = max(u_xlat19, 0.00200000009);\r
    u_xlat2.xy = u_xlat13.yy + u_xlat13.yx;\r
    u_xlat2.x = float(1.0) / u_xlat2.x;\r
    u_xlat8 = u_xlat2.x * u_xlat2.y;\r
    u_xlat8 = clamp(u_xlat8, 0.0, 1.0);\r
    u_xlat14 = u_xlat8 * -2.0 + 3.0;\r
    u_xlat8 = u_xlat8 * u_xlat8;\r
    u_xlat8 = (-u_xlat14) * u_xlat8 + 1.0;\r
    u_xlat16_14.xy = texture(_Distance, vs_TEXCOORD0.xy, _GlobalMipBias.x).xy;\r
    u_xlat20 = (-u_xlat16_14.x) + u_xlat16_14.y;\r
    u_xlat14 = _ObstacleLayer * u_xlat20 + u_xlat16_14.x;\r
    u_xlatb20 = -999.0<_SourceRow;\r
    if(u_xlatb20){\r
        u_xlatb20 = 0.0>=u_xlat13.x;\r
        u_xlatb3 = u_xlat14<u_xlat13.x;\r
        u_xlat3.xy = (bool(u_xlatb3)) ? vs_TEXCOORD0.xy : u_xlat1.xy;\r
        u_xlat3.xy = (bool(u_xlatb20)) ? u_xlat1.xy : u_xlat3.xy;\r
        u_xlat3.xy = u_xlat3.xy * _Distance_TexelSize.zw;\r
        u_xlati3.xy = ivec2(u_xlat3.xy);\r
        u_xlati15.xy = ivec2(_Distance_TexelSize.zw);\r
        u_xlati15.xy = u_xlati15.xy + ivec2(int(0xFFFFFFFFu), int(0xFFFFFFFFu));\r
        u_xlati3.xy = max(u_xlati3.xy, ivec2(0, 0));\r
        u_xlatu3.xy =  uvec2(min(u_xlati15.xy, u_xlati3.xy));\r
        u_xlatu3.z = uint(uint(0u));\r
        u_xlatu3.w = uint(uint(0u));\r
        u_xlat3.xy = texelFetch(_Distance, ivec2(u_xlatu3.xy), int(u_xlatu3.w)).zw;\r
        u_xlatb20 = 0.5<_ObstacleLayer;\r
        u_xlat20 = (u_xlatb20) ? u_xlat3.x : u_xlat3.y;\r
        u_xlat20 = u_xlat20 + (-_SourceRow);\r
        u_xlat20 = -abs(u_xlat20) + 0.25;\r
        u_xlatb20 = u_xlat20<0.0;\r
        if(u_xlatb20){discard;}\r
    }\r
    u_xlat20 = min(u_xlat13.x, u_xlat14);\r
    u_xlat3 = (-u_xlat0.xyxy) * vec4(0.25, 0.25, 0.5, 0.5) + vs_TEXCOORD0.xyxy;\r
    u_xlat16_3.xy = texture(_Distance, u_xlat3.xy, _GlobalMipBias.x).xy;\r
    u_xlat9 = (-u_xlat16_3.x) + u_xlat16_3.y;\r
    u_xlat3.x = _ObstacleLayer * u_xlat9 + u_xlat16_3.x;\r
    u_xlat16_9.xy = texture(_Distance, u_xlat3.zw, _GlobalMipBias.x).xy;\r
    u_xlat15 = (-u_xlat16_9.x) + u_xlat16_9.y;\r
    u_xlat9 = _ObstacleLayer * u_xlat15 + u_xlat16_9.x;\r
    u_xlat0.xy = (-u_xlat0.xy) * vec2(0.75, 0.75) + vs_TEXCOORD0.xy;\r
    u_xlat16_0.xy = texture(_Distance, u_xlat0.xy, _GlobalMipBias.x).xy;\r
    u_xlat6.x = (-u_xlat16_0.x) + u_xlat16_0.y;\r
    u_xlat0.x = _ObstacleLayer * u_xlat6.x + u_xlat16_0.x;\r
    u_xlat0.x = min(u_xlat0.x, u_xlat9);\r
    u_xlat0.x = min(u_xlat0.x, u_xlat3.x);\r
    u_xlat0.x = min(u_xlat0.x, u_xlat20);\r
    u_xlat0.x = u_xlat13.y + u_xlat0.x;\r
    u_xlat0.x = u_xlat2.x * u_xlat0.x;\r
    u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);\r
    u_xlat6.x = u_xlat0.x * -2.0 + 3.0;\r
    u_xlat0.x = u_xlat0.x * u_xlat0.x;\r
    u_xlat0.x = (-u_xlat6.x) * u_xlat0.x + 1.0;\r
    u_xlat12.x = _Distance_TexelSize.x;\r
    u_xlat2.xw = u_xlat12.xy + u_xlat1.xy;\r
    u_xlat16_2.xw = texture(_Distance, u_xlat2.xw, _GlobalMipBias.x).xy;\r
    u_xlat6.x = (-u_xlat16_2.x) + u_xlat16_2.w;\r
    u_xlat6.x = _ObstacleLayer * u_xlat6.x + u_xlat16_2.x;\r
    u_xlat12.xy = (-u_xlat12.xy) + u_xlat1.xy;\r
    u_xlat16_12.xy = texture(_Distance, u_xlat12.xy, _GlobalMipBias.x).xy;\r
    u_xlat18 = (-u_xlat16_12.x) + u_xlat16_12.y;\r
    u_xlat12.x = _ObstacleLayer * u_xlat18 + u_xlat16_12.x;\r
    u_xlat6.x = (-u_xlat12.x) + u_xlat6.x;\r
    u_xlat12.xy = _Distance_TexelSize.xy * _Span.xy;\r
    u_xlat3.x = u_xlat6.x / u_xlat12.x;\r
    u_xlat4.x = 0.0;\r
    u_xlat4.y = _Distance_TexelSize.y;\r
    u_xlat6.xy = u_xlat1.xy + u_xlat4.xy;\r
    u_xlat16_6.xy = texture(_Distance, u_xlat6.xy, _GlobalMipBias.x).xy;\r
    u_xlat12.x = (-u_xlat16_6.x) + u_xlat16_6.y;\r
    u_xlat6.x = _ObstacleLayer * u_xlat12.x + u_xlat16_6.x;\r
    u_xlat1.xy = u_xlat1.xy + (-u_xlat4.xy);\r
    u_xlat16_1.xy = texture(_Distance, u_xlat1.xy, _GlobalMipBias.x).xy;\r
    u_xlat12.x = (-u_xlat16_1.x) + u_xlat16_1.y;\r
    u_xlat12.x = _ObstacleLayer * u_xlat12.x + u_xlat16_1.x;\r
    u_xlat6.x = (-u_xlat12.x) + u_xlat6.x;\r
    u_xlat3.y = u_xlat6.x / u_xlat12.y;\r
    u_xlat6.x = dot(u_xlat3.xy, u_xlat3.xy);\r
    u_xlat6.x = sqrt(u_xlat6.x);\r
    u_xlat6.x = max(u_xlat6.x, 9.99999975e-05);\r
    u_xlat6.xy = u_xlat3.xy / u_xlat6.xx;\r
    u_xlat18 = max((-u_xlat13.x), 0.0);\r
    u_xlat1.xy = max(vec2(_Bevel, _Height), vec2(0.00100000005, 0.00999999978));\r
    u_xlat1.x = u_xlat18 / u_xlat1.x;\r
    u_xlat1.x = (-u_xlat1.x) + 1.0;\r
    u_xlat1.x = max(u_xlat1.x, 0.0);\r
    u_xlat13.x = u_xlat1.x * u_xlat1.x;\r
    u_xlat1.x = (-u_xlat1.x) * 2.0 + 3.0;\r
    u_xlat1.x = u_xlat1.x * u_xlat13.x;\r
    u_xlat3.xy = u_xlat6.xy * u_xlat1.xx;\r
    u_xlat13.x = (-u_xlat1.x) * u_xlat1.x + 1.0;\r
    u_xlat13.x = max(u_xlat13.x, 0.00100000005);\r
    u_xlat3.z = sqrt(u_xlat13.x);\r
    u_xlat13.x = dot(u_xlat3.xyz, u_xlat3.xyz);\r
    u_xlat13.x = inversesqrt(u_xlat13.x);\r
    u_xlat3.xyz = u_xlat13.xxx * u_xlat3.xyz;\r
    u_xlat13.x = dot(u_xlat3.xyz, vec3(-0.625778675, 0.257673562, 0.736210167));\r
    u_xlat13.x = clamp(u_xlat13.x, 0.0, 1.0);\r
    u_xlat13.x = u_xlat13.x * 0.239999995 + 0.819999993;\r
    u_xlat4.xyz = u_xlat13.xxx * _BaseColor.xyz;\r
    u_xlat19 = dot(u_xlat6.xy, vec2(-0.940376222, 0.340136081));\r
    u_xlat19 = clamp(u_xlat19, 0.0, 1.0);\r
    u_xlat2.x = (-u_xlat19) + 1.0;\r
    u_xlat2.x = u_xlat1.x * u_xlat2.x;\r
    u_xlat2.x = u_xlat2.x * 0.479999989;\r
    u_xlat5.xyz = (-_BaseColor.xyz) * u_xlat13.xxx + _EdgeColor.xyz;\r
    u_xlat4.xyz = u_xlat2.xxx * u_xlat5.xyz + u_xlat4.xyz;\r
    u_xlat1.x = u_xlat19 * u_xlat1.x;\r
    u_xlat1.x = u_xlat1.x * 0.620000005;\r
    u_xlat5.xyz = (-u_xlat4.xyz) + _HighlightColor.xyz;\r
    u_xlat1.xzw = u_xlat1.xxx * u_xlat5.xyz + u_xlat4.xyz;\r
    u_xlat2.x = dot(u_xlat3.xyz, vec3(-0.335818499, 0.138278201, 0.931721509));\r
    u_xlat2.x = clamp(u_xlat2.x, 0.0, 1.0);\r
    u_xlat2.x = log2(u_xlat2.x);\r
    u_xlat2.x = u_xlat2.x * 24.0;\r
    u_xlat2.x = exp2(u_xlat2.x);\r
    u_xlat3.xyz = u_xlat2.xxx * _HighlightColor.xyz;\r
    u_xlat3.xyz = u_xlat3.xyz * vec3(vec3(_Gloss, _Gloss, _Gloss));\r
    u_xlat1.xzw = u_xlat3.xyz * vec3(0.180000007, 0.180000007, 0.180000007) + u_xlat1.xzw;\r
    u_xlat2.x = _Bevel * 0.239999995;\r
    u_xlat18 = (-_Bevel) * 0.419999987 + u_xlat18;\r
    u_xlat2.x = max(u_xlat2.x, 0.0149999997);\r
    u_xlat18 = u_xlat18 / u_xlat2.x;\r
    u_xlat18 = u_xlat18 * u_xlat18;\r
    u_xlat18 = u_xlat18 * -1.44269502;\r
    u_xlat18 = exp2(u_xlat18);\r
    u_xlat6.x = dot(u_xlat6.xy, vec2(-0.984183311, 0.177152991));\r
    u_xlat6.x = clamp(u_xlat6.x, 0.0, 1.0);\r
    u_xlat12.x = u_xlat6.x * u_xlat6.x;\r
    u_xlat6.x = u_xlat12.x * u_xlat6.x;\r
    u_xlat6.x = u_xlat6.x * u_xlat18;\r
    u_xlat6.x = u_xlat6.x * _Gloss;\r
    u_xlat6.x = u_xlat6.x * 1.25;\r
    u_xlat3.xyz = (-u_xlat1.xzw) + _HighlightColor.xyz;\r
    u_xlat6.xyz = u_xlat6.xxx * u_xlat3.xyz + u_xlat1.xzw;\r
    u_xlat1.x = u_xlat14 + 0.0250000004;\r
    u_xlat1.x = u_xlat1.x / u_xlat1.y;\r
    u_xlat1.x = clamp(u_xlat1.x, 0.0, 1.0);\r
    u_xlat7.xyz = _EdgeColor.xyz * vec3(0.899999976, 0.899999976, 0.899999976);\r
    u_xlat2.xzw = _BaseColor.xyz * vec3(0.649999976, 0.649999976, 0.649999976) + (-u_xlat7.xyz);\r
    u_xlat1.xyz = u_xlat1.xxx * u_xlat2.xzw + u_xlat7.xyz;\r
    u_xlat2.xz = vec2(-0.0250000004, 0.0500000007) / _Span.xy;\r
    u_xlat2.xz = u_xlat2.xz + vs_TEXCOORD0.xy;\r
    u_xlat16_2.xz = texture(_Distance, u_xlat2.xz, _GlobalMipBias.x).xy;\r
    u_xlat19 = (-u_xlat16_2.x) + u_xlat16_2.z;\r
    u_xlat19 = _ObstacleLayer * u_xlat19 + u_xlat16_2.x;\r
    u_xlat2.x = _ShadowSoftness + 0.0149999997;\r
    u_xlat19 = u_xlat19 + 0.0149999997;\r
    u_xlat2.x = float(1.0) / u_xlat2.x;\r
    u_xlat19 = u_xlat19 * u_xlat2.x;\r
    u_xlat19 = clamp(u_xlat19, 0.0, 1.0);\r
    u_xlat2.x = u_xlat19 * -2.0 + 3.0;\r
    u_xlat19 = u_xlat19 * u_xlat19;\r
    u_xlat19 = (-u_xlat2.x) * u_xlat19 + 1.0;\r
    u_xlat19 = u_xlat19 * _ShadowColor.w;\r
    u_xlat2.x = (-u_xlat0.x) + 1.0;\r
    u_xlat3.w = u_xlat19 * u_xlat2.x + u_xlat0.x;\r
    u_xlat14 = u_xlat3.w + -0.00499999989;\r
    u_xlatb14 = u_xlat14<0.0;\r
    if(u_xlatb14){discard;}\r
    u_xlat6.xyz = u_xlat6.xyz + (-u_xlat1.xyz);\r
    u_xlat6.xyz = vec3(u_xlat8) * u_xlat6.xyz + u_xlat1.xyz;\r
    u_xlat1.xyz = vec3(u_xlat19) * _ShadowColor.xyz;\r
    u_xlat1.xyz = u_xlat2.xxx * u_xlat1.xyz;\r
    u_xlat0.xyz = u_xlat6.xyz * u_xlat0.xxx + u_xlat1.xyz;\r
    u_xlat18 = max(u_xlat3.w, 0.00100000005);\r
    u_xlat3.xyz = u_xlat0.xyz / vec3(u_xlat18);\r
    SV_Target0 = u_xlat3;\r
    return;\r
}\r
\r

#ifndef POST_HOOK
#define POST_HOOK
#endif
layout(location = 0) out highp vec4 cwjFragColor;
void main() { unity_main(); POST_HOOK cwjFragColor = linearToOutputTexel(SV_Target0); }
`,kl=`\r
\r
\r
\r
\r
	uniform vec4                _BaseColor;\r
	uniform vec4                _ArrowColor;\r
	uniform float                _Brightness;\r
	uniform float                _Saturation;\r
	uniform float                _Highlight;\r
	uniform float                _HeadVisibility;\r
	uniform float                _RimDarkness;\r
	uniform float                _GateFade;\r
\r
in highp  vec2 vs_TEXCOORD0;\r
in highp  vec2 vs_TEXCOORD1;\r
in highp  float vs_TEXCOORD2;\r
vec4 SV_Target0;\r
vec4 u_xlat0;\r
bool u_xlatb0;\r
vec4 u_xlat1;\r
bool u_xlatb1;\r
vec4 u_xlat2;\r
vec4 u_xlat3;\r
vec4 u_xlat4;\r
vec4 u_xlat5;\r
vec4 u_xlat6;\r
vec3 u_xlat7;\r
float u_xlat8;\r
int u_xlati8;\r
vec3 u_xlat9;\r
vec2 u_xlat10;\r
bool u_xlatb10;\r
vec3 u_xlat11;\r
vec3 u_xlat12;\r
vec2 u_xlat16;\r
vec2 u_xlat17;\r
vec2 u_xlat18;\r
int u_xlati18;\r
vec2 u_xlat19;\r
float u_xlat20;\r
float u_xlat24;\r
int u_xlati24;\r
float u_xlat25;\r
float u_xlat26;\r
void unity_main()\r
{\r
    u_xlat0.xyw = vs_TEXCOORD0.xyy * vec3(1.0, 0.800000012, 3.07692313) + vec3(0.0, -0.400000006, -0.973076999);\r
    u_xlat1 = u_xlat0.xyxy + vec4(-0.5, -0.0350000001, -0.5, 0.0450000018);\r
    u_xlat1 = abs(u_xlat1) + vec4(-0.319999993, -0.165000007, -0.324999988, -0.194999993);\r
    u_xlat2 = max(u_xlat1, vec4(0.0, 0.0, 0.0, 0.0));\r
    u_xlat1.xy = max(u_xlat1.yw, u_xlat1.xz);\r
    u_xlat1.xy = min(u_xlat1.xy, vec2(0.0, 0.0));\r
    u_xlat17.x = dot(u_xlat2.zw, u_xlat2.zw);\r
    u_xlat17.y = dot(u_xlat2.xy, u_xlat2.xy);\r
    u_xlat17.xy = sqrt(u_xlat17.xy);\r
    u_xlat1.xy = u_xlat1.xy + u_xlat17.yx;\r
    u_xlat1.xy = u_xlat1.xy + vec2(-0.135000005, -0.119999997);\r
    u_xlat17.x = dFdx(u_xlat1.x);\r
    u_xlat25 = dFdy(u_xlat1.x);\r
    u_xlat17.x = abs(u_xlat25) + abs(u_xlat17.x);\r
    u_xlat1.z = max(u_xlat17.x, 0.00200000009);\r
    u_xlat9.xz = u_xlat1.zz + u_xlat1.yz;\r
    u_xlat25 = float(1.0) / u_xlat9.z;\r
    u_xlat9.x = u_xlat25 * u_xlat9.x;\r
    u_xlat9.x = clamp(u_xlat9.x, 0.0, 1.0);\r
    u_xlat2.x = u_xlat9.x * -2.0 + 3.0;\r
    u_xlat9.x = u_xlat9.x * u_xlat9.x;\r
    u_xlat9.x = (-u_xlat2.x) * u_xlat9.x + 1.0;\r
    u_xlat9.x = u_xlat9.x * vs_TEXCOORD2;\r
    u_xlat2.x = u_xlat1.z + u_xlat1.x;\r
    u_xlat2.x = u_xlat25 * u_xlat2.x;\r
    u_xlat2.x = clamp(u_xlat2.x, 0.0, 1.0);\r
    u_xlat10.x = u_xlat2.x * -2.0 + 3.0;\r
    u_xlat2.x = u_xlat2.x * u_xlat2.x;\r
    u_xlat2.x = (-u_xlat10.x) * u_xlat2.x + 1.0;\r
    u_xlat9.x = max(u_xlat9.x, u_xlat2.x);\r
    u_xlat10.x = u_xlat9.x + -0.00999999978;\r
    u_xlatb10 = u_xlat10.x<0.0;\r
    if(u_xlatb10){discard;}\r
    u_xlat3 = u_xlat0.xyxy + vec4(-0.493999988, -0.0350000001, -0.5, -0.0289999992);\r
    u_xlat3 = abs(u_xlat3) + vec4(-0.319999993, -0.165000007, -0.319999993, -0.165000007);\r
    u_xlat4 = max(u_xlat3, vec4(0.0, 0.0, 0.0, 0.0));\r
    u_xlat10.xy = max(u_xlat3.yw, u_xlat3.xz);\r
    u_xlat10.xy = min(u_xlat10.xy, vec2(0.0, 0.0));\r
    u_xlat26 = dot(u_xlat4.xy, u_xlat4.xy);\r
    u_xlat3.x = dot(u_xlat4.zw, u_xlat4.zw);\r
    u_xlat3.x = sqrt(u_xlat3.x);\r
    u_xlat18.x = u_xlat10.y + u_xlat3.x;\r
    u_xlat3.y = (-u_xlat1.x) + u_xlat18.x;\r
    u_xlat18.x = sqrt(u_xlat26);\r
    u_xlat10.x = u_xlat10.x + u_xlat18.x;\r
    u_xlat10.x = u_xlat10.x + -0.135000005;\r
    u_xlat3.x = (-u_xlat1.x) + u_xlat10.x;\r
    u_xlat10.xy = (-u_xlat1.xx) + vec2(-0.00800000038, -0.0250000004);\r
    u_xlat10.xy = u_xlat10.xy * vec2(9.8039217, 27.0270271);\r
    u_xlat10.xy = clamp(u_xlat10.xy, 0.0, 1.0);\r
    u_xlat3.xy = u_xlat3.xy + vec2(9.99999997e-07, -0.134999007);\r
    u_xlat1.x = dot(u_xlat3.xy, u_xlat3.xy);\r
    u_xlat1.x = inversesqrt(u_xlat1.x);\r
    u_xlat3.xy = u_xlat1.xx * u_xlat3.xy;\r
    u_xlat1.x = dot(vs_TEXCOORD1.xy, vs_TEXCOORD1.xy);\r
    u_xlat1.x = inversesqrt(u_xlat1.x);\r
    u_xlat19.xy = u_xlat1.xx * vs_TEXCOORD1.xy;\r
    u_xlat1.x = dot(u_xlat3.xy, u_xlat19.xy);\r
    u_xlat26 = u_xlat1.x;\r
    u_xlat26 = clamp(u_xlat26, 0.0, 1.0);\r
    u_xlat1.x = (-u_xlat1.x);\r
    u_xlat1.x = clamp(u_xlat1.x, 0.0, 1.0);\r
    u_xlat3.x = u_xlat26 * 0.100000001 + 0.899999976;\r
    u_xlat11.xy = u_xlat10.xy * vec2(-2.0, -2.0) + vec2(3.0, 3.0);\r
    u_xlat10.xy = u_xlat10.xy * u_xlat10.xy;\r
    u_xlat10.xy = (-u_xlat11.xy) * u_xlat10.xy + vec2(1.0, 1.0);\r
    u_xlat26 = u_xlat26 * u_xlat10.x;\r
    u_xlat26 = u_xlat26 * 0.300000012;\r
    u_xlat1.x = u_xlat1.x * u_xlat10.x;\r
    u_xlat1.x = u_xlat1.x * 0.600000024;\r
    u_xlat10.x = max(_BaseColor.y, _BaseColor.x);\r
    u_xlat10.x = max(u_xlat10.x, _BaseColor.z);\r
    u_xlat11.x = min(_BaseColor.y, _BaseColor.x);\r
    u_xlat11.x = min(u_xlat11.x, _BaseColor.z);\r
    u_xlat10.x = u_xlat10.x + (-u_xlat11.x);\r
    u_xlat11.x = u_xlat11.x * _Saturation;\r
    u_xlat10.x = u_xlat10.x + -0.0399999991;\r
    u_xlat10.x = u_xlat10.x * 8.33333397;\r
    u_xlat10.x = clamp(u_xlat10.x, 0.0, 1.0);\r
    u_xlat19.x = u_xlat10.x * -2.0 + 3.0;\r
    u_xlat10.x = u_xlat10.x * u_xlat10.x;\r
    u_xlat10.x = u_xlat10.x * u_xlat19.x;\r
    u_xlat11.xyz = (-u_xlat11.xxx) * u_xlat10.xxx + _BaseColor.xyz;\r
    u_xlat11.xyz = clamp(u_xlat11.xyz, 0.0, 1.0);\r
    u_xlat11.xyz = u_xlat11.xyz * vec3(_Brightness) + vec3(-0.479999989, -0.699999988, -0.819999993);\r
    u_xlat10.x = _HeadVisibility;\r
    u_xlat10.x = clamp(u_xlat10.x, 0.0, 1.0);\r
    u_xlat11.xyz = u_xlat10.xxx * u_xlat11.xyz + vec3(0.479999989, 0.699999988, 0.819999993);\r
    u_xlat4.xyz = vs_TEXCOORD0.yyx + vec3(-0.5, -0.5, -0.310000002);\r
    u_xlat4.xy = u_xlat4.yx * vec2(0.0720000044, 0.800000012) + vec2(0.939999998, -0.219999999);\r
    u_xlat20 = u_xlat4.z * 4.347826;\r
    u_xlat20 = u_xlat20 * u_xlat20;\r
    u_xlat5.xyz = u_xlat11.xyz * u_xlat4.xxx;\r
    u_xlat4.x = u_xlat4.y * 18.181818;\r
    u_xlat4.x = (-u_xlat4.x) * u_xlat4.x + (-u_xlat20);\r
    u_xlat4.x = u_xlat4.x * 1.44269502;\r
    u_xlat4.x = exp2(u_xlat4.x);\r
    u_xlat12.xyz = u_xlat11.xyz * vec3(0.479999989, 0.479999989, 0.479999989) + (-u_xlat5.xyz);\r
    u_xlat12.xyz = u_xlat1.xxx * u_xlat12.xyz + u_xlat5.xyz;\r
    u_xlat5.xyz = (-u_xlat11.xyz) + vec3(1.0, 1.0, 1.0);\r
    u_xlat5.xyz = u_xlat5.xyz * vec3(0.180000007, 0.180000007, 0.180000007) + u_xlat11.xyz;\r
    u_xlat5.xyz = (-u_xlat12.xyz) + u_xlat5.xyz;\r
    u_xlat12.xyz = vec3(u_xlat26) * u_xlat5.xyz + u_xlat12.xyz;\r
    u_xlat1.x = (-_RimDarkness) + 1.0;\r
    u_xlat5.xyz = u_xlat1.xxx * u_xlat11.xyz;\r
    u_xlat5.xyz = u_xlat5.xyz * u_xlat3.xxx + (-u_xlat12.xyz);\r
    u_xlat12.xyz = u_xlat10.yyy * u_xlat5.xyz + u_xlat12.xyz;\r
    u_xlat1.x = (-u_xlat10.y) + 1.0;\r
    u_xlat5.xyz = (-u_xlat12.xyz) + vec3(1.0, 1.0, 1.0);\r
    u_xlat18.x = max(_Highlight, 0.219999999);\r
    u_xlat18.x = u_xlat18.x * u_xlat4.x;\r
    u_xlat18.x = u_xlat18.x * 1.5;\r
    u_xlat1.x = u_xlat1.x * u_xlat18.x;\r
    u_xlat4.xyz = u_xlat1.xxx * u_xlat5.xyz + u_xlat12.xyz;\r
    u_xlat5 = u_xlat0.xyxy + vec4(-0.5, 0.337000012, -0.508000016, 0.147);\r
    u_xlat18.xy = abs(u_xlat5.xy) + vec2(-0.167999998, -0.00799999759);\r
    u_xlat5.xy = max(u_xlat18.xy, vec2(0.0, 0.0));\r
    u_xlat1.x = max(u_xlat18.y, u_xlat18.x);\r
    u_xlat1.x = min(u_xlat1.x, 0.0);\r
    u_xlat18.x = dot(u_xlat5.xy, u_xlat5.xy);\r
    u_xlat18.x = sqrt(u_xlat18.x);\r
    u_xlat1.x = u_xlat1.x + u_xlat18.x;\r
    u_xlat1.x = u_xlat1.z + u_xlat1.x;\r
    u_xlat1.x = u_xlat1.x + -0.0320000015;\r
    u_xlat1.x = u_xlat25 * u_xlat1.x;\r
    u_xlat1.x = clamp(u_xlat1.x, 0.0, 1.0);\r
    u_xlat18.x = u_xlat1.x * -2.0 + 3.0;\r
    u_xlat1.x = u_xlat1.x * u_xlat1.x;\r
    u_xlat1.x = (-u_xlat18.x) * u_xlat1.x + 1.0;\r
    u_xlat6.xyz = u_xlat1.xxx * u_xlat11.xyz;\r
    u_xlat7.xyz = u_xlat11.xyz * vec3(0.479999989, 0.479999989, 0.479999989);\r
    u_xlat6.xyz = u_xlat6.xyz * vec3(-0.25999999, -0.25999999, -0.25999999) + u_xlat7.xyz;\r
    u_xlat4.xyz = u_xlat4.xyz + (-u_xlat6.xyz);\r
    u_xlat4.xyz = u_xlat2.xxx * u_xlat4.xyz + u_xlat6.xyz;\r
    u_xlat3.xyz = u_xlat11.xyz * vec3(0.379999995, 0.379999995, 0.379999995) + (-u_xlat4.xyz);\r
    u_xlat1.x = u_xlat5.z * 2.63157892;\r
    u_xlat0.z = abs(u_xlat1.x);\r
    u_xlat1.x = u_xlat5.w * 3.84615397 + u_xlat0.z;\r
    u_xlat18.x = (-u_xlat5.w) * 3.84615397 + u_xlat0.z;\r
    u_xlat26 = max(u_xlat1.x, 0.0);\r
    u_xlatb1 = 1.0>=u_xlat1.x;\r
    u_xlat5.xy = (-vec2(u_xlat26)) * vec2(0.5, 0.5) + u_xlat0.zw;\r
    u_xlat6 = u_xlat0.zwzw + vec4(-0.25, -0.75, -0.0, -1.0);\r
    u_xlat0.xy = u_xlat0.xy + vec2(-0.5, 0.125);\r
    u_xlat16.x = dot(u_xlat5.xy, u_xlat5.xy);\r
    u_xlat24 = dot(u_xlat6.zw, u_xlat6.zw);\r
    u_xlat26 = dot(u_xlat6.xy, u_xlat6.xy);\r
    u_xlat26 = sqrt(u_xlat26);\r
    u_xlat26 = u_xlat26 + -0.353553385;\r
    u_xlat26 = u_xlat26 * 0.25999999 + -0.0120000001;\r
    u_xlat16.x = min(u_xlat16.x, u_xlat24);\r
    u_xlat16.x = sqrt(u_xlat16.x);\r
    u_xlati24 = int((0.0<u_xlat18.x) ? 0xFFFFFFFFu : uint(0));\r
    u_xlati18 = int((u_xlat18.x<0.0) ? 0xFFFFFFFFu : uint(0));\r
    u_xlati24 = (-u_xlati24) + u_xlati18;\r
    u_xlat24 = float(u_xlati24);\r
    u_xlat16.x = u_xlat24 * u_xlat16.x;\r
    u_xlat16.x = u_xlat16.x * 0.25999999 + -0.0120000001;\r
    u_xlat16.x = (u_xlatb1) ? u_xlat16.x : u_xlat26;\r
    u_xlat16.x = u_xlat1.z + u_xlat16.x;\r
    u_xlat16.x = u_xlat25 * u_xlat16.x;\r
    u_xlat16.x = clamp(u_xlat16.x, 0.0, 1.0);\r
    u_xlat24 = u_xlat16.x * -2.0 + 3.0;\r
    u_xlat16.x = u_xlat16.x * u_xlat16.x;\r
    u_xlat16.x = (-u_xlat24) * u_xlat16.x + 1.0;\r
    u_xlat0.z = u_xlat2.x * u_xlat16.x;\r
    u_xlat0.xz = u_xlat0.xz * vec2(2.63157892, 0.649999976);\r
    u_xlat3.xyz = u_xlat0.zzz * u_xlat3.xyz + u_xlat4.xyz;\r
    u_xlat4.xyz = (-u_xlat3.xyz) + _ArrowColor.xyz;\r
    u_xlat5.x = abs(u_xlat0.x);\r
    u_xlat0.x = u_xlat0.y * 3.84615397 + u_xlat5.x;\r
    u_xlat8 = (-u_xlat0.y) * 3.84615397 + u_xlat5.x;\r
    u_xlat16.x = max(u_xlat0.x, 0.0);\r
    u_xlatb0 = 1.0>=u_xlat0.x;\r
    u_xlat5.y = vs_TEXCOORD0.y * 3.07692313 + -1.05769241;\r
    u_xlat16.xy = (-u_xlat16.xx) * vec2(0.5, 0.5) + u_xlat5.xy;\r
    u_xlat5 = u_xlat5.xyxy + vec4(-0.25, -0.75, -0.0, -1.0);\r
    u_xlat16.x = dot(u_xlat16.xy, u_xlat16.xy);\r
    u_xlat24 = dot(u_xlat5.zw, u_xlat5.zw);\r
    u_xlat1.x = dot(u_xlat5.xy, u_xlat5.xy);\r
    u_xlat1.x = sqrt(u_xlat1.x);\r
    u_xlat1.x = u_xlat1.x + -0.353553385;\r
    u_xlat1.x = u_xlat1.x * 0.25999999 + -0.0120000001;\r
    u_xlat16.x = min(u_xlat16.x, u_xlat24);\r
    u_xlat16.x = sqrt(u_xlat16.x);\r
    u_xlati24 = int((0.0<u_xlat8) ? 0xFFFFFFFFu : uint(0));\r
    u_xlati8 = int((u_xlat8<0.0) ? 0xFFFFFFFFu : uint(0));\r
    u_xlati8 = (-u_xlati24) + u_xlati8;\r
    u_xlat8 = float(u_xlati8);\r
    u_xlat8 = u_xlat8 * u_xlat16.x;\r
    u_xlat8 = u_xlat8 * 0.25999999 + -0.0120000001;\r
    u_xlat0.x = (u_xlatb0) ? u_xlat8 : u_xlat1.x;\r
    u_xlat0.x = u_xlat1.z + u_xlat0.x;\r
    u_xlat0.x = u_xlat25 * u_xlat0.x;\r
    u_xlat0.x = clamp(u_xlat0.x, 0.0, 1.0);\r
    u_xlat8 = u_xlat0.x * -2.0 + 3.0;\r
    u_xlat0.x = u_xlat0.x * u_xlat0.x;\r
    u_xlat0.x = (-u_xlat8) * u_xlat0.x + 1.0;\r
    u_xlat0.x = u_xlat0.x * _ArrowColor.w;\r
    u_xlat0.x = u_xlat2.x * u_xlat0.x;\r
    u_xlat0.x = u_xlat10.x * u_xlat0.x;\r
    u_xlat0.xyz = u_xlat0.xxx * u_xlat4.xyz + u_xlat3.xyz;\r
    u_xlat1.x = _BaseColor.w + -0.100000001;\r
    u_xlat1.x = u_xlat10.x * u_xlat1.x + 0.100000001;\r
    u_xlat1.x = u_xlat1.x * _GateFade;\r
    u_xlat0.w = u_xlat1.x * u_xlat9.x;\r
    SV_Target0 = u_xlat0;\r
    return;\r
}\r
\r

#ifndef POST_HOOK
#define POST_HOOK
#endif
layout(location = 0) out highp vec4 cwjFragColor;
void main() { unity_main(); POST_HOOK cwjFragColor = linearToOutputTexel(SV_Target0); }
`,Al=JSON.parse(`[{"index":0,"name":"Orange","colorId":"orange","display":"#FF5C04","gameColor":"#FF5C04","lengths":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"prefabLen2":"Orange_2x1.prefab","atlasRect":[0.011805556,0.5324074,0.15833333,0.4],"bodyAtlasCell":["top",0],"liquidMaterial":"Water_3.mat","liquid":{"_ShallowColor":"#FFC94D","_DeepColor":"#FF6E0B","_EdgeColor":"#FFF0CD","_FoamColor":"#FFECC1"},"rigidColorIndex":0,"partMeshes":["CatEar.asset","Orange_EarLeft.asset","Orange_EarRight.asset","Orange_FrontLeft.asset","Orange_FrontRight.asset","Orange_RearLeft.asset","Orange_RearRight.asset","Orange_Tail.asset"],"pipe":{"sourceRamp":"OrangeRamp","gameColor":"#FF5C04","collarColor":"#E13006","rampRow":0,"sampleCount":128,"rampSamples_u0_25_50_75_100":["#DD2705","#E73B08","#F8711A","#F8711A","#F8711A"]},"gateHead":{"material":"Head_Orange.mat","baseColor":"#FF7F10","brightness":1.33,"saturation":0.55,"highlight":0.035,"rimDarkness":0.42,"flatColor":"#FF9D0A"}},{"index":1,"name":"Cyan","colorId":"cyan","display":"#04B2FF","gameColor":"#04B2FF","lengths":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"prefabLen2":"Cyan_2x1.prefab","atlasRect":[0.17569445,0.5324074,0.15833333,0.4],"bodyAtlasCell":["top",1],"liquidMaterial":"Water_1.mat","liquid":{"_ShallowColor":"#52F7FF","_DeepColor":"#00B8FF","_EdgeColor":"#CFFDFF","_FoamColor":"#C2FCFF"},"rigidColorIndex":0,"partMeshes":["CatEar.asset","Cyan_EarLeft.asset","Cyan_EarRight.asset","Cyan_FrontLeft.asset","Cyan_FrontRight.asset","Cyan_RearLeft.asset","Cyan_RearRight.asset","Cyan_Tail.asset"],"pipe":{"sourceRamp":"BlueSkyRamp","gameColor":"#0498FF","collarColor":"#0479F4","rampRow":1,"sampleCount":128,"rampSamples_u0_25_50_75_100":["#0066F6","#0A8FF0","#20ABEB","#20ABEB","#20ABEB"]},"gateHead":{"material":"Head_Cyan.mat","baseColor":"#5FADFF","brightness":1.53,"saturation":0.55,"highlight":0.035,"rimDarkness":0.42,"flatColor":"#41B9FF"}},{"index":2,"name":"Green","colorId":"green","display":"#30E004","gameColor":"#30E004","lengths":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"prefabLen2":"Green_2x1.prefab","atlasRect":[0.33819443,0.5324074,0.15833333,0.4],"bodyAtlasCell":["top",2],"liquidMaterial":"Water_2.mat","liquid":{"_ShallowColor":"#A8FF4D","_DeepColor":"#45DB0E","_EdgeColor":"#E7FFCD","_FoamColor":"#E1FFC1"},"rigidColorIndex":0,"partMeshes":["CatEar.asset","Green_EarLeft.asset","Green_EarRight.asset","Green_FrontLeft.asset","Green_FrontRight.asset","Green_RearLeft.asset","Green_RearRight.asset","Green_Tail.asset"],"pipe":{"sourceRamp":"GreenRamp","gameColor":"#31FF3E","collarColor":"#04AA04","rampRow":2,"sampleCount":128,"rampSamples_u0_25_50_75_100":["#039806","#05C601","#23F81A","#23F81A","#23F81A"]},"gateHead":{"material":"Head_Green.mat","baseColor":"#04AA04","brightness":1.86,"saturation":0.55,"highlight":0.035,"rimDarkness":0.42,"flatColor":"#03FF03"}},{"index":3,"name":"Purple","colorId":"purple","display":"#A61AFF","gameColor":"#A61AFF","lengths":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"prefabLen2":"Purple_2x1.prefab","atlasRect":[0.5048611,0.5324074,0.15833333,0.4],"bodyAtlasCell":["top",3],"liquidMaterial":"Water_6.mat","liquid":{"_ShallowColor":"#DE7DFF","_DeepColor":"#961AFF","_EdgeColor":"#F6DBFF","_FoamColor":"#F3D1FF"},"rigidColorIndex":0,"partMeshes":["CatEar.asset","Purple_EarLeft.asset","Purple_EarRight.asset","Purple_FrontLeft.asset","Purple_FrontRight.asset","Purple_RearLeft.asset","Purple_RearRight.asset","Purple_Tail.asset"],"pipe":{"sourceRamp":"VioletRamp","gameColor":"#A61AFF","collarColor":"#310F96","rampRow":3,"sampleCount":128,"rampSamples_u0_25_50_75_100":["#2B0B88","#3A13AB","#6A1CE6","#6A1CE6","#6A1CE6"]},"gateHead":{"material":"Head_Purple.mat","baseColor":"#A540FF","brightness":1.34,"saturation":1.0,"highlight":0.035,"rimDarkness":0.42,"flatColor":"#8700FF"}},{"index":4,"name":"Yellow","colorId":"yellow","display":"#FFCC03","gameColor":"#FFCC03","lengths":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"prefabLen2":"Yellow_2x1.prefab","atlasRect":[0.6722222,0.5324074,0.15833333,0.4],"bodyAtlasCell":["top",4],"liquidMaterial":"Water_10.mat","liquid":{"_ShallowColor":"#FFF566","_DeepColor":"#FFBA09","_EdgeColor":"#FFFCD4","_FoamColor":"#FFFBC9"},"rigidColorIndex":0,"partMeshes":["CatEar.asset","Yellow_EarLeft.asset","Yellow_EarRight.asset","Yellow_FrontLeft.asset","Yellow_FrontRight.asset","Yellow_RearLeft.asset","Yellow_RearRight.asset","Yellow_Tail.asset"],"pipe":{"sourceRamp":"YellowRamp","gameColor":"#FFCC03","collarColor":"#F99202","rampRow":4,"sampleCount":128,"rampSamples_u0_25_50_75_100":["#F68300","#FBA205","#F8B31C","#F8B31C","#F8B31C"]},"gateHead":{"material":"Head_Yellow.mat","baseColor":"#FFC319","brightness":1.19,"saturation":0.55,"highlight":0.035,"rimDarkness":0.42,"flatColor":"#FFD80D"}},{"index":5,"name":"Red","colorId":"red","display":"#FF0611","gameColor":"#FF0611","lengths":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"prefabLen2":"Red_2x1.prefab","atlasRect":[0.8375,0.5324074,0.15833333,0.4],"bodyAtlasCell":["top",5],"liquidMaterial":"Water_7.mat","liquid":{"_ShallowColor":"#FF7A5C","_DeepColor":"#FF211F","_EdgeColor":"#FFDAD1","_FoamColor":"#FFD0C6"},"rigidColorIndex":0,"partMeshes":["CatEar.asset","Red_EarLeft.asset","Red_EarRight.asset","Red_FrontLeft.asset","Red_FrontRight.asset","Red_RearLeft.asset","Red_RearRight.asset","Red_Tail.asset"],"pipe":{"sourceRamp":"RedRamp","gameColor":"#FF0611","collarColor":"#AF0606","rampRow":5,"sampleCount":128,"rampSamples_u0_25_50_75_100":["#A60406","#C80908","#FD230A","#FD230A","#FD230A"]},"gateHead":{"material":"Head_Red.mat","baseColor":"#FF0000","brightness":1.36,"saturation":0.55,"highlight":0.035,"rimDarkness":0.42,"flatColor":"#FF0000"}},{"index":6,"name":"Pink","colorId":"pink","display":"#FF3B8C","gameColor":"#FF3B8C","lengths":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"prefabLen2":"Pink_2x1.prefab","atlasRect":[0.0125,0.08888889,0.15833333,0.4],"bodyAtlasCell":["bottom",0],"liquidMaterial":"Water_5.mat","liquid":{"_ShallowColor":"#FF9ECF","_DeepColor":"#FF3891","_EdgeColor":"#FFE4F2","_FoamColor":"#FFDDEE"},"rigidColorIndex":0,"partMeshes":["CatEar.asset","Pink_EarLeft.asset","Pink_EarRight.asset","Pink_FrontLeft.asset","Pink_FrontRight.asset","Pink_RearLeft.asset","Pink_RearRight.asset","Pink_Tail.asset"],"pipe":{"sourceRamp":"PinkRamp","gameColor":"#FF3B8C","collarColor":"#DE0662","rampRow":6,"sampleCount":128,"rampSamples_u0_25_50_75_100":["#D70055","#E20A68","#F81E8A","#F81E8A","#F81E8A"]},"gateHead":{"material":"Head_Pink.mat","baseColor":"#FF559E","brightness":1.53,"saturation":0.55,"highlight":0.035,"rimDarkness":0.42,"flatColor":"#FF3BAA"}},{"index":7,"name":"Black","colorId":"black","display":"#292B30","gameColor":"#292B30","lengths":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"prefabLen2":"Black_2x1.prefab","atlasRect":[0.17569445,0.08888889,0.15833333,0.4],"bodyAtlasCell":["bottom",1],"liquidMaterial":"Water.mat","liquid":{"_ShallowColor":"#758FB0","_DeepColor":"#29334A","_EdgeColor":"#D8E0E9","_FoamColor":"#CFD8E3"},"rigidColorIndex":0,"partMeshes":["Black_EarLeft.asset","Black_EarRight.asset","Black_FrontLeft.asset","Black_FrontRight.asset","Black_RearLeft.asset","Black_RearRight.asset","Black_Tail.asset","CatEar.asset"],"pipe":{"sourceRamp":"NeutralBlack","gameColor":"#292B30","collarColor":"#0B0D0F","rampRow":7,"sampleCount":256,"rampSamples_u0_25_50_75_100":["#050608","#0D0F12","#272A2F","#515861","#8C96A6"]},"gateHead":{"material":"Head_Black.mat","baseColor":"#000000","brightness":0.0,"saturation":0.28,"highlight":0.0,"rimDarkness":0.42,"flatColor":"#000000"}},{"index":8,"name":"White","colorId":"white","display":"#F0F5FF","gameColor":"#F0F5FF","lengths":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"prefabLen2":"White_2x1.prefab","atlasRect":[0.33819443,0.08888889,0.15833333,0.4],"bodyAtlasCell":["bottom",2],"liquidMaterial":"Water_9.mat","liquid":{"_ShallowColor":"#F7FFFF","_DeepColor":"#B8D6F5","_EdgeColor":"#FDFFFF","_FoamColor":"#FCFFFF"},"rigidColorIndex":0,"partMeshes":["CatEar.asset","White_EarLeft.asset","White_EarRight.asset","White_FrontLeft.asset","White_FrontRight.asset","White_RearLeft.asset","White_RearRight.asset","White_Tail.asset"],"pipe":{"sourceRamp":"NeutralWhite","gameColor":"#F0F5FF","collarColor":"#98A5B7","rampRow":8,"sampleCount":256,"rampSamples_u0_25_50_75_100":["#7A8CA3","#9CA9BA","#BDC6D1","#DEE3E8","#FFFFFF"]},"gateHead":{"material":"Head_White.mat","baseColor":"#FFFFFF","brightness":0.74,"saturation":0.01,"highlight":0.37,"rimDarkness":0.42,"flatColor":"#BDBDBD"}},{"index":9,"name":"Turquoise","colorId":"turquoise","display":"#00E6CC","gameColor":"#00E6CC","lengths":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"prefabLen2":"Turquoise_2x1.prefab","atlasRect":[0.50416666,0.08888889,0.15833333,0.4],"bodyAtlasCell":["bottom",3],"liquidMaterial":"Water_8.mat","liquid":{"_ShallowColor":"#5CFFDE","_DeepColor":"#04E0B0","_EdgeColor":"#D1FFF6","_FoamColor":"#C6FFF3"},"rigidColorIndex":0,"partMeshes":["CatEar.asset","Turquoise_EarLeft.asset","Turquoise_EarRight.asset","Turquoise_FrontLeft.asset","Turquoise_FrontRight.asset","Turquoise_RearLeft.asset","Turquoise_RearRight.asset","Turquoise_Tail.asset"],"pipe":{"sourceRamp":"AquaRamp","gameColor":"#00E6CC","collarColor":"#068D65","rampRow":9,"sampleCount":128,"rampSamples_u0_25_50_75_100":["#058662","#089E6B","#10FBA9","#10FBA9","#10FBA9"]},"gateHead":{"material":"Head_Turquoise.mat","baseColor":"#4EFFCB","brightness":0.82,"saturation":0.55,"highlight":0.035,"rimDarkness":0.42,"flatColor":"#1DAE83"}},{"index":10,"name":"Periwinkle","colorId":"periwinkle","display":"#6E8AFF","gameColor":"#6E8AFF","lengths":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"prefabLen2":"Periwinkle_2x1.prefab","atlasRect":[0.6715278,0.08888889,0.15833333,0.4],"bodyAtlasCell":["bottom",4],"liquidMaterial":"Water_4.mat","liquid":{"_ShallowColor":"#B5CFFF","_DeepColor":"#6185FF","_EdgeColor":"#EAF2FF","_FoamColor":"#E5EEFF"},"rigidColorIndex":0,"partMeshes":["CatEar.asset","Periwinkle_EarLeft.asset","Periwinkle_EarRight.asset","Periwinkle_FrontLeft.asset","Periwinkle_FrontRight.asset","Periwinkle_RearLeft.asset","Periwinkle_RearRight.asset","Periwinkle_Tail.asset"],"pipe":{"sourceRamp":"LightPurpleRamp","gameColor":"#6E8AFF","collarColor":"#140C9F","rampRow":10,"sampleCount":256,"rampSamples_u0_25_50_75_100":["#100991","#150CA1","#1A0FB2","#2516D9","#3A1CF4"]},"gateHead":{"material":"Head_Periwinkle.mat","baseColor":"#396BFF","brightness":1.61,"saturation":0.55,"highlight":0.035,"rimDarkness":0.42,"flatColor":"#297AFF"}},{"index":11,"name":"Brown","colorId":"brown","display":"#A34514","gameColor":"#A34514","lengths":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"prefabLen2":"Brown_2x1.prefab","atlasRect":[0.8375,0.08888889,0.15833333,0.4],"bodyAtlasCell":["bottom",5],"liquidMaterial":"Water_0.mat","liquid":{"_ShallowColor":"#FFB35E","_DeepColor":"#B8591F","_EdgeColor":"#FFEAD2","_FoamColor":"#FFE4C7"},"rigidColorIndex":0,"partMeshes":["Brown_EarLeft.asset","Brown_EarRight.asset","Brown_FrontLeft.asset","Brown_FrontRight.asset","Brown_RearLeft.asset","Brown_RearRight.asset","Brown_Tail.asset","CatEar.asset"],"pipe":{"sourceRamp":"BrownRamp","gameColor":"#A34514","collarColor":"#6F1407","rampRow":11,"sampleCount":128,"rampSamples_u0_25_50_75_100":["#631206","#891A08","#FB3110","#FB3110","#FB3110"]},"gateHead":{"material":"Head_Brown.mat","baseColor":"#A6695F","brightness":1.48,"saturation":0.55,"highlight":0.035,"rimDarkness":0.42,"flatColor":"#A84E3F"}},{"index":12,"name":"Blue","colorId":"blue","display":"#04B2FF","gameColor":null,"lengths":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"prefabLen2":"Cyan_2x1.prefab","atlasRect":[0.17569445,0.5324074,0.15833333,0.4],"bodyAtlasCell":["top",1],"liquidMaterial":"Water_1.mat","liquid":{"_ShallowColor":"#52F7FF","_DeepColor":"#00B8FF","_EdgeColor":"#CFFDFF","_FoamColor":"#C2FCFF"},"rigidColorIndex":0,"partMeshes":["CatEar.asset","Cyan_EarLeft.asset","Cyan_EarRight.asset","Cyan_FrontLeft.asset","Cyan_FrontRight.asset","Cyan_RearLeft.asset","Cyan_RearRight.asset","Cyan_Tail.asset"],"pipe":{"sourceRamp":"BlueRamp","gameColor":"#0000FF","collarColor":"#052EBA","rampRow":12,"sampleCount":128,"rampSamples_u0_25_50_75_100":["#0025A4","#0B39D7","#0258DE","#0258DE","#0258DE"]},"gateHead":{"material":"Head_Blue.mat","baseColor":"#003AFF","brightness":0.82,"saturation":0.55,"highlight":0.035,"rimDarkness":0.42,"flatColor":"#0030D1"}}]`),jl=(e,t=1)=>{let n=new q(e);return new K(n.r,n.g,n.b,t)},Ml={glslVersion:ft,transparent:!0,depthTest:!1,depthWrite:!1},Nl=`
uniform float uParity;
out highp vec2 vs_TEXCOORD0; out highp float vs_TEXCOORD1;
void main(){ vs_TEXCOORD0 = uv; vs_TEXCOORD1 = uParity; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;function Pl(e){return new zi({...Ml,vertexShader:Nl,fragmentShader:Dl,uniforms:{uParity:{value:e},_GlobalMipBias:{value:new H},_BaseColor:{value:jl(`#251F63`)},_AlternateColor:{value:jl(`#2A246E`)},_EdgeColor:{value:jl(`#110934`)},_HighlightColor:{value:jl(`#524C9E`)},_Radius:{value:.18},_Bevel:{value:.09},_FlatTile:{value:1},_TileSheen:{value:.16},_ArrivalFlash:{value:0},_OccupiedPress:{value:0}}})}var Fl=`
out highp vec2 vs_TEXCOORD0;
void main(){ vs_TEXCOORD0 = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;function Il(e,t,n,r,i=.18){let a=e.image;return new zi({...Ml,vertexShader:Fl,fragmentShader:Ol,defines:r?{POST_HOOK:`if (texture(_Distance, vs_TEXCOORD0).z < 0.5) discard;`}:{},uniforms:{_GlobalMipBias:{value:new H},_Distance:{value:e},_Distance_TexelSize:{value:new K(1/a.width,1/a.height,a.width,a.height)},_Span:{value:new K(t[0],t[1],0,0)},_BaseColor:{value:jl(`#4947A3`)},_EdgeColor:{value:jl(`#1B114C`)},_HighlightColor:{value:jl(`#7A78D9`)},_ShadowColor:{value:jl(`#09051F`,.65)},_Bevel:{value:.18},_Height:{value:n?Math.min(.1,i):i},_Gloss:{value:.55},_ShadowSoftness:{value:.09},_ObstacleLayer:{value:+!!n},_SourceRow:{value:-1e3}}})}var Ll=Al,Rl=`
uniform vec2 uLight; uniform float uUp;
out highp vec2 vs_TEXCOORD0; out highp vec2 vs_TEXCOORD1; out highp float vs_TEXCOORD2;
void main(){ vs_TEXCOORD0 = uv; vs_TEXCOORD1 = uLight; vs_TEXCOORD2 = uUp; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;function zl(e,t){let n=Ll[e].gateHead,r=new H(-.55,1).normalize(),i=new H(t[1],-t[0]);return new zi({...Ml,vertexShader:Rl,fragmentShader:kl,uniforms:{_GlobalMipBias:{value:new H},uLight:{value:new H(i.dot(r),t[0]*r.x+t[1]*r.y)},uUp:{value:+(t[1]>=.5)},_BaseColor:{value:jl(n.baseColor)},_ArrowColor:{value:jl(`#FFFFFF`)},_Brightness:{value:n.brightness},_Saturation:{value:n.saturation},_Highlight:{value:n.highlight},_HeadVisibility:{value:1},_RimDarkness:{value:n.rimDarkness},_GateFade:{value:1}}})}function Bl(e,t){let n=Ll[t].gateHead;e.uniforms._BaseColor.value=jl(n.baseColor),e.uniforms._Brightness.value=n.brightness,e.uniforms._Saturation.value=n.saturation,e.uniforms._Highlight.value=n.highlight}var Vl=.94,Hl=.94,Ul=14,Wl=.075,Gl=[.97,.776],Kl=.96,ql=.25,Jl=class{constructor(e,t,n){r(this,`queue`,void 0),r(this,`group`,new jn),r(this,`head`,void 0),r(this,`headMat`,void 0),r(this,`tube`,void 0),r(this,`tubeMat`,void 0),r(this,`ice`,void 0),r(this,`iceLabel`,void 0),r(this,`color`,-1),r(this,`iceCount`,-1),r(this,`used`,0),r(this,`usedShown`,0),r(this,`drainFrom`,0),r(this,`drainT`,1),r(this,`drainDur`,.2),r(this,`recoilT`,1),r(this,`tubeBase`,[0,0]),r(this,`out`,void 0),r(this,`fade`,1),r(this,`fadeTarget`,1),r(this,`time`,0),r(this,`dock`,void 0),r(this,`fixedColor`,null),r(this,`headPos`,[0,0]),r(this,`headHidden`,!1),this.queue=n,this.dock=e;let[i,a]=t;this.out=t;let o=Math.atan2(a,i)-Math.PI/2;this.tubeMat=vl(Ul),yl(this.tubeMat,n),this.tube=new J(new Ai(pl,Ul).translate(0,Ul/2,0),this.tubeMat),this.tubeBase=[e[0]+i*Hl,e[1]+a*Hl],this.tube.position.set(this.tubeBase[0],this.tubeBase[1],0),this.tube.rotation.z=o,this.tube.renderOrder=600,this.headMat=zl(n[0]??0,t),this.head=new J(new Ai(Gl[0],Gl[1]),this.headMat),this.head.position.set(e[0]+i*Kl,e[1]+a*Kl,0),this.head.rotation.z=o,this.head.renderOrder=610;let s=rl(`cwj/sprites/Gate_ice.png`).clone();s.repeat.set(.56,1),s.needsUpdate=!0;let c=new Xr({map:s,transparent:!0,depthTest:!1,depthWrite:!1});this.ice=new J(new Ai(.812,1.1465116279069767),c);let l=.97;this.ice.position.set(e[0]+i*l,e[1]+a*l,0),this.ice.rotation.z=Math.atan2(a,i),this.ice.renderOrder=615,this.iceLabel=new J(new Ai(.55,.55),new Xr({transparent:!0,depthTest:!1,depthWrite:!1})),this.iceLabel.position.set(e[0]+i*Vl,e[1]+a*Vl,0),this.iceLabel.renderOrder=616,this.group.add(this.tube,this.head,this.ice,this.iceLabel)}setFixed(e,t,n){this.fixedColor=e;let r=.5+t/2+.03,[i,a]=this.out;if(this.headPos=[this.dock[0]+i*r,this.dock[1]+a*r],this.head.position.set(this.headPos[0],this.headPos[1],0),this.head.scale.set(.8,.8,1),n){this.head.visible=!1,this.headHidden=!0;let e=new J(new Ai(.85,.96),new Xr({map:n,transparent:!0,depthTest:!1,depthWrite:!1}));e.position.set(this.headPos[0],this.headPos[1]+.05,0),e.renderOrder=612,this.group.add(e)}Bl(this.headMat,e),this.color=e,this.tube.visible=!1}usePort(e){this.head.visible=!1,this.headHidden=!0,e.position.set(this.headPos[0],this.headPos[1],0),this.group.add(e)}set(e,t,n){n&&(this.queue=n,yl(this.tubeMat,n)),e!==this.used&&(this.drainFrom=this.usedShown,this.drainT=0,this.drainDur=Math.max(.05,Wl*Math.abs(e-this.usedShown)),e>this.used&&(this.recoilT=0)),this.used=e;let r=this.fixedColor??(e<this.queue.length?this.queue[e]:-1);if(r>=0&&r!==this.color&&(this.color=r,Bl(this.headMat,r)),this.fadeTarget=+(r>=0),t!==this.iceCount&&(this.iceCount=t,this.ice.visible=this.iceLabel.visible=t>0,t>0)){let e=this.iceLabel.material;e.map=Yl(t,`#2B6C8F`),e.needsUpdate=!0}}update(e){this.time+=e;let t=e/ql;this.drainT=Math.min(1,this.drainT+e/this.drainDur),this.usedShown=this.drainFrom+(this.used-this.drainFrom)*Cl(this.drainT),this.fade+=Math.sign(this.fadeTarget-this.fade)*Math.min(t,Math.abs(this.fadeTarget-this.fade));let n=this.tubeMat.uniforms;n.uUsed.value=this.usedShown,n.uTime.value=this.time;let r=0;if(this.recoilT<1){let t=this.drainDur,n=this.recoilT*(t+Sl);r=n<t?1:bl((n-t)/Sl),this.recoilT=Math.min(1,this.recoilT+e/(t+Sl))}this.tube.position.set(this.tubeBase[0]-this.out[0]*xl*r,this.tubeBase[1]-this.out[1]*xl*r,0),this.headMat.uniforms._GateFade.value=this.fade,this.head.visible=this.fade>.001&&!this.headHidden}};function Yl(e,t,n=128){return il(`num${e}${t}${n}`,n,n,r=>{r.font=`${n*.62}px Mikado, "Baloo 2", sans-serif`,r.textAlign=`center`,r.textBaseline=`middle`,r.lineWidth=n*.08,r.strokeStyle=`rgba(255,255,255,0.9)`,r.strokeText(String(e),n/2,n/2+n*.04),r.fillStyle=t,r.fillText(String(e),n/2,n/2+n*.04)})}var Xl=function(e){return e[e.CatMeow=0]=`CatMeow`,e[e.CatMove=1]=`CatMove`,e[e.CatDrink=2]=`CatDrink`,e[e.ButtonClick=3]=`ButtonClick`,e[e.LevelWin=4]=`LevelWin`,e[e.LevelLose=5]=`LevelLose`,e[e.IceCrack=6]=`IceCrack`,e[e.IceShatter=7]=`IceShatter`,e[e.HideBoxShatter=8]=`HideBoxShatter`,e[e.PawHammerHit=9]=`PawHammerHit`,e[e.MagicPump=10]=`MagicPump`,e[e.RewardDrop=11]=`RewardDrop`,e[e.RewardArrive=12]=`RewardArrive`,e[e.LevelWinAccent=13]=`LevelWinAccent`,e[e.FrozenClockCenter=14]=`FrozenClockCenter`,e[e.FrozenClockArrive=15]=`FrozenClockArrive`,e}({}),Zl={0:{clips:[`Meow_1`,`Moew_2`,`Moew_3`],vol:.9,cooldown:.08,max:2},1:{clips:[`SFX_Cat_Move`],vol:.7,cooldown:.08,max:12},2:{clips:[`Water_1`,`Water_2`],vol:.6,cooldown:.08,max:2},3:{clips:[`SFX_Click`],vol:.7,cooldown:.08,max:2},4:{clips:[`Cat_Talk_final`],vol:1,cooldown:.08,max:2},5:{clips:[`rating_lose_restart`],vol:.7,cooldown:.08,max:2},6:{clips:[`SFX_Ice_Break_Small`],vol:.7,cooldown:.08,max:2},7:{clips:[`SFX_Ice_Break`],vol:.855,cooldown:.08,max:2},8:{clips:[`SFX_Rock_Break`],vol:.7,cooldown:.08,max:2},9:{clips:[`SFX_hammer_Paw`],vol:.7,cooldown:.08,max:2},10:{clips:[`Magic_pump`],vol:.7,cooldown:.08,max:2},11:{clips:[`Bling_nhan_thuong`],vol:.65,cooldown:.04,max:6},12:{clips:[`Bling`],vol:.65,cooldown:.04,max:6},13:{clips:[],vol:1,cooldown:.08,max:2},14:{clips:[`Clock_Short`],vol:.7,cooldown:.08,max:2},15:{clips:[`Clock_final`],vol:.7,cooldown:.08,max:2}},Ql=.8,$l=.324,Z=new class{constructor(){r(this,`ctx`,null),r(this,`buffers`,new Map),r(this,`last`,new Map),r(this,`playing`,new Map),r(this,`music`,null),r(this,`sound`,!0),r(this,`musicOn`,!0)}unlock(){if(!this.ctx){this.ctx=new AudioContext;for(let e of Object.values(Zl))for(let t of e.clips)this.load(t)}this.ctx.state===`suspended`&&this.ctx.resume(),this.music||(this.music=new window.Audio(nl(`cwj/music/Comedic_Game_Loop_2.ogg`)),this.music.loop=!0,this.music.volume=$l),this.musicOn&&this.music.paused&&this.music.play().catch(()=>void 0)}setMusic(e){this.musicOn=e,this.music&&(e?this.music.play().catch(()=>void 0):this.music.pause())}async load(e){if(this.ctx&&!this.buffers.has(e))try{let t=await fetch(nl(`cwj/sfx/${e}.ogg`));this.buffers.set(e,await this.ctx.decodeAudioData(await t.arrayBuffer()))}catch{}}play(e){let t=Zl[e];if(!this.sound||!this.ctx||!t.clips.length)return;let n=this.ctx.currentTime;if(n-(this.last.get(e)??-1)<t.cooldown||(this.playing.get(e)??0)>=t.max)return;let r=this.buffers.get(t.clips[Math.floor(Math.random()*t.clips.length)]);if(!r)return;this.last.set(e,n);let i=this.ctx.createBufferSource();i.buffer=r;let a=this.ctx.createGain();a.gain.value=t.vol*Ql,i.connect(a).connect(this.ctx.destination),this.playing.set(e,(this.playing.get(e)??0)+1),i.onended=()=>this.playing.set(e,(this.playing.get(e)??1)-1),i.start()}},eu=.14/1.5,tu=.2,nu=.17,ru=.17,iu=.15,au=.22,ou=function(e){return e[e.Hammer=101]=`Hammer`,e[e.Clock=102]=`Clock`,e[e.Pump=103]=`Pump`,e}({}),su=class{constructor(e,t){r(this,`view`,void 0),r(this,`ev`,void 0),r(this,`s`,void 0),r(this,`level`,void 0),r(this,`displayNumber`,1),r(this,`drag`,null),r(this,`step`,null),r(this,`drinks`,[]),r(this,`exits`,[]),r(this,`busy`,new Set),r(this,`targeting`,null),r(this,`paused`,!1),r(this,`ended`,!1),r(this,`time`,0),r(this,`queueKeys`,[]),r(this,`loseReason`,`Out of time`),r(this,`onBoosterSpent`,()=>void 0),this.view=e,this.ev=t}start(e,t=-1){this.displayNumber=e,this.level=this.makeLevel(e,t),this.s=new l(this.level),this.drag=null,this.step=null,this.drinks=[],this.exits=[],this.busy.clear(),this.targeting=null,this.ended=!1,this.paused=!1,this.queueKeys=this.level.gates.map(e=>e.queue.join(`,`)),this.view.load(this.s),this.syncAll(),this.ev.onChange()}restart(){this.start(this.displayNumber,-1)}makeLevel(e,t){return p(e,t)}tick(e){}pointerDown(e,t){if(Z.unlock(),this.s.status!==s.Active||this.paused)return;let[n,r]=this.view.toGrid(e,t),i=this.s.cell(Math.round(n),Math.round(r));if(this.targeting!==null){this.useTargeted(n,r);return}if(i===null)return;let a=this.s.catAt(i);a<0||(this.s.armCountdown(),this.drag={cat:a,end:null,gx:n,gy:r,px:n,py:r,ox:0,oy:0})}pointerMove(e,t){if(!this.drag)return;let[n,r]=this.view.toGrid(e,t);this.drag.px=n,this.drag.py=r}pointerUp(){let e=this.drag;this.drag=null,e&&!this.step&&!this.busy.has(e.cat)&&this.arrived(e.cat)}chooseEnd(e){let t=this.s.cats[e.cat].cells,n=t.length,r=t.indexOf(this.s.cell(Math.round(e.gx),Math.round(e.gy))??-1),i=r=>{let i=this.s.xy(r===o.Head?t[n-1]:t[0]);return e.ox=i[0]-e.gx,e.oy=i[1]-e.gy,r};if(r>=0&&r*2!=n-1)return i(r*2>n-1?o.Head:o.Tail);let a=e.px-e.gx,s=e.py-e.gy,c=Math.hypot(a,s);if(c<tu)return null;let l=r=>{let i=this.s.xy(r===o.Head?t[n-1]:t[0]),l=this.s.xy(r===o.Head?t[n-2]:t[1]),u=(a*(i[0]-l[0])+s*(i[1]-l[1]))/c,d=-Math.hypot(i[0]-e.gx,i[1]-e.gy)/n,f=this.s.routeStep(e.cat,r,e.px+(i[0]-e.gx),e.py+(i[1]-e.gy))===null?-2:0;return u+d+f};return i(l(o.Head)>=l(o.Tail)?o.Head:o.Tail)}update(e){if(!this.s)return;if(!this.paused&&!this.ended){let t=this.s.status;this.s.advance(e),t===s.Active&&this.s.status===s.Lost&&this.lose()}if(this.step){let t=this.step;t.t=Math.min(1,t.t+e/eu),this.view.cats[t.cat].setPose(t.pts,t.end===o.Head?t.t:1-t.t,t.len),t.t>=1&&(this.step=null,this.poseCat(t.cat),this.arrived(t.cat))}let t=this.drag;if(t&&!this.step&&!this.busy.has(t.cat)&&this.s.status===s.Active&&!this.paused&&(t.end===null&&(t.end=this.chooseEnd(t)),t.end!==null)){let e=this.s.routeStep(t.cat,t.end,t.px+t.ox,t.py+t.oy);e!==null&&this.startStep(t.cat,t.end,e)}this.time+=e;for(let t of this.drinks){t.t+=e;let n=this.view.cats[t.cat],r=t.t-ru,i=t.res.amount,a=Math.min(i,Math.max(0,r)/Wl),o=Math.min(1,(Math.floor(a)+(a>=i?0:Cl(a-Math.floor(a))))/i);n.fill=t.from+(t.to-t.from)*(r<=0?0:o),t.t>=nu&&r<=El.total(t.T)&&(n.drinking=.05);let s=this.s.lv.gates[t.res.gate],[c,l]=this.s.xy(s.cell);r>=0?(t.stream.setPath(this.view.local(c+s.out[0]*.94,l+s.out[1]*.94),n.mouthPoint().p,!0),t.stream.set(r,t.T,this.time)):t.stream.mesh.visible=!1,!t.gateSynced&&r>=0&&(t.gateSynced=!0,this.syncGate(t.res.gate))}let n=e=>e.t>=ru+Math.max(El.total(e.T),e.T)+(e.res.finished?iu:0);for(let e of this.drinks.filter(n))this.drinkDone(e);this.drinks=this.drinks.filter(e=>!n(e)),this.tick(e);for(let t of this.exits){t.t+=e;let n=Math.min(1,t.t/au),r=this.view.cats[t.cat];r.shrink=1-n*n,n>=1&&(r.group.visible=!1)}this.exits=this.exits.filter(e=>e.t<au),this.s.status!==s.Won||this.ended||this.drinks.length||this.exits.length||(this.ended=!0,Z.play(Xl.LevelWin),this.ev.onWin()),this.view.cats.forEach((t,n)=>{let r=this.s.cats[n],i=Math.min(...r.cells.map(e=>Math.floor(e/this.s.w)));t.baseOrder=100+(this.s.h-i)*10,t.update(e)}),this.view.gates.forEach(t=>t.update(e)),this.view.overlays.update()}startStep(e,t,n){let r=this.s.cats[e].cells.slice();if(this.s.tryMove(e,t,n)!==c.Ok)return;let i=(t===o.Head?[...r,n]:[n,...r]).map(e=>{let[t,n]=this.s.xy(e);return this.view.local(t,n)});this.step={cat:e,end:t,t:0,pts:i,len:r.length},this.view.cats[e].setPose(i,t===o.Head?0:1,r.length),Z.play(Xl.CatMove)}arrived(e){if(this.busy.has(e)||this.s.cats[e].removed)return;let t=this.s.tryDrink(e);if(typeof t!=`object`)return;this.drag?.cat===e&&(this.drag=null);let n=this.s.cats[e].cells.length,r=this.view.cats[e].fill,i=t.finished?1:this.s.cats[e].drinks/n;this.busy.add(e);let a=this.s.gates[t.gate].units[t.fromUsed].color;this.drinks.push({cat:e,t:0,from:r,to:i,res:t,gateSynced:!1,stream:this.view.makeStream(a),T:Wl*t.amount}),Z.play(Xl.CatDrink)}drinkDone(e){let t=this.view.cats[e.cat];this.view.removeStream(e.stream),e.gateSynced||this.syncGate(e.res.gate),e.res.finished?(Z.play(Xl.CatMeow),e.res.switchedToOuter?(t.switchToOuter(),this.busy.delete(e.cat)):this.exits.push({cat:e.cat,t:0})):this.busy.delete(e.cat),this.syncAll(),this.ev.onChange()}poseCat(e){let t=this.s.cats[e];this.view.cats[e].setPose(t.cells.map(e=>{let[t,n]=this.s.xy(e);return this.view.local(t,n)}),0,t.cells.length)}syncGate(e){let t=this.s.gates[e],n=t.units.map(e=>e.color),r=n.join(`,`),i=this.queueKeys[e]!==r;this.queueKeys[e]=r,this.view.gates[e].set(t.used,this.s.gateIce(e),i?n:void 0)}syncAll(){this.s.cats.forEach((e,t)=>{(!e.removed||this.exits.some(e=>e.cat===t))&&this.poseCat(t)}),this.s.gates.forEach((e,t)=>this.syncGate(t))}booster(e){return this.s.status!==s.Active||this.paused?!1:e===102?this.s.frozenClock()?(Z.play(Xl.FrozenClockCenter),!0):!1:(this.targeting=this.targeting===e?null:e,this.ev.onChange(),!1)}useTargeted(e,t){let n=this.targeting,r=this.s.cell(Math.round(e),Math.round(t)),i=r===null?-1:this.s.catAt(r),a=!1;if(n===101){let n=this.s.lv.gates.findIndex(n=>{let[r,i]=this.s.xy(n.cell);return Math.hypot(r+n.out[0]*.94-e,i+n.out[1]*.94-t)<.5}),s=r===null?-1:this.s.lv.hide.findIndex((n,r)=>this.s.hideRemaining(r)>0&&e>n.x-.5&&e<n.x+n.w-.5&&t>n.y-.5&&t<n.y+n.h-.5);if(n>=0&&this.s.gateIce(n)>0)a=this.s.pawHammerGateIce(n),a&&this.syncGate(n);else if(s>=0)a=this.s.pawHammerHideBox(s);else if(i>=0&&this.s.catIce(i)>0)a=this.s.pawHammerCatIce(i);else if(i>=0){let e=this.s.cats[i].cells,t=e.indexOf(r)>=(e.length-1)/2?o.Head:o.Tail;a=this.s.pawHammerCat(i,t)!==null,a&&(this.view.cats[i].len=this.s.cats[i].cells.length,this.view.cats[i].fill=this.s.cats[i].drinks/this.s.cats[i].cells.length,this.s.cats[i].removed&&(this.busy.add(i),this.exits.push({cat:i,t:0}),Z.play(Xl.CatMeow)))}a&&Z.play(Xl.PawHammerHit)}else if(n===103&&i>=0){let e=this.s.magicPump(i);if(a=e!==null,e){Z.play(Xl.MagicPump);for(let{cat:t}of e){let e=this.view.cats[t];e.fill=1,this.s.cats[t].removed?(this.busy.add(t),this.exits.push({cat:t,t:0})):e.switchToOuter()}}}a&&(this.targeting=null,this.onBoosterSpent(n),this.syncAll()),this.ev.onChange()}lose(){this.drag=null,this.ended=!0,Z.play(Xl.LevelLose),this.ev.onLose()}revive(){this.s.revive(),this.ended=!1,this.ev.onChange()}},cu=Al,lu={red:`#D2262E`,yellow:`#F7BE17`,green:`#22CB2A`,white:`#BCC6D2`},uu={red:`#FF0000`,yellow:`#FFCB0F`,green:`#14DB14`,white:`#D7D7D6`},du=cu.slice(0,12).map(e=>{let t=e.pipe.rampSamples_u0_25_50_75_100;return{id:e.colorId,display:e.display,liquidShallow:e.liquid._ShallowColor,liquidDeep:e.liquid._DeepColor,liquidEdge:e.liquid._EdgeColor,foam:e.liquid._FoamColor,tube:lu[e.colorId]??t[2],tubeDark:t[0],tubeLight:t[4],collar:e.pipe.collarColor,head:uu[e.colorId]??e.gateHead.flatColor}}),fu={clear:`#0B111A`,floor:`#0E0729`,tile:`#2A246E`,tileHighlight:`#524C9E`,wallTop:`#4B49A5`,wallSide:`#190F48`,wallHighlight:`#6F6CCA`,wallShadow:`#09051F`,wallOuterShade:`#35327B`,timerText:`#22003C`},pu=.61,mu=.03,hu=.18,gu=.96,_u=32,vu=1.5,yu=.04;function bu(e){let t=new Set(e.voids),n=1/0,r=-1/0,i=1/0,a=-1/0;for(let o=0;o<e.w*e.h;o++){if(t.has(o))continue;let s=o%e.w,c=Math.floor(o/e.w);n=Math.min(n,s),r=Math.max(r,s),i=Math.min(i,c),a=Math.max(a,c)}return{minx:n,maxx:r,miny:i,maxy:a,cols:r-n+1,rows:a-i+1,cx:(n+r)/2,cy:(i+a)/2}}function xu(e){let t=Math.round(e);return Math.abs(e-Math.trunc(e))===.5&&t%2!=0?t-1:t}function Su(e,t,n){let r=Math.round(e),i=Math.round(t),a=n(r,i),o=3;for(let s=i-2;s<=i+2;s++)for(let i=r-2;i<=r+2;i++){if(n(i,s)===a)continue;let r=Math.max(Math.abs(e-i)-.5,0),c=Math.max(Math.abs(t-s)-.5,0);o=Math.min(o,Math.hypot(r,c))}return a?-o:o}function Cu(e,t,n=pu,r=hu){let i=new jn,a=new Set(e.voids),o=new Set(e.walls),s=(t,n)=>t>=0&&t<e.w&&n>=0&&n<e.h&&!a.has(n*e.w+t),c=(t,n)=>s(t,n)&&o.has(n*e.w+t),l=(e,n)=>[e-t.cx,n-t.cy],u=new Xr({color:fu.floor,depthTest:!1,depthWrite:!1,transparent:!0}),d=new Ai(1,1);for(let t=0;t<e.h;t++)for(let n=0;n<e.w;n++){if(!s(n,t))continue;let[e,r]=l(n,t),a=new J(d,u);a.scale.set(1.06,1.06,1),a.position.set(e,r,0),a.renderOrder=0;let o=new J(d,Pl(Math.abs(xu(e+r))%2));o.scale.set(gu,gu,1),o.position.set(e,r,0),o.renderOrder=1,i.add(a,o)}let f=t.cols+2*vu,p=t.rows+2*vu,m=Math.ceil(f*_u),h=Math.ceil(p*_u),g=t.minx-.5-vu,_=t.miny-.5-vu,v=new Map;for(let e=t.minx;e<=t.maxx;e++)for(let n=t.miny;n<=t.maxy;n++)if(s(e,n)){v.set(e,n);break}let y=new Uint16Array(m*h*4),b=yr.toHalfFloat;for(let e=0;e<h;e++)for(let i=0;i<m;i++){let a=g+(i+.5)/m*f,l=_+(e+.5)/h*p,u=Su(a,l,s),d=Math.max(u-n,-u-mu),x=o.size?Su(a,l,c)+yu:3,S=Math.min(t.maxx,Math.max(t.minx,Math.round(a))),C=v.get(S),w=+(C!==void 0&&l<C-.5+mu+r+.02),T=(e*m+i)*4;y[T]=b(d),y[T+1]=b(x),y[T+2]=b(w),y[T+3]=b(1)}let x=new ui(y,m,h,fe,ae);x.minFilter=x.magFilter=k,x.needsUpdate=!0;let S=new Ai(f,p),[C,w]=l(g+f/2-0,_+p/2),T=(e,t)=>{let n=new J(S,e);n.position.set(C,w,0),n.renderOrder=t,i.add(n)};return T(Il(x,[f,p],!1,!1,r),2),o.size&&T(Il(x,[f,p],!0,!1,r),3),r>0&&T(Il(x,[f,p],!1,!0,r),500),{group:i}}var wu=.5,Tu=.78,Eu=.25,Du=`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Ou=`
uniform vec3 uColor; uniform float uLen; uniform float uHalf; uniform float uStrip; uniform float uOpacity;
uniform float uBelly0; uniform float uBelly1; uniform float uWin;
varying vec2 vUv;
void main(){
  float d = vUv.y * uLen;                         // along, from the tail end
  float x = (vUv.x - 0.5) * 2.0 * uStrip;          // across, cells
  float hs = uLen - ${Tu.toFixed(2)};            // head starts here
  // body outline: round segments (bulges), tapered tail, big round head
  float k = fract(d / ${wu.toFixed(2)});
  float seg = uHalf * (0.88 + 0.12 * sin(3.14159 * k));
  float tail = smoothstep(0.0, 0.42, d);
  float r = seg * mix(0.55, 1.0, tail);
  // head: a circle of radius uHalf*1.06 centred HEAD*0.5 from the front
  float hc = uLen - ${(Tu*.5).toFixed(2)};
  float hr = uHalf * 1.06;
  float inHead = length(vec2(x, (d - hc) * 1.05)) - hr;
  float inBody = (d < hs + 0.05) ? abs(x) - r : 1.0;
  // tail cap
  if (d < 0.22) inBody = length(vec2(x, (0.22 - d) * 1.4)) - r;
  float sd = min(inHead, inBody);
  // little legs: one pair per segment, under the body edge (drawn as dark nubs)
  float leg = 1.0;
  if (d > 0.3 && d < hs - 0.05) {
    float lk = (fract(d / ${wu.toFixed(2)}) - 0.5) * ${wu.toFixed(2)};
    leg = length(vec2((abs(x) - r - 0.03) * 1.3, lk * 1.6)) - 0.075;
  }
  if (sd > 0.0 && leg > 0.0) discard;
  vec3 dark = uColor * 0.5;
  if (sd > 0.0) { gl_FragColor = vec4(mix(dark, uColor * 0.7, 0.3), uOpacity); return; }
  // toon shading: light from the upper left of the travel direction
  bool head = inHead < 0.0 && d > hs - 0.1;
  float across = clamp(x / (head ? hr : r), -1.0, 1.0);
  float lightK = 0.5 + 0.5 * (-across * 0.8 + 0.2);
  vec3 col = mix(uColor * 0.72, uColor * 1.08, smoothstep(0.25, 0.75, lightK));
  // segment creases
  if (!head && d > 0.3) col *= 1.0 - 0.2 * smoothstep(0.8, 1.0, abs(fract(d / ${wu.toFixed(2)}) * 2.0 - 1.0));
  // gloss: white streak on the lit side + a blob per segment / on the head
  float streak = exp(-pow((across + 0.55) / 0.12, 2.0)) * 0.55;
  col = mix(col, vec3(1.0), streak);
  if (head) {
    float blob = length(vec2(x + hr * 0.45, (d - hc - hr * 0.35) * 1.2));
    col = mix(col, vec3(1.0), smoothstep(0.09, 0.05, blob) * 0.85);
  }
  // belly window (the liquid is drawn on top of it)
  if (!head && d > uBelly0 && d < uBelly1 && uWin > 0.5) {
    float wy = clamp(d, uBelly0 + 0.25, uBelly1 - 0.25);
    float wd = length(vec2(x, d - wy)) - ${Eu.toFixed(2)};
    if (wd < 0.0) col = mix(uColor * 0.42, uColor * 0.62, smoothstep(-0.25, 0.0, wd));
    col = mix(col, vec3(1.0), smoothstep(0.018, 0.0, abs(wd)) * 0.85);   // white window rim
  }
  // dark outline
  float edge = smoothstep(-0.045, -0.01, sd);
  col = mix(col, dark, edge);
  gl_FragColor = vec4(col, uOpacity);
}`;function ku(e,t,n,r){let i=new q;return i.setHex(parseInt(e.slice(1),16),st),new zi({vertexShader:Du,fragmentShader:Ou,transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{uColor:{value:i},uLen:{value:t},uHalf:{value:n},uStrip:{value:r},uOpacity:{value:1},uBelly0:{value:.35},uBelly1:{value:t-Tu-.1},uWin:{value:1}}})}function Au(e){return il(`wormface`+e,256,160,t=>{let n=n=>{e===1?(t.strokeStyle=`#1b1530`,t.lineWidth=9,t.lineCap=`round`,t.beginPath(),t.arc(n,62,22,.15*Math.PI,.85*Math.PI),t.stroke()):(t.fillStyle=`#fff`,t.beginPath(),t.ellipse(n,62,33,37,0,0,Math.PI*2),t.fill(),t.strokeStyle=`#1b1530`,t.lineWidth=6,t.stroke(),t.fillStyle=`#1b1530`,t.beginPath(),t.ellipse(n+4,68,19,23,0,0,Math.PI*2),t.fill(),t.fillStyle=`#fff`,t.beginPath(),t.arc(n-3,57,8,0,Math.PI*2),t.fill(),t.beginPath(),t.arc(n+11,79,4,0,Math.PI*2),t.fill())};n(84),n(172),t.fillStyle=`rgba(255,90,140,0.55)`,t.beginPath(),t.ellipse(46,112,20,12,0,0,Math.PI*2),t.fill(),t.beginPath(),t.ellipse(210,112,20,12,0,0,Math.PI*2),t.fill(),t.strokeStyle=`#1b1530`,t.lineWidth=7,t.lineCap=`round`,e===2?(t.fillStyle=`#7a1630`,t.beginPath(),t.ellipse(128,126,22,20,0,0,Math.PI*2),t.fill(),t.stroke(),t.fillStyle=`#ff6f8e`,t.beginPath(),t.ellipse(128,136,12,7,0,0,Math.PI*2),t.fill()):(t.beginPath(),t.arc(128,108,20,.2*Math.PI,.8*Math.PI),t.stroke())})}function ju(e){return il(`ant`+e,256,160,t=>{let n=new q(e),r=`rgb(${n.r*255*.5|0},${n.g*255*.5|0},${n.b*255*.5|0})`;for(let n of[-1,1])t.strokeStyle=r,t.lineWidth=12,t.lineCap=`round`,t.beginPath(),t.moveTo(128+n*30,160),t.quadraticCurveTo(128+n*40,80,128+n*78,44),t.stroke(),t.fillStyle=e,t.beginPath(),t.arc(128+n*80,40,24,0,Math.PI*2),t.fill(),t.lineWidth=6,t.stroke(),t.fillStyle=`rgba(255,255,255,0.8)`,t.beginPath(),t.arc(128+n*80-8,32,8,0,Math.PI*2),t.fill()})}var Mu=.37,Nu=.27,Pu=.3,Fu=.49,Iu=`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Lu=`
uniform vec3 uColor; uniform float uLen; uniform float uStrip; uniform float uOpacity; uniform int uPass; uniform float uK;
varying vec2 vUv;
float tri(vec2 p, float s){ // triangle pointing +y, size s
  p.y += s * 0.35; return max(abs(p.x) * 0.866 + p.y * 0.5, -p.y) - s * 0.5;
}
void main(){
  float d = vUv.y * uLen, x = (vUv.x - 0.5) * 2.0 * uStrip;
  float hw = ${Mu.toFixed(2)} * uK, inner = ${Nu.toFixed(2)} * uK, ch = ${Fu.toFixed(2)} * uK;
  float cap = ${Pu.toFixed(2)};
  float ax = abs(x);
  bool inCap = d < cap || d > uLen - cap;
  if (uPass == 0) {
    if (inCap) {
      if (ax > ch) discard;
      float t = d < cap ? d / cap : (uLen - d) / cap;      // 0 at the outer end .. 1 inner side
      // cap = rounded slab: light top band (outer half), body, dark lip (inner edge)
      vec3 c = uColor;
      c = mix(c * 1.12 + 0.06, c, smoothstep(0.35, 0.55, t));
      c = mix(c, c * 0.62, smoothstep(0.78, 0.95, t));
      c = mix(c, c * 0.7, smoothstep(0.82, 1.0, ax / ch));   // darker sides
      c = mix(c, vec3(1.0), exp(-pow((x / ch + 0.55) / 0.12, 2.0)) * 0.35 * (1.0 - t));
      // white arrow pointing out of the bottle
      vec2 p = vec2(x, (d < cap ? (cap - d) : (d - (uLen - cap))) - cap * 0.55);
      float a = tri(p / uK, 0.17);
      c = mix(c, vec3(0.92, 0.96, 1.0), smoothstep(0.012, 0.0, a) * 0.92);
      // rounded outer corners
      float oy = d < cap ? d : uLen - d;
      if (oy < 0.06 && length(vec2(max(ax - (ch - 0.06), 0.0), 0.06 - oy)) > 0.06) discard;
      gl_FragColor = vec4(c, uOpacity); return;
    }
    if (ax > hw) discard;
    if (ax > inner) {                                     // side borders in the cap colour, cylinder shading
      float t = (ax - inner) / (hw - inner);
      vec3 c = mix(uColor * 1.05, uColor * 0.6, smoothstep(0.3, 1.0, t));
      if (x < 0.0) c = mix(c, vec3(1.0), (1.0 - t) * 0.18);
      gl_FragColor = vec4(c, uOpacity); return;
    }
    // empty glass: dark, tinted, see-through
    vec3 g = mix(vec3(0.20, 0.20, 0.36), uColor * 0.45, 0.3);
    g = mix(g, g * 1.35 + 0.05, exp(-pow(x / (inner * 0.45), 2.0)) * 0.6);
    gl_FragColor = vec4(g, 0.7 * uOpacity);
  } else {
    if (inCap || ax > inner) discard;
    // front glass: vertical gloss streak on the lit side + faint glow in the middle
    float streak = exp(-pow((x / inner + 0.62) / 0.12, 2.0)) * 0.55;
    float glow = exp(-pow(x / (inner * 0.5), 2.0)) * 0.12;
    float a = max(streak, glow);
    if (a < 0.01) discard;
    gl_FragColor = vec4(vec3(1.0), a * uOpacity);
  }
}`;function Ru(e,t){let n=new q;return n.setHex(parseInt(e.slice(1),16),st),new zi({vertexShader:Iu,fragmentShader:Lu,transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{uColor:{value:n},uLen:{value:1},uStrip:{value:.5},uOpacity:{value:1},uPass:{value:t},uK:{value:1}}})}var zu=.3,Bu=.24,Vu=.34,Hu=`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Uu=`
uniform vec3 uColor; uniform float uLen; uniform float uStrip; uniform float uOpacity; uniform int uPass; uniform float uK;
uniform float uBend[8]; uniform int uNBend;
varying vec2 vUv;
void main(){
  float d = vUv.y * uLen, x = (vUv.x - 0.5) * 2.0 * uStrip;
  float hw = ${zu.toFixed(2)} * uK, inner = ${Bu.toFixed(2)} * uK;
  float ax = abs(x);
  // round open ends
  float e = min(d, uLen - d);
  if (ax > hw || (e < 0.05 && length(vec2(max(ax - (hw - 0.05), 0.0), 0.05 - e)) > 0.05)) discard;
  float tip = ${Vu.toFixed(2)};
  bool striped = d < tip || d > uLen - tip;
  // accordion ribs within 0.28 of a bend
  float rib = 0.0;
  for (int k = 0; k < 8; k++) {
    if (k >= uNBend) break;
    float t = abs(d - uBend[k]);
    if (t < 0.28) rib = max(rib, 0.5 + 0.5 * cos(t / 0.07 * 3.14159));
  }
  if (uPass == 0) {
    // back: faint plastic tint inside, darker band at the edges (the far wall)
    vec3 c = mix(vec3(0.82, 0.86, 0.95), uColor, 0.12);
    float a = mix(0.18, 0.5, smoothstep(0.55, 1.0, ax / hw));
    gl_FragColor = vec4(c * 0.85, a * uOpacity);
  } else {
    // front: bright plastic edges, gloss line, stripes at the tips, ribs at bends
    float edgeT = smoothstep(inner - 0.01, hw, ax);
    vec3 c = vec3(1.0); float a = edgeT * 0.75;
    float gloss = exp(-pow((x / hw + 0.5) / 0.1, 2.0)) * 0.6;
    a = max(a, gloss);
    if (striped) {
      // diagonal candy stripes in the target colour, opaque
      float s = fract((d + x * 0.6) / 0.16);
      vec3 sc = s < 0.5 ? uColor : vec3(1.0);
      sc *= mix(1.08, 0.75, smoothstep(0.3, 1.0, ax / hw));
      sc = mix(sc, vec3(1.0), gloss * 0.6);
      c = sc; a = 1.0;
      // open end: lighter rim
      if (e < 0.06) { c = mix(uColor, vec3(1.0), 0.55); }
    }
    if (rib > 0.0 && !striped) { c = mix(c, vec3(1.0), rib * 0.5); a = max(a, rib * 0.55); }
    if (a < 0.01) discard;
    gl_FragColor = vec4(c, a * uOpacity);
  }
}`;function Wu(e,t){let n=new q;return n.setHex(parseInt(e.slice(1),16),st),new zi({vertexShader:Hu,fragmentShader:Uu,transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{uColor:{value:n},uLen:{value:1},uStrip:{value:.5},uOpacity:{value:1},uPass:{value:t},uK:{value:1},uBend:{value:Array(8).fill(-9)},uNBend:{value:0}}})}var Gu={kind:`tube`},Ku=.5,qu=.4554,Ju=.615,Yu=.99,Xu=400/214*Yu,Zu=[.25,.43],Qu=0,$u=.42,ed=160,td=[.12,.57],nd=.5,rd=.8,id=class{constructor(e){r(this,`pts`,void 0),this.pts=e}at(e){let t=this.pts,n=t.length;if(n===1)return t[0];if(e<=0)return[t[0][0]+(t[0][0]-t[1][0])*-e,t[0][1]+(t[0][1]-t[1][1])*-e];if(e>=n-1){let r=t[n-2],i=t[n-1],a=e-(n-1);return[i[0]+(i[0]-r[0])*a,i[1]+(i[1]-r[1])*a]}let r=Math.round(e);if(r>0&&r<n-1&&Math.abs(e-r)<$u){let n=t[r-1],i=t[r],a=t[r+1],o=[i[0]-n[0],i[1]-n[1]],s=[a[0]-i[0],a[1]-i[1]];if(o[0]!==s[0]||o[1]!==s[1]){let t=[i[0]-o[0]*$u,i[1]-o[1]*$u],n=[i[0]+s[0]*$u,i[1]+s[1]*$u],a=(e-(r-$u))/(2*$u),c=1-a;return[c*c*t[0]+2*c*a*i[0]+a*a*n[0],c*c*t[1]+2*c*a*i[1]+a*a*n[1]]}}let i=Math.floor(e),a=e-i,o=t[i],s=t[i+1];return[o[0]+(s[0]-o[0])*a,o[1]+(s[1]-o[1])*a]}tangent(e){let t=.01,n=this.at(e-t),r=this.at(e+t),i=r[0]-n[0],a=r[1]-n[1],o=Math.hypot(i,a)||1;return[i/o,a/o]}};function ad(e,t){let n=Zu[0]*Xu,r=(1-Zu[1])*Xu,i=Math.max(.001,t-n-r);return e<=n?e/Xu:e>=t-r?1-(t-e)/Xu:Zu[0]+(Zu[1]-Zu[0])*(e-n)/i}function od(e,t){let n=Zu[0]*Xu,r=(1-Zu[1])*Xu,i=Math.max(.001,t-n-r);return e<=Zu[0]?e*Xu:e>=Zu[1]?t-(1-e)*Xu:n+(e-Zu[0])/(Zu[1]-Zu[0])*i}var sd=[{name:`Tail`,v:.075,x:0,w:.3,l:.32,order:0},{name:`RearLeft`,v:.091,x:-.327,w:.37,l:.43,order:3},{name:`RearRight`,v:.091,x:.327,w:.37,l:.43,order:3},{name:`FrontLeft`,v:.6,x:-.355,w:.33,l:.34,order:4},{name:`FrontRight`,v:.6,x:.355,w:.33,l:.34,order:4},{name:`EarLeft`,v:.81,x:-.332,w:.323,l:.363375,tilt:12.7,base:!0,order:1.2},{name:`EarRight`,v:.81,x:.348,w:.323,l:.363375,tilt:-12.7,base:!0,order:1.2}],cd={v:.866,w:.727,l:.23},ld={v:.823,w:.15,l:.13,drinkW:.6,drinkL:.58},ud=`varying vec2 vUv; varying vec2 vPos;
void main(){ vUv = uv; vPos = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,dd=`
uniform vec3 uWater; uniform vec3 uFoam; uniform vec3 uTop; uniform float uLevel; uniform float uCx;
uniform float uWx; uniform float uWz; uniform float uLen; uniform float uHalfW; uniform float uTime; uniform float uOpacity;
uniform float uDepth; uniform float uCapR;
uniform float uLayerTop[6]; uniform vec3 uLayerCol[6]; uniform int uNLower;   // sort mode: stacked colour layers
varying vec2 vUv; varying vec2 vPos;
void main(){
  float x = (vUv.x - 0.5) * 2.0 * uHalfW, y = vUv.y * uLen;
  float r = min(uHalfW, uCapR);                    // corner radius (= capsule when uCapR >= uHalfW)
  vec2 q = vec2(abs(x), abs(y - uLen * 0.5)) - vec2(uHalfW - r, uLen * 0.5 - r);
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  if (d > 0.0) discard;
  float px = vPos.x - uCx;
  float wave = sin(px * 5.15 * sin(uTime * 0.5)) * (abs(uWx) + uWz) * 0.21;
  float h = vPos.y - uLevel + px * uWx + wave;
  vec3 col;
  float band = uDepth * uWz;                   // visible top surface height
  if (h > band) discard;
  if (h > 0.0) col = mix(uTop, uFoam, step(band - 0.0666 * 0.2, h));   // back faces: top colour, foam Line*0.2 at the far edge
  else {
    float foam = step(-0.0666, h);
    col = mix(uWater, uFoam, foam);
    // lower layers (bottom first), sharp borders like Water Sort; they follow the same tilt/wave
    float yy = vPos.y + px * uWx + wave * 0.5;
    for (int k = 0; k < 6; k++) { if (k < uNLower && yy < uLayerTop[k]) { col = uLayerCol[k]; break; } }
    float across = clamp(abs(x) / uHalfW, 0.0, 0.999);
    float rim = pow(1.0 - sqrt(1.0 - across * across), 5.62);
    col += uFoam * uFoam * rim;
  }
  gl_FragColor = vec4(col, uOpacity);
}`,fd=class{constructor(e,t,n){r(this,`group`,new jn),r(this,`color`,void 0),r(this,`outer`,void 0),r(this,`body`,void 0),r(this,`outerBody`,null),r(this,`liquid`,void 0),r(this,`parts`,[]),r(this,`eyes`,void 0),r(this,`eyesClosed`,void 0),r(this,`mouth`,void 0),r(this,`mouthDrink`,void 0),r(this,`line`,new id([[0,0]])),r(this,`uStart`,0),r(this,`len`,2),r(this,`fill`,0),r(this,`layers`,null),r(this,`capacity`,1),r(this,`drinking`,0),r(this,`blinkAt`,3+Math.random()*6),r(this,`blinkT`,0),r(this,`time`,0),r(this,`scale`,1),r(this,`alpha`,1),r(this,`shrink`,1),r(this,`toAddX`,0),r(this,`sine`,0),r(this,`velX`,0),r(this,`lastX`,0),r(this,`lastY`,0),r(this,`baseOrder`,100),r(this,`worm`,!1),r(this,`tube`,!0),r(this,`straw`,!0),r(this,`front`,null),r(this,`antenna`,null),this.color=e,this.outer=t,this.len=n;let i=e=>new Xr({map:e,transparent:!0,depthTest:!1,depthWrite:!1}),a=()=>{let e=new Rr;e.setAttribute(`position`,new Cr(new Float32Array(966),3)),e.setAttribute(`uv`,new Cr(new Float32Array(644),2));let t=[];for(let e=0;e<ed;e++){let n=e*2;t.push(n,n+1,n+2,n+1,n+3,n+2)}return e.setIndex(t),e};this.worm=Gu.kind===`worm`,this.straw=Gu.kind===`straw`,this.tube=Gu.kind===`tube`||this.straw;let o=(e,t)=>this.straw?Wu(du[e].display,t):Ru(du[e].display,t),s=e=>this.tube?o(e,0):this.worm?ku(du[e].display,n,qu,Ju):i(rl(`cwj/cat/body_${du[e].id}.png`));t!==null&&(this.outerBody=new J(a(),s(t)),this.group.add(this.outerBody)),this.body=new J(a(),s(e)),this.group.add(this.body),this.liquid=new J(a(),new zi({vertexShader:ud,fragmentShader:dd,transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{uWater:{value:ul(e).water},uFoam:{value:ul(e).foam},uTop:{value:ul(e).top},uLevel:{value:-1e3},uCx:{value:0},uWx:{value:0},uWz:{value:.2},uLen:{value:1},uHalfW:{value:nd/2},uTime:{value:0},uOpacity:{value:1},uDepth:{value:nd*.6},uCapR:{value:9},uLayerTop:{value:[,,,,,,].fill(-1e3)},uLayerCol:{value:Array.from({length:6},()=>new q)},uNLower:{value:0}}})),this.group.add(this.liquid);let c=()=>new Ai(1,1);if(this.tube){this.front=new J(a(),o(e,1)),this.group.add(this.front),this.eyes=new J(c(),i(Au(0))),this.eyesClosed=new J(c(),i(Au(1))),this.mouth=new J(c(),i(Au(0))),this.mouthDrink=new J(c(),i(Au(2)));for(let e of[this.eyes,this.eyesClosed,this.mouth,this.mouthDrink])e.visible=!1}else if(this.worm)this.eyes=new J(c(),i(Au(0))),this.eyesClosed=new J(c(),i(Au(1))),this.mouth=new J(c(),i(Au(0))),this.mouth.visible=!1,this.mouthDrink=new J(c(),i(Au(2))),this.antenna=new J(c(),i(ju(du[t??e].display))),this.group.add(this.antenna);else{for(let n of sd){let r=new J(c(),i(rl(`cwj/cat/${du[t??e].id}_${n.name}.png`)));this.parts.push({def:n,mesh:r}),this.group.add(r)}this.eyes=new J(c(),i(rl(`cwj/cat/eyes_open.png`))),this.eyesClosed=new J(c(),i(rl(`cwj/cat/eyes_closed.png`))),this.mouth=new J(c(),i(rl(`cwj/cat/mouth_idle.png`))),this.mouthDrink=new J(c(),i(rl(`cwj/cat/mouth_drink.png`)))}this.group.add(this.eyes,this.eyesClosed,this.mouth,this.mouthDrink)}switchToOuter(){if(this.outer===null||!this.outerBody)return;this.color=this.outer,this.outer=null,this.group.remove(this.body),this.body=this.outerBody,this.outerBody=null;let e=this.liquid.material.uniforms,t=ul(this.color);e.uWater.value=t.water,e.uFoam.value=t.foam,e.uTop.value=t.top,this.fill=0}setPose(e,t,n=this.len){this.line=new id(e),this.uStart=t,this.len=n}mouthPoint(){return this.tube?this.point(this.len-.1):this.worm?this.point(this.len-Tu*.5-.12):this.point(od(ld.v,this.len-Qu)+.12)}placeAt(e,t,n,r){let{p:i,t:a}=this.point(t);e.position.set(i[0],i[1],0),e.rotation.z=Math.atan2(a[1],a[0])-Math.PI/2,e.scale.set(n*this.scale,r*this.scale,1)}point(e,t=0){let n=this.uStart-.5+Qu+e,r=this.line.at(n),i=this.line.tangent(n);return{p:[r[0]+i[1]*t,r[1]-i[0]*t],t:i}}writeStrip(e,t,n,r,i,a){let o=e.geometry.getAttribute(`position`),s=e.geometry.getAttribute(`uv`);for(let e=0;e<=ed;e++){let c=t+(n-t)*(e/ed),{p:l,t:u}=this.point(c),d=u[1]*r*this.scale,f=-u[0]*r*this.scale;o.setXYZ(e*2,l[0]-d,l[1]-f,0),o.setXYZ(e*2+1,l[0]+d,l[1]+f,0);let p=a?(c-t)/(n-t):i(c);s.setXY(e*2,0,p),s.setXY(e*2+1,1,p)}o.needsUpdate=!0,s.needsUpdate=!0,e.geometry.computeBoundingSphere()}place(e,t,n,r,i,a=0,o=!1){let s=od(t,this.len-Qu);o&&(s+=i/2);let{p:c,t:l}=this.point(s,n*this.scale);e.position.set(c[0],c[1],0),e.rotation.z=Math.atan2(l[1],l[0])-Math.PI/2+a*Math.PI/180,e.scale.set(r*this.scale,i*this.scale,1)}update(e){this.time+=e;let t=this.point((this.len-Qu)/2).p;this.group.scale.set(this.shrink,this.shrink,1),this.group.position.set(t[0]*(1-this.shrink),t[1]*(1-this.shrink),0);let n=this.len-Qu,r=e=>ad(e,n);if(this.tube){let e=(e,t)=>{this.writeStrip(e,0,n,Ku*t,r,!0);let i=e.material.uniforms;if(i.uLen.value=n,i.uStrip.value=Ku*t,i.uK.value=t,i.uOpacity.value=this.alpha,this.straw){let e=this.line.pts,t=i.uBend.value,r=0;for(let i=1;i<e.length-1&&r<8;i++){let a=e[i-1],o=e[i],s=e[i+1];if((o[0]-a[0])*(s[1]-o[1])-(o[1]-a[1])*(s[0]-o[0])===0)continue;let c=i-(this.uStart-.5+Qu);c>0&&c<n&&(t[r++]=c)}i.uNBend.value=r}};this.outerBody?(e(this.outerBody,1),e(this.body,rd)):e(this.body,1),e(this.front,this.outerBody?rd:1)}else if(this.worm){let e=(e,t)=>{this.writeStrip(e,0,n,Ju*t,r,!0);let i=e.material.uniforms;i.uLen.value=n,i.uHalf.value=qu*t,i.uStrip.value=Ju*t,i.uBelly0.value=.35,i.uBelly1.value=n-Tu-.08,i.uOpacity.value=this.alpha};this.outerBody?(e(this.outerBody,1),e(this.body,rd)):e(this.body,1)}else this.outerBody?(this.writeStrip(this.outerBody,0,n,Yu/2,r,!1),this.writeStrip(this.body,0,n,Yu/2*rd,r,!1)):this.writeStrip(this.body,0,n,Yu/2,r,!1);let i=this.straw?.06:this.tube?Pu-.02:this.worm?.35:od(td[0],n),a=this.straw?n-.06:this.tube?n-Pu+.02:this.worm?n-Tu-.08:od(td[1],n),o=(this.straw?Bu:this.tube?Nu:nd/2)*(this.outerBody?rd:1);this.writeStrip(this.liquid,i,a,o,r,!0);let s=this.liquid.material.uniforms;s.uLen.value=(a-i)*this.scale,s.uHalfW.value=o*this.scale,s.uTime.value=this.time,s.uOpacity.value=this.alpha,s.uCapR.value=this.tube?.04:9;let c=[];for(let e=0;e<=28;e++)for(let t=-3;t<=3;t++){let n=i+(a-i)*(e/28),r=t/3.5*o,s=Math.min(n-i,a-n);s<o&&Math.hypot(r,o-s)>o||c.push(this.point(n,r).p[1])}c.sort((e,t)=>e-t);let l=e=>e<=.001?-1e3:e>=.999?c[c.length-1]+.2:c[Math.floor(e*(c.length-1))],u=Math.max(0,Math.min(1,this.fill));if(this.layers){let e=this.layers.filter(e=>e.units>.001),t=e.reduce((e,t)=>e+t.units,0);u=Math.min(1,t/this.capacity);let n=0,r=s.uLayerTop.value,i=s.uLayerCol.value;e.slice(0,-1).slice(0,6).forEach((e,t)=>{n+=e.units,r[t]=l(n/this.capacity),i[t].copy(ul(e.color).water)}),s.uNLower.value=Math.max(0,Math.min(6,e.length-1));let a=e[e.length-1];if(a){let e=ul(a.color);s.uWater.value=e.water,s.uFoam.value=e.foam,s.uTop.value=e.top}}else s.uNLower.value=0;if(s.uLevel.value=l(u),s.uCx.value=t[0],e>0){let n=Math.min(1,e*1);this.toAddX+=(0-this.toAddX)*n,this.sine+=(Math.sin(Math.PI*this.time)-this.sine)*Math.min(1,e*Math.min(10,Math.max(1,Math.abs(this.velX))));let r=this.toAddX*this.sine;this.velX=(this.lastX-t[0])/e;let i=(this.lastY-t[1])/e,a=u>0?.02:0;this.toAddX+=Math.max(-a,Math.min(a,(this.velX+.2*i)*a)),s.uWx.value=r,s.uWz.value=.2}this.lastX=t[0],this.lastY=t[1];for(let{def:e,mesh:t}of this.parts){let n=e.name===`Tail`?Math.sin(this.time*2.865*Math.PI*2)*(this.drinking>0?18:6):0;this.place(t,e.v,e.x,e.w,e.l,(e.tilt??0)+n,e.base)}this.blinkAt-=e,this.blinkAt<=0&&(this.blinkT=.12,this.blinkAt=3+Math.random()*6),this.blinkT=Math.max(0,this.blinkT-e);let d=this.blinkT>0,f=this.drinking>0;this.drinking=Math.max(0,this.drinking-e);let p=f?1-.18*(.5+.5*Math.sin(this.time*2.3*Math.PI*2)):1;if(!this.tube){if(this.worm){let e=n-Tu*.5+.03,t=.92,r=.92*160/256;this.placeAt(this.eyes,e,t,r),this.placeAt(this.eyesClosed,e,t,r),this.placeAt(this.mouthDrink,e,t,r*(.96+.04*p)),this.eyes.visible=!d&&!f,this.eyesClosed.visible=d&&!f,this.mouthDrink.visible=f,this.placeAt(this.antenna,n+.2+Math.sin(this.time*2.2)*.04,.8,.5)}else this.place(this.eyes,cd.v,0,cd.w,cd.l),this.place(this.eyesClosed,cd.v,0,cd.w,cd.l),this.eyes.visible=!d,this.eyesClosed.visible=d,this.place(this.mouth,ld.v,0,ld.w,ld.l),this.place(this.mouthDrink,ld.v,0,ld.drinkW*.5,ld.drinkL*.5*p),this.mouth.visible=!f,this.mouthDrink.visible=f}let m=this.baseOrder;this.outerBody&&(this.outerBody.renderOrder=m+1),this.body.renderOrder=m+1.5,this.liquid.renderOrder=m+2;for(let{def:e,mesh:t}of this.parts)t.renderOrder=m+e.order;this.eyes.renderOrder=this.eyesClosed.renderOrder=m+6,this.mouth.renderOrder=this.mouthDrink.renderOrder=m+7,this.antenna&&(this.antenna.renderOrder=m+.5),this.front&&(this.front.renderOrder=m+3),this.group.traverse(e=>{let t=e.material;t&&!(t instanceof zi)&&(t.opacity=this.alpha)})}dispose(){this.group.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()})}},Q=96,pd=new Map;function md(e){let t=pd.get(e);return t||(t=new Image,t.src=nl(e),pd.set(e,t)),t}function hd(){let e=[`cwj/textures/Ice_Txt.png`,`cwj/textures/Out_side_hide_box.png`,`cwj/textures/text_hide_box.png`,`cwj/textures/hide_grid.png`,`cwj/textures/Lock_out_mew.png`,`cwj/textures/inside_new.png`,`cwj/textures/text_cat.png`,`cwj/textures/count.png`,`cwj/sprites/Gate_ice.png`,`cwj/sprites/Arrow_Cat.png`,...[`yellow`,`red`,`green`,`purple`,`black`].flatMap(e=>[`cwj/textures/key_${e}.png`,`cwj/textures/${e}.png`])];return Promise.all(e.map(e=>new Promise(t=>{let n=md(e);n.complete?t():(n.onload=()=>t(),n.onerror=()=>t())}))).then(()=>void 0)}function gd(e,t,n,r,i,a=`#fff`,o=`#22003C`){e.font=`${i}px Mikado, "Baloo 2", sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.lineJoin=`round`,e.lineWidth=i*.18,e.strokeStyle=o,e.strokeText(String(t),n,r),e.fillStyle=a,e.fillText(String(t),n,r)}var _d=class{constructor(e,t){r(this,`s`,void 0),r(this,`view`,void 0),r(this,`group`,new jn),r(this,`items`,[]),r(this,`last`,new Map),this.s=e,this.view=t;let n=e.lv;n.cats.forEach((e,t)=>{e.ice&&this.cellsItem(e.cells,600,`ice${t}`,()=>String(this.s.catIce(t)),(e,n,r,i)=>{let a=this.s.catIce(t);if(a<=0)return;e.save(),e.beginPath();for(let[t,a]of n)e.roundRect(r(t)-Q*.5,i(a)-Q*.5,Q,Q,Q*.16);e.clip();let o=md(`cwj/textures/Ice_Txt.png`);e.globalAlpha=.92,e.drawImage(o,0,0,e.canvas.width,e.canvas.height),e.restore(),e.strokeStyle=`rgba(217,252,255,0.95)`,e.lineWidth=Q*.05,e.beginPath();for(let[t,a]of n)e.roundRect(r(t)-Q*.47,i(a)-Q*.47,Q*.94,Q*.94,Q*.16);e.stroke();let[s,c]=n[n.length-1];gd(e,a,r(s),i(c),Q*.5,`#2B6C8F`,`#fff`)})}),n.hide.forEach((e,t)=>{let r=[];for(let t=e.y;t<e.y+e.h;t++)for(let i=e.x;i<e.x+e.w;i++)r.push(t*n.w+i);this.cellsItem(r,650,`hide${t}`,()=>String(this.s.hideRemaining(t)),(n,r,i,a)=>{let o=this.s.hideRemaining(t);if(o<=0)return;let s=i(e.x)-Q/2,c=a(e.y+e.h-1)-Q/2,l=e.w*Q,u=e.h*Q;if(e.grid)n.drawImage(md(`cwj/textures/hide_grid.png`),s-Q*.02,c-Q*.06,l+Q*.04,u+Q*.08);else{n.save(),n.beginPath(),n.roundRect(s+4,c+4,l-8,u-8,Q*.12),n.clip();let e=md(`cwj/textures/text_hide_box.png`);for(let t=c;t<c+u;t+=Q*1.5)n.drawImage(e,s,t,l,Q*1.5);n.restore(),vd(n,md(`cwj/textures/Out_side_hide_box.png`),s,c,l,u,.18)}let d=s+l/2,f=c+u/2,p=Q*.36;n.drawImage(md(`cwj/textures/count.png`),d-p,f-p,2*p,2*p),gd(n,o,d,f+Q*.02,Q*.38)})}),n.locks.forEach((e,t)=>{let n=f[e.key];this.cellsItem(e.cells,650,`lock${t}`,()=>String(this.s.lockRemaining(t)),(e,r,i,a)=>{let o=this.s.lockRemaining(t);if(o<=0)return;let s=r.map(e=>e[0]),c=r.map(e=>e[1]),l=i(Math.min(...s))-Q/2,u=a(Math.max(...c))-Q/2,d=(Math.max(...s)-Math.min(...s)+1)*Q,f=(Math.max(...c)-Math.min(...c)+1)*Q;e.drawImage(md(`cwj/textures/inside_new.png`),l,u,d,f),e.globalAlpha=.25,e.drawImage(md(`cwj/textures/text_cat.png`),l,u,d,f),e.globalAlpha=1,vd(e,md(`cwj/textures/Lock_out_mew.png`),l,u,d,f,.12);let p=Q*.8,m=l+d/2,h=u+f/2;e.drawImage(md(`cwj/textures/${n}.png`),m-p/2,h-p/2,p,p),gd(e,o,m,h+Q*.1,Q*.34)})}),n.cats.forEach((e,t)=>{e.key!==void 0&&this.badge(t,`key${t}`,()=>this.s.cats[t].removed?``:`k`,t=>{t.drawImage(md(`cwj/textures/key_${f[e.key]}.png`),0,0,128,128)}),e.bow&&this.badge(t,`bow${t}`,()=>String(this.s.catBow(t)),e=>{let n=this.s.catBow(t);n<=0||(e.fillStyle=`rgba(255,255,255,0.9)`,e.beginPath(),e.moveTo(64,6),e.lineTo(96,40),e.lineTo(32,40),e.fill(),e.beginPath(),e.moveTo(64,122),e.lineTo(96,88),e.lineTo(32,88),e.fill(),e.fillRect(56,36,16,56),gd(e,n,64,64,46))})})}cellsItem(e,t,n,r,i){let a=e.map(e=>this.s.xy(e)),o=a.map(e=>e[0]),s=a.map(e=>e[1]),c=Math.min(...o)-.5,l=Math.max(...o)+.5,u=Math.min(...s)-.5,d=Math.max(...s)+.5,f=.2,p=Math.ceil((l-c+2*f)*Q),m=Math.ceil((d-u+2*f)*Q),h=document.createElement(`canvas`);h.width=p,h.height=m;let g=h.getContext(`2d`),_=e=>(e-c+f)*Q,v=e=>(d-e+f)*Q,y=new Ti(h);y.colorSpace=ot;let b=new J(new Ai(p/Q,m/Q),new Xr({map:y,transparent:!0,depthTest:!1,depthWrite:!1})),[x,S]=this.view.local((c+l)/2,(u+d)/2);b.position.set(x,S,0),b.renderOrder=t,this.items.push({mesh:b,key:n,draw:()=>{g.clearRect(0,0,p,m),i(g,a,_,v),y.needsUpdate=!0},ctx:g,tex:y,state:r}),this.group.add(b)}badge(e,t,n,r){let i=document.createElement(`canvas`);i.width=128,i.height=128;let a=i.getContext(`2d`),o=new Ti(i);o.colorSpace=ot;let s=new J(new Ai(.5,.5),new Xr({map:o,transparent:!0,depthTest:!1,depthWrite:!1}));this.items.push({mesh:s,key:t,draw:()=>{a.clearRect(0,0,128,128),r(a),o.needsUpdate=!0},ctx:a,tex:o,state:n,follow:()=>{let t=this.view.cats[e],n=this.s.cats[e].cells,r=n[Math.floor((n.length-1)/2)],[i,a]=this.s.xy(r),[o,c]=this.view.local(i,a);s.position.set(o,c,0),s.renderOrder=(t?.baseOrder??100)+8,s.visible=!this.s.cats[e].removed}}),this.group.add(s)}update(){for(let e of this.items){let t=e.state();this.last.get(e.key)!==t&&(this.last.set(e.key,t),e.draw()),e.follow?.()}}};function vd(e,t,n,r,i,a,o){let s=t.naturalWidth||1,c=t.naturalHeight||1,l=Math.min(s,c)*o,u=Q*.32,d=[0,l,s-l,s],f=[0,l,c-l,c],p=[n,n+u,n+i-u,n+i],m=[r,r+u,r+a-u,r+a];for(let n=0;n<3;n++)for(let r=0;r<3;r++)(n!==1||r!==1)&&e.drawImage(t,d[n],f[r],d[n+1]-d[n],f[r+1]-f[r],p[n],m[r],p[n+1]-p[n],m[r+1]-m[r])}var yd=2.17,bd=.4,xd=class{constructor(e){r(this,`canvas`,void 0),r(this,`renderer`,void 0),r(this,`scene`,new zn),r(this,`camera`,new wa(-1,1,1,-1,-100,100)),r(this,`geom`,void 0),r(this,`frame`,.61),r(this,`cats`,[]),r(this,`gates`,[]),r(this,`overlays`,void 0),r(this,`levelRoot`,new jn),r(this,`scale`,1.15),r(this,`w`,1),r(this,`h`,1),this.canvas=e,this.renderer=new $c({canvas:e,antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setClearColor(0,0),this.scene.add(this.levelRoot)}load(e){this.levelRoot.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose()}),this.scene.remove(this.levelRoot),this.levelRoot=new jn,this.scene.add(this.levelRoot);let t=e.lv;this.geom=bu(t),this.scale=t.scale,this.frame=t.mech.includes(`sort`)?bd:.61,this.levelRoot.add(Cu(t,this.geom,this.frame,t.mech.includes(`sort`)?0:void 0).group),this.gates=t.gates.map(t=>{let[n,r]=e.xy(t.cell),i=new Jl(this.local(n,r),t.out,t.queue);return this.levelRoot.add(i.group),i}),this.cats=t.mech.includes(`blocks`)?[]:e.cats.map(e=>{let t=new fd(e.color,e.outer,e.cells.length);return this.levelRoot.add(t.group),t}),this.overlays=new _d(e,this),this.levelRoot.add(this.overlays.group),this.resize(this.w,this.h)}local(e,t){return[e-this.geom.cx,t-this.geom.cy]}resize(e,t){if(this.w=e,this.h=t,this.renderer.setSize(e,t,!1),!this.geom)return;let n=e/t,r=this.geom,i=(.5*r.cols+yd)/(n*this.scale);i=Math.max(i,(r.rows*.5+1.3)/this.scale),this.camera.left=-i*n,this.camera.right=i*n,this.camera.top=i,this.camera.bottom=-i,this.camera.updateProjectionMatrix()}toGrid(e,t){let n=this.camera.left+e/this.w*(this.camera.right-this.camera.left),r=this.camera.top-t/this.h*(this.camera.top-this.camera.bottom);return[n+this.geom.cx,r+this.geom.cy]}toScreen(e,t){let n=e-this.geom.cx,r=t-this.geom.cy;return[(n-this.camera.left)/(this.camera.right-this.camera.left)*this.w,(this.camera.top-r)/(this.camera.top-this.camera.bottom)*this.h]}get unitsPerPx(){return(this.camera.right-this.camera.left)/this.w}makeStream(e){let t=new El(e);return t.mesh.visible=!1,this.levelRoot.add(t.mesh),t}addToLevel(e){this.levelRoot.add(e)}removeStream(e){this.levelRoot.remove(e.mesh),e.dispose()}render(){this.renderer.render(this.scene,this.camera)}},Sd=1080,Cd=1920,wd=[{id:ou.Hammer,name:`PAW HAMMER`,unlock:3,price:250,icon:`Paw_Hammer_in_game`,size:[170,176],at:[10.4,91],tip:`Use the hammer to shorten cats and break obstacles.`},{id:ou.Clock,name:`TIME FREEZE`,unlock:8,price:350,icon:`Frozen_Clock_in_game`,size:[174,167],at:[-4,91],tip:`Freeze time for 10 seconds.`},{id:ou.Pump,name:`MAGIC PUMP`,unlock:15,price:500,icon:`Magic_Pump_in_game`,size:[162,176],at:[0,91],tip:`Remove cats of the same color.`}],Td=e=>nl(`cwj/sprites/${e}.png`);function Ed(e,t,n){let r=document.createElement(e);return r.className=t,n&&n.appendChild(r),r}function Dd(e,t,n,r,i){Object.assign(e.style,{left:`calc(${t}px * var(--u))`,top:`calc(${n}px * var(--u))`,width:`calc(${r}px * var(--u))`,height:`calc(${i}px * var(--u))`})}var Od=class{constructor(e){r(this,`root`,void 0),r(this,`coinText`,void 0),r(this,`levelText`,void 0),r(this,`timeText`,void 0),r(this,`clockFrozen`,void 0),r(this,`slots`,[]),r(this,`top`,void 0),r(this,`bot`,void 0),r(this,`buf`,void 0),r(this,`onBooster`,()=>void 0),r(this,`onSettings`,()=>void 0),this.root=Ed(`div`,`hud`,e),this.top=Ed(`div`,`hud-top`,this.root);let t=Ed(`div`,`abs`,this.top);Dd(t,26.2,37.5,250,80),t.style.backgroundImage=`url(${Td(`back_coin`)})`,t.style.backgroundSize=`100% 100%`;let n=Ed(`img`,`abs`,t);n.src=Td(`icon_0`),Dd(n,-17.29,-15,110,110);let i=Ed(`img`,`abs`,t);i.src=Td(`Icon_Plus`),Dd(i,40.81,51,44,44),this.coinText=Ed(`div`,`abs txt`,t),Dd(this.coinText,152.2-70,36.4-25,140,50),this.coinText.style.fontSize=`calc(37.15px * var(--u))`;let a=Ed(`div`,`abs center-x`,this.top);Dd(a,0,0,353,220),a.style.left=`50%`,a.style.transform=`translateX(-50%)`,a.style.backgroundImage=`url(${Td(`Level_Time`)})`,a.style.backgroundSize=`100% 100%`,this.levelText=Ed(`div`,`abs txt`,a),Dd(this.levelText,76.5,54.8-25,200,50),this.levelText.style.fontSize=`calc(36px * var(--u))`,this.timeText=Ed(`div`,`abs txt time`,a),Dd(this.timeText,123.4,95.5,173,69),this.timeText.style.fontSize=`calc(51.15px * var(--u))`;let o=Ed(`img`,`abs`,a);o.src=Td(`icon`),Dd(o,39.2,81,94,94),this.clockFrozen=Ed(`img`,`abs`,a),this.clockFrozen.src=Td(`anim_Clock_2`),Dd(this.clockFrozen,39.2,81,94,94),this.clockFrozen.style.opacity=`0`,this.buf=Ed(`div`,`abs txt buf`,this.top),Dd(this.buf,0,232,220,64),this.buf.style.left=`50%`,this.buf.style.transform=`translateX(-50%)`,this.buf.style.fontSize=`calc(38px * var(--u))`;let s=Ed(`img`,`abs btn right`,this.top);s.src=Td(`setting`),Dd(s,0,37.5,115,115),s.style.right=`calc(31.8px * var(--u))`,s.style.left=`auto`,s.onclick=()=>{Z.play(Xl.ButtonClick),this.onSettings()};let c=Ed(`img`,`abs right`,this.top);c.src=Td(`icon_ads`),Dd(c,0,45,100,100),c.style.right=`calc(170px * var(--u))`,c.style.left=`auto`,this.bot=Ed(`div`,`hud-bot`,this.root),wd.forEach((e,t)=>{let n=Ed(`div`,`slot`,this.bot);n.style.left=`${(t*2+1)/6*100}%`;let r=Ed(`img`,`abs`,n);r.src=Td(`back`),Dd(r,-115,-101.75,230,203.5);let i=.8,a=Ed(`img`,`abs`,n);a.src=Td(e.icon),Dd(a,e.at[0]-e.size[0]*i/2,-e.at[1]-e.size[1]*i/2,e.size[0]*i,e.size[1]*i);let o=Ed(`div`,`abs txt`,n);Dd(o,-26,-9,42,72),o.style.fontSize=`calc(31.7px * var(--u))`;let s=Ed(`img`,`abs`,n);s.src=Td(`Icon_Plus`),Dd(s,-43,-13,80,80);let c=Ed(`div`,`abs`,n);Dd(c,-115,-101.75,230,203.5);let l=Ed(`img`,`abs`,c);l.src=Td(`Lock`),Dd(l,60,101.75-70.4-55,110,110);let u=Ed(`div`,`abs txt anton`,c);Dd(u,0,108.75,230,50),u.textContent=`LV ${e.unlock}`,u.style.fontSize=`calc(31.6px * var(--u))`,n.onclick=()=>{Z.play(Xl.ButtonClick),this.onBooster(e.id)},this.slots.push({def:e,root:n,icon:a,count:o,add:s,lock:c})})}layout(e,t){let n=Math.sqrt(e/Sd*(t/Cd));this.root.style.setProperty(`--u`,String(n))}setBuffer(e,t){this.buf.style.display=t>0?``:`none`,this.buf.textContent=`💧 ${e}/${t}`,this.buf.classList.toggle(`warn`,t>0&&e>=t-2)}set(e){this.coinText.textContent=String(e.coins),this.levelText.textContent=`Level ${e.level}`;let t=Math.ceil(e.time);this.timeText.textContent=`${Math.floor(t/60)}:${String(t%60).padStart(2,`0`)}`,this.clockFrozen.style.opacity=e.frozen>0?`1`:`0`;for(let t of this.slots){let n=e.level<t.def.unlock,r=e.boosters[t.def.id]??0;t.lock.style.display=n?``:`none`,t.icon.style.display=t.count.style.display=n?`none`:``,t.count.textContent=String(r),t.count.style.display=n||r===0?`none`:``,t.add.style.display=!n&&r===0?``:`none`,t.root.classList.toggle(`active`,e.targeting===t.def.id)}}};function kd(e,t,n,r){let i=Ed(`div`,`popup-wrap`,e),a=Ed(`div`,`popup`,i);Ed(`div`,`popup-title`,a).textContent=t,n&&(Ed(`div`,`popup-body`,a).innerHTML=n);let o=Ed(`div`,`popup-row`,a);for(let e of r){let t=Ed(`button`,`pbtn `+(e.cls??``),o);t.textContent=e.label,t.onclick=()=>{Z.play(Xl.ButtonClick),i.remove(),e.on()}}return i}var Ad=.61,jd=.18,Md=.56,Nd=24,Pd=`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Fd=`
uniform vec4 uSeg[${Nd}]; uniform vec3 uCol[${Nd}]; uniform int uN; uniform float uLen; uniform float uFlow;
varying vec2 vUv;
float wrapd(float a){ return mod(a + uLen * 8.0, uLen); }
float hash(float n){ return fract(sin(n * 127.1) * 43758.5453); }
void main(){
  float s = vUv.y * uLen, u = vUv.x;
  float edge = smoothstep(0.0, 0.05, u) * smoothstep(1.0, 0.95, u);           // soft outline of the tube
  // empty tube: dark navy, lighter toward the frame side, thin light outer rim
  vec3 col = mix(vec3(0.19, 0.18, 0.41), vec3(0.36, 0.36, 0.52), smoothstep(0.55, 1.0, u));
  col = mix(vec3(0.30, 0.30, 0.50), col, smoothstep(0.02, 0.10, u));
  bool wet = false;
  for (int k = 0; k < ${Nd}; k++) {
    if (k >= uN) break;
    float t = wrapd(uSeg[k].x - s);                                             // distance behind the head
    if (t > uSeg[k].y) continue;
    vec3 w = uCol[k];
    vec3 c = w * (0.92 + 0.08 * smoothstep(0.1, 0.35, u));
    c = mix(c, mix(w, vec3(1.0), 0.32), exp(-pow((u - 0.33) / 0.13, 2.0)));    // highlight band
    c *= 1.0 - 0.22 * smoothstep(0.55, 1.0, u);                                 // darker toward the frame
    c = mix(mix(w, vec3(1.0), 0.45), c, smoothstep(0.02, 0.09, u));             // light outer rim
    col = c; wet = true;
  }
  // small bubbles riding in the water
  if (wet) {
    float ss = wrapd(s - uFlow);
    float cell = floor(ss / 0.55);
    if (hash(cell * 3.7) < 0.35) {
      vec2 bc = vec2((cell + 0.5) * 0.55, 0.25 + 0.5 * hash(cell * 1.3));
      float r = 0.025 + 0.02 * hash(cell * 9.1);
      float d = length(vec2(ss - bc.x, (u - bc.y) * ${Md.toFixed(2)}));
      col = mix(col, vec3(1.0), smoothstep(r, r - 0.008, d) * smoothstep(r - 0.022, r - 0.012, d) * 0.6);
    }
  }
  gl_FragColor = vec4(col, edge);
}`,Id=class{constructor(e,t=Ad,n=e=>ul(e).water,i=jd){r(this,`colorOf`,void 0),r(this,`mesh`,void 0),r(this,`len`,void 0),r(this,`pts`,[]),r(this,`cum`,[]),r(this,`mat`,void 0),this.colorOf=n;let a=t+Md/2-.03,o=e.minx-.5-e.cx,s=e.maxx+.5-e.cx,c=e.miny-.5-e.cy,l=e.maxy+.5-e.cy+i,u=[[s,l,Math.PI/2],[s,c,0],[o,c,-Math.PI/2],[o,l,-Math.PI]];for(let[e,t,n]of u)for(let r=0;r<=12;r++){let i=n-r/12*(Math.PI/2);this.pts.push([e+Math.cos(i)*a,t+Math.sin(i)*a])}this.pts.unshift([o,l+a]),this.pts.push(this.pts[0]),this.cum=[0];for(let e=1;e<this.pts.length;e++)this.cum.push(this.cum[e-1]+Math.hypot(this.pts[e][0]-this.pts[e-1][0],this.pts[e][1]-this.pts[e-1][1]));this.len=this.cum[this.cum.length-1];let d=[],f=[],p=[];for(let e=0;e<=480;e++){let t=e/480*this.len,n=this.at(t),r=this.at(t+.01),i=r[0]-n[0],a=r[1]-n[1],o=Math.hypot(i,a)||1;i/=o,a/=o;let s=a*Md/2,c=-i*Md/2;if(d.push(n[0]-s,n[1]-c,0,n[0]+s,n[1]+c,0),f.push(0,e/480,1,e/480),e<480){let t=e*2;p.push(t,t+1,t+2,t+1,t+3,t+2)}}let m=new Rr;m.setAttribute(`position`,new Er(d,3)),m.setAttribute(`uv`,new Er(f,2)),m.setIndex(p),this.mat=new zi({vertexShader:Pd,fragmentShader:Fd,transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{uSeg:{value:Array.from({length:Nd},()=>new K)},uCol:{value:Array.from({length:Nd},()=>new q)},uN:{value:0},uLen:{value:this.len},uFlow:{value:0}}}),this.mesh=new J(m,this.mat),this.mesh.renderOrder=1.5}at(e){e=(e%this.len+this.len)%this.len;let t=1;for(;t<this.cum.length-1&&this.cum[t]<e;)t++;let n=(e-this.cum[t-1])/(this.cum[t]-this.cum[t-1]||1),r=this.pts[t-1],i=this.pts[t];return[r[0]+(i[0]-r[0])*n,r[1]+(i[1]-r[1])*n]}project(e){let t=0,n=1/0;for(let r=0;r<=1e3;r++){let i=r/1e3*this.len,a=this.at(i),o=(a[0]-e[0])**2+(a[1]-e[1])**2;o<n&&(n=o,t=i)}return t}ahead(e,t){return((t-e)%this.len+this.len)%this.len}setSegments(e,t){let n=this.mat.uniforms,r=n.uSeg.value,i=n.uCol.value,a=(e,t)=>{let n=this.ahead(e,t);return n<.03||n>this.len-.03};e.slice(0,Nd).forEach((t,n)=>{let o=!e.some(e=>e!==t&&a(t.head,e.head-e.len)),s=!e.some(e=>e!==t&&a(e.head,t.head-t.len));r[n].set(t.head,t.len,+!!o,+!!s),i[n].copy(this.colorOf(t.color))}),n.uN.value=Math.min(Nd,e.length),n.uFlow.value=t%this.len}},Ld={0:{name:`Orange`,water:`#FF5E24`,tint:`#FF5320`,top:`#E54514`,foam:`#FF8561`,rim:`#FF8561`,glass:`#FE8835`,emission:`#220400`,stroke:`#DD6612`,strokeS:`#C55D14`,flow:`#D9430D`},1:{name:`Blue`,water:`#447BF8`,tint:`#2B4EDD`,top:`#1F40C8`,foam:`#6B84FF`,rim:`#6B85FF`,glass:`#0051FF`,emission:`#000322`,stroke:`#447BF8`,strokeS:`#5876FF`,flow:`#2B5AC3`},2:{name:`Green`,water:`#1BCA00`,tint:`#078404`,top:`#057303`,foam:`#37C034`,rim:`#37C033`,glass:`#22FF00`,emission:`#1A351A`,stroke:`#19BC00`,strokeS:`#3B9A2C`,flow:`#0E6700`},3:{name:`Purple`,water:`#8A33EE`,tint:`#4F1ACA`,top:`#420CBE`,foam:`#8A5EF1`,rim:`#8A5FF2`,glass:`#9A45FB`,emission:`#100133`,stroke:`#9440F5`,strokeS:`#5F299C`,flow:`#5610A6`},4:{name:`Yellow`,water:`#FFCD24`,tint:`#C09211`,top:`#A67F10`,foam:`#D1C295`,rim:`#D2C295`,glass:`#E6CC62`,emission:`#43330A`,stroke:`#D1B61B`,strokeS:`#DC8F13`,flow:`#AB870C`},5:{name:`Red`,water:`#E73546`,tint:`#B23033`,top:`#AD2023`,foam:`#F1777A`,rim:`#F2777A`,glass:`#E0182A`,emission:`#300001`,stroke:`#E73546`,strokeS:`#B41E2B`,flow:`#DD2234`},6:{name:`Pink`,water:`#FF49AE`,tint:`#C82C83`,top:`#BE1E77`,foam:`#FF72C1`,rim:`#FF73C0`,glass:`#FF9DBC`,emission:`#37151E`,stroke:`#EE57AB`,strokeS:`#BE066C`,flow:`#C8237D`},7:{name:`Rose`,water:`#9F3265`,tint:`#410E1F`,top:`#460A1E`,foam:`#8C4956`,rim:`#8B4956`,glass:`#A64673`,emission:`#300916`,stroke:`#9F2C62`,strokeS:`#734873`,flow:`#4F0B2B`},8:{name:`LightBlue`,water:`#33C9CA`,tint:`#009390`,top:`#007673`,foam:`#50C3C0`,rim:`#50C2C0`,glass:`#68F9F8`,emission:`#1C3C3C`,stroke:`#28BDBE`,strokeS:`#28B4B9`,flow:`#0E8384`},9:{name:`Teal`,water:`#3AB978`,tint:`#399A57`,top:`#267D41`,foam:`#7EEC9F`,rim:`#7DEB9F`,glass:`#23FF98`,emission:`#0E411E`,stroke:`#42D18E`,strokeS:`#087643`,flow:`#0D7B45`},10:{name:`Black`,water:`#8D8DFF`,tint:`#7578FF`,top:`#5558CF`,foam:`#AEB0FF`,rim:`#AFB1FF`,glass:`#A0A0FF`,emission:`#171741`,stroke:`#7C7CFA`,strokeS:`#6060CA`,flow:`#6666CF`},11:{name:`Brown`,water:`#84422B`,tint:`#411D13`,top:`#3F180D`,foam:`#7D4F43`,rim:`#7D4F43`,glass:`#AE725B`,emission:`#351811`,stroke:`#764736`,strokeS:`#93685B`,flow:`#481F11`}},Rd=.13,zd=.04,Bd=.22,Vd=.14,Hd=48,Ud=.12,Wd=.3,Gd=12,Kd=.106,qd=.0666,Jd=e=>{let t=new q;return t.setHex(parseInt(e.slice(1,7),16),st),t};function Yd(e){return Ld[e]??Ld[8]}function Xd(e){return Jd(Yd(e).water)}function Zd(e){return Jd(Yd(e).flow).lerp(Xd(e),.5)}function Qd(e,t){let n=Yd(e);return Jd(n[t]).multiplyScalar(.894).add(Jd(n.glass).multiplyScalar(Kd)).add(Jd(n.emission))}function $d(e,t,n,r,i){let a=0;r[0]=0,i[0]=-1/0,i[1]=1/0;for(let n=1;n<t;n++){let t=(e[n]+n*n-(e[r[a]]+r[a]*r[a]))/(2*n-2*r[a]);for(;t<=i[a];)a--,t=(e[n]+n*n-(e[r[a]]+r[a]*r[a]))/(2*n-2*r[a]);a++,r[a]=n,i[a]=t,i[a+1]=1/0}a=0;for(let o=0;o<t;o++){for(;i[a+1]<o;)a++;n[o]=(o-r[a])*(o-r[a])+e[r[a]]}}function ef(e,t,n){let r=Math.max(t,n),i=new Float64Array(r),a=new Float64Array(r),o=new Float64Array(r+1),s=new Int32Array(r),c=new Float64Array(t*n);for(let r=0;r<t*n;r++)c[r]=e[r]?0:0x56bc75e2d63100000;for(let e=0;e<t;e++){for(let r=0;r<n;r++)i[r]=c[r*t+e];$d(i,n,a,s,o);for(let r=0;r<n;r++)c[r*t+e]=a[r]}let l=new Float32Array(t*n);for(let e=0;e<n;e++){for(let n=0;n<t;n++)i[n]=c[e*t+n];$d(i,t,a,s,o);for(let n=0;n<t;n++)l[e*t+n]=Math.sqrt(a[n])}return l}function tf(e){let t=e.map(e=>e[0]),n=e.map(e=>e[1]),r=Math.min(...t)-.5-Ud,i=Math.min(...n)-.5-Ud,a=Math.max(...t)-Math.min(...t)+1+2*Ud,o=Math.max(...n)-Math.min(...n)+1+2*Ud,s=Math.ceil(Vd*Hd)+2,c=Math.round(a*Hd)+18,l=Math.round(o*Hd)+18,u=new Set(e.map(([e,t])=>`${e},${t}`)),d=new Uint8Array(c*l);for(let e=0;e<l;e++)for(let t=0;t<c;t++){let n=r+(t-s+.5)/Hd,a=i+(e-s+.5)/Hd;u.has(`${Math.round(n)},${Math.round(a)}`)&&(d[e*c+t]=1)}let f=ef(d,c,l),p=new Uint8Array(c*l);for(let e=0;e<c*l;e++)p[e]=f[e]<=Vd*Hd?0:1;let m=ef(p,c,l),h=new Uint8Array(c*l),g=.4*Hd;for(let e=0;e<c*l;e++)h[e]=+(m[e]>=g);let _=ef(h,c,l),v=c-18,y=l-18,b=new Uint8Array(v*y);for(let e=0;e<y;e++)for(let t=0;t<v;t++){let n=_[(e+s)*c+t+s]/Hd-Bd;b[e*v+t]=Math.round(Math.min(1,Math.max(0,(n+Wd)/(2*Wd)))*255)}let x=new ui(b,v,y,he,M);return x.unpackAlignment=1,x.magFilter=k,x.minFilter=k,x.colorSpace=``,x.needsUpdate=!0,{tex:x,x0:r,y0:i,sw:a,sh:o}}var nf=`varying vec2 vLocal; void main(){ vLocal = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,rf=`
uniform sampler2D uSdf; uniform vec4 uBox; uniform vec3 uStroke; uniform vec3 uGlass; uniform vec3 uEmission;
uniform vec4 uCell[${Gd}]; uniform vec4 uCM[${Gd}]; uniform vec3 uCA[${Gd}]; uniform vec3 uCB[${Gd}];
uniform vec3 uFA[${Gd}]; uniform vec3 uFB[${Gd}]; uniform int uNC;
uniform vec4 uCF[${Gd}]; uniform vec3 uCC[${Gd}]; uniform vec4 uCT[${Gd}];
uniform float uCx; uniform float uSinT; uniform float uCosT; uniform float uWx; uniform float uWz;
uniform float uTime; uniform float uBubbles; uniform sampler2D uBubble; uniform float uYb;
varying vec2 vLocal;
float hash(float n){ return fract(sin(n * 127.1) * 43758.5453); }
void main(){
  vec2 uv = (vLocal - uBox.xy) / uBox.zw;
  float f = texture2D(uSdf, uv).r * ${(2*Wd).toFixed(2)} - ${Wd.toFixed(2)};
  float aa = max(fwidth(f), 0.004);
  float outer = smoothstep(aa, -aa, f);
  if (outer <= 0.0) discard;
  // ---- inside: liquid seen through the glass, or the glass alone
  // Unlit/FX/Liquid: h = y + tilt (WobbleX) + sin(Freq*(x*sin(t/2) + z*cos(t/2))) * (|Wx|+|Wz|) * Amplitude, z = front [C]
  float x = vLocal.x - uCx;
  float h = vLocal.y + x * uWx + sin(5.15 * (x * uSinT - 0.6 * uCosT)) * (abs(uWx) + abs(uWz)) * 0.21;
  vec4 inside = vec4(uGlass * ${Kd} + uEmission, ${Kd});
  // inner fresnel glow of the shell along the stroke [M #5C76D6 over #4964C6]
  inside.rgb += vec3(0.07) * smoothstep(-${.18.toFixed(3)}, -${.14200000000000002.toFixed(3)}, f);
  // LIQUID = a column along the tank toward its door, one unit per cell (user 2026-11-20 "harus memanjang"), moving like
  // Water Out's pipe water: when the tank pours, the unit nearest the door leaves and everything behind it slides one cell
  // toward the door (PipeVisual drain, OutQuad [C 01 2.2]); water coming in grows from the door side (Water Sort Jam fill,
  // RE/videos/sort-idea-1115 sheets drain_01 / fill2_01).
  // Per cell: uCell = (x, y, dir to the door), uCM = (split, has A, has B, -); A fills u in [0, split] (u = 0 on the door
  // side of the cell), B fills [split, 1].
  vec2 rc = floor(vLocal + 0.5);
  vec4 cd = vec4(0.0, 0.0, 0.0, -1.0), cm = vec4(0.0), cf = vec4(0.0), ct = vec4(0.0); vec3 ca = vec3(0.0), cb = vec3(0.0), fa = vec3(0.0), fb = vec3(0.0), cc = vec3(0.0);
  for (int i = 0; i < ${Gd}; i++) {
    if (i >= uNC) break;
    if (abs(uCell[i].x - rc.x) < 0.5 && abs(uCell[i].y - rc.y) < 0.5) { cd = uCell[i]; cm = uCM[i]; ca = uCA[i]; cb = uCB[i]; fa = uFA[i]; fb = uFB[i]; cf = uCF[i]; cc = uCC[i]; ct = uCT[i]; }
  }
  vec2 dd = cd.zw, q = vLocal - cd.xy;
  float u = 0.5 - dot(q, dd), v = dot(q, vec2(-dd.y, dd.x));
  // a BEND cell (the column enters from the door side dd and leaves toward ee): quarter-circle coordinates around the
  // inner corner, so the column, its ends and the streaks curve through the cell and line up with both neighbours
  if (ct.z > 0.5) {
    vec2 ee = ct.xy, w = q - 0.5 * (dd + ee);
    float k = dot(ee, vec2(-dd.y, dd.x));
    v = k * (0.5 - length(w));
    u = atan(dot(w, -dd), dot(w, -ee)) / 1.5707963;
  }
  float sp = cm.x;
  bool part = sp > 0.001 && sp < 0.999;
  // a moving end ripples (WO surface wave look); a boundary between two colours bulges like the pipe segment caps [V 04]
  // water being filled churns: higher, faster ripples while the tank fizzes (user: "airnya terlalu tenang pas masuk")
  float amp = 0.028 + 0.05 * uBubbles;
  float e = sp + (part ? amp * sin(10.0 * v + uTime * (4.5 + 7.0 * uBubbles) + cd.x * 1.3 + cd.y * 2.1)
                       + amp * 0.6 * uBubbles * sin(23.0 * v - uTime * 13.0) : 0.0)
              // two colours meeting: a soft wavy boundary like a liquid surface, as in Water Sort Jam's multi-colour
              // bottles (RE/videos/sort-idea-1115 at 68 s, sheets l5pour_01) [V]
              + (cm.y > 0.5 && cm.z > 0.5 ? 0.035 * sin(9.0 * v + uTime * 2.6 + cd.x * 1.7 + cd.y * 2.9)
                                           + 0.015 * sin(21.0 * v - uTime * 3.3) : 0.0);
  bool inA = cm.y > 0.5 && u < e, inB = cm.z > 0.5 && u >= e;
  if (inA || inB) {
    vec3 liq = inA ? ca : cb, fo = inA ? fa : fb;
    // foam line where the column meets air (Tray_Water _Line) [D]
    if (part && ((inA && cm.z < 0.5 && u > e - ${qd}) || (inB && cm.y < 0.5 && u < e + ${qd}))) liq = fo;
    // the boundary between two colours: a thin lighter meniscus on the lower segment's side [V WSJ L6]
    if (cm.y > 0.5 && cm.z > 0.5 && inA && u > e - 0.035) liq = mix(liq, fo, 0.55);
    // rim light: Unlit/FX/Liquid adds _RimColor^2 * pow(1 - N.V, _RimPower) at the silhouette; here by the distance
    // to the glass [C 03 1.1]
    float dg = -f - ${Rd.toFixed(3)};
    liq += fo * fo * pow(1.0 - clamp(dg / 0.22, 0.0, 1.0), 3.0) * 0.5;
    // light glints sliding through the juice [own, small]
    liq *= 0.965 + 0.035 * sin(vLocal.x * 3.1 + vLocal.y * 2.3 + uTime * 1.4);
    // foam rings riding a moving end while it pours / fills [V l03 strip]
    if (uBubbles > 0.0 && part) {
      float cx = floor(v / 0.09);
      float r = 0.022 + 0.018 * hash(cx * 4.1 + floor(uTime * 3.0));
      float side = inA && cm.z < 0.5 ? -1.0 : 1.0;
      vec2 c = vec2((cx + 0.5) * 0.09, e + side * (0.035 + 0.04 * hash(cx * 2.3)));
      float d = length(vec2(v, u) - c);
      liq = mix(liq, vec3(1.0), 0.7 * uBubbles * smoothstep(r, r - 0.008, d) * smoothstep(r - 0.02, r - 0.01, d) * step(hash(cx * 7.7 + floor(uTime * 4.0)), 0.7));
    }
    // churn: bright streaks running along the column near a moving end while it fills [V WSJ fillhi_01]
    if (uBubbles > 0.0 && part) {
      float near = 1.0 - clamp(abs(u - e) / 0.45, 0.0, 1.0);
      float st = sin(v * 31.0 + 2.5 * sin(u * 9.0 - uTime * 17.0));
      liq += vec3(0.22) * uBubbles * near * smoothstep(0.55, 1.0, st);
    }
    inside = vec4(liq, 1.0);   // colours are already seen through their own glass (see juice())
  } else if (cf.z > 0.5) {
    // INFLOW, Water Sort Jam style (sheets fillhi_01/02): a frothy, lighter sheet of water rushing from the door along
    // the tank to the water building up at the back; jagged head with a white foam lip, streaks running with the flow.
    float s = cf.w + u;                                                     // distance along the tank from the door
    float head = cf.y + 0.05 * sin(13.0 * v + uTime * 19.0) + 0.03 * sin(29.0 * v - uTime * 11.0);
    if (u >= cf.x && u < head) {
      vec3 w = mix(cc, vec3(1.0), 0.3);
      float st = sin(v * 30.0 + 1.1 * sin(s * 5.0 - uTime * 22.0));
      w += vec3(0.13) * smoothstep(0.6, 1.0, st);
      w *= 0.93 + 0.07 * sin(s * 15.0 - uTime * 30.0 + v * 7.0);
      if (u > head - 0.05) w = mix(w, vec3(1.0), 0.65);                       // foam lip at the head
      float dg = -f - ${Rd.toFixed(3)};
      w += vec3(0.18) * pow(1.0 - clamp(dg / 0.18, 0.0, 1.0), 2.0);
      inside = vec4(w * 0.92 + inside.rgb * 0.08, 1.0);
    }
  }
  // ---- stroke: t = 0 outer edge .. 1 inner edge
  float t = clamp(-f / ${Rd.toFixed(3)}, 0.0, 1.0);
  vec3 sc = uStroke * 1.1 + (uStroke * 0.05 + vec3(0.3)) * exp(-pow((t - 0.5) / 0.17, 2.0));
  vec4 stroke = vec4(min(sc, vec3(1.0)), 1.0);
  float inner = smoothstep(-${Rd.toFixed(3)} + aa, -${Rd.toFixed(3)} - aa, f);
  vec4 c = mix(stroke, inside, inner);                                          // premultiplied
  gl_FragColor = c * outer;
}`,af=220,of=`attribute float aSize; uniform float uPx;
void main(){ gl_PointSize = aSize * uPx; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,sf=`uniform sampler2D uTex;
void main(){ vec4 t = texture2D(uTex, vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y)); gl_FragColor = vec4(t.rgb * t.a * 0.6, 0.0); }`,cf=.16,lf=class e{constructor(e,t){r(this,`rel`,void 0),r(this,`color`,void 0),r(this,`group`,new jn),r(this,`mesh`,void 0),r(this,`mat`,void 0),r(this,`shape`,void 0),r(this,`cellList`,void 0),r(this,`cellIdx`,new Map),r(this,`spec`,[]),r(this,`yb`,void 0),r(this,`capacity`,void 0),r(this,`bubbles`,0),r(this,`scale`,1),r(this,`jiggle`,0),r(this,`center`,void 0),r(this,`bubs`,[]),r(this,`bubGeo`,new Rr),r(this,`bubPos`,new Float32Array(660)),r(this,`bubSize`,new Float32Array(af)),r(this,`bubMat`,void 0),r(this,`cellSet`,void 0),r(this,`emitAcc`,0),r(this,`t`,0),r(this,`toAddX`,0),r(this,`toAddZ`,0),r(this,`sine`,0),r(this,`last`,null),this.rel=e,this.color=t,this.capacity=e.length,this.shape=tf(e);let n=Yd(t),{x0:i,y0:a,sw:o,sh:s}=this.shape,c=new Ai(o,s);c.translate(i+o/2,a+s/2,0);let l=e.map(e=>e[1]),u=Math.min(...l),d=Math.max(...l);this.cellList=e.slice().sort((e,t)=>e[1]-t[1]||e[0]-t[0]),this.cellList.forEach(([e,t],n)=>this.cellIdx.set(e+`,`+t,n)),this.spec=this.cellList.map(()=>({a:-1,b:-1,split:0,dir:[0,-1]})),this.yb=u-.5+zd+Rd;let f=e.map(e=>e[0]);this.center=[(Math.min(...f)+Math.max(...f))/2,(u+d)/2],this.mat=new zi({vertexShader:nf,fragmentShader:rf,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:201,blendDst:205,uniforms:{uSdf:{value:this.shape.tex},uBox:{value:new K(i,a,o,s)},uStroke:{value:Jd(n.stroke)},uGlass:{value:Jd(n.glass)},uEmission:{value:Jd(n.emission)},uCell:{value:Array.from({length:Gd},()=>new K(0,0,0,-1))},uCM:{value:Array.from({length:Gd},()=>new K)},uCA:{value:Array.from({length:Gd},()=>new q)},uCB:{value:Array.from({length:Gd},()=>new q)},uFA:{value:Array.from({length:Gd},()=>new q)},uFB:{value:Array.from({length:Gd},()=>new q)},uCF:{value:Array.from({length:Gd},()=>new K)},uCC:{value:Array.from({length:Gd},()=>new q)},uCT:{value:Array.from({length:Gd},()=>new K)},uNC:{value:0},uCx:{value:this.center[0]},uSinT:{value:0},uCosT:{value:1},uWx:{value:0},uWz:{value:.2},uTime:{value:0},uBubbles:{value:0},uBubble:{value:sl(`cwj/wo/bubble_0.png`)},uYb:{value:this.yb}}}),this.mesh=new J(c,this.mat),this.mesh.position.set(-this.center[0],-this.center[1],0),this.mesh.renderOrder=300,this.group.add(this.mesh),this.cellSet=new Set(e.map(([e,t])=>e+`,`+t)),this.bubGeo.setAttribute(`position`,new Cr(this.bubPos,3)),this.bubGeo.setAttribute(`aSize`,new Cr(this.bubSize,1)),this.bubMat=new zi({vertexShader:of,fragmentShader:sf,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:201,blendDst:201,uniforms:{uTex:{value:sl(`cwj/wo/bubble_0.png`)},uPx:{value:60}}});let p=new Si(this.bubGeo,this.bubMat);p.frustumCulled=!1,p.renderOrder=301,p.position.copy(this.mesh.position),this.group.add(p)}inside(e,t,n){let r=Math.round(e),i=Math.round(t);if(!this.cellSet.has(r+`,`+i))return!1;let a=.17+n*.6,o=e-r,s=t-i;return!(o<-.5+a&&!this.cellSet.has(r-1+`,`+i)||o>.5-a&&!this.cellSet.has(r+1+`,`+i)||s<-.5+a&&!this.cellSet.has(r+`,`+(i-1)))}spawnBub(e,t,n){if(this.bubs.length>=af)return;let r=n?.04+Math.random()*.07:.03+Math.random()*.04;this.inside(e,t,r)&&this.bubs.push({x:e,y:t,r,vy:.15+Math.random()*.25,ph:Math.random()*6.28,age:0})}emit(e,t){for(let n=0;n<e;n++){let e,n;if(t)e=(t[0]-this.group.position.x)/this.scale+this.center[0]+(Math.random()-.5)*.45,n=(t[1]-this.group.position.y)/this.scale+this.center[1]+(Math.random()-.7)*.4;else{let t=this.rel[Math.floor(Math.random()*this.rel.length)];e=t[0]+(Math.random()-.5)*.7,n=t[1]+(Math.random()-.5)*.7}this.wet(e,n)&&this.spawnBub(e,n,!0)}}volume(){return this.spec.reduce((e,t)=>e+(t.a>=0?Math.min(1,t.split):0)+(t.b>=0?1-t.split:0),0)}wet(e,t){let n=this.cellIdx.get(Math.round(e)+`,`+Math.round(t));if(n===void 0)return!1;let r=this.spec[n],[i,a]=this.cellList[n],o=.5-((e-i)*r.dir[0]+(t-a)*r.dir[1]);if(r.turn){let n=e-i-.5*(r.dir[0]+r.turn[0]),s=t-a-.5*(r.dir[1]+r.turn[1]);o=Math.atan2(-(n*r.dir[0]+s*r.dir[1]),-(n*r.turn[0]+s*r.turn[1]))/(Math.PI/2)}return r.a>=0&&o<r.split||r.b>=0&&o>=r.split}updateBubbles(t,n){let r=this.volume();if(r>.05)for(this.emitAcc+=t*(.9*Math.min(r,3)+55*this.bubbles);this.emitAcc>=1;){--this.emitAcc;let e=this.rel[Math.floor(Math.random()*this.rel.length)],t=e[0]+(Math.random()-.5)*.7,n=e[1]+(Math.random()-.5)*.75;this.wet(t,n)&&this.spawnBub(t,n,this.bubbles>.3)}let i=[];for(let e of this.bubs){if(e.age+=t,e.vy+=.9*t,e.y+=e.vy*t,e.x+=Math.sin(n*5+e.ph)*.05*t,r<.02||!this.wet(e.x,e.y+e.r*.5)||!this.inside(e.x,e.y,e.r*.5)){if(Math.random()<t*8||!this.inside(e.x,e.y,e.r*.5))continue;e.y-=e.vy*t,e.vy=0}i.push(e)}this.bubs=i;let a=i.length;for(let e=0;e<a;e++){let t=i[e];this.bubPos[e*3]=t.x,this.bubPos[e*3+1]=t.y,this.bubPos[e*3+2]=0,this.bubSize[e]=2*t.r*Math.min(1,t.age/.12)}this.bubGeo.setDrawRange(0,a),this.bubGeo.getAttribute(`position`).needsUpdate=!0,this.bubGeo.getAttribute(`aSize`).needsUpdate=!0,this.bubMat.uniforms.uPx.value=e.px*this.scale}setPos(e,t){this.group.position.set(e+this.center[0],t+this.center[1],0)}setCells(e){this.spec=e}toWorld(e,t){return[this.group.position.x+(e-this.center[0])*this.scale,this.group.position.y+(t-this.center[1])*this.scale]}update(e,t){let n=this.mat.uniforms,r=n.uCell.value,i=n.uCM.value,a=n.uCA.value,o=n.uCB.value,s=n.uFA.value,c=n.uFB.value;this.cellList.slice(0,Gd).forEach(([e,t],l)=>{let u=this.spec[l];r[l].set(e,t,u.dir[0],u.dir[1]),i[l].set(u.split,+(u.a>=0),+(u.b>=0),0),u.a>=0&&(a[l].copy(Qd(u.a,`tint`)),s[l].copy(Qd(u.a,`foam`))),u.b>=0&&(o[l].copy(Qd(u.b,`tint`)),c[l].copy(Qd(u.b,`foam`)));let d=n.uCF.value[l];u.flow&&u.flow.f1>u.flow.f0?(d.set(u.flow.f0,u.flow.f1,1,u.flow.i),n.uCC.value[l].copy(Qd(u.flow.color,`tint`))):d.set(0,0,0,0);let f=n.uCT.value[l];u.turn?f.set(u.turn[0],u.turn[1],1,0):f.set(0,0,0,0)}),n.uNC.value=Math.min(Gd,this.cellList.length);let l=this.volume();this.t+=e;let u=[this.group.position.x,this.group.position.y],d=l>1e-4?.02:0;if(e>0){let t=Math.min(1,e);this.toAddX+=(0-this.toAddX)*t,this.toAddZ+=(0-this.toAddZ)*t;let n=this.last?[(this.last[0]-u[0])/e,(this.last[1]-u[1])/e]:[0,0],r=Math.min(1,e*Math.min(10,Math.max(1,Math.hypot(n[0],n[1]))));this.sine+=(Math.sin(Math.PI*this.t)-this.sine)*r;let i=e=>Math.max(-d,Math.min(d,e));this.toAddX=Math.max(-.16,Math.min(cf,this.toAddX+i((n[0]+.2*n[1])*d))),this.toAddZ=Math.max(-.16,Math.min(cf,this.toAddZ+i(.2*n[1]*d)))}this.last=u,n.uWx.value=this.toAddX*this.sine,n.uWz.value=Math.max(this.toAddZ*this.sine,.2),n.uSinT.value=Math.sin(t/2),n.uCosT.value=Math.cos(t/2),n.uTime.value=t,n.uBubbles.value=this.bubbles;let f=.03*this.jiggle*Math.sin(t*26);this.group.scale.set(this.scale*(1+f),this.scale*(1-f),1),this.updateBubbles(e,t)}dispose(){this.mesh.geometry.dispose(),this.mat.dispose(),this.shape.tex.dispose(),this.bubGeo.dispose(),this.bubMat.dispose()}};r(lf,`px`,60);var uf=class{constructor(e,t,n,i){r(this,`out`,void 0),r(this,`group`,new jn),r(this,`cap`,void 0),r(this,`flashM`,void 0),r(this,`recoilT`,9),r(this,`flashT`,9),r(this,`base`,void 0),r(this,`highlight`,0),r(this,`glow`,0),r(this,`glowM`,void 0),r(this,`rays`,[]),r(this,`inner`,[0,0]),r(this,`inward`,[0,0]),r(this,`side`,[0,0]),r(this,`t`,0),this.out=t;let a=Math.hypot(i[0]-n[0],i[1]-n[1]),o=.8,s=Math.round(a*200),c=document.createElement(`canvas`);c.width=s,c.height=160;let l=c.getContext(`2d`),u=Yd(e),d=Jd(u.stroke),f=(e,t=0)=>{let n=n=>Math.round(Math.min(1,Math.max(0,n*e+t))*255);return`rgb(${n(d.r)},${n(d.g)},${n(d.b)})`},p=25.6;l.beginPath(),l.roundRect(0,0,s,160,[3,p,p,3]),l.closePath();let m=Math.atan2(t[1],t[0]),h=Math.sin(m),g=-Math.cos(m),_=Math.abs(h)>Math.abs(g)?h>0?l.createLinearGradient(s,0,0,0):l.createLinearGradient(0,0,s,0):g<0?l.createLinearGradient(0,0,0,160):l.createLinearGradient(0,160,0,0);for(let e=0;e<=20;e++){let t=e/20,n=Math.exp(-(((t-.3)/.13)**2)),r=1-.1*Math.max(0,Math.abs(t-.5)*2-.75)/.25;_.addColorStop(t,f(1.1*r+.05*n,.3*n))}l.fillStyle=_,l.fill(),l.save(),l.clip();let v=l.createLinearGradient(0,0,s,0);v.addColorStop(0,`rgba(0,0,0,0)`),v.addColorStop(.6,`rgba(0,0,0,0)`),v.addColorStop(1,`rgba(0,0,0,0.14)`),l.fillStyle=v,l.fillRect(0,0,s,160),l.restore();let y=s*.5,b=Math.min(32,s*.3);l.save(),l.translate(y,80),l.fillStyle=`rgba(0,0,0,0.18)`,l.beginPath(),l.moveTo(-b*.95,4),l.lineTo(b*.75,-b+4),l.lineTo(b*.75,b+4),l.closePath(),l.fill(),l.fillStyle=`#ffffff`,l.strokeStyle=`#ffffff`,l.lineJoin=`round`,l.lineWidth=8,l.beginPath(),l.moveTo(-b*.95,0),l.lineTo(b*.75,-b),l.lineTo(b*.75,b),l.closePath(),l.stroke(),l.fill(),l.restore();let x=new Ti(c);x.colorSpace=ot,this.cap=new J(new Ai(a,o),new Xr({map:x,transparent:!0,depthTest:!1,depthWrite:!1})),this.cap.rotation.z=Math.atan2(t[1],t[0]),this.cap.renderOrder=612;let S=document.createElement(`canvas`);S.width=S.height=64;let C=S.getContext(`2d`),w=C.createRadialGradient(32,32,0,32,32,32);w.addColorStop(0,`rgba(255,255,255,1)`),w.addColorStop(.4,`rgba(255,255,255,0.55)`),w.addColorStop(1,`rgba(255,255,255,0)`),C.fillStyle=w,C.fillRect(0,0,64,64);let T=new Ti(S);T.colorSpace=ot,this.flashM=new J(new Ai(1.1,1.1),new Xr({map:T,transparent:!0,depthTest:!1,depthWrite:!1,blending:2,opacity:0})),this.flashM.position.set(n[0]-(i[0]-n[0])/a*.05,n[1]-(i[1]-n[1])/a*.05,0),this.flashM.renderOrder=613,this.base=[(n[0]+i[0])/2,(n[1]+i[1])/2],this.cap.position.set(this.base[0],this.base[1],0),this.group.add(this.cap,this.flashM);let E=.09,D=Math.round((a+2*E)*200),O=document.createElement(`canvas`);O.width=D,O.height=196;let k=O.getContext(`2d`);k.shadowColor=`#ffffff`,k.shadowBlur=18,k.strokeStyle=`#ffffff`,k.lineWidth=13,k.beginPath(),k.roundRect(E*200-2,E*200-2,a*200+4,164,[6,160*.18,160*.18,6]),k.stroke();let A=new Ti(O);A.colorSpace=ot,this.glowM=new J(new Ai(a+2*E,.98),new Xr({map:A,transparent:!0,depthTest:!1,depthWrite:!1,opacity:0})),this.glowM.rotation.z=this.cap.rotation.z,this.glowM.position.copy(this.cap.position),this.glowM.renderOrder=614;let j=document.createElement(`canvas`);j.width=16,j.height=64;let M=j.getContext(`2d`),ee=M.createLinearGradient(0,0,0,64);ee.addColorStop(0,`rgba(255,255,255,0)`),ee.addColorStop(.5,`rgba(255,255,255,1)`),ee.addColorStop(1,`rgba(255,255,255,0)`),M.fillStyle=ee,M.beginPath(),M.roundRect(5,0,6,64,3),M.fill();let te=new Ti(j);te.colorSpace=ot;let ne=new q(u.stroke).lerp(new q(`#ffffff`),.45),N=[-t[0],-t[1]],re=[-t[1],t[0]];for(let e=0;e<4;e++){let t=new J(new Ai(.07,.34),new Xr({map:te,color:ne,transparent:!0,depthTest:!1,depthWrite:!1,blending:2,opacity:0}));t.rotation.z=Math.atan2(N[1],N[0])-Math.PI/2,t.renderOrder=613,this.rays.push({m:t,off:(e/3-.5)*o*.8,ph:e*.27}),this.group.add(t)}this.inner=n,this.inward=N,this.side=re,this.group.add(this.glowM)}kick(){this.recoilT>.25&&(this.recoilT=0)}flash(){this.flashT=0}update(e){this.recoilT+=e,this.flashT+=e;let t=this.recoilT,n=t<.06?t/.06:t<.46?bl((t-.06)/.4):0,r=t<.46?.06*Math.max(0,n):0;this.cap.position.set(this.base[0]-this.out[0]*xl*1.6*n,this.base[1]-this.out[1]*xl*1.6*n,0),this.cap.scale.set(1,1+r,1);let i=this.flashM.material;i.opacity=this.flashT<.18?.9*(1-this.flashT/.18):0,this.flashM.scale.setScalar(.7+.6*Math.min(1,this.flashT/.18)),this.t+=e,this.glow+=(this.highlight-this.glow)*Math.min(1,e*(this.highlight>this.glow?14:6));let a=.75+.25*Math.sin(this.t*9);this.glowM.material.opacity=this.glow*a,this.glowM.position.copy(this.cap.position),this.glowM.scale.copy(this.cap.scale),this.cap.material.color.setScalar(1+.4*this.glow*a);for(let e of this.rays){let t=(this.t*1.6+e.ph)%1,n=.08+t*.32;e.m.position.set(this.inner[0]+this.inward[0]*n+this.side[0]*e.off,this.inner[1]+this.inward[1]*n+this.side[1]*e.off,0),e.m.material.opacity=this.glow*Math.sin(Math.PI*t)*.9}}},{red:df,cyan:ff,green:pf,yellow:mf,purple:hf,orange:gf,pink:_f}=Object.fromEntries(f.map((e,t)=>[e,t])),vf=[{name:`Swap`,w:4,h:5,time:180,cap:15,gates:[{at:[1,4],out:[0,1],color:df},{at:[2,0],out:[0,-1],color:ff}],blocks:[{color:df,cells:[[1,1],[1,2]],water:[ff,ff]},{color:ff,cells:[[2,2],[2,3]],water:[df,df]}]},{name:`Shapes`,w:5,h:6,time:180,cap:15,gates:[{at:[0,3],out:[-1,0],color:df},{at:[2,5],out:[0,1],color:pf},{at:[4,2],out:[1,0],color:mf}],blocks:[{color:df,cells:[[1,1],[2,1],[1,2]],water:[pf,pf,pf]},{color:pf,cells:[[2,3],[3,3],[2,4],[3,4]],water:[mf,mf,mf,df]},{color:mf,cells:[[3,0],[3,1],[3,2]],water:[df,df,pf]}]},{name:`Make way`,w:5,h:6,time:180,cap:15,gates:[{at:[1,5],out:[0,1],color:hf},{at:[3,5],out:[0,1],color:gf},{at:[0,1],out:[-1,0],color:_f},{at:[4,1],out:[1,0],color:ff}],blocks:[{color:hf,cells:[[1,1],[1,2],[1,3]],water:[gf,gf,gf]},{color:gf,cells:[[2,3],[3,3],[2,4],[3,4]],water:[hf,hf,_f,_f]},{color:_f,cells:[[2,1],[3,1],[3,2]],water:[gf,hf,ff]},{color:ff,cells:[[2,0],[3,0]],water:[ff,_f]}]},{name:`Tight belt`,w:5,h:6,time:180,cap:6,gates:[{at:[1,5],out:[0,1],color:df},{at:[3,0],out:[0,-1],color:ff}],blocks:[{color:df,cells:[[1,1],[1,2],[1,3]],water:[ff,ff,ff]},{color:ff,cells:[[3,2],[3,3],[3,4]],water:[df,df,df]},{color:df,cells:[[0,0],[1,0]],water:[ff,ff]},{color:ff,cells:[[4,4],[4,5]],water:[df,df]}]},{name:`Crossroads`,w:6,h:7,time:240,cap:10,walls:[[2,3],[3,3]],gates:[{at:[0,5],out:[-1,0],color:pf},{at:[5,5],out:[1,0],color:mf},{at:[1,0],out:[0,-1],color:df},{at:[4,0],out:[0,-1],color:ff}],blocks:[{color:pf,cells:[[1,4],[2,4],[3,4],[2,5]],water:[ff,ff,ff,df]},{color:mf,cells:[[4,4],[4,5],[5,4]],water:[pf,pf,pf]},{color:df,cells:[[2,1],[3,1],[2,2]],water:[mf,mf,mf]},{color:ff,cells:[[4,1],[4,2],[5,2]],water:[pf,df,df]}]}];function yf(e){let t=[],n=new Map,r=new Map;for(let i of e.blocks){n.set(i.color,(n.get(i.color)??0)+i.cells.length-i.water.filter(e=>e===i.color).length),i.water.length>i.cells.length&&t.push(`${e.name}: more water than cells`);for(let e of i.water)e!==i.color&&r.set(e,(r.get(e)??0)+1)}for(let[i,a]of n)(r.get(i)??0)!==a&&t.push(`${e.name}: ${f[i]} needs ${a}, water has ${r.get(i)??0}`),e.gates.some(e=>e.color===i)||t.push(`${e.name}: no gate for ${f[i]}`);return t}var bf=6.5,xf=1.25,Sf=14,Cf=.45,wf=.08,Tf=.15,Ef=1.07,Df=class extends su{constructor(...e){super(...e),r(this,`sl`,void 0),r(this,`blocks`,[]),r(this,`views`,[]),r(this,`water`,[]),r(this,`arr`,[]),r(this,`routes`,new Map),r(this,`inflows`,new Map),r(this,`units`,[]),r(this,`spit`,new Map),r(this,`reserved`,[]),r(this,`flows`,new Map),r(this,`ports`,[]),r(this,`rim`,null),r(this,`gateS`,[]),r(this,`flow`,0),r(this,`unitLen`,xf),r(this,`bdrag`,null),r(this,`pops`,[])}get cap(){return this.sl?.cap??0}get buffer(){return this.units.length}makeLevel(e){let t=(e-1)%vf.length,n=this.sl=vf[t],r=([e,t])=>t*n.w+e;return{n:1e3+t,w:n.w,h:n.h,time:n.time,scale:1.15,voids:[],walls:(n.walls??[]).map(r),cats:n.blocks.map(e=>({color:e.color,cells:e.cells.map(r)})),gates:n.gates.map(e=>({cell:r(e.at),out:e.out,queue:[]})),hide:[],locks:[],plan:null,mech:[`sort`,`blocks`]}}start(e,t=-1){for(let e of this.views)e.dispose();for(let e of this.flows.values())e.sv.dispose();this.flows.clear(),this.units=[],this.spit.clear(),this.pops=[],this.bdrag=null,this.rim=null,this.gateS=[],super.start(e,t);let n=this.sl;this.loseReason=`Out of time`,this.water=n.blocks.map(e=>e.water.slice()),this.reserved=n.blocks.map(()=>0),this.blocks=n.blocks.map(e=>{let[t,n]=e.cells[0];return{rel:e.cells.map(([e,r])=>[e-t,r-n]),at:[t,n],vis:[t,n],color:e.color,moving:!1}}),this.views=this.blocks.map(e=>{let t=new lf(e.rel,e.color);this.view.addToLevel(t.group);let[n,r]=this.view.local(e.at[0],e.at[1]);return t.setPos(n,r),t}),this.routes.clear(),this.inflows.clear(),this.arr=this.views.map((e,t)=>{let n=this.snake(t),r=[];for(let e of this.water[t])r.includes(e)||r.push(e);let i=r.flatMap(e=>this.water[t].filter(t=>t===e)),a=e.cellList.map(()=>-1);n.forEach((e,t)=>{a[e]=i[t]??-1});let o=e.cellList.map(()=>[0,-1]);return n.forEach((t,r)=>{let i=n[r===0?1:r-1];if(i===void 0)return;let a=[e.cellList[i][0]-e.cellList[t][0],e.cellList[i][1]-e.cellList[t][1]];o[t]=r===0?[-a[0],-a[1]]:a}),this.routes.set(t,{seq:n,dir:o}),a}),this.views.forEach((e,t)=>this.layout(t)),this.ports=n.gates.map((e,t)=>{let n=this.view.gates[t];n.setFixed(e.color,this.view.frame),n.usePort(new jn),n.set(0,0);let[r,i]=this.view.local(e.at[0],e.at[1]),[a,o]=e.out,s=.5+this.view.frame+0+.03,c=new uf(e.color,e.out,[r+a*.47,i+o*.47],[r+a*s,i+o*s]);return this.view.addToLevel(c.group),c}),this.rim=new Id(this.view.geom,this.view.frame,Xd,0),this.view.addToLevel(this.rim.mesh),this.unitLen=Math.min(xf,this.rim.len/(this.cap+2)),this.gateS=n.gates.map((e,t)=>this.rim.project(this.view.gates[t].headPos))}syncAll(){}syncGate(){}pointerDown(e,t){if(Z.unlock(),!this.s||this.s.status!==s.Active||this.paused)return;let[n,r]=this.view.toGrid(e,t),i=this.s.cell(Math.round(n),Math.round(r));if(i===null)return;let a=this.s.catAt(i);if(a<0||this.busy.has(a))return;this.s.armCountdown();let o=this.blocks[a];this.bdrag={b:a,ox:n-o.at[0],oy:r-o.at[1],tx:o.at[0],ty:o.at[1]}}pointerMove(e,t){let n=this.bdrag;if(!n)return;let[r,i]=this.view.toGrid(e,t);n.tx=r-n.ox,n.ty=i-n.oy}pointerUp(){let e=this.bdrag;this.bdrag=null,e&&!this.blocks[e.b].moving&&this.arrivedB(e.b)}free(e,t,n){for(let[r,i]of this.blocks[e].rel){let a=this.s.cell(t+r,n+i);if(a===null||this.s.isWall(a)||this.s.isVoid(a))return!1;let o=this.s.catAt(a);if(o>=0&&o!==e)return!1}return!0}moveTo(e,t,n){let r=this.blocks[e];r.at=[t,n],r.moving=!0,this.s.cats[e].cells=r.rel.map(([e,r])=>(n+r)*this.s.w+t+e),Z.play(Xl.CatMove)}update(e){if(!this.s)return;if(e=Math.max(0,e),!this.paused&&!this.ended){let t=this.s.status;this.s.advance(e),t===s.Active&&this.s.status===s.Lost&&this.lose()}this.time+=e;let t=this.bdrag;if(t&&!this.paused&&this.s.status===s.Active&&!this.busy.has(t.b)){let e=this.blocks[t.b];if(Math.hypot(e.vis[0]-e.at[0],e.vis[1]-e.at[1])<Cf){let n=Math.round(t.tx)-e.at[0],r=Math.round(t.ty)-e.at[1],i=Math.sign(n),a=Math.sign(r),o=Math.abs(n)>=Math.abs(r)?[[i,0],[0,a]]:[[0,a],[i,0]];for(let[n,r]of o)if((n||r)&&this.free(t.b,e.at[0]+n,e.at[1]+r)){this.moveTo(t.b,e.at[0]+n,e.at[1]+r);break}}}this.blocks.forEach((t,n)=>{let r=t.at[0]-t.vis[0],i=t.at[1]-t.vis[1],a=Math.hypot(r,i),o=Sf*e;a<=o?(t.vis=[t.at[0],t.at[1]],t.moving&&(t.moving=!1,(!this.bdrag||this.bdrag.b!==n||this.arrivedAt(n))&&this.arrivedB(n))):t.vis=[t.vis[0]+r/a*o,t.vis[1]+i/a*o];let[s,c]=this.view.local(t.vis[0],t.vis[1]);this.views[n].setPos(s,c)}),this.tick(e);for(let t of this.pops){t.t+=e;let n=this.views[t.b];if(t.t<wf)n.scale=1+.07000000000000006*(1-(1-t.t/wf)**2);else{let e=Math.min(1,(t.t-wf)/Tf);n.scale=Ef*(1-e*e)}t.t>=.22999999999999998&&(n.group.visible=!1)}this.pops=this.pops.filter(e=>e.t<.22999999999999998),lf.px=this.view.h*this.view.renderer.getPixelRatio()/(this.view.camera.top-this.view.camera.bottom),this.views.forEach(t=>t.update(e,this.time)),this.s.status===s.Active&&this.blocks.every((e,t)=>this.s.cats[t].removed)&&!this.units.length&&(this.s.status=s.Won),this.s.status===s.Won&&!this.ended&&!this.pops.length&&(this.ended=!0,Z.play(Xl.LevelWin),this.ev.onWin()),this.view.gates.forEach(t=>t.update(e));let n=this.bdrag&&!this.s.cats[this.bdrag.b].removed?this.blocks[this.bdrag.b].color:-1;this.ports.forEach((t,r)=>{t.highlight=+(this.sl.gates[r].color===n),t.update(e)})}arrivedAt(e){return this.gateFor(e)>=0&&this.foreign(e)>0}snake(e){let t=this.views[e],n=(e,t)=>e+`,`+t,r=new Map(t.cellList.map(([e,t],r)=>[n(e,t),r])),i=e=>[[1,0],[0,1],[-1,0],[0,-1]].map(([i,a])=>r.get(n(t.cellList[e][0]+i,t.cellList[e][1]+a))).filter(e=>e!==void 0),a=t.cellList.map((e,t)=>t).sort((e,t)=>i(e).length-i(t).length||e-t)[0],o=[],s=new Set,c=(e,i)=>{o.push(e),s.add(e);let[a,l]=t.cellList[e],u=[i,[1,0],[0,1],[-1,0],[0,-1]];for(let[e,t]of u){let i=r.get(n(a+e,l+t));i!==void 0&&!s.has(i)&&c(i,[e,t])}};return c(a,[1,0]),o}route(e,t){let n=this.views[e],r=this.blocks[e],i=this.sl.gates[t],a=(e,t)=>e+`,`+t,o=new Map(n.cellList.map(([e,t],n)=>[a(e,t),n])),s=o.get(a(i.at[0]-r.at[0],i.at[1]-r.at[1])),c=n.cellList.length,l=n.cellList.map(()=>[0,-1]);if(s===void 0)return{seq:n.cellList.map((e,t)=>t),dir:l};let u=[s],d=new Set([s]);l[s]=[i.out[0],i.out[1]];for(let e=0;e<u.length;e++){let[t,r]=n.cellList[u[e]];for(let[n,i]of[[-l[u[e]][0],-l[u[e]][1]],[0,-1],[-1,0],[1,0],[0,1]]){let e=o.get(a(t+n,r+i));e===void 0||d.has(e)||(d.add(e),u.push(e),l[e]=[-n,-i])}}for(let e=0;e<c;e++)d.has(e)||u.push(e);return{seq:u,dir:l}}layout(e){let t=this.arr[e],n=this.routes.get(e),r=t.map((e,t)=>({a:e,b:-1,split:e>=0?2:0,dir:n?n.dir[t]:[0,-1]}));if(n){let i=this.views[e];for(let e=0;e+1<n.seq.length;e++){let a=n.seq[e],o=n.seq[e+1],s=Math.abs(i.cellList[a][0]-i.cellList[o][0])+Math.abs(i.cellList[a][1]-i.cellList[o][1])===1,c=i.cellList[o][0]+n.dir[o][0]===i.cellList[a][0]&&i.cellList[o][1]+n.dir[o][1]===i.cellList[a][1];s&&c&&t[a]>=0&&t[o]>=0&&t[a]!==t[o]&&(r[a]={...r[a],b:t[o],split:.94})}}let i=this.units.find(t=>t.state===`grow`&&t.cat===e);if(i&&n){let e=Cl(Math.min(1,i.len/this.unitLen)),a=n.seq.indexOf(i.slot);for(let i=a;i<n.seq.length;i++){let a=n.seq[i],o=i+1<n.seq.length?t[n.seq[i+1]]:-1;r[a]={a:t[a],b:o,split:1-e,dir:n.dir[a]}}}for(let t of this.units){if(t.state!==`absorb`||t.cat!==e||!n)continue;let i=1-Math.max(0,t.len)/this.unitLen;r[t.slot]={a:-1,b:t.color,split:1-i,dir:n.dir[t.slot]}}if(n){let t=this.views[e],i=e=>t.cellList.findIndex(([r,i])=>r===t.cellList[e][0]+n.dir[e][0]&&i===t.cellList[e][1]+n.dir[e][1]);for(let e of n.seq){let a=n.seq.find(t=>t!==e&&i(t)===e);if(a===void 0)continue;let o=[t.cellList[a][0]-t.cellList[e][0],t.cellList[a][1]-t.cellList[e][1]];(o[0]!==-n.dir[e][0]||o[1]!==-n.dir[e][1])&&(r[e].turn=o)}}let a=this.inflows.get(e);a&&n&&n.seq.forEach((e,t)=>{let n=Math.min(1,Math.max(0,a.tail-t)),i=Math.min(1,Math.max(0,a.head+(a.tail===0?.18:0)-t));i>n&&(r[e].flow={f0:n,f1:i,color:a.color,i:t})}),this.views[e].setCells(r)}gateFor(e){let t=this.s.cats[e];return t.removed?-1:this.sl.gates.findIndex((e,n)=>e.color===t.color&&t.cells.includes(this.s.lv.gates[n].cell))}foreign(e){let t=this.blocks[e].color;return this.water[e].filter(e=>e!==t).length}arrivedB(e){if(this.busy.has(e)||this.s.status!==s.Active)return;let t=this.gateFor(e);t<0||this.foreign(e)===0||(this.bdrag?.b===e&&(this.bdrag=null),this.busy.add(e),this.spit.set(e,t),this.ports[t].flash(),Z.play(Xl.CatDrink))}portFree(e){let t=this.rim;for(let n of this.units)if(t.ahead(e,n.head)<n.len-1e-4||t.ahead(n.head,e)<this.unitLen-1e-4)return!1;return!0}tick(e){let t=this.rim;if(!t||!this.sl||this.paused)return;let n=bf*e;this.flow+=n;for(let e of this.units)if(e.state===`grow`){if(e.len=Math.min(this.unitLen,e.len+n),e.head=this.gateS[e.gate]+e.len,e.len>=this.unitLen){e.state=`move`;let t=this.routes.get(e.cat),n=this.arr[e.cat];if(t){let r=t.seq.indexOf(e.slot);for(let e=r;e<t.seq.length-1;e++)n[t.seq[e]]=n[t.seq[e+1]];n[t.seq[t.seq.length-1]]=-1}}}else if(e.state===`move`){for(let r=0;r<this.sl.gates.length&&e.state===`move`;r++){if(this.sl.gates[r].color!==e.color||t.ahead(e.head,this.gateS[r])>n)continue;let i=this.receiver(r);if(i<0)continue;let a=this.route(i,r);this.routes.set(i,a);let o=new Set(this.units.filter(e=>e.state===`absorb`&&e.cat===i).map(e=>e.slot));e.slot=[...a.seq].reverse().find(e=>this.arr[i][e]<0&&!o.has(e))??a.seq[0],e.state=`absorb`,e.gate=r,e.cat=i,e.head=this.gateS[r],this.reserved[i]++,this.ports[r].kick(),Z.play(Xl.CatDrink)}e.state===`move`&&(e.head=(e.head+n)%t.len)}else if(e.len-=n,e.len<=0){this.water[e.cat].push(e.color),this.reserved[e.cat]--,this.arr[e.cat][e.slot]=e.color;let t=this.s.cats[e.cat];this.water[e.cat].length>=this.blocks[e.cat].rel.length&&this.foreign(e.cat)===0&&!t.removed&&(Z.play(Xl.CatMeow),t.removed=!0,this.busy.add(e.cat),this.views[e.cat].emit(40),this.bdrag?.b===e.cat&&(this.bdrag=null),this.pops.push({b:e.cat,t:0})),this.ev.onChange()}this.units=this.units.filter(e=>!(e.state===`absorb`&&e.len<=0));for(let[e,n]of this.spit){if(this.units.some(t=>t.state===`grow`&&t.cat===e))continue;if(this.foreign(e)===0){this.spit.delete(e),this.busy.delete(e);continue}if(!this.portFree(this.gateS[n]))continue;if(this.units.length>=this.cap){this.loseReason=`The conveyor is full!`,this.s.status=s.Lost,this.lose();return}let r=this.blocks[e].color,i=this.route(e,n);this.routes.set(e,i);let a=i.seq.find(t=>this.arr[e][t]>=0&&this.arr[e][t]!==r),o=this.arr[e][a];this.water[e].splice(this.water[e].indexOf(o),1);let c=0;for(let e of this.units){let r=t.ahead(this.gateS[n],e.head)-e.len;r>=0&&r<bf/20&&(c=Math.max(c,r))}this.units.push({head:this.gateS[n]+c,len:c,color:o,state:`grow`,gate:n,cat:e,slot:a}),this.ports[n].kick(),this.ev.onChange()}this.blocks.forEach((t,n)=>{let r=this.s.cats[n],i=this.views[n];if(r.removed){this.setFlow(n,`in`,-1,null,e),i.bubbles=Math.max(0,i.bubbles-e*3),i.jiggle=0;return}let a=this.units.find(e=>e.state===`grow`&&e.cat===n),o=this.units.filter(e=>e.state===`absorb`&&e.cat===n),s=o[0],c=s?s.gate:-1,l=this.routes.get(n),u=this.inflows.get(n);if(s&&l){let r=Math.min(...o.map(e=>l.seq.indexOf(e.slot)+Math.max(0,e.len)/this.unitLen));u||(u={color:t.color,head:0,tail:0,idle:0},this.inflows.set(n,u)),u.tail=0,u.idle=0,u.head=Math.min(r,u.head+14*e)}else u&&(u.idle+=e,u.idle>.15&&(u.tail+=9*e,u.tail>=u.head&&this.inflows.delete(n)));if(this.layout(n),this.setFlow(n,`in`,-1,null,e),i.jiggle=Math.max(0,Math.min(1,i.jiggle+(s?e*6:-e*3))),a&&Math.random()<e*25){let e=this.routes.get(n);if(e){let[t,n]=i.cellList[e.seq[e.seq.length-1]];i.emit(2,i.toWorld(t,n))}}let d=!!a||c>=0;i.bubbles=Math.max(0,Math.min(1,i.bubbles+(d?e*4:-e*1.5)))});let r=[];for(let e of[...this.units].sort((e,t)=>e.head-t.head)){let n=r[r.length-1];n&&n.color===e.color&&Math.abs(t.ahead(n.head,e.head)-e.len)<.03?(n.head=e.head,n.len+=e.len):r.push({head:e.head,len:Math.max(0,e.len),color:e.color})}t.setSegments(r,this.flow)}setFlow(e,t,n,r,i){let a=`${e}${t}`,o=this.flows.get(a);o&&n>=0&&o.color!==n&&(this.view.removeStream(o.sv),this.flows.delete(a),o=void 0),!o&&n>=0&&r&&(o={sv:new El(n,r.w,Zd(n)),color:n,t:0,end:-1},this.view.addToLevel(o.sv.mesh),this.flows.set(a,o)),o&&(n>=0&&r?(o.end>=0&&(o.end=-1,o.t=.2),o.t+=i,o.sv.setPolyline(r.pts),Math.random()<i*30&&this.views[e].emit(2,r.pts[r.pts.length-1]),o.sv.phase(1-Cl(Math.min(1,o.t/.2)),1,this.time)):(o.end<0&&(o.end=0),o.end+=i,o.sv.phase(0,1-Cl(Math.min(1,o.end/.2)),this.time),o.end>=.2&&(this.view.removeStream(o.sv),this.flows.delete(a))))}receiver(e){let t=this.sl.gates[e].color;return this.s.cats.findIndex((n,r)=>!n.removed&&this.blocks[r].color===t&&!this.spit.has(r)&&this.foreign(r)===0&&this.water[r].length+this.reserved[r]<this.blocks[r].rel.length&&n.cells.includes(this.s.lv.gates[e].cell))}},Of=new URLSearchParams(location.search),kf=Of.get(`mode`)!==`classic`;{let e=Of.get(`skin`);(e===`cat`||e===`worm`||e===`straw`)&&(Gu.kind=e)}var Af=kf?`worm-jam-sort-v1`:`worm-jam-save-v1`;if(kf)for(let e of vf)for(let t of yf(e))console.warn(t);function jf(){let e={level:1,coins:200,boosters:{101:3,102:3,103:3},last:-1,sound:!0,music:!0};try{return{...e,...JSON.parse(localStorage.getItem(Af)??`{}`)}}catch{return e}}var Mf=jf();function Nf(){try{localStorage.setItem(Af,JSON.stringify(Mf))}catch{}}var Pf=new URLSearchParams(location.search);Pf.get(`level`)&&(Mf.level=Math.max(1,Number(Pf.get(`level`)))),Z.sound=Mf.sound,Z.musicOn=Mf.music,document.body.style.backgroundImage=`url(${nl(`cwj/textures/Bg_2.png`)})`;async function Ff(){let e=[new FontFace(`Mikado`,`url(${nl(`cwj/fonts/Mikado_Black.otf`)})`),new FontFace(`Anton`,`url(${nl(`cwj/fonts/Anton.ttf`)})`)];await Promise.all(e.map(async e=>{try{document.fonts.add(await e.load())}catch{}}))}var If=document.getElementById(`app`),Lf=document.getElementById(`game`),Rf=new xd(Lf),zf=new Od(If),$;function Bf(){let e=window.innerWidth,t=window.innerHeight,n=Math.min(e,Math.round(t*.5625));If.style.width=`${n}px`,Rf.resize(n,t),zf.layout(n,t)}function Vf(e,t=1600){let n=document.createElement(`div`);n.className=`toast`,n.textContent=e,If.appendChild(n),setTimeout(()=>n.remove(),t)}function Hf(){$?.s&&(zf.set({coins:Mf.coins,level:$.displayNumber,time:$.s.remaining,frozen:$.s.frozen,boosters:Mf.boosters,targeting:$.targeting}),$ instanceof Df?zf.setBuffer($.buffer,$.cap):zf.setBuffer(0,0))}function Uf(){let e=$.level.n;Mf.level=$.displayNumber+1,Mf.last=e,Nf(),$.start(Mf.level,e),Gf()}var Wf={3:[`PAW HAMMER`,`Use the hammer to shorten cats and break obstacles.`],6:[`FROZEN GATE`,`Remove cats to melt the ice on the gate.`],8:[`TIME FREEZE`,`Freeze time for 10 seconds.`],11:[`FROZEN CATS`,`Remove other cats to melt the ice.`],15:[`MAGIC PUMP`,`Remove cats of the same color.`],16:[`NESTED CATS`,`Clear the inner cat first.`],21:[`HIDDEN BOX`,`Remove other cats to open the box.`],36:[`HIDDEN ROCK`,`Remove other cats to break the rock.`],51:[`ARROW CAT`,`Move along the arrows. Remove other cats to turn freely.`],81:[`LOCK AND KEY`,`Collect key to unlock box.`]};function Gf(){if(kf){if($.displayNumber!==1)return;$.paused=!0,kd(If,`SORT THE WATER`,`Each tank holds water of other colours.<br>Slide a tank onto the port of <b>its own colour</b>: it pours the other water onto the conveyor.<br>The water rides around the tray until it passes its port while a tank of that colour waits there.<br>Do not overfill the conveyor!`,[{label:`OK`,on:()=>{$.paused=!1}}]);return}let e=Wf[$.displayNumber];e&&($.paused=!0,kd(If,e[0],e[1],[{label:`OK`,on:()=>{$.paused=!1}}]))}async function Kf(){await Promise.all([Ff(),hd()]),$=new(kf?Df:su)(Rf,{onChange:Hf,onWin:()=>{Mf.coins+=50,Nf(),Hf(),setTimeout(()=>kd(If,`LEVEL COMPLETE!`,`+50 <img src="${nl(`cwj/sprites/icon_0.png`)}" style="height:1.4em;vertical-align:middle">`,[{label:`NEXT`,on:Uf}]),350)},onLose:()=>{$.loseReason===`Out of time`?kd(If,`Let's try again!`,`Out of time`,[{label:`+60s`,cls:`alt`,on:()=>{$.revive()}},{label:`RETRY`,on:()=>{$.restart()}}]):kd(If,`Let's try again!`,$.loseReason,[{label:`RETRY`,on:()=>{$.restart()}}])}}),$.onBoosterSpent=e=>{Mf.boosters[e]=Math.max(0,(Mf.boosters[e]??0)-1),Nf(),Hf()},zf.onBooster=e=>{if(kf){Vf(`Boosters coming soon`);return}let t=wd.find(t=>t.id===e);$.displayNumber<t.unlock?Vf(`Unlocks at level ${t.unlock}`):(Mf.boosters[e]??0)<=0?($.paused=!0,kd(If,t.name,`Buy 1 for ${t.price} coins?`,[{label:`BUY`,on:()=>{$.paused=!1,Mf.coins>=t.price?(Mf.coins-=t.price,Mf.boosters[e]=1,Nf(),Hf()):Vf(`Not enough coins`)}},{label:`CLOSE`,cls:`gray`,on:()=>{$.paused=!1}}])):($.booster(e)&&$.onBoosterSpent(e),e!==ou.Clock&&$.targeting===e&&Vf(e===ou.Hammer?`Tap a cat or obstacle`:`Tap a cat`))},zf.onSettings=()=>{$.paused=!0,kd(If,`SETTINGS`,``,[{label:`SOUND ${Z.sound?`ON`:`OFF`}`,cls:`gray`,on:()=>{Z.sound=!Z.sound,Mf.sound=Z.sound,Nf(),$.paused=!1}},{label:`MUSIC ${Z.musicOn?`ON`:`OFF`}`,cls:`gray`,on:()=>{Z.setMusic(!Z.musicOn),Mf.music=Z.musicOn,Nf(),$.paused=!1}},{label:`RESTART`,cls:`alt`,on:()=>{$.restart()}},{label:kf?`CLASSIC MODE`:`SORT MODE`,cls:`gray`,on:()=>{location.search=kf?`?mode=classic`:``}},{label:`RESUME`,on:()=>{$.paused=!1}}])},Bf(),window.addEventListener(`resize`,Bf),$.start(Mf.level,Mf.last),Gf();let e=e=>{let t=Lf.getBoundingClientRect();return[e.clientX-t.left,e.clientY-t.top]};Lf.addEventListener(`pointerdown`,t=>{Lf.setPointerCapture(t.pointerId),$.pointerDown(...e(t))}),Lf.addEventListener(`pointermove`,t=>$.pointerMove(...e(t))),Lf.addEventListener(`pointerup`,()=>$.pointerUp()),Lf.addEventListener(`pointercancel`,()=>$.pointerUp());let t=performance.now(),n=e=>{let r=Math.min(.05,(e-t)/1e3);t=e,$.update(r),$.s.status===s.Active&&Hf(),Rf.render(),requestAnimationFrame(n)};requestAnimationFrame(n),window.game=$}Kf();