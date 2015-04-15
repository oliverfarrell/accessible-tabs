# Vanilla JavaScript Accessible Tabs

[![Code Climate](https://codeclimate.com/github/oliverfarrell/accessible-tabs/badges/gpa.svg)](https://codeclimate.com/github/oliverfarrell/accessible-tabs) [![Build Status](https://travis-ci.org/oliverfarrell/accessible-tabs.svg)](https://travis-ci.org/oliverfarrell/accessible-tabs) [![Inline docs](http://inch-ci.org/github/oliverfarrell/accessible-tabs.svg?branch=master)](http://inch-ci.org/github/oliverfarrell/accessible-tabs)

This JavaScript plugin provides accessible tab functionality and adds ARIA attributes to markup. Check out a demo at http://codepen.io/oliverfarrell/pen/VYoXJj

## Usage

Include the script and initialise the tabs library.
```javascript
<script src="tabs.min.js"></script>
<script>
  Tabs.init();
</script>
```

Then add the tabs markup.
```html
<div class="tabs">
  <ul>
    <li><a>Tab 1</a></li>
    <li><a>Tab 2</a></li>
    <li><a>Tab 3</a></li>
  </ul>
  <div>
    <h2>Tab 1</h2>
    <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum.</p>
  </div>
  <div>
    <h2>Tab 2</h2>
    <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum.</p>
  </div>
  <div>
    <h2>Tab 3</h2>
    <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum.</p>
  </div>
</div>
```
