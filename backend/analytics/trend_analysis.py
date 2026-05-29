# behavior changes over time

def analyze_trend(scores):

    if scores[-1] < scores[0]:
        return "Downward Trend"
    
    elif scores[-1] > scores[0]:
        return "Upward Trend"
    
    return "Stable Trend"

trend = analyze_trend([90, 85, 80, 70])
print(trend)

