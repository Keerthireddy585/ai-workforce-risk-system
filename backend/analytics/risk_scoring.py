# creating risk scoring engine
# risk scoring is operational intelligence

def calculate_risk_score(productivity_score, overtime_hours, delay_days):
    risk_score = 100 - productivity_score
    risk_score += overtime_hours * 2
    risk_score += delay_days * 5

    if risk_score > 100:
        risk_score = 100

    if risk_score < 0:
        risk_score = 0

    return risk_score

