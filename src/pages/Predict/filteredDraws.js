export function filteredDraws(draws, startDate, endDate) {
    const filteredDraws = draws.filter(draw => {
        const drawDate = new Date(draw.date);
        return drawDate >= (startDate ? new Date(startDate) : new Date('0001-01-01T00:00:00Z')) && drawDate <= (endDate ? new Date(endDate) : new Date());
    });

    return filteredDraws;
}