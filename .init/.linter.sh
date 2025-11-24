#!/bin/bash
cd /home/kavia/workspace/code-generation/osn-stream-file-manager-3182-3191/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

