cd ~/myblog && kill -9 $(ps -a | egrep "jekyll" | egrep -o "\d+" | head -n 1);sleep 3 && cp index.html tmp.html && cp index_bak.html index.html && sh -c "rm -r _site/ & jekyll serve -H 0.0.0.0 --incremental --watch && exit" && cp _site/index.html index2.html && cp tmp.html index.html && echo congratulations! commands execute ok to here!

