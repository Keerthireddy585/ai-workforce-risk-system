# workflow bottlenecks cause: project delays, operational inefficiency

def detect_bottleneck(delay_days):
    if delay_days > 5:
        return "Workflow Bottleneck Detected"
    return "Workflow Stable"

result = detect_bottleneck(7)
print(result)

