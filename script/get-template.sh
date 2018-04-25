#!/bin/bash
set -e

cyan="\e[0;36m"
red="\e[0;31m"
reset="\e[0m"

targetPath=$1
fromPath=$2

cd $targetPath

# printf "$cyan>开始下载...$reset\n"

git clone $fromPath

