RED="\033[91m"
GREEN="\033[92m"
YELLOW="\033[93m"
MAGENTA="\033[95m"
GREY="\033[7m"
BOLD="\033[1m"
RESET="\033[0m"

output=/dev/null
if ! [ -z "$VERBOSE" ]; then
  output=/dev/stdout
fi

debug () {
  echo -e "${GREY}$1${RESET}" > $output
}

success () {
  echo -e "${GREEN}${BOLD}$1${RESET}"
}

info () {
  echo -e "${MAGENTA}$1${RESET}"
}

warn () {
  echo -e "${YELLOW}$1${RESET}"
}

error () {
  echo -e "${RED}ERROR: $1${RESET}"
}

fail () {
  echo
  info "The script failed!"
  info "Here are a few things you can try to troubleshoot:"
  echo
  info "* Set VERBOSE=1 and re-run this script."
  info "* Did we miss something? Add it to this script!"

  exit 1
}

debug "logging loaded"
