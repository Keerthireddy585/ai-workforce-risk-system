# from sklearn.linear_model import LinearRegression
# import numpy as np

# # training data
# x = np.array([
#     [35, 90],
#     [50, 70],
#     [60, 50],
#     [70, 40],
#     [80, 30]
# ])

# y = np.array([0, 0, 1, 1, 1])

# model = LinearRegression()

# model.fit(x,y)

# prediction = model.predict([[75, 35]])

# print(prediction)

def predict_burnout(
    hours_worked,
    tasks_completed,
    delay_days
):

    score = 0

    if hours_worked > 60:
        score += 1

    if tasks_completed < 6:
        score += 1

    if delay_days > 5:
        score += 1

    if score >= 3:
        return "High"
    elif score == 2:
        return "Medium"
    else:
        return "Low"

print(
    predict_burnout(
        70,
        4,
        2
    )
)