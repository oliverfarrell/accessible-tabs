#!/bin/bash

jshint src/**.js
uglifyjs src/tabs.js -o dist/tabs.min.js --source-map dist/tabs.min.js.map --source-map-url /dist/tabs.min.js.map
