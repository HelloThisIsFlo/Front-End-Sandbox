#!/bin/bash

DIR_TO_WATCH=.

fswatch -o $DIR_TO_WATCH | xargs -n1 -I {} osascript -e 'tell application "Google Chrome" to tell the active tab of its first window to reload'
