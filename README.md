# アプリの名前

## QuickDonut

『業務連絡のレスが早い人ほどポイントが貯まる（仕事のできる信頼が可視化される）チャットアプリ』
<br/>
【[サイトURL](https://quickdonutfb.firebaseapp.com)】

# 特徴

* リアルタイムでユーザー間のメッセージの送受信ができます。
* 相手の任意で送られてくる”即レスしてほしいメッセージ”に、1時間以内に返信することでポイントが加算されます。
* コンタクトを承認し合わないとメッセージを送受信できませんが、相手ユーザーのポイントなどの情報は事前に誰でも検索できます。
* リアルタイムでユーザーがオンラインかオフラインかが表示されるので、よりコミュニケーションが円滑になります。

# 使用したライブラリ

* firebase 8.3.0
* react 17.0.1
* react-dom 17.0.1
* react-router-dom 5.2.0
* redux 4.0.5
* react-redux 7.2.2
* redux-thunk 2.3.0

# 使い方

1. サイトにアクセスし、メールアドレスでユーザー登録を行います。
2. 登録が成功したらトークページに切り替わります。しかし、まだコンタクト承認しているユーザーが居ないため、何も表示がありません。
3. ユーザー情報ページに移動し、コンタクト承認したいユーザーのIDを入力し、ボタンを押して承認手続きを済ませましょう。お互いの承認が完了したら、先ほどのトークページに新しくユーザーが増えているはずです。
4. トークページでメッセージを送る際、早く返信してほしいメッセージには、”DOUNT”ボタンを押した状態で送信しましょう。相手は、そのメッセージに1時間以内に返信すると、相手自身にDonutPointが加算されます。
5. 逆に、相手から”DONUT”メッセージが送られてきた際、1時間以内に返信すると、あなたにDonutPointが加算されます。

# 開発背景・開発過程

[別記事](https://qiita.com/Yopipo415/items/41fd9435cdd6cb7ad294)でまとめています。

# 今後実装・改善したいこと

・さらにユーザーの即レスデータを正確にするため、週間での総オンライン時間、ポイント獲得数の表示
・即レス時間はいいものの、その返信内容が適切だったかを判断するため、ポイント獲得時に相手から返信内容をGood/Bad/NothingSpecialで評価される（その総数もデータ表示）

# 制作者情報

* 深居昌哉
* 転職活動中
* fslm5415@gmail.com
