let webContents

export function registerMainWindow(wc) {
  webContents = wc
}

export function send(...args) {
  console.log(args)
  webContents.send(...args)
}
