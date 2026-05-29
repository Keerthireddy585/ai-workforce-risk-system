from sklearn.linear_model import LinearRegression
import numpy as np

x = np.array([[1], [2], [3], [4], [5]])
y = np.array([95, 90, 85, 80, 75])

model = LinearRegression()

model.fit(x, y)

future_prediction = model.predict([[6]])

print(future_prediction)

