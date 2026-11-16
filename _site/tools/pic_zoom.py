import re
import pdb
from exp10it import get_all_abs_path_file_name
def handle_file(abs_file_path):
    with open(abs_file_path,"r+") as f:
        html=f.read()
    while True:
        _=re.search(r"(!\[.+\]\[(\d)\])",html)
        if _:
            origin_easy_line=_.group(1)+"\n"
            pic_addr_no=_.group(2)
            try:
                origin_link_line=re.search(r"(\[%s\]: ?(\S+))" % str(pic_addr_no),html).group(1)+"\n"
            except:
                pdb.set_trace()
            pic_addr_value=re.search(r"(\[%s\]: ?(\S+))" % str(pic_addr_no),html).group(2)
            html=html.replace(origin_easy_line,'<img src="%s" data-action="zoom">\n' % pic_addr_value)
            html=html.replace(origin_link_line,"")
        else:
            break
    with open(abs_file_path,"w+") as f:
        f.write(html)


a=get_all_abs_path_file_name("/Users/3xp10it/myblog/_posts/",['md'])
for item in a:
    handle_file(item)
