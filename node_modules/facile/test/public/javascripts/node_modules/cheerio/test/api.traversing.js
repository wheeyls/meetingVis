(function() {
  var $, expect, fruits;

  $ = require('../');

  expect = require('expect.js');

  /*
    Examples
  */

  fruits = '<ul id = "fruits">\n  <li class = "apple">Apple</li>\n  <li class = "orange">Orange</li>\n  <li class = "pear">Pear</li>\n</ul>'.replace(/(\n|\s{2})/g, '');

  /*
    Tests
  */

  describe('$(...)', function() {
    describe('.find', function() {
      it('() : should return this', function() {
        return expect($('ul', fruits).find()[0].name).to.equal('ul');
      });
      it('(single) : should find one descendant', function() {
        return expect($('#fruits', fruits).find('.apple')[0].attribs["class"]).to.equal('apple');
      });
      it('(many) : should find all matching descendant', function() {
        return expect($('#fruits', fruits).find('li')).to.have.length(3);
      });
      it('(many) : should merge all selected elems with matching descendants');
      it('(invalid single) : should return empty if cant find', function() {
        return expect($('ul', fruits).find('blah')).to.have.length(0);
      });
      return it('should return empty if search already empty result', function() {
        return expect($('#fruits').find('li')).to.have.length(0);
      });
    });
    describe('.children', function() {
      it('() : should get all children', function() {
        return expect($('ul', fruits).children()).to.have.length(3);
      });
      it('(selector) : should return children matching selector', function() {
        return expect($('ul', fruits).children('.orange').hasClass('orange')).to.be.ok;
      });
      it('(invalid selector) : should return empty', function() {
        return expect($('ul', fruits).children('.lulz')).to.have.length(0);
      });
      return it('should only match immediate children, not ancestors');
    });
    describe('.next', function() {
      it('() : should return next element', function() {
        return expect($('.orange', fruits).next().hasClass('pear')).to.be.ok;
      });
      return it('(no next) : should return null (?)');
    });
    describe('.prev', function() {
      it('() : should return previous element', function() {
        return expect($('.orange', fruits).prev().hasClass('apple')).to.be.ok;
      });
      return it('(no prev) : should return null (?)');
    });
    describe('.siblings', function() {
      it('() : should get all the siblings', function() {
        return expect($('.orange', fruits).siblings()).to.have.length(2);
      });
      return it('(selector) : should get all siblings that match the selector', function() {
        return expect($('.orange', fruits).siblings('li')).to.have.length(2);
      });
    });
    describe('.each', function() {
      return it('( (i, elem) -> ) : should loop selected returning fn with (i, elem)', function() {
        var items;
        items = [];
        $('li', fruits).each(function(i, elem) {
          return items[i] = elem;
        });
        expect(items[0].attribs["class"]).to.equal('apple');
        expect(items[1].attribs["class"]).to.equal('orange');
        return expect(items[2].attribs["class"]).to.equal('pear');
      });
    });
    describe('.first', function() {
      it('() : should return the first item', function() {
        var elem, src;
        src = $("<span>foo</span><span>bar</span><span>baz</span>");
        elem = src.first();
        expect(elem.length).to.equal(1);
        return expect(elem.html()).to.equal('foo');
      });
      return it('() : should return an empty object for an empty object', function() {
        var first, src;
        src = $();
        first = src.first();
        expect(first.length).to.equal(0);
        return expect(first.html()).to.be(null);
      });
    });
    describe('.last', function() {
      it('() : should return the last element', function() {
        var elem, src;
        src = $("<span>foo</span><span>bar</span><span>baz</span>");
        elem = src.last();
        expect(elem.length).to.equal(1);
        return expect(elem.html()).to.equal('baz');
      });
      return it('() : should return an empty object for an empty object', function() {
        var last, src;
        src = $();
        last = src.last();
        expect(last.length).to.equal(0);
        return expect(last.html()).to.be(null);
      });
    });
    describe('.first & .last', function() {
      return it('() : should return same object if only one object', function() {
        var first, last, src;
        src = $("<span>bar</span>");
        first = src.first();
        last = src.last();
        expect(first.html()).to.equal(last.html());
        expect(first.length).to.equal(1);
        expect(first.html()).to.equal('bar');
        expect(last.length).to.equal(1);
        return expect(last.html()).to.equal('bar');
      });
    });
    return describe('.eq', function() {
      return it('(i) : should return the element at the specified index', function() {
        expect($('li', fruits).eq(0).text()).to.equal('Apple');
        expect($('li', fruits).eq(1).text()).to.equal('Orange');
        expect($('li', fruits).eq(2).text()).to.equal('Pear');
        expect($('li', fruits).eq(3).text()).to.equal('');
        return expect($('li', fruits).eq(-1).text()).to.equal('Pear');
      });
    });
  });

}).call(this);
