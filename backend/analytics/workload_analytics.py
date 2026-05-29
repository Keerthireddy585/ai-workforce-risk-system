#create workload analytics: workload imbalance causes - burnout, delays, inefficiencies

def analyze_workload(hours_worked):
    
    if hours_worked > 50:
        return "Overloaded"
    
    elif hours_worked < 20:
        return "Underutilized"
    
    else:
        return "Balanced"
    

status = analyze_workload(55)
print(status)