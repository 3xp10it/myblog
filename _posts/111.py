import re
string="Hello,World! 你好世界"
if re.search("你好.*",string):
    print("good,matched")
else:
    print("bad,no matched")
