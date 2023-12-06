#!/usr/bin/env bash

################################################################################################
# Installs node_modules, supporting local registry and detection of CI                         # 
#                                                                                              #
# Optional variables:                                                                          #
#  - REGISTRY     (npm|local)   Whether to use a local registry or npm                         #
#  - NO_SCRIPTS                 If 'true' then npm lifecycle hooks won't run (e.g. preinstall) #
#  - DIR_PATH                   Install node_modules in this directory                         #
################################################################################################

set -e

# Vars
REGISTRY=${REGISTRY:-npm}
REGISTRY_ARGS=""

if [[ $NO_SCRIPTS = "true" ]]; then
  INSTALL_ARGS="--ignore-scripts"
fi

# Use npm ci install when in CI land
INSTALL=install
if [[ $CI == "true" ]]; then
  INSTALL="ci install"
fi

# Navigate to dir if path provided
if [ ! -z "$DIR_PATH" ]; then
  cd $DIR_PATH
fi

# Use local registry if provided arg is true
if [ $REGISTRY == "npm" ]; then
  REGISTRY_ARGS="--registry=https://registry.npmjs.org/"
elif [ $REGISTRY == "local" ]
then
  REGISTRY_ARGS="--registry=http://127.0.0.1:4873/"
fi

COMMAND="npm $INSTALL $INSTALL_ARGS $REGISTRY_ARGS"
echo $COMMAND

# Run install in main source and in _build
$COMMAND

