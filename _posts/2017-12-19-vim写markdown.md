---
layout:     post
title:      vim写markdown
date:       2017-12-19
summary:    vim写markdown
categories: vim
tags:
 - markdown
 - vim
---

### 必读link

+ [Better Writing Markdown Experience on Vim][4]
+ [Move cursor by display lines when wrapping][5]
+ [Vim Setup for Markdown][1]


### Why

几乎所有markdown编辑器在编辑markdown的一个段落时都是不换行的,也即一段不换行,一段就是一行,不过在这些编辑器中眼睛看到的是"换行的",实际上是没有换行的,可通过使用记事本等文本工具打开来验证这一点.为什么这些markdown编辑器不将一个段落的内容进行换行呢?**在markdown中,可通过连续的两个空格加上换行符实现段内换行**,笔者认为只有不进行换行才能达到自适应不同屏幕的好的显示效果,如果在段落中按照每行一个合理的固定长度(如79个字符长度)进行自动换行,那么在不同大小的屏幕上显示这个markdown的段落时会有一些多余的空格符,因为markdown在渲染成html后将一个单独的换行符(\n)变成一个空格符,这样写出的markdown不是最好的markdown,这种情况的详情在[这里][2],渲染后的效果如下图  

![换行变成空格][3]

所以在用vim写markdown时要向markdown编辑器学习,一段不换行.可通过vim的set wrap实现,不过这样设置后vim编辑的时候用默认的设置会有"不适",如j/k的使用,0/$的使用等.

### How

为解决vim开启wrap写markdown时的一些"不适",可在vimrc中设置如下

```
"markdown setting
au BufNewFile,BufReadPost *.{md,mdown,mkd,mkdn,markdown,mdwn} set filetype=markdown
au BufNewFile,BufReadPost,BufWrite *.{md,mdown,mkd,mkdn,markdown,mdwn} syntax match Comment /\%^---\_.\{-}---$/
au FileType markdown setlocal linebreak    " Avoid wrap breaking words
au FileType markdown setlocal nolist       " Make sure linebreak work as expected
au FileType markdown setlocal textwidth=0 " Remove text width limit

" for wrap is on
noremap  <buffer> <silent> k gk
" for wrap is on
noremap  <buffer> <silent> j gj
" for wrap is on
noremap  <buffer> <silent> 0 g0
" for wrap is on
noremap  <buffer> <silent> $ g$

inoremap <c-h> <left>
" for wrap is on
inoremap <c-j> <esc>gjli
" for wrap is on
inoremap <c-k> <esc>gkli
inoremap <c-l> <right>
cnoremap <c-h> <left>
cnoremap <c-j> <down>
cnoremap <c-k> <up>
cnoremap <c-l> <right>
```

上面是不用插件的方法,也可使用[vim-pencil][6]插件实现这个功能,此外vim-pencil插件还有其他的功能,使用vim-pencil插件后适应markdown的wrap开启状态的编写设置如下,其中vim-pencil已具备jk0$自动换成`gj/gk/g0/g$`的功能,此外上面的设置中其他功能尚未测试,于是同样保留在vimrc中

```
Plugin 'reedes/vim-pencil'  "安装这个插件,放在较靠前位置
...
...
let g:pencil#wrapModeDefault = 'soft'   " default is 'hard'

"markdown setting
au BufNewFile,BufReadPost *.{md,mdown,mkd,mkdn,markdown,mdwn} set filetype=markdown
au BufNewFile,BufReadPost,BufWrite *.{md,mdown,mkd,mkdn,markdown,mdwn} syntax match Comment /\%^---\_.\{-}---$/
au FileType markdown setlocal linebreak    " Avoid wrap breaking words
au FileType markdown setlocal nolist       " Make sure linebreak work as expected
au FileType markdown setlocal textwidth=0 " Remove text width limit

augroup pencil
  autocmd!
  autocmd FileType markdown,mkd call pencil#init()
  autocmd FileType text         call pencil#init({'wrap': 'hard'})
augroup END

inoremap <c-h> <left>
" for wrap is on
inoremap <c-j> <esc>gjli
" for wrap is on
inoremap <c-k> <esc>gkli
inoremap <c-l> <right>
cnoremap <c-h> <left>
cnoremap <c-j> <down>
cnoremap <c-k> <up>
cnoremap <c-l> <right>
```

[1]: https://www.swamphogg.com/2015/vim-setup/
[2]: https://github.com/iamcco/markdown-preview.vim/issues/54
[3]: https://raw.githubusercontent.com/3xp10it/pic/master/markdown.png
[4]: https://www.lequochung.me/2016/11/11/better-markdown-writing-experience-on-vim.html
[5]: http://vim.wikia.com/wiki/Move_cursor_by_display_lines_when_wrapping
[6]: https://github.com/reedes/vim-pencil
