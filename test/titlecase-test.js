const tc = require('../titleCase');

let sentence = "'hello' my name is adam. this is written in (javascript). a for php.";
let word = "'(hello)'";


let all = new RegExp(/^([,.'"?!:;()]+)?\b(\w+)\b([,.'"?!:;()]+)?$/),
   stop = new RegExp(/^([.?!]+)$/);

let words = sentence.split(' ');

let options = {
    caps: [],
    camel: {},
    lower: [
      // Articles
      'a', 'an', 'the',
      // Coordinate Conjunctions
      'and', 'but', 'for', 'nor', 'or', 'so', 'yet',
      // Prepositions
      'after', 'along', 'around', 'at', 'by', 'from', 'of', 'on', 'to', 'with', 'without'
    ]
  };

  const a = new RegExp(/([,.'"?!:;()\[\]{}]+)?(\w+)([,.'"?!:;()\[\]{}]+)?/),
        c = new RegExp(/[,.'"?!:;()\[\]{}]/),
        s = new RegExp(/[.?!]/);

  function titleCase (text) {
    let formatted = [],
      lastStop = true,
      words = (text.indexOf(' ') === -1) ? [text] : text.split(' ');

    for (let i = 0, n = words.length; i < n; i++) {
      let word = c.test(words[i]) ? a.exec(words[i]) : ['', '', words[i], ''];
      word[1] = word[1] === undefined ? '' : word[1];
      word[2] = word[2].toLowerCase();
      word[3] = word[3] === undefined ? '' : word[3];
      if (options.caps.includes(word[2]))
        word[2] = word[2].toUpperCase();
      else if (options.lower.includes(word[2]) && (i > 0 && i < n - 1) && !lastStop)
        word[2] = word[2];
      else if (options.camel.hasOwnProperty(word[2]))
        word[2] = options.camel[word[2]];
      else
        word[2] = word[2].charAt().toUpperCase() + word[2].substr(1);

      formatted.push(word[1] + word[2] + word[3]);
      lastStop = (word[3] !== '' ? s.test(word[3].charAt(word[3].length - 1)) : false);
    }
    return formatted.join(' ');
  }

  function setOpts (opts, params) {
    if (typeof opts === 'string' && params !== undefined) {
      if (options.hasOwnProperty(opts)) {
        if (typeof params === 'string') params = [params];
        for (let i = 0; i < params.length; i++) {
          if (opts === 'camel') {
            options.camel[params[i].toLowerCase()] = params[i];
          } else {
            options[opts].push(params[i].toLowerCase());
          }
        }
      }
    } else {
      for (let key in opts) {
        if (!opts.hasOwnProperty(key)) continue;
        let opt = opts[key];
        if (options.hasOwnProperty(key)) {
          if (typeof opt === 'string') opt = [opt];
          for (let i = 0; i < opt.length; i++) {
            if (key === 'camel') {
              options.camel[opt[i].toLowerCase()] = opt[i];
            } else {
              options[key].push(opt[i].toLowerCase());
            }
          }
        }
      }
    }
  }

setOpts('caps', 'iou');
setOpts({ caps: ['php', 'world'], camel: 'JavaScript' });

sentence = "'hello' world! my nAme is Adam, this is a sCrIpt written in javascript, not php. 'for' iou 'for' in.";
console.log(titleCase(sentence));


tc.setOptions({ camel: 'JavaScript', caps: ['php', 'adam']});
tc.setOptions('lower', 'world');
tc.titleCase(sentence); //?