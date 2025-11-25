import webview

#creating window
window = webview.create_window(
    "Focus Timer ",
    "focuspage.html",
    width=600,
    height=600,
    resizable=False
)

#run
webview.start()

