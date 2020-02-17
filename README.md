# KWin Hide App Windows

A KWin script that emulates the behavior of other desktop environments that
hide an application's windows with `Ctrl/Meta+H`.

Since there doesn't appear to be a concept of "hiding" applications in KWin,
all of an application's active windows are minimized.

This script tracks which windows you've minimized with the script itself so
that restoring "hidden" apps don't restore windows you've manually minimized yourself.

# Install
The script will bind to `Meta+H` by default.

A few ways to install:
1. Download and install the latest `kwinscript` archive from this repo and install from the KWin Scripts
settings module in KDE.
2. Build the `kwinscript` archive yourself with `./release.sh`.
3. Symlink this directory to `~/.local/share/kwin/scripts`

# TODO
- [ ] Add an option to restrict hiding to/across activities
- [ ] Restack restored windows to the front