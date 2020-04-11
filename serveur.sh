#!/bin/bash

folder=$(echo $0 | sed 's#/\([^/]*\)$##')
cd $folder
bundle exec jekyll serve
