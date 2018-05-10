function TitleCase(e,t){return function(e,t){var s,o={},a=["a","an","the","and","but","for","nor","or","so","yet","after","along","around","at","by","from","of","on","to","with","without"];switch(typeof e.caps){case"string":s=[e.caps];break;case"object":s=e.caps;break;default:s=[]}switch(typeof e.lower){case"string":a.push(e.lower);break;case"object":for(var r=0,c=e.lower.length;r<c;r++)a.push(e.lower[r])}switch(typeof e.camel){case"string":o[e.camel.toLowerCase()]=e.camel;break;case"object":for(r=0,c=e.camel.length;r<c;r++)o[e.camel[r].toLowerCase()]=e.camel[r]}return this.options={caps:s,camel:o,lower:a},this.a=new RegExp(/([,.'"?!:;()\[\]{}]+)?(\w+)([,.'"?!:;()\[\]{}]+)?/),this.c=new RegExp(/[,.'"?!:;()\[\]{}]/),this.s=new RegExp(/[.?!]/),function(e){for(var t=[],s=!0,o=-1===e.indexOf(" ")?[e]:e.split(" "),a=0,r=o.length;a<r;a++){var c=this.c.test(o[a])?this.a.exec(o[a]):["","",o[a],""];c[1]=void 0===c[1]?"":c[1],c[2]=c[2].toLowerCase(),c[3]=void 0===c[3]?"":c[3],this.options.caps.includes(c[2])?c[2]=c[2].toUpperCase():this.options.lower.includes(c[2])&&0<a&&a<r-1&&!s?c[2]=c[2]:this.options.camel.hasOwnProperty(c[2])?c[2]=this.options.camel[c[2]]:c[2]=c[2].charAt().toUpperCase()+c[2].substr(1),t.push(c[1]+c[2]+c[3]),s=""!==c[3]&&this.s.test(c[3].charAt(c[3].length-1))}return t.join(" ")}}(e)}

let titleCase = new TitleCase({ caps: ['php','world'], camel: 'JavaScript' });
let sentence = "'hello' world! my nAme is Adam, this is a sCrIpt written in javascript, not php. 'for' iou 'for' in.";
console.log(titleCase(sentence)); //?
console.log(titleCase(sentence)); //?