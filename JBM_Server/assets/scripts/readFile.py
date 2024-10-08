import pandas as pd
import os

path = r"D:\Inern-task\JMB-Repo\JBM_Server\assets\uploads\1b63c2f8-f017-4b82-8acc-76ff5e22b891.xlsx"

if os.path.exists(path):
    print("File exists")
else:
    print("File does not exist")

df = pd.read_excel(path, engine='openpyxl')  # Specify the engine as openpyxl
print(df)

