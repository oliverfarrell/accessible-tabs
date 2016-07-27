var Tabs = (function () {

  var config = {
    selector: document.querySelectorAll('.tabs')
  };

  /**
   * Loop through all the elements that match the selector.
   *
   * @param {Object} selector
   * @param {Function} fn
   */
  var _forEachElement = function (selector, fn) {

    var elements = selector;
    for (var i = 0; i < elements.length; i++) {
      fn(elements[i], i);
    }

  };

  /**
   * Add an event listener to an element
   *
   * @param {Object} el
   * @param {String} eventName
   * @param {Function} handler
   */
  var _addEventListener = function (el, eventName, handler) {

    if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent('on' + eventName, function () {
        handler.call(el);
      });
    }

  };

  /**
   * Return the next element
   *
   * @param {Object} el
   */
  var nextElementSibling = function (el) {

    do { el = el.nextSibling; } while (el && el.nodeType !== 1);
    return el;

  };

  /**
   * Return the previous element
   *
   * @param {Object} el
   */
  var previousElementSibling = function (el) {

    do { el = el.previousSibling; } while (el && el.nodeType !== 1);
    return el;

  };

  /**
   * Show a tab panel
   *
   * @param {Object} tabGroup
   * @param {Integer} tabId
   */
  var _showTabPanel = function (tabGroup, tabId) {

    var tabs = tabGroup.querySelectorAll('[role="tab"]'),
        selectedTab = tabGroup.querySelector('[data-tab="' + tabId + '"'),
        tabPanel = tabGroup.querySelector('[data-panel="' + tabId + '"');

    // hide all other tab panels in the tab group
    _hideTabPanels(tabGroup, tabs);

    // change the `aria-` states of the tab and panel
    selectedTab.setAttribute('aria-selected', true);
    tabPanel.setAttribute('aria-hidden', false);

  };

  /**
   * Hide tab panels
   *
   * @param {Object} tabGroup
   * @param {object} tabGroupTabs
   */
  var _hideTabPanels = function (tabGroup, tabGroupTabs) {

    var tabsPanels = tabGroup.querySelectorAll('[role="tabpanel"]');

    // change the `aria-` states of the tabs
    _forEachElement(tabGroupTabs, function(el, i) {
      el.setAttribute('aria-selected', false);
    });

    // change the `aria-` states of the panel
    _forEachElement(tabsPanels, function(el, i) {
      el.setAttribute('aria-hidden', true);
    });

  };

  /**
   * Make all tabs accessible by adding `aria-` attributes
   *
   * @param {Object} el
   */
  var _makeAccessible = function (el) {

    var tabsList = el.querySelector('ul'),
        tabListItems = tabsList.querySelectorAll('li'),
        tabListLinks = tabsList.querySelectorAll('a'),
        tabPanels = el.querySelectorAll('div');

    // apply an `aria-role` to the `<ul>`
    tabsList.setAttribute('role', 'tablist');

    // apply an `aria-role` to the `<li>`
    _forEachElement(tabListItems, function (el, i) {
      el.setAttribute('role', 'presentation');
    });

    // apply `aria-` attributes to `<a>`
    _forEachElement(tabListLinks, function (el, i) {
      el.setAttribute('href', '');
      el.setAttribute('data-tab', i);
      el.setAttribute('role', 'tab');
      el.setAttribute('aria-controls', 'panel-' + i);

      // if it's the first tab it's already active
      if (i === 0) {
        el.setAttribute('aria-selected', true);
      } else {
        el.setAttribute('aria-selected', false);
      }
    });

    // apply `aria-` attributes to `<div>`
    _forEachElement(tabPanels, function (el, i) {
      el.setAttribute('data-panel', i);
      el.setAttribute('role', 'tabpanel');
      el.setAttribute('aria-labelledby', 'tab-' + i);

      // if it's the first panel it's already active
      if (i === 0) {
        el.setAttribute('aria-hidden', false);
      } else {
        el.setAttribute('aria-hidden', true);
      }
    });

  };

  var init = function (options) {

    // overwrite the default configuration
    for (var prop in options) {
      if (options.hasOwnProperty(prop)) {
        config[prop] = options[prop];
      }
    }

    // loop through all instances of the selector
    _forEachElement(config.selector, function (el, i) {

      // apply all the accessibility stuff
      _makeAccessible(el);

      var tab = el,
          tabsList = tab.querySelectorAll('[role="tab"]'),
          tabPanels = tab.querySelectorAll('[role="tabpanel"]');

      // loop through all instances of [role="tab"]
      _forEachElement(tabsList, function (el, i) {

        // add a click event to the tab and show the respective tab
        _addEventListener(el, 'click', function (e) {
          _showTabPanel(tab, el.getAttribute('data-tab'));

          var evt = e || window.event;

          if (evt.preventDefault) {
            evt.preventDefault();
          } else {
            evt.returnValue = false;
            evt.cancelBubble = true;
          }
        });

        // add a :focus event and show the respective tab
        _addEventListener(el, 'focus', function() {
          _showTabPanel(tab, el.getAttribute('data-tab'));
        });

        // add a keydown event
        _addEventListener(el, 'keydown', function (e) {
          var active = document.activeElement;

          // if left arrow show previous tab panel
          if (e.which === 37) {
            var prevTab = previousElementSibling(active.parentNode);

            // alter focus to the same tab
            if (prevTab) {
              prevTab.querySelector('a').focus();
            }

          // if right arrow show next tab panel
          } else if (e.which === 39) {
            var nextTab = nextElementSibling(active.parentNode);

            // alter focus to the same tab
            if (nextTab) {
              nextTab.querySelector('a').focus();
            }
          }

        });
      });
    });

  };

  return {
    init: init
  };

})();
