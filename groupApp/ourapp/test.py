import pandas as pd

# 读取原始CSV文件
df = pd.read_csv('Hospitals.csv')

# 执行筛选操作，将结果保存在新的DataFrame中
filtered_df = df[df['CITY'] == 'NEW YORK']

# 将筛选结果保存为新的CSV文件
filtered_df.to_csv('filtered_Hos.csv', index=False)