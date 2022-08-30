# mdbp-vscode README
MDBP（MarkDown-Book-Preview）は書籍の原稿作成に適したMarkdownプレビューの機能拡張です。 [Vivliostyle Viewer](https://vivliostyle.org/download/)と組み合わせて書籍の体裁で表示し、原稿データをInDesign向けのXMLファイルとして書き出す機能を持ちます。

AtomパッケージをVSCodeに移植しました。

https://github.com/lwohtsu/atom-markdown-book-preview

## Features
- 任意の組版用CSSを読み込める
- 置換リストを使用してHTML変換後にテキスト置換を行える。これはMarkdownの不足を補うために使用する
- 画像ファイル名にsvgimgという拡張指定を追加すると、スクリーンショットの拡大縮小やトリミングが行える
- HTMLを実ファイルとして書き出すので、簡易的なHTML生成ツールとしても使用できる
- Vivliostyle Viwerを使用した書籍プレビューが可能
- ファイルの更新を監視してプレビューを更新するため、別のテキストエディタで作業しビューワとしてのみ使うことも可能
- InDesignで読み込み可能なXMLを書き出せる

![MDBPの使用中画面](docimg-1.png)

![コマンドパレットからの実行](docimg-2.png)

![右クリックメニューからの実行](docimg-3.png)

### 事前準備
1. 作業フォルダー内に「_template.html」というファイルを置いてください。これで読み込むcssファイルを指定します。

```html
<!doctype html>
<html>
  <head>
    <title>doc</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="_css/fullpower.css">
  </head>
  <body>
<%=content%>
  </body>
</html>
```
2. フォルダ内にVivliostyle Viewerのviwerフォルダを配置してください。

- Vivliostyle Viewerのダウンロード
https://vivliostyle.org/download/

## How to Use


1. まずフォルダーを開いてください。そこがWebサーバーのルートになります。
2. フォルダー内のMarkdownファイルを開き、右クリックメニューかコマンドパレットで、Start Serverを選択します。
3. Open HTMLまたはVivliostyle Previewを選択すると、Webブラウザでプレビューが表示されます。※HTMLプレビューはコマンドパレットからのみ実行できます。
4. あとはフォルダー内（サブフォルダーも含む）でファイルの更新が発生すると、自動的にWebブラウザのプレビューが更新されます。※フォルダー内を監視しているので、VSCode以外でファイルを保存した場合でも更新されます。

### Start Server / Stop Server
プレビュー用のLive Serverを起動／終了します。

### Open HTML preview
CSSを適用したHTMLをVivliostyleを使わずに表示します。ページ区切りを気にせずに原稿を書きたいときに使います。

### Open Vivliostyle Preview
Vivliostyleを使って書籍風に表示します。

### PDFの印刷
PDFを出力したい場合は、Webブラウザ側の印刷機能を利用します。Chromeを利用する場合は、「送信先」を「PDFに保存」、「余白」を「なし」、「背景のグラフィック」をオンにしてください。

![右クリックメニューからの実行](docimg-4.png)

### Export InDesign XML
InDesignの［構造］パネルで読み込み可能なXMLファイルを書き出します。XMLタグを任意のスタイルとマッピング可能です。また、画像のリンクを活かした自動配置、InDesign上のスクリプトと組み合わせた表の自動作成が可能です。


### 置換リスト
置換リストは`_postReplaceList.json`というJSONファイル内に記述します。

以下の置換リストは「@div クラス名」と「@divend」で囲んだ範囲を、div要素に置換します。また、ハイフンで生成する水平線は改ページ指定として処理します。
```
[
    {
        "f": "@div:([a-z|0-9 ]+)",
        "r": "<div class=\"$1\">"
    },
    {
        "f": "@divend",
        "r": "<\/div>"
    },
    {
        "f": "<hr>",
        "r": "<hr class=\"pagebreak\">"
    },
……後略……
```

### 画像のトリミング
IT書でスクリーンショットは欠かせません。いちいちグラフィックスソフトでトリミングしたり、拡大縮小率を厳密に指定するのは手間なので、画像ファイル名のあとに簡単な指示を入れることで、指定できるようにしました。

```
![](sample.png?svgimg=30,180,200,-10,-10)


?svgimg=倍率,横幅mm,高さmm,横シフト量mm,縦シフト量mm
```

倍率以外のパラメータは省略可能です。幅と高さは省略時なりゆき、シフト量は0となります。

### その他
ゲタ文字〓を使用して連番を自動生成できます。

### postManipulate（後操作）機能
Markdownの記述を簡単にするために、デザイン都合でHTML構造を自動変更する機能を追加しました。h2見出しと直後のp要素を、装飾用の\<div:secheader\>～\</div\>で囲むといった操作を行えます。jQueryに似た機能を持つcheerioというライブラリを利用しています。

操作内容は_postManipurate.jsonというファイルに「セレクタ」「メソッド」「パラメータ」を指定する形にしているので、プロジェクトごとに設定変更が可能です。
```
[
  {
    "selector": "h1",
    "method": "wrapWithNextSib",  // h1要素とその次の1要素をdiv.coverpageでラップする（見出しとリード文のグループ化）
    "paramator": "<div class=\"coverpage\"></div>"
  },
  {
    "selector": "h2",
    "method": "wrap",     // h2要素をdiv.secheaderでラップする（h2要素に装飾用のdivを追加）
    "paramator": "<div class=\"secheader\"></div>"
  },
    "selector": "h3",
    "method": "wrapAll",  // h3要素の直後にある複数のp要素をすべてdiv.col2でラップする（見出しの下の段落を2段組みに）
    "paramator": ["p", "<div class=\"col2\"></div>"]
  },
  {
    "selector": "h2",
    "method": "dupRunning",  // h2要素のテキストを複製してspan.header2という要素を作成する（柱テキストの作成）
    "paramator": "<span class=\"header2\"></span>"
  },
    "selector": "p code",
    "method": "addClass",  // p要素内のcode要素にinline_codeというクラスを追加する
    "paramator": "inline_code"
  },
]
```

### 同名CSSの自動読み込み機能
ファイルごとにCSSを切り替える需要が出てきたため、Markdownファイルと同名のCSSファイルがあれば自動的に読み込むようにしました。
例えば「chap1.md」であれば、「chap1.css」を探し、存在したらHTMLファイルにlink要素を追加して読み込みます。

これを利用すると、章ごとにツメや柱の位置を動かすことなどができます（章の数だけCSSを書くのは若干面倒ですが）。
また、前付け／後付けのみ他と書式を変えることも可能になります。

### ブックモード
「maeduke.md」というファイルをVivliostyleプレビューで表示した場合、ビューワーのURLに「`&bookMode=True'」を付けます。
これによりViviostyleビューワーのブックモードが有効になり、目次のnav要素内でリンクしたHTMLファイルを順番に読み込んで、1つのブックとしてレンダリングします。
この機能を利用しないと、全体でページを通すことができません。

### Vivliostyle CLIのサポート（v0.1.5より追加）
コマンドパネルより、mdbp-vscode: Open Viviostyle Preview CLIを選択すると、Vivliostyle CLIによるプレビューを利用できます。
Node.jsとVivliostyle CLIのインストールが別途必要ですが、原稿フォルダにViewerを用意する必要がなくなります（ViewerのバージョンはVivliostyle CLIのバージョンに依存）。

https://docs.vivliostyle.org/ja/vivliostyle-cli



## Requirements
- VSCode 1.69.0以上
- 作業フォルダー内にVivliostyle viwerが必要です。
- TCP8085ポートを使用します。


## Extension Settings

## Known Issues

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

Initial release of ...

### 0.0.8
初期安定版（bundleなし）

### 0.0.11
プレリリース版

### 0.1.0
bundle by Webpack（サイズが10分の1になったので多分早くなった）

### 0.1.1
バグフィックス（プレビュー更新エラーの修正）

### 0.1.4
プレビュー更新エラーを防ぐために、各所に手を加えた。
chokidarを外し、更新チェックにはVSCode APIのonDidSaveTextDocumentを使う形に。
副作用としてMarkdownの更新時しかプレビューが更新されなくなった。
Vivliostyle CLIによるプレビューにも対応

### 0.1.5
READMEの更新


-----------------------------------------------------------------------------------------------------------

(c)libroworks.co.jp
http://libroworks.co.jp/
