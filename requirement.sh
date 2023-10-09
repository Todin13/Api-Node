#!/bin/bash

# Check if nvm (Node Version Manager) is installed, if not, install it
if ! command -v nvm &> /dev/null; then
  echo "nvm is not installed, installing it..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
  source ~/.bashrc   # Or source ~/.zshrc if you use Zsh
fi

# Install Node.js version 20.8.0
nvm install 20.8.0

# Set Node.js version 20.8.0 as the default version
nvm alias default 20.8.0

# Install npm version 10.2.0
npm install -g npm@10.2.0

# Verify Node.js and npm versions
node -v
npm -v

