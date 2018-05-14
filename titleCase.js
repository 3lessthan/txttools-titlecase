'use strict';
(function(){
  // https://jsperf.com/txttools-titlecase3
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

  const a = new RegExp(/([,.'"?!:;()\[\]{}]+)?(\w+)((?:'[ns])?[,.'"?!:;()\[\]{}]+)?/),
        c = new RegExp(/(?:'[sn])?[,.'"?!:;()\[\]{}]/),
        s = new RegExp(/[.?!]/);

  exports.titleCase = function(text) {
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
  };

  exports.setOptions = function (opts, params) {
    if (typeof opts === 'string' && params !== undefined) {
      if (options.hasOwnProperty(opts)) {
        if (typeof params === 'string') {
          if (opts === 'camel')
            options.camel[params.toLowerCase()] = params;
          else
            options[opts].push(params.toLowerCase());
        } else {
          for (let i = 0; i < params.length; i++) {
            if (opts === 'camel')
              options.camel[params[i].toLowerCase()] = params[i];
            else
              options[opts].push(params[i].toLowerCase());
          }
        }
      }
    } else {
      for (let key in opts) {
        if (!opts.hasOwnProperty(key) || !options.hasOwnProperty(key)) continue;
        let opt = opts[key];
        if (typeof opt === 'string') {
          if (key === 'camel')
            options.camel[opt.toLowerCase()] = opt;
          else
            options[key].push(opt.toLowerCase());
        } else {
          for (let i = 0; i < opt.length; i++) {
            if (key === 'camel')
              options.camel[opt[i].toLowerCase()] = opt[i];
            else
              options[key].push(opt[i].toLowerCase());
          }
        }
      }
    }
  };

}).call(this);