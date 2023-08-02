export const formatPhoneNumber = (numberInput: number | string) => {
    const numberStr = numberInput.toString()
    return `(${numberStr.slice(0, 3)}) ${numberStr.slice(3, 6)}-${numberStr.slice(6, 10)}`
}

export const salaryUnitShort = (unit: string) => {
    if (unit === "per_hour") {
        return "/hour"
    }
    if (unit === "per_month") {
        return "/month"
    }
    if (unit === "per_year") {
        return "/year"
    }
    return unit

}

export const noticePeriodText = (days: number) => {
    if (days === 0) {
        return "Immediate"
    }
    if (days === 14) {
        return "2 weeks"
    }
    if (days === 31) {
        return "1 month"
    }
    if (days === 61) {
        return "2 months"
    }
    return `${days} Days`
}