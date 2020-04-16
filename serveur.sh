#!/bin/bash

folder=$(echo $0 | sed 's#/\([^/]*\)$##')
cd $folder
RUBYOPT=-W0 bundle exec jekyll serve -H $(hostname)

