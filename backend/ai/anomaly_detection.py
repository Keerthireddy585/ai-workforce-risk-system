from sklearn.ensemble import IsolationForest
import numpy as np

x = np.array([
    [8],
    [9],
    [10],
    [11],
    [50]
])

model = IsolationForest(contamination=0.2)

model.fit(x)

predictions = model.predict(x)

print(predictions)
