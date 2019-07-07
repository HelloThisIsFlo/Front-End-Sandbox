#!/bin/bash

MAX=600
# MAX=2560

convert $1 -resize ${MAX}x${MAX}^ $1
