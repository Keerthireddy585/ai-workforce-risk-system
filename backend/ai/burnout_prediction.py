from sklearn.linear_model import LinearRegression
import numpy as np

# training data
x = np.array([
    [35, 90],
    [50, 70],
    [60, 50],
    [70, 40],
    [80, 30]
])

y = np.array([0, 0, 1, 1, 1])

model = LinearRegression()

model.fit(x,y)

prediction = model.predict([[75, 35]])

print(prediction)