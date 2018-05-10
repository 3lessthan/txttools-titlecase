function TitleCase (o, t) {
  return (function (opts, text) {
    var caps, camel = {},
      lower = ['a', 'an', 'the', 'and', 'but', 'for', 'nor', 'or', 'so', 'yet', 'after', 'along', 'around', 'at', 'by', 'from', 'of', 'on', 'to', 'with', 'without'];
    switch (typeof opts.caps) {
      case 'string':
        caps = [opts.caps];
        break;
      case 'object':
        caps = opts.caps;
        break;
      default:
        caps = [];
        break;
    }
    switch (typeof opts.lower) {
      case 'string':
        lower.push(opts.lower);
        break;
      case 'object':
        for (var i = 0, n = opts.lower.length; i < n; i++) {
          lower.push(opts.lower[i]);
        }
        break;
      default:
        break;
    }
    switch (typeof opts.camel) {
      case 'string':
        camel[opts.camel.toLowerCase()] = opts.camel;
        break;
      case 'object':
        for (var i = 0, n = opts.camel.length; i < n; i++) {
          camel[opts.camel[i].toLowerCase()] = opts.camel[i];
        }
        break;
      default:
        break;
    }

    this.options = {
      caps: caps,
      camel: camel,
      lower: lower
    };

    this.a = new RegExp(/([,.'"?!:;()\[\]{}]+)?(\w+)([,.'"?!:;()\[\]{}]+)?/);
    this.c = new RegExp(/[,.'"?!:;()\[\]{}]/);
    this.s = new RegExp(/[.?!]/);

    return function (text) {
      var formatted = [],
        lastStop = true,
        words = (text.indexOf(' ') === -1) ? [text] : text.split(' ');

      for (var i = 0, n = words.length; i < n; i++) {
        var word = this.c.test(words[i]) ? this.a.exec(words[i]) : ['', '', words[i], ''];
        word[1] = word[1] === undefined ? '' : word[1];
        word[2] = word[2].toLowerCase();
        word[3] = word[3] === undefined ? '' : word[3];
        if (this.options.caps.includes(word[2]))
          word[2] = word[2].toUpperCase();
        else if (this.options.lower.includes(word[2]) && (i > 0 && i < n - 1) && !lastStop)
          word[2] = word[2];
        else if (this.options.camel.hasOwnProperty(word[2]))
          word[2] = this.options.camel[word[2]];
        else
          word[2] = word[2].charAt().toUpperCase() + word[2].substr(1);

        formatted.push(word[1] + word[2] + word[3]);
        lastStop = (word[3] !== '' ? this.s.test(word[3].charAt(word[3].length - 1)) : false);
      }
      return formatted.join(' ');
    };
  })(o,t);
}