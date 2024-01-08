const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }
    const category = await CategoriesRepository.create({ name });
    response.json(category);
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await CategoriesRepository.findById(id);

    if (!category) {
      response.status(404).json({ error: 'category not found' });
    }

    response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const categoryExists = await CategoriesRepository.findById(id);
    if (!categoryExists) {
      response.status(404).json({ error: 'category not found' });
    }

    if (!name) {
      response.json({ error: 'Name is required!' });
    }

    const category = await CategoriesRepository.update(id, { name });
    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.delete(id);
    response.status(204).json(category);
  }
}

module.exports = new CategoryController();
