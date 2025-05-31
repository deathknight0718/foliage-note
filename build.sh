#!/bin/bash -e

#    Licensed to the Apache Software Foundation (ASF) under one or more
#    contributor license agreements.  See the NOTICE file distributed with
#    this work for additional information regarding copyright ownership.
#    The ASF licenses this file to You under the Apache License, Version 2.0
#    (the "License"); you may not use this file except in compliance with
#    the License.  You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.

###############################################################################
# Build Script for Website
###############################################################################

# OS check
if [ "$(uname)" != "Linux" ]; then
    echo "OS must be Linux."
    exit 1
fi

# Find PROJECT_HOME path
PRG="$0"
while [ -h "$PRG" ] ; do
    ls=`ls -ld "$PRG"`
    link=`expr "$ls" : '.*-> \(.*\)$'`
    if expr "$link" : '/.*' > /dev/null; then
        PRG="$link"
    else
        PRG="`dirname "$PRG"`/$link"
    fi
done
SAVEDDIR=`pwd`
PROJECT_HOME=`dirname "$PRG"`/.
PROJECT_HOME=`cd "$PROJECT_HOME" && pwd`
export "PROJECT_HOME=$PROJECT_HOME"
cd "$SAVEDDIR"

echo "Project home directory: $PROJECT_HOME"

# Check build directory
PROJECT_BUILD_DIR="$PROJECT_HOME/.build"
if [ -d "$PROJECT_BUILD_DIR" ]; then
    echo "Build directory exists: $PROJECT_BUILD_DIR"
    rm -rf "$PROJECT_BUILD_DIR"
    mkdir -p "$PROJECT_BUILD_DIR"
    echo "Reset existing build directory."
fi

# Check if Jupyter is Installed
if ! command -v jupyter &> /dev/null; then
    echo "Jupyter is not installed. Please install Jupyter Notebook or JupyterLab."
    exit 1
fi

###############################################################################
# Convert Jupyter Notebooks to Markdown
###############################################################################

# List of notebooks to convert
PROJECT_NOTEBOOKS_DIR="$PROJECT_HOME/posts/notes"
if [ ! -d "$PROJECT_NOTEBOOKS_DIR" ]; then
    echo "Notebooks directory does not exist: $PROJECT_NOTEBOOKS_DIR"
    exit 1
fi

PROJECT_NOTEBOOKS_LIST=$(find "$PROJECT_NOTEBOOKS_DIR" -name "*.ipynb" -type f)
echo "Found notebooks:"
for NOTEBOOK in $PROJECT_NOTEBOOKS_LIST; do
    echo "Converting $NOTEBOOK to Markdown..."
    NOTEBOOK_DIR_NAME=$(basename $(dirname "$NOTEBOOK"))
    NOTEBOOK_DIR=$PROJECT_BUILD_DIR/public/notes/$NOTEBOOK_DIR_NAME
    echo "Output directory: $NOTEBOOK_DIR"
    jupyter nbconvert --to markdown "$NOTEBOOK" --output-dir="$NOTEBOOK_DIR" --output="index.zh-cn.md" --NbConvertApp.output_files_dir="./resources"
    if [ $? -ne 0 ]; then
        echo "Failed to convert $NOTEBOOK"
        exit 1
    fi
done

###############################################################################
# Copy Markdown Files
###############################################################################

# List of markdowns to copy
PROJECT_MARKDOWNS_DIR="$PROJECT_HOME/posts/exams"
if [ ! -d "$PROJECT_MARKDOWNS_DIR" ]; then
    echo "Markdowns directory does not exist: $PROJECT_MARKDOWNS_DIR"
    exit 1
fi

PROJECT_MARKDOWNS_LIST=$(find "$PROJECT_MARKDOWNS_DIR" -name "*.md" -type f)
echo "Found markdowns:"
for MARKDOWN in $PROJECT_MARKDOWNS_LIST; do
    echo "Copying $MARKDOWN to build directory..."
    cp -rf "$(dirname "$MARKDOWN")" "$PROJECT_BUILD_DIR/public/exams/"
    if [ $? -ne 0 ]; then
        echo "Failed to copy $MARKDOWN"
        exit 1
    fi
done