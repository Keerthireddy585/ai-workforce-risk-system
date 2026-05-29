from sklearn.tree import DecisionTreeClassifier
import numpy as np

x = np.array([
    [2, 5],
    [5, 10],
    [8, 15],
    [10, 20]
])

y = np.array([0, 0, 1, 1])

model = DecisionTreeClassifier()

model.fit(x, y)

prediction = model.predict([[9, 18]])

print(prediction)