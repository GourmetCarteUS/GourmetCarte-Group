export function startAtFormat(dataString: string) {
    if (!dataString) return;
    const timer = new Date(Date.parse(dataString));
    return timer.toLocaleString([], { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export const sleep = (delay: number = 1000) => new Promise((resolve) => setTimeout(resolve, delay));
