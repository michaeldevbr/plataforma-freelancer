const items = [];

const memoriaRepository = {
    async create(itemData) {
        const newItem = {
            id: Date.now().toString(),
            ...itemData
        };
        items.push(newItem);
        return newItem;
    },

    async findAll() {
        return items;
    }
};

module.exports = memoriaRepository;