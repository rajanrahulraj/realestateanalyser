import json


# 读取JSON文件
with open('/Users/Linky/Documents/GitHub/realestateanalyser/groupApp/ourapp/src/data/schooldata.json', 'r') as file:
    data = json.load(file)

a = 0
# 将属性Y的值从字符串转换为数字
for item in data:
  if 'Y' not in item:
    print(item)
    print(a)
  else:
     a = a+1
     


# # 另存为新的JSON文件
# with open('SchoolData.json', 'w') as file:
#     json.dump(data, file)