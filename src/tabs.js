var Tabs = (function () {

  var config = {
    selector: document.querySelectorAll('.tabs')
  };


  var _forEachElement = function (selector, fn) {

    var elements = selector;
    for (var i = 0; i < elements.length; i++)
      fn(elements[i], i);

  };


  var _addEventListener = function (el, eventName, handler) {

    if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent('on' + eventName, function(){
        handler.call(el);
      });
    }

  };


  var _showTab = function (tab, count) {

    var tabs = tab.querySelectorAll('[role="tab"]'),
        selectedTab = tab.querySelector('#tab-' + count),
        tabPanel = tab.querySelector('#panel-' + count);

    _hideTabs(tab, tabs);

    selectedTab.setAttribute('aria-selected', true);
    tabPanel.setAttribute('aria-hidden', false);

  };


  var _hideTabs = function (tab, tabs) {

    var tabsPanels = tab.querySelectorAll('[role="tabpanel"]');

    _forEachElement(tabs, function(el, i) {
      el.setAttribute('aria-selected', false);
    });

    _forEachElement(tabsPanels, function(el, i) {
      el.setAttribute('aria-hidden', true);
    });

  };


  var _makeAccessible = function (el) {

    var tabsList = el.querySelector('ul'),
        tabListItems = tabsList.querySelectorAll('li'),
        tabListLinks = tabsList.querySelectorAll('a'),
        tabPanels = el.querySelectorAll('div');


    tabsList.setAttribute('role', 'tablist');

    _forEachElement(tabListItems, function(el, i) {
      el.setAttribute('role', 'presentation');
    });

    _forEachElement(tabListLinks, function(el, i) {
      el.setAttribute('id', 'tab-' + i);
      el.setAttribute('data-tab', i);
      el.setAttribute('role', 'tab');
      el.setAttribute('aria-controls', 'panel-' + i);

      if(i === 0)
        el.setAttribute('aria-selected', true);
      else
        el.setAttribute('aria-selected', false);
    });

    _forEachElement(tabPanels, function(el, i) {
      el.setAttribute('id', 'panel-' + i);
      el.setAttribute('role', 'tabpanel');
      el.setAttribute('aria-labeledby', 'tab-' + i);

      if(i === 0)
        el.setAttribute('aria-hidden', false);
      else
        el.setAttribute('aria-hidden', true);
    });

  };


  var init = function () {

    _forEachElement(config.selector, function(el, i) {

      _makeAccessible(el);

      var tab = el,
          tabsList = tab.querySelectorAll('[role="tab"]'),
          tabPanels = tab.querySelectorAll('[role="tabpanel"]');


      _forEachElement(tabsList, function(el, i) {
        _addEventListener(el, 'click', function() {
          _showTab(tab, el.dataset.tab);
        });
      });


    });

  };


  return {
    init: init
  };


})();