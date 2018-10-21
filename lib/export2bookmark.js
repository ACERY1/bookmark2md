module.exports = `tell application "Safari"
activate
tell application "System Events"
  tell process "Safari"
    click menu item "导出书签…" of menu "文件" of menu bar 1
  end tell
end tell
end tell`