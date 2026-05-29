# creating risk scoring engine
# risk scoring is operational intelligence

def calculate_risk_score(productivity_score, overtime_hours):
    risk_score = 100 - productivity_score
    risk_score += overtime_hours * 2
    return risk_score

risk = calculate_risk_score(60,12)
print(risk)