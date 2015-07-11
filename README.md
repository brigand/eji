## the emoji cli tool you've always wanted!

Features:

 - name -> emoji, and emoji -> name
 - 'did you mean' style suggestions that go beyond levenshtein
 - easy to add shell completion
 - status codes, tty detection, just emoji/name on stdout
 - emojis!

![picture of usage in fish shell on iterm 2.9][pic]

[pic]: http://i.imgur.com/N5L2Ach.png

---

Install

```
npm install -g eji
```

Here's an example where we're searching for an emoji. One of the cool things is that only the emoji on the first line is written to stdout, so you can pipe just the emoji to a file, your clipboard, etc.

```
$ eji up
This is what you're looking for: 🆙

But maybe also these:
 - up                🆙
 - point_up          ☝️
 - arrow_up          ⬆️
 - us                🇺🇸
 - jp                🇯🇵
 - page_facing_up    📄
 - point_up_2        👆
 - arrow_double_up   ⏫
 - fr                🇫🇷
 - es                🇪🇸
```

Let's go the other way!

```
$ eji 🆙
The code for this emoji is :up:
```

Now we're not all perfect, so what happens if you make a mistake?

```
$ eji trafic_lit
Not sure what a "trafic_lit" is. Maybe you meant one of these:
 - traffic_light   🚥
 - trident         🔱
 - toilet          🚽
 - tractor         🚜
 - train           🚋
 - train2          🚆
 - ticket          🎫
 - rabbit          🐰
 - black_nib       ✒️
 - accept          🉑
```

Thanks eji!

### Shell completion

Well I just use fish, and this is the completion command. data/emoji-completion is just an emoji name on each line.

```
complete -x -c eji -d "Emoji" -a '(cat (npm root -g)/eji/data/emoji-completion)'
```


