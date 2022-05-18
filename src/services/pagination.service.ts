export const pagination = (
    data: any[],
    count: number,
    page: number,
    limit: number,
) => {
    return {
        items: data,
        meta: {
            totalItems: count,
            itemsPerPage: limit,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        },
    };
};
