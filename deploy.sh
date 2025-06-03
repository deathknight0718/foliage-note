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
# Deploy Posts to Build Directory
###############################################################################

echo "Copying posts to build directory..."

PROJECT_POSTS_DIR="$PROJECT_HOME/posts"
if [ ! -d "$PROJECT_POSTS_DIR" ]; then
    echo "Posts directory does not exist: $PROJECT_POSTS_DIR"
    exit 1
fi

cp -rf "$PROJECT_POSTS_DIR" "$PROJECT_BUILD_DIR/"

# Convert Jupyter Notebooks to Markdown

echo "Converting Jupyter Notebooks to Markdown..."
jupyter nbconvert --to markdown "$PROJECT_BUILD_DIR/posts/**/**/note.ipynb" --output="index.zh-cn.md" --NbConvertApp.output_files_dir="./resources"

# Build Metadata

echo "Building index.json..."

OUTPUT_INDEX=()

PROJECT_JQ_FILE="$PROJECT_HOME/dformat.jq"
PROJECT_INDEX_FILE="$PROJECT_BUILD_DIR/posts/meta.json"

for MARKDOWN in $(find "$PROJECT_BUILD_DIR/posts" -name "*.md" -type f); do
    MARKDOWN_META="$(dirname "$MARKDOWN")/meta.json"
    pandoc -s -t json "$MARKDOWN" | jq -f "$PROJECT_JQ_FILE" | jq ".path = \"${MARKDOWN##*/posts}\""> "$MARKDOWN_META"
    OUTPUT_INDEX+=("$(jq -c . "$MARKDOWN_META")")
done

printf '%s\n' "${OUTPUT_INDEX[@]}" | jq -s '.' > "$PROJECT_INDEX_FILE"
echo "Index JSON built successfully at $PROJECT_INDEX_FILE"

###############################################################################
# Deploy to Cloudflare
###############################################################################

PROJECT_DEPLOY=true

if [ "$PROJECT_DEPLOY" = true ]; then
    echo "Deploying to Cloudflare..."
    rclone sync "$PROJECT_BUILD_DIR/posts" "cloudflare:foliage-note" --checksum --progress --transfers=10 --checkers=10
    if [ $? -ne 0 ]; then
        echo "Failed to sync posts to Cloudflare."
        exit 1
    fi
    echo "Posts copied to Cloudflare successfully."
fi