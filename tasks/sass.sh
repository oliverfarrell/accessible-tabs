#!/bin/bash

node-sass test/main.scss --output-style compressed test/main.css
autoprefixer test/main.css
