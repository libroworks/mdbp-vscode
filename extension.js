// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const MarkdownBookPreviewServer = require('./lib/markdown-book-preview-server');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const markdownBookPreviewServer = new MarkdownBookPreviewServer();

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "mdbp-vscode" is now active!');

  context.subscriptions.push(vscode.registerCommand('mdbp-vscode.test', ()=>{
    vscode.window.showInformationMessage('Hello! This is Test.');
  }));
  context.subscriptions.push(vscode.registerCommand('mdbp-vscode.startServer', startServer));
  context.subscriptions.push(vscode.registerCommand('mdbp-vscode.stopServer', stopServer));
  context.subscriptions.push(vscode.registerCommand('mdbp-vscode.toggle', toggle));
  context.subscriptions.push(vscode.registerCommand('mdbp-vscode.toggleVS', toggleVS));
  context.subscriptions.push(vscode.registerCommand('mdbp-vscode.exportXML', exportXML));


  // サーバーの起動終了
  function startServer() {
    markdownBookPreviewServer.startWebServer();
  };
  function stopServer() {
    markdownBookPreviewServer.stopWebServer();
  };

  // 生のHTMLで開く
  function toggle(vsmode = false) {
    console.log('MarkdownBookPreview was toggled!');
    const editor = vscode.workspace.getActiveTextEditor();
    if (checkEditorPath(editor) === false) return;
    // プレビューしたいパスやVSmodeを設定
    const mdpath = editor.getPath();
    console.log(mdpath);
    markdownBookPreviewServer.setTargetMarkdownFile(mdpath, vsmode);
  }

  // Vivliostyleで開く
  function toggleVS() {
    console.log('Vivliostyle Mode');
    toggle(true);
  }

  // InDesign用のXMLを書き出す
  function exportXML() {
    console.log('MarkdownBookPreview export XML');
    const editor = vscode.workspace.getActiveTextEditor();
    if (checkEditorPath(editor) === false) return;
    // プレビューしたいパスやVSmodeを設定
    const mdpath = editor.getPath();
    markdownBookPreviewServer.exportInDesignXML(mdpath);
  }

  // チェック
  function checkEditorPath(editor) {
    if (editor === null) return false;
    const path = editor.getPath();
    if (!path) {
        vscode.window.showInformationMessage('ファイルを保存してから実行してください');
        return false;
    }
    if (path.indexOf('.md') < 0) {
        vscode.window.showInformationMessage('Mardownファイルではありません');
        return false;
    }
    return true;
  }
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
}


