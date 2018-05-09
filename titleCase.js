'use strict';
(function(){
  // https://jsperf.com/txttools-titlecase
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

  const all = new RegExp(/([,\.'"\?!:;\(\)])+/),
    all_end = new RegExp(/^(\w+)([,\.'"\?!:;\(\)]+)$/),
    all_beg = new RegExp(/^([,\.\'"\?!:;\(\)]+)(\w+)$/),
    all_wrp = new RegExp(/^([,.'"?!:;()]+)(\w+)([,.'"?!:;()]+)$/),
       stop = new RegExp(/([\.\?\!])/),
   stop_end = new RegExp(/^(\w+)([\.\?\!]+)$/),
   stop_beg = new RegExp(/^([\.\?\!]+)(\w+)$/),
   stop_wrp = new RegExp(/^([\.\?\!]+)(\w+)([\.\?\!]+)$/); // Probably not necessary

  exports.titleCase = function (text) {
    let formatted = [],
         lastStop = true,
            words = (text.indexOf(' ') === -1) ? [text] : text.split(' ');

    for (let i = 0; i < words.length; i++) {

      let puncTmp, puncType, hasStop, word,
        wordTmp = (function (w) {
          if (all.test(w)) {
            let res;
            if (stop.test(w)) {
              if (stop_beg.test(w)) {
                res = w.match(stop_beg);
                return [res[2], res[1], 0, true];
              } else if (stop_end.test(w)) {
                res = w.match(stop_end);
                return [res[1], res[2], 1, true];
              } else if (stop_wrp.test(w)) {
                res = w.match(stop_wrp);
                return [res[2], [res[1], res[3]], 2, true];
              } return w;
            } else {
              if (all_beg.test(w)) {
                res = w.match(all_beg);
                return [res[2], res[1], 0, false];
              } else if (all_end.test(w)) {
                res = w.match(all_end);
                return [res[1], res[2], 1, false];
              } else if (all_wrp.test(w)) {
                res = w.match(all_wrp);
                return [res[2], [res[1], res[3]], 2, false];
              } return w;
            }
          } return w;
        })(words[i]);

      if (typeof wordTmp === 'string') {
        word = wordTmp;
      } else {
        puncTmp = wordTmp[1];
        hasStop = (puncType === 1 && wordTmp[3]);
       puncType = wordTmp[2];
           word = wordTmp[0];
      }

      let smallWord = word.toLowerCase(), format;

      if (options.caps.includes(smallWord))
        format = word.toUpperCase();
      else if (options.lower.includes(smallWord) && (i > 0 && i < words.length - 1) && !lastStop)
        format = smallWord;
      else if (options.camel.hasOwnProperty(smallWord))
        format = options.camel[smallWord];
      else
        format = word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();

      switch (puncType) {
        case 0:
          formatted.push(puncTmp + format);
          break;
        case 1:
          formatted.push(format + puncTmp);
          break;
        case 2:
          formatted.push(puncTmp[0] + format + puncTmp[1]);
          break;
        default:
          formatted.push(format);
          break;
      }
      lastStop = (hasStop !== undefined && hasStop === true);
    }
    return formatted.join(' ');
  };

  exports.setOpts = function (opts, params) {
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
  };

}).call(this);