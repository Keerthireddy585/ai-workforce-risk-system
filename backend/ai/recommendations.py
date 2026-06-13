def generate_recommendation(
    burnout_risk,
    risk_score
):

    if burnout_risk == "High":

        return (
            "Reduce workload by 15%. "
            "Schedule manager review. "
            "Reassign 2 tasks."
        )

    elif burnout_risk == "Medium":

        return (
            "Monitor workload. "
            "Review project deadlines."
        )

    return (
        "Maintain current workload."
    )