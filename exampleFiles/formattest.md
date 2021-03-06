# Chapter 1　章タイトルる？

基本コンセプト
- その言語の魅力、面白さを伝える
- 内容はガチでも、デザインは柔らか

## 節タイトル - Enter The TypeScript or GoLang
リード文。読者に話しかける感じで、この節で説明することを知ると、何ができるようになるのかを伝えてください。あああああああああああああああああああああああああああああああいああ


### モジュールを利用する - h3中見出し
#### datetimeクラスの利用 - h4小見出し
Chapter 4でオリジナルの関数をまとめたモジュールを作りましたが、実はPythonには、はじめから多数のモジュールが付属しています。これら**付属のモジュールを総称して「標準ライブラリ」と呼びます**。

標準ライブラリのモジュールを利用することで、プログラムでできることの範囲をさらに広げることができます。標準ライブラリはimport文でインポートするだけですぐに利用できます。


###### chap5-3-1.py
```py
from datetime import date, timedelta
start = date( 2018, 6, 18 )    #←コメントの先頭を←にすると引き出し線に
for days in range(14):    #←繰り返しのfor文
    cur = start + timedelta( days=days )
    print( cur )
```

###### 実行結果
```console
2018/6/18
2018/6/18
2018/6/18
2018/6/18
```


@div:syntax
###### import文の書式
```py
from datetime import date, timedelta
```
- モジュール名またはパッケージ名
- クラス名
@divend

複数のクラスをカンマ区切りで指定すると、まとめてインポートできます。

【著者egao】吹き出しを使って時々読者に語りかけ、ポイント、心構え、注意点など、強調したい物事を伝えてください。

### 2週間分の日付の一覧を作る
開始日から2週間分の日付を表示するプログラムを書いてみましょう。「2週間分」のように複数のデータを作る場合、for文を使うことはすぐ思いつきます。ただし、dateオブジェクトだけで2週間分の日付を作ろうとするとうまくいきません。**その月の最終日を越えた日付、たとえば33日などを渡すと、バリューエラーが発生してしまうからです**。そこで、開始日のdateオブジェクトを作り、そこに経過日数のtimedeltaオブジェクトを加えて目的の日付を作ります。

##### 標準ライブラリのモジュール（抜粋）

|モジュール名 |説明
|--|--
|csv |CSVファイルの読み込みと書き込みを行う
|datetime |日時を扱う
|json |Webでよく用いられるJSON形式のデータを扱う
|math |三角関数など数値計算用の関数がまとめられている
|pathlib |ファイルやフォルダの操作を行う
|random |乱数（デタラメに見える数）を生成する
|tkinter |GUIアプリケーションを作る
|zipfile |ZIP形式の圧縮ファイルを扱う

@div:figure
![](img0/c0-1-12.png?svgimg=40)
- ❶手順［I Agree］をクリック
- ❷手順［Cancel］をクリック
- ▶結果

@divend

- 箇条書きああああああああああああああああああああああああああああああああああああああ
- 箇条書き
- 箇条書き
- 箇条書き

1. 番号付き箇条書き
1. 番号付き箇条書き
1. 番号付き箇条書き
1. 番号付き箇条書き


@div:column
##### コラム：コラムタイトル
開始日から2週間分の日付を表示するプログラムを書いてみましょう。「2週間分」のように複数のデータを作る場合、for文を使うことはすぐ思いつきます。ただし、dateオブジェクトだけで2週間分の日付を作ろうとするとうまくいきません。**その月の最終日を越えた日付、たとえば33日などを渡すと、バリューエラーが発生してしまうからです**。そこで、開始日のdateオブジェクトを作り、そこに経過日数のtimedeltaオブジェクトを加えて目的の日付を作ります。

@divend


---

@div:matome
### この章のまとめ
- 章の最後（節ではなく）にまとめを入れたいです。この章で説明したことを、あとから見返す役に立つ内容を想定しています。
- あああああああああああああああああ
- あああああああああああああああああ
- あああああああああああああああああ
- あああああああああああああああああ


@divend
