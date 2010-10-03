goog.require('treesaver.dom');

$(function() {
  module('dom', {
    setup: function () {
    },
    teardown: function () {
    }
  });

  test('className helpers', function () {
    var div = document.createElement('div');

    equals(treesaver.dom.classes(div).length, 0, 'classes: Unset className');

    treesaver.dom.addClass(div, 'test');

    equals(treesaver.dom.classes(div).length, 1, 'classes: Single class');
    ok(treesaver.dom.hasClass(div, 'test'), 'hasClass: Single class');
    ok(!treesaver.dom.hasClass(div, 'bogus'), 'hasClass: Single class failure');

    treesaver.dom.removeClass(div, 'test');

    equals(treesaver.dom.classes(div).length, 0, 'classes: Removed class');
    ok(!treesaver.dom.hasClass(div, 'test'), 'hasClass: Removed class');
  });

  test('hasAttr', function () {
    var div = document.createElement('div'),
        attr = document.createAttribute('width');

    div.setAttributeNode(attr);
    
    ok(!treesaver.dom.hasAttr(div, 'test'), 'Non existing attribute');
    ok(treesaver.dom.hasAttr(div, 'width'), 'Property exists');
  });

  test('getElementsByClassName', function () {
    var div = document.createElement('div');
    div.innerHTML = '<p class="one"><span class="one inner"></span></p>';
    div.innerHTML += '<p class="two"><span class="two inner"></span></p>';

    equals(treesaver.dom.getElementsByClassName('one', div).length, 2);
    equals(treesaver.dom.getElementsByClassName('inner', div).length, 2);
    equals(treesaver.dom.getElementsByClassName('outer', div).length, 0);
  });

  test('getElementsByProperty', function () {
    var div = document.createElement('div');
    div.innerHTML = '<p class="one" itemscope><span class="one inner"></span></p>';
    div.innerHTML += '<p class="two"><span class="two inner"></span></p>';
    div.innerHTML += '<script type="text/x-treesaver-template">hello world</script>';

    equals(treesaver.dom.getElementsByProperty('class', null, null, div).length, 4);
    equals(treesaver.dom.getElementsByProperty('class', 'one', null, div).length, 2);
    equals(treesaver.dom.getElementsByProperty('class', 'one', 'p', div).length, 1);
    equals(treesaver.dom.getElementsByProperty('itemscope', null, null, div).length, 1, 'Property without value');
    equals(treesaver.dom.getElementsByProperty('type', 'text/x-treesaver-template', 'script', div).length, 1);
  });
});
