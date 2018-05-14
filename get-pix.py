from dateutil import parser
import exifread as ex
import re

def pic_info(filename):
    ret = {}
    with open(filename, 'rb') as f:
        print(f.name)
        tags = ex.process_file(f)
    for t in tags:
        if t == 'JPEGThumbnail':
            continue
        if t in ['Image Orientation','Image DateTime']:
            if t == 'Image DateTime':
                #dt = ret[t]
                tags[t].values = parser.parse(re.sub(r'(\d{4}):(\d{2}):',r'\1-\2-',tags[t].values))
            #else:
            ret[t] = tags[t]
    return ret

for fnum in range(1,6):
    filename = 'c:/users/edgri/pict000'+str(fnum)+'.jpg'
    print(pic_info(filename))
    
