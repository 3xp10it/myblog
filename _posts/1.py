from exp10it import MyThread
import time
import os
def sniffdata1():
    os.system("ping www.baidu.com")
def sniffdata2():
    os.system("ping www.bing.com")
sniffThread1=MyThread(sniffdata1,())
sniffThread2=MyThread(sniffdata2,())
sniffThread1.start()
sniffThread2.start()
sniffThread1.join()
sniffThread2.join()

