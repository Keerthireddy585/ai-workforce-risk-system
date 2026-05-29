# workforce intelligence calculations

def calculate_productivity(tasks_completed, delay_days):
    productivity_score = tasks_completed * 10
    productivity_score -= delay_days * 5
    return productivity_score

score = calculate_productivity(8,2)
print(score)