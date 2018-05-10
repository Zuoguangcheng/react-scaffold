#!/bin/bash
set -e

cyan="\e[0;36m"
red="\e[0;31m"
reset="\e[0m"

targetPath=$1

echo $targetPath

cd $targetPath


npm install

echo 'hahah'
